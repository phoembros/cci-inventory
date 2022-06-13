import React from 'react'
import ReactApexChart from "react-apexcharts";
import {Stack, Grid} from "@mui/material";

export default function RadialChart() {

   const state = {  
        series: [76, 67, 61, 90],
        options: {
          chart: {
            height: 250,
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
                size: '20%',
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
          colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
          labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
          legend: {
            show: true,
            floating: true,
            fontSize: '15px',
            position: 'left',
            offsetX: 0,
            offsetY: 20,
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
            breakpoint: 480,
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
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radialBar"
          height={250}
        />
      </div>
 
  );
}

{/* */}