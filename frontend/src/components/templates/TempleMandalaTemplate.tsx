import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function TempleMandalaTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'linear-gradient(160deg, #1a0800 0%, #3d1500 50%, #1a0800 100%)',
        backgroundImage: `radial-gradient(circle at 50% 50%, #8B450022 0%, transparent 60%)`,
      }
    : {
        background: 'linear-gradient(160deg, #8B4500 0%, #C0602B 50%, #8B4500 100%)',
        backgroundImage: `radial-gradient(circle at 50% 50%, #FAF3E022 0%, transparent 60%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0500', color: '#FAF3E0' }
    : { background: '#FFF8F0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#E8731A"
      secondaryColor="#8B4500"
      petalColors={['#E8731A', '#F4A832', '#C0602B', '#D4AF37']}
      sectionBg={isDark ? '#0d0500' : '#FFF8F0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
