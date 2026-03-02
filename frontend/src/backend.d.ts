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
export interface ScheduleItem {
    venue: string;
    name: string;
    time: string;
    details: string;
}
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
    coupleNames: string;
    backgroundMusic: string;
    rsvpResponses: Array<RSVPRecord>;
    bridePhoto: ExternalBlob;
}
export interface SectionConfig {
    isActive: boolean;
    customTitle: string;
    customText: string;
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
export interface backendInterface {
    createInvite(id: string, payload: InvitePayload): Promise<string>;
    getInvite(id: string): Promise<InviteRecord | null>;
    listSampleInvites(): Promise<Array<InviteRecord>>;
    submitRSVP(id: string, rsvp: RSVPRecord): Promise<void>;
    updateInvite(id: string, payload: InvitePayload): Promise<void>;
}
