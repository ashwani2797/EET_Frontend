import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseLine from '@material-ui/core/CssBaseline';

import Quiz from './Quiz.jsx';
import Sidebar from './SideBar.jsx';
import Timer from './Timer.jsx';

import logo from '../../public/eviveLogo.png';


const styles = theme => ({

    mainContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    topInfoBar: {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#39424e',
        color: 'white',
        height: '10vh',
        alignItems: 'center',
        paddingRight: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 3
    },
    subContainer: {
    },
    questionContainer: {
        display: 'flex',
    },
    time: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    alarm: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '8rem',
        border: '0.08rem solid white',
        borderRadius: '0.5rem',
        padding: '0.4rem',
        backgroundColor: 'green'
    }
});
class QuizContainer extends Component {

    componentWillMount() {
        this.scrollableContainer = React.createRef();
    }

    state = {
        activeQuestion: "1",
        seconds: this.props.remainingTime,
        time: {},
        noOfAnswers: this.props.answers ? Object.keys(this.props.answers).length : 0,
        timeout: this.props.remainingTime === 0 ? true : false,
        attemptedQuestions: new Set()
    }

    timer = 0;

    static secondsToTime = (secs) => {
        const hours = Math.floor(secs / (60 * 60));

        const divisor_for_minutes = secs % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);

        const divisor_for_seconds = divisor_for_minutes % 60;
        const seconds = Math.ceil(divisor_for_seconds);

        return {
            h: hours,
            m: minutes,
            s: seconds,
        };
    }

    handleQuestionLink = (questionId) => {
        this.setState({ activeQuestion: questionId });
    }

    countDown = () => {
        const seconds = this.state.seconds - 1;
        this.setState({
            time: QuizContainer.secondsToTime(seconds),
            seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            this.setState({ timeout: true });
            clearInterval(this.timer);
        }
    }

    answerChangeCallback = (length, indexSet) => {
        if (!this.state.timeout) {
            this.setState({
                noOfAnswers: length,
                attemptedQuestions: indexSet
            });
        }
    }

    componentDidMount() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }


    render() {
        const { classes, firstName, questions, answers } = this.props;
        const { time, timeout, noOfAnswers } = this.state;

        return (
            <React.Fragment>
                <CssBaseLine />
                <div className={classes.mainContainer}>
                    <header className={classes.topInfoBar}>
                        <img src={logo} height='70rem' />
                        <div>Entrance Test</div>
                        <Timer time={time} timeout={timeout} />
                        <div>{noOfAnswers}/{questions.length} Attempted</div>
                        <div> {firstName} </div>
                    </header>
                    <main className={classes.subContainer}>
                        <div className={classes.questionContainer}>
                            <div style={{
                                display: 'flex',
                                flex: '1 1 auto'
                            }}>
                                <Sidebar
                                    questions={questions}
                                    handleQuestionLink={this.handleQuestionLink}
                                    activeQuestion={this.state.activeQuestion}
                                    attemptedQuestions={this.state.attemptedQuestions}
                                />
                            </div>
                            <div
                                ref={this.scrollableContainer}
                                style={{
                                    flex: '9 0 auto',
                                    overflow: 'auto',
                                    maxHeight: '90vh',
                                    position: 'relative'
                                }}
                            >
                                <Quiz
                                    questions={questions}
                                    activeQuestion={this.state.activeQuestion}
                                    scrollableContainer={this.scrollableContainer}
                                    timeout={timeout}
                                    disqualified={this.props.disqualified}
                                    answersMap={answers}
                                    onChangeAnswers={this.answerChangeCallback}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>

        )
    }
}
QuizContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    answers: PropTypes.object.isRequired,
    remainingTime: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    disqualified: PropTypes.bool.isRequired
};

export default withStyles(styles)(QuizContainer);