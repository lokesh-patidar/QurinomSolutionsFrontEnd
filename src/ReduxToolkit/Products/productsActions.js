import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {
    getProductRequest,
    getProductSuccess,
    getProductFailure,

    getProductByIdRequest,
    getProductByIdSuccess,
    getProductByIdFailure,
} from "./productsSlice";
const api = process.env.REACT_APP_BASE_URL;


export const getAllProductsFunc = (navigate) => (dispatch) => {
    const token = localStorage.getItem("qurinomToken");
    dispatch(getProductRequest());
    axios.get(`${api}/get-all-products`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            dispatch(getProductSuccess(response?.data?.products));
        })
        .catch((e) => {
            console.log({ e });
            dispatch(getProductFailure(e?.response?.data?.message || e?.message));
            toast.error(e?.response?.data?.message || e?.message, {
                autoClose: 1500,
                position: 'top-center',
            });
        });
};


export const getProductByIdFunc = (id, navigate) => (dispatch) => {
    const token = localStorage.getItem("qurinomToken");
    if (id) {
        dispatch(getProductByIdRequest());
        axios.get(`${api}/get-product-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log('get by id', response?.data);
                dispatch(getProductByIdSuccess(response?.data?.product));
            })
            .catch((e) => {
                console.log({ e });
                dispatch(getProductByIdFailure(e));
                if (e?.response?.data?.message === 'Token expired') {
                    navigate('/');
                }
            });
    }
};



export const addProductFunc = (payload, navigate, onClose, resetFormData, setLoad) => async (dispatch) => {
    const token = localStorage.getItem("qurinomToken");
    axios.post(`${api}/create-product`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            toast.success(response?.data?.message, {
                autoClose: 1500,
                position: 'top-center',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
            });
            dispatch(getAllProductsFunc(navigate));
        })
        .then(() => {
            setLoad(false);
            resetFormData();
            onClose();
        })
        .catch((e) => {
            console.log({ e });
            setLoad(false);
            if (e?.response?.data?.message === 'Token expired') {
                navigate('/');
            }
            else {
                toast.error(e?.response?.data?.message || e?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                });
            }
        });
};



export const deleteProductFunc = (id, navigate) => async (dispatch) => {
    const token = localStorage.getItem("qurinomToken");
    if (id) {
        axios.delete(`${api}/delete-product/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
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
            .then(() => dispatch(getAllProductsFunc(navigate)))
            .catch((e) => {
                console.log({ e });
                if (e?.response?.data?.message === 'Token expired') {
                    navigate('/');
                }
                else {
                    toast.error(e?.response?.data?.message || e?.message, {
                        autoClose: 1500,
                        position: 'top-center',
                    });
                }
            });
    }
    else {
        toast.error('Id not found in action', {
            autoClose: 1500,
            position: 'top-center',
        });
    }
};


export const updateProductFunc = (id, payload, navigate, onClose, resetFormData, setLoad) => async (dispatch) => {
    if (id) {
        const token = localStorage.getItem("qurinomToken");
        axios.put(`${api}/update-product/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                toast.success(response?.data?.message, {
                    autoClose: 1500,
                    position: 'top-center',
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                });
                dispatch(getAllProductsFunc(navigate));
            })
            .then(() => {
                setLoad(false);
                resetFormData();
                onClose();
            })
            .catch((e) => {
                console.log({ e });
                setLoad(false);
                if (e?.response?.data?.message === 'Token expired') {
                    navigate('/');
                }
                else {
                    toast.error(e?.response?.data?.message || e?.message, {
                        autoClose: 1500,
                        position: 'top-center',
                    });
                }
            });
    }
    else {
        toast.error('Id not found in action', {
            autoClose: 1500,
            position: 'top-center',
        });
    }
};