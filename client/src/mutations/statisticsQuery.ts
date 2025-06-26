import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { links } from "@/lib/links";
import { useEffect } from "react";
import api from "./api";
import { setStatistics } from "@/store/user";
import { Statistics } from "@/types/user";

const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const response = await api.get(links.user.getStatistics); 
    console.log("Statistics fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch statistics");
    }
    throw new Error("Unexpected error occurred");
  }
};

export const useFetchStatistics = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ["statistics"],
        queryFn: fetchStatistics,
        staleTime: 1000 * 60 * 5, 
    });

    const { data, isLoading, error } = query;
    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setStatistics(data));
            toast.success("statistics loaded");
        }
    }, [data, isLoading]);

    useEffect(() => {
    if (error) {
        toast.error(error.message);
    }
    }, [error]);

    return query;
};