import Editor from "@monaco-editor/react";

import styles from "./CodeEditor.module.css";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  theme?: "vs-dark" | "light";
};

export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "400px",
  readOnly = false,
  theme = "vs-dark",
}: CodeEditorProps) {
  return (
    <div className={styles.container} style={{ height }}>
      <Editor
        height="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
      />
    </div>
  );
}
