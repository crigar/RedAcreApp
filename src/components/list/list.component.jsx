import React, { Fragment, useState } from 'react';
import Grid from '@mui/material/Grid';
import './list.component.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function List({toggleList}) {
    const handleList = (seconds) => {
        toggleList(seconds)
    }
    return (
        <Fragment>
            <h3>Routes</h3>
            <ButtonGroup variant="outlined" aria-label="outlined button group" orientation="vertical">
                <Button onClick={handleList.bind(this, 1)}>House to the office</Button>
                <Button onClick={handleList.bind(this, 2)}>Office to the house</Button>
                <Button onClick={handleList.bind(this, 3)}>Go for lunch</Button>
            </ButtonGroup>
        </Fragment>
    );
}