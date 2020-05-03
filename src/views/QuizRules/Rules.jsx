import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { BeginQuiz } from '../../QuizApi/QuizApi.jsx';


const styles = theme => ({

    rules: {
        color: 'green',
        backgroundColor: 'white',
        width: theme.spacing.unit * 100,
        border: '1px solid grey',
        borderRadius: theme.spacing.unit * 2,
        borderSpacing: '15px 50px',
        margin: theme.spacing.unit * 5,
        padding: theme.spacing.unit * 5,
        fontFamily: 'PT Sans',
        fontWeight: '900',
    },
    instructions: {
        paddingBottom: theme.spacing.unit * 3,
        fontFamily: 'PT Sans',
        fontWeight: '900'
    },
    testId: {
        width: theme.spacing.unit * 50
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    startButton: {
        marginTop: theme.spacing.unit * 2,
    },
    terms: {
        display: 'flex',
        flexDirection: 'row',
        width: theme.spacing.unit * 70,
        marginTop: theme.spacing.unit * 4
    },
    error: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        border: '1px solid red',
        borderRadius: theme.spacing.unit,
        backgroundColor: '#fdecea',
        margin: theme.spacing.unit * 2,
        color: 'red',
        display: 'none',
        fontWeight: '300'
    }
});

class RulesDiv extends Component {

    errorBlockStyle = () => {
        if (this.state.showErr === true) {
            return {
                display: 'block'
            }
        } else {
            return {
                display: 'none'
            }
        }
    }

    state = {
        testId: '',
        terms: false,
        errorMsg: '',
        showErr: false,
        DisbaleIntraction: false,
        firstName: ''
    };
    Timer = 0;
    LoaderTimer = 0;

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentWillUnmount() {
        this.Timer = clearTimeout;
        this.props.showLoadingBar(false);
        clearInterval(this.LoaderTimer);
    }

    onQuizBegin = () => {
        this.setState({ DisbaleIntraction: true });
        this.props.showLoadingBar(true);
        this.LoaderTimer = setInterval(() => this.props.showLoadingBar(true), 1000);
        const testId = this.state.testId;
        BeginQuiz(testId)
            .then(data => {
                if (data.valid === true) {
                    this.setState({ showErr: false, errorMsg: data.message })
                    console.log('Redirecting to quiz page');
                    this.props.history.push('/quiz');
                } else {
                    this.props.showLoadingBar(false);
                    this.setState({ DisbaleIntraction: false });
                    clearInterval(this.LoaderTimer);
                    clearTimeout(this.Timer);
                    this.setState({ showErr: true, errorMsg: data.message });
                    this.Timer = setTimeout(() => this.setState({ showErr: false }), 8000);
                }
            })
            .catch(error => {
                this.setState({ showErr: true, errorMsg: error });
                console.log(error)
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.rules}>
                <div className={classes.instructions}>Instructions</div>
                <Typography variant="body1" gutterBottom>
                    1. Kindly <b>check your system</b> (Mouse, keyboard etc). If not working properly, press log out button present at the top right corner of the screen and get your system changed.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    2. In order to start the test, <b>fill the "Test Id" and click the T&C</b>, provided by the invigilator.
                    </Typography>
                <Typography variant="body1" gutterBottom>
                    3. The test comprises of<b> MCQs</b> only.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    4. You are not <b>allowed to open any other tab</b> (except the ongoing test) or <b>swiping of the screens</b>. Doing so may lead to <b>submit your test forcefully.</b>
                 </Typography>
                <Typography variant="body1" gutterBottom>
                    5. Refreshing the page might submit your test.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    6. Don't <b>login on multiple systems</b> with same credentials while giving entrance test. It may end test forcefully.
                 </Typography>
                <Typography variant="body1" gutterBottom>
                    7. Do not close the browser window/tab before you submit your final answers. If you do so, there is no guarantee that your work will be saved.
            </Typography>
                <Typography variant="body1" gutterBottom>
                    8. After submitting the test you will be redirected to feedback page, please let us know about your experience.
            </Typography>



                <hr style={{ margin: '3rem 0' }} />
                <div className={classes.bottomContainer}>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Ready to solve the enterence test challenge?
                </Typography>
                    <form noValidate autoComplete="off" align="center" onSubmit={e => { e.preventDefault(); }}>
                        <FormControl className={classes.testId}>
                            <TextField
                                id="filled-password-input"
                                label="Test ID"
                                className={classes.textField}
                                value={this.state.testId}
                                name="testId"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange}
                                required
                            />
                        </FormControl>
                        <div className={classes.error} style={this.errorBlockStyle()}>
                            {this.state.errorMsg}
                        </div>
                        <div className={classes.terms}>
                            <Checkbox checked={this.state.terms} color="primary" onClick={() => this.setState({ terms: !this.state.terms })} />
                            <Typography variant="body1" gutterBottom>
                                I will not consult/copy code from any source including a website, book, or friend/colleague to complete these tests, though may refer language documentation or use an IDE that has code completion features.
                        </Typography>
                        </div>
                        <div className={classes.startButton}>
                            <Button disabled={!(this.state.terms && this.state.testId !== '' && !this.state.DisbaleIntraction)} variant="contained" color="primary" size="large" onClick={this.onQuizBegin}>
                                Start challenge
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

RulesDiv.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RulesDiv));