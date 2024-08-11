"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import api from "@/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const user_id = 1;
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await api.get("/contest/all-contests"); // or use axiosInstance.get('/contests')
        setContests(response.data);
        console.log(response.data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchContests();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!contests.length) return <div>Loading...</div>;

  const router = useRouter();
  // const { toast } = useToast();

  const handleReg = async (contest_id: number) => {
    try {
      const response = await api
        .post(
          "/contest/reg-user",
          { contest_id, user_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Success:", response.data);
          router.push(`/contest/${contest_id}`);
        });
    } catch (error) {}
  };

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Contests Battlegrounds!
        </h1>

        <div className="">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>All Contests</CardTitle>
                <CardDescription>All Contests Happening Now!!</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {contests.map((contest: any) => (
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">
                          {contest?.contest_name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          <div>{contest?.contest_name}</div>

                          <Button
                            className="mt-2"
                            onClick={() => handleReg(contest?.contest_id)}
                          >
                            Register & Start Contest
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          {contest?.description}
                        </Badge>
                      </TableCell>
                      <TableCell className=" md:table-cell lg:hidden xl:table-column">
                        {contest.contest_name}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(contest.end_date)
                          .toISOString()
                          .substring(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
