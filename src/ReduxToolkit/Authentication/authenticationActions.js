import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginFailure, loginRequest, loginSuccess, logoutFailure, logoutRequest, logoutSuccess } from "./authenticationSlice";
import axios from "axios";
import { getUserProfileFunc } from '../UserProfile/userProfileActions';
const api = process.env.REACT_APP_BASE_URL;


export const registerFunction = (payload, navigate, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    axios.post(`${api}/register`, payload,)
        .then((response) => {
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
            setLoading(false);
            resetFormData();
            navigate(`/`);
        })
        .catch((e) => {
            setLoading(false);
            console.log({ e });
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};


// Login Function:-
export const loginFunction = (payload, navigate, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    dispatch(loginRequest());
    axios.post(`${api}/login`, payload)
        .then((response) => {
            console.log({ response });
            localStorage.setItem("qurinomToken", response?.data?.token);
            dispatch(loginSuccess(response?.data));
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
            setLoading(false);
            resetFormData();
            getUserProfileFunc();
            navigate(`/dashboard`);
        })
        .catch((e) => {
            setLoading(false);
            console.log({ e });
            dispatch(loginFailure(e?.response?.data?.message || e?.message));
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
}


// Logout Function:-
export const logoutFunction = (navigate) => (dispatch) => {
    dispatch(logoutSuccess());
    toast.error('Logout Successful!', {
        autoClose: 1500,
        position: 'top-center',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
    });
    navigate('/');
};