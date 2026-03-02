import { lazy } from 'react';

export const TEMPLATES = [
  {
    id: 'royal-rajasthani',
    name: 'Royal Rajasthani',
    thumb: '/assets/generated/thumb-royal-rajasthani.dim_600x400.png',
    description: 'Deep crimson & gold filigree with Rajasthani grandeur',
  },
  {
    id: 'mandala',
    name: 'Temple Mandala',
    thumb: '/assets/generated/thumb-temple-mandala.dim_600x400.png',
    description: 'Intricate mandala overlays with ochre & maroon palette',
  },
  {
    id: 'cosmic-dark',
    name: 'Dark Cosmic',
    thumb: '/assets/generated/thumb-dark-cosmic.dim_600x400.png',
    description: 'Starfield cosmos with gold constellation lines',
  },
  {
    id: 'marigold',
    name: 'Floral Marigold',
    thumb: '/assets/generated/thumb-floral-marigold.dim_600x400.png',
    description: 'Lush marigold orange with overflowing floral borders',
  },
  {
    id: 'south-indian-bronze',
    name: 'South Indian Bronze',
    thumb: '/assets/generated/thumb-south-indian-bronze.dim_600x400.png',
    description: 'Bronze & copper tones with Kolam patterns',
  },
  {
    id: 'minimal-sanskrit',
    name: 'Minimal Sanskrit',
    thumb: '/assets/generated/thumb-minimal-sanskrit.dim_600x400.png',
    description: 'Cream ivory with refined typography & Om watermark',
  },
  {
    id: 'sunset-beach',
    name: 'Sunset Beach',
    thumb: '/assets/generated/thumb-sunset-beach.dim_600x400.png',
    description: 'Warm sunset gradient with wave motifs',
  },
  {
    id: '3d-floating-divine',
    name: '3D Floating Divine',
    thumb: '/assets/generated/thumb-3d-floating-divine.dim_600x400.png',
    description: 'Layered 3D depth with divine purple & gold',
  },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]['id'];

export const TemplateComponents = {
  'royal-rajasthani': lazy(() => import('../components/templates/RoyalRajasthaniTemplate')),
  mandala: lazy(() => import('../components/templates/TempleMandalaTemplate')),
  'cosmic-dark': lazy(() => import('../components/templates/DarkCosmicTemplate')),
  marigold: lazy(() => import('../components/templates/FloralMarigoldTemplate')),
  'south-indian-bronze': lazy(() => import('../components/templates/SouthIndianBronzeTemplate')),
  'minimal-sanskrit': lazy(() => import('../components/templates/MinimalSanskritTemplate')),
  'sunset-beach': lazy(() => import('../components/templates/SunsetBeachTemplate')),
  '3d-floating-divine': lazy(() => import('../components/templates/ThreeDFloatingDivineTemplate')),
};
