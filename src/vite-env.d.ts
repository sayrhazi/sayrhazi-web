/// <reference types="vite/client" />

// Minimal pour vite.config.ts (base Pages conditionnelle), sans @types/node.
declare const process: { env: Record<string, string | undefined> };
