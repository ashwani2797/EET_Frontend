import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CssBaseLine from '@material-ui/core/CssBaseline';
import logo from '../../public/eviveLogo.png';
import logout from '../../public/logout.png';
import { SubmitFeedback, ForceLogout} from '../../QuizApi/QuizApi.jsx';

const styles = theme => ({

    topBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rules: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        width: theme.spacing.unit * 100,
        borderRadius: theme.spacing.unit * 2,
        borderSpacing: '15px 50px',
        margin: theme.spacing.unit * 5,
        padding: theme.spacing.unit * 5,
        fontFamily: 'PT Sans',
        fontWeight: '900',
        margin: 'auto',
        marginTop: '1em'
    },
    logout: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '2rem',
        marginTop: '1rem',
        alignItems: 'center'
    },
    user: {
        display: 'flex',
        marginRight: '2rem',
        alignItems: 'center'
    }
});

class Feedback extends Component {

    state = {
        feedback: '',
        error: false,
        disableSubmit: false
    }

    submitFeedback = () => {
        if (this.state.feedback == "") {
            this.setState({ error: true });
            return;
        }
        this.setState({ disableSubmit: true });

        SubmitFeedback(this.state.feedback)
            .then(data => {
                console.log("Feedback submitted", data);
                ForceLogout().then(() => {
                    console.log("Logged out");
                });
            }).catch(error => {
                console.log(error);
            })
    }

    handleChange = () => (event) => {
        this.setState({ feedback: event.target.value });
        if (event.target.value == '') {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
        }
    };


    render() {
        const { classes } = this.props;
        return <React.Fragment>
            <CssBaseLine />
            <div className={classes.logout}>
                <a href="/eet/logout"><img src={logout} /></a>
            </div>
            <div className={classes.topBody}>
                <img src={logo} />
                <div className={classes.rules}>
                    Tell us about your experiance!!
                     <TextField
                        id="filled-textarea"
                        label="Feedback"
                        placeholder="Please give your valuable feedback."
                        multiline
                        className={classes.textField}
                        onChange={this.handleChange('feedback')}
                        rowsMax="8"
                        rows="5"
                        margin="normal"
                        variant="outlined"
                        error={this.state.error}
                    />
                    <Button variant="contained" color="primary" size="large" disabled={this.state.disableSubmit} onClick={this.submitFeedback} >
                        Submit your valueable feedback
                </Button>
                </div>
            </div>
        </React.Fragment>
    }
}

export default withRouter(withStyles(styles)(Feedback));