import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductFunc } from '../ReduxToolkit/Products/productsActions';

const AddNewProduct = () => {

     const { isOpen, onOpen, onClose } = useDisclosure();
     const initialRef = React.useRef(null);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [load, setLoad] = useState(false);

     const [formData, setFormData] = useState({
          title: "",
          description: "",
          price: "",
          subCategory: "",
          tags: [],
          category: ""
     });


     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          setLoad(true);
          if (formData) {
               console.log({ formData });
               dispatch(addProductFunc(formData, navigate, onClose, resetFormData, setLoad));
          }
          else {
               toast.error(`Something went wrong!`, {
                    autoClose: 1500,
                    position: 'top-center',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
               });
          }
     };


     const resetFormData = () => {
          setFormData({
               title: "",
               description: "",
               price: "",
               subCategory: "",
               tags: [],
               category: ""
          });
     };


     console.log({ formData });

     return (
          <>
               <Button size={'sm'} onClick={onOpen} colorScheme='green' mr={3}>Add New</Button>
               <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
               >
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>Update Product</ModalHeader>
                         <ModalCloseButton />
                         <form onSubmit={handleSubmit}>
                              <ModalBody pb={6}>
                                   <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                             placeholder='Title'
                                             name="title"
                                             type="text"
                                             value={formData?.title}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </FormControl>
                                   <FormControl mt={4}>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                             placeholder='Description'
                                             name="description"
                                             type="text"
                                             value={formData?.description}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </FormControl>
                                   <FormControl mt={4}>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                             placeholder='Price'
                                             name="price"
                                             type="number"
                                             value={formData?.price}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </FormControl>
                                   <FormControl mt={4}>
                                        <FormLabel>Category</FormLabel>
                                        <Input
                                             placeholder='Category'
                                             name="category"
                                             type="text"
                                             value={formData?.category}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </FormControl>
                                   <FormControl mt={4}>
                                        <FormLabel>Sub-Category</FormLabel>
                                        <Input
                                             placeholder='Sub-category'
                                             name="subCategory"
                                             type="text"
                                             value={formData?.subCategory}
                                             onChange={handleInputChange}
                                             required
                                        />
                                   </FormControl>
                                   <FormControl>
                                        <FormLabel>Tag</FormLabel>
                                        <Keywords formData={formData} setFormData={setFormData} />
                                   </FormControl>
                              </ModalBody>
                              <ModalFooter>
                                   <Button type="submit" colorScheme='blue' mr={3} isLoading={load}>
                                        Save
                                   </Button>
                                   <Button onClick={onClose}>Cancel</Button>
                              </ModalFooter>
                         </form>
                    </ModalContent>
               </Modal>
          </>
     );
};

export { AddNewProduct };




export const Keywords = ({ formData, setFormData }) => {

     const [inputValue, setInputValue] = useState('');

     const handleInputTagChange = (event) => {
          setInputValue(event.target.value);
     };
     const handleInputKeyPress = (event) => {
          if (event.key === 'Enter' || event.key === ',') {
               event.preventDefault();
               addTag();
          }
     };

     const addTag = () => {
          if (inputValue !== '') {
               const updatedtags = [...formData?.tags, inputValue];
               setFormData({
                    ...formData,
                    tags: updatedtags,
               });
               setInputValue('');
          }
     };

     const removeTag = (index) => {
          const updatedTags = formData?.tags?.filter((_, i) => i !== index);
          setFormData({
               ...formData,
               tags: updatedTags,
          });
     };

     return (
          <Box>
               <Input
                    value={inputValue}
                    onChange={handleInputTagChange}
                    onKeyPress={handleInputKeyPress}
                    placeholder="Type and press Enter or comma to add tags"
               />
               <HStack width='500px' display='flex' flexWrap='wrap' spacing={2} mt={2}>
                    {formData?.tags?.map((tag, index) => (
                         <Button size={'sm'} rightIcon={<CloseIcon fontSize='80%' color='red' onClick={() => removeTag(index)} />} colorScheme='teal' variant='outline'>
                              {tag}
                         </Button>
                    ))}
               </HStack>
          </Box>
     );
};
