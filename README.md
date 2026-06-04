# Muhammad Jalal — Full-Stack Developer Portfolio

An immersive, developer-centric developer portfolio and live telemetry dashboard. This application is built using Next.js 16 (App Router), React 19, and Tailwind CSS v4, providing an interactive, metrics-driven view of engineering capabilities, selected projects, dynamic case studies, and real-time development statistics.

---

## 1. Architecture & Tech Stack

The architecture of this project leverages modern, high-performance web standards to deliver responsive designs, client-server component layouts, and clean API interactions.

*   **Frontend Core & Framework:** React 19 (using both Client and Server Components) and Next.js 16 (App Router).
*   **Styling & Animations:** Tailwind CSS v4 (configured via `@tailwindcss/postcss`), Framer Motion (for responsive UI micro-animations), Radix UI primitives, Lucide React icons, and `next-themes` (for dark mode controls).
*   **Data & Telemetry Integrations:** GitHub GraphQL API v4 (fetching user repositories, stars, and contribution commits) and Recharts (powering interactive language breakdown charts and activity heatmaps).
*   **Form Management & Validation:** React Hook Form coupled with Zod validation schemas.
*   **Backend & Routing:** Next.js Route Handlers (NodeJS serverless runtime).
*   **Email Transmission:** Nodemailer SMTP client.
*   **DevOps & Dev Tools:** TypeScript (v5.7.3), PostCSS, ESLint, Vercel Analytics.

---

## 2. Core Features

*   **Interactive Bento Grid Landing Page:** Orchestrates telemetry counters, location/availability tags, dynamic highlights, and direct CTAs.
*   **Interactive Command Terminal (CLI) Interface:** A developer-centric CLI overlay (triggered with `Ctrl + K`, `⌘K`, or navbar selection) that processes commands like `help`, `whoami`, `ls`, `cd`, `cat`, and `neofetch` to navigate pages, view skills, and fetch project metadata in real-time.
*   **Session-Aware Welcome Splash Screen:** A cinematic modal introduction displaying startup metadata and hotkey hints. Uses `sessionStorage` to guarantee it only triggers once per browser session.
*   **Live GitHub Telemetry Integration:** Queries the GitHub GraphQL API in real-time to compute total repositories, total stars, annual contribution metrics, and recent commit frequencies.
*   **Dynamic Telemetry Dashboard (`/metrics`):** Displays a detailed developer breakdown featuring macro readouts, a contribution activity heatmap, a "Language DNA" distribution chart, and a core technical capability matrix.
*   **Interactive Projects Archive (`/projects`):** List of all selected archives with custom image-reveal mechanics that show dynamic project screenshots tracking the user's cursor.
*   **Rich Dynamic Case Studies (`/work/[slug]`):** Dynamic project pages loading from a central JSON database. Displays client metadata, development roles, project timelines, structured problem-solution narratives, performance metrics, and navigation links.
*   **Asymmetric Eras Timeline (`/about`):** A custom timeline rendering professional and academic achievements with interactive highlights and tech tags.
*   **Typographic Skills Heatmap Matrix:** Visualizes technical skill importance using a typographic hierarchy where primary skills glow/pop and secondary skills fade until hovered.
*   **Fluid Framer Motion Transitions:** Native page transitions integrated through Next.js templates (`app/template.tsx`) offering sleek layout slide-ins.
*   **Fully Validated Contact Engine (`/contact`):** Form interface built with React Hook Form and Zod validation schemas, hooked into a server-side Nodemailer email utility that dispatches secure SMTP payloads.

---

## 3. Project Structure

