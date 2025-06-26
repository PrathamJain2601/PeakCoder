import { Languages } from "@/lib/languages"
import { Submission } from "@/types/problem"
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "text-green-400"
      case "MEDIUM":
        return "text-yellow-400"
      case "HARD":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
}

export function formatDateReadable(dateStr: string): string {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // "June"
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
}

export function verdictToText(verdict: string): string{
  if(verdict ==  `ACCEPTED`){
    return "Accepted";
  }
  else if(verdict == 'WRONG_ANSWER'){
    return "Wrong Answer";
  }
  else if(verdict == 'TIME_LIMIT_EXCEEDED'){
    return "Time Limit Exceeded";
  }
  else if(verdict == "MEMORY_LIMIT_EXCEEDED"){
    return "Memory Limit Exceeded";
  }
  else if(verdict == "RUNTIME_ERROR"){
      return "Runtime Error";
  }
  else{
    return "Compilation Error";
  }
}

export const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "ACCEPTED":
        return <CheckCircle className="text-green-400" size={24} />
      case "WRONG_ANSWER":
        return <XCircle className="text-red-400" size={24} />
      case "TIME_LIMIT_EXCEEDED":
        return <AlertTriangle className="text-yellow-400" size={24} />
      case "RUNTIME_ERROR":
        return <AlertCircle className="text-orange-400" size={24} />
      case "COMPILATION_ERROR":
        return <AlertCircle className="text-purple-400" size={24} />
      default:
        return <AlertCircle className="text-gray-400" size={24} />
    }
  }

export const getVerdictColorProfile = (verdict: string) => {
    switch (verdict) {
      case "ACCEPTED":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "WRONG_ANSWER":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      case "TIME_LIMIT_EXCEEDED":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "RUNTIME_ERROR":
        return "text-orange-400 bg-orange-500/10 border-orange-500/30"
      case "COMPILATION_ERROR":
        return "text-purple-400 bg-purple-500/10 border-purple-500/30"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30"
    }
  }

export const languageIdToName = (id: number)=> {
    const obj = Languages.find((language)=> {
        return language.languageId == id;
    });
    if(obj) return obj.name;
    return "Java";
  }

export const getVerdictColor = (verdict: Submission["status"]) => {
    switch (verdict) {
      case "ACCEPTED":
        return "text-green-400"
      case "WRONG_ANSWER":
        return "text-red-400"
      case "TIME_LIMIT_EXCEEDED":
        return "text-yellow-400"
      case "RUNTIME_ERROR":
        return "text-orange-400"
      case "COMPILATION_ERROR":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }
  export const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-400";
      case "Attempted":
        return "text-yellow-400";
      default:
        return "text-gray-400"; // Not Attempted
    }
  };
  export const getVerdictBg = (verdict: Submission["status"]) => {
    switch (verdict) {
      case "ACCEPTED":
        return "bg-green-900/20 border-green-700/30"
      case "WRONG_ANSWER":
        return "bg-red-900/20 border-red-700/30"
      case "TIME_LIMIT_EXCEEDED":
        return "bg-yellow-900/20 border-yellow-700/30"
      case "RUNTIME_ERROR":
        return "bg-orange-900/20 border-orange-700/30"
      case "COMPILATION_ERROR":
        return "bg-purple-900/20 border-purple-700/30"
      default:
        return "bg-gray-900/20 border-gray-700/30"
    }
  }

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (sec < 60) return "just now";
  if (min < 60) return `${min} min${min > 1 ? "s" : ""} ago`;
  if (hr < 24) return `${hr} hr${hr > 1 ? "s" : ""} ago`;
  if (day < 30) return `${day} day${day > 1 ? "s" : ""} ago`;
  if (year < 1) return `${month} month${month > 1 ? "s" : ""} ago`;
  if (year < 10) return `${year} year${year > 1 ? "s" : ""} ago`;
  return "10+ years ago";
}
