"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import api from "@/axios";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  setOutput: React.Dispatch<React.SetStateAction<any | null>>;
  inputs: string | null;
  pb_id: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  setOutput,
  inputs,
  pb_id,
}) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const [theme, setTheme] = useState("vs-dark");
  const [status, setStatus] = useState(null);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleCodeChange = (value: any) => {
    setCode(value);
  };

  const { toast } = useToast();

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
          compare_tc: true,
          pb_id: pb_id,
          user_id: 1,
          language: "python",
        })
        .then((response) => {
          console.log("Response:", response.data);
          setOutput(response.data);
          toast({
            title: "Compiled Successfully",
            description: "Check Your Results!!",
          });
        });
    } catch (error) {
      toast({
        variant:"destructive",
        title: "Compilation Unsucessful",
      });
      
      console.error("Error during the compilation process:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select defaultValue="python" onValueChange={handleLanguageChange}>
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
      <MonacoEditor
        height="55vh"
        language="python"
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

export default function Dashboard({ params }: { params: { id: string } }) {
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [outputData, setOutputData] = useState<any | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problem/get-problem/${params.id}`);
        setProblem(response.data);
      } catch (err) {
        setError("Error fetching problem data");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [params.id]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="p-4 w-full h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={100}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel
              defaultSize={100}
              className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2"
            >
              <CodeEditor
                setOutput={setOutputData}
                inputs={""}
                pb_id={params.id}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={200}>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Test Cases
                </legend>
                <Tabs defaultValue="1" className="">
                  <TabsList>
                    {problem?.testCases.map((_: any, index: number) => (
                      <TabsTrigger key={index} value={`${index + 1}`}>
                        {`Testcase ${index + 1}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {problem?.testCases.map((example: any, index: number) => (
                    <TabsContent key={index} value={`${index + 1}`}>
                      <div className="grid gap-6 grid-cols-2">
                        <div>
                          <div className="grid gap-6 rounded-lg border">
                            <code className="relative rounded bg-muted px-[0.1rem] py-[0.2rem] font-mono text-sm font-semibold">
                              <ul className="my-1 ml-6 list-disc [&>li]:mt-2">
                                Input: {example?.input}
                              </ul>
                            </code>
                          </div>
                          <div className="grid gap-6 rounded-lg border mt-1">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                              <ul className="my-1 ml-6 list-disc [&>li]:mt-2">
                                Output: {example?.output}
                              </ul>
                            </code>
                          </div>
                        </div>
                        <div>
                          {outputData?.results ? (
                            <Alert
                              variant={
                                outputData.results[index].passed
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              <Terminal className="h-4 w-4" />
                              <AlertTitle>
                                Test Case{" "}
                                {outputData.results[index].passed
                                  ? "Passed"
                                  : "Failed"}
                              </AlertTitle>
                              <AlertDescription>
                                <div className="grid gap-6 rounded-lg border mt-1">
                                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    <ul className="my-1 ml-6 list-disc [&>li]:mt-2">
                                      actualOutput :{" "}
                                      {outputData.results[index].actualOutput}
                                      <br />
                                      expectedOutput :{" "}
                                      {outputData.results[index].expectedOutput}
                                    </ul>
                                  </code>
                                </div>
                                <div className="grid gap-6 rounded-lg border mt-1">
                                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    <ul className="my-1 ml-6 list-disc [&>li]:mt-2">
                                      executionTime :{" "}
                                      {outputData.results[index].executionTime}
                                      ms
                                    </ul>
                                  </code>
                                </div>
                                <div className="grid gap-6 rounded-lg border mt-1">
                                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    <ul className="my-1 ml-6 list-disc [&>li]:mt-2">
                                      memoryUsage :
                                      {outputData.results[index].memoryUsage}
                                    </ul>
                                  </code>
                                </div>
                              </AlertDescription>
                            </Alert>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </fieldset>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="m-5">
            <form className="grid items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  <p>Problem No: {params.id}</p>
                </legend>
                <div className="text-4xl tabular-nums font-extrabold">
                  {problem?.problem_name}
                </div>
                <div>{problem?.description}</div>
              </fieldset>

              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Examples
                </legend>
                <Tabs defaultValue="1" className="w-[400px]">
                  <TabsList>
                    {problem?.examples.map((_: any, index: number) => (
                      <TabsTrigger key={index} value={`${index + 1}`}>
                        {`Example ${index + 1}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {problem?.examples.map((example: string, index: number) => (
                    <TabsContent key={index} value={`${index + 1}`}>
                      <blockquote className="mt-6 border-l-2 pl-6 italic">
                        {example}
                      </blockquote>
                    </TabsContent>
                  ))}
                </Tabs>
              </fieldset>

              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Constraints
                </legend>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    {problem?.constraints}
                  </ul>
                </code>
              </fieldset>
            </form>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
