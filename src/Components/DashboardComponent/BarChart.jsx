import { Box, Text } from "@chakra-ui/react";
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
     const chartData = {
          options: {
               chart: {
                    type: 'bar',
               },
               grid: {
                    show: false, // Hide the grid lines (horizontal lines)
               },
               plotOptions: {
                    bar: {
                         columnWidth: '60%', // Adjust the column width as needed
                         dataLabels: {
                              position: 'top', // Display data labels on top of bars
                              enabled: false, // Hide data labels on bars
                         },
                         borderRadius: 4, // Add a rounded curve to the bars
                    },
               },
               xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisBorder: {
                         show: false, // Hide the x-axis lines
                    },
                    labels: {
                         show: true, // Show x-axis labels
                    },
               },
               yaxis: {
                    show: false, // Hide the y-axis data labels
               },
          },
          series: [
               {
                    name: 'Series 1',
                    data: [150, 100, 75, 180, 129, 120, 70, 41, 125, 135, 160, 180],
               },
          ],

     };

     return (
          <Box bg={'white'} m={3} borderRadius='5px'>
               <Box display='flex' flexDir='column' justifyContent='left' pl={2}>
                    <Text fontWeight={500} width='fit-content'>Overview</Text>
                    <Text fontSize='90%' width='fit-content'>Monthly</Text>
               </Box>
               <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
          </Box>
     );
};

export default BarChart;
