import { useSubmitMutation } from "@/mutations/submitMutation"; // wherever your mutation file is
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Languages } from "@/lib/languages";
import { Send } from "lucide-react";
import { setSubmitPending } from "@/store/problem";


export default function SubmitButton() {
  const {
    mutateAsync: runCode, 
  } = useSubmitMutation();
  const code = useSelector((state: RootState) => state.code.code);
  const language = useSelector((state: RootState) => state.code.Language);
  const problemId = useSelector((state: RootState) => state.problem.selectedProblem?.id); 
  const submitPending = useSelector((state: RootState) => state.problem.submitPending);
  
  const dispatch = useDispatch();

  function getLanguageId(languageName: string): number {
    const lang = Languages.find((lang) => lang.name === languageName);
    return lang ? lang.languageId : 1; 
  }

  const handleSubmit = async () => {
    if (!problemId) return;
    try{
        dispatch(setSubmitPending(true))
        await runCode({
          problemId,
          code: code.toString(), 
          languageId: getLanguageId(language), 
        });
    } catch (err) {
        dispatch(setSubmitPending(false))
        console.error("Run failed:", err);
    }
  };

  return (
    <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={submitPending}
        >
          <Send size={16} className="mr-2" />
          {submitPending ? "Submitting..." : "Submit"}
        </button>
  );
}
