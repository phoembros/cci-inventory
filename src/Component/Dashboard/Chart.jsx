import * as React from 'react';
import './chart.scss';
import { Grid, Stack,  Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function Chart (){
  const state = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      // yaxis: {
      //   title: {
      //     text: '$ (thousands)'
      //   }
      // },
      fill: {
        opacity: 1
      },
      // tooltip: {
      //   y: {
      //     formatter: function (val) {
      //       return "$ " + val + " thousands"
      //     }
      //   }
      // }
    }
  }
 
  return(
    <Stack className='chart'>
        <Stack direction='row' spacing={2} >
          <Grid container spacing={2}> 
              <Grid item container xs={6} className="title"> Product Monthly Chat</Grid>
            {/* 
                <Grid item container xs={6} className="sub-title" display='flex' spacing={3}>
                    
                    <Grid  className="line-spacing">
                      on hand
                    </Grid> 

                    <Grid className="line-spacing">
                      Committed
                    </Grid>

                    <Grid className="line-spacing">
                      Available
                    </Grid>

                </Grid> */}
          </Grid>
        </Stack>
        <Stack id="chart" >
          <ReactApexChart options={state.options} series={state.series} type="bar" height={250} className='chart-absotute'/>
        </Stack>
    </Stack>
  )
}
