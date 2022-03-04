import classNames from "classnames";
import React, { StatelessComponent } from "react";

import "./DetailsSection.css";

type Props = Readonly<{
    className?: string;
    name: string;
    children: JSX.Element | JSX.Element[];
}>

const DetailsSection: StatelessComponent<Props> =
    ({ className, name, children }) => (
        <section className={classNames("DetailsSection", className)}>
            <div className="DetailsSection__name">
                {name}
            </div>
            <div className="DetailsSection__content">
                {children}
            </div>
        </section>
    );

export default DetailsSection;