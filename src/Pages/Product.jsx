import { Box, Tag, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonDelete } from "../Components/DeleteCommonModal/CommonDelete";
import CustomTable from "../Components/CustomTable";
import { deleteProductFunc, getAllProductsFunc } from "../ReduxToolkit/Products/productsActions";
import { UpdateProduct } from "./UpdateProduct";
import { AddNewProduct } from "./AddNewProduct";
import Navbar from "../Components/Navbar/Navbar";


const ProductPage = () => {

     const { allProducts, isProductsError } = useSelector(state => state?.productsSlice);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          window.scrollTo(0, 0);
          dispatch(getAllProductsFunc(navigate));
     }, [dispatch]);

     useEffect(() => {
          if (allProducts?.length > 0) {
               setLoading(false);
          }
     }, [allProducts?.length]);


     const allProductsTableColumns = useMemo(
          () => {
               const columns = [
                    {
                         Header: 'title',
                         accessor: 'title',
                         Cell: ({ value }) => {
                              return <Box fontWeight={500} color={'blue.700'}>{value || '---'}</Box>;
                         }
                    },
                    {
                         Header: 'description',
                         accessor: 'description',
                         Cell: ({ value }) => {
                              return (
                                   <Box display='flex'>
                                        <Text overflow={'hidden'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} maxW='300px'>{value || '---'}</Text>
                                   </Box>
                              );
                         }
                    },
                    {
                         Header: 'price',
                         accessor: 'price',
                         Cell: ({ value }) => {
                              return <span>{value || '---'}</span>;
                         }
                    },
                    {
                         Header: 'subCategory',
                         accessor: 'subCategory',
                         Cell: ({ value }) => {
                              return <span>{value || '---'}</span>;
                         }
                    },
                    {
                         Header: 'tags',
                         accessor: 'tags',
                         Cell: ({ value }) => {
                              return (
                                   <Box display='flex' flexWrap={'wrap'} w={'300px'}>
                                        {value?.map((el, i) => {
                                             return <Tag m={1} key={i}>{el}</Tag>
                                        })}
                                   </Box>
                              );
                         }
                    },
                    {
                         Header: 'created At',
                         accessor: 'createdAt',
                         Cell: ({ value }) => {
                              const formattedCreatedAt = new Date(value).toLocaleString();
                              return (
                                   <span>{formattedCreatedAt}</span>
                              );
                         }
                    },
                    {
                         Header: 'Actions',
                         accessor: '',
                         Cell: ({ row }) => {
                              const { title, _id } = row.original;
                              return (
                                   <Box display='flex'>
                                        <CommonDelete id={_id} name={title} functionName={deleteProductFunc} />
                                        <UpdateProduct id={_id} />
                                   </Box>
                              );
                         }
                    },
               ];
               return columns?.filter(Boolean);
          },
          [allProducts]
     );


     return (
          <Box
               width={{ base: '100%', md: '75%', lg: '80%' }}
               display='flex'
               flexDir='column'
               p={4}
               pt={0}
          >
               <Navbar />
               <Box mb={2} p={2} display='flex' justifyContent='space-between'>
                    <Box display='flex' alignItems='center' fontSize={{ base: '100%', sm: '130%', xl: '140%' }} color='1b0f7a' fontWeight={'bold'} textTransform='uppercase'>All Products</Box>
                    <AddNewProduct />
               </Box>
               <Box
                    width='100%'
                    bg='white'
                    p={3}
                    minH='90vh'
                    borderTopRadius='10px'
               >
                    {
                         isProductsError ? (
                              <Box
                                   fontWeight="bold"
                                   fontSize={{ base: "90%", sm: "100%", md: "115%", lg: "120%" }}
                                   padding={5}
                              >Something Went Wrong With Levels!!</Box>
                         ) : (
                              <>
                                   {
                                        loading ? (
                                             <Text>Loading</Text>
                                        ) : (
                                             allProducts && allProducts?.length > 0 ? (
                                                  <CustomTable columns={allProductsTableColumns} data={allProducts ? allProducts : []} searchEnabled={true} />
                                             ) : (
                                                  <Text fontWeight={500} color='red.700'>Levels Not Available</Text>
                                             )
                                        )
                                   }
                              </>
                         )
                    }
               </Box>
          </Box>
     );
};

export { ProductPage };