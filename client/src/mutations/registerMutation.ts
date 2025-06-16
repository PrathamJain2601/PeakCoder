import { user } from "@/store/user";
import { registerPayload } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { links } from "@/lib/links";
import toast from "react-hot-toast";

const register = async (payload: registerPayload) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + links.auth.register,
            payload,
            { withCredentials: true }
        );

        const accessToken = response.headers['authorization']?.split(' ')[1];

        return {
            user: response.data.data,
            accessToken
        };
        
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.response?.data || error.message);
            throw new Error(error.response?.data.data || error.response?.data.message);
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};

export const useRegisterMutation = (onSuccessCallback?: () => void) => { 
    const dispatch = useDispatch();       
    return useMutation({
        mutationFn: register,
        onSuccess: ({ user: registeredUser, accessToken }) => {
            dispatch(user({ user: registeredUser, isAuthenticated: false }));
            localStorage.setItem("accessToken", accessToken);
            if (onSuccessCallback) onSuccessCallback();
            toast.success("User Registered in successfully");
            toast("Verification email sent to your email address",{duration: 3000,});
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}