import classNames from "classnames";
import React, { MouseEventHandler, StatelessComponent } from "react";

import ProposalDetails, { ProposalStatus } from "../../Proposal";
import { TalkId } from "../../Talk";
import "./ProposalRow.css";

const withoutEventDefault = (callback: () => void): MouseEventHandler<any> =>
    event => {
        event.preventDefault();
        callback();
    };

type Props = Readonly<{
    proposal: ProposalDetails;
    onStatusUpdate: (id: TalkId, status: ProposalStatus) => void;
}>

const ProposalRow: StatelessComponent<Props> = ({ proposal, onStatusUpdate }) => {
    const { id, title, speaker, category, status } = proposal;
    return (
        <div
            className={classNames("ProposalRow", status === "accepted" ? "ProposalRow--accepted" : status === "rejected" ? "ProposalRow--rejected" : "ProposalRow--unknown")}
        >
            <div className="ProposalsRow__status_indicator" />
            <div className="ProposalsRow__title">
                {title}
            </div>
            <div className="ProposalsRow__speaker">
                {speaker}
            </div>
            <div className="ProposalsRow__category">
                category: {category}
            </div>
            <div className="ProposalsRow__status">
                status: {status ? status : "(unknown)"}
            </div>
            {status !== "accepted" &&
                <div
                    className="ProposalsRow__accept_button_placeholder ProposalsRow__accept_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "accepted"))}
                >
                    Accept
                </div>
            }
            {status !== "rejected" &&
                <div
                    className="ProposalsRow__reject_button_placeholder ProposalsRow__reject_button"
                    onClick={withoutEventDefault(() => onStatusUpdate(id, "rejected"))}
                >
                    Reject
                </div>
            }
        </div>
    );
};

export default ProposalRow;