import { Avatar, Box, Input, InputGroup, InputLeftElement, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { dashData, tableData } from "../Data/DashboardData";
import { BiDownArrowAlt } from "react-icons/bi";
import { BsArrowUpShort } from "react-icons/bs";
import BarChart from "../Components/DashboardComponent/BarChart";
import PolarAreaChart from "../Components/DashboardComponent/DonutChart";
import { SearchIcon } from "@chakra-ui/icons";


const Dashboard = () => {

    return (
        <Box
            width={{ base: '100%', md: '75%', lg: '80%' }}
            display='flex'
            flexDir='column'
            p={3}
        >
            <Navbar />
            <Box display='grid' gridTemplateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' }}>
                {
                    dashData?.map((el) => {
                        return <DashBordDataCard key={el.id} {...el} />
                    })
                }
            </Box>
            <Box w='full' mt={3} display='flex' flexDir={{ base: 'column-reverse', lg: 'row' }}>
                <Box w={{ base: "full", lg: '60%' }}>
                    <BarChart />
                </Box>
                <Box w={{ base: "100%", sm: '70%', md: '70%', lg: '40%' }} m='auto'>
                    <PolarAreaChart />
                </Box>
            </Box>
            <Box bg='white' borderRadius='10px' p={2} pt={3}>
                <Box display='flex' justifyContent='space-between'>
                    <Box fontWeight={'bold'} w='fit-content'>Product Sell</Box>
                    {/* <Box display='flex' flexDir={{ base: 'column', md: 'row' }} maxW={{ base: '100px', sm: '200px', md: '400px' }}>
                        <InputGroup size={'sm'} mr={{ base: 0, md: 2 }}>
                            <InputLeftElement pointerEvents='none'>
                                <SearchIcon color='gray.300' />
                            </InputLeftElement>
                            <Input type='text' color='gray.300' fontSize='90%' placeholder='Search' />
                        </InputGroup>
                        <Select size={'sm'} placeholder="Last 30 days">
                        </Select>
                    </Box> */}
                </Box>

                <TableContainer mt={3}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th w={'90%'} color={'gray.400'}>Product Name</Th>
                                <Th color={'gray.400'}>Stock</Th>
                                <Th color={'gray.400'}>Price</Th>
                                <Th color={'gray.400'}>Total Sales</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                tableData?.map((el) => {
                                    return (
                                        <Tr key={el.id}>
                                            <Td>
                                                <Box display='flex'>
                                                    <Avatar src={el.img} />
                                                    <Box ml={2} display='flex' flexDir='column'>
                                                        <Text fontWeight={'bold'}>{el.title}</Text>
                                                        <Text>{el.description}</Text>
                                                    </Box>
                                                </Box>
                                            </Td>
                                            <Td>{el.stock}</Td>
                                            <Td fontWeight='bold'>{el.price}</Td>
                                            <Td>{el.totalSales}</Td>
                                        </Tr>
                                    );
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export { Dashboard };



const DashBordDataCard = ({ img, title, value }) => {
    return (
        <Box display='flex' justifyContent='center' m={2} bg='white' borderRadius='10px' p={3} pt={5} pb={5}>
            <Box
                borderRadius={'full'}
                bg={
                    (title === 'Earning' && '#e6fce6') ||
                    (title === 'Orders' && '#f5d9fc') ||
                    (title === 'Balance' && '#c3ecfa') ||
                    (title === 'Total Sales' && '#fc95c5')
                }>
                <Box className="circle">{img}</Box>
            </Box>
            <Box w='55%' display='flex' flexDir='column' justifyContent='center' alignItems='flex-start' pl={2}>
                <Text textAlign='left' color='gray' className="topFont">{title}</Text>
                <Text textAlign='left' color='black' fontSize={{ base: '150%', sm: '120%', md: '130%', lg: '130%', xl: '150%' }} fontWeight='bold'>{value}</Text>
                <Text textAlign='left' display='flex' w='100%' alignItems='center' className="fontForLast">
                    {title === 'Earning' ? <span style={{ color: 'green', display: 'flex', alignItems: 'center', fontWeight: '500' }}><BsArrowUpShort />37.8%</span> : ''}
                    {title === 'Orders' ? <span style={{ color: 'red', display: 'flex', alignItems: 'center', fontWeight: '500' }}><BiDownArrowAlt />2%</span> : ''}
                    {title === 'Balance' ? <span style={{ color: 'red', display: 'flex', alignItems: 'center', fontWeight: '500' }}><BiDownArrowAlt />2%</span> : ''}
                    {title === 'Total Sales' ? <span style={{ color: 'green', display: 'flex', alignItems: 'center', fontWeight: '500' }}><BsArrowUpShort />11%</span> : ''}
                    {<span style={{ paddingLeft: '2%' }}>this month</span>}
                </Text>
            </Box>
        </Box>
    );
};