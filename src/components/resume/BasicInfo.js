import React from 'react';
import { TextField, Button, Box, Typography, Chip } from "@mui/material";
import { Add } from '@mui/icons-material';
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    textField: {
        background: "#FFFFFF",
    },
});

function BasicInfoSection(props) {
    const {
        pushMessageToSnackbar,
        classes,
        style,
        theme,
        name,
        setName,
        phone,
        setPhone,
        email,
        setEmail,
        address,
        setAddress,
        portfolioLink,
        setPortfolioLink
    } = props;

    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: "1%", width: '48%' },
            }}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <TextField
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <TextField
                label="Location"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <TextField
                label="Portfolio Link"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
        </Box>
    );
};

BasicInfoSection.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
    name: PropTypes.string,
    setName: PropTypes.func,
    phone: PropTypes.string,
    setPhone: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    address: PropTypes.string,
    setAddress: PropTypes.func,
    portfolioLink: PropTypes.string,
    setPortfolioLink: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(BasicInfoSection);