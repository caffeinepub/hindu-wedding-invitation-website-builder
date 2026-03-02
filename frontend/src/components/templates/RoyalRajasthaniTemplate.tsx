import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function RoyalRajasthaniTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'linear-gradient(160deg, #1a0005 0%, #3d0010 40%, #1a0005 100%)',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, #5d1f2744 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }
    : {
        background: 'linear-gradient(160deg, #7a0020 0%, #c0392b 40%, #8b0000 100%)',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, #D4AF3722 0%, transparent 70%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0005', color: '#FAF3E0' }
    : { background: '#FAF3E0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor="#D4AF37"
      secondaryColor="#C0392B"
      petalColors={['#D4AF37', '#C0392B', '#F4A832', '#8B0000']}
      sectionBg={isDark ? '#0d0005' : '#FAF3E0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
    />
  );
}
