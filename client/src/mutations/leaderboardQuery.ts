import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { links } from "@/lib/links";
import { useEffect } from "react";
import api from "./api";
import { setLeaderboard } from "@/store/user";
import { Leaderboard } from "@/types/user";

const fetchLeaderboard = async (): Promise<Leaderboard[]> => {
  try {
    const response = await api.get(links.user.getLeaderboard); 
    console.log("Leaderboard fetched successfully:", response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch leaderboard");
    }
    throw new Error("Unexpected error occurred");
  }
};

export const useFetchLeaderboard = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ["leaderboard"],
        queryFn: fetchLeaderboard,
        staleTime: 1000 * 60 * 5, 
    });

    const { data, isLoading, error } = query;
    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setLeaderboard(data));
            toast.success("leaderboard loaded");
        }
    }, [data, isLoading]);

    useEffect(() => {
    if (error) {
        toast.error(error.message);
    }
    }, [error]);

    return query;
};