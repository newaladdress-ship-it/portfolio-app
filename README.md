# Imran Digitals - Portfolio & Agency Website

A modern, high-performance web development agency & portfolio website for Imran Digitals, specializing in custom React/Vite applications, full-stack web solutions, and digital growth services.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Radix UI, Framer Motion, Wouter / React Router
- **Backend API**: Express 5, Node.js, Pino logging, Nodemailer / Resend
- **Package Manager**: `pnpm` monorepo structure
- **Build & Bundle**: Vite, esbuild, TypeScript

## 📁 Project Structure

```
.
├── api/                  # Built API distribution
├── artifacts/
│   ├── api-server/       # Express backend server
│   ├── portfolio/        # Main React/Vite frontend application
│   └── mockup-sandbox/   # UI components and mockups
├── lib/                  # Shared libraries and API definitions
├── scripts/              # Utility scripts (prerender, build, etc.)
├── README.md             # Project documentation
└── CLAUDE.md             # Claude AI working instructions & guidelines
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- `pnpm` (v8+ recommended)

### Installation

```bash
pnpm install
```

### Development

Run the main portfolio application in development mode:

```bash
pnpm run dev
```

### Build & Typecheck

Check TypeScript types across workspaces:

```bash
pnpm run typecheck
```

Build production distribution:

```bash
pnpm run build
```

## 📄 License

MIT License
