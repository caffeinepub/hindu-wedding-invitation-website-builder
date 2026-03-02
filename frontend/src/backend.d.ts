import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type UpdateInviteResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "error";
    error: string;
};
export type Time = bigint;
export interface RSVPRecord {
    name: string;
    attendance: boolean;
    message: string;
    guests: bigint;
}
export interface InviteRecord {
    id: string;
    galleryImages: Array<ExternalBlob>;
    weddingDate: string;
    groomPhoto: ExternalBlob;
    themeVariant: string;
    templateId: string;
    customTextFields: Array<[string, string]>;
    createdAt: bigint;
    sectionsConfig: Array<[string, SectionConfig]>;
    isSample: boolean;
    coverPhoto: ExternalBlob;
    events: Array<ScheduleItem>;
    creatorPrincipal: Principal;
    coupleNames: string;
    backgroundMusic: string;
    rsvpResponses: Array<RSVPRecord>;
    bridePhoto: ExternalBlob;
}
export type CreateInviteResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "error";
    error: string;
};
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export interface ScheduleItem {
    venue: string;
    name: string;
    time: string;
    details: string;
}
export interface InvitePayload {
    galleryImages: Array<ExternalBlob>;
    weddingDate: string;
    groomPhoto: ExternalBlob;
    themeVariant: string;
    templateId: string;
    customTextFields: Array<[string, string]>;
    sectionsConfig: Array<[string, SectionConfig]>;
    coverPhoto: ExternalBlob;
    events: Array<ScheduleItem>;
    coupleNames: string;
    backgroundMusic: string;
    bridePhoto: ExternalBlob;
}
export interface SectionConfig {
    isActive: boolean;
    customTitle: string;
    customText: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createInvite(id: string, payload: InvitePayload): Promise<CreateInviteResult>;
    generateInviteCode(): Promise<string>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInvite(id: string): Promise<InviteRecord | null>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getInviteCreator(inviteId: string): Promise<Principal | null>;
    getMyInvites(): Promise<Array<InviteRecord>>;
    getRSVPResponses(inviteId: string): Promise<Array<RSVPRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInviteRSVP(id: string, rsvp: RSVPRecord): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    updateInvite(id: string, payload: InvitePayload): Promise<UpdateInviteResult>;
}
