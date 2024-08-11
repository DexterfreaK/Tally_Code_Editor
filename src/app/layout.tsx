"use client";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  AlarmClockCheck,
  Braces,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DarkModeButton from "@/components/ui/dark-mode-button";

const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/playground");
  };
  const handleClick2 = () => {
    router.push("/problem/3");
  };
  const handleClick3 = () => {
    router.push("/create-problem");
  };

  return (
    <html lang="en">
      <TooltipProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid h-screen w-full pl-[56px]">
              <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                  <Button variant="outline" size="icon" aria-label="Home">
                    <Link href="/">
                      <Braces className="size-5 fill-foreground" />
                    </Link>
                  </Button>
                </div>
                <nav className="grid gap-1 p-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        aria-label="Playground"
                        onClick={handleClick}
                      >
                        <SquareTerminal className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Playground
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Code Problems"
                        onClick={handleClick2}
                      >
                        <Code2 className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Code Problems
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Documentation"
                        onClick={handleClick3}
                      >
                        <Book className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Create New Problem
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/contest">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          aria-label="Settings"
                        >
                          <AlarmClockCheck className="size-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Contests battlground
                    </TooltipContent>
                  </Tooltip>
                </nav>
                <nav className="mt-auto grid gap-1 p-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-auto rounded-lg"
                        aria-label="Help"
                      >
                        <LifeBuoy className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Help
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-auto rounded-lg"
                        aria-label="Account"
                      >
                        <SquareUser className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      Account
                    </TooltipContent>
                  </Tooltip>
                </nav>
              </aside>
              <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 justify-between">
                  <Link href="/">
                    <h1 className="text-xl font-semibold">CodePinnacle</h1>
                  </Link>
                  <DarkModeButton />
                </header>
                {children}
                <Toaster />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </TooltipProvider>
    </html>
  );
}
