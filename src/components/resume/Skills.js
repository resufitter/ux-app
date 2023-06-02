import React from 'react';
import { TextField, Button, Box, Typography, Chip } from "@mui/material";
import { Add } from '@mui/icons-material';
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    textField: {
        background: "#FFFFFF",
        width: "98%"
    },
});

function SkillsSection(props) {
    const {
        pushMessageToSnackbar,
        classes,
        style,
        theme,
        skills,
        setSkills,
        newSkill,
        setNewSkill
    } = props;



    const handleAddSkill = () => {
        if (newSkill) {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    return (
        <Box component="form"
            sx={{
                '& > :not(style)': { m: "1%" },
            }}>
            <div>
                {skills.map((skill, index) => (
                    <Chip
                        key={index}
                        label={skill}
                        onDelete={() => handleDeleteSkill(index)}
                        style={{ margin: '5px' }}
                    />
                ))}
            </div>
            <TextField
                label="New Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddSkill}
            >
                Add Skill
            </Button>
        </Box>
    );
};


SkillsSection.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
    skills: PropTypes.arrayOf(PropTypes.string),
    setSkills: PropTypes.func,
    newSkill: PropTypes.string,
    setNewSkill: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(SkillsSection);