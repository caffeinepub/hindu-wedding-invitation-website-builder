# Specification

## Summary
**Goal:** Fix HTTP 413 "payload too large" errors when publishing wedding invites with photos by implementing a chunked image upload system.

**Planned changes:**
- Add `uploadImageChunk(inviteId, fieldKey, chunkIndex, totalChunks, chunkData)` endpoint to the Motoko backend that accepts image data in chunks (≤1MB each)
- Add `finalizeImage(inviteId, fieldKey)` endpoint to the Motoko backend that reassembles chunks in order and stores the complete image in the invite record
- Remove raw Base64 image data from `createInvite` and `updateInvite` payloads in the backend
- Update `StepPhotoUpload.tsx` to split image Base64 data into ≤1MB chunks, upload sequentially via `uploadImageChunk`, then call `finalizeImage`, storing only a field reference in form state
- Update `StepGalleryMusic.tsx` to use the same chunked upload flow for gallery images
- Update `CreateInvitePage` to omit raw image data from the final `createInvite`/`updateInvite` payload
- Show per-image upload progress UI during chunk transmission

**User-visible outcome:** Users can upload and publish wedding invites with multiple photos without encountering HTTP 413 errors. Photos still display correctly on the published invite page, and a progress indicator is shown during each image upload.
