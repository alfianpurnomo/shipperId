import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
  root: {},
  searchField:{
    marginRight: theme.spacing(1)
  },
  
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box 
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h3">DRIVER MANAGEMENT</Typography>
                <Typography variant="caption">Data driver yang bekerja dengan anda</Typography>
              </Box>
              <Box 
                display="flex"
                
              >
                <TextField
                  className={classes.searchField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search Driver"
                  variant="outlined"
                />
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<AddIcon/>}
                >
                  Tambah Driver
                </Button>
              </Box>
              
            </Box>
          </CardContent>
        </Card>
        
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
