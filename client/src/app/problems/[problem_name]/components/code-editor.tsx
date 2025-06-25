import { setCode, setLanguage } from "@/store/code";
import { RootState } from "@/store/store";
import { Editor } from "@monaco-editor/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Languages } from "@/lib/languages";
import { Language } from "@/types/problem";


export default function CodeEditor() {
  const dispatch = useDispatch();
  const code = useSelector((state: RootState) => state.code.code?.toString() || "");
  const language = useSelector((state: RootState) => state.code.Language);

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Languages.find(l => l.value === language) || Languages[0]);
  const [tempCode, setTempCode] = useState<string>(selectedLanguage.boilerplate || "");
  
  useEffect(() => {
    setTempCode(code);
  }, [code]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setCode(tempCode));
    }, 500);

    return () => clearTimeout(timeout);
  }, [tempCode]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(Languages.find(l => l.name === lang) || Languages[0]);
    setTempCode(Languages.find(l => l.name === lang)?.boilerplate || "");
    dispatch(setLanguage(lang));
  };

  return (
    <div className="h-full min-h-96 flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="bg-gray-700 text-white p-1 rounded"
        >
          {/* <option value="javascript">JavaScript</option> */}
          {Languages.map((lang: {name: string, value: string}) => (
            <option key={lang.name} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <Editor
        height="100%"
        language={language}
        value={tempCode}
        onChange={(value) => setTempCode(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

