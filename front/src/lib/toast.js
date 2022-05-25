import { toast } from 'react-toastify';

const params = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

export function toastSuccess(message) {
    toast.success(message, params);
}

export function toastErr(message) {
    toast.error(message, params);
}

export function toastInfo(message) {
    toast.info(message, params);
}