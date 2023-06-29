import React from 'react';
import { TextField, Button, Box, Typography } from "@mui/material";
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
    },
    score: {
        fontFamily: 'Roboto',
        fontWeight: 500,
        fontSize: 20,
        color: theme.palette.primary.main,
        marginLeft: "1%",
    },
});

function ProjectExperienceSection(props) {
    const {
        classes,
        projects,
        setProjects,
        handleProjectFieldChange
    } = props;

    const handleAddProject = () => {
        setProjects([...projects, { name: '', summary: '' }]);
    };

    const handleDeleteProject = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    return (
        <Box component="form">
            {projects.map((project, index) => (
                <Box sx={{
                    '& > :not(style)': { m: "1%" },
                }}
                    key={index}>

                    <TextField
                        label="Project Name"
                        value={project.name}
                        onChange={(e) => handleProjectFieldChange(index, 'name', e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                    />
                    <TextField
                        label="Summary"
                        value={project.summary}
                        onChange={(e) => handleProjectFieldChange(index, 'summary', e.target.value)}
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textFieldMultiLine}
                    />
                    {projects.length !== 1 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteProject(index)}
                        >
                            Delete Project
                        </Button>
                    )}
                    {project.score && (
                        <Typography className={classes.score}>{project.score.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })}</Typography>

                    )}
                </Box>
            ))}
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddProject}
                className={classes.addButton}
            >
                Add Project
            </Button>
        </Box>
    );
};

ProjectExperienceSection.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
    projects: PropTypes.arrayOf(PropTypes.object),
    setProjects: PropTypes.func,
    handleProjectFieldChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(ProjectExperienceSection);