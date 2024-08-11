"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import api from "@/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Dashboard({ params }: { params: { id: string } }) {
  const [contestData, setContestData] = useState();
  const [problemsData, setProblems] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await api.get(`/contest/spec-contests/${params.id}`); // or use axiosInstance.get('/contests')
        setContestData(response.data);
        setProblems(response.data.problems);
        console.log(response.data.problems);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchContests();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!contestData) return <div>Loading</div>;

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>{contestData?.contest.contest_name}</CardTitle>
                <CardDescription>
                  {contestData?.contest.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="">
                <TabsList className="">
                  <TabsTrigger value="account">Problems</TabsTrigger>
                  <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                  <TabsTrigger value="password">Standings</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>Problems List</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Problems</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Link
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {problemsData.map((problem) => (
                            <TableRow className="bg-accent">
                              <TableCell>
                                <div className="font-medium">{problem.problem_name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  Not Attempted
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                               <Button>Go to the problem</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
