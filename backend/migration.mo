import Map "mo:core/Map";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";
import List "mo:core/List";

module {
  type OldScheduleItem = {
    name : Text;
    time : Text;
    venue : Text;
    details : Text;
  };

  type OldRSVPRecord = {
    name : Text;
    attendance : Bool;
    guests : Nat;
    message : Text;
  };

  type OldSectionConfig = {
    isActive : Bool;
    customTitle : Text;
    customText : Text;
  };

  type OldInvitePayload = {
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Text;
    bridePhoto : Text;
    groomPhoto : Text;
    galleryImages : [Text];
    backgroundMusic : Text;
    events : [OldScheduleItem];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, OldSectionConfig)];
    themeVariant : Text;
  };

  type OldInviteRecord = {
    id : Text;
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Text;
    bridePhoto : Text;
    groomPhoto : Text;
    galleryImages : [Text];
    backgroundMusic : Text;
    events : [OldScheduleItem];
    rsvpResponses : [OldRSVPRecord];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, OldSectionConfig)];
    themeVariant : Text;
    createdAt : Int;
    isSample : Bool;
  };

  type OldActor = {
    invites : Map.Map<Text, OldInviteRecord>;
  };

  type NewScheduleItem = {
    name : Text;
    time : Text;
    venue : Text;
    details : Text;
  };

  type NewRSVPRecord = {
    name : Text;
    attendance : Bool;
    guests : Nat;
    message : Text;
  };

  type NewSectionConfig = {
    isActive : Bool;
    customTitle : Text;
    customText : Text;
  };

  type NewInvitePayload = {
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Storage.ExternalBlob;
    bridePhoto : Storage.ExternalBlob;
    groomPhoto : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    backgroundMusic : Text;
    events : [NewScheduleItem];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, NewSectionConfig)];
    themeVariant : Text;
  };

  type NewInviteRecord = {
    id : Text;
    templateId : Text;
    coupleNames : Text;
    weddingDate : Text;
    coverPhoto : Storage.ExternalBlob;
    bridePhoto : Storage.ExternalBlob;
    groomPhoto : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    backgroundMusic : Text;
    events : [NewScheduleItem];
    rsvpResponses : [NewRSVPRecord];
    customTextFields : [(Text, Text)];
    sectionsConfig : [(Text, NewSectionConfig)];
    themeVariant : Text;
    createdAt : Int;
    isSample : Bool;
  };

  public func run(old : OldActor) : { invites : Map.Map<Text, NewInviteRecord> } {
    let newInvites = old.invites.map<Text, OldInviteRecord, NewInviteRecord>(
      func(_id, oldInvite) {
        convertOldInviteRecord(oldInvite);
      }
    );
    { invites = newInvites };
  };

  func convertOldInviteRecord(old : OldInviteRecord) : NewInviteRecord {
    {
      id = old.id;
      templateId = old.templateId;
      coupleNames = old.coupleNames;
      weddingDate = old.weddingDate;
      coverPhoto = "";
      bridePhoto = "";
      groomPhoto = "";
      galleryImages = [];
      backgroundMusic = old.backgroundMusic;
      events = convertEvents(old.events);
      rsvpResponses = convertRSVPRecords(old.rsvpResponses);
      customTextFields = old.customTextFields;
      sectionsConfig = convertSectionsConfig(old.sectionsConfig);
      themeVariant = old.themeVariant;
      createdAt = old.createdAt;
      isSample = old.isSample;
    };
  };

  func convertEvents(oldEvents : [OldScheduleItem]) : [NewScheduleItem] {
    oldEvents.map(convertEvent);
  };

  func convertEvent(old : OldScheduleItem) : NewScheduleItem {
    {
      name = old.name;
      time = old.time;
      venue = old.venue;
      details = old.details;
    };
  };

  func convertRSVPRecords(oldRecords : [OldRSVPRecord]) : [NewRSVPRecord] {
    oldRecords.map(convertRSVPRecord);
  };

  func convertRSVPRecord(old : OldRSVPRecord) : NewRSVPRecord {
    {
      name = old.name;
      attendance = old.attendance;
      guests = old.guests;
      message = old.message;
    };
  };

  func convertSectionsConfig(oldConfig : [(Text, OldSectionConfig)]) : [(Text, NewSectionConfig)] {
    let configList = List.fromArray<(Text, OldSectionConfig)>(oldConfig);
    configList.map<(Text, OldSectionConfig), (Text, NewSectionConfig)>(
      func((key, value)) {
        (key, convertSectionConfig(value));
      }
    ).toArray();
  };

  func convertSectionConfig(old : OldSectionConfig) : NewSectionConfig {
    {
      isActive = old.isActive;
      customTitle = old.customTitle;
      customText = old.customText;
    };
  };
};
