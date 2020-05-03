import React, { Component } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import { Typography, FormControl, InputLabel, Input, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import Validation from './Validations.js';
import { RegisterApi } from '../../QuizApi/QuizApi.jsx';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import evive from '../../public/eviveLogo.png';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'Column',
        justifyContent: 'space-around',
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
    double: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '8px'
    },
    error: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit,
        margin: theme.spacing.unit * 2,
        display: 'none',
        fontWeight: '300',
        fontFamily: 'PT Sans',
        textAlign: 'center'
    }
});


class Register extends Component {
    state = {
        disableInteraction: false,
        errorMsg: '',
        showErr: false,
        messageType: 'Error',
        ShowLoadable: false,
        FirstName: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        SecondName: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        DOB: {
            value: '',
            validity: true,
            validityErrorMessage: '',
        },
        USN: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        Email: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        Phone: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        Password1: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        Password2: {
            value: '',
            validity: false,
            validityErrorMessage: '',
        },
        validity: true,
    };
    Timer = 0;
    handleChange = typeOfField => (event) => {
        let validationResult;
        this.setState({
            [typeOfField]:
            {
                value: event.target.value,
            },
        });
        if (typeOfField === 'Password2') {
            const password = {
                password1: this.state.Password1.value,
                password2: event.target.value,
            };
            validationResult = Validation.validate(password, typeOfField);
        } else if(typeOfField === 'DOB' && event.target.value === ''){
                validationResult = { isValid: true, errMsg: [''] }
        } else {
            validationResult = Validation.validate(event.target.value, typeOfField);
        }


        this.setState({
            [typeOfField]:
            {
                value: event.target.value,
                validity: validationResult.isValid,
                validityErrorMessage: validationResult.isValid ? '' : validationResult.errMsg[0],
            },
        });
    };

    isEnabled = () => (
         this.state.FirstName.validity &&
        this.state.SecondName.validity &&
         this.state.DOB.validity &&
        this.state.Email.validity &&
        this.state.Phone.validity &&
        this.state.USN.validity &&
        this.state.Password1.validity &&
        this.state.Password2.validity
    );

    errorBlockStyle = () => {
        if (this.state.showErr === true) {
            if (this.state.messageType === 'Success') {
                return {
                    display: 'block',
                    color: '#1d2b22',
                    border: '1px solid #1d2b22',
                    backgroundColor: '#c0f1d6'
                }
            } else {
                return {
                    display: 'block',
                    border: '1px solid red',
                    backgroundColor: '#fdecea',
                    color: 'red'
                }
            }
        }
        return { display: 'none' }
    }
    signUp = () => {
        this.LoaderTimer = setInterval(() => this.setState({ ShowLoadable: true }), 1000);
        this.setState({ disableInteraction: true });
        const registrationInfo = {
            usn: this.state.USN.value,
            firstName: this.state.FirstName.value,
            lastName: this.state.SecondName.value,
            dob: this.state.DOB.value,
            email: this.state.Email.value,
            phone: this.state.Phone.value,
            password: this.state.Password1.value
        };

        RegisterApi(registrationInfo)
            .then(response => response.json())
            .then(data => {
                clearInterval(this.LoaderTimer);
                if (data.statusType === 'Error') {
                    this.setState({
                        showErr: true,
                        messageType: data.statusType,
                        errorMsg: data.message,
                        disableInteraction: false,
                        ShowLoadable: false
                    });
                    clearTimeout(this.Timer);
                    this.Timer = setTimeout(() => this.setState({ showErr: false }), 8000);
                } else {
                    this.setState({
                        showErr: true,
                        messageType: data.statusType,
                        errorMsg: data.message + "! Redirecting to login page...",
                        ShowLoadable: false,
                    });
                    this.Timer = setTimeout(() => this.redirectToLogin(), 3000);
                }
            })
            .catch(error => {
                clearInterval(this.LoaderTimer);
                this.setState({ disableInteraction: false, ShowLoadable: false });
                console.log(error);
            });
    }

