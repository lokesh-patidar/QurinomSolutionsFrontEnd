import {
    Accordion,
    AccordionButton,
    AccordionItem,
    Avatar,
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "../Data/SidebarData";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutFunction } from "../ReduxToolkit/Authentication/authenticationActions";
import { getUserProfileFunc } from "../ReduxToolkit/UserProfile/userProfileActions";
import { useEffect } from "react";

const SideBar = () => {

    const currentUrl = new URL(window.location.href);
    const pathname = currentUrl.pathname;
    var urlName = pathname.substring(1);
    const text = urlName.split("/");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isUserProfileLoading, isUserProfileError } = useSelector((state) => state?.userprofile)

    useEffect(() => {
        dispatch(getUserProfileFunc());
    }, []);

    const handleLogout = () => {
        console.log('LOGOUT');
        dispatch(logoutFunction(navigate));
    };

    return (
        <Box
            minH='100vh'
            width={{ base: '25%', md: '25%', lg: '20%' }}
            className="firstContainer"
            display={{ base: 'none', md: 'flex' }}
            flexDir='column'
            pl={2}
            pb={3}
            bg='#040275'
            h={'100vh'}
            position='sticky'
            top={'0px'}
        >
            <Box pt={4} pb={4} display='flex' justifyContent='center' alignItems='center'>
                <Box display='flex' alignItems='center' color='white' w='100%'>
                    <Avatar src='icon.jfif' borderRadius={0} />
                    <Text ml={2} fontSize={{ base: '150%' }}>Qurinom</Text>
                </Box>
            </Box>
            <Box>
                {
                    SidebarData?.length > 0 &&
                    SidebarData?.map((el) => {
                        return (
                            <Accordion allowToggle w='100%' key={el.id}>
                                <AccordionItem border='none'>
                                    <Link to={`${el.path}`}>
                                        <AccordionButton
                                            display='flex'
                                            pl={2}
                                            width={{ base: '95%' }}
                                            alignItems='center'
                                            justifyContent='space-between'
                                            borderRadius='5px'
                                            textDecor='none'
                                            fontSize={{ base: '90%', md: '95%', lg: '90%', xl: '125%' }}
                                            background={`/${text[0]}` === el.path ? '#2a2f70' : ''}
                                            color={`/${text[0]}` === el.path ? 'white' : '#a1a2b3'}
                                            _hover={{ bg: '#1c478c' }}
                                            onClick={() => navigate('/')}
                                        >
                                            <Box display='flex' justifyContent='space-between' alignItems='center' textAlign='left' width='100%'>
                                                <Box display='flex' alignItems='center'>{el.icon}{el.space}{el.title}</Box>
                                                <BiChevronRight />
                                            </Box>
                                        </AccordionButton>
                                    </Link>
                                </AccordionItem>
                            </Accordion>
                        );
                    })
                }
            </Box>
            <Box h={'full'} display='flex' w='100%' justifyContent='center' alignItems='flex-end'>
                <Box mr={3} w='100%' display='flex' alignItems='center' justifyContent='space-between' p={1} pl={2} pr={2} borderRadius='5px' bg={'#2a2f70'} _hover={{ cursor: 'pointer' }}>
                    <Menu>
                        <MenuButton as={Box} rightIcon={<ChevronDownIcon />}>
                            <Box display='flex' justifyContent='left' alignItems='center'>
                                <Avatar size='sm' src='https://bit.ly/ryan-florence' />
                                <Box pl={2} display='flex' flexDir='column'>
                                    <Text display='flex' textAlign='left' color='white' fontSize='90%' >{user?.userName || 'Evano'}</Text>
                                    <Text display='flex' textAlign='left' color='white' fontSize='70%' >Project Manager</Text>
                                </Box>
                            </Box>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => handleLogout()} color={'red'} fontWeight={500}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                    <BiChevronDown color='white' />
                </Box>
            </Box>
        </Box >
    );
};

export { SideBar };