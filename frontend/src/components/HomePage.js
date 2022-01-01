import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import SignInPage from './SignInPage';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <p>This is the home page</p>
                    </Route>
                    <Route path="/login" component={SignInPage} />
                </Switch>
            </Router>
        );
    }
}