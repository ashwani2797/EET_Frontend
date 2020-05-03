import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { SubmitAnswers } from '../../QuizApi/QuizApi.jsx';
import { withRouter } from "react-router-dom";
import './styles/quiz.scss';
import zIndex from '@material-ui/core/styles/zIndex';


class Quiz extends Component {

    state = {
        answerMap: this.props.answersMap,
        endQuiz: this.props.timeout || this.props.disqualified,
        confirmDialog: false,
        attemptedIndex: new Set()

    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.disqualified == false && nextProps.disqualified == true) {
            return true;
        }
        if(this.props.timeout == false && nextProps.timeout == true){
            return true;
        }
        if (nextState != this.state) {
            return true;
        }
        
        if (nextProps === this.props) {
            return false;
        }

        if (nextProps.activeQuestion !== this.props.activeQuestion) {
            const element = this[nextProps.activeQuestion];
            if (element) {
                // 32 is padding
                this.props.scrollableContainer.current.scrollTop = element.current.offsetTop - 32;
            }
            return true;
        }
        return false;
    }

    componentWillMount() {
        let answersIds = Array.from(Object.keys(this.state.answerMap));
        let attempedArray = new Set();
        this.props.questions.forEach((question, index) => {
            this[question.id] = React.createRef();
            if (answersIds.includes(question.id)) {
                attempedArray.add(index + 1);
            }
        });
        this.setState({ attemptedIndex: attempedArray });
        var length = this.state.answerMap ? Object.keys(this.state.answerMap).length : 0;
        this.props.onChangeAnswers(length, attempedArray);
    }

    submit = (answerMap, endQuiz) => {
        const payload = {
            "answers": answerMap,
            "testSubmitted": endQuiz
        }
        SubmitAnswers(payload).then(data => {
            if (!endQuiz) {
                var length = answerMap ? Object.keys(answerMap).length : 0;
                this.props.onChangeAnswers(length, this.state.attemptedIndex);
            }
        }).catch(error => {
            this.setState({ isLoading: false }),
                console.log(error);
        })
    };

    renderOptions = (type, id, option, index, questionIndex) => {
        switch (type) {
            case 'RADIO':
                return (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio color="primary" />}
                        label={option}
                    />
                );

            case 'CHECKBOX':
                const answers = this.state.answerMap;
                return (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={answers[id] && answers[id].length > 0 && answers[id].includes(option) ? true : false}
                                onChange={() => this.handleCheckboxChange(id, option, questionIndex)}
                                value={option}
                                color="primary"
                            />
                        }
                        label={option}
                    />);
        }
    };

    handleRadioChange = (event, questionId, index) => {
        var set = this.state.attemptedIndex;
        set.add(index);
        const answers = this.state.answerMap;
        answers[questionId] = [event.target.value];
        this.setState({ answerMap: answers, attemptedIndex: set });
        this.submit(answers, false);
    };

    handleCheckboxChange = (id, option, questionIndex) => {
        var set = this.state.attemptedIndex;
        set.add(questionIndex);
        const answers = this.state.answerMap;
        if (answers[id] && answers[id].length > 0) {
            const selectedOptions = answers[id];
            if (selectedOptions.includes(option)) {
                const index = selectedOptions.indexOf(option);
                selectedOptions.splice(index, 1);
                if (selectedOptions.length === 0) {
                    set.delete(questionIndex);
                    delete answers[id];
                } else {
                    answers[id] = selectedOptions;
                }
            } else {
                selectedOptions.push(option);
                answers[id] = selectedOptions;
            }
        } else {
            answers[id] = [option];
        }
        this.setState({ answerMap: answers, attemptedIndex: set });
        this.submit(answers, false);

    }


    renderType = (question, questionIndex) => {
        switch (question.type) {
            case 'RADIO':
                let value = this.state.answerMap[question.id] && this.state.answerMap[question.id][0]
                    ? this.state.answerMap[question.id][0] : '';
                return (
                    <RadioGroup
                        aria-label="Choose one of these options"
                        name={"radio" + question.id}
                        className="group"
                        value={value}
                        onChange={event => this.handleRadioChange(event, question.id, questionIndex)}
                    >
                        {question.options.map((option, index) => this.renderOptions(question.type, question.id, option, index))}
                    </RadioGroup>

                );

            case 'CHECKBOX':
                return (
                    <FormControl component="fieldset" className="formControl">
                        {question.options.map((option, index) => this.renderOptions(question.type, question.id, option, index, questionIndex))}
                    </FormControl>
                );
        }
    };

    clearSelection = (questionId, index) => {
        const answers = this.state.answerMap;
        let indexSet = this.state.attemptedIndex;
        indexSet.delete(index);
        if (answers[questionId]) {
            delete answers[questionId];
        }
        this.setState({ answerMap: answers, attemptedIndex: indexSet });
        this.submit(answers, false);
    }

    renderQuestions = (question, index) => (
        <div className="card disableselect" key={index} ref={this[index]}>
            <Card>
                <CardContent>
                    <Typography gutterBottom>
                      <span className="questionIndex">{index}</span>&nbsp;
                        <span dangerouslySetInnerHTML={{ __html: question.text }} />
                    </Typography>

                    {this.renderType(question, index)}
                </CardContent>
                <CardActions>IndeterminateCheckBoxRounded
                    <Button size="small" onClick={() => this.clearSelection(question.id, index)}>Clear</Button>
                </CardActions>
            </Card>
        </div>

    );

    submitTest = () => {
        this.submit(this.state.answerMap, true);
        this.setState({ endQuiz: true })
    }

    redirectFeedback = () => {
        this.props.history.push('/feedback');
    };

    render() {
        const { questions, timeout, disqualified } = this.props;
        console.log("rendering, timeout",timeout);
        if (timeout || disqualified) {
            console.log("Time out or disqalified");
            this.submit(this.state.answerMap, true);
        }

        return (
            <React.Fragment>
                <div className="questionSubContainer">
                    {questions.map((question, index) => this.renderQuestions(question, index + 1))}
                    <div className='submitButton'>
                        <Button variant="contained" color="primary" size="large" onClick={() => this.setState({ confirmDialog: true })} >I am done with test</Button>
                    </div>
                </div>
                <div>
                    <Dialog
                        open={this.state.endQuiz || this.props.timeout || this.props.disqualified}

                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        <DialogTitle id="alert-dialog-title">Test finished</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thanks for taking the test.You have used up the alloted time for this test.
                                You will now be redirected to feedback page where you can leave message for us about your experience.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.redirectFeedback()} color="primary" autoFocus>
                                Proceed
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.confirmDialog}
                        onClose={() => this.setState({ confirmDialog: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableBackdropClick
                        disableEscapeKeyDown
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm test close"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Once closed, you can no longer view or modify this test.
                                Are you sure you are done, and want to close the test?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({ confirmDialog: false })} color="primary">
                                No, Go back
                            </Button>
                            <Button onClick={() => this.submitTest()} color="secondary" autoFocus>
                                Yes, close the test
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </React.Fragment>
        );
    };
}


Quiz.propTypes = {
    questions: PropTypes.array.isRequired,
    activeQuestion: PropTypes.string.isRequired,
    answersMap: PropTypes.object.isRequired,
    timeout: PropTypes.bool.isRequired,
    onChangeAnswers: PropTypes.func.isRequired,
    disqualified: PropTypes.bool.isRequired
};
export default withRouter(Quiz);