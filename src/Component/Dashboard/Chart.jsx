import * as React from 'react';
import './chart.scss';
import { Grid, Stack,  Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export default function Chart (){
  const state = {
    series: [
    // {
    //   name: 'Sale',
    //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    // }, 
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Expense',
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
          columnWidth: '65%',
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
        <Stack direction='row' spacing={2}>          
            <Typography className="title" > Product Monthly Chat</Typography>          
        </Stack>
        <Stack id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={320} className='chart-absotute'/>
        </Stack>
    </Stack>
  )
}
