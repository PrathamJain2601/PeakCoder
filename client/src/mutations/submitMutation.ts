import { links } from "@/lib/links";
import { runPayload } from "@/types/problem";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import api from "./api";

const submit = async (payload: runPayload) => {
    try{
        const response = await api.post(links.submission.submitCode, payload);
        console.log(response);
        return response.data.data;
    }
    catch(error) {
        console.error("Error in submit mutation:", error);
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.response?.data || error.message);
            throw new Error(error.response?.data.data || error.response?.data.message);
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
}

export const useSubmitMutation = () => { 
    return useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast.success("Code executed successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
}