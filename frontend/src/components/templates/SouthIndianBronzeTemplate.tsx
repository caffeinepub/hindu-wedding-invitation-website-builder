import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function SouthIndianBronzeTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'linear-gradient(160deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)',
      }
    : {
        background: 'linear-gradient(160deg, #8B5E3C 0%, #CD853F 50%, #8B5E3C 100%)',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, #D4AF3722 0%, transparent 60%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0700', color: '#FAF3E0' }
    : { background: '#FFF8F0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#CD853F"
      secondaryColor="#8B5E3C"
      petalColors={['#CD853F', '#D4AF37', '#8B5E3C', '#F4A832']}
      sectionBg={isDark ? '#0d0700' : '#FFF8F0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
