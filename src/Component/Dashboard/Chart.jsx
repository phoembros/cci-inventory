import * as React from 'react';
import './chart.scss';
import { IconButton, Stack,  Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { GET_BAR_CHART } from "../../Schema/dasboard"
import { Box } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';
import PermissionContent from '../Permission/PermissionContent';

export default function Chart({dataUserLogines}) {

  const { data : dataBar } = useQuery(GET_BAR_CHART)
  

  // console.log(data?.getBarChart , "data")
  const [dataRevenue,setDataRevenue] = React.useState([]) 
  const [dataExpense,setDataExpense] = React.useState([])
  const [dataCategories,setDataCategories] = React.useState([])

  React.useEffect( () => {
      if(dataBar?.getBarChart){
        setDataRevenue(dataBar?.getBarChart?.seriesRevenue);
        setDataExpense(dataBar?.getBarChart?.seriesExpense);
        setDataCategories(dataBar?.getBarChart?.categories);
      }
  },[dataBar?.getBarChart])


  const state = {
    series: [
    // {
    //   name: 'Sale',
    //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    // }, 
    {
      name: 'Revenue',
      data: dataRevenue,
    }, {
      name: 'Expense',
      data: dataExpense,
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
        categories: dataCategories,
      },
      // yaxis: {
      //   title: {
      //     text: '$ (thousands)'
      //   }
      // },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val
          }
        }
      }
    }
  }
 
  return(
    <Stack direction="column" height="100%" className='chart' >
        <Stack direction='row' spacing={2}>          
            <Typography className="title" > Cash Chart</Typography>          
        </Stack>
        <Box sx={{flexGrow:1}}></Box>

        {
          dataUserLogines?.getuserLogin?.role_and_permission?.permissions?.getBarChart ?
            <>
              <Stack id="chart">
                  {
                    dataRevenue?.length !== 0 && dataExpense?.length !== 0 &&  dataCategories?.length !== 0 ? 
                      <ReactApexChart options={state.options} series={state.series} type="bar" height={320} className='chart-absotute'/>
                    :
                      <Stack direction="row" justifyContent="center" height={320} >
                          <Stack direction="column" justifyContent="center">
                              <IconButton>
                                  <DescriptionIcon sx={{color: "#d0e3ed"}}/>
                              </IconButton>
                              <Typography variant="body2" sx={{color: "#d0e3ed"}}>No Data</Typography>
                          </Stack>
                      </Stack>
                  }            
              </Stack>
            </>
          :           
            <PermissionContent />            
        }
        
    </Stack>
  )
}
