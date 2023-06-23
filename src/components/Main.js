import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "./ConsecutiveSnackbarMessages";
import ProgressStepper from "./progress_stepper/ProgressStepper";

const styles = (theme) => ({
  main: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
});

const steps = [
  {
    name: 'Upload Your Resume',
    link: "/ux-app/upload-resume"
  },
  {
    name: 'Preview Your Resume',
    link: "/ux-app/edit"
  },
  {
    name: 'Copy the Job Description',
    link: "/ux-app/job-description"
  },
  {
    name: 'Tailor Resume',
    link: "/ux-app/tailor"
  },
  {
    name: 'Preview Final Resume',
    link: "/ux-app/preview"
  }
];

function Main(props) {
  const { classes } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const history = useHistory();

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    if (newActiveStep === steps.length)
      return;
    history.push(steps[newActiveStep].link);
  };

  const handleBack = () => {
    const newActiveStep = activeStep - 1;
    setActiveStep(newActiveStep);
    history.push(steps[newActiveStep].link);
  };

  const handleRestart = () => {
    setActiveStep(0);
    history.push(steps[0].link);
  };

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );


  useEffect(() => {
    // fetchRandomTargets();
  }, [
    // fetchRandomTargets,

  ]);

  return (
    <Fragment>
      <NavBar
        handleNext={handleNext}
        handleBack={handleBack}
        handleRestart={handleRestart}
        activeStep={activeStep}
        steps={steps}
        setActiveStep={setActiveStep}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <ProgressStepper
          handleNext={handleNext}
          handleBack={handleBack}
          handleRestart={handleRestart}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        >
          <Routing
            pushMessageToSnackbar={pushMessageToSnackbar}
          />
        </ProgressStepper>
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
