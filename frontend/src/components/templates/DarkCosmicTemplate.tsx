import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function DarkCosmicTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = {
    background: isDark
      ? 'radial-gradient(ellipse at center, #0d0d2b 0%, #000010 100%)'
      : 'radial-gradient(ellipse at center, #1a1a4e 0%, #0a0a20 100%)',
    backgroundImage: `radial-gradient(ellipse at center, ${isDark ? '#0d0d2b' : '#1a1a4e'} 0%, #000010 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='50' cy='50' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='150' cy='80' r='1.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='250' cy='30' r='1' fill='white' opacity='0.7'/%3E%3Ccircle cx='350' cy='120' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='80' cy='200' r='2' fill='white' opacity='0.3'/%3E%3Ccircle cx='320' cy='250' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='180' cy='300' r='1.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='100' cy='350' r='1' fill='white' opacity='0.5'/%3E%3C/svg%3E")`,
  };

  const bodyStyle: React.CSSProperties = {
    background: '#000010',
    color: '#e8e0ff',
  };

  return (
    <BaseTemplate
      invite={invite}
      variant="dark"
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#D4AF37"
      secondaryColor="#7B68EE"
      petalColors={['#D4AF37', '#7B68EE', '#9370DB', '#FFD700']}
      sectionBg="#000010"
      textColor="text-purple-50"
    />
  );
}
