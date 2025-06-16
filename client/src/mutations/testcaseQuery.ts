import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { setTestcase } from "@/store/problem"; 
import { links } from "@/lib/links";
import { TestCase } from "@/types/problem";
import api from "./api";
import axios from "axios";

const fetchTestcases = async (id: string): Promise<TestCase[]> => {
  try {
    const response = await api.get(links.problem.getSampleTestcases(id));
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to fetch problem");
    }
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error occurred");
  }
};

export const useFetchTestcase = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: fetchTestcases,
    onSuccess: (data) => {
      dispatch(setTestcase(data));
      toast.success("Test cases loaded");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
