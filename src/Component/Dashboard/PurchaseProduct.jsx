import React from 'react';
import './purchaseproduct.scss';
import {Stack, Grid, Box} from '@mui/material'; 

function PurchaseProduct() {
  return (
    <Stack className="purchase" spacing={1} padding="2%">

      <Stack container direction="row" spacing={2}>
        <Grid className="title"> PurchaseProduct </Grid>
        <Grid className="left-make" container direction="column">
          View All
        </Grid>
      </Stack>

      <Stack container direction="row" spacing={2}>
        <Box
          sx={{
            padding: "2%",
            borderRadius: "10px",
            width: "100%",
            height: 50,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "gray",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Stack className="set-product" direction="row" spacing={5}>
            <Grid className="" container direction="column">
              Product Name
            </Grid>
            <Grid className="" container direction="column">
              Amount: 1000 Can
            </Grid>
            <Grid className="left-make" container direction="column">
              View
            </Grid>
          </Stack>
        </Box>
      </Stack>

      <Stack container direction="row" spacing={2}>
        <Box
          sx={{
            padding: "2%",
            borderRadius: "10px",
            width: "100%",
            height: 50,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "gray",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Stack className="set-product" direction="row" spacing={5}>
            <Grid className="" container direction="column">
              Product Name
            </Grid>
            <Grid className="" container direction="column">
              Amount: 1000 Can
            </Grid>
            <Grid className="left-make" container direction="column">
              View
            </Grid>
          </Stack>
        </Box>
      </Stack>

    </Stack>
  );
}

export default PurchaseProduct