import React, { Component } from "react";
import { Link } from "react-router-dom";

import Loading from "../Loading";
import NotFound from "../NotFound";
import Page from "../Page";
import ProposalDetails from "./ProposalDetails";
import "./ProposalDetailsPage.css";
import { getTalk } from "./service";
import Talk, { TalkId } from "./Talk";

export type Props = Readonly<{
    talkId: TalkId;
}>

type State = Readonly<{
    isLoading: boolean;
    isNotFound: boolean;
    talk?: Talk;
}>

class ProposalDetailsPage extends Component<Props, State> {

    state: State = {
        isLoading: true,
        isNotFound: false,
        talk: undefined,
    };

    componentDidMount(): void {
        const { talkId } = this.props;
        getTalk(talkId).then(talk => {
            if (!talk) {
                this.setState({
                    isNotFound: true,
                    talk: undefined,
                    isLoading: false,
                })
            } else {
                this.setState({
                    isNotFound: false,
                    talk,
                    isLoading: false,
                })
            }
        });
    }

    render(): JSX.Element {
        const { isNotFound, talk, isLoading } = this.state;
        if (isNotFound) {
            return <NotFound />;
        }
        return (
            <Page
                className="ProposalDetailsPage"
                title={!talk ? "…" : talk.title}
            >
                <div className="ProposalDetailsPage__content">
                    <div>
                        <Link
                            className="ProposalDetailsPage__back"
                            to="/proposals"
                        >
                            back to Call for Papers
                        </Link>
                    </div>
                    {isLoading && <Loading />}
                    {talk && <ProposalDetails talk={this.state.talk ? this.state.talk : {}} />}
                </div>
            </Page>
        );
    }
}

export default ProposalDetailsPage;