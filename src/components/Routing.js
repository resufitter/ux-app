import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from '@mui/styles/withStyles';
import PropsRoute from "./PropsRoute";
import useLocationBlocker from "../functions/useLocationBlocker";
import UploadResume from "./resume/UploadResume";
import EditResume from "./resume/edit/EditResume";
import TailorResume from "./resume/tailor/TailorResume";
import PreviewResume from "./resume/preview/PreviewResume";
import EditJobDescription from "./job_description/EditJobDescription";
import Loading from "./Loading";

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

function Routing(props) {
  const {
    pushMessageToSnackbar,
    file,
    setFile,
    resume,
    setResume,
    jobDescription,
    setJobDescription,
    instance,
    jobId,
    resumeId,
    setResumeId,
  } = props;
  useLocationBlocker();
  return (
    <div>
      <Switch>
        <PropsRoute
          path="/ux-app/upload-resume"
          component={UploadResume}
          pushMessageToSnackbar={pushMessageToSnackbar}
          file={file}
          setFile={setFile}
        />
        <PropsRoute
          path="/ux-app/edit"
          component={EditResume}
          pushMessageToSnackbar={pushMessageToSnackbar}
          resume={resume}
          setResume={setResume}
        />
        <PropsRoute
          path="/ux-app/job-description"
          component={EditJobDescription}
          pushMessageToSnackbar={pushMessageToSnackbar}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
        <PropsRoute
          path="/ux-app/tailor"
          component={TailorResume}
          pushMessageToSnackbar={pushMessageToSnackbar}
          resume={resume}
          setResume={setResume}
          instance={instance}
          jobId={jobId}
          resumeId={resumeId}
          setResumeId={setResumeId}
        />
        <PropsRoute
          path="/ux-app/preview"
          component={PreviewResume}
          pushMessageToSnackbar={pushMessageToSnackbar}
        />
        <PropsRoute
          path="/ux-app/loading"
          component={Loading}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  file: PropTypes.object,
  setFile: PropTypes.func,
  resume: PropTypes.object,
  setResume: PropTypes.func.isRequired,
  jobDescription: PropTypes.string,
  setJobDescription: PropTypes.func,
  instance: PropTypes.func,
  jobId: PropTypes.string,
  resumeId: PropTypes.string,
  setResumeId: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
