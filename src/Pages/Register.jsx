import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
     Container,
     Flex,
     Box,
     Text,
     Button,
     VStack,
     Wrap,
     FormControl,
     FormLabel,
     Input,
     InputGroup,
     InputLeftElement,
     Avatar,
     Stack,
} from '@chakra-ui/react';
import {
     MdOutlineEmail,
} from 'react-icons/md';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerFunction } from "../ReduxToolkit/Authentication/authenticationActions";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FiUser } from "react-icons/fi";


const RegisterPage = () => {

     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [show, setShow] = useState(false);
     const [loading, setLoading] = useState(false);

     const [formData, setFormData] = useState({
          userName: '',
          email: '',
          password: '',
     });

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const resetFormData = () => {
          setFormData({
               userName: '',
               email: '',
               password: '',
          });
     };

     const handleClick = () => setShow(!show);

     const handleRegister = () => {
          if (formData?.userName && formData?.email && formData?.password) {
               console.log({ formData });
               dispatch(registerFunction(formData, navigate, setLoading, resetFormData));
          }
     };

     return (
          <Container bg="#9DC4FB" maxW="full" h='100vh' mt={0} centerContent overflow="hidden">
               <Flex pt={10}>
                    <Box
                         bg="#02054B"
                         color="white"
                         borderRadius="lg"
                         m={{ sm: 4, md: 16, lg: 10 }}
                         p={{ sm: 5, md: 5, lg: 16 }}
                    >
                         <Box p={4}>
                              <Box spacing={{ base: 20, sm: 3, md: 5, lg: 20 }} display='flex' flexDir={{ base: 'column', md: 'row' }}>
                                   <Box>
                                        <Box w='100%' display='flex' flexDir={{ base: 'row', md: 'column' }} p={2} pr={{ base: 'auto', md: 5 }} justifyContent={{ base: 'center', md: 'left' }}>
                                             <Box display='flex' flexDir={'column'}>
                                                  <Avatar size={{ base: 'xl', md: '2xl' }} borderRadius={0} src='icon.jfif' />
                                             </Box>
                                             <Box pl={{ base: 2, md: 'auto' }}>
                                                  <Text fontSize={'150%'}>Qurinom</Text>
                                                  <Text fontSize={'150%'}>Solutions</Text>
                                             </Box>
                                        </Box>
                                   </Box>
                                   <Box display='flex'>
                                        <Box bg="white" borderRadius="lg" w={'full'}>
                                             <Box m={8} color="#0B0E3F">
                                                  <Text fontSize={'150%'} fontWeight={'bold'} mb={2} color={'teal'}>Register</Text>
                                                  <VStack spacing={3}>
                                                       <FormControl>
                                                            <FormLabel>Username</FormLabel>
                                                            <InputGroup borderColor="#E0E1E7">
                                                                 <InputLeftElement pointerEvents="none">
                                                                      <FiUser color="gray.800" />
                                                                 </InputLeftElement>
                                                                 <Input
                                                                      size={'md'}
                                                                      type="text"
                                                                      value={formData?.userName}
                                                                      name='userName'
                                                                      placeholder='Enter username'
                                                                      onChange={handleInputChange}
                                                                 />
                                                            </InputGroup>
                                                       </FormControl>
                                                       <FormControl>
                                                            <FormLabel>Mail</FormLabel>
                                                            <InputGroup borderColor="#E0E1E7">
                                                                 <InputLeftElement pointerEvents="none">
                                                                      <MdOutlineEmail color="gray.800" />
                                                                 </InputLeftElement>
                                                                 <Input
                                                                      size={'md'}
                                                                      type="email"
                                                                      value={formData?.email}
                                                                      name='email'
                                                                      placeholder='Enter email'
                                                                      onChange={handleInputChange}
                                                                 />
                                                            </InputGroup>
                                                       </FormControl>
                                                       <FormControl>
                                                            <FormLabel>Password</FormLabel>
                                                            <InputGroup borderColor="#E0E1E7">
                                                                 <InputLeftElement onClick={handleClick}>
                                                                      {show ? <ViewOffIcon cursor='pointer' /> : <ViewIcon cursor='pointer' />}
                                                                 </InputLeftElement>
                                                                 <Input
                                                                      size={'md'}
                                                                      value={formData?.password}
                                                                      name='password'
                                                                      type={show ? 'text' : 'password'}
                                                                      placeholder='Enter password'
                                                                      onChange={handleInputChange}
                                                                 />
                                                            </InputGroup>
                                                       </FormControl>
                                                       <FormControl float="right">
                                                            <Button
                                                                 variant="solid"
                                                                 bg="#0D74FF"
                                                                 color="white"
                                                                 onClick={() => handleRegister()}
                                                                 isLoading={loading}>
                                                                 Register
                                                            </Button>
                                                       </FormControl>
                                                  </VStack>
                                                  <Stack pt={6}>
                                                       <Text align={'center'}>
                                                            Already a user? <Link to='/' color={'blue.400'}><span style={{ color: 'blue' }}>Login</span></Link>
                                                       </Text>
                                                  </Stack>
                                             </Box>
                                        </Box>
                                   </Box>
                              </Box>
                         </Box>
                    </Box>
               </Flex>
          </Container>
     );
};

export { RegisterPage };