
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { List, Alarm } from '@material-ui/icons';

const styles = theme => ({
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




class Timer extends Component {

getStyle = (hours ,minutes) => {
    if(hours == 0 && minutes < 5){
        return {
            backgroundColor: '#d09435'
        }
    } else{
        return {
            backgroundColor: 'green'
        }
    }
}

    render() {
        const { time, timeout, classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.alarm} style={this.getStyle(time.h ,time.m)}>
                    <Alarm />
                    <div className={classes.time}>
                        <div>
                            {time.h > 0 && (<span>{time.h}h </span>)}
                            {(time.h > 0 || time.m > 0) && (<span>{time.m}m </span>)}
                            {time.h <= 0 && (<span>{time.s}s</span>)}
                        </div>
                        <div>
                            <span>remaining</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Timer.propTypes = {
    time: PropTypes.object.isRequired,
    timeout: PropTypes.bool.isRequired
}

export default withStyles(styles)(Timer);