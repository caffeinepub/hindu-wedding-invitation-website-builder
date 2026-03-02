# Specification

## Summary
**Goal:** Replace the overlapping filigree frame overlay on bride/groom photos with a premium CSS border, and add a WhatsApp sharing button to the invitation page.

**Planned changes:**
- In `FloatingPhotoFrame.tsx` and `BaseTemplate.tsx`, remove the SVG filigree/overlay element that renders on top of or across the photo area
- Add a premium multi-layered CSS border around the photo container (gold/saffron tones, subtle inset shadow and outer glow, slightly rounded or ornate corners) so the photo is fully visible at all times
- Retain the existing 3D floating/bobbing animation and reduce-motion toggle on the photo frame container
- Add a WhatsApp sharing button to the published invitation page (`/invite/:id`), placed near the existing share/QR section
- The WhatsApp button opens `https://wa.me/?text=<encoded message>` in a new tab, with a message containing the couple names, wedding date, and full invitation URL
- Style the WhatsApp button with gold/saffron accents and matching typography (Cormorant Garamond or Cinzel), responsive for mobile and desktop

**User-visible outcome:** Bride and groom photos are fully visible with a premium gold border frame (no overlapping overlay), and visitors on any published invitation page can share it directly via WhatsApp with one click.
