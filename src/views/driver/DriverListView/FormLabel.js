import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography, 
  makeStyles
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    labelFrom: {
      color: '#ccc',
      marginBottom: '2px'
    },
    contentForm: {
        marginBottom: '10px'
    }
  }));

const FormLabel = ({ label, content, className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Typography
        align="left"
        color="textPrimary"
        gutterBottom
        variant="subtitle2"
        className={classes.labelFrom}
        
        >
            {label}
        </Typography>
        <Typography
            align="left"
            color="textPrimary"
            variant="subtitle1"
            className={classes.contentForm}
        >
            {content}
        </Typography>
    </div>
  );
};

FormLabel.propTypes = {
  className: PropTypes.string
};

export default FormLabel;
