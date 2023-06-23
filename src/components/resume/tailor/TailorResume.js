import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Box,
    Button,
    IconButton,
    Typography,
    LinearProgress,
    Chip,
    Tooltip
} from "@mui/material";
import { Add, Close, ExpandMore } from '@mui/icons-material';
import withStyles from "@mui/styles/withStyles";
import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import ProjectExperience from "./ProjectExperience";

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        marginLeft: "2%",
        marginRight: "2%",
    },
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
    issueTitle: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 20,
        color: theme.palette.common.black,
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.up("xs")]: {
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(3),
        },
    },
    sectionTitle: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 20,
        color: theme.palette.common.black,
        marginLeft: "1%",
    },
    issueDescription: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        color: theme.palette.common.grey,
        marginLeft: "1%",
    },
    leftPageTitle: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 28,
        color: theme.palette.common.black,
        marginLeft: "1%",
    },
    evaluateButton: {
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 20,
        color: theme.palette.primary.main,
        marginLeft: "1%",
        textTransform: 'none'
    },
    accordion: {
        background: theme.palette.background.dark,
    },
    scoreMessage: {
        background: "#ECFFE9",
        color: "#219653",
        fontFamily: 'Roboto',
        fontWeight: 600,
        fontSize: 16,
        height: 'auto',
        '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
        },
        marginTop: theme.spacing(2),
    },
    issues: {
        color: theme.palette.common.black,
        background: theme.palette.background.light,
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 14,
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.up("xs")]: {
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(3),
        },
    },
    suggestedWorkExperience: {
        color: theme.palette.common.black,
        background: theme.palette.background.light,
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 14,
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.up("xs")]: {
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginBottom: theme.spacing(3),
        },
        [theme.breakpoints.up("lg")]: {
            marginBottom: theme.spacing(3),
        },
    },
    suggestedSkill: {
        margin: '5px',
        color: theme.palette.common.black,
    },
    workPosition: {
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 16,
        color: theme.palette.common.grey,
        marginLeft: "1%",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
});
const issueType = {
    basic: 0,
    skill: 1,
    work: 2,
    project: 3,
}
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" color="success" {...props} sx={{
                    height: 10,
                    borderRadius: 5,
                }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}/100`}</Typography>
            </Box>
        </Box>
    );
}

function TailorResume(props) {
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
    const [activeSection, setActiveSection] = React.useState(1);

    const handleAccordion = (section) => (event, isExpanded) => {
        setActiveSection(isExpanded ? section : 0);
    };
    const [issues, setIssues] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [scoreMessage, setScoreMessage] = React.useState('');
    const [suggestedSkills, setSuggestedSkills] = React.useState([]);
    const [suggestedWorkExperiences, setSuggestedWorkExperiences] = React.useState([]);
    const [suggestedProjectExperiences, setSuggestedProjectExperiences] = React.useState([]);

    const handleUpdateIssue = (index, field, value) => {
        const updatedIssues = [...issues];
        updatedIssues[index][field] = value;
        setIssues(updatedIssues);
    };

    const evaluateResume = () => {
        var issueSummaries = [];
        var issues = [];
        var score = 100;
        if (name === '') {
            issueSummaries.push({ type: issueType.basic, id: "name", summary: "Missing Name" });
            score -= 5;
        }
        if (phone === '') {
            issueSummaries.push({ type: issueType.basic, id: "phone", summary: "Missing Phone Number" });
            score -= 5;
        }
        if (email === '') {
            issueSummaries.push({ type: issueType.basic, id: "email", summary: "Missing Email Address" });
            score -= 5;
        }
        if (portofolioLink === '') {
            issueSummaries.push({ type: issueType.basic, id: "portofolio", summary: "Missing Portofolio Link" });
            score -= 5;
        }

        // Retrieve suggested skills from backend
        var dummySuggestedSkills = ["Javascript", "Python", "Jenkins"];
        for (let skill of skills) {
            if (skills.includes(skill)) {
                dummySuggestedSkills.splice(dummySuggestedSkills.indexOf(skill), 1);
            }
        }
        for (let suggestedSkill of dummySuggestedSkills) {
            issueSummaries.push({ type: issueType.skill, id: "skill", summary: suggestedSkill });
        }
        setSuggestedSkills(dummySuggestedSkills);
        if (skills.length < 3) {
            score -= 5 * (3 - skills.length);
        }

        // Retrieve suggested work experiences from backend
        var dummySuggestedWorkExperiences = [
            {
                position: "Developer",
                summary: "Work at mobile team to create mobile experience and collaborate with 1 designer and 1 product manager. Increased the conversion rate from 2.2% to 12.1%"
            }];
        for (let suggestedWorkExperience of dummySuggestedWorkExperiences) {
            issueSummaries.push({ type: issueType.work, position: suggestedWorkExperience.position, summary: suggestedWorkExperience.summary });
        }
        setSuggestedWorkExperiences(dummySuggestedWorkExperiences);
        if (jobs.length < 1) {
            score -= 10;
        }

        // Retrieve suggested project experiences from backend
        var dummySuggestedProjectExperiences = [
            "Work at mobile team to create mobile experience and collaborate with 1 designer and 1 product manager. Increased the conversion rate from 2.2% to 12.1%"
        ];
        for (let suggestedProjectExperience of dummySuggestedProjectExperiences) {
            issueSummaries.push({ type: issueType.project, summary: suggestedProjectExperience });
        }
        setSuggestedProjectExperiences(dummySuggestedProjectExperiences);


        for (let issueSummary of issueSummaries) {
            issues.push({ type: issueSummary.type, id: issueSummary.id, summary: issueSummary.summary, position: issueSummary.position, ignore: false });
        }
        setIssues(issues);
        setScore(score);
        if (score >= 60) {
            setScoreMessage("Great job on your resume, fix problems below could help you improve your success rate for your next opportunities");
        }
    }

    const handleClickFocus = (issue) => {
        if (issue.type === issueType.basic) {
            setActiveSection(1);
        }
        if (issue.type === issueType.skill) {
            setActiveSection(2);
            setSkills([...skills, issue.summary])
            var suggestedSkillsClone = [...suggestedSkills];
            suggestedSkillsClone.splice(suggestedSkillsClone.indexOf(issue.summary), 1);
            setSuggestedSkills(suggestedSkillsClone)
        }
        if (issue.type === issueType.work) {
            setActiveSection(3);
        }
        if (issue.type === issueType.project) {
            setActiveSection(4);
        }

        const element = document.getElementById(issue.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.focus();
        }
    };

    useEffect(() => {
        evaluateResume();
    }, [

    ]);

    return (
        <Box width="100%" display="flex" >
            <Box width="66%" >
                <Box width="100%" display="flex" alignItems="center" sx={{ justifyContent: 'space-between' }}>
                    <Typography className={classes.leftPageTitle}>Tailor Resume</Typography>
                    <Button variant="text" className={classes.evaluateButton} onClick={evaluateResume}>Evaluate</Button>
                </Box>
                <Accordion expanded={activeSection === 1} onChange={handleAccordion(1)} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography className={classes.sectionTitle}>Basic Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={activeSection === 2} onChange={handleAccordion(2)} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography className={classes.sectionTitle}>Skills</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Skills
                            pushMessageToSnackbar={pushMessageToSnackbar}
                            skills={skills}
                            setSkills={setSkills}
                            newSkill={newSkill}
                            setNewSkill={setNewSkill}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={activeSection === 3} onChange={handleAccordion(3)} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography className={classes.sectionTitle}>Work Experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <WorkExperience
                            pushMessageToSnackbar={pushMessageToSnackbar}
                            jobs={jobs}
                            setJobs={setJobs}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={activeSection === 4} onChange={handleAccordion(4)} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography className={classes.sectionTitle}>Project Experience</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ProjectExperience
                            pushMessageToSnackbar={pushMessageToSnackbar}
                            projects={projects}
                            setProjects={setProjects}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem className={classes.wrapper} />
            <Box width="34%">
                <LinearProgressWithLabel value={score} />

                <Chip
                    label={scoreMessage}
                    className={classes.scoreMessage}
                />
                <Typography className={classes.issueTitle}>Basic Issues</Typography>

                {issues.map((issue, index) => {

                    return issue.type === issueType.basic && !issue.ignore && (
                        <Alert
                            className={classes.issues}
                            key={index}
                            severity="error"
                            action={
                                <Box display="flex" alignItems="center" sx={{ minWidth: 100 }}>
                                    <Button
                                        color="primary"
                                        size="small"
                                        onClick={() => handleClickFocus(issue)}
                                    >
                                        Edit
                                    </Button>
                                    <Tooltip title="Ignore">
                                        <IconButton
                                            aria-label="close"
                                            color="error"
                                            size="small"
                                            onClick={() => handleUpdateIssue(index, 'ignore', true)}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        >
                            {issue.summary}
                        </Alert>)
                })}

                {suggestedSkills.length > 0 && (
                    <Box>
                        <Typography className={classes.issueTitle}>Skills Suggestions</Typography>
                        <Typography className={classes.issueDescription}>Add 3 more skills could help you improve your resume
                        </Typography>
                        {issues.map((issue, index) => {

                            return issue.type === issueType.skill && !skills.includes(issue.summary) && (

                                <Chip
                                    key={index}
                                    label={issue.summary}
                                    onDelete={() => handleClickFocus(issue)}
                                    deleteIcon={<Add />}
                                    className={classes.suggestedSkill}
                                />
                            )
                        })}
                    </Box>
                )}

                {suggestedWorkExperiences.length > 0 && (
                    <Box>
                        <Typography className={classes.issueTitle}>Work Experience Recommandation</Typography>
                        {issues.map((issue, index) => {

                            return issue.type === issueType.work && !issue.ignore && (
                                <Box>
                                    <Typography className={classes.workPosition}>{issue.position}</Typography>

                                    <Alert
                                        className={classes.suggestedWorkExperience}
                                        key={index}
                                        icon={false}
                                        action={
                                            <Box display="flex" alignItems="center" sx={{ minWidth: 100 }}>
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleClickFocus(issue)}
                                                >
                                                    Edit
                                                </Button>
                                                <Tooltip title="Ignore">
                                                    <IconButton
                                                        aria-label="close"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleUpdateIssue(index, 'ignore', true)}
                                                    >
                                                        <Close fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        }
                                    >
                                        {issue.summary}
                                    </Alert>
                                </Box>
                            )
                        })}
                    </Box>
                )}

                {suggestedProjectExperiences.length > 0 && (
                    <Box>
                        <Typography className={classes.issueTitle}>Project Experience Recommandation</Typography>
                        {issues.map((issue, index) => {

                            return issue.type === issueType.project && !issue.ignore && (
                                <Alert
                                    className={classes.issues}
                                    key={index}
                                    icon={false}
                                    action={
                                        <Box display="flex" alignItems="center" sx={{ minWidth: 100 }}>
                                            <Button
                                                color="primary"
                                                size="small"
                                                onClick={() => handleClickFocus(issue)}
                                            >
                                                Edit
                                            </Button>
                                            <Tooltip title="Ignore">
                                                <IconButton
                                                    aria-label="close"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleUpdateIssue(index, 'ignore', true)}
                                                >
                                                    <Close fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    }
                                >
                                    {issue.summary}
                                </Alert>
                            )
                        })}
                    </Box>
                )}
            </Box>
        </Box>

    );
}

TailorResume.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(TailorResume);
