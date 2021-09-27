import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box, Typography, Modal, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';

import { addEvent } from "../../../../redux/actions/events";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
};

const AddEventModal = ({ isVisible, handleSetVisible, sportCenter, addEvent }) => {
    const handleClose = () => handleSetVisible(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [sport, setSport] = useState('');

    useEffect(() => {
        setTitle('');
        setDescription('');
        setDate('');
        setDuration('');
        setSport('');
    }, [isVisible]);

    return (
        <Modal
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <b>
                        Add an event
                    </b>
                </Typography>
                <StyledInfoFieldContainer>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        multiline
                    />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <TextField
                        fullWidth
                        label="Duration - in hours"
                        variant="outlined"
                        type="number"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                    />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                        <Select
                            label="Sport"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                        >
                            {sportCenter.sports.map((availableSport) => <MenuItem value={availableSport} key={availableSport}>{availableSport}</MenuItem>)}
                        </Select>
                    </FormControl>
                </StyledInfoFieldContainer>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    disabled={!(title && description && sport && duration && date)}
                    onClick={() => {
                        handleClose();
                        addEvent({
                            title,
                            description,
                            date,
                            duration,
                            active: true,
                            setByAdmin: false,
                            sport,
                            sportCenter_id: sportCenter._id
                        });
                    }}
                >
                    Add
                </Button>
            </Box>
        </Modal>
    );
}


const mapStateToProps = state => ({
    sportCenter: state.auth.sportCenter
});

export default connect(
    mapStateToProps,
    {
        addEvent
    }
)(AddEventModal);

const StyledInfoFieldContainer = styled.div`
    margin: 10px 0;
`;


const StyledInfoFiledName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;