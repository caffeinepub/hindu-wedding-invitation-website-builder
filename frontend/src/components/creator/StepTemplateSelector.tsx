import { TEMPLATES } from '../../lib/templateRegistry';
import { cn } from '../../lib/utils';
import { Check, Sun, Moon, Sparkles } from 'lucide-react';

interface StepTemplateSelectorProps {
  selectedId: string;
  selectedVariant: 'light' | 'dark';
  onSelect: (id: string) => void;
  onVariantChange: (variant: 'light' | 'dark') => void;
}

export default function StepTemplateSelector({
  selectedId,
  selectedVariant,
  onSelect,
  onVariantChange,
}: StepTemplateSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cormorant font-bold text-gold">Choose Your Template</h2>
        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-gold/20">
          <button
            onClick={() => onVariantChange('light')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-garamond transition-all',
              selectedVariant === 'light' ? 'bg-gold text-deepMaroon' : 'text-ivory/60 hover:text-ivory'
            )}
          >
            <Sun size={14} /> Light
          </button>
          <button
            onClick={() => onVariantChange('dark')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-garamond transition-all',
              selectedVariant === 'dark' ? 'bg-gold text-deepMaroon' : 'text-ivory/60 hover:text-ivory'
            )}
          >
            <Moon size={14} /> Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              'relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left',
              selectedId === t.id
                ? 'border-gold shadow-lg shadow-gold/20 scale-[1.02]'
                : 'border-white/10 hover:border-gold/40 hover:scale-[1.01]'
            )}
          >
            <div className="aspect-[3/2] overflow-hidden">
              <img
                src={t.thumbnail}
                alt={t.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 bg-deepMaroon/80 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-cormorant font-bold text-ivory text-sm">{t.name}</p>
                {t.premium && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon text-xs font-bold font-raleway tracking-wide">
                    <Sparkles size={9} />
                    Premium
                  </span>
                )}
              </div>
              <p className="font-garamond text-ivory/50 text-xs mt-0.5 line-clamp-1">{t.description}</p>
            </div>
            {selectedId === t.id && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                <Check size={12} className="text-deepMaroon" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
