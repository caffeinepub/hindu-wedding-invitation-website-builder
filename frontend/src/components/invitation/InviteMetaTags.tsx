import { useEffect } from 'react';
import type { InviteRecord } from '../../backend';

interface InviteMetaTagsProps {
  invite: InviteRecord;
}

export default function InviteMetaTags({ invite }: InviteMetaTagsProps) {
  useEffect(() => {
    const title = `${invite.coupleNames} Wedding Invitation`;
    const description = invite.weddingDate
      ? `Join us to celebrate the wedding of ${invite.coupleNames} on ${invite.weddingDate}`
      : `You are cordially invited to the wedding of ${invite.coupleNames}`;

    // coverPhoto is now an ExternalBlob — get its URL via getDirectURL()
    let coverUrl = `${window.location.origin}/assets/generated/og-fallback.dim_1200x630.png`;
    try {
      const rawUrl = invite.coverPhoto?.getDirectURL?.() ?? '';
      if (rawUrl && !rawUrl.includes('cover.krc') && !rawUrl.startsWith('/assets/generated/cover')) {
        coverUrl = `${rawUrl}?v=${invite.createdAt}`;
      }
    } catch {
      // fall through to default
    }

    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    document.title = title;
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', coverUrl);
    setMeta('og:image:width', '1200');
    setMeta('og:image:height', '630');
    setMeta('og:type', 'website');
    setMeta('og:url', window.location.href);
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', coverUrl, true);

    return () => {
      document.title = 'Hindu Wedding Invitation Website Builder';
    };
  }, [invite]);

  return null;
}
