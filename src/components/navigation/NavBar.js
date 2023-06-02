import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 30,
    width: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  smBordered: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "50% !important",
    },
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  brandText: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 40,
    color: "#1890FF"
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: "center",
  },
});

function NavBar(props) {
  const {
    classes,
    theme,
    handleNext,
    handleBack,
    handleRestart,
    activeStep,
    steps,
  } = props;
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Typography
              className={classes.brandText}
              display="inline"
            >
              ResuFitter
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                className={classNames(classes.accountAvatar)}
              >
                HL
              </Avatar >
              {isWidthUpSm && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">Haoran Liu</Typography>
                  }
                />
              )}
            </ListItem>
          </Box>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Button
                onClick={handleRestart}
                color="primary"
                variant="contained"
                size="large">
                Restart
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                color="secondary"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                size="large"
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                onClick={handleNext}
                color="primary"
                variant="contained"
                size="large"
                sx={{ mr: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Download' : 'Next'}
              </Button>
            </React.Fragment>
          )}

        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);
