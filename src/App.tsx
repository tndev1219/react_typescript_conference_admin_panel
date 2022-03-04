import React, { StatelessComponent } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import { ProposalDetailsPage, ProposalListPage } from "./proposals";

const App: StatelessComponent =
    () => (
        <BrowserRouter>
            <div className="App">
                <main className="App_content">
                    <Switch>
                        <Route path="/proposals/:proposalId">
                            {({ match }) => (
                                <ProposalDetailsPage talkId={match ? match.params.proposalId : '123'} />
                            )}
                        </Route>
                        <Route path="/proposals">
                            {() => (
                                <ProposalListPage />
                            )}
                        </Route>
                        <Redirect to="/proposals" />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );

export default App;



