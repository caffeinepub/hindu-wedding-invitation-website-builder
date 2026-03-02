import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function MinimalSanskritTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: '#1a1510',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, #D4AF3711 0%, transparent 70%)`,
      }
    : {
        background: '#FAF3E0',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, #D4AF3722 0%, transparent 70%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#1a1510', color: '#FAF3E0' }
    : { background: '#FAF3E0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#D4AF37"
      secondaryColor="#8B7355"
      petalColors={['#D4AF37', '#C8B89A', '#8B7355']}
      sectionBg={isDark ? '#1a1510' : '#FAF3E0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
