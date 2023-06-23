import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Box,
    Paper
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";


const styles = (theme) => ({
    pageTitle: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 32,
        color: theme.palette.common.black,
        marginLeft: "1%"
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

function PreviewResume(props) {
    const {
        classes,
    } = props;

    return (
        <Box className={classes.wrapper}>
            <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-around' }}>
                <Typography className={classes.pageTitle}>Congrats! Here is your final resume</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-around' }}>
                <Paper elevation={3} sx={{
                    width: 850,
                    height: 1100,
                    marginTop: 10,
                }} />
            </Box>

        </Box>
    );
}

PreviewResume.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(PreviewResume);
