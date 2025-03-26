import { Editor } from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  language: string
  onChange: (value: string) => void
  onLanguageChange: (language: string) => void
}

export default function CodeEditor({ code, language, onChange, onLanguageChange }: CodeEditorProps) {
  return (
    <div className="h-full min-h-96 flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-700 text-white p-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
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

