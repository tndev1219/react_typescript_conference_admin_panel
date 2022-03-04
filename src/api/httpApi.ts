import axios, { AxiosPromise } from "axios";

export interface BasicTalkData {
    readonly id: string;
    readonly title: string;
    readonly speaker: string;
    readonly category: string;
}

export interface TalkData extends BasicTalkData {
    readonly description: string;
}

export interface CallForPapersData {
    readonly byTalkId: {
        readonly [talkId: string]: ProposalData;
    };
}

export interface ProposalData {
    readonly status: string;
}

export const getTalks =
    (): AxiosPromise<BasicTalkData[]> =>
        axios.get("/talks");

export const getTalk =
    (talkId: TalkData["id"]): AxiosPromise<TalkData> =>
        axios.get(`/talks/${talkId}`);

export const getCallForPapers =
    (): AxiosPromise<CallForPapersData> =>
        axios.get("/callForPapers");

export const putCallForPapersEntry =
    (talkId: TalkData["id"], status: ProposalData["status"]): AxiosPromise<{}> =>
        axios.put(`/callForPapers/${talkId}`, { status });
