import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type ScheduleItem = {
    name : Text;
    time : Text;
    venue : Text;
    details : Text;
  };

  type RSVPRecord = {
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

  public type InviteRecord = {
    id : Text;
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

  module InviteRecord {
    public func compareByDate(a : InviteRecord, b : InviteRecord) : Order.Order {
      Text.compare(a.weddingDate, b.weddingDate);
    };
  };

  let invites = Map.empty<Text, InviteRecord>();

  public shared ({ caller }) func createInvite(id : Text, payload : InvitePayload) : async Text {
    if (invites.containsKey(id)) { Runtime.trap("ID already exists") };

    let newInvite : InviteRecord = {
      id;
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
    id;
  };

  public query ({ caller }) func getInvite(id : Text) : async ?InviteRecord {
    invites.get(id);
  };

  public shared ({ caller }) func updateInvite(id : Text, payload : InvitePayload) : async () {
    switch (invites.get(id)) {
      case (null) { Runtime.trap("ID does not exist") };
      case (?existingInvite) {
        let updatedInvite : InviteRecord = {
          id = existingInvite.id;
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
      };
    };
  };

  public shared ({ caller }) func submitRSVP(id : Text, rsvp : RSVPRecord) : async () {
    switch (invites.get(id)) {
      case (null) { Runtime.trap("Invite not found") };
      case (?invite) {
        let rsvpList = List.fromArray<RSVPRecord>(invite.rsvpResponses);
        rsvpList.add(rsvp);
        let updatedInvite = {
          id = invite.id;
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

  public query ({ caller }) func listSampleInvites() : async [InviteRecord] {
    let filtered = invites.values().toArray().filter(
      func(i) { i.isSample }
    );
    filtered.sort(InviteRecord.compareByDate);
  };

  func createSampleInvites() : [(Text, InviteRecord)] {
    let now = Time.now();

    let templateSamples : [(Text, InviteRecord)] = [
      templateSample("royal-rajasthani", "Rajasthani Royal", now + 1000000000_000_000),
      templateSample("mandala", "Temple Mandala", now + 1100000000_000_000),
      templateSample("cosmic-dark", "Dark Cosmic", now + 1200000000_000_000),
      templateSample("marigold", "Floral Marigold", now + 1300000000_000_000),
      templateSample("south-indian-bronze", "South Western Bronze", now + 1400000000_000_000),
      templateSample("minimal-sanskrit", "Minimalist", now + 1500000000_000_000),
      templateSample("sunset-beach", "Beach Vibes", now + 1600000000_000_000),
      templateSample("3d-floating-divine", "3D Floating Divine", now + 1700000000_000_000),
    ];
    templateSamples;
  };

  func templateSample(templateId : Text, coupleNames : Text, date : Int) : (Text, InviteRecord) {
    let sampleConfig = { isActive = true; customTitle = ""; customText = "" };
    let sampleEvent = {
      name = "Reception";
      time = "7 PM";
      venue = "Luxury Ballroom";
      details = "";
    };

    (
      templateId,
      {
        id = templateId;
        templateId = templateId;
        coupleNames = coupleNames;
        weddingDate = "2024-01-01";
        coverPhoto = "/assets/generated/cover.krc";
        bridePhoto = "/assets/generated/bride-xoko.png";
        groomPhoto = "/assets/generated/groom-xoko.png";
        galleryImages = [
          "/assets/generated/gallery.png",
          "/assets/generated/gallery2.png",
        ];
        backgroundMusic = "/assets/generated/music.mp3";
        events = [sampleEvent];
        rsvpResponses = [];
        customTextFields = [];
        sectionsConfig = [("section1", sampleConfig)];
        themeVariant = "light";
        createdAt = date;
        isSample = true;
      },
    );
  };
};
