// components/CodeEditor.js

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleCodeChange = (value:any) => {
    setCode(value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log("Submitted code:", code);   
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            {/* Add more languages as needed */}
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Submit Code</Button>
      </div>
      <MonacoEditor
        height="60vh"
        language={language}
        theme={theme}
        value={code}
        onChange={handleCodeChange}
        options={{
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
