import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginFailure, loginRequest, loginSuccess, logoutFailure, logoutRequest, logoutSuccess } from "./authenticationSlice";
import axios from "axios";
import { getUserProfileFunc } from '../UserProfile/userProfileActions';
const api = process.env.REACT_APP_BASE_URL;


// Login Function:-
export const loginFunction = (payload, navigate, setLoading, resetFormData) => (dispatch) => {
    setLoading(true);
    const token = localStorage.getItem("qurinomToken");
    dispatch(loginRequest());
    axios.post(`${api}/login`, payload, { withCredentials: true }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
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
            navigate(`//dashboard`);
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
export const logoutFunction = (navigate, val = null) => (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem('qurinomToken');
    axios.get(`${api}/logout`, { withCredentials: true })
        .then((res) => {
            dispatch(logoutSuccess(res?.data));
            if (val !== 'token_expired') {
                toast.error(res?.data?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                });
            }
        })
        .then(() => {
            navigate(`/`);
        })
        .catch((e) => {
            console.log(e);
            dispatch(logoutFailure(e?.response?.data?.message || e?.message));
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};