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

  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:3001");


    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLeaderboardData(data);
      console.log(data);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await api
          .get(`/contest/spec-contests/${params.id}`)
          .then((response) => {
            setContestData(response.data);
            setProblems(response.data.problems);
            console.log(response.data.problems);
          }); // or use axiosInstance.get('/contests')
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
              <Tabs defaultValue="problems" className="">
                <TabsList className="">
                  <TabsTrigger value="problems">Problems</TabsTrigger>
                  <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                  <TabsTrigger value="standings">Standings</TabsTrigger>
                </TabsList>
                <TabsContent value="problems">
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
                                <div className="font-medium">
                                  {problem.problem_name}
                                </div>
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
                <TabsContent value="standings">
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaderboardData.map((entry) => (
                            <TableRow className="bg-accent">
                              <TableCell>
                                <div className="font-medium">{entry.name}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{entry.email}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {entry.score}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
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
