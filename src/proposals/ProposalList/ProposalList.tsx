import React, { StatelessComponent } from "react";
import { Link } from "react-router-dom";

import ProposalDetails from "../Proposal";
import "./ProposalList.css";
import ProposalRow from "./ProposalRow";
import { TalkId } from "../Talk";
import { ProposalStatus } from "../Proposal";

export type Props = Readonly<{
    proposals: ProposalDetails[];
    onProposalStatusUpdate: (id: TalkId, status: ProposalStatus) => void;
}>

const ProposalList: StatelessComponent<Props> =
    (props: Props) => (
        <ul className="ProposalList">
            {props.proposals.map((proposal: ProposalDetails) => (
                <li
                    key={proposal.id}
                    className="ProposalList__item"
                >
                    <Link
                        key={proposal.id}
                        className="ProposalList__item__link"
                        to={`/proposals/${proposal.id}`}
                    >
                        <ProposalRow
                            proposal={proposal}
                            onStatusUpdate={props.onProposalStatusUpdate}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );

export default ProposalList;
