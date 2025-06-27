// mutations/problemQuery.ts
import { useQuery } from "@tanstack/react-query"
import api from "./api"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setProblem } from "@/store/problem"
import { links } from "@/lib/links"
import type { Problem } from "@/types/problem"
import { useEffect } from "react"

const fetchProblem = async (id: string): Promise<Problem> => {
  const res = await api.get(links.problem.getSingleProblem(id))
  return res.data.data
}

export const useFetchProblem = (id?: string) => {
  const query = useQuery({
    queryKey: ["problem", id],
    queryFn: () => fetchProblem(id!),
    enabled: !!id, // Only run the query if id is defined
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });

  const dispatch = useDispatch();

  const { data: problem, error } = query;

  useEffect(() => {
    if (problem) {
      dispatch(setProblem(problem));
      toast.success("Problem loaded");
    }
  }, [problem, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);
  return query;
}
