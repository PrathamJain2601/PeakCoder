import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setProblems } from "@/store/problem"; 
import { links } from "@/lib/links";
import { Problem } from "@/types/problem";
import { useEffect } from "react";
import api from "./api";

const fetchProblems = async (): Promise<Problem[]> => {
  try {
    const response = await api.get(links.problem.getProblems); 
    // console.log("Problems fetched successfully:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch problems");
    }
    throw new Error("Unexpected error occurred");
  }
};

export const useFetchProblems = () => {
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: ["problems"],
        queryFn: fetchProblems,
        staleTime: 1000 * 60 * 5, 
    });

    const { data, isLoading, error } = query;
    useEffect(() => {
  if (!isLoading && data) {
    if (data.length > 0) {
      dispatch(setProblems(data));
      toast.success("Problems loaded");
    } else {
      toast.error("0 problems found");
    }
  }
}, [data, isLoading]);

    useEffect(() => {
    if (error) {
        toast.error(error.message);
    }
    }, [error]);
    return query;
};