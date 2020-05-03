import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CssBaseLine from '@material-ui/core/CssBaseline';
import logo from '../../public/eviveLogo.png';
import logout from '../../public/logout.png';
import user from '../../public/user.png';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css'
import { TestIdSet } from '../../QuizApi/QuizApi.jsx';
import RulesDiv from './Rules.jsx';



const styles = theme => ({
    topBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        fontWeight: '900'
    },
    testHeading: {
        color: '#878f99',
        fontFamily: 'PT Sans',
        fontWeight: '900'
    },
    media: {
        minHeight: 100,
        minWidth: 200
    },
    details: {
        marginButtom: theme.spacing.unit * 2
    },
    logout: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '2rem',
        marginTop: '1rem',
        alignItems:'center'
    },
    user: {
        display: 'flex',
        marginRight: '2rem',
        alignItems: 'center'
    }
})

class QuizRules extends Component {
    state = {
        ShowLoadable: false,
        firstName: ''
    }

    isLoading = (loading) => {
        this.setState({ ShowLoadable: loading });
    };

    componentWillMount() {
        TestIdSet().then(data => {
            if (data.urlPlannerResponse.valid === false) {
                this.props.history.push(data.urlPlannerResponse.redirectUrl);
            } else {
                this.setState({ firstName: data.name });
            }

        }).catch(error => {
            console.log(error)
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseLine />
                <Loading show={this.state.ShowLoadable} color="blue" showSpinner={true} />
                <div className={classes.logout}>
                <div className={classes.user}>
                    <img src={user}/> <span>{this.state.firstName}</span>
                </div>
                <a href="/eet/logout"><img src={logout}/></a>
                </div>
                <div className={classes.topBody}>
                    <img src={logo} />
                    <div className={classes.testHeading}>
                        <Typography className={classes.testHeading} component="h3" variant="h4" gutterBottom>
                            Entrance Test
                           </Typography>
                    </div>
                    <div >
                        Hi {this.state.firstName}! Kindly read the instructions carefully before proceeding with the test.
                     </div>
                    <div>
                        <RulesDiv showLoadingBar={this.isLoading} />
                    </div>
                </div>
            </React.Fragment>)

    }
}

QuizRules.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(QuizRules));