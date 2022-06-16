import React from 'react';
import './purchaseproduct.scss';
import {Stack, Grid, Box, Typography} from '@mui/material'; 

function PurchaseProduct() {

  const row = [1,2,3,4];

  return (
    <Stack className="purchase" spacing={1} padding="2%">

      <Stack direction="row" spacing={2}>
        <Typography className="title"> Production </Typography>
        <Box sx={{flexGrow:1}}></Box>
        <Typography className="left-make">
          View All
        </Typography>
      </Stack>

      {
        row.map( (item,index) => (
          <Stack direction="row" spacing={2} sx={{ padding: "2%", borderRadius: "10px",  height: 45,  backgroundColor: "#f5f5f5", }} >  
              <Stack direction="column" justifyContent="center"  sx={{width:"300px"}}>
                  <Typography> Product Name</Typography>
              </Stack>
              <Stack direction="column" justifyContent="center">
                <Typography> Amount: 1000 Can </Typography>
              </Stack>
              <Box sx={{flexGrow:1}}></Box>
              <Stack direction="column" justifyContent="center"> 
                <Typography> View </Typography>
              </Stack>         
          </Stack>
        ))
      }
      
      

    </Stack>
  );
}

export default PurchaseProduct