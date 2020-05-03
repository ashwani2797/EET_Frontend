import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    sideBarContainer: {
        backgroundColor: '#39424e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '90vh',
        overflow: 'auto'
    },

    numberContainer: {
        display: 'flex',
        width: theme.spacing.unit * 5,
        border: '2px solid white',
        borderRadius: '50%',
        margin: '0.5rem 1rem',
        padding: '1rem',
        height: theme.spacing.unit * 5,
        backgroundColor: '#39424e',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    }
});
class SideBar extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    getStyle = (questionId) => {

        let attemptedId = this.props.attemptedQuestions;
        let isActive = this.props.activeQuestion == questionId;
        let isAttempted = attemptedId && attemptedId.has(questionId);

        if(isActive && isAttempted){
            return {
                backgroundColor: 'white',
                color: '#39424e',
                border: '2px solid green',
            }
        }

        if (isActive) {
            return {
                backgroundColor: 'white',
                color: '#39424e',
                border: '4px solid #39424e',
            }
        }

        if (isAttempted) {
            return {
                backgroundColor: 'green',
            }
        }
        return { backgroundColor: 'inherit' };
    }

    renderIds = (index, classes) => (
        <div
            className={classes.numberContainer}
            style={this.getStyle(index)}
            key={index}
            onClick={() => this.props.handleQuestionLink(index.toString())}
        >
            {index}
        </div>
    );

    render() {
        const { classes, questions } = this.props;

        return <div className={classes.sideBarContainer}>
            {questions.map((question, index) => this.renderIds(index + 1, classes))}
        </div>;
    }
}

SideBar.prototypes = {
    questions: PropTypes.array.isRequired,
    handleQuestionLink: PropTypes.func,
    activeQuestion: PropTypes.string.isRequired,
    attemptedQuestions: PropTypes.array.isRequired
}

SideBar.defaultProps = {
    handleQuestionLink: () => { },
}

export default withStyles(styles)(SideBar);