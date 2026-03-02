import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function FloralMarigoldTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'linear-gradient(160deg, #2a1000 0%, #4a2000 50%, #2a1000 100%)',
      }
    : {
        background: 'linear-gradient(160deg, #E8731A 0%, #F4A832 50%, #E8731A 100%)',
        backgroundImage: `radial-gradient(ellipse at 30% 70%, #C0392B33 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #D4AF3733 0%, transparent 50%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#1a0800', color: '#FAF3E0' }
    : { background: '#FFFBF0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={isDark ? '#F4A832' : '#C0392B'}
      secondaryColor="#E8731A"
      petalColors={['#F4A832', '#E8731A', '#FFD700', '#FF6B35']}
      sectionBg={isDark ? '#1a0800' : '#FFFBF0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
