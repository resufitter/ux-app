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
    },
});

function ProjectExperienceSection(props) {
    const {
        classes,
        projects,
        setProjects,
    } = props;

    const handleProjectFieldChange = (index, field, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };

    const handleAddProject = () => {
        setProjects([...projects, { name: '', location: '', summary: '' }]);
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
                        label="Location"
                        value={project.location}
                        onChange={(e) => handleProjectFieldChange(index, 'location', e.target.value)}
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
};

export default withStyles(styles, { withTheme: true })(ProjectExperienceSection);