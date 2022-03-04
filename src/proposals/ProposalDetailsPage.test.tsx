import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { TalkData } from "../api";

import Loading from "../Loading";
import { flushRequestsAndUpdate } from "../testUtils";
import ProposalDetails from "./ProposalDetails";
import ProposalDetailsPage, { Props as ProposalDetailsPageProps } from "./ProposalDetailsPage";

const renderProposalDetailsPage = (props: Partial<ProposalDetailsPageProps>): ReactWrapper =>
    mount(
        <StaticRouter context={{}}>
            <ProposalDetailsPage
                talkId="any-id"
                {...props}
            />
        </StaticRouter>,
    );

const talkData = (overrides: Partial<TalkData>): TalkData => ({
    id: "any-id",
    title: "Any Title",
    speaker: "Any Speaker",
    category: "any category",
    description: "any description",
    ...overrides,
});

describe("<ProposalDetailsPage>", () => {

    const httpMock = new AxiosMockAdapter(axios);

    test("renders <Loading> before receiving response from API", async () => {
        // given
        httpMock.onGet("/talks/id-1").reply(200, talkData({
            id: "id-1",
        }));

        // when
        const tree = renderProposalDetailsPage({ talkId: "id-1" });
        // and no requests are flushed

        // then
        expect(tree.find(Loading)).toExist();
    });

    test("does not render <ProposalDetails> before receiving response from API", async () => {
        // given
        httpMock.onGet("/talks/id-1").reply(200, talkData({
            id: "id-1",
        }));

        // when
        const tree = renderProposalDetailsPage({ talkId: "id-1" });
        // and no requests are flushed

        // then
        expect(tree.find(ProposalDetails)).not.toExist();
    });

    test("uses proposal title as header", async () => {
        // given
        httpMock.onGet("/talks/id-1").reply(200, talkData({
            id: "id-1",
            title: "Best Title Ever",
        }));

        // when
        const tree = renderProposalDetailsPage({ talkId: "id-1" });
        await flushRequestsAndUpdate(tree);

        // then
        expect(tree.find(".Page__title")).toHaveText("Best Title Ever");
    });

    test("uses /talks/:talkId API response to render proposal: category", async () => {
        // given
        httpMock.onGet("/talks/id-1").reply(200, talkData({
            id: "id-1",
            category: "testing",
        }));

        // when
        const tree = renderProposalDetailsPage({ talkId: "id-1" });
        await flushRequestsAndUpdate(tree);

        // then
        const proposal = tree.find(ProposalDetails);
        expect(proposal.find(".ProposalDetails__category__value"))
            .toHaveText("testing");
    });

});
