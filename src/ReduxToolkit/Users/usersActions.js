import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { addUserRequest, addUserSuccess, addUserFailure, getUserFailure, getUserRequest, getUserSuccess, changeRoleRequest, changeRoleSuccess } from "./usersSlice";
import { homeRoute } from '../../AllRoutes/AllRoute';
const api = process.env.REACT_APP_BASE_URL;


// Get All Users:-
export const getAllUsersFunc = (navigate) => (dispatch) => {
    const token = localStorage.getItem("event_token");
    dispatch(getUserRequest());
    axios.get(`${api}/get-all-users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(getUserSuccess(response?.data?.users));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getUserFailure(e?.response?.data?.message || e?.message));
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
            if (e?.response?.status === 401 || e?.response?.data?.message === 'User does not exist') {
                navigate(`${homeRoute}/event-management`);
            }
        });
}


// Role Change Function:-
export const changeRoleFunc = (payload, id, navigate, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("event_token");
    dispatch(changeRoleRequest());
    axios.post(`${api}/upgrade-role/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(changeRoleSuccess(response?.data?.user));
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            setLoad(false);
        })
        .catch((e) => {
            console.log({ e });
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
            if (e?.response?.status === 401 || e?.response?.data?.message === 'User does not exist') {
                navigate(`${homeRoute}/event-management`);
            }
        });
}


// Add User Function:- 
export const addUserFunc = (payload, navigate, onClose, resetFormData, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("event_token");
    dispatch(addUserRequest());
    axios.post(`${api}/add-a-user`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            console.log(response?.data);
            dispatch(addUserSuccess(response?.data?.user))
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
        })
        .then(() => {
            setLoad(false);
            resetFormData();
            onClose();
        })
        .catch((e) => {
            console.log({ e });
            dispatch(addUserFailure(e?.response?.data?.message || e?.message))
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
            setLoad(false);
            if (e?.response?.status === 401 || e?.response?.data?.message === 'User does not exist') {
                navigate(`${homeRoute}/event-management`);
            }
        });
}