import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CoupleDetails {
  brideName: string;
  groomName: string;
  weddingDate: string;
  tagline: string;
}

interface StepCoupleDetailsProps {
  data: CoupleDetails;
  onChange: (data: CoupleDetails) => void;
  errors: Record<string, string>;
}

const inputClass =
  "bg-white/5 border-white/20 text-ivory placeholder:text-ivory/30 font-garamond focus:border-gold";
const labelClass = "text-ivory/70 font-garamond text-sm mb-1";

export default function StepCoupleDetails({
  data,
  onChange,
  errors,
}: StepCoupleDetailsProps) {
  const set =
    (key: keyof CoupleDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ ...data, [key]: e.target.value });

  return (
    <div>
      <h2 className="text-2xl font-cormorant font-bold text-gold mb-6">
        Couple Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className={labelClass}>Bride's Name *</Label>
          <Input
            className={inputClass}
            value={data.brideName}
            onChange={set("brideName")}
            placeholder="e.g. Priya Sharma"
          />
          {errors.brideName && (
            <p className="text-red-400 text-xs mt-1">{errors.brideName}</p>
          )}
        </div>
        <div>
          <Label className={labelClass}>Groom's Name *</Label>
          <Input
            className={inputClass}
            value={data.groomName}
            onChange={set("groomName")}
            placeholder="e.g. Arjun Mehta"
          />
          {errors.groomName && (
            <p className="text-red-400 text-xs mt-1">{errors.groomName}</p>
          )}
        </div>
        <div>
          <Label className={labelClass}>Wedding Date & Time *</Label>
          <Input
            type="datetime-local"
            className={inputClass}
            value={data.weddingDate}
            onChange={set("weddingDate")}
          />
          {errors.weddingDate && (
            <p className="text-red-400 text-xs mt-1">{errors.weddingDate}</p>
          )}
        </div>
        <div>
          <Label className={labelClass}>Tagline / Blessing</Label>
          <Input
            className={inputClass}
            value={data.tagline}
            onChange={set("tagline")}
            placeholder="e.g. Two souls, one journey"
          />
        </div>
        <div className="md:col-span-2">
          <Label className={labelClass}>
            Custom Thank-You Message (for RSVP)
          </Label>
          <Textarea
            className={`${inputClass} min-h-[80px]`}
            value={""}
            placeholder="Your RSVP has been received. We look forward to celebrating with you!"
            readOnly
          />
          <p className="text-ivory/30 text-xs mt-1">
            Default message shown above. You can customize after publishing.
          </p>
        </div>
      </div>
    </div>
  );
}
