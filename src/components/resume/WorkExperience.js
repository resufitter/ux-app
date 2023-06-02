import React from 'react';
import { TextField, Button, Box } from "@mui/material";
import { Add } from '@mui/icons-material';
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    textField: {
        background: "#FFFFFF",
        width: "48%"
    },
    textFieldMultiLine: {
        background: "#FFFFFF",
        width: "98%"
    },
    addButton: {
        margin: "1%",
        marginBottom: '10px'
    },
});

function WorkExperienceSection(props) {
    const {
        classes,
        jobs,
        setJobs
    } = props;

    const handleJobFieldChange = (index, field, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][field] = value;
        setJobs(updatedJobs);
    };

    const handleAddJob = () => {
        setJobs([...jobs, { title: '', company: '', location: '', duration: '', summary: '' }]);
    };

    const handleDeleteJob = (index) => {
        const updatedJobs = [...jobs];
        updatedJobs.splice(index, 1);
        setJobs(updatedJobs);
    };

    return (
        <Box component="form">
            {jobs.map((job, index) => (
                <Box
                    sx={{
                        '& > :not(style)': { m: "1%" },
                    }}
                    key={index}>
                    <TextField
                        label="Job Title"
                        value={job.title}
                        onChange={(e) => handleJobFieldChange(index, 'title', e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Company"
                        value={job.company}
                        onChange={(e) => handleJobFieldChange(index, 'company', e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Location"
                        value={job.location}
                        onChange={(e) => handleJobFieldChange(index, 'location', e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Duration"
                        value={job.duration}
                        onChange={(e) => handleJobFieldChange(index, 'duration', e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Summary"
                        value={job.summary}
                        onChange={(e) => handleJobFieldChange(index, 'summary', e.target.value)}
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textFieldMultiLine}
                    />
                    {jobs.length !== 1 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteJob(index)}
                        >
                            Delete Job
                        </Button>
                    )}
                </Box>
            ))}
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddJob}
                className={classes.addButton}
            >
                Add Job
            </Button>
        </Box>
    );
};


WorkExperienceSection.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
    jobs: PropTypes.arrayOf(PropTypes.object),
    setJobs: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(WorkExperienceSection);