import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function ThreeDFloatingDivineTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'radial-gradient(ellipse at center, #1a0a3e 0%, #0d0020 100%)',
        backgroundImage: `radial-gradient(ellipse at 30% 40%, #7B68EE22 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #D4AF3722 0%, transparent 50%)`,
      }
    : {
        background: 'radial-gradient(ellipse at center, #3B1F6E 0%, #1a0a3e 100%)',
        backgroundImage: `radial-gradient(ellipse at 30% 40%, #D4AF3733 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #7B68EE33 0%, transparent 50%)`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0020', color: '#e8e0ff' }
    : { background: '#0d0020', color: '#e8e0ff' };

  return (
    <BaseTemplate
      invite={invite}
      variant="dark"
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#D4AF37"
      secondaryColor="#7B68EE"
      petalColors={['#D4AF37', '#7B68EE', '#9370DB', '#E8731A']}
      sectionBg="#0d0020"
      textColor="text-purple-50"
    />
  );
}
