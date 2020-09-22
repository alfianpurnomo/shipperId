import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from "moment";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import FormLabel from './FormLabel'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginRigth: '20px'
  },
  avatarDriver: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  driverID: {
    color: theme.palette.primary.main,
    marginLeft: '20px'
  }
  
}));

const ProductCard = ({ className, driver, ...rest }) => {
  const classes = useStyles();
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Button
            endIcon={<MoreHorizIcon />}
            size="small"
            variant="text"
          >
            
          </Button>
        )}
        
        title={<Box display="flex">
                <Typography  variant="subtitle" component="h5">Driver ID</Typography>
                <Typography  className={classes.driverID} variant="subtitle" component="h5">{driver?.id?.name}</Typography>
              </Box>}
      />
      <Divider />
      <CardContent>
      
        <Box
          display="flex"
          mb={3}
        >
          
          <Avatar
            alt="Product"
            src={driver?.picture?.thumbnail}
            variant="rounded"
            className={classes.avatarDriver}
          />
        </Box>
        <FormLabel
          label="Nama Driver"
          content={`${driver?.name?.first}, ${driver?.name?.last}`}
        />
        <FormLabel
          label="Telepon"
          content={driver?.phone}
        />
        <FormLabel
          label="Email"
          content={driver?.email}
        />
        <FormLabel
          label="Tanggal Lahir"
          content={moment.utc(driver?.dob?.date).format("DD-MM-YYYY")}
        />
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  driver: PropTypes.object.isRequired
};

export default ProductCard;
