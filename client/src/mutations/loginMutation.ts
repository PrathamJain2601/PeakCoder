import { user } from "@/store/user";
import { loginPayload, userType } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { links } from "@/lib/links";
import toast from "react-hot-toast";

const login = async (payload: loginPayload) => {
    try {
        // console.log(process.env.NEXT_PUBLIC_BACKEND_URL + links.auth.login); 
        const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + links.auth.login,
            payload,
            {withCredentials: true}
        );

        const accessToken = response.headers['authorization']?.split(' ')[1];
        // console.log(response.headers, accessToken);

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

export const useLoginMutation = () => { 
    const dispatch = useDispatch();     
    
    return useMutation({
        mutationFn: login,
        onSuccess: ({ user: loggedInUser, accessToken }) => {
            dispatch(user({ user: loggedInUser, isAuthenticated: true }));
            localStorage.setItem("accessToken", accessToken);
            toast.success("User logged in successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}