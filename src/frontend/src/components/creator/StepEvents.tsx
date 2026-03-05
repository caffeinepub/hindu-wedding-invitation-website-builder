import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import type { ScheduleItem } from "../../backend";

interface StepEventsProps {
  events: ScheduleItem[];
  onChange: (events: ScheduleItem[]) => void;
}

const inputClass =
  "bg-white/5 border-white/20 text-ivory placeholder:text-ivory/30 font-garamond focus:border-gold text-sm";
const labelClass = "text-ivory/60 font-garamond text-xs mb-0.5";

const emptyEvent = (): ScheduleItem => ({
  name: "",
  time: "",
  venue: "",
  details: "",
});

export default function StepEvents({ events, onChange }: StepEventsProps) {
  // Stable IDs for each event card so keys never change as the user types
  const counterRef = useRef(events.length);
  const [stableIds, setStableIds] = useState<string[]>(() =>
    events.map((_, i) => `evt-${i}`),
  );

  const add = () => {
    const newId = `evt-${counterRef.current++}`;
    setStableIds((prev) => [...prev, newId]);
    onChange([...events, emptyEvent()]);
  };

  const remove = (i: number) => {
    setStableIds((prev) => prev.filter((_, idx) => idx !== i));
    onChange(events.filter((_, idx) => idx !== i));
  };

  const update = (i: number, field: keyof ScheduleItem, value: string) => {
    const updated = events.map((e, idx) =>
      idx === i ? { ...e, [field]: value } : e,
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-cormorant font-bold text-gold">
            Wedding Events
          </h2>
          <p className="text-ivory/50 font-garamond text-sm mt-1">
            Add all your wedding ceremonies and celebrations
          </p>
        </div>
        <Button
          onClick={add}
          size="sm"
          className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 font-garamond"
        >
          <Plus size={14} className="mr-1" /> Add Event
        </Button>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
          <MapPin size={32} className="text-ivory/20 mx-auto mb-3" />
          <p className="text-ivory/40 font-garamond">
            No events added yet. Click "Add Event" to begin.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {events.map((event, i) => (
          <div
            key={stableIds[i] ?? `evt-fallback-${i}`}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gold font-cormorant font-bold">
                Event {i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-red-400/60 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className={labelClass}>Event Name *</Label>
                <Input
                  className={inputClass}
                  value={event.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  placeholder="e.g. Mehendi, Sangeet, Wedding"
                />
              </div>
              <div>
                <Label className={labelClass}>Date & Time</Label>
                <Input
                  className={inputClass}
                  value={event.time}
                  onChange={(e) => update(i, "time", e.target.value)}
                  placeholder="e.g. 15 Feb 2025, 6:00 PM"
                />
              </div>
              <div>
                <Label className={labelClass}>Venue Name</Label>
                <Input
                  className={inputClass}
                  value={event.venue}
                  onChange={(e) => update(i, "venue", e.target.value)}
                  placeholder="e.g. The Grand Palace"
                />
              </div>
              <div>
                <Label className={labelClass}>Address / Google Maps URL</Label>
                <Input
                  className={inputClass}
                  value={event.details}
                  onChange={(e) => update(i, "details", e.target.value)}
                  placeholder="Paste address or Google Maps link"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
