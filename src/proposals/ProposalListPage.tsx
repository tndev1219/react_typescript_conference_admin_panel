import React, { Component } from "react";

import Loading from "../Loading";
import Page from "../Page";
import Proposal, { ProposalStatus } from "./Proposal";
import ProposalList from "./ProposalList";
import { getProposalList, setProposalStatus } from "./service";
import { TalkId } from "./Talk";

type State = Readonly<{
    isLoading: boolean,
    proposals: Proposal[],
}>

class ProposalListPage extends Component<{}, State> {

    state: State = {
        isLoading: true,
        proposals: [],
    };

    componentDidMount(): void {
        getProposalList().then(proposals => {
            this.setState({
                isLoading: false,
                proposals: proposals,
            });
        });
    }

    updateProposalStatus = (id: TalkId, status: ProposalStatus): void => {
        this.setState((prevState: State) => {
            const prevProposals = prevState.proposals;
            const nextProposals = prevProposals.map(proposal =>
                proposal.id === id
                    ? { ...proposal, status }
                    : proposal,
            );
            return {
                proposals: nextProposals,
            };
        });
        setProposalStatus(id, status);
    };

    render(): JSX.Element {
        const { proposals, isLoading } = this.state;
        return (
            <Page title="Call for Papers">
                {isLoading ? <Loading /> : <> </>}
                <ProposalList
                    proposals={proposals}
                    onProposalStatusUpdate={this.updateProposalStatus}
                />
            </Page>
        );
    }
}

export default ProposalListPage;
