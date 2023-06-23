import React from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Box,
    Divider
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import ProjectExperience from "./ProjectExperience";


const styles = (theme) => ({
    divider: {
        margin: theme.spacing(1),
        width: "100%",
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.up("xs")]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
    },
    sectionTitle: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 20,
        color: theme.palette.primary.main,
        marginLeft: "1%",
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

function EditResume(props) {
    const {
        pushMessageToSnackbar,
        classes,
    } = props;

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [portofolioLink, setPortofolioLink] = React.useState('');
    const [skills, setSkills] = React.useState([]);
    const [newSkill, setNewSkill] = React.useState('');
    const [jobs, setJobs] = React.useState([
        { title: '', company: '', location: '', duration: '', summary: '' },
    ]);
    const [projects, setProjects] = React.useState([
        { name: '', location: '', summary: '' },
    ]);

    return (
        <Box className={classes.wrapper}>
            <Typography className={classes.sectionTitle}>Basic Info</Typography>
            <BasicInfo
                pushMessageToSnackbar={pushMessageToSnackbar}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                address={address}
                setAddress={setAddress}
                portofolioLink={portofolioLink}
                setPortofolioLink={setPortofolioLink}
            />
            <Divider className={classes.divider} />
            <Typography className={classes.sectionTitle}>Skills</Typography>
            <Skills
                pushMessageToSnackbar={pushMessageToSnackbar}
                skills={skills}
                setSkills={setSkills}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
            />
            <Divider className={classes.divider} />
            <Typography className={classes.sectionTitle}>Work Experience</Typography>
            <WorkExperience
                pushMessageToSnackbar={pushMessageToSnackbar}
                jobs={jobs}
                setJobs={setJobs}
            />
            <Divider className={classes.divider} />
            <Typography className={classes.sectionTitle}>Project Experience</Typography>
            <ProjectExperience
                pushMessageToSnackbar={pushMessageToSnackbar}
                projects={projects}
                setProjects={setProjects}
            />
        </Box>
    );
}

EditResume.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(EditResume);
