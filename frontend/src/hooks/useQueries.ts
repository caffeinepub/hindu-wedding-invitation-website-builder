import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { InviteRecord, InvitePayload, RSVPRecord } from '../backend';

export function useGetInvite(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<InviteRecord | null>({
    queryKey: ['invite', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getInvite(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

export function useMyInvites() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return useQuery<InviteRecord[]>({
    queryKey: ['myInvites', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInvites();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 30000,
  });
}

export function useInviteCreator(inviteId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ['inviteCreator', inviteId],
    queryFn: async () => {
      if (!actor || !inviteId) return null;
      const result = await actor.getInviteCreator(inviteId);
      if (result === null) return null;
      return result.toString();
    },
    enabled: !!actor && !isFetching && !!inviteId,
    staleTime: 60000,
  });
}

export function useCreateInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: InvitePayload }) => {
      if (!actor) {
        throw new Error('Backend connection is not ready yet. Please wait a moment and try again.');
      }
      const result = await actor.createInvite(id, payload);
      if (result.__kind__ === 'error') throw new Error(result.error);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInvites'] });
    },
  });
}

export function useUpdateInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: InvitePayload }) => {
      if (!actor) {
        throw new Error('Backend connection is not ready yet. Please wait a moment and try again.');
      }
      const result = await actor.updateInvite(id, payload);
      if (result.__kind__ === 'error') throw new Error(result.error);
      return result.ok;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invite', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['myInvites'] });
    },
  });
}

export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, rsvp }: { id: string; rsvp: RSVPRecord }) => {
      if (!actor) {
        throw new Error('Backend connection is not ready yet. Please wait a moment and try again.');
      }
      return actor.submitInviteRSVP(id, rsvp);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invite', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['rsvpResponses', variables.id] });
    },
  });
}

export function useRSVPResponses(inviteId: string) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return useQuery<RSVPRecord[]>({
    queryKey: ['rsvpResponses', inviteId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRSVPResponses(inviteId);
    },
    enabled: !!actor && !isFetching && isAuthenticated && !!inviteId,
    staleTime: 30000,
    retry: false,
  });
}
