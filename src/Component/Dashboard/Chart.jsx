import * as React from 'react';
import './chart.scss';
import { IconButton, Paper, Stack,  Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { GET_BAR_CHART } from "../../Schema/dasboard"
import { Box } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';
import PermissionContent from '../Permission/PermissionContent';
import LoadingPage from "../Permission/LoadingPage";
import { useTheme } from '@mui/material/styles';


export default function Chart({dataUserLogines}) {

  const theme = useTheme();

  const [loading,setLoading] = React.useState(true);
  const { data : dataBar } = useQuery(GET_BAR_CHART);

  React.useEffect( () => {
      if(dataUserLogines?.getuserLogin?.role_and_permission?.permissions) {
          setLoading(false)
      }
  },[dataUserLogines?.getuserLogin?.role_and_permission])
  
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
        height: 350,
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
        colors: ['transparent'],       
        
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
        opacity: 1,
        // colors: ['#546E7A', '#E91E63'],
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
 
  // console.log(dataRevenue , dataExpense , dataCategories );

  return(
    <Stack component={Paper} direction="column" height="100%" className='chart' >
        <Stack direction='row' spacing={2}>          
            <Typography className={theme.palette.mode === 'dark' ? "title-dark" : "title" }> Cash Chart</Typography>          
        </Stack>
        <Box sx={{flexGrow:1}}></Box>

        {
          dataUserLogines?.getuserLogin?.role_and_permission?.permissions?.getBarChart ?
            <>
              <Stack id="chart">
                  {
                    dataRevenue !== null && dataExpense !== null &&  dataCategories !== null ?
                    // dataRevenue?.length !== 0 && dataExpense?.length !== 0 &&  dataCategories?.length !== 0 ? 
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
              <>
                {  loading ?                                            
                    <LoadingPage />   
                  :                    
                    <PermissionContent />
                }                   
              </>
                     
        }        
        
    </Stack>
  )
}
