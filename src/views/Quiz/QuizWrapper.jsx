import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { GetQuizDetails } from '../../QuizApi/QuizApi.jsx'
import { withRouter } from 'react-router-dom';
import QuizContainer from './QuizContainer.jsx'
import { pageVisibilityApi } from "./utils/pageVisibiltyUtil.jsx";
import { fullScreenApi } from './utils/fullScreenUtil.jsx';
import { exitFullscreen } from './utils/fullScreenUtil.jsx';
import { SubmitWarning } from './../../QuizApi/QuizApi.jsx';

const { hidden, visibilityChange } = pageVisibilityApi();
class QuizWrapper extends Component {
    state = {
        isLoading: true,
        urlPlannerResponse: {},
        questions: {},
        answers: {},
        remainingTime: 0,
        fullScreen: true,
        warning: false,
        warningsAllowed: 0,
        warningsShown: 0
    }

    saveWarning = () => {
        var count = this.state.warningsShown + 1;
        this.setState({ warning: true, warningsShown: count });
        SubmitWarning(count)
            .then(data => {
                console.log("Warning saved");
            });
    };


    handleVisibilityChange = () => {
        if (document[hidden]) {
            this.saveWarning();
        }
    }

    handleExitScreenChange = () => {
        if ((document.webkitIsFullScreen != undefined && !document.webkitIsFullScreen)
            || (document.mozFullScreen != undefined && !document.mozFullScreen)) {
            this.saveWarning();
        }
    }

    componentDidMount() {
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
            alert("This page requires a modern browser that supports the Page Visibility API.");
        } else {
            // Handle page visibility change   
            document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
        }

        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
            eventType => document.addEventListener(eventType, this.handleExitScreenChange, false)
        );

        GetQuizDetails().then(data => {
            var randomQuestions = data.questions.sort(function () { return 0.5 - Math.random() });
            randomQuestions.map(question => {
                question.options.sort(function () { return 0.5 - Math.random() });
            });
            this.setState({
                urlPlannerResponse: data.urlPlannerResponse,
                isLoading: false,
                questions: randomQuestions,
                answers: data.answerListMap,
                remainingTime: data.remainingTime,
                firstName: data.firstName,
                warningsAllowed: data.warningsAllowed,
                warningsShown: data.warningsShown
            });
        }).catch(error => {
            this.setState({ isLoading: false }),
                console.log(error);
        })
    }

    componentWillUnmount() {
        document.removeEventListener(visibilityChange, this.handleVisibilityChange, false);

        ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
            eventType => document.removeEventListener(eventType, this.handleExitScreenChange, false)
        );
        exitFullscreen();
    }


    callFullScreen = () => {
        fullScreenApi(document.documentElement);
        this.setState({ fullScreen: false, warning: false });
    }

    render() {
        if (!this.state.isLoading) {
            if (this.state.urlPlannerResponse.valid === false) {
                this.props.history.push(this.state.urlPlannerResponse.redirectUrl);
                return <div>Loading...</div>;
            }
            const { warningsAllowed, warningsShown } = this.state;
            let isUserDisqaulified = false;
            if (warningsAllowed != 0 && (warningsAllowed - warningsShown) <= 0){
                isUserDisqaulified = true;
            }
                return <React.Fragment>
                    <Dialog
                        open={this.state.fullScreen}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        <DialogTitle id="alert-dialog-title">{"Full screen mode"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Entering full screen mode.
                                You are not allowed to switch the tabs and change the screen while giving the test.
                                Your all actions are getting recorded.
    
                </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.callFullScreen()} color="primary" autoFocus>
                                Proceed
                </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.warning}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        <DialogTitle id="alert-dialog-title">{"Warning !!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Exit full screen and scrolling between tabs and screens are not allowed between the test.
                                Further actions may submit your test forcefully.
                </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.callFullScreen()} color="primary" autoFocus>
                                Proceed
                </Button>
                        </DialogActions>
                    </Dialog>

                    <QuizContainer
                        questions={this.state.questions}
                        answers={this.state.answers}
                        remainingTime={this.state.remainingTime}
                        firstName={this.state.firstName}
                        disqualified={isUserDisqaulified}
                    />
                </React.Fragment>
        }
        return <span>Loading...</span>
    }

}

export default withRouter(QuizWrapper);