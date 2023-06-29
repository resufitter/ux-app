import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "./ConsecutiveSnackbarMessages";
import ProgressStepper from "./progress_stepper/ProgressStepper";
import axios from "axios";

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

const instance = axios.create({
  baseURL: "http://localhost:8000"
});

function Main(props) {
  const { classes } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDescription, setJobDescription] = React.useState('');
  const [resume, setResume] = useState(null);


  const handleNext = () => {
    if (activeStep === 0) {
      if (file === null) {
        pushMessageToSnackbar({
          isErrorMessage: true,
          text: "Please Upload Your Resume",
        });
        return;
      }
    }
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    history.push("/ux-app/loading");
    if (newActiveStep === 1) {
      const headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };
      let formData = new FormData();
      formData.append("file", file);
      instance.post('/v0/upload/resume', formData, { headers })
        .then(response => {
          console.log(JSON.stringify(response.data));
          pushMessageToSnackbar({
            isErrorMessage: false,
            text: "Resume Parsed",
          });
          setResume(response.data.resume);
          setResumeId(response.data.resume_id);
          history.push(steps[newActiveStep].link);
        });
    }
    else if (newActiveStep === 2) {
      let resumeString = JSON.stringify(resume);
      let headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      let body = {
        resumeId: resumeId,
        resumeString: resumeString
      };


      instance.post('/v0/update/resume', body, { headers })
        .then(response => {
          pushMessageToSnackbar({
            isErrorMessage: false,
            text: "Resume Updated",
          });
          console.log(response.data);
          history.push(steps[newActiveStep].link);
        });
    }
    else if (newActiveStep === 3) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      };
      let body = {
        "jobDescription": jobDescription
      }

      instance.post('/v0/upload/job', body, config)
        .then(response => {
          pushMessageToSnackbar({
            isErrorMessage: false,
            text: "Job Description Uploaded",
          });
          setJobId(response.data);
          history.push(steps[newActiveStep].link);
        });
    }
    else if (newActiveStep === steps.length)
      return;
    else
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
            file={file}
            setFile={setFile}
            resume={resume}
            setResume={setResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            instance={instance}
            jobId={jobId}
            resumeId={resumeId}
            setResumeId={setResumeId}
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
