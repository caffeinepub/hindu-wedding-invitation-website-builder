import { GripVertical, ImageIcon, Loader2, Music, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../../backend";
import { cn } from "../../lib/utils";

interface GalleryItem {
  blob: ExternalBlob;
  previewUrl: string;
  uploading: boolean;
  progress: number;
}

interface StepGalleryMusicProps {
  galleryItems: GalleryItem[];
  musicUrl: string;
  onGalleryChange: (items: GalleryItem[]) => void;
  onMusicChange: (url: string) => void;
}

export type { GalleryItem };

export default function StepGalleryMusic({
  galleryItems,
  musicUrl,
  onGalleryChange,
  onMusicChange,
}: StepGalleryMusicProps) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [musicUploading, setMusicUploading] = useState(false);

  // Keep a mutable ref to the latest gallery items so async upload callbacks
  // can read the current state without stale closures, then call onGalleryChange
  // with a plain array (not a functional updater, since the prop is not setState).
  const galleryRef = useRef<GalleryItem[]>(galleryItems);
  galleryRef.current = galleryItems;

  const updateItem = (index: number, patch: Partial<GalleryItem>) => {
    const updated = [...galleryRef.current];
    if (updated[index]) {
      updated[index] = { ...updated[index], ...patch };
      onGalleryChange(updated);
    }
  };

  const removeItemAt = (index: number) => {
    onGalleryChange(galleryRef.current.filter((_, idx) => idx !== index));
  };

  const handleGalleryFiles = async (files: FileList) => {
    const fileArray = Array.from(files).filter(
      (f) =>
        ["image/jpeg", "image/png", "image/webp"].includes(f.type) &&
        f.size <= 20 * 1024 * 1024,
    );

    if (fileArray.length === 0) return;

    // Add placeholder items immediately for UI feedback
    const placeholders: GalleryItem[] = fileArray.map((file) => ({
      blob: ExternalBlob.fromBytes(new Uint8Array()),
      previewUrl: URL.createObjectURL(file),
      uploading: true,
      progress: 0,
    }));

    const startIndex = galleryRef.current.length;
    const withPlaceholders = [...galleryRef.current, ...placeholders];
    onGalleryChange(withPlaceholders);

    // Upload each file sequentially, using the ref for current state
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const itemIndex = startIndex + i;

      try {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          updateItem(itemIndex, { progress: pct });
        });

        updateItem(itemIndex, { blob, uploading: false, progress: 100 });
      } catch {
        // Remove failed item
        removeItemAt(itemIndex);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0)
      handleGalleryFiles(e.dataTransfer.files);
  };

  const removeImage = (i: number) =>
    onGalleryChange(galleryItems.filter((_, idx) => idx !== i));

  const handleDragStart = (i: number) => setDragIdx(i);
  const handleDragEnter = (i: number) => setOverIdx(i);
  const handleDragEnd = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      const arr = [...galleryItems];
      const [moved] = arr.splice(dragIdx, 1);
      arr.splice(overIdx, 0, moved);
      onGalleryChange(arr);
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  const handleMusicFile = async (file: File) => {
    const isValidType =
      ["audio/mpeg", "audio/ogg", "audio/mp3"].includes(file.type) ||
      file.name.match(/\.(mp3|ogg)$/i);
    if (!isValidType) return;
    setMusicUploading(true);
    try {
      // Music stays as base64 since it's stored as Text in the backend
      const reader = new FileReader();
      const base64Url = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      onMusicChange(base64Url);
    } catch {}
    setMusicUploading(false);
  };

  const anyUploading = galleryItems.some((item) => item.uploading);

  return (
    <div className="space-y-10">
      {/* Gallery */}
      <div>
        <h2 className="text-2xl font-cormorant font-bold text-gold mb-2">
          Photo Gallery
        </h2>
        <p className="text-ivory/50 font-garamond text-sm mb-6">
          Upload multiple photos. Drag to reorder. Uploaded securely in chunks.
        </p>

        <button
          type="button"
          className={cn(
            "w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
            dragOver
              ? "border-gold bg-gold/10"
              : "border-white/20 hover:border-gold/40",
          )}
          onClick={() => galleryInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <ImageIcon size={32} className="text-ivory/30 mx-auto mb-3" />
          <p className="text-ivory/50 font-garamond">
            {anyUploading ? "Uploading..." : "Click or drag photos here"}
          </p>
          <p className="text-ivory/30 text-xs mt-1">
            JPG, PNG, WebP · Max 20MB each
          </p>
        </button>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleGalleryFiles(e.target.files)}
        />

        {galleryItems.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {galleryItems.map((item, i) => (
              <div
                key={item.previewUrl}
                draggable={!item.uploading}
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 cursor-grab transition-all",
                  dragIdx === i
                    ? "opacity-50 scale-95"
                    : "border-white/10 hover:border-gold/40",
                )}
              >
                <img
                  src={item.previewUrl}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {item.uploading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
                    <Loader2 size={16} className="text-gold animate-spin" />
                    <div className="w-10 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-white text-xs">
                      {Math.round(item.progress)}%
                    </p>
                  </div>
                )}
                {!item.uploading && (
                  <>
                    <div className="absolute top-1 left-1 text-white/40">
                      <GripVertical size={14} />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(i);
                      }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Music */}
      <div className="border-t border-white/10 pt-8">
        <h3 className="text-xl font-cormorant font-bold text-gold mb-2">
          Background Music
        </h3>
        <p className="text-ivory/50 font-garamond text-sm mb-6">
          Optional. MP3 or OGG format. Plays after guest interaction.
        </p>

        <button
          type="button"
          className={cn(
            "w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all",
            musicUrl
              ? "border-gold/60 bg-gold/5"
              : "border-white/20 hover:border-gold/40",
          )}
          onClick={() => musicInputRef.current?.click()}
        >
          <Music
            size={28}
            className={cn(
              "mx-auto mb-2",
              musicUrl ? "text-gold" : "text-ivory/30",
            )}
          />
          {musicUrl ? (
            <div>
              <p className="text-gold font-garamond text-sm">
                Music uploaded ✓
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMusicChange("");
                }}
                className="text-red-400/60 hover:text-red-400 text-xs mt-1 font-garamond"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-ivory/50 font-garamond text-sm">
              {musicUploading ? "Processing..." : "Click to upload MP3 or OGG"}
            </p>
          )}
        </button>
        <input
          ref={musicInputRef}
          type="file"
          accept="audio/mpeg,audio/ogg,.mp3,.ogg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleMusicFile(f);
          }}
        />
      </div>
    </div>
  );
}
