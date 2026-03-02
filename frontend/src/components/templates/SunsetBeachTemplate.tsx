import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function SunsetBeachTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'linear-gradient(160deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)',
      }
    : {
        background: 'linear-gradient(160deg, #FF6B35 0%, #F7C59F 40%, #FFBE0B 70%, #FF6B35 100%)',
        backgroundImage: `radial-gradient(ellipse at 50% 80%, #FF6B3544 0%, transparent 60%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0500', color: '#FAF3E0' }
    : { background: '#FFF9F5', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={isDark ? '#FFBE0B' : '#FF6B35'}
      secondaryColor="#F7C59F"
      petalColors={['#FF6B35', '#FFBE0B', '#F7C59F', '#FF9F1C']}
      sectionBg={isDark ? '#0d0500' : '#FFF9F5'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
