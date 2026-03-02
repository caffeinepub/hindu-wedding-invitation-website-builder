import type { InviteRecord } from '../backend';

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  /** Also keep `thumb` as alias so legacy code still compiles */
  thumb: string;
  premium?: boolean;
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'floral-marigold',
    name: 'Floral Marigold',
    description: 'Vibrant marigold garlands and warm saffron tones',
    thumbnail: '/assets/generated/thumb-floral-marigold.dim_600x400.png',
    thumb: '/assets/generated/thumb-floral-marigold.dim_600x400.png',
  },
  {
    id: 'royal-rajasthani',
    name: 'Royal Rajasthani',
    description: 'Regal palace arches and rich crimson heritage',
    thumbnail: '/assets/generated/thumb-royal-rajasthani.dim_600x400.png',
    thumb: '/assets/generated/thumb-royal-rajasthani.dim_600x400.png',
  },
  {
    id: 'minimal-sanskrit',
    name: 'Minimal Sanskrit',
    description: 'Clean lines with sacred Sanskrit calligraphy',
    thumbnail: '/assets/generated/thumb-minimal-sanskrit.dim_600x400.png',
    thumb: '/assets/generated/thumb-minimal-sanskrit.dim_600x400.png',
  },
  {
    id: 'south-indian-bronze',
    name: 'South Indian Bronze',
    description: 'Temple bronze motifs and Dravidian artistry',
    thumbnail: '/assets/generated/thumb-south-indian-bronze.dim_600x400.png',
    thumb: '/assets/generated/thumb-south-indian-bronze.dim_600x400.png',
  },
  {
    id: 'cosmic-dark',
    name: 'Dark Cosmic',
    description: 'Celestial night sky with starlit mandala patterns',
    thumbnail: '/assets/generated/thumb-dark-cosmic.dim_600x400.png',
    thumb: '/assets/generated/thumb-dark-cosmic.dim_600x400.png',
  },
  {
    id: 'sunset-beach',
    name: 'Sunset Beach',
    description: 'Golden hour hues and ocean-side romance',
    thumbnail: '/assets/generated/thumb-sunset-beach.dim_600x400.png',
    thumb: '/assets/generated/thumb-sunset-beach.dim_600x400.png',
  },
  {
    id: 'mandala',
    name: 'Temple Mandala',
    description: 'Sacred geometric mandalas and temple motifs',
    thumbnail: '/assets/generated/thumb-temple-mandala.dim_600x400.png',
    thumb: '/assets/generated/thumb-temple-mandala.dim_600x400.png',
  },
  {
    id: '3d-floating-divine',
    name: '3D Floating Divine',
    description: 'Ethereal 3D floating elements with divine glow',
    thumbnail: '/assets/generated/thumb-3d-floating-divine.dim_600x400.png',
    thumb: '/assets/generated/thumb-3d-floating-divine.dim_600x400.png',
  },
  // ─── Premium Templates ───────────────────────────────────────────────────
  {
    id: 'mughal-garden',
    name: 'Mughal Garden',
    description: 'Lush Mughal-era arches, intricate jali patterns, and gold calligraphy',
    thumbnail: '/assets/generated/thumbnail-mughal-garden.dim_400x300.png',
    thumb: '/assets/generated/thumbnail-mughal-garden.dim_400x300.png',
    premium: true,
  },
  {
    id: 'vedic-fire',
    name: 'Vedic Fire',
    description: 'Sacred agni flames, Vedic yantras, and warm amber saffron gradients',
    thumbnail: '/assets/generated/thumbnail-vedic-fire.dim_400x300.png',
    thumb: '/assets/generated/thumbnail-vedic-fire.dim_400x300.png',
    premium: true,
  },
  {
    id: 'royal-navy-zari',
    name: 'Royal Navy Zari',
    description: 'Deep navy blue with gold zari-embroidery borders and regal crest',
    thumbnail: '/assets/generated/thumbnail-royal-navy-zari.dim_400x300.png',
    thumb: '/assets/generated/thumbnail-royal-navy-zari.dim_400x300.png',
    premium: true,
  },
  {
    id: 'lotus-bloom',
    name: 'Lotus Bloom',
    description: 'Soft pink lotus petals, pastel gradients, and serene water-lily motifs',
    thumbnail: '/assets/generated/thumbnail-lotus-bloom.dim_400x300.png',
    thumb: '/assets/generated/thumbnail-lotus-bloom.dim_400x300.png',
    premium: true,
  },
];

export type TemplateId = (typeof TEMPLATES)[number]['id'];

// Typed so each loader returns a module whose default export accepts InviteRecord + variant
export type TemplateLoader = () => Promise<{
  default: React.ComponentType<{ invite: InviteRecord; variant?: 'light' | 'dark' }>;
}>;

export type TemplateComponentMap = Record<string, TemplateLoader>;

/** Lazy component map — used by InvitePage to load the right template */
export const TemplateComponents: TemplateComponentMap = {
  'floral-marigold': () => import('../components/templates/FloralMarigoldTemplate'),
  'royal-rajasthani': () => import('../components/templates/RoyalRajasthaniTemplate'),
  'minimal-sanskrit': () => import('../components/templates/MinimalSanskritTemplate'),
  'south-indian-bronze': () => import('../components/templates/SouthIndianBronzeTemplate'),
  'cosmic-dark': () => import('../components/templates/DarkCosmicTemplate'),
  'sunset-beach': () => import('../components/templates/SunsetBeachTemplate'),
  mandala: () => import('../components/templates/TempleMandalaTemplate'),
  '3d-floating-divine': () => import('../components/templates/ThreeDFloatingDivineTemplate'),
  'mughal-garden': () => import('../components/templates/MughalGardenTemplate'),
  'vedic-fire': () => import('../components/templates/VedicFireTemplate'),
  'royal-navy-zari': () => import('../components/templates/RoyalNavyZariTemplate'),
  'lotus-bloom': () => import('../components/templates/LotusBloomTemplate'),
};

// Keep old alias so any code that imported TEMPLATE_COMPONENT_MAP still works
export const TEMPLATE_COMPONENT_MAP = TemplateComponents;