    redirectToLogin = () => {
        this.setState({ ShowLoadable: false });
        this.props.history.push("/signin");
    }

    componentWillUnmount() {
        this.Timer = clearTimeout;
    }
    render() {
        const { classes } = this.props;
        console.log("ensbled",this.isEnabled());
        return (
            <React.Fragment>
                <CssBaseLine />
                <Loading show={this.state.ShowLoadable} color="blue" showSpinner={true} />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <img src={evive} />
                        <Typography component="h1" variant="h5">
                            Register
                </Typography>
                        <form className={classes.form}>
                            <div className={classes.double}>
                                <TextField id="fname"
                                    label="First Name"
                                    required={true}
                                    error={this.state.FirstName.validityErrorMessage !== ''}
                                    helperText={this.state.FirstName.validityErrorMessage}
                                    name="fname"
                                    onChange={this.handleChange('FirstName')}
                                    autoFocus />
                                <TextField
                                    label="Last name"
                                    id="lname"
                                    required={true}
                                    error={this.state.SecondName.validityErrorMessage !== ''}
                                    helperText={this.state.SecondName.validityErrorMessage}
                                    onChange={this.handleChange('SecondName')}
                                    autoComplete="name" />
                            </div>
                            <InputLabel htmlFor="usn"></InputLabel>
                            <TextField
                                id="usn"
                                name="usn"
                                required={true}
                                error={this.state.USN.validityErrorMessage !== ''}
                                helperText={this.state.USN.validityErrorMessage}
                                label="University Seat Number (Your Exam-Roll number)"
                                onChange={this.handleChange('USN')} fullWidth />

                            <FormControl margin="normal" fullWidth >
                                <TextField
                                    type="email"
                                    required={true}
                                    label="Email"
                                    error={this.state.Email.validityErrorMessage !== ''}
                                    helperText={this.state.Email.validityErrorMessage}
                                    onChange={this.handleChange('Email')}
                                    autoComplete="email" fullWidth />
                            </FormControl>
                            <FormControl margin="normal" fullWidth >
                                <TextField
                                    type="number"
                                    label="Phone"
                                    error={this.state.Phone.validityErrorMessage !== ''}
                                    helperText={this.state.Phone.validityErrorMessage}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    onChange={this.handleChange('Phone')}
                                    fullWidth required />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="date"
                                    label="DOB"
                                    type="date"
                                    error={this.state.DOB.validityErrorMessage !== ''}
                                    helperText={this.state.DOB.validityErrorMessage}
                                    className={classes.textField}
                                    onChange={this.handleChange('DOB')}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <div className={classes.double}>
                                <FormControl margin="normal" >
                                    <TextField
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Password"
                                        required={true}
                                        error={this.state.Password1.validityErrorMessage !== ''}
                                        helperText={this.state.Password1.validityErrorMessage}
                                        onChange={this.handleChange('Password1')}
                                        autoComplete="current-password" />
                                </FormControl>
                                <FormControl margin="normal" required >
                                    <TextField
                                        label="Confirm password"
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        required={true}
                                        error={this.state.Password2.validityErrorMessage !== ''}
                                        helperText={this.state.Password2.validityErrorMessage}
                                        onChange={this.handleChange('Password2')}
                                        autoComplete="current-password" />
                                </FormControl>
                            </div>
                            <div className={classes.error} style={this.errorBlockStyle()}>
                                {this.state.errorMsg}
                            </div>
                            <Button
                                disabled={this.state.disableInteraction || !this.isEnabled()}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => this.signUp()}
                                fullWidth>Register</Button>
                        </form>
                        <Link to='/signin'>
                            <Button color="primary">Already Registered? Login now</Button>
                        </Link>
                    </Paper>
                </main>
            </React.Fragment>)
    }
}

export default withRouter(withStyles(styles)(Register));