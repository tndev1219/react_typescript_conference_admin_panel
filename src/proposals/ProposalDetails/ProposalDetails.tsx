import React, { StatelessComponent } from "react";

import DetailsSection from "./DetailsSection";
import "./ProposalDetails.css";

type Props = Readonly<{
    talk: {
        speaker?: string;
        category?: string;
        description?: string;
    };
}>

const ProposalDetails: StatelessComponent<Props> =
    ({ talk }) => {
        const { speaker, category, description } = talk;
        return (
            <div className="ProposalDetails">
                <DetailsSection
                    className="ProposalDetails__speaker"
                    name="speaker"
                >
                    <span className="ProposalDetails__speaker__value">
                        {speaker}
                    </span>
                </DetailsSection>
                <DetailsSection
                    className="ProposalDetails__category"
                    name="category"
                >
                    <span className="ProposalDetails__category__value">
                        {category}
                    </span>
                </DetailsSection>
                <DetailsSection
                    className="ProposalDetails__description"
                    name="description"
                >
                    <div className="ProposalDetails__description__value">
                        {description?.split('\n').map(string => (
                            <p key={string}>{string}</p>
                        ))}
                    </div>
                </DetailsSection>
            </div>
        );
    };

export default ProposalDetails;