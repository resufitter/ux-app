import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  StepLabel,
  Stepper,
  Step,
  Box,
  Button
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
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

function ProgressStepper(props) {
  const {
    classes,
    handleNext,
    handleBack,
    activeStep,
    steps,
    children,
  } = props;

  return (
    <Box sx={{ width: '100%' }} className={classes.wrapper}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.name}>
            <StepLabel>{step.name}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            className={classes.wrapper}
          >
            <Typography color="textPrimary">
              All steps completed.
            </Typography>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            className={classes.wrapper}
          >
            <Typography color="textPrimary">Step {activeStep + 1}</Typography>
          </Box>

          {children}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Download' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

ProgressStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveStep: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default withStyles(styles, { withTheme: true })(ProgressStepper);
