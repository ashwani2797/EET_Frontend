import React, { Component } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import LockIcon from '@material-ui/icons/LockOutlined';
import { Typography, FormControl, InputLabel, Input, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import getQueryParameterByName from '../../util/getQueryparameterByName';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import evive from '../../public/eviveLogo.png';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'Column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class SignIn extends Component {

    LoaderTimer = 0;

    state = {
        loginError: getQueryParameterByName('error') !== null && getQueryParameterByName('error') === 'err1',
        ShowLoadable: false
    };

    submitForm = (e) => {
        console.log("Calling submit form");
        this.LoaderTimer = setInterval(() => this.setState({ ShowLoadable: true }), 200);
    };

    componentWillUnmount() {
        clearInterval(this.LoaderTimer);
        this.setState({ ShowLoadable: false })
    }

    handleClose = () => {
        this.setState({ loginError: false });
    };

    render() {
        const { classes } = this.props;
        const { loginError, ShowLoadable } = this.state;
        return (
            <React.Fragment>
                <CssBaseLine />
                <Loading show={this.state.ShowLoadable} color="blue" showSpinner={true} />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <img src={evive} />
                        <Typography variant="headline">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={this.submitForm} method='post' action='/eet/login'>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">University Seat Number (Exam-Roll number)</InputLabel>
                                <Input id="username" name="username" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name="password" type="password" autoComplete="current-password" />
                            </FormControl>
                            {/* <FormControlLabel
                                control={<Checkbox value="true" name="remember-me-new"  color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button type="submit" variant="contained" disabled={ShowLoadable} color="primary" className={classes.submit} fullWidth>Sign in</Button>
                        </form>
                        <Link to='/register'>
                            <Button color="primary">Register now</Button>
                        </Link>
                    </Paper>
                </main>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={loginError}
                    onClose={this.handleClose}
                    autoHideDuration={3000}
                    message={<span id="message-id">Invalid UID and password</span>}
                />
            </React.Fragment>

        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);

