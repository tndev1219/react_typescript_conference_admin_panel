export type TalkId = string;
export type TalkSpeaker = string;
export type TalkTitle = string;
export type TalkCategory = string;
export type TalkDescription = string;

export default interface Talk {
    readonly id: TalkId;
    readonly title: TalkTitle;
    readonly speaker: TalkSpeaker;
    readonly category: TalkCategory;
    readonly description: TalkDescription;
}
