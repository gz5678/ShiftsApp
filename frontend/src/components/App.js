import { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpPage from './SignUpPage';
import * as actions from '../store/actions/auth';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <SignUpPage {...this.props}></SignUpPage>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
