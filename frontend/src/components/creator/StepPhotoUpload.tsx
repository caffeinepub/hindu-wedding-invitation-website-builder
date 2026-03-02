import { useRef, useState } from 'react';
import { Upload, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ExternalBlob } from '../../backend';

interface StepPhotoUploadProps {
  bridePhoto: ExternalBlob | null;
  groomPhoto: ExternalBlob | null;
  coverPhoto: ExternalBlob | null;
  onBrideUpload: (blob: ExternalBlob) => void;
  onGroomUpload: (blob: ExternalBlob) => void;
  onCoverUpload: (blob: ExternalBlob) => void;
}

interface UploadState {
  loading: boolean;
  progress: number;
  error: string;
  previewUrl: string;
}

function PhotoUploader({
  label,
  currentBlob,
  placeholder,
  onUpload,
}: {
  label: string;
  currentBlob: ExternalBlob | null;
  placeholder: string;
  onUpload: (blob: ExternalBlob) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>({ loading: false, progress: 0, error: '', previewUrl: '' });

  // Derive preview URL from existing blob if no local preview
  const displayUrl = state.previewUrl || (currentBlob ? currentBlob.getDirectURL() : '');

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setState((s) => ({ ...s, error: 'Only JPG, PNG, WebP allowed' }));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setState((s) => ({ ...s, error: 'Max 20MB per image' }));
      return;
    }

    // Create a local object URL for immediate preview
    const localPreview = URL.createObjectURL(file);
    setState({ loading: true, progress: 0, error: '', previewUrl: localPreview });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setState((s) => ({ ...s, progress: pct }));
      });

      setState((s) => ({ ...s, loading: false, progress: 100 }));
      onUpload(blob);
    } catch {
      setState({ loading: false, progress: 0, error: 'Upload failed. Please try again.', previewUrl: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-cormorant font-bold text-gold text-lg">{label}</p>
      <div
        className={cn(
          'relative w-48 h-64 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition-all',
          displayUrl ? 'border-gold/60' : 'border-white/20 hover:border-gold/40'
        )}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {displayUrl ? (
          <img src={displayUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white/5">
            <User size={40} className="text-ivory/30" />
            <p className="text-ivory/40 text-xs font-garamond text-center px-3">{placeholder}</p>
          </div>
        )}
        {state.loading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${state.progress}%` }} />
            </div>
            <p className="text-white text-xs">{Math.round(state.progress)}%</p>
          </div>
        )}
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gold/80 flex items-center justify-center">
          <Upload size={14} className="text-deepMaroon" />
        </div>
      </div>
      {state.error && <p className="text-red-400 text-xs">{state.error}</p>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleChange} />
      <p className="text-ivory/30 text-xs">JPG, PNG, WebP · Max 20MB</p>
    </div>
  );
}

export default function StepPhotoUpload({
  bridePhoto,
  groomPhoto,
  coverPhoto,
  onBrideUpload,
  onGroomUpload,
  onCoverUpload,
}: StepPhotoUploadProps) {
  return (
    <div>
      <h2 className="text-2xl font-cormorant font-bold text-gold mb-2">Upload Photos</h2>
      <p className="text-ivory/50 font-garamond text-sm mb-8">Photos are uploaded securely in chunks — no size limits</p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
        <PhotoUploader
          label="Bride's Photo"
          currentBlob={bridePhoto}
          placeholder="Click or drag to upload bride photo"
          onUpload={onBrideUpload}
        />
        <div className="text-4xl text-gold/40 font-cormorant hidden md:block">❤</div>
        <PhotoUploader
          label="Groom's Photo"
          currentBlob={groomPhoto}
          placeholder="Click or drag to upload groom photo"
          onUpload={onGroomUpload}
        />
      </div>

      <div className="border-t border-white/10 pt-8">
        <h3 className="text-lg font-cormorant font-bold text-gold mb-4">Cover / Hero Image (optional)</h3>
        <div className="flex justify-center">
          <PhotoUploader
            label="Cover Image"
            currentBlob={coverPhoto}
            placeholder="Used for social sharing preview (1200×630 recommended)"
            onUpload={onCoverUpload}
          />
        </div>
      </div>
    </div>
  );
}
