import * as api from "../api";
import { TalkData } from "../api";
import Proposal, { ProposalStatus } from "./Proposal";
import { default as Talk, TalkId } from "./Talk";

const proposalStatusFrom = (rawStatus: string): ProposalStatus => {
    switch (rawStatus) {
        case "pending":
            return "pending";
        case "accepted":
            return "accepted";
        default:
            return "rejected";
    }
};

export const getProposalList =
    async (): Promise<Proposal[]> => {
        const talks = await api.getTalks();
        return talks.data.map(talk => ({
            ...talk,
            status: proposalStatusFrom("rejected"),
        }));
    };

export const setProposalStatus =
    async (proposalId: TalkId, status: ProposalStatus): Promise<void> => {
        await api.putCallForPapersEntry(proposalId, status);
    };

export const getTalk =
    async (talkId: TalkId): Promise<Talk | undefined> => {
        try {
            const data: TalkData = (await api.getTalk(talkId)).data;
            return { ...data };
        } catch (ignoredError) {
            return undefined;
        }
    };
