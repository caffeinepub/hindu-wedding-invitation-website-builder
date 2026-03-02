import { useState, useRef, useEffect } from 'react';
import { useSubmitRSVP } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GlassmorphismCard from '../effects/GlassmorphismCard';
import { cn } from '../../lib/utils';

interface RSVPFormProps {
  inviteId: string;
  thankYouText?: string;
  accentColor?: string;
  dark?: boolean;
}

function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number }[] = [];
  const colors = ['#F4A832', '#E8731A', '#C0392B', '#D4AF37', '#FAF3E0', '#3B1F6E'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      alpha: 1,
    });
  }

  let frame = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.alpha -= 0.008;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size, p.size * 0.5, frame * 0.05, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  animate();
}

export default function RSVPForm({ inviteId, thankYouText, accentColor = '#D4AF37', dark = false }: RSVPFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'true',
    guests: '1',
    meal: 'Vegetarian',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mutate: submitRSVP, isPending } = useSubmitRSVP();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email is required';
    if (!form.guests || Number(form.guests) < 1) e.guests = 'At least 1 guest';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    submitRSVP(
      {
        id: inviteId,
        rsvp: {
          name: form.name,
          attendance: form.attending === 'true',
          guests: BigInt(Number(form.guests)),
          message: `Phone: ${form.phone} | Email: ${form.email} | Meal: ${form.meal} | ${form.message}`,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          if (canvasRef.current) launchConfetti(canvasRef.current);
        },
      }
    );
  };

  if (submitted) {
    return (
      <div className="relative">
        <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" />
        <GlassmorphismCard dark={dark} className="p-10 text-center">
          <div className="text-5xl mb-4">🌸</div>
          <h3 className="text-2xl font-cormorant font-bold mb-3" style={{ color: accentColor }}>
            Thank You!
          </h3>
          <p className="font-garamond opacity-80 text-lg">
            {thankYouText || 'Your RSVP has been received. We look forward to celebrating with you!'}
          </p>
        </GlassmorphismCard>
      </div>
    );
  }

  const inputClass = cn(
    'font-garamond',
    dark ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40' : 'bg-white/20 border-white/30'
  );

  return (
    <GlassmorphismCard dark={dark} className="p-6 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Full Name *</Label>
            <Input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Phone *</Label>
            <Input
              type="tel"
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Email *</Label>
          <Input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label className={cn('font-garamond mb-2', dark ? 'text-white/80' : '')}>Will you attend?</Label>
          <RadioGroup
            value={form.attending}
            onValueChange={(v) => setForm({ ...form, attending: v })}
            className="flex gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="true" id="yes" style={{ borderColor: accentColor }} />
              <Label htmlFor="yes" className="font-garamond cursor-pointer">Joyfully Accept</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="false" id="no" style={{ borderColor: accentColor }} />
              <Label htmlFor="no" className="font-garamond cursor-pointer">Regretfully Decline</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Number of Guests</Label>
            <Input
              type="number"
              min="1"
              max="20"
              className={inputClass}
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            />
            {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
          </div>
          <div>
            <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Meal Preference</Label>
            <Select value={form.meal} onValueChange={(v) => setForm({ ...form, meal: v })}>
              <SelectTrigger className={inputClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="No Preference">No Preference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className={cn('font-garamond mb-1', dark ? 'text-white/80' : '')}>Message (optional)</Label>
          <Textarea
            className={cn(inputClass, 'min-h-[80px]')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share your blessings or a message for the couple..."
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full py-3 text-base font-cormorant font-semibold tracking-wide rounded-xl transition-all"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            color: '#1a0a00',
            border: 'none',
          }}
        >
          {isPending ? 'Sending...' : '🌸 Send RSVP'}
        </Button>
      </form>
    </GlassmorphismCard>
  );
}
