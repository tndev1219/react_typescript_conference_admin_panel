import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { StaticRouter } from "react-router-dom";

import { BasicTalkData, CallForPapersData } from "../api";
import { flushRequestsAndUpdate } from "../testUtils";
import ProposalListPage from "./ProposalListPage";

const renderProposalListPage = (): ReactWrapper =>
    mount(
        <StaticRouter context={{}}>
            <ProposalListPage/>
        </StaticRouter>,
    );

const firstProposalRowIn = (tree: ReactWrapper) =>
    tree.find(".ProposalList__item").first().find(".ProposalRow");

const basicTalkData = (overrides: Partial<BasicTalkData>): BasicTalkData => ({
    id: "any-id",
    title: "Any Title",
    speaker: "Any Speaker",
    category: "any category",
    ...overrides,
});

const callForPapersData = (data: CallForPapersData): CallForPapersData => data;

describe("<ProposalListPage>", () => {

    let httpMock: AxiosMockAdapter;

    beforeEach(() => {
        httpMock = new AxiosMockAdapter(axios);
        httpMock.onGet("/talks").reply(200, [
            basicTalkData({
                id: "any-id",
                title: "Any Title",
                speaker: "Any Speaker",
                category: "any category",
            }),
        ]);
        httpMock.onGet("/callForPapers").reply(200, callForPapersData({
            byTalkId: {
                "any-id": { status: "pending" },
            },
        }));
        httpMock.onPut(/^\/callForPapers\/.+/).reply(204);
    });

    test("updates changed proposal status locally", async () => {
        // given
        httpMock.onGet("/talks").reply(200, [
            basicTalkData({ id: "id-1" }),
        ]);
        httpMock.onGet("/callForPapers").reply(200, callForPapersData({
            byTalkId: {
                "id-1": { status: "pending" },
            },
        }));
        const tree = renderProposalListPage();
        await flushRequestsAndUpdate(tree);

        // then
        expect(firstProposalRowIn(tree)).not.toHaveClassName("ProposalRow--accepted");

        // and when
        firstProposalRowIn(tree)
            .find(".ProposalsRow__accept_button")
            .simulate("click");

        // then
        expect(firstProposalRowIn(tree)).toHaveClassName("ProposalRow--accepted");
    });

});
