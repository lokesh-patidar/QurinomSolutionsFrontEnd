import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommonDelete = ({ id, name, functionName }) => {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const { isOpen, onOpen, onClose } = useDisclosure();
     const initialRef = useRef(null);
     const finalRef = useRef(null);

     const deleteHandler = (id) => {
          if (id) {
               dispatch(functionName(id, navigate));
          }
          onClose();
     }

     return (
          <>
               <Button size={'sm'} onClick={onOpen} color='red' mr={3} leftIcon={<DeleteIcon color='red' />}>Delete</Button>
               <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
               >
                    <ModalOverlay />
                    <ModalContent backgroundColor="white">
                         <ModalHeader color="red.700">Warning!!!</ModalHeader>
                         <ModalCloseButton outline={'none'} />
                         <ModalBody pb={6}>
                              <Text fontSize={{ base: "70%", sm: "80%", md: "80%", lg: "90%", xl: "90%" }} fontWeight="bold">{`Would you like to delete ${name}?`} </Text>
                         </ModalBody>
                         <ModalFooter>
                              <Button fontSize="80%" colorScheme='red' size={'sm'} mr={3} onClick={() => deleteHandler(id)}>
                                   Delete
                              </Button>
                              <Button onClick={onClose} fontSize="80%" size={'sm'}>Cancel</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     );
};
export { CommonDelete };