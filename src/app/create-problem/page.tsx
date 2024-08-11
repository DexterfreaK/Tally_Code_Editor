"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import api from "@/axios";
function AddTescases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Add Testcases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="expected-output">Input</Label>
          <Textarea
            id="expected-output"
            placeholder="Enter expected output"
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="expected-output">Expected Output</Label>
          <Textarea
            id="expected-output"
            placeholder="Enter expected output"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface TestCase {
  input: string;
  output: string;
}

export default function SubmitInitProblem() {
  const [problemName, setProblemName] = useState("");
  const [problemType, setProblemType] = useState("0");
  const [description, setDescription] = useState("");
  const [cons, setCons] = useState("");
  const [ex, setEx] = useState("");
  const [examples, setExamples] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const { toast } = useToast();

  const handleAddExample = () => {
    if (ex.trim()) {
      setExamples([...examples, ex]);
      setEx("");
    }
    console.log(examples);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOutput(e.target.value);
  };

  const handleAddTestCase = () => {
    if (input.trim() && output.trim()) {
      setTestCases([...testCases, { input, output }]);
      setInput("");
      setOutput("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const problemData = {
        problemName,
        description,
        constraints: cons,
        examples,
        testCases,
      };

      try {
        const response = await api.post(
          "/problem/create-problem",
          problemData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
         toast({
           title: "Success",
           description: "Problem added!!",
         });
        console.log("Success:", response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };
  const [errors, setErrors] = useState({
    problemName: "",
    description: "",
    constraints: "",
    examples: "",
    input: "",
    output: "",
  });

  const validate = () => {
    let valid = true;
    let errors = {
      problemName: "",
      description: "",
      constraints: "",
      examples: "",
      input: "",
      output: "",
    };

    if (!problemName) {
      errors.problemName = "Problem Name is required";
      valid = false;
    }
    if (!description) {
      errors.description = "Description is required";
      valid = false;
    }
    if (!cons) {
      errors.constraints = "Constraints are required";
      valid = false;
    }
    if (!ex) {
      errors.examples = "Examples are required";
      valid = false;
    }
    if (!input || !output) {
      errors.input = "TestCase input and output are required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="m-10">
        <CardHeader>
          <CardTitle>Submit a new Problem!</CardTitle>
          <CardDescription>
            Submit a problem to an evergrowing enthusiastic coding community!!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="problemName">Problem Name</Label>
            <Input
              id="problemName"
              placeholder="Give a name to your problem"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
            {errors.problemName && (
              <p className="text-red-600">{errors.problemName}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the Problem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-600">{errors.description}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="constraints">Constraints</Label>
            <Textarea
              id="constraints"
              placeholder="Describe the constraints"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
            />
            {errors.constraints && (
              <p className="text-red-600">{errors.constraints}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="examples">Add some Examples</Label>
            <Textarea
              id="examples"
              placeholder="Write your Example here include input,output and explanation"
              value={ex}
              onChange={(e) => setEx(e.target.value)}
            />
            {errors.examples && (
              <p className="text-red-600">{errors.examples}</p>
            )}
            <Button type="button" onClick={handleAddExample}>
              Add Example
            </Button>
          </div>

          <Card className="p-4">
            <div className="grid gap-2">
              <Label htmlFor="Input">Add some Testcases</Label>
              <Textarea
                id="Input"
                placeholder="Write your TestCase's Input"
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                id="Output"
                placeholder="Write your TestCase's Output"
                value={output}
                onChange={handleOutputChange}
              />
              {errors.input && <p className="text-red-600">{errors.input}</p>}
              <Button type="button" onClick={handleAddTestCase}>
                Add Testcase
              </Button>
              <div className="mt-4">
                <Label>TestCase List</Label>
                <ul>
                  {testCases.map((testCase, index) => (
                    <li key={index}>
                      <div>
                        <strong>Input:</strong>
                        <pre>{testCase.input}</pre>
                      </div>
                      <div>
                        <strong>Output:</strong>
                        <pre>{testCase.output}</pre>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <CardFooter className="justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                toast({
                  title: "Cancelled",
                  description: "Problem Not Added",
                });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  );
}
