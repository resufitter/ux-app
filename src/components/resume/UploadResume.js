import React, { useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Chip,
    Box,
} from "@mui/material";
import classNames from "classnames";
import { Inbox, Attachment } from '@mui/icons-material';
import withStyles from "@mui/styles/withStyles";
import { useDropzone } from "react-dropzone";
import ColoredButton from "../ColoredButton";


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
    iconWrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    button: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.23)",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        background: "#FFFFFF",
        textTransform: 'none'
    },
    fullHeight: {
        height: "100%"
    },
    attachmentChip: {
        textAlign: "center",
        color: theme.palette.primary.main
    },
    uploadIcon: {
        transition: theme.transitions.create(["color", "box-shadow", "border"], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        textAlign: "center",
        fontSize: 60,
        color: theme.palette.primary.main
    },
    uploadText: {
        transition: theme.transitions.create(["color", "box-shadow", "border"], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        fontFamily: 'Roboto',
        textAlign: "center",
        fontSize: 16,
        marginBottom: theme.spacing(1),
    },
    uploadFootnote: {
        transition: theme.transitions.create(["color", "box-shadow", "border"], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        fontFamily: 'Roboto',
        textAlign: "center",
        fontSize: 14,
        color: "textSecondary"
    },
});

function getColor(isDragAccept, isDragReject, theme) {
    if (isDragAccept) {
        return theme.palette.success.main;
    }
    if (isDragReject) {
        return theme.palette.error.dark;
    }
    return theme.palette.common.black;
}

function UploadResume(props) {
    const {
        pushMessageToSnackbar,
        classes,
        style,
        theme
    } = props;

    const [file, setFile] = useState(null);

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length + rejectedFiles.length > 1) {
                pushMessageToSnackbar({
                    isErrorMessage: true,
                    text: "You cannot upload more than one file at once",
                });
            } else if (acceptedFiles.length === 0) {
                pushMessageToSnackbar({
                    isErrorMessage: true,
                    text: "The file you wanted to upload isn't a PDF",
                });
            } else if (acceptedFiles.length === 1) {
                const file = acceptedFiles[0];
                file.preview = URL.createObjectURL(file);
                file.key = new Date().getTime();
                console.log(file.name);
                setFile(file);
            }
        },
        [pushMessageToSnackbar, setFile]
    );

    const handleDelete = () => {
        const file = null;
        setFile(file);
        pushMessageToSnackbar({
            isErrorMessage: false,
            text: "File Deleted",
        });
    };

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "application/pdf",
        onDrop: onDrop
    });

    return (
        <Box {...getRootProps()} height="100%" className={classes.wrapper}>
            <input {...getInputProps()} />

            <ColoredButton
                fullWidth
                className={classNames(
                    classes.fullHeight,
                    classes.button
                )}
                variant="outlined"
                style={style}
                color={getColor(isDragAccept, isDragReject, theme)}
            >
                <Box className={classes.wrapper} sx={{ width: '100%', maxWidth: 395 }}>
                    <Box className={classes.iconWrapper}>
                        {file ? (
                            <Fragment>
                                <Chip
                                    variant="outlined"
                                    className={classes.attachmentChip}
                                    onDelete={handleDelete}
                                    icon={<Attachment className={classes.attachmentChip} />}
                                    label={file.name} />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Inbox
                                    className={classes.uploadIcon}
                                />
                            </Fragment>
                        )}
                    </Box>
                    <Typography
                        className={classes.uploadText}
                    >
                        Click or drag <b>PDF</b> file to this area to upload
                    </Typography>
                    <Typography
                        className={classes.uploadFootnote}
                        color="textSecondary"
                    >
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
                    </Typography>
                </Box>
            </ColoredButton>

        </Box>
    );
}

UploadResume.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    style: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(UploadResume);
