import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Box,
    Divider,
    Button
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
        resume,
        setResume
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
        { name: '', summary: '' },
    ]);

    const updateResume = () => {
        var resumeClone = { ...resume };
        resumeClone.basic_info.first_name = name.split(" ").length > 0 ? name.split(" ")[0] : "";
        resumeClone.basic_info.last_name = name.split(" ").length > 1 ? name.split(" ")[1] : "";
        resumeClone.basic_info.phone_number = phone;
        resumeClone.basic_info.email = email;
        resumeClone.basic_info.location = address;
        resumeClone.basic_info.portfolio_website_url = portofolioLink;

        let resumeSkills = []
        for (let skill of skills) {
            resumeSkills.push({ skill_name: skill })
        }
        resumeClone.skills = [...resumeSkills];

        let resumeJobs = []
        for (let job of jobs) {
            let summaries = job.summary.split("\n- ")
            let experience_summary = []
            for (let bullet_point of summaries) {
                experience_summary.push({ bullet_point: bullet_point.replace('- ', '').replace('\n', '') })
            }

            resumeJobs.push({
                job_title: job.title,
                company: job.company,
                location: job.location,
                start_year_month: job.duration.split(" to ").length > 0 ? job.duration.split(" to ")[0] : "",
                end_year_month: job.duration.split(" to ").length > 1 ? job.duration.split(" to ")[1] : "",
                experience_summary: experience_summary
            })
        }
        resumeClone.work_experience = [...resumeJobs];

        let resumeProjects = []
        for (let project of projects) {
            let summaries = project.summary.split("\n- ")
            let experience_summary = []
            for (let bullet_point of summaries) {
                experience_summary.push({ bullet_point: bullet_point.replace('- ', '').replace('\n', '') })
            }

            resumeProjects.push({
                project_name: project.name,
                experience_summary: experience_summary
            })
        }
        resumeClone.project_experience = [...resumeProjects];

        setResume(resumeClone);
        console.log(JSON.stringify(resumeClone))
    };

    useEffect(() => {
        if (resume != null) {
            setName(resume.basic_info.first_name + " " + resume.basic_info.last_name);
            setPhone(resume.basic_info.phone_number);
            setEmail(resume.basic_info.email);
            setAddress(resume.basic_info.location);
            setPortofolioLink(resume.basic_info.portfolio_website_url || resume.basic_info.linkedin_url);
            setSkills(resume.skills.map(skill => skill.skill_name));

            let workExperiences = [];
            for (let workExperience of resume.work_experience) {
                let summaries = workExperience.experience_summary.map(summary => summary.bullet_point);
                let summaryMessage = ""
                for (let summary of summaries) {
                    summaryMessage += "- " + summary + "\n"
                }
                workExperiences.push({
                    title: workExperience.job_title,
                    company: workExperience.company,
                    location: workExperience.location,
                    duration: workExperience.start_year_month + " to " + workExperience.end_year_month,
                    summary: summaryMessage
                })
            }
            setJobs(workExperiences);

            let projectExperiences = [];
            for (let projectExperience of resume.project_experience) {
                let summaries = projectExperience.experience_summary.map(summary => summary.bullet_point);
                let summaryMessage = ""
                for (let summary of summaries) {
                    summaryMessage += "- " + summary + "\n"
                }
                projectExperiences.push({
                    name: projectExperience.project_name,
                    summary: summaryMessage
                })
            }
            setProjects(projectExperiences);

        }
    }, [resume, setResume]);

    return (
        <Box className={classes.wrapper}>
            <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-around' }} >
                <Button
                    onClick={updateResume}
                    color="primary"
                    variant="contained"
                    size="large"
                    sx={{ mr: 1 }}
                >
                    Update
                </Button>
            </Box>
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
    resume: PropTypes.object,
    setResume: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditResume);
