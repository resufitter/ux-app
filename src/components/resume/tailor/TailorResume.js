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
    Tooltip,
    List,
    ListItem
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
                {props.isloading ? (
                    <LinearProgress color="success" sx={{
                        height: 10,
                        borderRadius: 5,
                    }} />) : (
                    <LinearProgress variant="determinate" color="success" {...props} sx={{
                        height: 10,
                        borderRadius: 5,
                    }} />)}
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="h4" color="text.primary">{`${Math.round(
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
        resume,
        setResume,
        instance,
        jobId,
        resumeId,
    } = props;

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [portofolioLink, setPortofolioLink] = React.useState('');
    const [skills, setSkills] = React.useState([]);
    const [newSkill, setNewSkill] = React.useState('');
    const [jobs, setJobs] = React.useState([
    ]);
    const [projects, setProjects] = React.useState([
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
    const [isLoading, setIsLoading] = React.useState(true);

    const handleUpdateIssue = (index, field, value) => {
        const updatedIssues = [...issues];
        updatedIssues[index][field] = value;
        setIssues(updatedIssues);
    };

    const handleJobFieldChange = (index, field, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][field] = value;
        setJobs(updatedJobs);
    };

    const handleProjectFieldChange = (index, field, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };

    const evaluateResume = () => {

        console.log("evaluating resume");
        pushMessageToSnackbar({
            isErrorMessage: false,
            text: "Tailoring your resume",
        });

        var issueSummaries = [];
        var issues = [];
        var score = 0;
        if (resume.basic_info.first_name === '') {
            issueSummaries.push({ type: issueType.basic, id: "name", summary: "Missing Name" });
        }
        else
            score += 5;
        if (resume.basic_info.phone_number === '') {
            issueSummaries.push({ type: issueType.basic, id: "phone", summary: "Missing Phone Number" });
        } else
            score += 5;
        if (resume.basic_info.email === '') {
            issueSummaries.push({ type: issueType.basic, id: "email", summary: "Missing Email Address" });
        } else
            score += 5;
        if (resume.basic_info.portofolioLink === '') {
            issueSummaries.push({ type: issueType.basic, id: "portofolio", summary: "Missing Portofolio Link" });
        } else
            score += 5;


        // Retrieve suggested skills from backend
        var dummySuggestedSkills = ["Javascript", "Python", "Jenkins"];
        for (let skill of resume.skills.map(skill => skill.skill_name)) {
            if (dummySuggestedSkills.includes(skill)) {
                dummySuggestedSkills.splice(dummySuggestedSkills.indexOf(skill), 1);
            }
        }
        for (let suggestedSkill of dummySuggestedSkills) {
            issueSummaries.push({ type: issueType.skill, id: "skill", summary: suggestedSkill });
        }
        setSuggestedSkills(dummySuggestedSkills);
        if (resume.skills.length > 0 && resume.skills.length < 3) {
            score += 15 - 5 * (3 - resume.skills.length);
        }
        else {
            score += 15;
        }

        if (resume.work_experience.length > 0) {
            score += 10;
        }

        // Retrieve work experience relevence score
        let jobPromises = [];
        var suggestedJobExperiences = [];
        jobs.forEach(function (job) {
            if (job.summary !== '') {
                console.log("Calculating relevence score for job: " + job.title);
                pushMessageToSnackbar({
                    isErrorMessage: false,
                    text: "Evaluating experience for job: " + job.title,
                });
                let headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                };
                let body = {
                    experience: job.summary,
                    jobId: jobId
                };

                jobPromises.push(instance.post('/v0/query/experiencerelevancescore', body, { headers }));
            }
        });

        // Retrieve project experience relevence score
        let projectPromises = [];
        var suggestedProjectExperiences = [];
        projects.forEach(function (project) {
            if (project.summary !== '') {
                console.log("Calculating relevence score for project: " + project.name);
                pushMessageToSnackbar({
                    isErrorMessage: false,
                    text: "Evaluating experience for project: " + project.name,
                });
                let headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                };
                let body = {
                    experience: project.summary,
                    jobId: jobId
                };

                projectPromises.push(instance.post('/v0/query/experiencerelevancescore', body, { headers }));
            }
        });

        let jobIndex = 0;
        let projectIndex = 0;
        Promise.all(jobPromises).then(function (a) {

            let jobRecommandationPromises = [];

            a.forEach(function (response) {
                handleJobFieldChange(jobIndex, 'score', response.data);

                // Retrieve suggested work experiences from backend
                if (response.data < 0.8) {
                    console.log("Experience relevence score for job: " + jobs[jobIndex].title + " is lower than 80, recommading new experiences");
                    pushMessageToSnackbar({
                        isErrorMessage: false,
                        text: "Experience for job: " + jobs[jobIndex].title + " don't really match the job description, recommading new experiences"
                    });
                    let headers = {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    };
                    let body = {
                        experience: jobs[jobIndex].summary,
                        jobId: jobId
                    };

                    jobRecommandationPromises.push(instance.post('/v0/tailor/experience', body, { headers }));
                }
                jobIndex++;

            });


            Promise.all(projectPromises).then(function (b) {

                let projectRecommandationPromises = [];

                b.forEach(function (response) {
                    console.log(response.data);
                    handleProjectFieldChange(projectIndex, 'score', response.data);

                    // Retrieve suggested project experiences from backend
                    if (response.data < 0.8) {
                        console.log("Experience relevence score for project: " + projects[projectIndex].name + " is lower than 80, recommading new experiences");
                        pushMessageToSnackbar({
                            isErrorMessage: false,
                            text: "Experience for project: " + projects[projectIndex].name + " don't really match the job description, recommading new experiences"
                        });
                        let headers = {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        };
                        let body = {
                            experience: projects[projectIndex].summary,
                            jobId: jobId
                        };

                        projectRecommandationPromises.push(instance.post('/v0/tailor/experience', body, { headers }));
                    }
                    projectIndex++;
                });

                Promise.all(jobRecommandationPromises).then(function (c) {
                    c.forEach(function (response) {
                        suggestedJobExperiences.push(response.data);

                    });
                    for (let suggestedJobExperience of suggestedJobExperiences) {
                        issueSummaries.push({ type: issueType.work, position: "XXX - XXX", summary: suggestedJobExperience["Experience Summary"] });
                    }
                    setSuggestedWorkExperiences(suggestedJobExperiences);

                    Promise.all(projectRecommandationPromises).then(function (d) {
                        d.forEach(function (response) {
                            suggestedProjectExperiences.push(response.data);
                        });
                        for (let suggestedProjectExperience of suggestedProjectExperiences) {
                            issueSummaries.push({ type: issueType.project, summary: suggestedProjectExperience["Experience Summary"] });
                        }
                        setSuggestedProjectExperiences(suggestedProjectExperiences);

                        for (let issueSummary of issueSummaries) {
                            issues.push({ type: issueSummary.type, id: issueSummary.id, summary: issueSummary.summary, position: issueSummary.position, ignore: false });
                        }
                        setIssues(issues);
                    });
                });
            });
        });





        let headers = {
            "Access-Control-Allow-Origin": "*",
        };

        instance.get('/v0/query/relevancescore?jobId=' + jobId + '&resumeId=' + resumeId, { headers })
            .then(response => {
                pushMessageToSnackbar({
                    isErrorMessage: false,
                    text: "Resume Updated",
                });
                let relevenceScore = parseFloat(response.data.split("\n")[0].split(/\s+/)[1]);
                let scoreClone = score + 55 * relevenceScore;
                setScore(scoreClone);
                if (scoreClone >= 60) {
                    setScoreMessage("Great job on your resume, fix problems below could help you improve your success rate for your next opportunities");
                }
                setIsLoading(false);
                console.log("resume evaluation complete");
            });


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

    const updateResume = () => {
        console.log("updating resume");
        setIsLoading(true);
        var resumeClone = { ...resume };
        resumeClone.basic_info.first_name = name.split(" ").length > 0 ? name.split(" ")[0] : "";
        resumeClone.basic_info.last_name = name.split(" ").length > 1 ? name.split(" ")[1] : "";
        resumeClone.basic_info.phone_number = phone;
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

        console.log("resume update completed")

        let resumeString = JSON.stringify(resumeClone);
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
                console.log("triggering resume evaluation");
                evaluateResume();
            });

    };

    const refreshForm = () => {

        console.log("refreshing form")
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
            console.log("form refresh completed")
        }
    }

    useEffect(() => {
        refreshForm();
    }, []);

    useEffect(() => {
        evaluateResume();
    }, [projects]);

    useEffect(() => {
        refreshForm();
    }, [resume, setResume]);

    return (
        <Box width="100%" display="flex" >
            <Box width="66%" >
                <Box width="100%" display="flex" alignItems="center" sx={{ justifyContent: 'space-between' }}>
                    <Typography className={classes.leftPageTitle}>Tailor Resume</Typography>
                    <Button variant="text" className={classes.evaluateButton} onClick={updateResume}>Evaluate</Button>
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
                            handleJobFieldChange={handleJobFieldChange}
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
                            handleProjectFieldChange={handleProjectFieldChange}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem className={classes.wrapper} />
            <Box width="34%">

                <LinearProgressWithLabel value={score} isloading={isLoading} />

                <Chip
                    label={scoreMessage}
                    className={classes.scoreMessage}
                />

                {issues.filter(function (issue) { return issue.type === issueType.basic && !issue.ignore }).length > 0 && (
                    <Typography className={classes.issueTitle}>Basic Issues</Typography>)}

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
                        <Typography className={classes.issueDescription}>Add more skills could help you improve your resume
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
                        {issues.map((issue, indexA) => {

                            return issue.type === issueType.work && !issue.ignore && Array.isArray(issue.summary) && (
                                <Box>
                                    <Typography className={classes.workPosition}>{issue.position}</Typography>

                                    <Alert
                                        className={classes.suggestedWorkExperience}
                                        key={indexA}
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
                                                        onClick={() => handleUpdateIssue(indexA, 'ignore', true)}
                                                    >
                                                        <Close fontSize="inherit" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        }
                                    >
                                        <List
                                            sx={{
                                                listStyleType: 'disc',
                                                pl: 2,
                                                '& .MuiListItem-root': {
                                                    display: 'list-item',
                                                },
                                            }}>
                                            {issue.summary.map((point, indexB) => {
                                                return (
                                                    <ListItem key={"" + indexA + indexB}>
                                                        {point.replace("-", "")}
                                                    </ListItem>
                                                )
                                            })}

                                        </List>
                                    </Alert>
                                </Box>
                            )
                        })}
                    </Box>
                )}

                {suggestedProjectExperiences.length > 0 && (
                    <Box>
                        <Typography className={classes.issueTitle}>Project Experience Recommandation</Typography>
                        {issues.map((issue, indexA) => {

                            return issue.type === issueType.project && !issue.ignore && Array.isArray(issue.summary) && (
                                <Alert
                                    className={classes.issues}
                                    key={indexA}
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
                                                    onClick={() => handleUpdateIssue(indexA, 'ignore', true)}
                                                >
                                                    <Close fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    }
                                >
                                    <List
                                        sx={{
                                            listStyleType: 'disc',
                                            pl: 2,
                                            '& .MuiListItem-root': {
                                                display: 'list-item',
                                            },
                                        }}>
                                        {issue.summary.map((point, indexB) => {
                                            return (
                                                <ListItem key={"" + indexA + indexB}>
                                                    {point.replace("-", "")}
                                                </ListItem>
                                            )
                                        })}

                                    </List>
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
    resume: PropTypes.object,
    setResume: PropTypes.func.isRequired,
    instance: PropTypes.func,
    jobId: PropTypes.string,
    resumeId: PropTypes.string,
    setResumeId: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(TailorResume);
