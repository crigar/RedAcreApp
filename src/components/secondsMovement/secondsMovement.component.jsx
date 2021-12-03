import React, { Fragment, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
export default function SecondsMovement({toggleSeconds}) {
    
    const handleSeconds = (seconds) => {
        toggleSeconds(seconds)
    }
    return (
        <div>
            <ButtonGroup variant="text" aria-label="outlined button group" orientation="horizontal">
                <Button onClick={handleSeconds.bind(this,1)}>1</Button>
                <Button onClick={handleSeconds.bind(this,5)}>5</Button>
                <Button onClick={handleSeconds.bind(this,10)}>10</Button>
            </ButtonGroup>
        </div>            
    );
}