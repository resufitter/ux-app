import React from 'react';
import { TextField, Button, Box, Typography, Chip } from "@mui/material";
import { Add } from '@mui/icons-material';
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    textFieldMultiLine: {
        background: "#FFFFFF",
        width: "98%"
    },
});

function EditJobDescription(props) {
    const {
        pushMessageToSnackbar,
        classes,
        style,
        theme,
    } = props;

    const [jobDescription, setJobDescription] = React.useState('');

    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: "1%" },
            }}>
            <TextField
                label="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                multiline
                rows={50}
                variant="outlined"
                className={classes.textFieldMultiLine}
            />
        </Box>
    );
};

EditJobDescription.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(EditJobDescription);