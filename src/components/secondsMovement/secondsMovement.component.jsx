import React, { Fragment, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import './secondsMovement.component.scss'
export default function SecondsMovement({toggleSeconds}) {
    
    const handleSeconds = (seconds) => {
        toggleSeconds(seconds)
    }
    return (
        <div className="seconds-container">
            <div className="options">
                <h3>Seconds for each movement: </h3>
                <ButtonGroup variant="text" aria-label="outlined button group" orientation="horizontal">
                    <Button onClick={handleSeconds.bind(this,1)}>1</Button>
                    <Button onClick={handleSeconds.bind(this,5)}>5</Button>
                    <Button onClick={handleSeconds.bind(this,10)}>10</Button>
                </ButtonGroup>          
            </div>
            
        </div>            
    );
}