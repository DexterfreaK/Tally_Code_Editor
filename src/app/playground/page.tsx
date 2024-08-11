"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import api from "@/axios";
import { useEffect } from "react";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dynamically import MonacoEditor to prevent issues with SSR
import MonacoEditor from "@monaco-editor/react";
import { useToast } from "@/components/ui/use-toast";

interface OutputData {
  executionTime: number;
  memoryUsage: string;
  output: string;
}
interface CodeEditorProps {
  output: OutputData | null;
  setOutput: React.Dispatch<React.SetStateAction<OutputData | null>>;
  inputs: string | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  output,
  setOutput,
  inputs,
}) => {
  const [code, setCode] = useState("");

  const [theme, setTheme] = useState("vs-dark");
  const [status, setStatus] = useState(null);

  const { toast } = useToast();

  const handleCodeChange = (value: any) => {
    setCode(value);
  };

  const handleSubmit = async () => {
    try {
      toast({
        title: "Submitted",
        description: "Solution Submitted for eval",
      });
      const response = await api
        .post("/compile/create-sub", {
          compilerId: 116,
          source: code,
          inputs: inputs,
          compare_tc: false,
          pb_id: -1,
          user_id: 1,
          language: "python",
        })
        .then((response) => {
          console.log("Response:", response.data);
          setOutput(response.data.output);
          toast({
            title: "Compiled Successfully",
            description: "Check Your Results!!",
          });
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Compilation Unsucessful",
      });
      console.error("Error during the compilation process:", error);
    }
  };

  return (
    <div className="space-y-4">
      <MonacoEditor
        height="77vh"
        language="python"
        theme={theme}
        value={code}
        onChange={handleCodeChange}
        options={{
          automaticLayout: true,
        }}
      />
      <div className="flex items-center justify-between">
        <Select defaultValue="python">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>

            {/* Add more languages as needed */}
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Submit Code</Button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const [inputs, setInputs] = useState("");
  return (
    <main className="p-4 w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={300}>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <CodeEditor
              setOutput={setOutputData}
              output={outputData}
              inputs={inputs}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={200}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={200}>
              <CardHeader className="pb-3">
                <CardTitle>Input</CardTitle>
                <CardDescription className="max-w-full text-balance leading-relaxed">
                  <Textarea
                    placeholder="Enter your Inputs here"
                    onChange={(e) => setInputs(e.target.value)}
                  />
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="my-6 w-full overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                          Execution Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Time
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          {outputData?.executionTime}ms
                        </td>
                      </tr>
                      <tr className="m-0 border-t p-0 even:bg-muted">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          Memory
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                          {outputData?.memoryUsage}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardFooter>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={150}>
              <CardHeader className="pb-3">
                <CardTitle>Output</CardTitle>
                <CardDescription className="max-w-full text-balance leading-relaxed">
                  <Textarea
                    placeholder={outputData?.output}
                    rows={10}
                    disabled
                  />
                </CardDescription>
              </CardHeader>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
