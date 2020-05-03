import React, { Component } from 'react';
import './style.scss';

class Loader extends Component {
    render() {
        return (
            <div className='Cube panelLoad'>
                <div className='cube-face cube-face-front'>E</div>
                <div className='cube-face cube-face-back'>I</div>
                <div className='cube-face cube-face-left'>V</div>
                <div className='cube-face cube-face-right'>V</div>
                <div className='cube-face cube-face-bottom'>E</div>
                <div className='cube-face cube-face-top'>I</div>
            </div>
        );
    }
}

export default Loader;