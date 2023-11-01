import axios from "axios";
import { getUserProfileFailure, getUserProfileRequest, getUserProfileSuccess } from "./userProfileSlice";

const api = process.env.REACT_APP_BASE_URL;


export const getUserProfileFunc = () => async (dispatch) => {
    const token = localStorage.getItem("qurinomToken");
    dispatch(getUserProfileRequest());
    try {
        const response = await axios.get(`${api}/user-profile`, { 
            headers: {
                Authorization: `Bearer ${token}`,
            }
         });
        dispatch(getUserProfileSuccess(response?.data?.user));
    }
    catch (e) {
        dispatch(getUserProfileFailure(e?.response?.data?.message || e?.message));
    }
};