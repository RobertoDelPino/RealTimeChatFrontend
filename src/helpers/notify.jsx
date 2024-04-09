import toast from "react-hot-toast";

export const notify = (message, type) => {
    toast[type](message);
};