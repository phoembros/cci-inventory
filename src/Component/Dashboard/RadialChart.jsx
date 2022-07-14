import React from 'react'
import ReactApexChart from "react-apexcharts";
import {Stack, Grid, IconButton, Typography} from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_TOP_MATERIAL } from '../../Schema/dasboard';
import DescriptionIcon from '@mui/icons-material/Description';

export default function RadialChart() {

    const { data: dataTop , error , refetch } = useQuery(GET_TOP_MATERIAL, {
        onCompleted: ({getTopRawMaterial}) => {
            // console.log( "getTopRawMaterial" , getTopRawMaterial)
        },
        onError: (error) => {
            console.log( "error" , error)
        },
        fetchPolicy: "network-only",
    });

    
    // console.log( "getTopRawMaterial" , data?.getTopRawMaterial)

    const [materialLabel,setMaterialLabel] = React.useState([]);
    const [materialValue,setMaterialValue] = React.useState([]);

    React.useEffect( () => {
        refetch()
    },[materialLabel,materialValue])

    React.useEffect( () => {
      if(dataTop?.getTopRawMaterial){
          setMaterialLabel(dataTop?.getTopRawMaterial?.label)
          setMaterialValue(dataTop?.getTopRawMaterial?.value)
      }
    },[dataTop?.getTopRawMaterial])

    const state = {  
          series: materialValue,
          options: {
            chart: {
              height: 300,
              type: 'radialBar',
            },          
            plotOptions: {
              radialBar: {
                offsetX: 50,
                offsetY: 10,
                startAngle: 0,
                endAngle: 270,
                position: 'left',
                hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: false,
                  }
                }
              }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5' , '#1ab7ea' , '#1ab7ea', '#0084ff', '#39539E', '#0077B5' , '#1ab7ea'],
            labels: materialLabel,
            legend: {
              show: true,
              floating: true,
              fontSize: '15px',
              position: 'left',
              offsetX: -20,
              offsetY: 0,
              background: 'transparent',
              labels: {
                useSeriesColors: true,
              },
              markers: {
                size: 0
              },
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
                vertical: 3
              }
            },
            responsive: [{
              breakpoint: 40,
              options: {
                legend: {
                    show: false,
                }
              }
            }]
          },
      }

  return (

      <div id="chart">
        {
          materialLabel?.length !== 0  && materialValue?.length !== 0 ?
          
              <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="radialBar"
                  height={280}
              />
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
      </div>
 
  );
}

{/* */}