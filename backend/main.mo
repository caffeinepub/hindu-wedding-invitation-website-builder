import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import InviteLinksModule "invite-links/invite-links-module";
import Random "mo:core/Random";


actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Initialize the invite links system state
  let inviteState = InviteLinksModule.initState();

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type ScheduleItem = {
    name : Text;
    time : Text;
    venue : Text;
    details : Text;
  };

  public type RSVPRecord = {
    name : Text;
    attendance : Bool;
    guests : Nat;
    message : Text;
  };

  type SectionConfig = {
    isActive : Bool;
    customTitle : Text;
    customText : Text;
  };

  type InvitePayload = {
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Storage.ExternalBlob;
    bridePhoto : Storage.ExternalBlob;
    groomPhoto : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    backgroundMusic : Text;
    events : [ScheduleItem];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, SectionConfig)];
    themeVariant : Text;
  };

  type CreateInviteResult = {
    #ok : Text;
    #error : Text;
  };

  type UpdateInviteResult = {
    #ok : ();
    #error : Text;
  };

  public type InviteRecord = {
    id : Text;
    creatorPrincipal : Principal;
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Storage.ExternalBlob;
    bridePhoto : Storage.ExternalBlob;
    groomPhoto : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    backgroundMusic : Text;
    events : [ScheduleItem];
    rsvpResponses : [RSVPRecord];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, SectionConfig)];
    themeVariant : Text;
    createdAt : Int;
    isSample : Bool;
  };

  let invites = Map.empty<Text, InviteRecord>();

  func validateOwner(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: anonymousId is not allowed as owner");
    };
  };

  func validatePrincipal(caller : Principal, invite : ?{ creatorPrincipal : Principal }) {
    switch (invite) {
      case (null) { Runtime.trap("Invite does not exist") };
      case (?invite) {
        if (invite.creatorPrincipal != caller) {
          Runtime.trap("Caller does not own this invite");
        };
      };
    };
  };

  public shared ({ caller }) func createInvite(id : Text, payload : InvitePayload) : async CreateInviteResult {
    validateOwner(caller);
    if (invites.containsKey(id)) {
      return #error("Invite ID already exists");
    };

    let newInvite : InviteRecord = {
      id;
      creatorPrincipal = caller;
      templateId = payload.templateId;
      coupleNames = payload.coupleNames;
      weddingDate = payload.weddingDate;
      coverPhoto = payload.coverPhoto;
      bridePhoto = payload.bridePhoto;
      groomPhoto = payload.groomPhoto;
      galleryImages = payload.galleryImages;
      backgroundMusic = payload.backgroundMusic;
      events = payload.events;
      rsvpResponses = [];
      customTextFields = payload.customTextFields;
      sectionsConfig = payload.sectionsConfig;
      themeVariant = payload.themeVariant;
      createdAt = Time.now();
      isSample = false;
    };

    invites.add(id, newInvite);
    #ok(id);
  };

  public query ({ caller }) func getInvite(id : Text) : async ?InviteRecord {
    invites.get(id);
  };

  public query ({ caller }) func getMyInvites() : async [InviteRecord] {
    let filtered = invites.filter(
      func(_id, invite) {
        invite.creatorPrincipal == caller;
      }
    );
    filtered.values().toArray();
  };

  public query ({ caller }) func getInviteCreator(inviteId : Text) : async ?Principal {
    switch (invites.get(inviteId)) {
      case (null) {
        Runtime.trap("Invite not found");
      };
      case (?invite) {
        ?invite.creatorPrincipal;
      };
    };
  };

  public shared ({ caller }) func updateInvite(id : Text, payload : InvitePayload) : async UpdateInviteResult {
    validatePrincipal(caller, invites.get(id));
    switch (invites.get(id)) {
      case (null) {
        return #error("Invite ID does not exist");
      };
      case (?existingInvite) {
        let updatedInvite : InviteRecord = {
          id = existingInvite.id;
          creatorPrincipal = existingInvite.creatorPrincipal;
          templateId = payload.templateId;
          coupleNames = payload.coupleNames;
          weddingDate = payload.weddingDate;
          coverPhoto = payload.coverPhoto;
          bridePhoto = payload.bridePhoto;
          groomPhoto = payload.groomPhoto;
          galleryImages = payload.galleryImages;
          backgroundMusic = payload.backgroundMusic;
          events = payload.events;
          rsvpResponses = existingInvite.rsvpResponses;
          customTextFields = payload.customTextFields;
          sectionsConfig = payload.sectionsConfig;
          themeVariant = payload.themeVariant;
          createdAt = existingInvite.createdAt;
          isSample = existingInvite.isSample;
        };
        invites.add(id, updatedInvite);
        #ok(());
      };
    };
  };

  public shared ({ caller }) func submitInviteRSVP(id : Text, rsvp : RSVPRecord) : async () {
    switch (invites.get(id)) {
      case (null) {
        Runtime.trap("Invite not found");
      };
      case (?invite) {
        let rsvpList = List.fromArray<RSVPRecord>(invite.rsvpResponses);
        rsvpList.add(rsvp);
        let updatedInvite = {
          id = invite.id;
          creatorPrincipal = invite.creatorPrincipal;
          templateId = invite.templateId;
          coupleNames = invite.coupleNames;
          weddingDate = invite.weddingDate;
          coverPhoto = invite.coverPhoto;
          bridePhoto = invite.bridePhoto;
          groomPhoto = invite.groomPhoto;
          galleryImages = invite.galleryImages;
          backgroundMusic = invite.backgroundMusic;
          events = invite.events;
          rsvpResponses = rsvpList.toArray();
          customTextFields = invite.customTextFields;
          sectionsConfig = invite.sectionsConfig;
          themeVariant = invite.themeVariant;
          createdAt = invite.createdAt;
          isSample = invite.isSample;
        };
        invites.add(id, updatedInvite);
      };
    };
  };

  public query ({ caller }) func getRSVPResponses(inviteId : Text) : async [RSVPRecord] {
    validatePrincipal(caller, invites.get(inviteId));
    switch (invites.get(inviteId)) {
      case (null) {
        Runtime.trap("Invite not found");
      };
      case (?invite) {
        invite.rsvpResponses;
      };
    };
  };

  // Invite Links Integration

  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public shared func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
};
