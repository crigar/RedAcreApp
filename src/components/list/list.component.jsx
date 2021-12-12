import React, { Fragment, useState } from 'react';
import './list.component.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function List({toggleList}) {
    const handleList = (seconds) => {
        toggleList(seconds)
    }
    return (
        <Fragment>
            <h3 cla>Routes</h3>
            <ButtonGroup variant="outlined" aria-label="outlined button group" orientation="vertical">
                <Button onClick={handleList.bind(this, 1)}>House to the office</Button>
                <Button onClick={handleList.bind(this, 2)}>Go for lunch</Button>
                <Button onClick={handleList.bind(this, 3)}>Office to the house</Button>
            </ButtonGroup>
        </Fragment>
    );
}