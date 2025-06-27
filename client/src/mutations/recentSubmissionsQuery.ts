import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { links } from "@/lib/links";
import { useEffect } from "react";
import api from "./api";
import { setRecentSubmission } from "@/store/user";
import { RecentSubmissions } from "@/types/user";

const fetchRecentSubmissions = async (): Promise<RecentSubmissions[]> => {
  try {
    const response = await api.get(links.user.getRecentSubmissions); 
    console.log("Submissions fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch Submissions");
    }
    throw new Error("Unexpected error occurred");
  }
};

export const useFetchRecentSubmissions = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ["recent-submissions"],
        queryFn: fetchRecentSubmissions,
        staleTime: 1000 * 60 * 5, 
    });

    const { data, isLoading, error } = query;
    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setRecentSubmission(data));
            toast.success("recent submissions loaded");
        }
    }, [data, isLoading, dispatch]);

    useEffect(() => {
    if (error) {
        toast.error(error.message);
    }
    }, [error]);

    return query;
};