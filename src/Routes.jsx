import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import React, { Component } from 'react';
import Loader from './views/EviveLoader/Loader.jsx';

const SignIn = Loadable({
    loader: () => import('./views/login/Singin.jsx'),
    loading: Loader
})

const QuizRules = Loadable({
    loader: () => import('./views/QuizRules/QuizRules.jsx'),
    loading: Loader
})

const QuizWrapper = Loadable({
    loader: () => import('./views/Quiz/QuizWrapper.jsx'),
    loading: Loader
})

const Feedback = Loadable({
    loader: () => import('./views/feedback/Feedback.jsx'),
    loading: Loader
})

const Register = Loadable({
    loader: () => import('./views/Register/Register.jsx'),
    loading: Loader
})


class QuizRoutes extends Component {

    render() {
        return (
            <Router basename="/eet">
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/rules" component={QuizRules} />
                    <Route path="/quiz" component={QuizWrapper} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        );
    }
}

export default QuizRoutes;