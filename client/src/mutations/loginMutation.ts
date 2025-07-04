import { user } from "@/store/user";
import { loginPayload } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { links } from "@/lib/links";
import toast from "react-hot-toast";
import { connectSocket } from "@/lib/socket";

const login = async (payload: loginPayload) => {
    try {
        // console.log(process.env.NEXT_PUBLIC_BACKEND_URL + links.auth.login); 
        const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + links.auth.login,
            payload,
            {withCredentials: true}
        );
        console.log("Login response:", response.data);
        
        connectSocket(response.data.data.id);

        const accessToken = response.headers['authorization']?.split(' ')[1];
        // console.log(response.headers, accessToken);

        return {
            user: response.data.data,
            accessToken
        };

    } catch (error) {
        console.error("Error in login mutation:", error);
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
            dispatch(user(loggedInUser));
            localStorage.setItem("accessToken", accessToken);
            toast.success("User logged in successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}