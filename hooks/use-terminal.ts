"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { site, about, stack, caseStudies } from "@/lib/site-content";

interface UseTerminalProps {
  initialOutput?: string[];
  onClose?: () => void;
}

export function useTerminal({ initialOutput, onClose }: UseTerminalProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(
    initialOutput || [
      "Welcome to MJ Terminal v1.0.0",
      "Type 'help' to see available commands.",
      "$"
    ]
  );
  
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);

  const availableCommands = site.terminal.availableCommands || [
    "help", "whoami", "ls", "pwd", "cd", "cat", "echo", "date", "uptime", "clear", "history", "neofetch",
    "projects", "skills", "stack", "contact", "experience", "goto", "open", "socials", "exit"
  ];

  const scrollToBottom = () => {
    if (bottomRef.current) {
      const parent = bottomRef.current.parentElement;
      if (parent) {
        parent.scrollTo({ top: parent.scrollHeight, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  const handleCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim();
    if (!trimmedCmd) return;

    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const args = trimmedCmd.split(" ").filter(Boolean);
    const command = args[0].toLowerCase();
    
    let newOutput: string[] = [];

    switch (command) {
      case "help":
        newOutput = site.terminal.helpText || [
          "Available commands:"
        ];
        break;
      
      case "whoami":
        newOutput = [site.terminal.whoami];
        break;
        
      case "pwd":
        newOutput = [pathname];
        break;

      case "date":
        newOutput = [new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }) + " (PKT)"];
        break;

      case "uptime":
        // Pseudo uptime for fun
        const uptimeSeconds = Math.floor(performance.now() / 1000);
        newOutput = [`up ${Math.floor(uptimeSeconds / 60)} minutes, ${uptimeSeconds % 60} seconds`];
        break;

      case "echo":
        newOutput = [args.slice(1).join(" ")];
        break;

      case "clear":
        setOutput(["$"]);
        return; // Early return to avoid appending command

      case "history":
        newOutput = history.map((h, i) => `  ${i + 1}  ${h}`);
        // Add current command to history output
        newOutput.push(`  ${history.length + 1}  history`);
        break;

      case "exit":
        if (onClose) {
          onClose();
          newOutput = ["Closing terminal..."];
        } else {
          newOutput = ["Cannot exit from this terminal."];
        }
        break;

      case "ls":
        if (args.length === 1) {
          newOutput = ["projects/", "skills/", "experience/", "about.txt", "contact.txt"];
        } else if (args[1] === "projects") {
          newOutput = caseStudies.projects.map(p => p.slug);
        } else if (args[1] === "skills") {
          // skills is an array of { name, level }
          newOutput = about.skills.map(s => s.name?.toLowerCase()?.replace(/ /g, "_") || "");
        } else if (args[1] === "experience") {
          // eras has role and company
          newOutput = about.eras.map(e => e.company?.replace(/ /g, "_")?.toLowerCase() || "");
        } else {
          newOutput = [`ls: cannot access '${args[1]}': No such file or directory`];
        }
        break;

      case "cat":
        if (args.length === 1) {
          newOutput = ["cat: missing file operand"];
        } else if (args[1] === "about.txt") {
          newOutput = [site.description];
        } else if (args[1] === "contact.txt") {
          newOutput = [`Email: ${site.contact.email}`, `Phone: ${site.contact.phone}`];
        } else {
          // Check if it's a project
          const project = caseStudies.projects.find(p => p.slug === args[1]);
          if (project) {
            newOutput = [
              `Title: ${project.title}`,
              `Category: ${project.category}`,
              `Year: ${project.year}`,
              `Stack: ${project.stack.join(", ")}`,
              `Description: ${project.description}`
            ];
          } else {
            newOutput = [`cat: ${args[1]}: No such file or directory`];
          }
        }
        break;

      case "cd":
      case "goto":
        if (args.length === 1 || args[1] === "~" || args[1] === "/") {
          router.push("/");
          newOutput = ["Navigating to /..."];
          if (onClose) setTimeout(onClose, 500);
        } else {
          let target = args[1];
          if (!target.startsWith("/")) target = `/${target}`;
          
          const validRoutes = ["/", "/about", "/contact", "/projects", "/metrics"];
          const validProjectRoutes = caseStudies.projects.map(p => `/work/${p.slug}`);
          
          if (validRoutes.includes(target) || validProjectRoutes.includes(target)) {
            router.push(target);
            newOutput = [`Navigating to ${target}...`];
            if (onClose) setTimeout(onClose, 500);
          } else if (caseStudies.projects.some(p => p.slug === args[1])) {
             // Handle case where they type "cd attendx-system" without /work
             router.push(`/work/${args[1]}`);
             newOutput = [`Navigating to /work/${args[1]}...`];
             if (onClose) setTimeout(onClose, 500);
          } else {
            newOutput = [`${command}: ${args[1]}: No such file or directory`];
          }
        }
        break;

      case "projects":
        newOutput = caseStudies.projects.map(p => `[${p.id}] ${p.title} - ${p.category}`);
        break;

      case "skills":
        // skills is flat array of {name, level}
        newOutput = ["-- Skills --", ...about.skills.map(s => `  ${s.name} (${s.level})`), ""];
        break;

      case "stack":
        newOutput = Object.entries(stack).flatMap(([category, items]) => [`-- ${category} --`, items.join(", "), ""]);
        break;

      case "contact":
        newOutput = [
          `Email: ${site.contact.email}`,
          `Phone: ${site.contact.phone}`,
          `Location: ${site.location}`
        ];
        break;

      case "experience":
        // eras has year, role, company, description
        newOutput = about.eras.flatMap(era => [`[${era.year}] ${era.role} at ${era.company}`, era.description, ""]);
        break;
      
      case "socials":
        newOutput = site.contact.socials.map(s => `${s.label}: ${s.href}`);
        break;

      case "open":
        if (args.length === 1) {
          newOutput = ["open: missing project slug operand"];
        } else {
          const project = caseStudies.projects.find(p => p.slug === args[1]);
          if (project) {
            router.push(`/work/${project.slug}`);
            newOutput = [`Opening ${project.title}...`];
            if (onClose) setTimeout(onClose, 500);
          } else {
            newOutput = [`open: ${args[1]}: Project not found`];
          }
        }
        break;

      case "neofetch":
        const osArt = [
          "       .---.",
          "      /     \\",
          "     \\.@-@./",
          "     /`\\_/`\\",
          "    //  _  \\\\",
          "   | \\     / |",
          "  /`\\_`>  <_/`\\",
          "  \\__/'---'\\__/"
        ];
        
        const sysInfo = [
          `OS: Portfolio v4`,
          `Host: Muhammad Jalal`,
          `Shell: mj-terminal`,
          `Role: Full-Stack Developer`,
          `Location: ${site.location}`,
          `Uptime: ${Math.floor(performance.now() / 60000)} mins`,
          `Theme: Cinematic Dark`
        ];

        // Pad arrays to be same length
        const maxLen = Math.max(osArt.length, sysInfo.length);
        newOutput = Array.from({ length: maxLen }).map((_, i) => {
          const artLine = (osArt[i] || "").padEnd(20, " ");
          const infoLine = sysInfo[i] || "";
          return `${artLine} ${infoLine}`;
        });
        break;

      default:
        newOutput = [`Command not found: ${command}. Type 'help' for available commands.`];
    }

    setOutput((prev) => {
      // Find the last index of "$" and replace it with the command, then append output and new prompt
      const newOutputArr = [...prev];
      if (newOutputArr[newOutputArr.length - 1] === "$") {
        newOutputArr[newOutputArr.length - 1] = `$ ${trimmedCmd}`;
      } else {
         newOutputArr.push(`$ ${trimmedCmd}`);
      }
      return [...newOutputArr, ...newOutput, "$"];
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Autocomplete logic
      const args = input.trim().split(" ");
      if (args.length === 1) {
        // Autocomplete command
        const partialCmd = args[0].toLowerCase();
        const matches = availableCommands.filter(c => c.startsWith(partialCmd));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        }
      } else if (args.length === 2 && ["cat", "open", "cd"].includes(args[0].toLowerCase())) {
        // Autocomplete project slugs for cat/open/cd
        const partialArg = args[1].toLowerCase();
        const projectSlugs = caseStudies.projects.map(p => p.slug);
        const routes = ["/about", "/projects", "/contact", "/metrics"];
        
        let allOptions = projectSlugs;
        if (args[0].toLowerCase() === "cd") {
            allOptions = [...routes, ...projectSlugs];
        } else if (args[0].toLowerCase() === "cat") {
            allOptions = [...projectSlugs, "about.txt", "contact.txt", "skills.txt"];
        }
        
        const matches = allOptions.filter(o => o.startsWith(partialArg));
        if (matches.length === 1) {
           setInput(`${args[0]} ${matches[0]}`);
        }
      }
    }
  };

  return {
    input,
    setInput,
    output,
    onKeyDown,
    handleCommand,
    bottomRef,
  };
}
