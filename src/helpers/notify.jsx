import toast from "react-hot-toast";

export const notify = (message, type) => {
    if(type === 'success') {
        return toast.success(message)
    }

    if(type === 'error') {
        return toast.error(message)
    }
};