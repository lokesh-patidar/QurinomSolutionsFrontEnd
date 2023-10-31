import { Box, Image, Text } from "@chakra-ui/react";
import loadingImg from "../Images/loading-hub-hubla.gif";


const Loading = () => {
    return (
        <Box display='flex' flexDir='column' justifyContent='center' alignItems='center' w='100%' h='60%'>
            <Box width={{ base: '30%', sm: '20%', md: '15%', lg: '10%' }}>
                <Image w='100%' src={loadingImg} alt='Loading...' />
            </Box>
            <Text w='fit-content' fontWeight='bold'>Loading...</Text>
        </Box>
    );
};

export { Loading };