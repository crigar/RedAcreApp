import React, { Fragment, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import './secondsMovement.component.scss';
import RouteService from './../../servicies/route.service';

export default function SecondsMovement({tooggleSeconds}) {
    
    const handleSeconds = (seconds) => {
        RouteService.setSecondsToMovement(seconds);
        RouteService.setStartPointReferenceDate(new Date());
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