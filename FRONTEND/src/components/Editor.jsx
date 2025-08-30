import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, onChange }) {
  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      value={code}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
}
