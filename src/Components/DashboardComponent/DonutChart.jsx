
import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = () => {
     const chartContainerRef = useRef(null);
     useEffect(() => {
          if (chartContainerRef?.current) {
               const centerValueElement = document.createElement('div');
               const p = document.createElement('p');
               const h = document.createElement('h3');
               p.innerText = 'Total New Customer';
               p.style.width = '100px'
               h.innerText = '65%';
               // h.style.fontSize = '200%';
               h.style.fontWeight = 'bold';
               h.setAttribute('class', 'h1class');
               p.setAttribute('class', 'pclass');

               centerValueElement.append(h, p);
               centerValueElement.style.background = 'transparent';
               centerValueElement.style.position = 'absolute';
               centerValueElement.style.top = '55%';
               centerValueElement.style.left = '50%';
               centerValueElement.style.transform = 'translate(-50%, -50%)';
               centerValueElement.style.color = 'black';
               centerValueElement.style.zIndex = '1'; // Ensure it's above the chart
               chartContainerRef.current.appendChild(centerValueElement);
          }
     }, []);

     const chartOptions = {
          chart: {
               type: 'donut',
          },
          plotOptions: {
               pie: {
                    donut: {
                         size: '60%',
                    },
               },
          },
          labels: ['30', '20', '50'],
          legend: {
               show: false,
          },
          dataLabels: {
               enabled: false,
          },
          series: [30, 20, 50],
          colors: ['#c23698', '#2a61c7', '#c5cede'],
     };

     return (
          <Box position="relative" p={5} bg={'white'} m={3} borderRadius='5px'>
               <Text fontWeight={'bold'} fontSize='110%' display='flex'>Customers</Text>
               <Text display='flex'>Customers that buy products</Text>
               <div ref={chartContainerRef}>
                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" />
               </div>
          </Box>
     );
};

export default DonutChart;