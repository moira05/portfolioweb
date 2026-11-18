export interface ToolkitItem {
  name: string;
  iconSlug: string;
}

export const TOOLKIT: ToolkitItem[] = [
  { name: "Figma",       iconSlug: "figma" },
  { name: "Claude",      iconSlug: "anthropic" },
  { name: "Claude Code", iconSlug: "custom-claudecode" },
  { name: "ChatGPT",     iconSlug: "custom-chatgpt" },
  { name: "Cursor",      iconSlug: "cursor" },
  { name: "Notion",      iconSlug: "notion" },
  { name: "Amplitude",   iconSlug: "custom-amplitude" },
  { name: "Jira",        iconSlug: "jira" },
];
