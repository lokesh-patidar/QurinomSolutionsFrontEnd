import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { SidebarDrawer } from '../../Drawer/SidebarDrawer';
import { PiHandWavingDuotone } from "react-icons/pi";
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfileFunc } from '../../ReduxToolkit/UserProfile/userProfileActions';


export default function Navbar() {

    const dispatch = useDispatch();
    const { user, isUserProfileLoading, isUserProfileError } = useSelector((state) => state?.userprofile)

    useEffect(() => {
        dispatch(getUserProfileFunc());
    }, []);

    return (
        <Box
            display='flex'
            justifyContent="space-between"
            p={2}
            alignItems='center'
            w='100%'
            height='fit-content'
        >
            <Box display='flex' alignItems='center'>
                <Box display={{ base: 'flex', md: 'none' }}>
                    <SidebarDrawer />
                </Box>
                <Box display='flex' alignItems='center' fontWeight={500} width='fit-content' ml={2}>
                    {` Hello ${user?.userName || 'Lokesh'}`} {" "} <PiHandWavingDuotone color='#faddb1' />
                </Box>
            </Box>
            <Box>
                {/* <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type='text' color='gray.300' fontSize='90%' placeholder='Search' />
                </InputGroup> */}
            </Box>
        </Box>
    );
};