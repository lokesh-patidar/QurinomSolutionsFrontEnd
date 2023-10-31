import { GoHome } from "react-icons/go";
import { HiFastForward } from "react-icons/hi";
import { PiCodesandboxLogoLight } from "react-icons/pi";

export const SidebarData = [
    {
        id: 1,
        icon: <GoHome />,
        title: 'Dashboard',
        space: <HiFastForward color="transparent" />,
        path: `/dashboard`,
    },
    {
        id: 2,
        icon: <PiCodesandboxLogoLight />,
        title: 'Products',
        space: <HiFastForward color="transparent" />,
        path: `/products`,
    },
];
