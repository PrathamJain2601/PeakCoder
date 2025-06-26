import { useRunMutation } from "@/mutations/runMutation"; // wherever your mutation file is
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Languages } from "@/lib/languages";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

type runButtonProps = {
  runPending: boolean;
  setRunPending: (pending: boolean) => void;
}

export default function RunButton({runPending, setRunPending} : runButtonProps) {
  const {
    mutateAsync: runCode, 
  } = useRunMutation();
  const code = useSelector((state: RootState) => state.code.code);
  const language = useSelector((state: RootState) => state.code.Language);
  const problemId = useSelector((state: RootState) => state.problem.selectedProblem?.id); 

  function getLanguageId(languageName: string): number {
    const lang = Languages.find((lang) => lang.name === languageName);
    return lang ? lang.languageId : 1; 
  }

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const handleRun = async () => {
    if(user?.id == undefined || user?.isVerified == false || user?.id == null || user?.isVerified == null){
      router.push("/auth");
      return;
    }
    if (!problemId) return;
    try{
        setRunPending(true);
        await runCode({
          problemId,
          code: code.toString(), 
          languageId: getLanguageId(language), 
        });
    } catch (err) {
        setRunPending(false);
        console.error("Run failed:", err);
    }
  };

  return (
    <button
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          onClick={handleRun}
          disabled={runPending}
        >
          <Play size={16} className="mr-2" />
          {runPending ? "Running..." : "Run"}
        </button>
  );
}
