import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import DriverCard from './DriverCard';
import useFetch from '../../../hooks/useFetch';
import { usePagination } from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '200px',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  driverCard: {
    height: '100%',
    marginRight: '20px'
  },
  driverListWrap: {
    display: 'flex',
    overflow: 'auto',
  },
  driverGridList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  ul:{
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  }
}));

const DriverList = () => {
  const classes = useStyles();
  const [drivers, setDriver] = useState([]);
  
  const limit = 50;
  const { items } = usePagination({
    count: limit/5,
  });
  const withlistPagination = ['previous','next'];
  const { data, status, error, params, setParams, refetch } = useFetch(
      'https://randomuser.me/api',
      {
          results: 5,
          page: 1,
          seed:'abc'
      },
      useCallback(data => ({ data: data?.results }), []),
      { withQueryParams: false }
  )
  
  useEffect(()=>{
    setDriver(data)
  },[data])
  
  return (
    <Page
      className={classes.root}
      title="Drivers Management"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box 
          mt={3}
          className={classes.driverListWrap}
        >
          <Box
            className={classes.driverGridList}
            cols={1.5}
            
          >
              {drivers?.map((driver,index) => (
                
                  <DriverCard
                    key={index}
                    className={classes.driverCard}
                    driver={driver}
                  />
                
              ))}
          </Box>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <nav>
            <ul className={classes.ul}>
              {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;
                
                if(withlistPagination.includes(type)){
                  console.log({page})
                  if(type==='previous'){
                    
                    children = (
                      <button disabled={params.page===1 ? true: false} onClick={(e)=>setParams((params) => ({ ...params, page: params.page-1 }))} type="button">
                        Previous Page
                      </button>
                    );
                  }else if(type==='next'){
                    children = (
                      <button disabled={params.page===(limit/5) ? true: false} onClick={(e)=>setParams((params) => ({ ...params, page: params.page+1 }))} type="button">
                        Next Page
                      </button>
                    );
                  }
                  
                }
                 
                

                return <li key={index}>{children}</li>;
              })}
            </ul>
          </nav>
          {/* <Pagination
            color="primary"
            
            size="small"
            page={params.page}
            showFirstButton
            showLastButton
            onChange={(event,value)=>setParams((params) => ({ ...params, page: value }))}
          /> */}
        </Box>
      </Container>
    </Page>
  );
};

export default DriverList;
