"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";


import { useEffect, useState } from "react";
import api from "@/axios";

import Graph from "@/components/ui/graph";
import DarkModeButton from "@/components/ui/dark-mode-button";

export default function Test() {
  const router = useRouter();
  const [prob, setProb] = useState();

  useEffect(() => {
    const fetchProb = async () => {
      try {
        const response = await api.get("/problem/all-problems"); // or use axiosInstance.get('/contests')
        setProb(response.data);
        console.log(response.data);
      } catch (err: any) {}
    };

    fetchProb();
  }, []);
  return (
    <main className="p-10">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to CodePinnacle!!
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Solve Daily Problem</CardDescription>
              <CardTitle className="text-4xl">Sum of Two Numbers</CardTitle>
            </CardHeader>
            <CardContent>Given two integers, return their sum</CardContent>
            <CardFooter>
              <Button onClick={()=>router.push(`/problem/2`)}>Solve program!</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Enter Playground</CardDescription>
              <CardTitle className="text-4xl">Playground</CardTitle>
            </CardHeader>
            <CardContent>
              Test your ideas with custom input and see the results!
            </CardContent>
            <CardFooter>
              <Link href={"/playground"}>
                <Button>Enter Playground!</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Contribute to the community!</CardDescription>
              <CardTitle className="text-4xl">Create a New Problem!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Contribute to the community
              </div>
            </CardContent>
            <CardFooter>
              <Link href={"/create-problem"}>
                <Button>Create!</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Enter Contests Battlegrounds</CardDescription>
              <CardTitle className="text-4xl">Contests Battlegrounds</CardTitle>
            </CardHeader>
            <CardContent>
              Compete with friends and foes alike on speed and program execution
            </CardContent>
            <CardFooter>
              <Link href={"/contest"}>
                <Button>Enter Playground!</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-col-4">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>All Problems</CardTitle>
              <CardDescription>All problems available</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prob?.map((p) => (
                    <TableRow className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{p.id}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline"></div>
                      </TableCell>
                      <TableCell className=""> {p.problem_name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button
                          onClick={() => {
                            router.push(`/problem/${p.id}`);
                          }}
                        >
                          Link
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* <CalendarDemo /> */}
        </div>
      </div>
    </main>
  );
}
