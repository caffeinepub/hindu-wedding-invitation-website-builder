# Specification

## Summary
**Goal:** Fix the "Backend connection unavailable" error that fires immediately when clicking "Publish Invitation" by making the actor readiness check fully reactive across the publish flow.

**Planned changes:**
- In `StepPublish.tsx`, replace the current actor readiness guard with a reactive implementation that derives an `isActorReady` boolean from the actor reference and Internet Identity session; disable the "Publish Invitation" button and show a "Connecting to backend…" spinner while the actor is not ready; add an explicit null-check in the publish handler that shows an inline error and aborts if the actor is still null at invocation time.
- In `CreateInvitePage.tsx`, add a top-level null-check at the start of `handlePublish` that returns early with a visible inline error message ("Backend connection unavailable — please wait a moment and try again") if the actor is null, before any payload assembly or canister call.
- In `frontend/src/hooks/useQueries.ts`, audit `useCreateInvite`, `useUpdateInvite`, and any other mutation hooks that call the actor; ensure each performs an explicit non-null check and returns a descriptive error object (e.g., `{ error: 'Actor not initialized' }`) instead of throwing a generic error when the actor is null.

**User-visible outcome:** The "Publish Invitation" button shows a "Connecting to backend…" state on mount and only becomes clickable once the backend actor is confirmed ready, preventing the immediate error. If the actor is still null at publish time, the user sees a clear inline retry message instead of an unhandled error.
