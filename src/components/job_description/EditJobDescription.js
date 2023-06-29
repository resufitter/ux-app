import React from 'react';
import { TextField, Box } from "@mui/material";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    textFieldMultiLine: {
        background: "#FFFFFF",
        width: "98%"
    },
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
});

function EditJobDescription(props) {
    const {
        classes,
        jobDescription,
        setJobDescription
    } = props;


    return (
        <Box component="form" className={classes.wrapper}
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
    jobDescription: PropTypes.string,
    setJobDescription: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(EditJobDescription);