```
├── app/                      # Next.js App Router root
│   ├── about/                # About page route
│   │   └── page.tsx
│   ├── api/                  # Route Handlers / API endpoints
│   │   └── contact/          # Contact form POST endpoint
│   │       └── route.ts
│   ├── contact/              # Contact page route
│   │   └── page.tsx
│   ├── metrics/              # Metrics dashboard page route
│   │   └── page.tsx
│   ├── projects/             # Projects directory / Archives page route
│   │   └── page.tsx
│   ├── work/                 # Dynamic case study route
│   │   └── [slug]/           # Dynamic project parameter page
│   │       └── page.tsx
│   ├── globals.css           # Global custom CSS rules
│   ├── layout.tsx            # Global layout (Fonts, Meta, Analytics, Navigation, Terminal)
│   ├── page.tsx              # Home / Landing page entrypoint
│   └── template.tsx          # Page-load transition wrapper component
├── components/               # React components directory
│   ├── ui/                   # Reusable shadcn/ui components (radix-based primitives)
│   ├── about-cd-footer.tsx   # Continuous Deployment marquee component
│   ├── about-eras.tsx        # Timeline renderer for the About page
│   ├── about-identity-hero.tsx # Landing banner for the About page
│   ├── about-skills-matrix.tsx # Skill typographic heatmap component
│   ├── bento-grid.tsx        # Home layout bento widgets (live stats, location, etc.)
│   ├── case-study-...        # Components for rendering datasheet, narrative, metrics
│   ├── command-terminal.tsx  # Global command terminal component
│   ├── contact-left-pane.tsx  # Left contact page panel details
│   ├── contact-right-pane.tsx # Right contact page interactive form
│   ├── footer-section.tsx    # Home page CTA & footer brand details
│   ├── hero-section.tsx      # Main brand landing hero
│   ├── image-reveal.tsx      # Projects list cursor image tracker helper
│   ├── metrics-...           # Heatmap, Language DNA chart, Capability matrix widgets
│   ├── navigation.tsx        # Floating navbar component
│   ├── page-back-nav.tsx     # Inner page return navigation bar
│   ├── page-transition.tsx   # Exit/Enter framer-motion animations
│   ├── projects-section.tsx  # Highlight projects gallery
│   ├── tech-ticker.tsx       # Scrolling technical ticker marquee
│   ├── theme-provider.tsx    # Next Theme context wrapper
│   ├── trust-section.tsx     # Past clients logo showcase
│   └── welcome-splash.tsx    # Session-aware cinematic splash modal
├── hooks/                    # Custom application hooks
│   ├── use-mobile.ts         # Hook to check window size for mobile view
│   ├── use-terminal.ts       # CLI state machine and terminal action interpreter
│   └── use-toast.ts          # Shadcn notification management hook
├── lib/                      # Core utility functions & static datasets
│   ├── github.ts             # GitHub GraphQL client & fallback generator
│   ├── projects-data.ts      # Slugs and case study project resolvers
│   ├── site-content.json     # Core CMS data payload containing copy & projects database
│   ├── site-content.ts       # Typed accessors for site-content JSON structure
│   └── utils.ts              # Tailwind CSS class merging helper
├── public/                   # Static media assets, icons, and developer headshots
├── components.json           # Shadcn/ui component configuration
├── next.config.mjs           # Next.js configurations
├── postcss.config.mjs        # PostCSS v4 settings
├── package.json              # Project dependencies and script runner configurations
└── tsconfig.json             # TypeScript configuration options
```

---

## 4. Prerequisites & Environment Variables

### Prerequisites
*   **Node.js**: `v18.x` or later (Next.js 16 & React 19 compatibility requirement).
*   **Package Manager**: `npm` or `pnpm` (lock files present for both).

### Environment Variables
To enable contact form submissions and live GitHub metrics, configure the following variables in a `.env.local` file inside the root directory.

| Variable | Required | Purpose / Default Value | Description |
| :--- | :--- | :--- | :--- |
| `SMTP_HOST` | **Yes** | `smtp.gmail.com` | Hostname of the SMTP server used to send emails. |
| `SMTP_PORT` | **Yes** | `587` | Port number of the SMTP server (587 for TLS, 465 for SSL). |
| `SMTP_USER` | **Yes** | — | Authentication username/email for the SMTP server. |
| `SMTP_PASS` | **Yes** | — | Password (or App Password) for the SMTP server. |
| `CONTACT_TO_EMAIL` | **Yes** | — | Target email address where portfolio inquiries will be sent. |
| `CONTACT_FROM_EMAIL` | **Yes** | — | Sender email address (must align with SMTP authorization). |
| `GITHUB_USERNAME` | No | — | GitHub username to query via GraphQL. |
| `GITHUB_TOKEN` | No | — | GitHub Personal Access Token (PAT) used to authorize GraphQL queries. |

> [!NOTE]
> If `GITHUB_USERNAME` or `GITHUB_TOKEN` are not provided in the environment, the application will automatically fallback to high-fidelity static placeholders defined in `lib/github.ts`.

---

## 5. Local Development & Installation

Follow these steps to run the application in a local development environment.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd developer-portfolio-landing-page
```

### 2. Install Dependencies
Using **npm**:
```bash
npm install
```
Using **pnpm**:
```bash
pnpm install
```

### 3. Setup Environment Configuration
Copy the template variables into your local environment:
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in your actual credentials.

### 4. Run the Development Server
Using **npm**:
```bash
npm run dev
```
Using **pnpm**:
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Build and Run Production
Using **npm**:
```bash
npm run build
npm run start
```
Using **pnpm**:
```bash
pnpm run build
pnpm run start
```

---

## 6. API Reference

### Contact Form Handler
*   **Endpoint:** `/api/contact`
*   **Method:** `POST`
*   **Content-Type:** `application/json`
*   **Request Schema:**
    ```json
    {
      "name": "Jane Doe",
      "company": "Design Labs Inc.",
      "projectType": "a Next.js application",
      "email": "janedoe@example.com",
      "message": "Hi Muhammad, let's collaborate on building a new MERN application."
    }
    ```
*   **Response Structure (200 OK):**
    ```json
    {
      "message": "Message sent successfully."
    }
    ```
*   **Possible Error Responses:**
    *   `400 Bad Request`: Validation failure on payload parameters (e.g., missing required fields, malformed email).
    *   `500 Internal Server Error`: Misconfigured environment variables on the backend, or SMTP connection/dispatch failure.