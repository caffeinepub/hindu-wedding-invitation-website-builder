import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { InvitePayload, RSVPRecord, InviteRecord } from '../backend';

export function useListSampleInvites() {
  const { actor, isFetching } = useActor();
  return useQuery<InviteRecord[]>({
    queryKey: ['sampleInvites'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSampleInvites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInvite(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<InviteRecord | null>({
    queryKey: ['invite', id],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getInvite(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: InvitePayload }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.createInvite(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sampleInvites'] });
    },
  });
}

export function useUpdateInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: InvitePayload }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.updateInvite(id, payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invite', variables.id] });
    },
  });
}

export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, rsvp }: { id: string; rsvp: RSVPRecord }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.submitRSVP(id, rsvp);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invite', variables.id] });
    },
  });
}
