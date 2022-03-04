import classNames from "classnames";
import React, { StatelessComponent } from "react";

import "./Page.css";

type Props = Readonly<{
    className?: string;
    title: string;
    children: JSX.Element | JSX.Element[]
}>

const Page: StatelessComponent<Props> =
    ({ className, title, children }) => (
        <section className={classNames("Page", className)}>
            <h1 className="Page__title">{title}</h1>
            {children}
        </section>
    );

export default Page;
