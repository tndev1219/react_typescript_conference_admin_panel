import { TalkCategory, TalkId, TalkSpeaker, TalkTitle } from "./Talk";

export type ProposalStatus = "accepted" | "rejected" | "pending" | "unknown"

export default interface Proposal {
    readonly id: TalkId;
    readonly title: TalkTitle;
    readonly speaker: TalkSpeaker;
    readonly category: TalkCategory;
    readonly status: ProposalStatus;
}
