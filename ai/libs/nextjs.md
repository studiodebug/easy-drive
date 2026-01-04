### Getting Started with App Router

Source: https://nextjs.org/docs/app/guides

Essential topics for starting a new Next.js project using the App Router, including installation, project structure, routing, data fetching, and deployment.

```APIDOC
# Getting Started with App Router

## Installation
Set up a new Next.js project using create-next-app.

## Project Structure
Understand the organization of files and directories in App Router projects.

## Layouts and Pages
- **layout.js** - Shared layout components
- **page.js** - Individual route pages
- Nested layouts for hierarchical UI

## Linking and Navigating
- Use `<Link>` component for client-side navigation
- `useRouter` hook for programmatic navigation
- Automatic prefetching of linked pages

## Server and Client Components
- Server Components - Default for data fetching and security
- Client Components - Interactive UI with `use client` directive
- Component composition strategies

## Partial Prerendering
Combine static and dynamic content for optimal performance.

## Fetching Data
- Server-side data fetching in Server Components
- Client-side fetching with `useEffect`
- Request deduplication and caching

## Updating Data
- Server Actions for mutations
- Form submissions and data updates
- Revalidation strategies

## Caching and Revalidating
- Request caching mechanisms
- Revalidation on-demand and time-based
- Cache management strategies

## Error Handling
- **error.js** - Error boundaries
- **not-found.js** - 404 handling
- **forbidden.js** - 403 handling
- Global error handling

## CSS
- CSS Modules
- Tailwind CSS
- CSS-in-JS libraries

## Image Optimization
- Responsive images
- Automatic format conversion
- Lazy loading

## Font Optimization
- Custom font loading
- System font optimization

## Metadata and OG images
- Dynamic metadata generation
- Open Graph image generation

## Route Handlers and Middleware
- Custom route handlers
- Request middleware processing

## Deploying
- Deployment to Vercel
- Self-hosting options
- Production optimization

## Upgrading
- Migration from Pages Router
- Codemods for automatic updates
```

--------------------------------

### Next.js App Router - Getting Started

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactStrictMode

Initialize and set up a new Next.js project using the App Router with the latest features and best practices. This covers project structure, layouts, pages, and basic routing setup.

```APIDOC
## Next.js App Router Setup

### Description
Initialize a new Next.js project with App Router and configure the project structure for building modern React applications.

### Installation
```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm run dev
```

### Project Structure
```
my-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── api/                # API routes
│   └── [dynamic]/          # Dynamic routes
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── package.json
└── tsconfig.json
```

### Key Features
- **Server Components**: Default components run on the server for better performance
- **Partial Prerendering**: Combine static and dynamic content
- **Route Handlers**: Create API endpoints using route handlers
- **Middleware**: Handle authentication and request processing
- **Image Optimization**: Automatic image optimization with `next/image`
- **Font Optimization**: Built-in font loading optimization

### Configuration
Edit `next.config.js` to customize build behavior, environment variables, and performance settings.
```

--------------------------------

### Initialize a Next.js app from an official example

Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app

This command enables the creation of a new Next.js application based on an official example from the Next.js repository. Users must specify the desired example name and their project's name, allowing for quick setup of common patterns or feature implementations.

```bash
npxcreate-next-app@latest--example [example-name] [your-project-name]
```

--------------------------------

### Manual Next.js Package Installation with pnpm

Source: https://nextjs.org/docs/app/getting-started/installation

Installs core Next.js, React, and React DOM packages manually using pnpm package manager. Use this approach when you need more control over the installation process or prefer manual setup over the automated CLI tool.

```bash
pnpm i next@latest react@latest react-dom@latest
```

--------------------------------

### Initialize Next.js Project with Jest Example

Source: https://nextjs.org/docs/app/guides/testing/jest

Use `create-next-app` to quickly scaffold a new Next.js project that is pre-configured with Jest, ideal for a rapid testing setup.

```Terminal
npx create-next-app@latest --example with-jest with-jest-app
```

--------------------------------

### Quickstart Next.js with Playwright using create-next-app

Source: https://nextjs.org/docs/app/guides/testing/playwright

Initialize a new Next.js project with Playwright pre-configured using the with-playwright example template. This command sets up all necessary dependencies and configuration files automatically.

```bash
npx create-next-app@latest --example with-playwright with-playwright-app
```

--------------------------------

### Install OpenTelemetry and Vercel OTEL Packages with npm

Source: https://nextjs.org/docs/app/guides/open-telemetry

Install the necessary packages for OpenTelemetry instrumentation in your Next.js project. This includes `@vercel/otel` for simplified setup, along with OpenTelemetry SDK and API packages for logs and general instrumentation.

```shell
npminstall@vercel/otel@opentelemetry/sdk-logs@opentelemetry/api-logs@opentelemetry/instrumentation
```

--------------------------------

### App Router - Getting Started

Source: https://nextjs.org/docs/app/getting-started/updating-data

Introduction to Next.js App Router with project structure, layouts, pages, and basic routing concepts. The App Router is the modern approach for building Next.js applications with enhanced features.

```APIDOC
# Next.js App Router - Getting Started

## Installation

### Description
Set up a new Next.js project with the App Router using create-next-app CLI.

### Command
```bash
npx create-next-app@latest my-app
```

## Project Structure

### Directory Layout
```
my-app/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── about/
│   │   └── page.js        # About page
│   └── api/
│       └── route.js       # API route
├── public/                # Static assets
├── package.json
└── next.config.js         # Configuration
```

## File-system Conventions

### page.js
- **Purpose**: Define UI for a route segment
- **Required**: At least one page.js is required to make a route publicly accessible
- **Type**: Server Component by default

### layout.js
- **Purpose**: Share UI across multiple pages
- **Usage**: Wrap child pages with persistent layout
- **Type**: Server Component by default

### error.js
- **Purpose**: Error boundary for route segment
- **Catches**: Runtime errors in nested components

### loading.js
- **Purpose**: Suspense boundary for loading states
- **Usage**: Show loading UI while content streams

### not-found.js
- **Purpose**: Custom 404 page for route segment
- **Triggered**: When notFound() is called

### middleware.js
- **Purpose**: Run code before request is processed
- **Usage**: Authentication, logging, redirects

### route.js (API Routes)
- **Purpose**: Create API endpoints
- **Methods**: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

## Directives

### 'use client'
- **Purpose**: Mark component as Client Component
- **Usage**: Enable browser APIs, event listeners, hooks
- **Example**: `'use client'` at top of file

### 'use server'
- **Purpose**: Mark function as Server Function
- **Usage**: Database access, sensitive operations
- **Example**: `'use server'` in function or file

### 'use cache'
- **Purpose**: Enable caching for Server Component
- **Usage**: Improve performance for frequently accessed data
```

--------------------------------

### Create a Next.js App with API Endpoint using CLI

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

This command initializes a new Next.js project using `create-next-app` with the `--api` flag. It automatically includes an example `route.ts` file in the `app/` folder, demonstrating how to set up an API endpoint, which is useful for starting projects utilizing Next.js's backend features.

```Terminal
npx create-next-app@latest --api
```

--------------------------------

### Initialize Next.js Project with Vitest Example

Source: https://nextjs.org/docs/app/guides/testing/vitest

Use `create-next-app` with the `with-vitest` example to quickly scaffold a new Next.js project pre-configured with Vitest. This command sets up a project named `with-vitest-app`.

```bash
npx create-next-app@latest --example with-vitest with-vitest-app
```

--------------------------------

### CLI next lint

Source: https://nextjs.org/docs/app/api-reference/cli/next

Runs ESLint for specified directories and provides a guided setup if ESLint is not configured.

```APIDOC
## CLI Command: `next lint`

### Description
Executes ESLint to analyze code quality and identify potential issues in your Next.js project. By default, it checks files in `/src`, `/app`, `/pages`, `/components`, and `/lib` directories. If ESLint is not configured, it offers a guided setup to install necessary dependencies.

### Command
`next lint`

### Arguments / Options
- **[directory]** (string) - Optional - Specifies a directory to run ESLint on. Can be used to override default directories.
- **--fix** (boolean) - Optional - Automatically fixes linting problems where possible.
- **--dir <path>** (string) - Optional - Specifies one or more directories to lint. Can be used multiple times.
- **--strict** (boolean) - Optional - Uses the strict ESLint configuration provided by Next.js.
- **-h, --help** (boolean) - Optional - Show all available options for the `next lint` command.

### Example Usage
```bash
npx next lint
npx next lint --fix
npx next lint --dir components --dir lib
```

### Output
#### Success Output (CLI Output)
- **lint_results** (string) - Displays any ESLint warnings or errors found in the codebase.
- **fix_confirmation** (string) - Confirms if any issues were automatically fixed (if `--fix` was used).

#### Output Example
```text
info  - No ESLint configuration found. Would
```

--------------------------------

### Initialize Next.js App with Cypress Example using create-next-app

Source: https://nextjs.org/docs/app/guides/testing/cypress

This command quickly sets up a new Next.js project pre-configured with Cypress by using the `with-cypress` example template. It initializes a new application with necessary dependencies and configurations for Cypress E2E and component testing.

```Terminal
npx create-next-app@latest --example with-cypress with-cypress-app
```

--------------------------------

### Next.js Linting Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Runs ESLint on all files in the specified directories (/src, /app, /pages, /components, /lib). Provides guided setup to install ESLint and configure it if not already set up in the application.

```bash
next lint
```

--------------------------------

### Install Web-Push CLI for VAPID Key Generation

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Command-line installation for the web-push package used to generate VAPID (Voluntary Application Server Identification) keys required for Web Push API authentication. Install globally to access the generate-vapid-keys command.

```bash
npm install -g web-push
```

--------------------------------

### Configure npm Scripts in package.json

Source: https://nextjs.org/docs/app/getting-started/installation

Sets up essential npm scripts for development, production build, and linting. These scripts provide commands for running the development server (next dev), building for production (next build), starting the production server (next start), and running ESLint.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

--------------------------------

### Next.js Project Structure and Setup

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/productionBrowserSourceMaps

Overview of Next.js project initialization, file structure, and basic configuration. This covers the foundational setup for both Pages Router and App Router patterns in Next.js applications.

```APIDOC
## Next.js Project Setup

### Description
Initialize and configure a Next.js application with proper project structure and file organization.

### Project Structure (App Router)
```
/app
  /layout.js          - Root layout component
  /page.js            - Home page
  /api                - API route handlers
  /instrumentation.js - Server instrumentation
/public              - Static assets
next.config.js       - Next.js configuration
package.json         - Project dependencies
```

### Installation
Create a new Next.js project using create-next-app CLI or manual setup.

### Key Directories
- **/app** - App Router directory (features: Layouts, Server Components, Route Handlers)
- **/pages** - Pages Router directory (legacy, API routes, getServerSideProps)
- **/public** - Static files served at root path
- **/src** - Optional source directory for application code

### Configuration
Configure application behavior via next.config.js with options:
- **basePath** - Deploy application under a sub-path
- **assetPrefix** - CDN prefix for static assets
- **env** - Environment variables exposed to browser
- **output** - Build output type (standalone, export)
- **redirects** - URL redirects configuration
- **rewrites** - URL rewrites configuration
```

--------------------------------

### Open Cypress Test Runner for Initial Setup

Source: https://nextjs.org/docs/app/guides/testing/cypress

Execute this command in your terminal to open the Cypress testing suite for the first time. This action initiates the Cypress setup process, prompting you to configure E2E and/or Component Testing and generating `cypress.config.js` and a `cypress` folder.

```Terminal
npm run cypress:open
```

--------------------------------

### Guides - Core Topics

Source: https://nextjs.org/docs/app/guides

Comprehensive guides covering essential topics for Next.js development including authentication, caching, environment variables, and internationalization.

```APIDOC
# Guides - Core Development Topics

## Authentication
Implement user authentication and authorization in Next.js applications.

**Topics:**
- Session management
- JWT tokens
- OAuth integration
- Protected routes

## Caching
Optimize performance through strategic caching.

**Strategies:**
- HTTP caching
- Application-level caching
- CDN caching
- Browser caching

## Environment Variables
Manage configuration across development, testing, and production.

**Files:**
- `.env.local` - Local environment
- `.env.production` - Production variables
- `.env.test` - Test environment

## Forms
Handle form submissions and validation.

**Topics:**
- Form handling
- Client-side validation
- Server-side validation
- Error handling

## Internationalization (i18n)
Support multiple languages and locales.

**Topics:**
- Language detection
- Translation management
- Locale-specific routing
- Content localization

## Data Security
Protect sensitive data and prevent vulnerabilities.

**Topics:**
- Secure headers
- CSRF protection
- XSS prevention
- Environment variable security

## Debugging
Develop and troubleshoot Next.js applications.

**Tools:**
- Browser DevTools
- Node.js debugging
- VS Code debugger
- Console logging

## Draft Mode
Preview draft content before publishing.

**Use Cases:**
- CMS content preview
- Scheduled publishing
- Content review workflows

## Error Handling
Implement comprehensive error handling strategies.

**Topics:**
- Error boundaries
- Error logging
- Error recovery
- User feedback
```

--------------------------------

### Install @next/third-parties package with npm

Source: https://nextjs.org/docs/app/guides/third-party-libraries

Install the @next/third-parties library with the latest flag to get the most recent version including experimental features and new third-party integrations currently under active development.

```bash
npm install @next/third-parties@latest next@latest
```

--------------------------------

### Start Minimal Server with Port and Hostname Configuration

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/output

Run the minimal server.js file generated in the standalone folder with custom port and hostname using environment variables. This replaces 'next start' for standalone deployments.

```bash
PORT=8080 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

--------------------------------

### CLI next start

Source: https://nextjs.org/docs/app/api-reference/cli/next

Starts the Next.js application in production mode. Requires a prior build using `next build`.

```APIDOC
## CLI Command: `next start`

### Description
Starts the Next.js application in production mode. This command serves the pre-built application generated by `next build`. It is essential to run `next build` beforehand to ensure all necessary assets and code are compiled.

### Command
`next start`

### Arguments / Options
- **[directory]** (string) - Optional - A directory containing the built Next.js application. If not provided, the current directory is used.
- **-p, --port <port>** (number) - Optional - Specifies the port number on which the production application should listen. Defaults to `3000`. Can also be configured via the `PORT` environment variable.
- **-H, --hostname <hostname>** (string) - Optional - Specifies a hostname or IP address on which the production application should listen. Defaults to `0.0.0.0`.
- **-h, --help** (boolean) - Optional - Show all available options for the `next start` command.

### Example Usage
```bash
npx next start
npx next start --port 80
npx next start ./build-output
```

### Output
#### Success Output (CLI Output)
- **server_status** (string) - Confirmation that the server has started and is listening on the specified port.

#### Output Example
```text
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```
```

--------------------------------

### iOS Install Prompt Component for PWA

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

React component that detects iOS devices and PWA installation status, displaying conditional instructions for installing the app to the home screen. Uses media queries and user agent detection to show appropriate messaging only when the app is not already installed.

```TypeScript
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}
```

--------------------------------

### Run ESLint with npm

Source: https://nextjs.org/docs/app/getting-started/installation

Execute ESLint linting on a Next.js project using npm. This command initiates the ESLint setup and configuration process, displaying interactive prompts for configuration options.

```bash
npm run lint
```

--------------------------------

### Install server-only package with package managers

Source: https://nextjs.org/docs/app/getting-started/server-and-client-components

Command to install the server-only package using pnpm package manager. This package is optional but recommended when linting rules flag extraneous dependencies. It helps enforce server/client code separation and provides clearer error messages.

```shell
pnpm add server-only
```

--------------------------------

### Configure package.json scripts for Node.js deployment

Source: https://nextjs.org/docs/app/getting-started/deploying

Set up the required build and start scripts in package.json for deploying a Next.js application to a Node.js server. The build script compiles the application while the start script launches the production server. This configuration is essential for any Node.js hosting provider.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

--------------------------------

### Example Next.js Page Component for Testing

Source: https://nextjs.org/docs/app/guides/testing/vitest

A basic Next.js page component located at `app/page.tsx` that renders a simple heading and a link. This component serves as an example target for a unit test, demonstrating how to prepare a component for testing.

```typescript
import Link from 'next/link'
export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

--------------------------------

### Next.js Production Start Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Starts the Next.js application in production mode. Requires the application to be pre-compiled using 'next build' before execution. Runs the optimized production build created by the build command.

```bash
next start
```

--------------------------------

### Configure ESLint in package.json

Source: https://nextjs.org/docs/app/getting-started/installation

Add ESLint linting script to package.json for a Next.js project. Running npm run lint will guide you through ESLint setup with options for Strict, Base, or custom configuration. ESLint will automatically run during builds to catch errors.

```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

--------------------------------

### Install OpenTelemetry packages for Next.js

Source: https://nextjs.org/docs/app/guides/open-telemetry

Install required OpenTelemetry packages for Node.js SDK, resource management, semantic conventions, tracing, and HTTP trace export. These dependencies are necessary for manual OpenTelemetry configuration in Next.js applications.

```bash
npm install @opentelemetry/sdk-node @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http
```

--------------------------------

### next start CLI Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

The `next start` command starts a Next.js application in production mode. It requires the application to have been previously compiled with `next build`.

```APIDOC
## next start

### Description
`next start` starts the application in production mode. The application should be compiled with `next build` first.

### Command
`next start`

### Usage
```bash
next start [directory] [options]
```

### Options
- **-h, --help** (flag) - Optional - Show all available options.
- **[directory]** (string) - Optional - A directory on which to start the application. If no directory is provided, the current directory will be used.
- **-p, --port <port>** (number) - Optional - Specify a port number on which to start the application. (default: 3000, env: PORT).
- **-H, --hostname <hostname>** (string) - Optional - Specify a hostname on which to start the application (default: 0.0.0.0).
- **--keepAliveTimeout <keepAliveTimeout>** (number) - Optional - Specify the maximum amount of milliseconds to wait before closing inactive connections.

### Command Example
```bash
next start -p 8080 --hostname 127.0.0.1
```

### Output
Starts the Next.js application, typically logging the listening address and port.
```

--------------------------------

### Define Localization Dictionaries in JSON

Source: https://nextjs.org/docs/app/guides/internationalization

Example JSON files demonstrating how to structure dictionaries for different languages (English and Dutch). Each file maps keys to localized strings, allowing for organized translation management.

```json
{
"products": {
"cart":"Add to Cart"
  }
}
```

```json
{
"products": {
"cart":"Toevoegen aan Winkelwagen"
  }
}
```

--------------------------------

### Next.js Static GET Route Handler for Export Mode (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Provides an example of a GET Route Handler configured for Next.js `export` mode to generate static content. By setting `dynamic` to `'force-static'`, this handler outputs a static file (e.g., 'Hello World' text) during the build process, suitable for static site generation.

```typescript
exportconstdynamic='force-static'
exportfunctionGET() {
returnnewResponse('Hello World', { status:200 })
}
```

--------------------------------

### Implement Next.js ESLint Flat Configuration

Source: https://nextjs.org/docs/app/api-reference/config/eslint

This example demonstrates configuring ESLint using the new flat configuration format (`eslint.config.mjs`) alongside `eslint-config-next`. It ensures compatibility with modern ESLint setups and correctly applies Next.js configurations by extending it last, preventing conflicts with other shareable configs.

```javascript
import js from'@eslint/js'
import { FlatCompat } from'@eslint/eslintrc'
constcompat=newFlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
  baseDirectory:import.meta.dirname,
  recommendedConfig:js.configs.recommended,
})
consteslintConfig= [
...compat.config({
    extends: ['eslint:recommended','next'],
  }),
]
exportdefault eslintConfig
```

--------------------------------

### Install Tailwind CSS v3 and dependencies with pnpm

Source: https://nextjs.org/docs/app/guides/tailwind-v3-css

This command installs Tailwind CSS, PostCSS, and Autoprefixer as development dependencies using pnpm, then initializes Tailwind CSS to generate `tailwind.config.js` and `postcss.config.js` files in your project root.

```Terminal
pnpmadd-Dtailwindcss@^3postcssautoprefixer
npxtailwindcssinit-p
```

--------------------------------

### GET Route Handler with Caching

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

An example of a `GET` Route Handler demonstrating how to fetch data from an external API and opt into caching using `export const dynamic = 'force-static'`.

```APIDOC
## GET /app/items/route.ts

### Description
This Route Handler fetches a list of items from a specified API endpoint and returns it as a JSON response. It is configured to be statically cached, ensuring the data is served from the cache for subsequent requests.

### Method
GET

### Endpoint
`/app/items/route.ts`

### Parameters
None.

### Request Body
```json
{}
```

### Response
#### Success Response (200)
- **data** (array) - An array containing item objects retrieved from the API.

#### Response Example
```json
{
  "data": [
    {
      "id": "item-abc",
      "name": "Example Item One",
      "price": 19.99
    },
    {
      "id": "item-xyz",
      "name": "Example Item Two",
      "price": 29.99
    }
  ]
}
```

### Code Example
```typescript
export const dynamic = 'force-static'

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
  return Response.json({ data })
}
```
```

--------------------------------

### Install Cypress as a Development Dependency

Source: https://nextjs.org/docs/app/guides/testing/cypress

This set of commands demonstrates how to manually install Cypress as a development dependency using npm, yarn, or pnpm. It prepares your existing Next.js project for Cypress integration by adding the `cypress` package to your `devDependencies`.

```Terminal
npm install -D cypress
# or
yarn add -D cypress
# or
pnpm install -D cypress
```

--------------------------------

### Install Jest and React Testing Library Dependencies

Source: https://nextjs.org/docs/app/guides/testing/jest

Install Jest, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `ts-node`, and `@types/jest` as development dependencies. These packages are essential for setting up a robust testing environment in a Next.js project.

```Terminal
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

```Terminal
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

```Terminal
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

--------------------------------

### Install Next.js dependency using npm

Source: https://nextjs.org/docs/app/guides/migrating/from-vite

This command installs the latest version of Next.js as a project dependency. It's the first step to incorporating Next.js into your application.

```bash
npminstallnext@latest
```

--------------------------------

### Google Fonts - Multiple Weights and Styles Example

Source: https://nextjs.org/docs/app/api-reference/components/font

Example showing how to load multiple font weights and styles simultaneously from Google Fonts using array syntax.

```APIDOC
## Google Fonts - Multiple Weights and Styles Example

### Description
Demonstrates loading multiple font weights and styles in a single font configuration for comprehensive typographic control.

### File Location
`app/layout.js`

### Code Example
```javascript
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
```

### Configuration Details
- **weight**: Array of weight values - `['400', '700']` loads regular and bold
- **style**: Array of style values - `['normal', 'italic']` loads both variants
- All combinations are loaded (4 font files total)
- Single className can access all loaded variants

### Notes
- Use arrays instead of single string values
- Each combination increases file size
- Load only weights/styles actually used in your design
```

--------------------------------

### Run Vitest Tests from Command Line

Source: https://nextjs.org/docs/app/guides/testing/vitest

Commands to execute the `test` script defined in your `package.json` using various Node.js package managers. Running these commands will start Vitest and execute all configured tests in your project.

```bash
npm run test
```

```bash
yarn test
```

```bash
pnpm test
```

```bash
bun test
```

--------------------------------

### Start Next.js Development Server

Source: https://nextjs.org/docs/app/guides/debugging

Commands to start the Next.js development server for local debugging. Supports npm, yarn, and next dev commands. The server runs on http://localhost:3000 by default.

```bash
next dev
```

```bash
npm run dev
```

```bash
yarn dev
```

--------------------------------

### Install Playwright dependencies for CI environments

Source: https://nextjs.org/docs/app/guides/testing/playwright

Install all system dependencies required for Playwright browsers in CI/CD environments. This command must be run before executing tests in headless mode on continuous integration platforms.

```bash
npx playwright install-deps
```

--------------------------------

### Basic Client Instrumentation Setup

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

Sets up performance monitoring, analytics initialization, and error tracking in the instrumentation-client.ts file. This code runs before React hydration begins, making it ideal for early application lifecycle observability. Place this file in the root of your application or inside a src folder.

```TypeScript
// Set up performance monitoring
performance.mark('app-init')
// Initialize analytics
console.log('Analytics initialized')
// Set up error tracking
window.addEventListener('error', (event) => {
  // Send to your error tracking service
  reportError(event.error)
})
```

--------------------------------

### Install Vitest and React Testing Library Dependencies

Source: https://nextjs.org/docs/app/guides/testing/vitest

Manually install Vitest and related testing dependencies for a Next.js project. These packages are installed as development dependencies and include Vitest, Vite's React plugin, JSDOM, React Testing Library, and optionally `vite-tsconfig-paths` for TypeScript.

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```

--------------------------------

### Create a Next.js app using the default template

Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app

Execute this command to launch an interactive setup process for a new Next.js project. The CLI will prompt the user through a series of questions to configure settings such as TypeScript, linter choice, Tailwind CSS, `src/` directory usage, App Router, Turbopack, and import aliases.

```bash
npxcreate-next-app@latest
```

--------------------------------

### Install Next.js Bundle Analyzer Plugin

Source: https://nextjs.org/docs/app/guides/package-bundling

Installs the `@next/bundle-analyzer` plugin, a tool for visualizing the size of JavaScript bundles and their dependencies. This plugin is crucial for identifying large dependencies and optimizing application size.

```npm
npmi@next/bundle-analyzer
```

```yarn
yarnadd@next/bundle-analyzer
```

```pnpm
pnpmadd@next/bundle-analyzer
```

--------------------------------

### Basic GET Request Handler in Next.js

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Creates a simple async GET request handler that returns a JSON response. This is the most basic Route Handler example in Next.js, demonstrating how to export HTTP method functions from route.ts files.

```typescript
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

--------------------------------

### Generate Jest Configuration File

Source: https://nextjs.org/docs/app/guides/testing/jest

Run this command to initialize a basic Jest configuration file. It will guide you through a series of prompts and automatically create a `jest.config.ts` or `jest.config.js` file for your project.

```Terminal
npm init jest@latest
```

```Terminal
yarn create jest@latest
```

```Terminal
pnpm create jest@latest
```

--------------------------------

### GET /api

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

This endpoint demonstrates a basic GET request handler for the '/api' path. It serves as a public endpoint accessible to clients.

```APIDOC
## GET /api

### Description
This endpoint handles basic GET requests to the `/api` path. It serves as a public endpoint accessible to clients.

### Method
GET

### Endpoint
/api

### Parameters
#### Path Parameters
- No path parameters.

#### Query Parameters
- No query parameters.

#### Request Body
- No request body required.

### Request Example
N/A

### Response
#### Success Response (200)
- No specific response body is defined in the example, typically returns data relevant to the GET request.

#### Response Example
{
  "message": "Hello from API!"
}
```

--------------------------------

### Implement Client-Side Navigation with Next.js Links in Static Export

Source: https://nextjs.org/docs/app/guides/static-exports

This example showcases an index route utilizing Next.js `Link` components to enable client-side navigation between different pages within a static export. This setup mimics the behavior of a traditional Single-Page Application, providing smooth transitions without full page reloads.

```TypeScript
import Link from'next/link'
exportdefaultfunctionPage() {
return (
    <>
      <h1>Index Page</h1>
      <hr />
      <ul>
        <li>
          <Linkhref="/post/1">Post 1</Link>
        </li>
        <li>
          <Linkhref="/post/2">Post 2</Link>
        </li>
      </ul>
    </>
  )
}
```

--------------------------------

### Create Basic Middleware with Redirect in Next.js

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

Defines a Next.js middleware function that redirects incoming requests to a different URL. The middleware uses NextRequest and NextResponse from Next.js server utilities and includes a matcher configuration to apply the middleware only to specific routes (/about/:path*). This example demonstrates the minimal setup required for middleware-based redirects.

```TypeScript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
```

--------------------------------

### CLI: next

Source: https://nextjs.org/docs/app/api-reference/edge

The `next` CLI provides various commands for developing, building, and starting Next.js applications, as well as linting and checking TypeScript.

```APIDOC
## CLI Command: next

### Description
The `next` command is the primary command-line interface for managing Next.js applications. It offers subcommands to run the development server, build for production, start the production server, and perform other utility tasks.

### Method
CLI Command

### Endpoint
Not applicable (local command-line tool)

### Parameters
#### Subcommands & Options
- **next dev [options]**
  - Starts the development server.
  - `--port, -p <port>` (number, optional) - A port number on which to start the application (default: 3000).
  - `--hostname, -H <hostname>` (string, optional) - A hostname on which to start the application (default: localhost).
- **next build [options]**
  - Creates an optimized production build of your application.
  - `--profile` (boolean, optional) - Enable React's profiling features.
  - `--no-lint` (boolean, optional) - Skip linting during build.
  - `--experimental-app` (boolean, optional) - Use experimental App Router during build.
- **next start [options]**
  - Starts the Next.js production server.
  - `--port, -p <port>` (number, optional) - A port number on which to start the application (default: 3000).
  - `--hostname, -H <hostname>` (string, optional) - A hostname on which to start the application (default: localhost).
- **next export [options]**
  - Exports the application to static HTML for deployment to static hosting services.
  - `--outdir <dir>` (string, optional) - The output directory (default: `out`).
- **next lint [options]**
  - Runs ESLint on your application.
  - `--fix` (boolean, optional) - Automatically fix problems.
  - `--dir <path>` (string, optional) - Specify a directory to lint.
- **next telemetry**
  - Allows you to enable or disable Next.js Telemetry.

#### Request Body
None

### Request Example
```bash
# Start development server
npm run dev
# Or directly:
next dev -p 8080

# Build for production
npm run build
# Or directly:
next build

# Start production server
npm start
# Or directly:
next start -p 4000

# Export to static HTML
next export --outdir static_site

# Run linter
next lint --fix
```

### Response
#### Success Response (0 exit code)
- **(CLI Output)** - Varies by subcommand. For `dev`, it shows server status; for `build`, build progress and statistics; for `start`, server listening messages.

#### Response Example
```text
# For `next dev`

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
wait  - compiling ...
event - compiled client and server successfully in 1.2s (13 modules)

# For `next build`

info  - Creating an optimized production build ...
info  - Compiled successfully
info  - Collecting page data ...
info  - Generating static pages (0/1)
info  - Finalizing page optimization ...

Route (app)                              Size     First Load JS
┌ ○ /                                    93 B         81.7 kB
├ λ /api/hello                           0 B          81.7 kB
└ λ /server-component                    159 B        81.7 kB
+ First Load JS shared by all           81.7 kB
  ├ chunks/framework-f6617652f1d9317d.js 45.4 kB
  ├ chunks/main-8f0a1c1d.js              34.8 kB
  ├ chunks/pages/_app-c3a06a6c.js        21.7 kB
  └ ...

```
```

--------------------------------

### Next.js Info Command Output Example

Source: https://nextjs.org/docs/app/api-reference/cli/next

Terminal output from next info command displaying system information including OS details, binary versions, package versions, and Next.js configuration. Used for reporting bugs and debugging.

```terminal
OperatingSystem:
Platform: darwin
Arch: arm64
Version: DarwinKernelVersion23.6.0
Available memory (MB): 65536
Available CPU cores: 10

Binaries:
Node: 20.12.0
npm: 10.5.0
Yarn: 1.22.19
pnpm: 9.6.0

Relevant Packages:
next: 15.0.0-canary.115
eslint-config-next: 14.2.5
react: 19.0.0-rc
react-dom: 19.0.0
typescript: 5.5.4

Next.js Config:
output: N/A
```

--------------------------------

### Define Next.js Deployment Scripts in package.json

Source: https://nextjs.org/docs/app/building-your-application/upgrading/canary

This JSON snippet illustrates the 'scripts' section of a 'package.json' file, essential for managing a Next.js application's lifecycle. It includes commands for development ('next dev'), building the production application ('next build'), and starting the production server ('next start'), primarily used for Node.js server deployments.

```json
{
"scripts": {
"dev":"next dev",
"build":"next build",
"start":"next start"
  }
}
```

--------------------------------

### Data Fetching Patterns

Source: https://nextjs.org/docs/app/getting-started/updating-data

Comprehensive guide to data fetching strategies in Next.js including server-side rendering, static generation, client-side fetching, and revalidation techniques.

```APIDOC
# Data Fetching in Next.js

## Server-side Data Fetching

### Description
Fetch data on the server during render time. Data is not exposed to the client.

### Method
Use async/await in Server Components

### Example: Basic Server-side Fetch
```javascript
// app/blog/page.js
export default async function BlogPage() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## Static Site Generation (SSG)

### Description
Pre-render pages at build time. Best for content that doesn't change frequently.

### Configuration
```javascript
// app/products/[id]/page.js
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());

  return products.map(product => ({
    id: product.id.toString()
  }));
}

export default async function ProductPage({ params }) {
  const product = await fetch(
    `https://api.example.com/products/${params.id}`
  ).then(res => res.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
```

---

## Incremental Static Regeneration (ISR)

### Description
Regenerate static pages on-demand when new data becomes available.

### Configuration
```javascript
// app/posts/[id]/page.js
export const revalidate = 60; // Revalidate every 60 seconds

export default async function PostPage({ params }) {
  const post = await fetch(
    `https://api.example.com/posts/${params.id}`,
    { next: { revalidate: 60 } }
  ).then(res => res.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <time>{post.publishedAt}</time>
    </article>
  );
}
```

---

## Client-side Data Fetching

### Description
Fetch data in the browser after the page loads. Useful for real-time data and user-specific content.

### Method
Use React hooks in Client Components

### Example: useEffect Pattern
```javascript
'use client';

import { useState, useEffect } from 'react';

export default function DynamicPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## Caching and Revalidation

### Description
Control cache behavior for fetch requests and use revalidation strategies.

### Cache Options
```javascript
// No cache - always fetch fresh
fetch(url, { cache: 'no-store' });

// Cache for one minute
fetch(url, { next: { revalidate: 60 } });

// Cache indefinitely (until revalidate called)
fetch(url, { next: { revalidate: false } });

// Revalidate on-demand
fetch(url, { next: { tags: ['posts'] } });
```

### Manual Revalidation
```javascript
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const tag = request.nextUrl.searchParams.get('tag');
  revalidateTag(tag);
  return Response.json({ revalidated: true, now: Date.now() });
}
```
```

--------------------------------

### Next.js Server Debugger Output

Source: https://nextjs.org/docs/app/guides/debugging

Example output from launching Next.js dev server with --inspect flag enabled. Shows the WebSocket debugging endpoint and server startup confirmation on port 3000.

```bash
Debugger listening on ws://127.0.0.1:9229/0cf90313-350d-4466-a748-cd60f4e47c95
For help, see: https://nodejs.org/en/docs/inspector
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

--------------------------------

### Create Next.js App with create-next-app CLI

Source: https://nextjs.org/docs/app/getting-started/installation

Automatically scaffolds a new Next.js project with interactive prompts for configuring TypeScript, ESLint, Tailwind CSS, App Router, and other options. This is the quickest way to set up a new Next.js application with all necessary dependencies and configuration files.

```bash
npx create-next-app@latest
```

--------------------------------

### Next.js Build Output Example

Source: https://nextjs.org/docs/app/api-reference/cli/next

Terminal output showing route analysis from next build command with metrics for Static and Dynamic routes. Displays size of assets downloaded client-side and First Load JS with compression details using gzip compression.

```terminal
Route (app)                              Size     First Load JS
┌○/_not-found                             0B       0kB
└ƒ/products/[id]                         0B       0kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

--------------------------------

### Initialize a Next.js application with create-next-app

Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app

This command illustrates the basic syntax for using the `create-next-app` CLI. It allows developers to specify a project name and include various configuration options to tailor the new Next.js project to their needs.

```bash
npxcreate-next-app@latest [project-name] [options]
```

--------------------------------

### Core Components API

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Reference documentation for Next.js built-in components including Image, Link, Script, Font, and Form components with their props, usage examples, and optimization features.

```APIDOC
## Core Components

### Image Component

#### Description
Optimized image component with automatic lazy loading, responsive sizing, and format optimization.

#### Props
- **src** (string|StaticImageData) - Required - Image source URL or imported image
- **alt** (string) - Required - Alternative text
- **width** (number) - Image width in pixels
- **height** (number) - Image height in pixels
- **loader** (function) - Custom image loader
- **priority** (boolean) - Load image with high priority (default: false)
- **placeholder** (string) - Placeholder strategy: 'blur', 'empty' (default: 'empty')
- **blurDataURL** (string) - Base64 data URL for blur placeholder
- **quality** (number) - Image quality 1-100 (default: 75)
- **fill** (boolean) - Fill container
- **sizes** (string) - Responsive image sizes
- **style** (object) - CSS styles
- **onLoad** (function) - Callback when image loads
- **onError** (function) - Callback on error

### Link Component

#### Description
Navigates between pages without full page reload. Enables client-side navigation and prefetching.

#### Props
- **href** (string|object) - Required - Destination URL or pathname object
- **replace** (boolean) - Replace history entry (default: false)
- **prefetch** (boolean|string) - Prefetch page (default: 'auto')
  - **'auto'** - Prefetch if in viewport
  - **true** - Always prefetch
  - **false** - Never prefetch
- **scroll** (boolean) - Scroll to top on navigation (default: true)
- **shallow** (boolean) - Legacy Pages Router only
- **legacyBehavior** (boolean) - Legacy behavior (deprecated)
- **passHref** (boolean) - Legacy behavior
- **onClick** (function) - Click handler

### Script Component

#### Description
Optimizes loading of third-party scripts with control over execution timing and error handling.

#### Props
- **src** (string) - Required - Script source URL
- **strategy** (string) - Loading strategy
  - **'beforeInteractive'** - Load before page interactive
  - **'afterInteractive'** - Load after page interactive (default)
  - **'lazyOnload'** - Load during idle time
  - **'worker'** - Load in web worker
- **onLoad** (function) - Callback when script loads
- **onError** (function) - Callback on error
- **onReady** (function) - Callback when script is ready
- **async** (boolean) - Load asynchronously
- **defer** (boolean) - Load with defer attribute
- **noModule** (boolean) - Only for non-ES modules
- **nonce** (string) - CSP nonce

### Font Component

#### Description
Optimizes font loading with self-hosted fonts. Eliminates layout shift and improves performance.

#### Usage
```javascript
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })
```

#### Props
- **weight** (string|array) - Font weights to load
- **style** (string|array) - Font styles (normal, italic)
- **subsets** (array) - Character subsets to preload
- **display** (string) - Font display strategy
  - **'auto'** - Default
  - **'block'** - Wait for font
  - **'swap'** - Use fallback until font loads
  - **'fallback'** - Hybrid approach
  - **'optional'** - Use if available
- **preload** (boolean) - Preload font (default: true)
- **fallback** (array) - Fallback fonts
- **adjustFontFallback** (boolean) - Adjust fallback metrics

### Form Component

#### Description
Enhanced form component with client-side validation, loading states, and error handling (App Router).

#### Props
- **action** (function) - Server action to execute on submit
- **onSubmit** (function) - Submit handler
- **className** (string) - CSS classes
- **noValidate** (boolean) - Disable HTML5 validation
- **method** (string) - Form method (default: 'POST')
- **encType** (string) - Encoding type

#### Features
- Progressive enhancement
- Automatic error display
- Loading states
- Server action integration
- Client-side and server-side validation
```

--------------------------------

### Invalidate Route Handler with revalidatePath

Source: https://nextjs.org/docs/app/api-reference/functions/revalidatePath

Example of invalidating a GET route handler that fetches data with force-cache strategy. When revalidatePath is called with the route path, it invalidates the cached data entries accessed within that route handler.

```typescript
export async function GET() {
  const data = await fetch('https://api.vercel.app/blog', {
    cache: 'force-cache',
  })
  return Response.json(await data.json())
}
```

--------------------------------

### Install OpenTelemetry API for custom spans

Source: https://nextjs.org/docs/app/guides/open-telemetry

Install the OpenTelemetry API package required to create and manage custom spans in your Next.js application. This package provides the trace API for instrumenting specific functions and operations.

```bash
npm install @opentelemetry/api
```

--------------------------------

### Get All Cookies in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/cookies

Retrieve all cookies or all cookies matching a specific name using cookies().getAll() method. This example demonstrates iterating through all available cookies and rendering them in JSX. Returns an array of cookie objects with name and value properties.

```TypeScript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

--------------------------------

### Configure Next.js with next.config.mjs

Source: https://nextjs.org/docs/app/guides/migrating/from-vite

Create a `next.config.mjs` file at the root of your project to define Next.js-specific configurations. This example sets the output mode to 'export' for a Single-Page Application (SPA) and customizes the build output directory to './dist/'.

```javascript
/** @type{import('next').NextConfig} */
constnextConfig= {
  output:'export',
  distDir:'./dist',
}
exportdefault nextConfig
```

--------------------------------

### Implement Conditional Routing in Next.js Middleware with TypeScript

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This TypeScript example demonstrates how to use conditional statements within a Next.js middleware function to perform URL rewriting based on the incoming request's pathname. It shows how to redirect requests starting with `/about` to `/about-2` and `/dashboard` to `/dashboard/user`.

```typescript
import { NextResponse } from'next/server'
importtype { NextRequest } from'next/server'
exportfunctionmiddleware(request:NextRequest) {
if (request.nextUrl.pathname.startsWith('/about')) {
returnNextResponse.rewrite(newURL('/about-2',request.url))
  }
if (request.nextUrl.pathname.startsWith('/dashboard')) {
returnNextResponse.rewrite(newURL('/dashboard/user',request.url))
  }
}
```

--------------------------------

### Install Next.js ESLint Plugin with Package Managers

Source: https://nextjs.org/docs/app/api-reference/config/eslint

These commands show how to install the `@next/eslint-plugin-next` package as a development dependency using npm, Yarn, pnpm, or Bun. This plugin is essential for enabling Next.js-specific linting rules in your project.

```shell
npm install --save-dev @next/eslint-plugin-next
yarn add --dev @next/eslint-plugin-next
pnpm add --save-dev @next/eslint-plugin-next
bun add --dev @next/eslint-plugin-next
```

--------------------------------

### Data Fetching Methods

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Comprehensive guide to data fetching patterns in Next.js including server-side rendering with getServerSideProps, static generation with getStaticProps and getStaticPaths, and client-side fetching strategies.

```APIDOC
## Data Fetching Methods

### Pages Router - getStaticProps

#### Description
Generates static HTML at build time. The page is pre-rendered and cached.

#### Method
GET

#### Usage
```javascript
export async function getStaticProps(context) {
  return {
    props: { data },
    revalidate: 60
  }
}
```

#### Parameters
- **context.params** (object) - Route parameters for dynamic routes
- **context.preview** (boolean) - Preview mode flag
- **context.previewData** (object) - Preview data
- **context.locale** (string) - Current locale (if i18n enabled)
- **context.locales** (array) - All available locales
- **context.defaultLocale** (string) - Default locale

#### Return Object
- **props** (object) - Required - Page component props
- **revalidate** (number|boolean) - ISR revalidation time in seconds
- **notFound** (boolean) - Show 404 page
- **redirect** (object) - Redirect to another page

### Pages Router - getStaticPaths

#### Description
Specifies which dynamic routes to pre-render at build time.

#### Usage
```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking'
  }
}
```

#### Parameters
None - called at build time only

#### Return Object
- **paths** (array) - Array of pre-render paths
  - **params** (object) - Route parameters
- **fallback** (boolean|string) - Fallback behavior
  - **false** - Return 404 for unlisted paths
  - **true** - Generate on-demand (stale-while-revalidate)
  - **'blocking'** - Generate on-demand (server-side render)

### Pages Router - getServerSideProps

#### Description
Server-side rendering on every request. Page is rendered on each request.

#### Usage
```javascript
export async function getServerSideProps(context) {
  return {
    props: { data }
  }
}
```

#### Parameters
- **context.params** (object) - Route parameters
- **context.req** (object) - HTTP request object
- **context.res** (object) - HTTP response object
- **context.query** (object) - Query string parameters
- **context.preview** (boolean) - Preview mode flag
- **context.previewData** (object) - Preview data
- **context.resolvedUrl** (string) - Resolved URL

#### Return Object
- **props** (object) - Page component props
- **notFound** (boolean) - Show 404
- **redirect** (object) - Redirect configuration

### App Router - Data Fetching

#### Server Components (Default)
```javascript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

#### Client Components
```javascript
'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  
  return <div>{data}</div>
}
```

### Caching and Revalidation

#### Cache Options
- **no-store** - Fetch on every request
- **force-cache** - Cache indefinitely (default for GET in production)
- **revalidate: seconds** - Revalidate after N seconds (ISR)

#### Revalidation Methods
- **Time-based**: Set revalidate time in fetch options
- **On-demand**: Use revalidateTag() and revalidatePath()
- **Background**: Revalidate while serving stale content
```

--------------------------------

### Use Tailwind CSS v3 classes in a Next.js page component with TypeScript

Source: https://nextjs.org/docs/app/guides/tailwind-v3-css

This example demonstrates how to apply Tailwind CSS utility classes directly to HTML elements within a Next.js page component. It shows a simple `<h1>` tag styled with Tailwind classes for font size, weight, and an underline.

```TypeScript
exportdefaultfunctionPage() {
return <h1className="text-3xl font-bold underline">Hello, Next.js!</h1>
}
```

--------------------------------

### Google Fonts - Variable Font Example

Source: https://nextjs.org/docs/app/api-reference/components/font

Example implementation using a variable font from Google Fonts with optimal performance settings. No weight specification required for variable fonts.

```APIDOC
## Google Fonts - Variable Font Example

### Description
Implementation example for using a Google variable font (Inter) with recommended settings. Variable fonts provide flexibility without requiring weight specification.

### File Location
`app/layout.tsx`

### Code Example
```typescript
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Key Points
- No weight property needed for variable fonts
- Subsets specified for optimization
- Display set to 'swap' for better UX
- Applied via className to root html element
```

--------------------------------

### GET /route.js - Basic Route Handler

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Create a basic GET route handler that returns a JSON response. Route handlers are custom request handlers that support HTTP methods like GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

```APIDOC
## GET Route Handler

### Description
Basic route handler that responds to GET requests with a JSON response.

### Method
GET

### Endpoint
/route.js

### Response
#### Success Response (200)
- **message** (string) - Success message

### Response Example
```typescript
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

### Notes
- Route handlers are async functions that handle HTTP requests
- Supported HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- If OPTIONS is not defined, Next.js automatically implements it
```

--------------------------------

### Guides - Advanced Topics

Source: https://nextjs.org/docs/app/guides

Advanced Next.js topics including performance optimization, analytics, PWAs, static exports, and testing strategies.

```APIDOC
# Guides - Advanced Development Topics

## Analytics
Track application metrics and user behavior.

**Topics:**
- Web Vitals
- Custom events
- Analytics providers
- Performance monitoring

## Prefetching
Optimize navigation with intelligent prefetching.

**Strategies:**
- Automatic prefetching
- Manual prefetching
- Conditional prefetching

## Production
Prepare and deploy to production environment.

**Topics:**
- Build optimization
- Performance tuning
- Monitoring
- Security hardening

## Progressive Web Apps (PWAs)
Build installable web applications.

**Features:**
- Service workers
- Offline support
- Installation prompts
- Push notifications

## Static Exports
Export Next.js as static HTML files.

**Use Cases:**
- Static hosting
- CDN distribution
- Offline-first applications

## Multi-tenant
Build applications serving multiple tenants.

**Topics:**
- Tenant isolation
- Shared resources
- Custom domains
- Data separation

## Multi-zones
Combine multiple Next.js applications.

**Topics:**
- Micro frontends
- Application composition
- Shared state

## Self-Hosting
Deploy Next.js on custom infrastructure.

**Options:**
- Docker containers
- Node.js servers
- Serverless platforms

## Testing
Implement comprehensive testing strategies.

**Testing Frameworks:**
- Jest - Unit and integration testing
- Vitest - Fast unit testing
- Cypress - End-to-end testing
- Playwright - Cross-browser testing

## CI Build Caching
Optimize CI/CD pipeline performance.

**Strategies:**
- Dependency caching
- Build artifact caching
- Docker layer caching

## Upgrading
Upgrade Next.js to newer versions.

**Resources:**
- Codemods - Automated migrations
- Version guides - Version-specific changes
- Breaking changes - API modifications
```

--------------------------------

### API Reference: CLI

Source: https://nextjs.org/docs/app/getting-started/project-structure

Details the usage of the `create-next-app CLI` and `next CLI`.

```APIDOC
## API Reference: CLI

### Description
This section details the Command Line Interface (CLI) tools available in Next.js.

### CLI
- create-next-app CLI
- next CLI
```

--------------------------------

### Get Single Cookie in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/cookies

Retrieve a single cookie by name using the cookies().get() method. This example shows how to access cookie data from HTTP request headers in a Server Component using the next/headers module. Returns a cookie object containing name and value properties.

```TypeScript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

--------------------------------

### Create Web App Manifest with Next.js TypeScript

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Generate a web app manifest file for PWA configuration using Next.js MetadataRoute. This manifest defines the app name, icons, display mode, and theme colors for home screen installation. The manifest enables users to install the PWA on their device with a native app-like experience.

```typescript
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

--------------------------------

### Google Fonts - Non-Variable Font Example

Source: https://nextjs.org/docs/app/api-reference/components/font

Example implementation for non-variable Google Fonts like Roboto that require explicit weight specification.

```APIDOC
## Google Fonts - Non-Variable Font Example

### Description
Implementation example for using a non-variable Google font (Roboto) where weight specification is required.

### File Location
`app/layout.tsx`

### Code Example
```typescript
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Key Differences
- **Must** specify weight property for non-variable fonts
- Weight is a string value (e.g., '400', '700')
- Otherwise follows same pattern as variable fonts
```

--------------------------------

### Initialize Next.js app instance with options

Source: https://nextjs.org/docs/app/guides/custom-server

Demonstrates the basic import and initialization of a Next.js app instance. The next() function accepts an options object to configure the Next.js application behavior, including development mode, project directory location, and server configuration.

```TypeScript
import next from 'next'
const app = next({})
```

--------------------------------

### Next.js Production Build Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Creates an optimized production build of the Next.js application. Analyzes and displays information about each route to help identify optimization opportunities. Must be executed before running 'next start' in production.

```bash
next build
```

--------------------------------

### Install React Compiler Babel Plugin

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler

Install the babel-plugin-react-compiler package required to use the React Compiler in Next.js projects. This is a prerequisite before enabling the feature in configuration.

```bash
npm install babel-plugin-react-compiler
```

--------------------------------

### CLI Reference

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Next.js command-line interface provides commands for development, building, and project initialization.

```APIDOC
## Next.js CLI Reference

### create-next-app CLI

#### Description
Initialize a new Next.js project with recommended settings and configurations.

#### Syntax
```bash
npx create-next-app@latest
```

#### Options
- **--typescript** - Enable TypeScript
- **--tailwind** - Enable Tailwind CSS
- **--eslint** - Enable ESLint
- **--src-dir** - Use src/ directory
- **--app** - Use App Router (default)
- **--no-git** - Skip Git initialization
- **--import-alias** - Custom import alias
- **--skip-install** - Skip package installation

#### Interactive Prompts
- Project name
- Use TypeScript
- Use ESLint
- Use Tailwind CSS
- Use src/ directory
- Use App Router
- Import alias configuration

### next CLI Commands

#### next dev

#### Description
Start development server with Fast Refresh.

#### Syntax
```bash
next dev [options]
```

#### Options
- **-p, --port <port>** - Specify port (default: 3000)
- **-H, --hostname <hostname>** - Specify hostname
- **--turbo** - Enable Turbopack
- **--experimental-debug** - Enable debug mode
- **--experimental-app** - Enable experimental App Router

#### next build

#### Description
Build application for production.

#### Syntax
```bash
next build [options]
```

#### Options
- **--debug** - Enable debug output
- **--profile** - Profile build performance
- **--experimental-app** - Build experimental App Router

#### next start

#### Description
Start production server.

#### Syntax
```bash
next start [options]
```

#### Options
- **-p, --port <port>** - Specify port (default: 3000)
- **-H, --hostname <hostname>** - Specify hostname
- **--keepAliveTimeout** - Keep-alive timeout

#### next export

#### Description
Export static HTML (for Static Exports).

#### Syntax
```bash
next export [options]
```

#### Options
- **-o, --outdir** - Output directory (default: out)
- **--threads** - Number of threads
- **--silent** - Silent output

#### next lint

#### Description
Run ESLint on the codebase.

#### Syntax
```bash
next lint [options]
```

#### Options
- **--dir** - Directory to lint
- **--fix** - Fix issues automatically
- **--cache** - Use cache
- **--format** - Output format

#### next telemetry

#### Description
Manage telemetry data collection.

#### Syntax
```bash
next telemetry [disable|enable|status]
```
```

--------------------------------

### Initialize NodeSDK with OTLP trace exporter

Source: https://nextjs.org/docs/app/guides/open-telemetry

Configure and start NodeSDK with OTLP HTTP trace exporter in instrumentation.node.ts. Sets up resource with service name, configures simple span processor for trace export, and initializes the SDK. This replaces @vercel/otel configuration while allowing custom modifications.

```TypeScript
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})

sdk.start()
```

--------------------------------

### Install @next/env Package

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

This command installs the `@next/env` package, which is used internally by Next.js to load environment variables from `.env*` files. It's useful for loading variables outside the Next.js runtime, like in ORM or test runner configurations.

```bash
npminstall@next/env
```

--------------------------------

### Install MDX dependencies for Next.js

Source: https://nextjs.org/docs/app/guides/mdx

Install the required packages to enable markdown and MDX processing in Next.js applications. The @next/mdx package and related dependencies allow local markdown files to be rendered as pages with .md or .mdx extensions.

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

--------------------------------

### Configure GET route handler caching in Next.js

Source: https://nextjs.org/docs/app/guides/upgrading/version-15

Route handlers with GET functions are no longer cached by default in Next.js 15. Use the 'dynamic' segment config option set to 'force-static' to enable caching for GET route handlers.

```JavaScript
// app/api/route.js
export const dynamic = 'force-static'
export async function GET() {}
```

--------------------------------

### Install eslint-config-prettier for Next.js (Terminal)

Source: https://nextjs.org/docs/app/api-reference/config/eslint

These commands provide instructions for installing the `eslint-config-prettier` package using various package managers (npm, yarn, pnpm, bun). This dependency is essential for resolving conflicts between ESLint's formatting rules and Prettier, ensuring a harmonious development environment.

```bash
npminstall--save-deveslint-config-prettier
yarnadd--deveslint-config-prettier
pnpmadd--save-deveslint-config-prettier
bunadd--deveslint-config-prettier
```

--------------------------------

### Update Next.js and enable Turbopack

Source: https://nextjs.org/docs/app/guides/local-development

Install the latest version of Next.js and run the development server with Turbopack bundler enabled for improved local development performance. Turbopack is integrated into Next.js and provides faster compilation times.

```bash
npm install next@latest
npm run dev --turbopack
```

--------------------------------

### Install Latest Next.js for App Directory Migration

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

To begin migrating to the `app` directory, update your Next.js project to version 13.4 or greater using this npm command. This ensures compatibility with the new `app` directory features and functionalities.

```bash
npm install next@latest
```

--------------------------------

### Install Sass package via npm

Source: https://nextjs.org/docs/app/guides/sass

Install the Sass package as a development dependency to enable Sass support in Next.js. This is a prerequisite for using .scss and .sass file extensions in your project.

```bash
npm install --save-dev sass
```

--------------------------------

### Install Playwright manually with npm, yarn, or pnpm

Source: https://nextjs.org/docs/app/guides/testing/playwright

Initialize Playwright in an existing Next.js project with interactive prompts that configure the testing framework and create a playwright.config.ts file for project-specific settings.

```bash
npm init playwright
# or
yarn create playwright
# or
pnpm create playwright
```

--------------------------------

### Conditionally Configure Next.js Based on Build Phase

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js

This example demonstrates how to apply different configuration options based on the Next.js build phase. By importing `PHASE_DEVELOPMENT_SERVER` from `next/constants`, you can define specific settings for development or production environments.

```javascript
// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
module.exports = (phase, { defaultConfig }) => {
if (phase === PHASE_DEVELOPMENT_SERVER) {
return {
/* development only config options here */
    }
  }
return {
/* config options for all phases except development here */
  }
}
```

--------------------------------

### CLI create-next-app

Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app

This CLI command initializes a new Next.js application. Users can specify project details, template options, and configurations directly through command-line arguments or interactive prompts.

```APIDOC
## CLI `create-next-app`

### Description
The `create-next-app` CLI allows you to create a new Next.js application using the default template or an example from a public GitHub repository. It is the easiest way to get started with Next.js.

### Method
CLI Command

### Endpoint
`npx create-next-app@latest [project-name] [options]`

### Parameters
#### Path Parameters
- **project-name** (string) - Optional - The name of the new Next.js project directory. If not provided, the CLI will prompt for it.

#### Query Parameters
*(Not applicable for this CLI tool)*

#### Request Body
*(CLI options are treated as parameters for this tool)*
- **-h, --help** (boolean) - Optional - Show all available options.
- **-v, --version** (boolean) - Optional - Output the version number.
- **--no-*** (boolean) - Optional - Negate default options. E.g. `--no-ts`.
- **--ts, --typescript** (boolean) - Optional - Initialize as a TypeScript project (default).
- **--js, --javascript** (boolean) - Optional - Initialize as a JavaScript project.
- **--tailwind** (boolean) - Optional - Initialize with Tailwind CSS config (default).
- **--eslint** (boolean) - Optional - Initialize with ESLint config.
- **--biome** (boolean) - Optional - Initialize with Biome config.
- **--no-linter** (boolean) - Optional - Skip linter configuration.
- **--app** (boolean) - Optional - Initialize as an App Router project.
- **--api** (boolean) - Optional - Initialize a project with only route handlers.
- **--src-dir** (boolean) - Optional - Initialize inside a `src/` directory.
- **--turbopack** (boolean) - Optional - Enable Turbopack by default for development.
- **--import-alias <alias-to-configure>** (string) - Optional - Specify import alias to use (default "@/*").
- **--empty** (boolean) - Optional - Initialize an empty project.
- **--use-npm** (boolean) - Optional - Explicitly tell the CLI to bootstrap the application using npm.
- **--use-pnpm** (boolean) - Optional - Explicitly tell the CLI to bootstrap the application using pnpm.
- **--use-yarn** (boolean) - Optional - Explicitly tell the CLI to bootstrap the application using Yarn.
- **--use-bun** (boolean) - Optional - Explicitly tell the CLI to bootstrap the application using Bun.
- **-e, --example [name] [github-url]** (string) - Optional - An example to bootstrap the app with. Can specify name or a GitHub URL.
- **--example-path <path-to-example>** (string) - Optional - Specify the path to the example separately.
- **--reset-preferences** (boolean) - Optional - Explicitly tell the CLI to reset any stored preferences.
- **--skip-install** (boolean) - Optional - Explicitly tell the CLI to skip installing packages.
- **--disable-git** (boolean) - Optional - Explicitly tell the CLI to disable git initialization.
- **--yes** (boolean) - Optional - Use previous preferences or defaults for all options.

### Request Example
```bash
npx create-next-app@latest my-next-app --typescript --tailwind --app
```

### Response
#### Success Response (CLI Output)
The command successfully creates a new Next.js project directory with the specified configuration. The output typically includes project creation messages, dependency installation logs, and instructions for navigating into the new project and starting the development server.

#### Response Example
```
✔ What is your project named? … my-next-app
✔ Would you like to use TypeScript? … Yes
✔ Which linter would you like to use? … ESLint
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack? (recommended) … No
✔ Would you like to customize the import alias (`@/*` by default)? … No

Creating a new Next.js app in /path/to/my-next-app.

Using npm.

Initializing project with template: default

Installing dependencies:
- react
- react-dom
- next

Adding dev dependencies:
- typescript
- @types/react
- @types/node
- eslint
- eslint-config-next

...

Success! Created my-next-app at /path/to/my-next-app
Inside that directory, you can run commands like:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd my-next-app
  npm run dev
```
```

--------------------------------

### Markdown to HTML conversion example

Source: https://nextjs.org/docs/app/guides/mdx

Demonstrates how markdown syntax is converted to valid HTML. Markdown provides a lightweight syntax for formatting text that includes support for bold text, links, and other common formatting elements.

```markdown
I **love** using [Next.js](https://nextjs.org/)
```

```html
<p>I <strong>love</strong> using <a href="https://nextjs.org/">Next.js</a></p>
```

--------------------------------

### Create Next.js Entrypoint Page with Optional Catch-All Route

Source: https://nextjs.org/docs/app/guides/migrating/from-vite

Creates the initial page.tsx file in an app/[[...slug]] directory to serve as the application entrypoint. This file imports global CSS and defines a static route parameter for the index route. The optional catch-all route segment ensures all application routes are directed to this page.

```TypeScript
import'../../index.css'
exportfunctiongenerateStaticParams() {
return [{ slug: [''] }]
}
exportdefaultfunctionPage() {
return'...'// We'll update this
}
```

--------------------------------

### Interpret Turbopack trace using trace command

Source: https://nextjs.org/docs/app/guides/local-development

Analyze the generated trace-turbopack file using the next internal trace command. This command starts a trace server that displays module compilation timing and relationships at https://trace.nextjs.org/.

```bash
next internal trace .next/trace-turbopack
```

--------------------------------

### API Reference: File-system conventions

Source: https://nextjs.org/docs/app/getting-started/project-structure

Explains the file-system conventions used in Next.js, detailing files like `instrumentation.js`, `Middleware`, `public`, and `src Directory`.

```APIDOC
## API Reference: File-system conventions

### Description
This section provides information about the file system conventions used by Next.js.

### File-system conventions
- instrumentation.js
- Middleware
- public
- src Directory
```

--------------------------------

### Data Fetching and Updating

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Comprehensive guide for fetching and updating data in Next.js applications. Covers server-side data fetching, mutations, caching strategies, and revalidation techniques.

```APIDOC
## Data Fetching and Updating

### Description
Handle server-side data fetching, mutations, and caching in Next.js applications using the App Router.

### Fetching Data

#### fetch() Function
- Extended fetch with automatic caching
- Supports cache and revalidate options
- Recommended for most data fetching scenarios

### Revalidation Strategies

#### revalidatePath(path: string)
- Revalidates data for a specific path
- Use after mutations to update cached data
- Scope: single path or layout level

#### revalidateTag(tag: string)
- Revalidates data by cache tag
- Use with tagged fetch calls
- More granular control than path-based revalidation

### Updating Data

#### Server Actions
- Use 'use server' directive to create server functions
- Call from Client Components via form actions
- Automatically handle mutations and revalidation

#### cacheLife(duration)
- Configure cache duration for specific data
- Control Time To Live (TTL) for cached content
- Supports dynamic and static content

### Caching and Revalidating
- Request memoization during a single request
- Data cache for persistent storage
- Full Route Cache for pre-rendered routes
- Dynamic rendering for real-time data
```

--------------------------------

### Import custom matchers in Jest setup file

Source: https://nextjs.org/docs/app/guides/testing/jest

Add import statement to jest.setup.ts to load @testing-library/jest-dom custom matchers. Note: For versions before v6.0, use 'extend-expect' path instead. This must be placed in the setup file referenced in jest.config.ts.

```TypeScript
import '@testing-library/jest-dom'
```

--------------------------------

### Route Handler Example

Source: https://nextjs.org/docs/app/api-reference/functions/revalidateTag

Example implementation of revalidateTag within a Next.js Route Handler. This demonstrates how to revalidate cached data via an API endpoint with query parameter validation.

```APIDOC
## Route Handler - revalidateTag Usage

### Description
Implementation of revalidateTag within a Route Handler to invalidate cached data via an API endpoint.

### File Location
`app/api/revalidate/route.ts`

### HTTP Method
GET

### Endpoint
`/api/revalidate`

### Query Parameters
- **tag** (string) - Optional - The cache tag to revalidate. Must be provided for successful revalidation.

### Code Example
```typescript
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  if (tag) {
    revalidateTag(tag)
    return Response.json({ revalidated: true, now: Date.now() })
  }
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing tag to revalidate'
  })
}
```

### Response Examples
#### Success (tag provided)
```json
{
  "revalidated": true,
  "now": 1234567890000
}
```

#### Error (missing tag)
```json
{
  "revalidated": false,
  "now": 1234567890000,
  "message": "Missing tag to revalidate"
}
```
```

--------------------------------

### Server Action Example

Source: https://nextjs.org/docs/app/api-reference/functions/revalidateTag

Example implementation of revalidateTag within a Next.js Server Action. This demonstrates how to revalidate cached data after performing an async operation like adding a post.

```APIDOC
## Server Action - revalidateTag Usage

### Description
Implementation of revalidateTag within a Server Action to invalidate cached posts after adding a new post.

### File Location
`app/actions.ts`

### Code Example
```typescript
'use server'
import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

### Usage Pattern
1. Import `revalidateTag` from 'next/cache'
2. Perform server-side operations (e.g., database operations)
3. Call `revalidateTag` with the appropriate tag to invalidate cached data
4. The cache will be invalidated on the next page visit for pages using that tag
```

--------------------------------

### ReactDOM Preload Resource Hint

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

Method signature and head output for ReactDOM.preload(). Starts loading a resource early in the page rendering lifecycle. Requires href string and options object with 'as' property specifying resource type.

```typescript
ReactDOM.preload(href: string, options: { as: string })
```

```html
<link rel="preload" href="..." as="..." />
```

--------------------------------

### Example of permanentRedirect in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/permanentRedirect

This example illustrates how to integrate `permanentRedirect` within an `async` Next.js Server Component. It fetches team data, and if the data is not found, it permanently redirects the user to the `/login` page. The function terminates rendering of the current route segment and implicitly handles the redirect.

```javascript
import { permanentRedirect } from'next/navigation'
async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const { id } = await params
  const team = await fetchTeam(id)
  if (!team) {
    permanentRedirect('/login')
  }
  // ...
}
```

--------------------------------

### CLI: create-next-app

Source: https://nextjs.org/docs/app/api-reference/edge

The `create-next-app` command is used to quickly set up a new Next.js project with a recommended folder structure, configuration, and optional TypeScript support.

```APIDOC
## CLI Command: create-next-app

### Description
The `create-next-app` command is a tool to initialize a new Next.js project. It simplifies the setup process by providing a basic project structure, configuration files, and dependencies, often interactively.

### Method
CLI Command

### Endpoint
Not applicable (local command-line tool)

### Parameters
#### Command Options
- **[project-name]** (string) - Required. The name of the directory where the new project will be created.
- **--ts, --typescript** (boolean, optional) - Initialize the project with TypeScript.
- **--js, --javascript** (boolean, optional) - Initialize the project with JavaScript (default).
- **--tailwind** (boolean, optional) - Initialize the project with Tailwind CSS.
- **--eslint** (boolean, optional) - Initialize the project with ESLint.
- **--app** (boolean, optional) - Initialize the project with the App Router (default in recent versions).
- **--src-dir** (boolean, optional) - Initialize the project with a `src/` directory.
- **--import-alias** (string, optional) - Specify the import alias for `@/*` (default is `@/*`).
- **--use-pnpm** (boolean, optional) - Use pnpm as the package manager.
- **--use-yarn** (boolean, optional) - Use Yarn as the package manager.
- **--use-npm** (boolean, optional) - Use npm as the package manager (default).
- **--no-git** (boolean, optional) - Do not initialize a git repository.
- **--no-install** (boolean, optional) - Do not run `npm install` after project creation.

#### Request Body
None (interactive prompts may gather input)

### Request Example
```bash
npx create-next-app@latest my-next-app
# Or with specific options:
npx create-next-app@latest my-ts-app --ts --eslint --tailwind --app
```

### Response
#### Success Response (0 exit code)
- **(CLI Output)** - A series of console messages indicating the creation of the project, installation of dependencies, and instructions on how to start the development server.

#### Response Example
```text
√ What is your project named? ... my-next-app
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Use App Router (recommended)? ... No / Yes
√ Would you like to customize the default import alias (@/*)? ... No / Yes

Creating a new Next.js app in /path/to/my-next-app.

Using npm.

Installing dependencies:
- react
- react-dom
- next

added 3 packages, and audited 4 packages in 2s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Success! Created my-next-app at /path/to/my-next-app

Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Bundles the app for production.

  npm start
    Starts the production server.

We suggest that you begin by typing:

  cd my-next-app
  npm run dev

Happy hacking!
```
```

--------------------------------

### Signup Server Action with User Creation and Password Hashing in Next.js

Source: https://nextjs.org/docs/app/guides/authentication

Implements a server action that validates form data, hashes the user password using bcrypt, inserts the user into the database, and returns appropriate success/error responses. This example demonstrates the core steps of user registration including data preparation and database insertion.

```TypeScript
export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  // ...
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })
  const user = data[0]
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
```

--------------------------------

### Upgrade to Next.js Canary Version

Source: https://nextjs.org/docs/app/getting-started/upgrading

Update your Next.js installation to the latest canary release to access experimental features and early versions. Ensure your project is on the latest stable version and working correctly before upgrading to canary.

```bash
npm install next@canary
```

--------------------------------

### API Reference: Configuration

Source: https://nextjs.org/docs/app/getting-started/project-structure

Provides information about the configuration options for `next.config.js`, TypeScript, and ESLint.

```APIDOC
## API Reference: Configuration

### Description
This section provides information about configuring your Next.js application.

### Configuration
- next.config.js Options
  - allowedDevOrigins
  - assetPrefix
  - basePath
  - bundlePagesRouterDependencies
  - compress
  - crossOrigin
  - devIndicators
  - distDir
  - env
  - eslint
  - exportPathMap
  - generateBuildId
  - generateEtags
  - headers
  - httpAgentOptions
  - images
  - onDemandEntries
  - optimizePackageImports
  - output
  - pageExtensions
  - poweredByHeader
  - productionBrowserSourceMaps
  - reactStrictMode
  - redirects
  - rewrites
  - Runtime Config
  - serverExternalPackages
  - trailingSlash
  - transpilePackages
  - turbo
  - typescript
  - urlImports
  - useLightningcss
  - webpack
  - webVitalsAttribution
- TypeScript
- ESLint
```

--------------------------------

### Install and Configure Tailwind CSS in Next.js

Source: https://nextjs.org/docs/app/getting-started/css

Install Tailwind CSS and PostCSS plugin for Next.js projects. Configure PostCSS to use Tailwind's plugin and import Tailwind directives in your global CSS file. This sets up the utility-first CSS framework for building custom designs.

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

--------------------------------

### Vitest Unit Test for Next.js Page Component

Source: https://nextjs.org/docs/app/guides/testing/vitest

An example unit test (`__tests__/page.test.tsx`) using Vitest and React Testing Library to verify the rendering of the `Page` component. It renders the component and asserts that a specific heading with the text 'Home' is present on the screen.

```typescript
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

--------------------------------

### Next.js API Overview

Source: https://nextjs.org/docs/app/getting-started/installation

Next.js provides a comprehensive set of APIs including server components, client hooks, configuration options, and utility functions for building full-stack applications. The framework supports both the App Router and Pages Router with extensive routing, rendering, and data fetching capabilities.

```APIDOC
## Next.js API Reference

### Core Features

#### Components
- Font - Optimize custom fonts
- Form - Form components for handling mutations
- Head - Manage document head elements
- Image - Optimized image component with automatic optimization
- Link - Client-side navigation component
- Script - Manage third-party scripts

#### Server Functions
- generateMetadata - Generate metadata for pages
- generateViewport - Configure viewport settings
- generateStaticParams - Pre-generate dynamic routes
- generateSitemaps - Generate XML sitemaps
- generateImageMetadata - Generate image metadata
- headers - Access request headers
- cookies - Manage cookies
- draftMode - Enable draft mode for content preview
- notFound - Trigger 404 response
- redirect - Server-side redirects
- permanentRedirect - Permanent server-side redirects
- forbidden - Return 403 Forbidden response
- unauthorized - Return 401 Unauthorized response

#### Client Hooks
- useRouter - Client-side router for navigation
- usePathname - Get current pathname
- useSearchParams - Access URL search parameters
- useParams - Get route parameters
- useSelectedLayoutSegment - Get current layout segment
- useSelectedLayoutSegments - Get all layout segments
- useLinkStatus - Check link status
- useReportWebVitals - Report Web Vitals metrics

#### Caching & Performance
- cacheLife - Configure cache lifetime
- cacheTag - Tag cached data for revalidation
- revalidatePath - Revalidate specific paths
- revalidateTag - Revalidate data by tag
- unstable_cache - Cache function results
- unstable_noStore - Opt-out of caching

#### Request/Response
- NextRequest - Extended Request object with Next.js utilities
- NextResponse - Extended Response object with Next.js utilities
- ImageResponse - Generate dynamic images

#### Utilities
- fetch - Enhanced fetch with caching
- userAgent - Parse user agent strings
- connection - Database connection utilities
- after - Execute code after response
- unstable_rethrow - Rethrow errors

### File System Conventions

#### Special Files
- route.js - API route handlers
- layout.js - Layout components
- page.js - Page components
- template.js - Template components
- error.js - Error boundary
- not-found.js - 404 page
- unauthorized.js - 401 page
- middleware.js - Request middleware
- instrumentation.js - Instrumentation setup

#### Metadata Files
- favicon - Favicon files
- icon - App icon
- apple-icon - Apple touch icon
- manifest.json - Web app manifest
- robots.txt - Search engine directives
- sitemap.xml - XML sitemap
- opengraph-image - OG image
- twitter-image - Twitter card image

### Configuration (next.config.js)

#### Build & Output
- output - Output mode (standalone, export)
- distDir - Build output directory
- assetPrefix - CDN asset prefix
- basePath - Base path for application
- trailingSlash - Trailing slash behavior
- pageExtensions - Page file extensions
- generateBuildId - Custom build ID
- exportPathMap - Export path mapping

#### Performance
- compress - Gzip compression
- generateEtags - Generate ETags
- productionBrowserSourceMaps - Source maps in production
- cssChunking - CSS code splitting
- inlineCss - Inline critical CSS
- cacheComponents - Component caching
- cacheHandler - Custom cache handler
- optimizePackageImports - Package import optimization
- transpilePackages - Transpile packages

#### Features
- reactStrictMode - React strict mode
- reactCompiler - React compiler support
- typescript - TypeScript configuration
- eslint - ESLint configuration
- mdxRs - MDX with Rust compiler
- appDir - Enable App Router
- ppr - Partial Pre-rendering
- viewTransition - View transitions API
- typedRoutes - Typed route support

#### Routing & Redirects
- headers - Custom headers
- redirects - URL redirects
- rewrites - URL rewrites
- authInterrupts - Authentication interrupts
- htmlLimitedBots - Bot crawling control

#### Environment & Logging
- env - Environment variables
- logging - Build logging configuration
- devIndicators - Development indicators
- browserDebugInfoInTerminal - Debug info in terminal

#### Advanced
- serverActions - Server actions configuration
- serverExternalPackages - External packages for server
- serverComponentsHmrCache - HMR cache configuration
- httpAgentOptions - HTTP agent options
- crossOrigin - CORS configuration
- poweredByHeader - Powered-by header
- webpack - Webpack configuration
- turbopack - Turbopack configuration
- turbopackPersistentCaching - Turbopack caching
- staleTimes - Stale time configuration
- taint - Taint sensitive data
- urlImports - URL imports
- useCache - Cache usage
- useLightningcss - Lightning CSS support
- allowedDevOrigins - Allowed dev origins
- reactMaxHeadersLength - Max header length
- webVitalsAttribution - Web Vitals attribution

### CLI Commands

#### create-next-app
Generate new Next.js project with TypeScript, ESLint, Tailwind CSS, and more.

#### next CLI
- next dev - Development server
- next build - Production build
- next start - Start production server
- next export - Static export
- next lint - Run ESLint
- next telemetry - Telemetry management

### Routing

#### File-based Routing
- Dynamic Routes - [id].js syntax
- Route Groups - (group) folder syntax
- Catch-all Routes - [...slug].js syntax
- Optional Catch-all - [[...slug]].js syntax
- Route Segment Config - Configuration per route

#### Navigation
- Linking and Navigating - Link component and useRouter
- Custom App - _app.js customization
- Custom Document - _document.js customization
- Custom Errors - error.js and _error.js
- API Routes - /api routes

### Rendering Strategies

#### Server-side Rendering (SSR)
- getServerSideProps - Fetch data per request
- Dynamic rendering based on request

#### Static Site Generation (SSG)
- getStaticProps - Build-time data fetching
- getStaticPaths - Pre-generate paths
- Incremental Static Regeneration (ISR)

#### Client-side Rendering (CSR)
- SPA-like applications
- Client-side data fetching

#### Automatic Static Optimization
- Hybrid rendering support
- Mixed SSG and SSR

### Data Fetching

#### Methods
- getStaticProps - Static generation
- getStaticPaths - Generate dynamic paths
- getServerSideProps - Server-side rendering
- Forms and Mutations - Server actions
- Client-side Fetching - useEffect and fetch
- getInitialProps - Legacy data fetching

### Edge Runtime
- Cloudflare Workers support
- Vercel Edge Functions
- Global edge deployment

### Turbopack
- Next-generation bundler
- Faster builds and development
- Rust-based compilation
```

--------------------------------

### API Reference: Configuration

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Details the configuration options available in `next.config.js` and other configuration-related topics like TypeScript and ESLint.

```APIDOC
## Configuration

### Description
This section details the configuration options available in `next.config.js`.

### Configuration Options
- next.config.js Options
  - allowedDevOrigins
  - assetPrefix
  - basePath
  - bundlePagesRouterDependencies
  - compress
  - crossOrigin
  - devIndicators
  - distDir
  - env
  - eslint
  - exportPathMap
  - generateBuildId
  - generateEtags
  - headers
  - httpAgentOptions
  - images
  - onDemandEntries
  - optimizePackageImports
  - output
  - pageExtensions
  - poweredByHeader
  - productionBrowserSourceMaps
  - reactStrictMode
  - redirects
  - rewrites
  - Runtime Config
  - serverExternalPackages
  - trailingSlash
  - transpilePackages
  - turbo
  - typescript
  - urlImports
  - useLightningcss
  - webpack
  - webVitalsAttribution
- TypeScript
- ESLint
```

--------------------------------

### Create Next.js Server Component for App Router with Data Fetching (page.tsx)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This example shows how to create a default Server Component (`page.tsx`) in the Next.js `app` directory, which acts as the entry point for a route. It demonstrates importing and rendering a Client Component, and performing data fetching directly within the Server Component using `async/await` before passing the fetched data as props to the Client Component.

```TypeScript
// Import your Client Component
import HomePage from './home-page';

async function getPosts() {
  const res = await fetch('https://...');
  const posts = await res.json();
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();

  // Forward fetched data to your Client Component
  return <HomePage recentPosts={recentPosts} />;
}
```

```JavaScript
// Import your Client Component
import HomePage from './home-page';

async function getPosts() {
  const res = await fetch('https://...');
  const posts = await res.json();
  return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();

  // Forward fetched data to your Client Component
  return <HomePage recentPosts={recentPosts} />;
}
```

--------------------------------

### GET Route Handler with Context Parameters

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

Illustrates how to use the `RouteContext` helper in TypeScript to extract and type path parameters from the URL in a `GET` request, providing a type-safe way to access dynamic segments.

```APIDOC
## GET /app/users/[id]/route.ts

### Description
This Route Handler retrieves a specific user ID from the path parameters of the URL (e.g., `/users/123`) using the `RouteContext` helper and returns it in the JSON response.

### Method
GET

### Endpoint
`/app/users/[id]/route.ts`

### Parameters
#### Path Parameters
- **id** (string) - Required - The unique identifier for the user to be retrieved.

### Request Body
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the user that was requested from the path parameters.

#### Response Example
```json
{
  "id": "user123"
}
```

### Code Example
```typescript
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```
```

--------------------------------

### Load Environment Variables in Jest Global Setup - Next.js

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

Demonstrates how to load Next.js environment variables in a Jest global setup file using the `loadEnvConfig` function from the `@next/env` package. This ensures that environment variables are loaded the same way Next.js does during test execution. The function takes the project directory as a parameter and must be called before running tests.

```javascript
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from '@next/env'

export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
```

--------------------------------

### Create Next.js Home Page with Navigation Link

Source: https://nextjs.org/docs/app/guides/testing/cypress

This JavaScript code defines the `app/page.js` for a Next.js application, creating a simple home page. It includes a heading and a `Link` component, which serves as an input for navigation, directing users to the `/about` page for E2E navigation testing.

```javascript
import Link from'next/link'
export default function Page() {
return (
    <div>
      <h1>Home</h1>
      <Linkhref="/about">About</Link>
    </div>
  )
}
```

--------------------------------

### Configure Apple Web App metadata with startup images in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

Sets up Apple Web App configuration including iTunes app metadata, web app title, status bar styling, and responsive startup images for different device dimensions. Supports both simple image paths and media query-based responsive images.

```javascript
export const metadata = {
  itunes: {
    appId: 'myAppStoreID',
    appArgument: 'myAppArgument'
  },
  appleWebApp: {
    title: 'Apple Web App',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
        media: '(device-width: 768px) and (device-height: 1024px)'
      }
    ]
  }
}
```

--------------------------------

### Error Handling

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Comprehensive guide for implementing error handling in Next.js applications using error.js, not-found.js, and global error boundaries.

```APIDOC
## Error Handling

### Description
Implement comprehensive error handling in Next.js applications with error boundaries and custom error pages.

### error.js

#### Description
Create error UI boundary for specific route segments.

#### Features
- Automatically wraps route segment
- Catches errors in Server and Client Components
- Provides error and reset function
- Doesn't catch errors in layout

#### Implementation
- Must be Client Component ('use client')
- Props: error (Error object), reset (function)
- Display fallback UI or error details

### not-found.js

#### Description
Render UI when route not found.

#### Triggers
- notFound() function called
- Route doesn't exist
- Returns 404 status

#### Features
- Automatically applied to route segment
- Can access metadata
- Server Component

### Global Error Handling

#### global-error.js
- Catch errors in root layout
- Must include html and body tags
- Last resort error boundary

### Error Functions

#### notFound()
- Throw error to render not-found.js
- Used in Server Components
- Returns 404 status

#### forbidden()
- Throw error for 403 access denied
- Render forbidden UI

#### unauthorized()
- Throw error for 401 unauthorized
- Render unauthorized UI

#### unstable_rethrow()
- Re-throw error up the chain
- Propagate to parent error boundary

### Best Practices
- Place error.js at appropriate segment level
- Provide meaningful error messages
- Include recovery options (reset button)
- Log errors for monitoring
- Test error scenarios during development
```

--------------------------------

### Load Next.js Environment Variables for Testing (JavaScript)

Source: https://nextjs.org/docs/app/guides/environment-variables

This code snippet demonstrates how to programmatically load Next.js environment variables in a testing setup, such as a Jest global setup file. It leverages the `loadEnvConfig` function from the `@next/env` package to ensure that environment variables are loaded consistently with Next.js's behavior, especially useful for unit tests.

```javascript
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from'@next/env'
export default async () => {
const projectDir = process.cwd()
loadEnvConfig(projectDir)
}
```

--------------------------------

### Configure Jest with custom matchers setup

Source: https://nextjs.org/docs/app/guides/testing/jest

Add setupFilesAfterEnv configuration to jest.config.ts to load custom matchers from @testing-library/jest-dom before running tests. This enables convenient assertion methods like .toBeInTheDocument() across all test files.

```TypeScript
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
```

--------------------------------

### Example React Component with Console Output for browserDebugInfoInTerminal

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/browserDebugInfoInTerminal

This React component demonstrates a simple button that logs 'Hello World' to the console upon click. When `browserDebugInfoInTerminal` is enabled, this client-side `console.log` message will be forwarded to the Next.js dev server terminal, including its source location by default.

```TSX
'use client'

export default function Home() {
  return (
    <button
      type="button"
      onClick={() => {
        console.log('Hello World')
      }}
    >
      Click me
    </button>
  )
}
```

--------------------------------

### Create Home Page Component in TypeScript

Source: https://nextjs.org/docs/app/getting-started/installation

Creates a basic home page component (app/page.tsx) that displays initial content when users visit the application root. This file demonstrates the basic structure of a Next.js page component using the App Router.

```typescript
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

--------------------------------

### Define a Basic Next.js GET Route Handler

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

This code snippet defines a fundamental Route Handler for `GET` requests targeting the `/api` path. It follows the `route.ts` or `route.js` file convention within the App Router, illustrating the basic structure for handling incoming HTTP requests in Next.js.

```TypeScript
export function GET(request: Request) {}
```

```JavaScript
export function GET(request: Request) {}
```

--------------------------------

### Link Between Pages in Next.js

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Demonstrates using the Next.js Link component to create navigation between routes with prefetching and client-side navigation. This example generates a list of blog posts with links to individual post pages, replacing the standard HTML anchor tag.

```typescript
import Link from 'next/link'

export default async function Post({ post }) {
  const posts = await getPosts()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

--------------------------------

### Configure npm scripts for Cypress testing and CI

Source: https://nextjs.org/docs/app/guides/testing/cypress

Defines npm scripts in package.json for running Cypress tests both interactively and headlessly. Includes e2e and component testing scripts with appropriate flags for local development and continuous integration environments.

```JSON
{
  "scripts": {
    "e2e": "start-server-and-test dev http://localhost:3000 \"cypress open --e2e\"",
    "e2e:headless": "start-server-and-test dev http://localhost:3000 \"cypress run --e2e\"",
    "component": "cypress open --component",
    "component:headless": "cypress run --component"
  }
}
```

--------------------------------

### Define a GET Route Handler in Next.js App Router

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This code demonstrates how to create a basic GET Route Handler in the `app` directory of a Next.js application. Route Handlers replace API Routes from the `pages/api` directory and utilize the Web Request and Response APIs for handling custom requests.

```TypeScript
export async function GET(request:Request) {}
```

--------------------------------

### App Router: Directives

Source: https://nextjs.org/docs/app/getting-started/project-structure

Information about the directives `use cache`, `use client`, and `use server` available in the App Router.

```APIDOC
## App Router: Directives

### Description
This section documents directives available within the Next.js App Router.

### Directives
- use cache
- use client
- use server
```

--------------------------------

### Define Basic GET Route Handler

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

Create a basic Route Handler using an async GET function that accepts a Request object. Route Handlers are defined in route.js|ts files inside the app directory and serve as the equivalent of API Routes from the pages directory.

```typescript
export async function GET(request: Request) {}
```

--------------------------------

### Environment Variables

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Guide for using environment variables in Next.js applications for secure configuration and secrets management.

```APIDOC
## Environment Variables

### Description
Manage environment-specific configuration and secrets in Next.js applications.

### .env Files

#### .env.local
- Local environment variables
- Not committed to git
- Highest priority
- Supports comments with #

#### .env
- Default environment variables
- Committed to repository
- Lowest priority

#### .env.production
- Production-specific variables
- Used during build and production

#### .env.development
- Development-specific variables
- Used during development

#### .env.test
- Test-specific variables
- Used during testing

### Variable Prefixes

#### NEXT_PUBLIC_
- Exposed to browser
- Available in Client Components
- Example: NEXT_PUBLIC_API_URL

#### No Prefix
- Server-only variables
- Only available in Server Components
- Secure for secrets

### Accessing Variables

#### Server-side
```
process.env.DATABASE_URL
process.env.API_SECRET
```

#### Client-side
```
process.env.NEXT_PUBLIC_API_URL
```

### Best Practices
- Never expose secrets with NEXT_PUBLIC_
- Use .env.local for sensitive data
- Don't commit .env.local to git
- Document required variables
- Use strong, random secrets
- Rotate secrets regularly
- Keep separate files per environment

### Loading Order
1. .env.local
2. .env.{NODE_ENV}.local
3. .env.{NODE_ENV}
4. .env
5. System environment variables
```

--------------------------------

### GET /api/stream-web-api

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Demonstrates how to implement server-side streaming using raw Web API `ReadableStream` to send data in chunks over time, simulating a live data feed.

```APIDOC
## GET /api/stream-web-api

### Description
Demonstrates how to implement server-side streaming using raw Web API `ReadableStream` to send data in chunks over time, simulating a live data feed.

### Method
GET

### Endpoint
/api/stream-web-api

### Parameters
#### Path Parameters
- No Path Parameters

#### Query Parameters
- No Query Parameters

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (200)
A streaming response where data is sent in intervals, encoded as HTML paragraphs.

#### Response Example
```
<p>One</p>
<p>Two</p>
<p>Three</p>
```
(content streamed over time)
```

--------------------------------

### Configuration Options (next.config.js)

Source: https://nextjs.org/docs/app/guides

Detailed reference for all available next.config.js configuration options to customize Next.js build behavior, performance, and features.

```APIDOC
# next.config.js Configuration Options

## Available Options
- **allowedDevOrigins** - Allowed origins for development
- **assetPrefix** - CDN prefix for assets
- **basePath** - Base path for application routing
- **bundlePagesRouterDependencies** - Bundle dependencies for Pages Router
- **compress** - Enable gzip compression
- **crossOrigin** - Cross-origin attribute for resources
- **devIndicators** - Development indicators configuration
- **distDir** - Build output directory
- **env** - Environment variables
- **eslint** - ESLint configuration
- **exportPathMap** - Custom export path mapping
- **generateBuildId** - Custom build ID generation
- **generateEtags** - Generate ETags for responses
- **headers** - Custom HTTP headers
- **httpAgentOptions** - HTTP agent configuration
- **images** - Image optimization settings
- **onDemandEntries** - On-demand entry configuration
- **optimizePackageImports** - Optimize package imports
- **output** - Build output configuration
- **pageExtensions** - Supported page file extensions
- **poweredByHeader** - X-Powered-By header
- **productionBrowserSourceMaps** - Production source maps
- **reactStrictMode** - React Strict Mode
- **redirects** - URL redirects configuration
- **rewrites** - URL rewrites configuration
- **Runtime Config** - Runtime configuration values
- **serverExternalPackages** - External server packages
- **trailingSlash** - Trailing slash behavior
- **transpilePackages** - Packages to transpile
- **turbo** - Turbopack configuration
- **typescript** - TypeScript configuration
- **urlImports** - URL imports support
- **useLightningcss** - Use Lightning CSS
- **webpack** - Webpack configuration
- **webVitalsAttribution** - Web Vitals attribution
```

--------------------------------

### Import Environment Configuration in ORM Config (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

This example demonstrates how to import the environment configuration file (which loads variables via `@next/env`) into an ORM configuration file. This ensures that environment variables like `DATABASE_URL` are available when the ORM initializes.

```typescript
import'./envConfig.ts'
exportdefaultdefineConfig({
  dbCredentials: {
    connectionString:process.env.DATABASE_URL!,
  },
})
```

--------------------------------

### Create instrumentation.ts with register function for OpenTelemetry

Source: https://nextjs.org/docs/app/guides/instrumentation

Set up basic instrumentation by creating an instrumentation.ts file in the root directory (or src folder) and exporting a register function that initializes monitoring tools like OpenTelemetry. The register function is called once when a new Next.js server instance starts.

```typescript
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('next-app')
}
```

--------------------------------

### API Reference: Functions

Source: https://nextjs.org/docs/app/getting-started/project-structure

Details about Next.js functions such as `getInitialProps`, `getServerSideProps`, `getStaticPaths`, `getStaticProps`, `NextRequest`, `NextResponse`, `useAmp`, `useReportWebVitals`, `useRouter`, and `userAgent`.

```APIDOC
## API Reference: Functions

### Description
This section details various functions available in Next.js for data fetching, routing, and more.

### Functions
- getInitialProps
- getServerSideProps
- getStaticPaths
- getStaticProps
- NextRequest
- NextResponse
- useAmp
- useReportWebVitals
- useRouter
- userAgent
```

--------------------------------

### Load Polyfills with Static and Dynamic Imports

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

Configure polyfill loading in instrumentation-client.ts using static imports for immediate execution and dynamic imports for conditional polyfills based on feature detection. This example demonstrates loading a ResizeObserver polyfill only when the native implementation is unavailable, preventing unnecessary code execution.

```typescript
import './lib/polyfills'
if (!window.ResizeObserver) {
  import('./lib/polyfills/resize-observer').then((mod) => {
    window.ResizeObserver = mod.default
  })
}
```

--------------------------------

### Configure cypress:open Script in package.json

Source: https://nextjs.org/docs/app/guides/testing/cypress

This JSON snippet shows how to add a `cypress:open` script to your `package.json` file under the `scripts` object. This script allows you to conveniently launch the Cypress test runner directly from your terminal, streamlining the testing workflow.

```json
{
"scripts": {
"dev":"next dev",
"build":"next build",
"start":"next start",
"lint":"eslint",
"cypress:open":"cypress open"
  }
}
```

--------------------------------

### GET /rss.xml

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Generates and serves an RSS 2.0 feed as XML. It fetches data from an external RSS endpoint, constructs the XML, and sets the 'Content-Type' header to 'application/xml'.

```APIDOC
## GET /rss.xml

### Description
This endpoint generates and serves an RSS 2.0 feed as XML. It fetches data from an external RSS endpoint (commented as `/* rss endpoint */`), constructs the XML string based on the fetched data, and returns it with the appropriate `application/xml` content type header.

### Method
GET

### Endpoint
/rss.xml

### Parameters
#### Path Parameters
- No path parameters.

#### Query Parameters
- No query parameters.

#### Request Body
- No request body required.

### Request Example
N/A

### Response
#### Success Response (200 OK)
- Returns an XML string representing an RSS 2.0 feed.
- Headers: `Content-Type: application/xml`

#### Response Example
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>My Awesome Blog</title>
 <description>The latest posts from my blog</description>
 <link>https://example.com/blog</link>
 <copyright>2023 My Blog</copyright>
 <item>
    <title>First Post</title>
    <description>This is my very first blog post.</description>
    <link>https://example.com/blog/first-post</link>
    <pubDate>Mon, 01 Jan 2023 00:00:00 GMT</pubDate>
    <guid isPermaLink="false">unique-id-1</guid>
 </item>
 <item>
    <title>Second Post</title>
    <description>Another exciting update.</description>
    <link>https://example.com/blog/second-post</link>
    <pubDate>Tue, 02 Jan 2023 00:00:00 GMT</pubDate>
    <guid isPermaLink="false">unique-id-2</guid>
 </item>
</channel>
</rss>
```
```

--------------------------------

### Configuration Options

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Complete reference for Next.js configuration in next.config.js including build options, optimization settings, experimental features, and environment-specific configurations.

```APIDOC
## next.config.js Configuration Options

### Build and Output

#### output
- **'standalone'** - Standalone executable
- **'export'** - Static HTML export
- **undefined** - Default Node.js server

#### distDir
- Type: string
- Default: '.next'
- Build output directory

#### assetPrefix
- Type: string
- CDN or prefix for static assets

#### basePath
- Type: string
- Base path for application
- Example: '/app'

### Image Optimization

#### images
- **domains** (array) - Allowed image domains
- **formats** (array) - Image formats ['image/webp', 'image/avif']
- **deviceSizes** (array) - Device widths for responsive images
- **imageSizes** (array) - Image sizes for srcset
- **minimumCacheTTL** (number) - Minimum cache time in seconds
- **dangerouslyAllowSVG** (boolean) - Allow SVG images
- **contentSecurityPolicy** (string) - CSP for SVG
- **unoptimized** (boolean) - Disable optimization

### Headers, Redirects, and Rewrites

#### headers()
```javascript
async function headers() {
  return [
    {
      source: '/api/(.*)',
      headers: [{
        key: 'X-Custom-Header',
        value: 'value'
      }]
    }
  ]
}
```

#### redirects()
```javascript
async function redirects() {
  return [
    {
      source: '/old',
      destination: '/new',
      permanent: true
    }
  ]
}
```

#### rewrites()
```javascript
async function rewrites() {
  return {
    beforeFiles: [],
    afterFiles: [],
    fallback: []
  }
}
```

### Performance and Optimization

#### compress
- Type: boolean
- Default: true
- Enable gzip compression

#### generateEtags
- Type: boolean
- Default: true
- Generate ETags for static pages

#### onDemandEntries
- **maxInactiveAge** (number) - Milliseconds before disposal
- **pagesBufferLength** (number) - Pages to keep in memory

#### optimizePackageImports
- Type: array
- Packages to optimize imports from

#### bundlePagesRouterDependencies
- Type: boolean
- Bundle pages router dependencies

### Experimental Features

#### experimental
- **allowedDevOrigins** (array) - Allowed development origins
- **httpAgentOptions** (object) - HTTP agent options
- **isrMemoryCacheSize** (number) - ISR cache size in bytes
- **serverExternalPackages** (array) - Packages to keep external
- **turbotrace** (object) - Turbopack tracing options

### Development and Debugging

#### devIndicators
- **buildActivity** (boolean) - Show build activity
- **buildActivityPosition** (string) - 'bottom-right', 'bottom-left', etc.

#### productionBrowserSourceMaps
- Type: boolean
- Default: false
- Generate source maps for production

#### reactStrictMode
- Type: boolean
- Default: true
- Enable React strict mode

### File and Module Handling

#### pageExtensions
- Type: array
- Default: ['tsx', 'ts', 'jsx', 'js']
- Page file extensions

#### transpilePackages
- Type: array
- Packages to transpile

#### webpack
- Type: function
- Custom webpack configuration

#### typescript
- **tsconfigPath** (string) - tsconfig.json path
- **ignoreProductionErrors** (boolean) - Ignore TypeScript errors in build

### Internationalization

#### i18n
- **locales** (array) - Supported locales
- **defaultLocale** (string) - Default locale
- **localeDetection** (boolean) - Auto-detect locale
- **domains** (array) - Domain-based locale routing

### Security and Headers

#### poweredByHeader
- Type: boolean
- Default: true
- Add 'X-Powered-By' header

#### crossOrigin
- Type: string
- CORS policy: 'anonymous', 'use-credentials'

#### env
- Type: object
- Environment variables exposed to browser

#### eslint
- **dirs** (array) - Directories to lint
- **ignoreDuringBuilds** (boolean) - Ignore during build

### Advanced Configuration

#### webpack
- Function to customize webpack configuration
- Receives (config, { dev, isServer })

#### serverExternalPackages
- Array of packages to exclude from bundling

#### Turbopack Configuration
- **turbo** (object) - Turbopack-specific options

#### Runtime Config
- **publicRuntimeConfig** - Exposed to client
- **serverRuntimeConfig** - Server-only variables
```

--------------------------------

### Create Next.js Home page component with TypeScript

Source: https://nextjs.org/docs/app/guides/testing/playwright

Define a simple home page component in the app directory that exports a Page function with navigation links. This serves as the starting point for E2E testing navigation functionality.

```typescript
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}
```

--------------------------------

### GET /api/redirect

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Demonstrates how to perform an HTTP redirect from a Next.js API route handler, directing the client to a specified external URL.

```APIDOC
## GET /api/redirect

### Description
Demonstrates how to perform an HTTP redirect from a Next.js API route handler, directing the client to a specified external URL.

### Method
GET

### Endpoint
/api/redirect

### Parameters
#### Path Parameters
- No Path Parameters

#### Query Parameters
- No Query Parameters

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (307 Temporary Redirect)
The request will be redirected to 'https://nextjs.org/'.

#### Response Example
(No direct response body for a redirect; the browser follows the Location header)
```

--------------------------------

### Configure Jest for Next.js with next/jest

Source: https://nextjs.org/docs/app/guides/testing/jest

Update your `jest.config.ts` file to use `next/jest`, which provides automatic configuration for Next.js projects. This transformer handles essential setups like using the Next.js Compiler and mocking stylesheets and images.

```TypeScript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
// Add more setup options before each test is run
// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

--------------------------------

### Generate Turbopack trace file for performance analysis

Source: https://nextjs.org/docs/app/guides/local-development

Create a Turbopack trace file by running the development server with the NEXT_TURBOPACK_TRACING environment variable enabled. This generates a trace-turbopack file in the .next folder that can be analyzed to identify performance bottlenecks during compilation.

```bash
NEXT_TURBOPACK_TRACING=1 npm run dev
```

--------------------------------

### CLI Commands

Source: https://nextjs.org/docs/app/getting-started/error-handling

Command-line interface tools for Next.js development, including project creation, development server, and build commands. Essential utilities for project scaffolding and deployment.

```APIDOC
## Next.js CLI Commands

### create-next-app
- **Purpose**: Scaffold new Next.js project
- **Usage**: `npx create-next-app@latest [project-name]`
- **Options**:
  - `--typescript` - Use TypeScript
  - `--tailwind` - Include Tailwind CSS
  - `--eslint` - Include ESLint
  - `--app` - Use App Router
  - `--import-alias` - Configure import alias
  - `--no-git` - Skip Git initialization
  - `--no-install` - Skip dependency installation
- **Example**:
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

### next CLI

#### next dev
- **Purpose**: Start development server
- **Usage**: `next dev`
- **Options**:
  - `-p, --port <port>` - Port number (default: 3000)
  - `-H, --hostname <hostname>` - Hostname (default: localhost)
  - `--experimental-app-only` - App Router only
  - `--experimental-https` - Enable HTTPS
- **Example**:
```bash
next dev -p 3001 --hostname 0.0.0.0
```

#### next build
- **Purpose**: Build application for production
- **Usage**: `next build`
- **Output**: Optimized production build in .next directory
- **Options**:
  - `--profile` - Enable profiling
  - `--debug` - Show debug output
- **Example**:
```bash
next build
```

#### next start
- **Purpose**: Start production server
- **Usage**: `next start`
- **Prerequisites**: Must run `next build` first
- **Options**:
  - `-p, --port <port>` - Port number (default: 3000)
  - `-H, --hostname <hostname>` - Hostname (default: localhost)
  - `--experimental-app-only` - App Router only
- **Example**:
```bash
next start -p 3000
```

#### next export
- **Purpose**: Export static HTML
- **Usage**: `next export`
- **Prerequisites**: Configure `output: 'export'` in next.config.js
- **Output**: Static HTML files in out directory

#### next telemetry
- **Purpose**: Manage telemetry data collection
- **Usage**: `next telemetry [status|enable|disable]`
- **Example**:
```bash
next telemetry disable
```

#### next lint
- **Purpose**: Run ESLint
- **Usage**: `next lint`
- **Options**:
  - `--dir <dir>` - Directory to lint
  - `--file <file>` - Specific file to lint
  - `--format <format>` - Output format
  - `--fix` - Fix issues automatically
- **Example**:
```bash
next lint --fix
```

### Common Workflows

#### Development Setup
```bash
# Create new project
npx create-next-app@latest my-app
cd my-app

# Start development server
next dev

# Server runs on http://localhost:3000
```

#### Production Deployment
```bash
# Build for production
next build

# Start production server
next start
```

#### Static Export
```bash
# Configure in next.config.js
module.exports = {
  output: 'export'
}

# Export static site
next build
next export
```
```

--------------------------------

### CLI next dev

Source: https://nextjs.org/docs/app/api-reference/cli/next

Starts the Next.js application in development mode, enabling features like Hot Module Reloading (HMR) and detailed error reporting for an efficient development workflow.

```APIDOC
## CLI Command: `next dev`

### Description
Starts the Next.js application in development mode, enabling features like Hot Module Reloading (HMR), error reporting, and asset compilation for an efficient and productive development workflow.

### Command
`next dev`

### Arguments / Options
- **[directory]** (string) - Optional - Specifies the directory where the Next.js application is located. If not provided, the current working directory is assumed.
- **--turbopack** (boolean) - Optional - Starts the development server using Turbopack for faster compilation.
- **-p, --port <port>** (number) - Optional - Specifies the port number on which the application should listen. Defaults to `3000`. Can also be configured via the `PORT` environment variable.
- **-H, --hostname <hostname>** (string) - Optional - Specifies the hostname or IP address on which the application should listen. Useful for making the application accessible from other devices on the network. Defaults to `0.0.0.0`.
- **--experimental-https** (boolean) - Optional - Starts the development server with HTTPS enabled, generating a self-signed certificate for local development.
- **--experimental-https-key <path>** (string) - Optional - Path to a custom HTTPS key file (`.key`) to be used with `--experimental-https`.
- **--experimental-https-cert <path>** (string) - Optional - Path to a custom HTTPS certificate file (`.crt`) to be used with `--experimental-https`.
- **--experimental-https-ca <path>** (string) - Optional - Path to a custom HTTPS Certificate Authority (CA) file (`.pem`) to be used with `--experimental-https`.
- **--experimental-upload-trace <traceUrl>** (string) - Optional - Reports a subset of the debugging trace to a remote HTTP URL for analysis.

### Example Usage
```bash
npx next dev
npx next dev --port 8080
npx next dev my-app --turbopack
npx next dev --experimental-https
```

### Output
#### Success Output (CLI Output)
- **status_message** (string) - Indicates the server's status, including the listening address and port.
- **info_messages** (string) - Provides information such as the Next.js version in use.

#### Output Example
```text
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - using Next.js 14.x.x
event - compiled client and server successfully in 123ms (8 modules)
```
```

--------------------------------

### Building Your Application - Data Fetching

Source: https://nextjs.org/docs/app/guides

Multiple data fetching strategies for Next.js including static props, server-side props, static paths, and client-side fetching.

```APIDOC
# Data Fetching

## getStaticProps
Fetch data at build time for static generation.

**Signature:**
```
export async function getStaticProps(context) {
  // Fetch data from external API
  return {
    props: { data },
    revalidate: 60 // ISR: revalidate every 60 seconds
  }
}
```

**Parameters:**
- context - Build context with params and locale

**Returns:**
- props - Page props
- revalidate - Revalidation interval in seconds
- notFound - Return 404 page
- redirect - Redirect to another route

## getStaticPaths
Specify dynamic routes to pre-render at build time.

**Signature:**
```
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking'
  }
}
```

**Returns:**
- paths - Array of pre-rendered paths
- fallback - 'blocking' | 'true' | false

## Forms and Mutations
Handle form submissions and data updates.

## getServerSideProps
Fetch data on each request for server-side rendering.

**Signature:**
```
export async function getServerSideProps(context) {
  return {
    props: { data },
    revalidate: 60
  }
}
```

**Parameters:**
- context - Request context with params, query, req, res

## Client-side Fetching
Fetch data in the browser using hooks and libraries.

**Libraries:**
- fetch API
- axios
- SWR
- React Query
```

--------------------------------

### Google Fonts Usage Example

Source: https://nextjs.org/docs/app/api-reference/components/font

Demonstrates how to import and use Google Fonts in a Next.js application with the next/font/google module, including automatic self-hosting and no external browser requests.

```APIDOC
## Google Fonts Import

### Description
Load Google Fonts with automatic self-hosting. CSS and font files are downloaded at build time and self-hosted with static assets. No requests are sent to Google by the browser.

### Implementation

#### File: app/layout.tsx
```typescript
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Parameters
- **subsets** (Array) - Optional - Font subsets to load (e.g., 'latin')
- **display** (String) - Optional - Font display strategy (e.g., 'swap' for reduced layout shift)
- **weight** (String or Array) - Optional - Font weight(s) to load. Not required for variable fonts

### Features
- Automatic self-hosting of font files
- Zero external network requests from browser
- Optimized font loading with no layout shift
- Build-time font file downloading
- Font files served as static assets
```

--------------------------------

### Use legacy turbo-trace-server command for trace analysis

Source: https://nextjs.org/docs/app/guides/local-development

For Next.js versions where the trace command is not available, use the turbo-trace-server command to interpret the trace-turbopack file. This alternative command provides the same trace visualization functionality.

```bash
next internal turbo-trace-server .next/trace-turbopack
```

--------------------------------

### Cache GET Route Handler with force-static Config

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

Enable caching for a GET Route Handler by exporting a dynamic config option set to 'force-static'. This allows the handler to fetch data from an external API and cache the response. Other HTTP methods are not cached by default.

```typescript
export const dynamic = 'force-static'
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
  return Response.json({ data })
}
```

--------------------------------

### Performance Monitoring with Performance Observer API

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

Tracks Time to Interactive and navigation performance using the Performance Observer API and performance marks. Monitors navigation timing entries to measure the time between application start and when the page becomes fully interactive.

```TypeScript
const startTime = performance.now()
const observer = new PerformanceObserver(
  (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      if (entry instanceof PerformanceNavigationTiming) {
        console.log('Time to Interactive:', entry.loadEventEnd - startTime)
      }
    }
  }
)
observer.observe({ entryTypes: ['navigation'] })

export function onRouterTransitionStart(url: string) {
  performance.mark(`nav-start-${url}`)
}
```

--------------------------------

### GET /posts

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Fetches a list of blog posts from an external API with a specified revalidation interval (60 seconds) to control caching behavior.

```APIDOC
## GET /posts

### Description
Fetches a list of blog posts from an external API with a specified revalidation interval (60 seconds) to control caching behavior.

### Method
GET

### Endpoint
/posts

### Parameters
#### Path Parameters
- No Path Parameters

#### Query Parameters
- No Query Parameters

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (200)
- **(array of objects)** - An array containing blog post objects.
  - **id** (number) - The unique identifier of the post.
  - **title** (string) - The title of the post.
  - **content** (string) - The content of the post.

#### Response Example
```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first post."
  },
  {
    "id": 2,
    "title": "Another Great Read",
    "content": "Here's some more exciting content."
  }
]
```
```

--------------------------------

### Static Manifest File Configuration in Next.js

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

Create a static manifest.json or manifest.webmanifest file in the app directory root to provide application metadata to the browser. This file follows the Web Manifest Specification and includes basic information like app name, description, and start URL.

```json
{
  "name": "My Next.js Application",
  "short_name": "Next.js App",
  "description": "An application built with Next.js",
  "start_url": "/"
}
```

--------------------------------

### use client Directive - Non-Serializable Props Example

Source: https://nextjs.org/docs/app/api-reference/directives/use-client

Shows an example of incorrect prop usage in Client Components. Function props are not serializable and cannot be passed from Server Components to Client Components. This demonstrates a common mistake when working with the 'use client' directive and prop passing between server and client boundaries.

```typescript
'use client'

export default function Counter({
  onClick /* ❌ Function is not serializable */,
}) {
  return (
    <div>
      <button onClick={onClick}>Increment</button>
    </div>
  )
}
```

--------------------------------

### GET /api/search

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Searches for content based on a 'query' parameter provided in the URL query string, demonstrating how to access `NextRequest` query parameters.

```APIDOC
## GET /api/search

### Description
Searches for content based on a 'query' parameter provided in the URL query string, demonstrating how to access `NextRequest` query parameters.

### Method
GET

### Endpoint
/api/search

### Parameters
#### Path Parameters
- No Path Parameters

#### Query Parameters
- **query** (string) - Required - The search term to be looked up.

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (200)
- **searchTerm** (string, optional) - The value of the 'query' parameter extracted from the URL.

#### Response Example
```json
{
  "searchTerm": "hello"
}
```
```

--------------------------------

### Next.js Development Mode Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Starts the Next.js application in development mode with Hot Module Reloading (HMR), error reporting, and live updates. Supports various options to customize port, hostname, and HTTPS settings for local development.

```bash
next dev [directory] [options]
next dev -p 3000
next dev -H 0.0.0.0
next dev --turbopack
next dev --experimental-https
```

--------------------------------

### API Reference: Components

Source: https://nextjs.org/docs/app/getting-started/project-structure

Details about various Next.js components such as Font, Form, Head, Image, Link, and Script.

```APIDOC
## API Reference: Components

### Description
This section outlines the available components in Next.js, providing information on their usage and configuration.

### Components
- Font
- Form
- Head
- Image
- Image (Legacy)
- Link
- Script

```

--------------------------------

### Error Tracking Implementation

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

Initializes error tracking before React starts and adds navigation breadcrumbs for better debugging context. The monitoring library is initialized on module load, and onRouterTransitionStart captures navigation events as they occur.

```TypeScript
import Monitor from './lib/monitoring'

Monitor.initialize()

export function onRouterTransitionStart(url: string) {
  Monitor.pushEvent({
    message: `Navigation to ${url}`,
    category: 'navigation',
  })
}
```

--------------------------------

### POST /api/route - after with Request APIs

Source: https://nextjs.org/docs/app/api-reference/functions/after

Example of using after with request APIs such as cookies and headers in Route Handlers. Demonstrates logging user activity for analytics after a mutation completes.

```APIDOC
## POST /api/route

### Description
Route Handler demonstrating the use of after function with request APIs (cookies, headers) for logging user activity after a mutation. Useful for analytics and activity tracking.

### Method
POST

### Endpoint
/api/route

### Usage Context
- Route Handlers
- Server Actions

### Request Example
```typescript
import { after } from 'next/server'
import { cookies, headers } from 'next/headers'
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // Perform mutation
  // ...
  
  // Log user activity for analytics
  after(async () => {
    const userAgent = (await headers().get('user-agent')) || 'unknown'
    const sessionCookie = (await cookies().get('session-id'))?.value || 'anonymous'
    logUserAction({ sessionCookie, userAgent })
  })
  
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

### Available Request APIs in after
- **cookies()** - Access request cookies
- **headers()** - Access request headers

### Limitation
Request APIs cannot be used inside after in Server Components, as Next.js needs to know which parts of the tree access request APIs to support Partial Prerendering, but after runs after React's rendering lifecycle.

### Response
#### Success Response (200)
```json
{
  "status": "success"
}
```
- **status** (string) - Operation status indicator
```

--------------------------------

### App Router: Components

Source: https://nextjs.org/docs/app/getting-started/project-structure

Details about components like Font, Form, Image, Link, and Script, within the App Router.

```APIDOC
## App Router: Components

### Description
This section documents various components available within the Next.js App Router.

### Components
- Font
- Form Component
- Image Component
- Link Component
- Script Component
```

--------------------------------

### API Reference: File-system conventions

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Explains the file-system conventions used in Next.js, including special files and directories.

```APIDOC
## File-system conventions

### Description
This section explains the file-system conventions used in Next.js.

### File-system conventions
- instrumentation.js
- Middleware
- public
- src Directory
```

--------------------------------

### Configuration Reference (next.config.js)

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Complete reference for next.config.js configuration options including build optimization, image handling, rewrites, redirects, and more.

```APIDOC
## Configuration Reference (next.config.js)

### Description
Configure Next.js build behavior, optimization, and runtime settings through next.config.js.

### Build and Output Options

#### output
- **'standalone'** - Self-contained output for deployment
- **'export'** - Static HTML export
- Default: server rendering

#### distDir
- Custom build output directory
- Default: '.next'

#### generateBuildId()
- Custom build ID generation
- Used for versioning and deployment

#### pageExtensions
- File extensions to treat as pages
- Default: ['.tsx', '.ts', '.jsx', '.js']

### Image and Asset Optimization

#### images
- Configure image optimization
- Supported formats, device sizes
- Loader configuration

#### assetPrefix
- CDN prefix for assets
- Useful for static asset hosting

#### compress
- Enable gzip compression
- Default: true

### Routing and Rewrites

#### basePath
- Deploy application under a sub-path
- Example: '/app' → '/app/page'

#### trailingSlash
- Add trailing slashes to routes
- Default: false

#### redirects()
- Configure redirects
- Returns array of redirect objects

#### rewrites()
- Configure URL rewrites
- Supports source and destination patterns

#### headers()
- Configure custom headers
- Apply to routes matching patterns

### Styling and CSS

#### sassOptions
- Configure Sass/SCSS compilation
- Override Sass options

#### cssChunking
- CSS code splitting strategy
- Optimize CSS delivery

### Performance and Caching

#### cacheLife
- Configure cache duration
- Per-route cache control

#### onDemandEntries
- Configure on-demand entry generation
- Invalidation and memory settings

#### generateEtags
- Generate ETags for cache validation
- Default: true

#### staleTimes
- Configure stale-while-revalidate timing

### React and Compilation

#### reactStrictMode
- Enable React strict mode
- Helps identify potential issues

#### reactCompiler
- Enable React compiler optimization
- Automatic memoization

#### transpilePackages
- Transpile specific node_modules packages
- Useful for monorepo setups

### Server Configuration

#### serverExternalPackages
- Mark packages as external for server bundle
- Reduces bundle size

#### serverActions
- Configure Server Actions behavior
- Size and memory limits

#### httpAgentOptions
- Configure HTTP agent options
- Connection pooling settings

### TypeScript and Linting

#### typescript
- Configure TypeScript behavior
- Type checking during build

#### eslint
- Configure ESLint integration
- Build failure on errors option

### Development Options

#### devIndicators
- Configure development indicators
- Build activity indicator

#### browserDebugInfoInTerminal
- Log browser console to terminal
- Debug development builds

### Advanced Options

#### turbopack
- Enable Turbopack bundler
- Experimental fast bundling

#### ppr
- Partial Pre-rendering
- Combine static and dynamic content

#### authInterrupts
- Handle auth interruptions
- Redirect to login on 401/403

#### taint()
- Mark values as sensitive
- Prevent accidental client exposure
```

--------------------------------

### Register OpenTelemetry in Next.js Application

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation

The optional `register` function is invoked once when a new Next.js server instance starts. It is suitable for initializing observability tools like OpenTelemetry. This function can be asynchronous and should be placed in `instrumentation.js` or `instrumentation.ts`.

```TypeScript
import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel('next-app');
}
```

--------------------------------

### Initialize Analytics with Client Instrumentation - JavaScript

Source: https://nextjs.org/docs/app/guides/analytics

Set up global analytics and error tracking in an instrumentation-client.js file that runs before the application's frontend code executes. This file is ideal for initializing analytics libraries and setting up error event listeners.

```javascript
// Initialize analytics before the app starts
console.log('Analytics initialized')
// Set up global error tracking
window.addEventListener('error', (event) => {
  // Send to your error tracking service
  reportError(event.error)
})
```

--------------------------------

### Configure Next.js Root Layout with Full Head Tags (Initial)

Source: https://nextjs.org/docs/app/guides/migrating/from-create-react-app

This snippet presents an initial `app/layout.tsx` for a Next.js application, explicitly including `<link>`, `<title>`, and `<meta description>` tags within the `<head>`. It demonstrates the structure before Next.js's automatic metadata handling features are utilized.

```TypeScript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```JavaScript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

--------------------------------

### Configure Font with Preload Setting in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure whether a font should be preloaded or not. This example demonstrates disabling preload for a font by setting the preload option to false.

```javascript
const roboto = Roboto({
  weight: '400',
  preload: false,
  subsets: ['latin'],
  display: 'swap',
})
```

--------------------------------

### GET with Request Parameter

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Route handler that accepts and processes the NextRequest object. The request parameter provides access to cookies, headers, URL parameters, and other request details.

```APIDOC
## GET with Request Parameter

### Description
Route handler that accepts the NextRequest object for advanced request handling.

### Method
GET

### Parameters
#### Request Parameter
- **request** (NextRequest) - Required - Extended Web Request API object
  - Provides access to cookies
  - Includes parsed URL object (nextUrl)
  - Enables advanced request processing

### Implementation Example
```typescript
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  // Process request...
}
```

### Request Properties
- **nextUrl** - Parsed and extended URL object
- **cookies** - Cookie accessor
- **headers** - Request headers
- **method** - HTTP method

### Notes
- NextRequest is an extension of Web Request API
- Provides better TypeScript support
- Enables easier access to common request properties
```

--------------------------------

### Conditional Runtime-Specific Registration and Error Handling

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation

This example demonstrates how to use `process.env.NEXT_RUNTIME` within `instrumentation.js` to load different `register` and `onRequestError` implementations based on the runtime environment (Node.js or Edge). This allows for runtime-specific observability configurations or error reporting mechanisms.

```JavaScript
export function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return require('./register.edge');
  } else {
    return require('./register.node');
  }
}

export function onRequestError() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return require('./on-request-error.edge');
  } else {
    return require('./on-request-error.node');
  }
}
```

--------------------------------

### Next.js Middleware Factory Pattern (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Demonstrates how community libraries provide a factory function for creating Next.js middleware. This pattern simplifies the setup and export of default middleware logic, allowing for consistent and reusable middleware implementations.

```typescript
import { createMiddleware } from'third-party-library'
exportdefaultcreateMiddleware()
```

--------------------------------

### GET default.js File Convention

Source: https://nextjs.org/docs/app/api-reference/file-conventions/default

Documents the purpose and behavior of the `default.js` file in Next.js Parallel Routes, and details its `params` prop for accessing dynamic route parameters.

```APIDOC
## GET default.js File Convention

### Description
The `default.js` file is used to render a fallback within Parallel Routes when Next.js cannot recover a slot's active state after a full-page load.
During soft navigation, Next.js keeps track of the active _state_ (subpage) for each slot. However, for hard navigations (full-page load), Next.js cannot recover the active state. In this case, a `default.js` file can be rendered for subpages that don't match the current URL.
On refresh, Next.js will render a `default.js` for a slot if its active state cannot be recovered. If `default.js` doesn't exist, a `404` is rendered instead.
Additionally, since `children` is an implicit slot, a `default.js` file is also needed to render a fallback for `children` when Next.js cannot recover the active state of the parent page.

### Method
N/A (File System Convention)

### Endpoint
`default.js` (within Parallel Routes, e.g., `app/[artist]/@sidebar/default.js`)

### Parameters
- **params** (Promise<object>) - Optional - A promise that resolves to an object containing the dynamic route parameters from the root segment down to the slot's subpages. Access values using `async/await` or React's `use` hook.
  - **Type Example**: `Promise<{ artist: string }>`
  - **Example `params` values:**
    - For URL `/zack` with `app/[artist]/@sidebar/default.js`: `Promise<{ artist: 'zack' }>`
    - For URL `/zack/next` with `app/[artist]/[album]/@sidebar/default.js`: `Promise<{ artist: 'zack', album: 'next' }>`

#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```typescript
export default async function Default({
  params,
}: {
  params: Promise<{ artist: string }>
}) {
  const { artist } = await params
  // Further logic using 'artist'
}
```

### Response
#### Success Response (200 OK - Component Rendered)
- **React Component** (JSX.Element) - The rendered React component defined in `default.js`.

#### Response Example
N/A (Renders a UI component, not a JSON/structured data response)

```

--------------------------------

### Manual Prefetch with useRouter Hook

Source: https://nextjs.org/docs/app/guides/prefetching

Shows how to manually trigger prefetching using the useRouter hook from next/navigation. This approach allows developers to prefetch routes in response to specific events like analytics, hover, scroll, or user interactions outside the default viewport detection.

```typescript
'use client'
import { useRouter } from 'next/navigation'

const router = useRouter()
router.prefetch('/pricing')
```

--------------------------------

### Configure TypeScript Module Path Aliases

Source: https://nextjs.org/docs/app/getting-started/installation

Map custom module path aliases using the paths option in tsconfig.json or jsconfig.json alongside baseUrl configuration. This example maps '@/styles/*' and '@/components/*' to their respective directories relative to the baseUrl, improving code readability and maintainability.

```json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

--------------------------------

### Create an Index Page in Next.js

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

To create a page in Next.js, add a `page.tsx` file inside the `app` directory and default export a React component. This component defines the UI that will be rendered for a specific route, such as the index page (`/`). Pages are fundamental for displaying content on different URLs in a file-system based routing setup.

```TypeScript
export default function Page() {
return <h1>Hello Next.js!</h1>
}
```

--------------------------------

### Get All Cookies

Source: https://nextjs.org/docs/app/api-reference/functions/cookies

Retrieve all cookies or all cookies matching a specific name using the cookies().getAll() method. If no name is specified, returns all available cookies.

```APIDOC
## GET All Cookies

### Description
Retrieves all cookies from the cookie store, optionally filtered by name.

### Method
GET (conceptual)

### Usage Location
Server Components, Route Handlers, Server Actions

### Function
`(await cookies()).getAll(name?)`

### Parameters
- **name** (string) - Optional - Filter cookies by name. If unspecified, returns all cookies

### Returns
Array of cookie objects:
- **name** (string) - The cookie name
- **value** (string) - The cookie value

### Example
```typescript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

### Notes
- Returns an empty array if no cookies match
- Reading cookies is safe in Server Components
```

--------------------------------

### Using Next.js Image with Local Static Assets

Source: https://nextjs.org/docs/app/getting-started/images

This example shows how to use the Image component with a local image stored in the 'public' directory. By providing 'src', 'alt', 'width', and 'height', Next.js can optimize the image and prevent layout shifts.

```TypeScript
import Image from'next/image'
export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

```JavaScript
import Image from'next/image'
export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

--------------------------------

### Next.js Project Structure Overview

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Overview of the Next.js documentation organization and available features. This documentation covers both the Pages Router (legacy) and App Router (modern) approaches for building Next.js applications.

```APIDOC
## Next.js Framework Documentation

### Overview
Next.js is a React framework for building full-stack web applications with support for server-side rendering, static site generation, API routes, and edge computing.

### Key Documentation Sections

#### Getting Started
- Installation and project setup
- Project structure and conventions
- Layouts and pages configuration
- Linking and navigation
- Server and Client Components
- Data fetching and caching
- Error handling and deployment

#### Building Your Application
- **Routing**: Pages, dynamic routes, API routes, custom errors
- **Rendering**: SSR, SSG, CSR, Automatic Static Optimization
- **Data Fetching**: getStaticProps, getServerSideProps, client-side fetching
- **Configuring**: Error handling and middleware

#### API Reference
- **Components**: Font, Form, Head, Image, Link, Script
- **Functions**: getInitialProps, getServerSideProps, getStaticProps, getStaticPaths, useRouter, NextRequest, NextResponse
- **File-system Conventions**: instrumentation.js, middleware, public, src directory
- **Configuration**: next.config.js options, TypeScript, ESLint
- **CLI**: create-next-app, next CLI

#### Advanced Features
- Edge Runtime
- Turbopack
- OpenTelemetry
- Multi-zones and Multi-tenant
- ISR (Incremental Static Regeneration)
- Draft Mode and Preview Mode
- Partial Prerendering
- Environment Variables
- Custom Server

#### App Router (Modern)
- Directives: use cache, use client, use server
- File-system conventions: layout.js, page.js, error.js, loading.js, middleware.js, instrumentation.js
- Dynamic segments and Parallel routes
- Intercepting routes
- Route handlers

#### Testing & Quality
- Jest, Vitest, Cypress, Playwright
- ESLint configuration
- TypeScript support
- Debugging tools

#### Deployment & Performance
- Production optimization
- Static exports
- Self-hosting
- Image and Font optimization
- CSS optimization (Tailwind CSS, Sass, PostCSS)
- Script optimization
- Caching and revalidation strategies

### Supported Versions
- Latest: 15.5.0
- Previous: 14, 13, 12, 11, 10, 9
- Codemods available for version upgrades
```

--------------------------------

### Configure Cypress for End-to-End Testing

Source: https://nextjs.org/docs/app/guides/testing/cypress

This TypeScript configuration snippet for `cypress.config.ts` sets up the basic structure for Cypress E2E tests. It defines the `e2e` property, enabling E2E test capabilities, and includes an empty `setupNodeEvents` function for custom event handling or environment setup within Cypress.

```typescript
import { defineConfig } from'cypress'
export default defineConfig({
  e2e: {
setupNodeEvents(on, config) {},
  },
})
```

--------------------------------

### Enable cacheComponents flag in Next.js config

Source: https://nextjs.org/docs/app/api-reference/functions/cacheLife

Configure the experimental cacheComponents flag in next.config.ts to enable the cacheLife function. This is a required setup step before using cacheLife in your application.

```typescript
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
}
export default nextConfig
```

--------------------------------

### Manage Cookies in Server Function

Source: https://nextjs.org/docs/app/getting-started/updating-data

Demonstrates how to get, set, and delete cookies within a Server Function using the cookies API from next/headers. The cookies() function is async and must be awaited to access the cookie store.

```TypeScript
'use server'
import { cookies } from'next/headers'
exportasyncfunctionexampleAction() {
  constcookieStore=awaitcookies()
  // Get cookie
  cookieStore.get('name')?.value
  // Set cookie
  cookieStore.set('name','Delba')
  // Delete cookie
  cookieStore.delete('name')
}
```

--------------------------------

### CLI & Build Tools API

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Next.js provides command-line tools for project creation, development, building, and deployment through create-next-app CLI and next CLI commands.

--------------------------------

### Import Package from Skypack CDN

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/urlImports

Use URL imports with Skypack CDN to load npm packages directly in React components. This example imports the canvas-confetti library and triggers it within a useEffect hook.

```javascript
import confetti from 'https://cdn.skypack.dev/canvas-confetti'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    confetti()
  })
  return <p>Hello</p>
}
```

--------------------------------

### Enable Next.js Partial Prerendering with React Suspense for Dynamic Content

Source: https://nextjs.org/docs/app/building-your-application/rendering

This Next.js `app/page.js` example demonstrates how to activate experimental Partial Prerendering (PPR) and use React's `Suspense` component. It renders a static component immediately, while a dynamic component wrapped in `Suspense` defers rendering until runtime, displaying a `Fallback` UI in the interim. This helps optimize initial page load by streaming dynamic parts.

```javascript
import { Suspense } from'react'
import StaticComponent from'./StaticComponent'
import DynamicComponent from'./DynamicComponent'
import Fallback from'./Fallback'
exportconstexperimental_ppr=true
exportdefaultfunctionPage() {
return (
    <>
      <StaticComponent />
      <Suspensefallback={<Fallback />}>
        <DynamicComponent />
      </Suspensefallback>
    </>
  )
}
```

--------------------------------

### Building Your Application - Rendering

Source: https://nextjs.org/docs/app/guides

Different rendering strategies in Next.js including server-side rendering, static generation, and client-side rendering with automatic optimization.

```APIDOC
# Rendering

## Server-side Rendering (SSR)
Render pages on each request for dynamic content.

**Implementation:** `getServerSideProps`

**Use Cases:**
- User-specific content
- Real-time data
- Authentication-dependent pages

## Static Site Generation (SSG)
Pre-render pages at build time for optimal performance.

**Implementation:** `getStaticProps` and `getStaticPaths`

**Use Cases:**
- Marketing pages
- Blog posts
- Product listings

## Automatic Static Optimization
Next.js automatically optimizes pages without data fetching.

**Behavior:**
- No `getServerSideProps` or `getStaticProps`
- Pages are pre-rendered at build time
- Revalidated on-demand

## Client-side Rendering (CSR)
Render content in the browser after page load.

**Implementation:** `useEffect` for data fetching

**Use Cases:**
- Dashboards
- Authenticated pages
- Real-time applications
```

--------------------------------

### useSelectedLayoutSegment - Parent Layout Integration

Source: https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment

Example of a parent Layout (Server Component) that imports and uses the BlogNavLink Client Component. The layout fetches featured posts and maps them to navigation links, demonstrating how Client Components with useSelectedLayoutSegment integrate into Server Component layouts.

```TypeScript
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

--------------------------------

### GET /page - Check Draft Mode Status

Source: https://nextjs.org/docs/app/api-reference/functions/draft-mode

Server Component that checks if Draft Mode is enabled using the isEnabled property and conditionally renders content based on draft status.

```APIDOC
## Server Component - Check Draft Mode Status

### Description
Check if Draft Mode is enabled in a Server Component using the isEnabled property.

### Method
GET (Server Component)

### Endpoint
Any page route

### Implementation
```typescript
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

### Response
#### Component Output
- **When isEnabled is true** (200)
  - Displays draft content
  - Shows "Draft Mode is currently Enabled"
  - Renders preview version of page

- **When isEnabled is false** (200)
  - Displays published content
  - Shows "Draft Mode is currently Disabled"
  - Renders static/cached version of page

### Usage Pattern
```typescript
if (isEnabled) {
  // Fetch and display draft content from CMS
  // Show draft indicators/warnings
} else {
  // Display published content
  // Show public version
}
```

### Common Use Cases
- Conditionally rendering draft warnings
- Fetching different content based on draft status
- Showing preview UI elements only in draft mode
- Analytics and tracking draft vs published views
```

--------------------------------

### Enable Standalone Output in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/output

Configure Next.js to generate a standalone folder containing only necessary files for production deployment. This eliminates the need to install node_modules in production environments and replaces the deprecated serverless target.

```javascript
module.exports = {
  output: 'standalone'
}
```

--------------------------------

### Client Component Imports for Push Notifications

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Initial setup for a Next.js client component implementing push notifications. Imports React hooks and references Server Actions for subscription management. The 'use client' directive marks this as a client-side component required for browser APIs.

```TypeScript
'use client'
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'
```

--------------------------------

### GET /api/headers

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Demonstrates how to read request headers and set response headers in a Next.js API route handler. It retrieves the 'referer' header from the incoming request and includes it in the response.

```APIDOC
## GET /api/headers

### Description
Demonstrates how to read request headers and set response headers in a Next.js API route handler. It retrieves the 'referer' header from the incoming request and includes it in the response.

### Method
GET

### Endpoint
/api/headers

### Parameters
#### Path Parameters
- No Path Parameters

#### Query Parameters
- No Query Parameters

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (200)
- **message** (string) - A greeting message.
- **referer** (string, optional) - The value of the 'referer' header from the incoming request.

#### Response Example
```json
{
  "message": "Hello, Next.js!",
  "referer": "http://localhost:3000/"
}
```
```

--------------------------------

### Configure Next.js Zone with assetPrefix and Rewrites (Legacy)

Source: https://nextjs.org/docs/app/guides/multi-zones

For Next.js versions older than 15, this `next.config.js` configuration not only defines a zone using `assetPrefix` but also adds a `rewrite` rule. The rewrite ensures that static assets prefixed with `/blog-static/_next/` are correctly routed to `/_next/`, preventing conflicts and ensuring proper asset loading in multi-zone setups. This rewrite is no longer necessary in Next.js 15 and newer.

```javascript
/** @type{import('next').NextConfig} */
constnextConfig= {
  assetPrefix:'/blog-static',
asyncrewrites() {
return {
      beforeFiles: [
        {
          source:'/blog-static/_next/:path+',
          destination:'/_next/:path+',
        },
      ],
    }
  },
}
```

--------------------------------

### Route Handlers - API Endpoints

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactStrictMode

Create API endpoints using Next.js Route Handlers with support for GET, POST, PUT, DELETE and other HTTP methods. Route handlers enable building RESTful APIs within your Next.js application.

```APIDOC
## Route Handlers - API Endpoints

### Description
Create API endpoints using Next.js Route Handlers in the App Router. Handle HTTP requests and responses with built-in support for middleware and edge runtime.

### File Convention
`app/api/[route]/route.ts` - Define API endpoints using HTTP method exports

### Supported HTTP Methods
- **GET** - Retrieve data
- **POST** - Create resources
- **PUT** - Update resources
- **PATCH** - Partial updates
- **DELETE** - Remove resources
- **HEAD** - Like GET but without response body
- **OPTIONS** - Describe communication options

### Request Handling

#### GET Request Example
```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  return Response.json({ users: [] }, { status: 200 })
}
```

#### POST Request Example
```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Process data
  return Response.json({ id: 1, ...data }, { status: 201 })
}
```

#### Dynamic Route Parameters
```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({ id: params.id }, { status: 200 })
}
```

### Response Handling
- Use `Response.json()` for JSON responses
- Use `new Response()` for custom responses
- Set appropriate HTTP status codes
- Return headers with response metadata

### NextRequest & NextResponse
- **NextRequest**: Extended Request object with Next.js utilities
- **NextResponse**: Extended Response object with middleware support
- Enable advanced features like redirects and rewrites
```

--------------------------------

### GET /items/{slug}

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Retrieves an item based on a dynamic slug parameter provided in the URL path. This showcases how to use dynamic route segments in Route Handlers.

```APIDOC
## GET /items/{slug}

### Description
Retrieves an item based on a dynamic slug parameter provided in the URL path. This showcases how to use dynamic route segments in Route Handlers.

### Method
GET

### Endpoint
/items/{slug}

### Parameters
#### Path Parameters
- **slug** (string) - Required - The unique identifier for the item.

#### Query Parameters
- No Query Parameters

#### Request Body
- No Request Body

### Request Example
N/A

### Response
#### Success Response (200)
- **slug** (string) - The slug value extracted from the path.

#### Response Example
```json
{
  "slug": "example-item"
}
```
```

--------------------------------

### Run Playwright tests against production build

Source: https://nextjs.org/docs/app/guides/testing/playwright

Execute the Playwright test suite after building and starting the Next.js production server. This command sequence ensures tests run against optimized production code in headless mode across Chromium, Firefox, and WebKit browsers.

```bash
npm run build
npm run start
npx playwright test
```

--------------------------------

### Get all cookies or specific cookies from NextResponse

Source: https://nextjs.org/docs/app/api-reference/functions/next-response

This method returns all cookies on the response. Optionally, if a name is provided, it returns all cookies with that specific name. The result is an array of cookie objects.

```JavaScript
// Given incoming request /home
let response = NextResponse.next()
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll('experiments')
// Alternatively, get all cookies for the response
response.cookies.getAll()
```

--------------------------------

### Get Single Cookie

Source: https://nextjs.org/docs/app/api-reference/functions/cookies

Retrieve a single cookie by name using the cookies().get() method in a Server Component. This returns the cookie object with name and value properties.

```APIDOC
## GET Single Cookie

### Description
Retrieves a single cookie by its name from the cookie store in a Server Component.

### Method
GET (conceptual)

### Usage Location
Server Components, Route Handlers, Server Actions

### Function
`(await cookies()).get(name)`

### Parameters
- **name** (string) - Required - The name of the cookie to retrieve

### Returns
- **name** (string) - The cookie name
- **value** (string) - The cookie value

### Example
```typescript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### Notes
- Reading cookies works in Server Components
- The browser sends cookie data in HTTP request headers
- Returns undefined if cookie does not exist
```

--------------------------------

### Next.js CLI Commands

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/env

Command-line interface commands for creating and managing Next.js projects and running development servers.

```APIDOC
## Next.js CLI Commands

### Description
This section lists the command-line interface (CLI) tools available for interacting with Next.js projects, including commands for project creation and development.

### Items
- **create-next-app CLI** - Command-line tool for bootstrapping new Next.js applications.
- **next CLI** - The primary command-line interface for running Next.js development and build commands.
```

--------------------------------

### Defining Static Metadata with Next.js `Metadata` Object

Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

This example demonstrates how to define static metadata by exporting a `Metadata` object from a `layout.js` or `page.js` file in Next.js. It sets the `title` and `description` for a route, improving SEO and web shareability. This approach is supported only in Server Components.

```typescript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {
  title:'My Blog',
  description:'...', 
}
exportdefaultfunctionPage() {}
```

--------------------------------

### CLI Commands

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Reference for Next.js CLI commands including create-next-app and next CLI for development, building, and deployment.

```APIDOC
## CLI Commands

### Description
Next.js provides CLI tools for project creation, development, and production builds.

### create-next-app

#### Description
Scaffold a new Next.js application with recommended setup.

#### Usage
```
npx create-next-app@latest [project-name]
```

#### Options
- **--typescript** - Use TypeScript
- **--tailwind** - Include Tailwind CSS
- **--eslint** - Include ESLint
- **--app** - Use App Router (default)
- **--src-dir** - Use src/ directory
- **--import-alias** - Set import alias
- **--no-git** - Skip git initialization

### next dev

#### Description
Start development server with hot reload.

#### Usage
```
next dev [options]
```

#### Options
- **-p, --port** - Specify port (default: 3000)
- **-H, --hostname** - Specify hostname
- **--experimental-app** - Enable experimental features

### next build

#### Description
Build application for production deployment.

#### Usage
```
next build [options]
```

#### Output
- Optimized bundle in .next directory
- Static analysis and warnings
- Build size report

### next start

#### Description
Start production server.

#### Usage
```
next start [options]
```

#### Options
- **-p, --port** - Specify port
- **-H, --hostname** - Specify hostname
- **--keepAliveTimeout** - Keep-alive timeout in ms

### next export

#### Description
Export static HTML for static hosting.

#### Usage
```
next export [options]
```

#### Requirements
- No dynamic routes or Server Components
- No API routes
- Static generation only

### next telemetry

#### Description
Manage Next.js telemetry collection.

#### Usage
```
next telemetry [enable|disable|status]
```
```

--------------------------------

### Update package.json Scripts for Next.js

Source: https://nextjs.org/docs/app/guides/migrating/from-create-react-app

Shows the required updates to package.json scripts when migrating from CRA to Next.js. Replaces react-scripts commands with Next.js CLI commands including dev with Turbopack, build, and start commands for running the application.

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "npx serve@latest ./build"
  }
}
```

--------------------------------

### Update package.json scripts for custom server

Source: https://nextjs.org/docs/app/guides/custom-server

Configures npm scripts to run the custom Next.js server. The dev script runs the server in development mode, build script creates the Next.js production build, and start script runs the server in production with the NODE_ENV environment variable set.

```JSON
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

--------------------------------

### API Reference: CLI

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Describes the command-line interface (CLI) tools available in Next.js, such as `create-next-app` and `next`.

```APIDOC
## CLI

### Description
This section describes the command-line interface (CLI) tools available in Next.js.

### CLI Tools
- create-next-app CLI
- next CLI
```

--------------------------------

### Configure Font Display Strategy in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure font display behavior using the display option to control how the font appears during loading. This example demonstrates using the 'optional' display strategy.

```javascript
const inter = Inter({
  display: 'optional',
  subsets: ['latin'],
})
```

--------------------------------

### Create Next.js About Page with Navigation Link

Source: https://nextjs.org/docs/app/guides/testing/cypress

This JavaScript code defines the `app/about/page.js` for a Next.js application, creating a simple about page. Similar to the home page, it features a heading and a `Link` component, providing a navigation path back to the home page to complete the navigation flow for E2E tests.

```javascript
import Link from'next/link'
export default function Page() {
return (
    <div>
      <h1>About</h1>
      <Linkhref="/">Home</Link>
    </div>
  )
}
```

--------------------------------

### Import Web Vitals Component in Root Layout - JavaScript

Source: https://nextjs.org/docs/app/guides/analytics

Import the Web Vitals component in your root layout file to ensure metrics are collected throughout the application. This setup maintains optimal performance by keeping the client boundary isolated to the WebVitals component.

```javascript
import { WebVitals } from './_components/web-vitals'
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
```

--------------------------------

### CLI Commands

Source: https://nextjs.org/docs/app/guides

Command-line interface tools for creating Next.js projects and managing the development server, build, and production processes.

```APIDOC
# Next.js CLI Reference

## Commands

### create-next-app CLI
Create a new Next.js project with predefined templates and configurations.

**Usage:**
```
npx create-next-app@latest [project-name]
```

**Features:**
- Interactive project setup
- TypeScript support
- ESLint configuration
- Tailwind CSS setup
- App Router or Pages Router selection

### next CLI
Manage Next.js development server, builds, and production.

**Available Commands:**
- **next dev** - Start development server
- **next build** - Create production build
- **next start** - Start production server
- **next export** - Export static site
- **next lint** - Run ESLint
- **next telemetry** - Manage telemetry

## Edge Runtime
Run code at the edge with minimal latency using Edge Runtime.

## Turbopack
Next-generation JavaScript bundler for faster builds and development.

## Architecture Components
- **Accessibility** - WCAG compliance and accessibility features
- **Fast Refresh** - Instant feedback during development
- **Next.js Compiler** - Rust-based compiler for performance
- **Supported Browsers** - Browser compatibility matrix
```

--------------------------------

### Add TypeScript to Existing Next.js Project

Source: https://nextjs.org/docs/app/api-reference/config/typescript

Convert an existing Next.js project to TypeScript by renaming files and running build commands. The framework automatically installs dependencies and generates a tsconfig.json configuration file.

```bash
# Rename a file to .ts or .tsx
mv pages/index.js pages/index.tsx

# Run dev or build to auto-configure TypeScript
next dev
# or
next build
```

--------------------------------

### Root Layout with HTML Structure and Meta Tags

Source: https://nextjs.org/docs/app/guides/migrating/from-vite

Complete root layout component that includes HTML document structure, head metadata, and a root div container for rendering child pages. Copy content from your index.html file and replace body script tags with children.

```TypeScript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

--------------------------------

### App Router: File-system conventions

Source: https://nextjs.org/docs/app/getting-started/project-structure

Explains file-system conventions like `default.js`, `Dynamic Segments`, `error.js`, `forbidden.js`, etc., within the App Router.

```APIDOC
## App Router: File-system conventions

### Description
This section provides details about the file system conventions for the App Router.

### File-system conventions
- default.js
- Dynamic Segments
- error.js
- forbidden.js
- instrumentation.js
- instrumentation-client.js
- Intercepting Routes
- layout.js
- loading.js
- mdx-components.js
- middleware.js
- not-found.js
- page.js
- Parallel Routes
- public
```

--------------------------------

### Route Context Helper with Type Safety

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Use RouteContext helper to get strongly typed route parameters with TypeScript. This provides compile-time type safety for dynamic route segments.

```APIDOC
## GET with RouteContext Type Helper

### Description
Route handler using RouteContext for strongly typed dynamic parameters.

### Method
GET

### Parameters
#### Context Parameter
- **ctx** (RouteContext) - Route context with typed params
  - RouteContext<'/users/[id]'> - Type-safe context for /users/[id] route

### Implementation Example
```typescript
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

### Response Example
```json
{
  "id": "123"
}
```

### Notes
- RouteContext is a globally available helper
- Provides TypeScript type safety for route parameters
- Types are generated during: next dev, next build, or next typegen
- Requires TypeScript for full type support
```

--------------------------------

### Defining a Next.js Server Component for Data Fetching

Source: https://nextjs.org/docs/app/getting-started/server-and-client-components

This example showcases a Next.js Server Component (`app/[id]/page.tsx`) responsible for fetching data (e.g., `getPost`) and rendering UI. It demonstrates how Server Components can handle asynchronous operations and pass data as props to other components, including Client Components like `LikeButton` to facilitate client-side interactivity.

```TypeScript
import LikeButton from'@/app/ui/like-button'
import { getPost } from'@/shared/data'
exportdefaultasyncfunctionPage({
  params,
}: {
  params:Promise<{ id:string }>
}) {
const { id } =await params
constpost=awaitgetPost(id)
return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/* ... */}
        <LikeButtonlikes={post.likes} />
      </main>
    </div>
  )
}
```

--------------------------------

### NextRequest Cookies API

Source: https://nextjs.org/docs/app/api-reference/functions/next-request

The cookies property allows reading and mutating the Set-Cookie header of the request. It provides methods to set, get, delete, and manage cookies on the incoming request object.

```APIDOC
## Cookies API

### Description
Read or mutate the `Set-Cookie` header of the request using the cookies property on NextRequest.

### Methods

#### set(name, value)
Given a name, set a cookie with the given value on the request.

**Parameters:**
- **name** (string) - Required - The name of the cookie
- **value** (string) - Required - The value to set for the cookie

**Returns:** void

**Example:**
```javascript
// Given incoming request /home
// Set a cookie to hide the banner
// request will have a `Set-Cookie:show-banner=false;path=/home` header
request.cookies.set('show-banner', 'false')
```

#### get(name)
Given a cookie name, return the value of the cookie. If the cookie is not found, `undefined` is returned. If multiple cookies are found, the first one is returned.

**Parameters:**
- **name** (string) - Required - The name of the cookie to retrieve

**Returns:** `{ name: string, value: string, Path: string } | undefined`

**Example:**
```javascript
// Given incoming request /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')
```

#### getAll(name?)
Given a cookie name, return the values of the cookie. If no name is given, return all cookies on the request.

**Parameters:**
- **name** (string) - Optional - The name of the cookie to retrieve

**Returns:** `Array<{ name: string, value: string, Path: string }>`

**Example:**
```javascript
// Given incoming request /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll('experiments')
// Alternatively, get all cookies for the request
request.cookies.getAll()
```

#### delete(name)
Given a cookie name, delete the cookie from the request.

**Parameters:**
- **name** (string) - Required - The name of the cookie to delete

**Returns:** `boolean` - Returns true if deleted, false if nothing is deleted

**Example:**
```javascript
request.cookies.delete('experiments')
```

#### has(name)
Given a cookie name, return `true` if the cookie exists on the request.

**Parameters:**
- **name** (string) - Required - The name of the cookie to check

**Returns:** `boolean` - Returns true if cookie exists, false if it does not

**Example:**
```javascript
request.cookies.has('experiments')
```

#### clear()
Remove the `Set-Cookie` header from the request.

**Parameters:** None

**Returns:** void

**Example:**
```javascript
request.cookies.clear()
```
```

--------------------------------

### Define Next.js Middleware with Redirect and Config

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This example demonstrates how to define a Next.js middleware function using `NextResponse.redirect` to send users to a new URL. It also includes an optional `config` object with a `matcher` to specify which paths the middleware should apply to, ensuring it only runs for relevant requests. The middleware is exported for server-side execution before a request completes.

```TypeScript
import { NextResponse, NextRequest } from'next/server'
// This function can be marked `async` if using `await` inside
exportfunctionmiddleware(request:NextRequest) {
returnNextResponse.redirect(newURL('/home',request.url))
}
exportconstconfig= {
  matcher:'/about/:path*',
}
```

```JavaScript
import { NextResponse, NextRequest } from'next/server'
// This function can be marked `async` if using `await` inside
exportfunctionmiddleware(request) {
returnNextResponse.redirect(newURL('/home',request.url))
}
exportconstconfig= {
  matcher:'/about/:path*',
}
```

--------------------------------

### Import specific icons from icon libraries

Source: https://nextjs.org/docs/app/guides/local-development

Optimize icon library imports by importing only the specific icons needed instead of importing entire icon sets. This reduces the number of modules the compiler has to process. Example shows importing from @phosphor-icons/react using the direct path pattern.

```javascript
// Instead of this:
import { TriangleIcon } from '@phosphor-icons/react'
// Do this:
import { TriangleIcon } from '@phosphor-icons/react/dist/csr/Triangle'
```

--------------------------------

### usePathname Hook

Source: https://nextjs.org/docs/app/api-reference/functions/use-pathname

`usePathname` is a Client Component hook that lets you read the current URL's pathname. It's an integral part of the Server Components architecture, designed for client-side use to get the current URL path.

```APIDOC
## usePathname Hook

### Description
`usePathname` is a **Client Component** hook that lets you read the current URL's **pathname**. It is an integral part of the Server Components architecture, enabling client-side access to the current URL path.

### Parameters
`usePathname` does not take any parameters.

### Returns
`usePathname` returns a string representing the current URL's pathname.

#### Return Examples
- For URL `/`, returns `='/'`
- For URL `/dashboard`, returns `='/dashboard'`
- For URL `/dashboard?v=2`, returns `='/dashboard'`
- For URL `/blog/hello-world`, returns `='/blog/hello-world'`

### Code Example
```typescript
'use client'
import { usePathname } from'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

### Example: Do something in response to a route change
```typescript
'use client'
import { usePathname, useSearchParams } from'next/navigation'
import { useEffect } from 'react'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Do something here, e.g., log analytics or update state
    console.log('Route changed to:', pathname, searchParams.toString())
  }, [pathname, searchParams])

  return (
    <div>
      <p>Current pathname: {pathname}</p>
      <p>Current search params: {searchParams.toString()}</p>
    </div>
  )
}
```
```

--------------------------------

### CLI: create-next-app CLI

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes

The `create-next-app` command-line interface (CLI) is used to quickly set up a new Next.js project.

```APIDOC
## CLI: create-next-app CLI

### Description
The `create-next-app` CLI is used to quickly set up a new Next.js project.

### Method
N/A (CLI)

### Endpoint
N/A (CLI)

### Parameters
See the Next.js documentation for options and usage.

### Request Example
Not applicable.

### Response
Not applicable.

### Response Example
Not applicable.
```

--------------------------------

### GET /<route>/opengraph-image.tsx

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

This documentation details how to create `opengraph-image.tsx` or `twitter-image.tsx` files to programmatically generate images for Open Graph and Twitter cards in Next.js. These files export a default asynchronous function that returns an `ImageResponse`.

```APIDOC
## GET /<route>/opengraph-image.tsx (or twitter-image.tsx)

### Description
Programmatically generate Open Graph and Twitter images using file-based route segments like `opengraph-image.tsx` or `twitter-image.tsx`. These files export a default asynchronous function responsible for creating and returning the image content.

### File Convention
`opengraph-image.{js,ts,tsx}` or `twitter-image.{js,ts,tsx}`

### Located At
`<app_directory>/<route_segment>/`

### Access Method
The generated image is typically accessed by a browser or social media crawler via a GET request to the corresponding URL path (e.g., for `app/about/opengraph-image.tsx`, the image would be accessible at `/about/opengraph-image`).

### Function Signature
`export default async function Image({ params }: { params?: { [key: string]: string } }): Promise<ImageResponse | Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response>`

### Parameters
#### Props to Default Export Function
- **params** (object) - Optional - An object containing the dynamic route parameters. If the route handler is located at `app/shop/[slug]/opengraph-image.tsx` and the URL is `/shop/1`, `params` would be `{ slug: '1' }`.

### Configuration Options (Exported Constants)
These properties can be exported from the `opengraph-image.tsx` or `twitter-image.tsx` file to define metadata for the generated image.

- **alt** (string) - Optional - Textual description of the image, used for the `og:image:alt` meta tag.
  - Example: `export const alt = 'My images alt text';`
- **size** (object) - Optional - Defines the dimensions of the image.
  - **width** (number) - Required - The width of the image in pixels.
  - **height** (number) - Required - The height of the image in pixels.
  - Example: `export const size = { width: 1200, height: 630 };`
- **contentType** (string) - Optional - The MIME type of the image, used for the `og:image:type` meta tag.
  - Example: `export const contentType = 'image/png';`

### Return Value
The default export function should return an instance of `ImageResponse` (recommended, from `next/og`) or a low-level type such as `Blob`, `ArrayBuffer`, `TypedArray`, `DataView`, `ReadableStream`, or `Response`.

### Example Usage (TypeScript)
This example demonstrates a basic `opengraph-image.tsx` using `ImageResponse` to generate an image and load a custom font.

```typescript
import { ImageResponse } from'next/og';
import { readFile } from'node:fs/promises';
import { join } from'node:path';

// Optional: Image metadata exports
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Default export function to generate the image
export default async function Image({ params }: { params?: { slug?: string } }) {
  // Load a font (example: Inter-SemiBold.ttf from assets directory)
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-SemiBold.ttf')
  );

  return new ImageResponse(
    (
      // JSX for the image content
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        About Acme {params?.slug ? `for ${params.slug}` : ''}
      </div>
    ),
    // ImageResponse options, including dimensions and fonts
    {
      ...size, // Re-use exported size for convenience
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
```

### Generated HTML `<head>` Output
When a page associated with this image is rendered, the following meta tags might be automatically generated in the HTML `<head>` section:

```html
<meta property="og:image" content="<generated>" />
<meta property="og:image:alt" content="About Acme" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```
```

--------------------------------

### Configure Sass Options in Next.js with TypeScript

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/sassOptions

This example demonstrates how to configure `sassOptions` in a Next.js project's `next.config.ts` file. It shows how to pass `additionalData` to the Sass compiler and explicitly set the `implementation` to 'sass-embedded'.

```TypeScript
import type { NextConfig } from 'next'
const sassOptions = {
  additionalData: `
    $var: red;
  `,
}
const nextConfig: NextConfig = {
  sassOptions: {
    ...sassOptions,
    implementation: 'sass-embedded',
  },
}
export default nextConfig
```

--------------------------------

### Get a cookie value from NextResponse

Source: https://nextjs.org/docs/app/api-reference/functions/next-response

This method retrieves the value of a specific cookie by its name from the response. If the cookie is not found, `undefined` is returned. If multiple cookies with the same name exist, the first one is returned.

```JavaScript
// Given incoming request /home
let response = NextResponse.next()
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get('show-banner')
```

--------------------------------

### API Reference: Turbopack

Source: https://nextjs.org/docs/app/getting-started/project-structure

Overview of the Turbopack feature in Next.js.

```APIDOC
## API Reference: Turbopack

### Description
This section gives an overview of Turbopack in Next.js.

### Turbopack
```

--------------------------------

### Type Definitions for Next.js Request Context

Source: https://nextjs.org/docs/app/api-reference/functions/after

TypeScript type definitions for the Next.js request context interface. Defines `NextRequestContext` with a `get()` method and `NextRequestContextValue` containing an optional `waitUntil` function that accepts promises.

```typescript
type NextRequestContext = {
  get(): NextRequestContextValue | undefined
}
type NextRequestContextValue = {
  waitUntil?: (promise: Promise<any>) => void
}
```

--------------------------------

### Configure Font with Fallback Fonts in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure a font with fallback fonts to ensure text remains visible if the primary font fails to load. This example demonstrates specifying system-ui and Arial as fallback options.

```javascript
const roboto = Roboto({
  weight: '400',
  fallback: ['system-ui', 'arial'],
  subsets: ['latin'],
  display: 'swap',
})
```

--------------------------------

### Link Component with Prefetching in Next.js Layout

Source: https://nextjs.org/docs/app/getting-started/linking-and-navigating

Demonstrates using the Next.js Link component for automatic prefetching in a layout file. The Link component prefetches routes when hovered or entering the viewport, while regular anchor tags do not prefetch. This example shows a navigation layout with both Link and anchor elements.

```TypeScript
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

--------------------------------

### Managing Individual Fetch Requests with AbortController

Source: https://nextjs.org/docs/app/guides/caching

This snippet illustrates how to use `AbortController` and its `signal` property to gain fine-grained control over individual fetch requests. This method can be used to manage or opt out of default memoization behavior for specific `GET` requests, for instance, by canceling a pending request.

```JavaScript
const { signal } = new AbortController()
fetch(url, { signal })
```

--------------------------------

### Configuration Reference

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Next.js configuration through next.config.js provides extensive customization options for build behavior, optimization, headers, redirects, rewrites, and runtime settings.

```APIDOC
## next.config.js Configuration Options

### Description
The next.config.js file allows you to customize Next.js behavior with numerous configuration options for optimization, routing, build output, and runtime behavior.

### Core Configuration Options
- **basePath** - Route prefix for deployment
- **assetPrefix** - CDN prefix for assets
- **distDir** - Build output directory (default: .next)
- **env** - Environment variables
- **pageExtensions** - Extensions for page files
- **trailingSlash** - Trailing slash behavior
- **compress** - Gzip compression for pages
- **generateEtags** - Generate ETags for static assets
- **poweredByHeader** - X-Powered-By header
- **productionBrowserSourceMaps** - Source maps in production
- **reactStrictMode** - React strict mode

### Build & Output
- **output** - Output mode (standalone, export)
- **generateBuildId** - Custom build ID generation
- **bundlePagesRouterDependencies** - Bundle dependencies
- **transpilePackages** - Transpile external packages
- **optimizePackageImports** - Optimize package imports
- **webpack** - Webpack configuration
- **turbo** - Turbopack configuration

### Routing & Headers
- **redirects** - Redirect routes
- **rewrites** - Rewrite routes
- **headers** - Custom response headers
- **allowedDevOrigins** - Allowed dev origins
- **crossOrigin** - Cross-origin attribute

### Features
- **images** - Image optimization config
- **onDemandEntries** - On-demand entries config
- **serverExternalPackages** - External packages for server
- **urlImports** - Allow URL imports
- **useLightningcss** - Use Lightning CSS
- **webVitalsAttribution** - Web Vitals attribution

### Development
- **devIndicators** - Dev indicators config
- **eslint** - ESLint configuration
- **typescript** - TypeScript configuration
- **httpAgentOptions** - HTTP agent options
```

--------------------------------

### Import Global CSS in Next.js Root Layout

Source: https://nextjs.org/docs/app/guides/migrating/from-create-react-app

This example shows how to import a global CSS file, such as `index.css`, into the `app/layout.tsx` of a Next.js application. This ensures that global styles are applied across the entire application, consistent with how global CSS is handled in Create React App.

```TypeScript
import '../index.css'
export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

```JavaScript
import '../index.css'
export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

--------------------------------

### Add Vitest Test Script to package.json

Source: https://nextjs.org/docs/app/guides/testing/vitest

Update your `package.json` file to include a `test` script. This allows you to easily run Vitest from the command line using your preferred package manager, triggering Vitest's default watch mode.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest"
  }
}
```

--------------------------------

### Access Next.js Headers Asynchronously (Recommended)

Source: https://nextjs.org/docs/app/guides/upgrading/version-15

This example illustrates the updated asynchronous approach for retrieving HTTP headers in Next.js 15. The `headers()` function from `next/headers` now returns a Promise, necessitating the use of `await` to access the headers list.

```TypeScript
import { headers } from'next/headers'
// Before
constheadersList=headers()
constuserAgent=headersList.get('user-agent')
// After
constheadersList=awaitheaders()
constuserAgent=headersList.get('user-agent')
```

--------------------------------

### Import Global Styles in Next.js App Router Root Layout

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This example shows how to import global stylesheets into the `app/layout.js` file, which serves as the root layout for the Next.js App Router. This allows global styles to be applied across the entire application, lifting the previous restriction of `pages/_app.js`.

```JavaScript
import'../styles/globals.css'
export default function RootLayout({ children }) {
return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Next.js API Reference Overview

Source: https://nextjs.org/docs/app/guides

Next.js provides a comprehensive set of APIs for building web applications. This documentation covers components, functions, file-system conventions, configuration options, and CLI tools available in Next.js version 15.5.0 and the Pages Router.

```APIDOC
# Next.js API Reference

## Components
- **Font** - Optimize custom fonts in your application
- **Form** - Form component with built-in handling
- **Head** - Manage document head elements
- **Image** - Optimized image component for responsive images
- **Image (Legacy)** - Previous version of Image component
- **Link** - Client-side navigation between routes
- **Script** - Optimize third-party scripts

## Functions
- **getInitialProps** - Data fetching for both SSR and SSG
- **getServerSideProps** - Server-side rendering data fetching
- **getStaticPaths** - Define dynamic route parameters for SSG
- **getStaticProps** - Static site generation data fetching
- **NextRequest** - HTTP request object for Edge Runtime
- **NextResponse** - HTTP response object for Edge Runtime
- **useAmp** - Enable AMP mode in pages
- **useReportWebVitals** - Report Web Vitals metrics
- **useRouter** - Client-side router navigation
- **userAgent** - Parse user agent strings

## File-system Conventions
- **instrumentation.js** - Initialize application instrumentation
- **Middleware** - Request processing middleware
- **public** - Static assets directory
- **src Directory** - Optional source directory

## Configuration
- **next.config.js** - Main Next.js configuration file
- **TypeScript** - TypeScript configuration and support
- **ESLint** - ESLint integration and setup
```

--------------------------------

### Asynchronous Next.js Configuration with a Function (CommonJS)

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js

Since Next.js 12.1.0, `next.config.js` can export an asynchronous function. This is useful for performing async operations, like fetching data or reading files, to determine configuration options before Next.js starts.

```javascript
// @ts-check
module.exports = async (phase, { defaultConfig }) => {
/**
   * @type{import('next').NextConfig}
   */
const nextConfig = {
/* config options here */
  }
return nextConfig
}
```

--------------------------------

### Navigate with Next.js Link `href` Object (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/api-reference/components/link

Illustrates how to use the `href` prop with an object to navigate to dynamic routes or pass query parameters. This example navigates to `/about` while including a `name` query parameter, enabling more complex routing scenarios.

```TypeScript
import Link from'next/link'

// Navigate to /about?name=test
export default function Page() {
  return (
    <Link
      href={{
        pathname:'/about',
        query: { name:'test' }
      }}
    >
      About
    </Link>
  )
}
```

```JavaScript
import Link from'next/link'

// Navigate to /about?name=test
export default function Page() {
  return (
    <Link
      href={{
        pathname:'/about',
        query: { name:'test' }
      }}
    >
      About
    </Link>
  )
}
```

--------------------------------

### Migrate Route Handlers with Async Params in Next.js

Source: https://nextjs.org/docs/app/guides/upgrading/version-15

Demonstrates the migration of route handlers (GET, POST, etc.) to handle Promise-based params. The params type becomes a Promise, and segmentData.params must be awaited before accessing individual properties.

```typescript
// Before
type Params = { slug: string }
export async function GET(request: Request, segmentData: { params: Params }) {
  const params = segmentData.params
  const slug = params.slug
}
// After
type Params = Promise<{ slug: string }>
export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const slug = params.slug
}
```

--------------------------------

### Generate Next.js Bundle Analysis Report

Source: https://nextjs.org/docs/app/guides/package-bundling

Executes the Next.js build command with the `ANALYZE=true` environment variable, triggering the `@next/bundle-analyzer` to generate and display a visual report of your application's bundles in the browser.

```npm
ANALYZE=truenpmrunbuild
```

```yarn
ANALYZE=trueyarnbuild
```

```pnpm
ANALYZE=truepnpmbuild
```

--------------------------------

### Configure Google Font with Multiple Weights and Styles in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure a Google font with multiple weights and styles using arrays. This example demonstrates loading Roboto with weights 400 and 700 in both normal and italic styles for the Latin subset.

```javascript
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
```

--------------------------------

### Next.js CLI Commands

Source: https://nextjs.org/docs/app/guides/single-page-applications

Command-line interface commands for Next.js development, building, and deployment. Includes both the create-next-app scaffolding tool and the next CLI for runtime operations.

```APIDOC
## Next.js CLI Reference

### create-next-app CLI

#### Description
Scaffolds a new Next.js project with optional configuration for TypeScript, ESLint, Tailwind CSS, and src directory structure.

#### Command
```bash
npx create-next-app@latest [project-name] [options]
```

#### Options

##### --typescript (or --ts)
- **Type**: boolean
- **Default**: true
- **Description**: Initialize with TypeScript support
- **Usage**: `--ts` or `--no-ts`

##### --eslint
- **Type**: boolean
- **Default**: true
- **Description**: Configure ESLint
- **Usage**: `--eslint` or `--no-eslint`

##### --tailwind
- **Type**: boolean
- **Default**: true
- **Description**: Configure Tailwind CSS
- **Usage**: `--tailwind` or `--no-tailwind`

##### --src-dir
- **Type**: boolean
- **Default**: false
- **Description**: Create src/ directory for source files
- **Usage**: `--src-dir` or `--no-src-dir`

##### --app
- **Type**: boolean
- **Default**: true
- **Description**: Use App Router (vs Pages Router)
- **Usage**: `--app` or `--no-app`

##### --import-alias
- **Type**: string
- **Default**: '@/*'
- **Description**: Import alias for absolute imports
- **Usage**: `--import-alias '@/components/*'`

##### --skip-install
- **Type**: boolean
- **Default**: false
- **Description**: Skip npm install
- **Usage**: `--skip-install`

#### Examples

```bash
# Basic project
npx create-next-app@latest my-app

# With custom options
npx create-next-app@latest my-app --ts --tailwind --app

# Minimal setup
npx create-next-app@latest my-app --no-eslint --no-tailwind
```

### next CLI Commands

#### next dev

##### Description
Start development server with hot module replacement and file watching.

##### Command
```bash
next dev [options]
```

##### Options
- **-p, --port [port]** - Port number (default: 3000)
- **-H, --hostname [hostname]** - Hostname (default: localhost)
- **--experimental-app** - Enable App Router (v12)
- **--turbopack** - Use Turbopack (experimental)

#### next build

##### Description
Compile application for production deployment.

##### Command
```bash
next build [options]
```

##### Options
- **--profile** - Show build profiling
- **--debug** - Enable debug logging

##### Output
- Optimized bundle in `.next/` directory
- Build analysis and metrics
- Static page prerendering report

#### next start

##### Description
Start production server for compiled Next.js application.

##### Command
```bash
next start [options]
```

##### Options
- **-p, --port [port]** - Port number (default: 3000)
- **-H, --hostname [hostname]** - Hostname (default: localhost)
- **--keepAliveTimeout [timeout]** - Keep-alive timeout in ms

#### next export

##### Description
Export Next.js application as static HTML (requires `output: 'export'` in config).

##### Command
```bash
next export [options]
```

##### Options
- **-o, --outdir [dir]** - Output directory (default: out)

#### next telemetry

##### Description
Manage telemetry data collection settings.

##### Commands
```bash
next telemetry enable    # Enable telemetry
next telemetry disable   # Disable telemetry
next telemetry status    # Show current status
```

#### next lint

##### Description
Run ESLint on the project.

##### Command
```bash
next lint [options]
```

##### Options
- **--dir [dir]** - Directories to lint
- **--file [file]** - Files to lint
- **--fix** - Fix linting issues
- **--max-warnings [number]** - Max warnings before error

### Environment Variables

#### Development
```bash
# .env.local - local development
DATABASE_URL=postgres://...
API_KEY=secret_key
```

#### Production
```bash
# .env.production - production environment
DATABASE_URL=postgres://prod...
API_KEY=prod_key
```

#### Build Time
```bash
# .env.production.local - production build on local machine
DEBUG=true
```

### Common Workflows

#### Development
```bash
npm run dev
# Runs: next dev
```

#### Production Build
```bash
npm run build
npm run start
# Runs: next build && next start
```

#### Linting
```bash
npm run lint
# Runs: next lint --fix
```
```

--------------------------------

### Configure MDX Plugins for Turbopack in Next.js

Source: https://nextjs.org/docs/app/guides/mdx

Outlines the method for configuring `remark` and `rehype` plugins when using `@next/mdx` with Turbopack. Due to Turbopack's architecture, plugins must be specified as strings (with or without options) because JavaScript functions cannot be directly passed to Rust. This example shows configuring `remark-gfm`, `remark-toc`, `rehype-slug`, and `rehype-katex`.

```javascript
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Without options
      'remark-gfm',
      // With options
      ['remark-toc', { heading: 'The Table' }],
    ],
    rehypePlugins: [
      // Without options
      'rehype-slug',
      // With options
      ['rehype-katex', { strict: true, throwOnError: true }],
    ],
  },
})

export default withMDX(nextConfig)
```

--------------------------------

### Tag cached component with cacheTag

Source: https://nextjs.org/docs/app/api-reference/functions/cacheTag

Call cacheTag within an async cached component to tag its cached output. This example shows a Bookings component that caches booking data and tags it for later invalidation.

```TypeScript
import { unstable_cacheTag as cacheTag } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'haircut' }: BookingsProps) {
  'use cache'
  cacheTag('bookings-data')
  
  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }
  
  return //...
}
```

--------------------------------

### Configure next.config.mjs for MDX support

Source: https://nextjs.org/docs/app/guides/mdx

Configure the Next.js configuration file to process markdown and MDX files. This setup enables .md and .mdx files to act as pages and routes within the application, and allows MDX to be imported as components.

```javascript
import createMDX from '@next/mdx'

/** @type{import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
```

--------------------------------

### Set Category Metadata in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

This example shows how to define a category for the page using Next.js metadata within a `layout.js` or `page.js` file. It accepts a string value for the category, generating a `<meta name='category' />` tag in the HTML head.

```javascript
export const metadata = {
  category:'technology'
}
```

--------------------------------

### GET /api/draft

Source: https://nextjs.org/docs/app/guides/draft-mode

This endpoint enables Draft Mode in a Next.js application. It sets a cookie to switch static pages to dynamic rendering, allowing preview of draft content from a headless CMS without rebuilding the site.

```APIDOC
## GET /api/draft

### Description
This Route Handler enables Next.js Draft Mode by setting the `__prerender_bypass` cookie. When active, subsequent requests will trigger draft mode, allowing for dynamic rendering and preview of draft content on statically generated pages.

### Method
GET

### Endpoint
/api/draft

### Parameters
#### Path Parameters
- No path parameters.

#### Query Parameters
- No query parameters.

#### Request Body
- No request body required for this GET request.

### Request Example
```
GET /api/draft
```

### Response
#### Success Response (200)
- **response** (string) - A confirmation message indicating that Draft Mode has been enabled.

#### Response Example
```
Draft mode is enabled
```
```

--------------------------------

### Create a getDictionary Function to Load Next.js Localization

Source: https://nextjs.org/docs/app/guides/internationalization

This TypeScript function, intended for server-only execution, dynamically loads the appropriate dictionary based on the requested locale. It imports JSON translation files and exports an asynchronous function to retrieve them.

```typescript
import'server-only'
constdictionaries= {
en: () =>import('./dictionaries/en.json').then((module) =>module.default),
nl: () =>import('./dictionaries/nl.json').then((module) =>module.default),
}
exportconstgetDictionary=async (locale:'en'|'nl') =>
  dictionaries[locale]()
```

--------------------------------

### Next.js Type Generation Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Generates TypeScript type definitions for routes, pages, layouts, and route handlers without executing a full build process. Useful for getting type safety and IDE autocomplete for Next.js file-based routing.

```bash
next typegen
```

--------------------------------

### Configure Variable Font with Additional Axes in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure a variable Google font with additional axes beyond the default weight axis. This example demonstrates adding the slnt (slant) axis to the Inter variable font.

```javascript
const inter = Inter({
  axes: ['slnt'],
  subsets: ['latin'],
  display: 'swap',
})
```

--------------------------------

### Implement `unauthorized` Check in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/unauthorized

This example demonstrates how to use the `unauthorized` function within a Server Component, specifically for a dashboard page. If the user's session cannot be verified, `unauthorized()` is invoked, leading to a 401 error page.

```TypeScript
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()
  if (!session) {
    unauthorized()
  }
  // Render the dashboard for authenticated users
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Hi, {session.user.name}.</p>
    </main>
  )
}
```

--------------------------------

### Create a Nested Route for Blog in Next.js

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Create nested routes by organizing folders within the `app` directory, where each folder represents a URL segment. To make a route publicly accessible, include a `page.tsx` file within the innermost folder, as demonstrated for the `/blog` route. This example shows fetching posts asynchronously and rendering them, highlighting how folders define segments and files create UI.

```TypeScript
// Dummy imports
import { getPosts } from '@/shared/posts'
import { Post } from '@/ui/post'
export default async function Page() {
const posts = await getPosts()
return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

--------------------------------

### Load Application-Wide Third-Party Script in Next.js Root Layout

Source: https://nextjs.org/docs/app/guides/scripts

This example shows how to load a third-party script for all routes across the entire Next.js application by placing the `next/script` component directly in the root layout. The script will load and execute once when any route in the application is accessed.

```TypeScript
import Script from'next/script'
export default function RootLayout({
  children,
}: {
  children:React.ReactNode
}) {
return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

--------------------------------

### Manual Prefetch Link with useRouter in Next.js

Source: https://nextjs.org/docs/app/guides/prefetching

Creates a custom link component that manually handles prefetching using Next.js useRouter hook. Implements cache invalidation polling via the onInvalidate callback to refresh stale prefetched data. Uses an anchor tag with onClick handler to prevent full page navigation and invoke router.push instead.

```TypeScript
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
function ManualPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()
  useEffect(() => {
    let cancelled = false
    const poll = () => {
      if (!cancelled) router.prefetch(href, { onInvalidate: poll })
    }
    poll()
    return () => {
      cancelled = true
    }
  }, [href, router])
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault()
        router.push(href)
      }}
    >
      {children}
    </a>
  )
}
```

--------------------------------

### unstable_cache with Tags and Revalidation Options

Source: https://nextjs.org/docs/app/api-reference/functions/unstable_cache

Shows advanced usage of unstable_cache with cache tags for invalidation control and revalidate option for time-based cache expiration. This example demonstrates proper handling of dynamic parameters by including them in the keyParts array.

```TypeScript
import { unstable_cache } from 'next/cache'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId }
    },
    [userId], // add the user ID to the cache key
    {
      tags: ['users'],
      revalidate: 60,
    }
  )
  // ...
}
```

--------------------------------

### Fix Unwanted Side-Effects During Prefetching - After Pattern

Source: https://nextjs.org/docs/app/guides/prefetching

Correct pattern using useEffect hook in a client component to ensure side-effects only run when the page is actually visited, not during prefetch. Separates analytics tracking into a dedicated AnalyticsTracker component that is imported into the layout.

```TypeScript
'use client'
import { useEffect } from 'react'
import { trackPageView } from '@/shared/analytics'
export function AnalyticsTracker() {
  useEffect(() => {
    trackPageView()
  }, [])
  return null
}
```

```TypeScript
import { AnalyticsTracker } from '@/app/ui/analytics-tracker'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AnalyticsTracker />
      {children}
    </div>
  )
}
```

--------------------------------

### Define Root Layout in Next.js App Directory (TypeScript)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This TypeScript example demonstrates creating the mandatory `app/layout.tsx` file, which serves as the root layout for all routes within the `app` directory. It must accept a `children` prop and explicitly define `<html>` and `<body>` tags, replacing the older `_app.tsx` and `_document.tsx` files.

```typescript
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Fix Unwanted Side-Effects During Prefetching - Before Pattern

Source: https://nextjs.org/docs/app/guides/prefetching

Demonstrates the problematic pattern where side-effects (e.g., analytics tracking) are executed at the layout component level during prefetch, before the user actually visits the page. This causes unintended tracking calls and should be avoided.

```TypeScript
import { trackPageView } from '@/shared/analytics'
export default function Layout({ children }: { children: React.ReactNode }) {
  // This runs during prefetch
  trackPageView()
  return <div>{children}</div>
}
```

--------------------------------

### Next.js: Integrate Link Loading Indicators in Layouts

Source: https://nextjs.org/docs/app/api-reference/functions/use-link-status

This example expands on the `useLinkStatus` hook by demonstrating its integration within a Next.js layout component. It shows how to map over a list of links, each with its own `LoadingIndicator`, ensuring that every navigation action provides visual feedback to the user, particularly useful for menu bars or navigation lists.

```TypeScript
'use client'
import { useLinkStatus } from'next/link'
exportdefaultfunctionLoadingIndicator() {
const { pending } =useLinkStatus()
return pending ? (
    <divrole="status"aria-label="Loading"className="spinner" />
  ) :null
}
```

```JavaScript
'use client'
import { useLinkStatus } from'next/link'
exportdefaultfunctionLoadingIndicator() {
const { pending } =useLinkStatus()
return pending ? (
    <divrole="status"aria-label="Loading"className="spinner" />
  ) :null
}
```

```TypeScript
import Link from'next/link'
import LoadingIndicator from'./components/loading-indicator'
constlinks= [
  { href:'/shop/electronics', label:'Electronics' },
  { href:'/shop/clothing', label:'Clothing' },
  { href:'/shop/books', label:'Books' },
]
functionMenubar() {
return (
    <div>
      {links.map((link) => (
        <Linkkey={link.label} href={link.href}>
          {link.label} <LoadingIndicator />
        </Link>
      ))}
    </div>
  )
}
exportdefaultfunctionLayout({ children }: { children:React.ReactNode }) {
return (
    <div>
      <Menubar />
      {children}
    </div>
  )
}
```

```JavaScript
import Link from'next/link'
import LoadingIndicator from'./components/loading-indicator'
constlinks= [
  { href:'/shop/electronics', label:'Electronics' },
  { href:'/shop/clothing', label:'Clothing' },
  { href:'/shop/books', label:'Books' },
]
functionMenubar() {
return (
    <div>
      {links.map((link) => (
        <Linkkey={link.label} href={link.href}>
          {link.label} <LoadingIndicator />
        </Link>
      ))}
    </div>
  )
}
exportdefaultfunctionLayout({ children }) {
return (
    <div>
      <Menubar />
      {children}
    </div>
  )
}
```

--------------------------------

### API Reference: File-system conventions (App Router)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Explains the file-system conventions used in Next.js App Router, including special files and directories.

```APIDOC
## File-system conventions

### Description
This section explains the file-system conventions used in Next.js App Router.

### File-system conventions
- default.js
- Dynamic Segments
- error.js
- forbidden.js
- instrumentation.js
- instrumentation-client.js
- Intercepting Routes
- layout.js
- loading.js
- mdx-components.js
- middleware.js
- not-found.js
- page.js
- Parallel Routes
- public
```

--------------------------------

### Enable experimental webpack memory optimizations in Next.js config

Source: https://nextjs.org/docs/app/guides/memory-usage

Add the experimental.webpackMemoryOptimizations flag to next.config.js to reduce maximum memory usage during webpack builds. This feature is available starting in v15.0.0 and may slightly increase compilation times.

```javascript
// next.config.js
module.exports = {
  experimental: {
    webpackMemoryOptimizations: true
  }
}
```

--------------------------------

### Define Multiline Environment Variables in Next.js .env

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

This example shows how to define multiline environment variables in a `.env` file, useful for keys or certificates. Multiline values can be written directly with line breaks or by escaping newlines with `\n` inside double quotes.

```plaintext
# .env
# you can write with line breaks
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END DSA PRIVATE KEY-----"
# or with `\n` inside double quotes
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END DSA PRIVATE KEY-----\n"
```

--------------------------------

### Configure OpenTelemetry with @vercel/otel in Next.js

Source: https://nextjs.org/docs/app/guides/open-telemetry

Create an `instrumentation.ts` (or `.js`) file in your project's root or `src` directory to register OpenTelemetry. This configuration uses `@vercel/otel` to initialize OpenTelemetry with a specified service name for your Next.js application.

```typescript
import { registerOTel } from'@vercel/otel'

exportfunctionregister() {
registerOTel({ serviceName:'next-app' })
}
```

--------------------------------

### Define Server-Side Function in TypeScript using File-Level `use server`

Source: https://nextjs.org/docs/app/api-reference/directives/use-server

This example demonstrates how to apply the `use server` directive at the very top of a TypeScript file. By doing so, all functions defined within this file, such as `createUser`, are automatically designated to run on the server, ensuring server-side execution for database interactions or other sensitive operations.

```TypeScript
'use server'
import { db } from'@/shared/db'// Your database client
exportasyncfunctioncreateUser(data: { name:string; email:string }) {
constuser=awaitdb.user.create({ data })
return user
}
```

--------------------------------

### Analyze heap snapshot with NODE_OPTIONS inspect flag

Source: https://nextjs.org/docs/app/guides/memory-usage

Set NODE_OPTIONS=--inspect when running next build or next dev to expose the inspector agent on the default port. Use --inspect-brk to break before user code starts. Connect Chrome DevTools to record and analyze heap snapshots to identify retained memory.

```bash
NODE_OPTIONS=--inspect next build
```

```bash
NODE_OPTIONS=--inspect-brk next build
```

--------------------------------

### Next.js File-system Conventions Overview

Source: https://nextjs.org/docs/app/guides/single-page-applications

Documentation of special files and conventions used in Next.js projects to define routes, layouts, middleware, and configuration. These conventions enable automatic route creation and special handling of requests.

```APIDOC
## File-system Conventions

### Overview
Next.js uses special file naming conventions to automatically create routes and handle specific request patterns. These conventions work in the `/app` directory (App Router) and `/pages` directory (Pages Router).

### App Router Conventions

#### page.js
- **Purpose**: Defines the UI for a route segment
- **Required**: Yes, to make a segment publicly accessible
- **Location**: `app/[segment]/page.js`

#### layout.js
- **Purpose**: Defines shared UI for multiple routes in a segment
- **Nesting**: Layouts can be nested and automatically wrap child routes
- **Location**: `app/[segment]/layout.js`

#### error.js
- **Purpose**: Error boundary for handling errors in a route segment
- **Scope**: Catches errors in child segments
- **Location**: `app/[segment]/error.js`

#### not-found.js
- **Purpose**: UI displayed when a route is not found (404)
- **Location**: `app/[segment]/not-found.js`

#### loading.js
- **Purpose**: Suspense boundary UI shown while content loads
- **Location**: `app/[segment]/loading.js`

#### middleware.js
- **Purpose**: Request middleware for authentication, redirects, or logging
- **Location**: `middleware.js` (root or `/app` directory)
- **Execution**: Runs before route handlers

#### instrumentation.js
- **Purpose**: Server-side initialization and monitoring setup
- **Location**: `instrumentation.js` (root)

#### instrumentation-client.js
- **Purpose**: Client-side initialization and monitoring setup
- **Location**: `instrumentation-client.js` (root)

#### default.js
- **Purpose**: Fallback UI for parallel routes when no match exists
- **Location**: `app/[segment]/[@slot]/default.js`

#### mdx-components.js
- **Purpose**: Custom MDX component configuration
- **Location**: `mdx-components.js` (root)

### Dynamic Segments
- **Syntax**: `[param]` for single segment, `[...param]` for catch-all
- **Access**: Via `params` prop in page components
- **Example**: `app/blog/[slug]/page.js` matches `/blog/any-post`

### Intercepting Routes
- **Syntax**: `(.)`, `(..)`, `(...)`
- **Purpose**: Intercept and handle routes before normal rendering
- **Use Case**: Modal dialogs, sidebar navigation

### Parallel Routes
- **Syntax**: `@slotName` directory
- **Purpose**: Render multiple segments simultaneously
- **Example**: `app/@modal/page.js` and `app/@sidebar/page.js`

### public Directory
- **Purpose**: Static assets served directly without processing
- **Location**: `/public` directory
- **Access**: Via `/filename` in URLs
```

--------------------------------

### Write Cypress E2E Test for Next.js Navigation

Source: https://nextjs.org/docs/app/guides/testing/cypress

This Cypress E2E test script (`app.cy.js`) verifies that navigation between the home and about pages works correctly within a Next.js application. It simulates user interaction by visiting the home page, clicking the 'About' link, and then asserting that the URL and page content match the expected 'About' page, ensuring the navigation output is correct.

```javascript
describe('Navigation', () => {
it('should navigate to the about page', () => {
// Start from the index page
cy.visit('http://localhost:3000/')
// Find a link with an href attribute containing "about" and click it
cy.get('a[href*="about"]').click()
// The new url should include "/about"
cy.url().should('include','/about')
// The new page should contain an h1 with "About"
cy.get('h1').contains('About')
  })
})
```

--------------------------------

### Configure Sass options in Next.js config

Source: https://nextjs.org/docs/app/guides/sass

Configure Sass compilation options using the sassOptions property in next.config.ts. This example demonstrates adding additional Sass data, such as global variables, that are prepended to every Sass file during compilation.

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}

export default nextConfig
```

--------------------------------

### Implement waitUntil with AsyncLocalStorage in Node.js

Source: https://nextjs.org/docs/app/api-reference/functions/after

Complete implementation example for providing the `waitUntil` functionality in a serverless Node.js environment. Uses AsyncLocalStorage to manage request-scoped context and runs the Next.js handler within that context, allowing the `after` function to access the `waitUntil` primitive.

```javascript
import { AsyncLocalStorage } from 'node:async_hooks'

const RequestContextStorage = new AsyncLocalStorage<NextRequestContextValue>()

// Define and inject the accessor that next.js will use
const RequestContext: NextRequestContext = {
  get() {
    return RequestContextStorage.getStore()
  },
}

globalThis[Symbol.for('@next/request-context')] = RequestContext

const handler = (req, res) => {
  const contextValue = { waitUntil: YOUR_WAITUNTIL }
  // Provide the value
  return RequestContextStorage.run(contextValue, () => nextJsHandler(req, res))
}
```

--------------------------------

### Hooks and Utilities

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Reference for Next.js hooks and utility functions including useRouter, useSearchParams, usePathname for client-side navigation and routing, plus server-side utilities.

```APIDOC
## Hooks and Utility Functions

### useRouter Hook

#### Description
Access the Next.js router object to navigate and access routing information (Pages Router and App Router).

#### Usage
```javascript
'use client'
import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()
}
```

#### Methods
- **router.push(url, { scroll })** - Navigate to URL
- **router.replace(url, { scroll })** - Replace history entry
- **router.prefetch(url)** - Prefetch URL
- **router.back()** - Go back
- **router.forward()** - Go forward
- **router.refresh()** - Refresh page (App Router)

#### Properties
- **router.pathname** (string) - Current pathname
- **router.query** (object) - Query parameters
- **router.asPath** (string) - Actual path including query
- **router.isReady** (boolean) - Router initialized
- **router.isLocaleDomain** (boolean) - Locale domain routing

### usePathname Hook

#### Description
Get the current pathname in App Router applications.

#### Usage
```javascript
'use client'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  // Returns: '/about' or '/en/about'
}
```

#### Return Value
- Type: string
- Current pathname including locale prefix if applicable

### useSearchParams Hook

#### Description
Access and manipulate URL search parameters.

#### Usage
```javascript
'use client'
import { useSearchParams } from 'next/navigation'

export default function Component() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
}
```

#### Methods
- **searchParams.get(key)** - Get parameter value
- **searchParams.getAll(key)** - Get all values for key
- **searchParams.has(key)** - Check if key exists
- **searchParams.forEach(callback)** - Iterate parameters
- **searchParams.keys()** - Get all keys
- **searchParams.entries()** - Get all entries

### useReportWebVitals Hook

#### Description
Report Web Vitals metrics for performance monitoring.

#### Usage
```javascript
import { useReportWebVitals } from 'next/web-vitals'

export function reportWebVitals(metric) {
  console.log(metric)
}
```

#### Metric Object
- **value** (number) - Metric value in milliseconds
- **id** (string) - Unique ID
- **label** (string) - Metric label
- **name** (string) - Metric name (CLS, FID, FCP, INP, LCP, TTFB)
- **delta** (number) - Difference from previous measurement
- **entries** (array) - Performance entries
- **navigationType** (string) - Navigation type
- **attribution** (object) - Attribution details

### useAmp Hook

#### Description
Detect if page is being served as AMP (Accelerated Mobile Pages).

#### Usage
```javascript
import { useAmp } from 'next/amp'

export default function Component() {
  const isAmp = useAmp()
  return isAmp ? <amp-component /> : <regular-component />
}
```

#### Return Value
- Type: boolean
- true if AMP version is served

### userAgent Utility

#### Description
Parse user agent string to detect device type and browser.

#### Usage
```javascript
import { userAgent } from 'next/server'

export function middleware(request) {
  const ua = userAgent(request)
  if (ua.isBot) {
    // Handle bot
  }
}
```

#### Properties
- **isBot** (boolean) - Is user agent a bot
- **isMobile** (boolean) - Is mobile device
- **isDesktop** (boolean) - Is desktop
- **device.type** (string) - Device type
- **device.vendor** (string) - Device vendor
- **device.model** (string) - Device model
- **browser.name** (string) - Browser name
- **browser.version** (string) - Browser version
- **os.name** (string) - OS name
- **os.version** (string) - OS version
- **cpu.architecture** (string) - CPU architecture

### NextRequest and NextResponse

#### NextRequest
- Extends Web Request API
- Available in middleware and route handlers
- Properties:
  - **nextUrl** - Next.js enhanced URL
  - **cookies** - Cookie handling
  - **geo** - Geographic information
  - **ip** - Client IP address
  - **userAgent** - Parsed user agent

#### NextResponse
- Extends Web Response API
- Methods:
  - **NextResponse.json(data, init)** - JSON response
  - **NextResponse.next()** - Continue to next middleware
  - **NextResponse.redirect(url)** - Redirect response
  - **NextResponse.rewrite(url)** - URL rewrite
  - **NextResponse.error()** - Error response

### Server-side Utilities

#### getServerSideProps
- Context object with:
  - params, query, req, res, resolvedUrl, locale, locales

#### getStaticProps
- Context object with:
  - params, preview, previewData, locale, locales, defaultLocale

#### getInitialProps
- Legacy utility for both server and client
- Context: { pathname, query, asPath, req, res, AppTree }

### Form and Mutation Utilities

#### useTransition (React 18+)
- Track async action state

#### useActionState (React 19+)
- Server action state management

#### Server Actions
- 'use server' directive functions
- Direct database and API access
- Automatic security and error handling
```

--------------------------------

### Import global CSS in Next.js root layout with TypeScript

Source: https://nextjs.org/docs/app/guides/tailwind-v3-css

This `RootLayout` component, written in TypeScript, imports the `globals.css` file to ensure that the Tailwind CSS styles are loaded for the entire application. It defines the basic HTML structure for the Next.js app.

```TypeScript
import'./globals.css'
exportdefaultfunctionRootLayout({
  children,
}: {
  children:React.ReactNode
}) {
return (
    <htmllang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Configure Non-Variable Google Font with Weight in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Import and configure a non-variable Google font (Roboto) that requires explicit weight specification. This example shows how to set font weight and apply the font class to the root layout component.

```typescript
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Determine Active Navigation Links with usePathname

Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout

Use the usePathname hook in a client component to get the current pathname and conditionally apply active styles to navigation links. Extract NavLinks into a client component and import it into the layout.

```TypeScript
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
  const pathname = usePathname()
  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>
      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href="/about"
      >
        About
      </Link>
    </nav>
  )
}
```

--------------------------------

### Dynamically Import Named Exports in Next.js

Source: https://nextjs.org/docs/app/guides/lazy-loading

This example demonstrates how to dynamically import a named export from a module in Next.js. The `import()` function returns a Promise, from which the specific named export (e.g., `mod.Hello`) is then extracted and used.

```javascript
'use client'
export function Hello() {
  return <p>Hello!</p>
}
```

```javascript
import dynamic from'next/dynamic'
const ClientComponent = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
)
```

--------------------------------

### Building Your Application - Routing

Source: https://nextjs.org/docs/app/guides

Core routing concepts for Next.js including pages, dynamic routes, linking, navigation, and custom error handling.

```APIDOC
# Routing

## Pages and Layouts
Organize your application with pages and shared layouts.

## Dynamic Routes
Create routes with dynamic parameters using bracket notation.

**Example:**
```
pages/posts/[id].js - /posts/1, /posts/2, etc.
```

## Linking and Navigating
- **Link Component** - Declarative client-side navigation
- **useRouter Hook** - Programmatic navigation
- Route prefetching for performance

## Custom App
Wrap your entire application with custom initialization and layout.

**File:** `pages/_app.js`

## Custom Document
Customize the HTML document structure.

**File:** `pages/_document.js`

## API Routes
Create serverless API endpoints.

**File:** `pages/api/[...].js`

## Custom Errors
Handle 404 and 500 errors with custom pages.

**Files:**
- `pages/404.js` - Not Found
- `pages/500.js` - Server Error
```

--------------------------------

### Configure Next.js Server Actions Allowed Origins

Source: https://nextjs.org/docs/app/guides/multi-zones

When using Server Actions in a Multi-Zone setup, it's necessary to explicitly allow the user-facing origin in `next.config.js`. This configuration ensures that Server Actions originating from your unified domain are permitted to interact with the backend, preventing security restrictions that might arise from multiple application origins.

```javascript
constnextConfig= {
  experimental: {
    serverActions: {
      allowedOrigins: ['your-production-domain.com'],
    },
  },
}
```

--------------------------------

### Optimize Tailwind CSS package scanning scope

Source: https://nextjs.org/docs/app/guides/local-development

Configure Tailwind CSS to scan only specific package directories instead of broad paths that might include node_modules. This example demonstrates scanning only the 'src' folder of a UI package to improve build performance.

```javascript
module.exports = {
  content: [
    // Better - only scans the 'src' folder
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}
```

--------------------------------

### API Reference: Components (App Router)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Describes the components available in the app router.

```APIDOC
## Components

### Description
This section describes the components available in the app router.

### Components
- Font
- Form Component
- Image Component
- Link Component
- Script Component
```

--------------------------------

### Migrate Next.js Linting from `next lint` to ESLint CLI (v16.0)

Source: https://nextjs.org/docs/app/guides/upgrading/codemods

This codemod automates the migration of Next.js projects from using `next lint` to directly leveraging the ESLint CLI. It creates a new `eslint.config.mjs` with recommended Next.js configurations, updates `package.json` scripts, and adds necessary ESLint dependencies while preserving existing configurations. This ensures a smoother transition to the standard ESLint setup.

```Terminal
npx @next/codemod @canary next-lint-to-eslint-cli .
```

```json
{
  "scripts": {
    "lint": "next lint"
  }
}
```

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

```javascript
import { dirname } from'path'
import { fileURLToPath } from'url'
import { FlatCompat } from'@eslint/eslintrc'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]
export default eslintConfig
```

--------------------------------

### Extend Recommended Next.js ESLint Plugin Rules

Source: https://nextjs.org/docs/app/api-reference/config/eslint

This configuration snippet illustrates how to extend the recommended ESLint rules directly from the `@next/eslint-plugin-next` package. It's suggested for existing ESLint setups where `eslint-config-next` might conflict with pre-installed plugins or custom `parserOptions`.

```javascript
module.exports= {
  extends: [
//...
'plugin:@next/next/recommended',
  ],
}
```

--------------------------------

### API Reference: Edge Runtime

Source: https://nextjs.org/docs/app/getting-started/project-structure

Information about the Edge Runtime environment in Next.js.

```APIDOC
## API Reference: Edge Runtime

### Description
This section details the Edge Runtime environment in Next.js.

### Edge Runtime
```

--------------------------------

### headers() - Read Request Headers

Source: https://nextjs.org/docs/app/api-reference/functions/headers

An async function that retrieves HTTP incoming request headers from a Server Component. Returns a read-only Web Headers object that provides methods to get, check, and iterate through header key/value pairs.

```APIDOC
## headers()

### Description
An async function that allows you to read the HTTP incoming request headers from a Server Component. Returns a read-only Web Headers object.

### Function Signature
```typescript
const headersList = await headers()
```

### Parameters
The `headers` function does not take any parameters.

### Returns
Returns a **read-only** Web Headers object with the following methods:

- **Headers.entries()** - Returns an iterator allowing to go through all key/value pairs
- **Headers.forEach()** - Executes a provided function once for each key/value pair
- **Headers.get(name)** - Returns a String of all values of a header with a given name
- **Headers.has(name)** - Returns a boolean stating whether a header exists
- **Headers.keys()** - Returns an iterator of all keys in the Headers object
- **Headers.values()** - Returns an iterator of all values in the Headers object

### Request Example
```typescript
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  return <div>{userAgent}</div>
}
```

### Using the Authorization Header Example
```typescript
import { headers } from 'next/headers'

export default async function Page() {
  const authorization = (await headers()).get('authorization')
  const res = await fetch('https://api.example.com/user', {
    headers: { authorization }
  })
  const user = await res.json()
  return <h1>{user.name}</h1>
}
```

### Important Notes
- `headers` is an **asynchronous** function that returns a promise. Must use `async/await` or React's `use` function
- The function is **read-only** - cannot set or delete outgoing request headers
- `headers` is a Dynamic API - using it opts a route into **dynamic rendering**
- In Next.js 15+, `headers` is fully async (was synchronous in v14 and earlier)

### Version History
| Version | Changes |
|---------|----------|
| v15.0.0-RC | `headers` is now an async function. A codemod is available. |
| v13.0.0 | `headers` introduced. |
```

--------------------------------

### Detect User Locale using Accept-Language Header

Source: https://nextjs.org/docs/app/guides/internationalization

Uses the @formatjs/intl-localematcher and negotiator libraries to parse the incoming Accept-Language header and match it against supported locales. Returns the best matching locale based on user preferences and fallback to default locale.

```javascript
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'

match(languages, locales, defaultLocale) // -> 'en-US'
```

--------------------------------

### Create Responsive Image with Fill and ObjectFit in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/image

This example shows how to use the `fill` prop with `objectFit` set to `cover` on the `next/image` component. This configuration allows the image to fill the full width of its parent container, especially useful when the image's aspect ratio is unknown.

```jsx
import Image from'next/image'
import mountains from'../public/mountains.jpg'
export default function Fill() {
  return (
    <div
      style={{
        display:'grid',
        gridGap:'8px',
        gridTemplateColumns:'repeat(auto-fit, minmax(400px, auto))'
      }}
    >
      <div style={{ position:'relative', width:'400px' }}>
        <Image
          alt="Mountains"
          src={mountains}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit:'cover'
          }}
        />
      </div>
    </div>
  )
}
```

--------------------------------

### Create custom Next.js server with HTTP module

Source: https://nextjs.org/docs/app/guides/custom-server

Sets up a custom Node.js HTTP server that integrates with Next.js. The server listens on a specified port and handles requests through Next.js's request handler. This approach allows programmatic server startup for custom patterns while maintaining Next.js routing and rendering capabilities.

```TypeScript
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
```

--------------------------------

### Redirect Client-Side in Next.js with useRouter Hook

Source: https://nextjs.org/docs/app/guides/redirecting

This example demonstrates how to perform client-side navigation using the `useRouter` hook in a Next.js Client Component. It shows a button that, when clicked, uses `router.push('/dashboard')` to programmatically redirect the user to the `/dashboard` route, which is suitable for event-driven redirects.

```TypeScript
'use client'
import { useRouter } from'next/navigation'
exportdefaultfunctionPage() {
constrouter=useRouter()
return (
    <buttontype="button"onClick={() =>router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

--------------------------------

### Generate Static Localized Routes in Next.js with generateStaticParams

Source: https://nextjs.org/docs/app/guides/internationalization

Illustrates how to use `generateStaticParams` in a Next.js layout to pre-render static routes for different locales. This function returns an array of language parameters, enabling static generation for internationalized paths.

```typescript
exportasyncfunctiongenerateStaticParams() {
return [{ lang:'en-US' }, { lang:'de' }]
}
exportdefaultasyncfunctionRootLayout({
  children,
  params,
}:Readonly<{
  children:React.ReactNode
  params:Promise<{ lang:'en-US'|'de' }>
}>) {
return (
    <htmllang={(await params).lang}>
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### URL Rewrite with Manual Query Parameter Passing in Next.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites

Shows how to manually pass parameters as query strings in the destination even when they are used in the path. This example uses the :first parameter in the path and manually adds :second as a query parameter, allowing selective parameter forwarding.

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:first/:second',
        destination: '/:first?second=:second'
      }
    ]
  }
}
```

--------------------------------

### Client-side Instrumentation File (instrumentation-client.js|ts)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

The `instrumentation-client.js|ts` file provides a mechanism to add monitoring, analytics, and other client-side side-effects before a Next.js application becomes interactive. This allows for early setup of observability tools. Implement try-catch blocks for robust monitoring to prevent individual tracking failures from affecting other instrumentation features.

```APIDOC
## Client-side Instrumentation File `instrumentation-client.js|ts`

### Description
The `instrumentation-client.js|ts` file allows you to add monitoring, analytics code, and other side-effects that run before your Next.js application becomes interactive. This is useful for setting up performance tracking, error monitoring, polyfills, or any other client-side observability tools.

### Usage
To use it, place the file in the **root** of your application or inside a `src` folder. Unlike server-side instrumentation, you do not need to export any specific functions; you can write your monitoring code directly in the file.

### Execution Timing
The `instrumentation-client.js|ts` file executes at a specific point in the application lifecycle:
1.  **After** the HTML document is loaded
2.  **Before** React hydration begins
3.  **Before** user interactions are possible

This timing makes it ideal for setting up error tracking, analytics, and performance monitoring that needs to capture early application lifecycle events.

### Best Practices / Considerations
*   **Keep instrumentation code lightweight.** Next.js monitors initialization time in development and will log warnings if it takes longer than 16ms, which could impact smooth page loading.
*   **Error handling:** Implement try-catch blocks around your instrumentation code to ensure robust monitoring. This prevents individual tracking failures from affecting other instrumentation features.

### Code Example
```typescript
// Set up performance monitoring
performance.mark('app-init')
// Initialize analytics
console.log('Analytics initialized')
// Set up error tracking
window.addEventListener('error', (event) => {
  // Send to your error tracking service
  reportError(event.error)
})
```

### Additional Examples
#### Error Tracking
Initialize error tracking before React starts and add navigation breadcrumbs for better debugging context.
```typescript
import Monitor from './lib/monitoring'
Monitor.initialize()
export function onRouterTransitionStart(url: string) {
  Monitor.pushEvent({
    message: `Navigation to ${url}`,
    category: 'navigation',
  })
}
```

#### Analytics Tracking
Initialize analytics and track navigation events with detailed metadata for user behavior analysis.
```typescript
import { analytics } from './lib/analytics'
analytics.init()
export function onRouterTransitionStart(url: string, navigationType: string) {
  analytics.track('page_navigation', {
    url,
    type: navigationType,
    timestamp: Date.now(),
  })
}
```

#### Performance Monitoring
Track Time to Interactive and navigation performance using the Performance Observer API and performance marks.
```typescript
const startTime = performance.now()
const observer = new PerformanceObserver(
  (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      if (entry instanceof PerformanceNavigationTiming) {
        console.log('Time to Interactive:', entry.loadEventEnd - startTime)
      }
    }
  }
)
observer.observe({ entryTypes: ['navigation'] })
export function onRouterTransitionStart(url: string) {
  performance.mark(`nav-start-${url}`)
}
```
```

--------------------------------

### Configuration & Environment API

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Next.js provides comprehensive configuration options through next.config.js for customizing build behavior, performance optimization, and environment variable management.

```APIDOC
# Next.js Configuration

## next.config.js Options

### Basic Structure
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // configuration options
}

module.exports = nextConfig
```

### Common Options

#### assetPrefix
- **Type**: String
- **Purpose**: CDN or sub-path prefix for assets
- **Example**: `assetPrefix: 'https://cdn.example.com'`

#### basePath
- **Type**: String
- **Purpose**: Base path for application
- **Example**: `basePath: '/app'`

#### compress
- **Type**: Boolean
- **Default**: true
- **Purpose**: Enable gzip compression

#### crossOrigin
- **Type**: String
- **Values**: 'anonymous' | 'use-credentials'
- **Purpose**: Set CORS attribute on resources

#### distDir
- **Type**: String
- **Default**: '.next'
- **Purpose**: Build output directory

#### env
- **Type**: Object
- **Purpose**: Expose variables to browser
- **Example**: `env: { API_URL: process.env.API_URL }`

#### eslint
- **Type**: Object
- **Purpose**: Configure ESLint integration
- **Example**: `eslint: { dirs: ['pages', 'utils'] }`

#### headers
- **Type**: Function returning Array
- **Purpose**: Add custom HTTP headers

#### images
- **Type**: Object
- **Purpose**: Configure image optimization
- **Options**:
  - `domains`: Array of allowed image domains
  - `sizes`: Array of responsive image sizes
  - `formats`: Supported image formats
  - `deviceSizes`: Device breakpoints

#### output
- **Type**: String
- **Values**: 'standalone' | 'export'
- **Purpose**: Build output format

#### pageExtensions
- **Type**: Array
- **Default**: ['tsx', 'ts', 'jsx', 'js']
- **Purpose**: File extensions for pages

#### redirects
- **Type**: Function returning Array
- **Purpose**: Configure URL redirects

#### rewrites
- **Type**: Function or Object
- **Purpose**: Rewrite URL paths

#### trailingSlash
- **Type**: Boolean
- **Purpose**: Add trailing slash to URLs

#### typescript
- **Type**: Object
- **Purpose**: TypeScript configuration
- **Options**:
  - `tsconfigPath`: Path to tsconfig.json
  - `ignoreDevErrors`: Ignore TS errors in dev

#### webpack
- **Type**: Function
- **Purpose**: Customize webpack configuration

## Environment Variables

### .env.local
- **Purpose**: Local environment variables (not committed)
- **Access**: `process.env.VARIABLE_NAME`

### .env.production
- **Purpose**: Production environment variables
- **Access**: Only in production

### .env.development
- **Purpose**: Development environment variables
- **Access**: Only in development

### Exposing Variables
```javascript
// next.config.js
module.exports = {
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR
  }
}
```

## Runtime Configuration

```javascript
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Only available server-side
    apiSecret: process.env.API_SECRET
  },
  publicRuntimeConfig: {
    // Available to browser
    apiUrl: process.env.API_URL
  }
}
```

## TypeScript Configuration
- **Type**: Object
- **Purpose**: Configure TypeScript compiler
- **File**: `tsconfig.json` in project root

## ESLint Configuration
- **Type**: Object
- **Purpose**: Configure ESLint integration
- **File**: `.eslintrc.json` or ESLint config in `next.config.js`
```

--------------------------------

### Specify Assets Metadata in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

This example illustrates how to declare asset links in Next.js metadata within a `layout.js` or `page.js` file. It takes an array of URLs pointing to associated assets, generating a `<link rel='assets' />` tag in the HTML head.

```javascript
export const metadata = {
  assets: ['https://nextjs.org/assets']
}
```

--------------------------------

### Configure Tailwind CSS v3 content paths in tailwind.config.js

Source: https://nextjs.org/docs/app/guides/tailwind-v3-css

This configuration snippet for `tailwind.config.js` specifies the files that Tailwind CSS should scan for utility classes. It includes paths for `app`, `pages`, and `components` directories to ensure all relevant files are processed.

```JavaScript
/** @type{import('tailwindcss').Config} */
module.exports= {
  content: [
'./app/**/*.{js,ts,jsx,tsx,mdx}',
'./pages/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

--------------------------------

### Add Tailwind CSS v3 directives to global CSS file

Source: https://nextjs.org/docs/app/guides/tailwind-v3-css

These directives are added to your `app/globals.css` file to inject Tailwind's base styles, component styles, and utility classes into your project. This makes Tailwind's styling available throughout your Next.js application.

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

--------------------------------

### Next.js Project Structure

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Overview of the Next.js app directory structure and file organization. This documents the recommended project layout for applications using the App Router.

```APIDOC
## Next.js Project Structure

### Description
Understanding the project structure and file-system conventions in Next.js App Router is essential for organizing your application code.

### File-System Conventions

#### Special Files
- **page.js** - UI for a route segment
- **layout.js** - UI shared across multiple segments
- **template.js** - Re-rendered layout UI
- **error.js** - Error UI for a segment
- **not-found.js** - Not found UI for a segment
- **loading.js** - Loading UI for a segment
- **route.js** - API endpoint for a route
- **middleware.js** - Request/response middleware
- **instrumentation.js** - Server-side instrumentation
- **default.js** - Fallback UI for parallel routes

#### Folders and Files
- **Dynamic Segments** - Use [param] for dynamic routes
- **Route Groups** - Group routes using (name)
- **Parallel Routes** - Use @folder syntax for parallel rendering
- **Intercepting Routes** - Use (..)folder syntax to intercept routes
- **public** - Static assets directory
- **src** - Optional source code directory

#### Metadata Files
- **favicon, icon, apple-icon** - Favicon files
- **manifest.json** - Web app manifest
- **robots.txt** - Search engine crawling rules
- **sitemap.xml** - XML sitemap for SEO
- **opengraph-image, twitter-image** - Social media images
```

--------------------------------

### Create custom span with OpenTelemetry API

Source: https://nextjs.org/docs/app/guides/open-telemetry

Add a custom span to track specific operations using OpenTelemetry tracer. This example demonstrates fetching GitHub stars with a span that captures the operation and ensures the span is properly ended. The span will be automatically added to the exported trace.

```TypeScript
import { trace } from '@opentelemetry/api'

export async function fetchGithubStars() {
  return await trace
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', async (span) => {
      try {
        return await getValue()
      } finally {
        span.end()
      }
    })
}
```

--------------------------------

### Create Loading UI with loading.tsx in Next.js

Source: https://nextjs.org/docs/app/getting-started/linking-and-navigating

Implement a loading skeleton component in a loading.tsx file to enable streaming and partial prefetching. Next.js automatically wraps page.tsx in a Suspense boundary and displays the loading UI while the route renders. This provides immediate visual feedback and improves Core Web Vitals.

```TypeScript
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />
}
```

--------------------------------

### Asserting Middleware Path Matching with unstable_doesMiddlewareMatch (Next.js)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This snippet demonstrates how to use the `unstable_doesMiddlewareMatch` function from `next/experimental/testing/server` to check if a middleware will run for a given URL. It helps verify routing logic in unit tests for Next.js middleware. The example asserts that the middleware does not match the '/test' URL with the provided configuration.

```javascript
import { unstable_doesMiddlewareMatch } from'next/experimental/testing/server'
expect(
unstable_doesMiddlewareMatch({
    config,
    nextConfig,
    url:'/test'
  })
).toEqual(false)
```

--------------------------------

### Fetch data with async/await in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/fetch

Basic example of using the extended fetch() API directly within a Next.js Server Component with async/await. The component fetches blog posts from a remote API and renders them as a list. This demonstrates the default behavior where fetch can be called without additional configuration.

```typescript
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

--------------------------------

### Use Typed LayoutProps Helper for Layout Component

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Demonstrates using the LayoutProps type helper to provide type-safe props for layout components, including children and named slots. This example shows a dashboard layout with typed access to the children prop and optional analytics slot.

```typescript
export default function Layout(props: LayoutProps<'/dashboard'>) {
  return (
    <section>
      {props.children}
      {/* If you have app/dashboard/@analytics, it appears as a typed slot: */}
      {/* {props.analytics} */}
    </section>
  )
}
```

--------------------------------

### Disable Link prefetching in Next.js

Source: https://nextjs.org/docs/app/guides/prefetching

Prevent automatic prefetching by setting the prefetch prop to false on the Link component. This disables resource prefetching but means static routes fetch only on click and dynamic routes wait for server rendering before navigation.

```TypeScript
<Link prefetch={false} href={`/blog/${post.id}`}>
  {post.title}
</Link>
```

--------------------------------

### Add Loading UI to Dynamic Routes in Next.js

Source: https://nextjs.org/docs/app/getting-started/linking-and-navigating

Create a loading.tsx file in dynamic route folders (e.g., app/blog/[slug]/) to enable partial prefetching and display loading states while dynamic content renders. Prevents the impression that the app is unresponsive during navigation to dynamic routes.

```TypeScript
export default function Loading() {
  return <LoadingSkeleton />
}
```

--------------------------------

### Configure resolve aliases in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack

Set up module resolution aliases in Turbopack to map imported package names to alternative destinations. This example aliases the underscore package to lodash and demonstrates conditional aliasing for the browser environment using the mocha module.

```javascript
module.exports = {
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
    },
  },
}
```

--------------------------------

### CLI next info

Source: https://nextjs.org/docs/app/api-reference/cli/next

Prints relevant details about the current system and Next.js environment, useful for debugging and reporting issues.

```APIDOC
## CLI Command: `next info`

### Description
Gathers and displays crucial information about the current system environment, Next.js version, Node.js version, and installed dependencies. This output is highly valuable when reporting Next.js bugs or seeking support, as it provides context about your setup.

### Command
`next info`

### Arguments / Options
- **-h, --help** (boolean) - Optional - Show all available options for the `next info` command.

### Example Usage
```bash
npx next info
```

### Output
#### Success Output (CLI Output)
- **system_info** (object) - Details about the operating system, CPU, and memory.
- **dependency_info** (object) - Lists installed Next.js and related package versions.
- **environment_info** (object) - Information on Node.js and npm/yarn versions.

#### Output Example
```text
Operating System:
  Platform: darwin
  Arch: arm64
  Version: macOS Ventura 13.5
Binaries:
  Node: 18.17.0
  npm: 9.6.7
  Yarn: 1.22.19
Relevant packages:
  next: 14.0.4
  react: 18.2.0
  react-dom: 18.2.0
  eslint-config-next: 14.0.4
  typescript: 5.3.3
```
```

--------------------------------

### Build Revalidation Utility with revalidatePath and revalidateTag

Source: https://nextjs.org/docs/app/api-reference/functions/revalidatePath

Example of a server utility function that combines revalidatePath and revalidateTag for comprehensive cache invalidation. This pattern ensures both specific page paths and all pages using shared data tags remain synchronized.

```typescript
'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updatePost() {
  await updatePostInDatabase()
  revalidatePath('/blog') // Refresh the blog page
  revalidateTag('posts') // Refresh all pages using 'posts' tag
}
```

--------------------------------

### Implement Next.js notFound() for 404 Handling

Source: https://nextjs.org/docs/app/api-reference/functions/not-found

This Next.js App Router example demonstrates how to use `notFound()` to handle cases where data is not found. It fetches user data, and if the `res.ok` check fails or no user is returned, `notFound()` is invoked, which terminates rendering and displays the configured `not-found` UI. This function ensures proper 404 error handling and meta tag injection.

```javascript
import { notFound } from'next/navigation'
async function fetchUser(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
export default async function Profile({ params }) {
  const { id } = await params
  const user = await fetchUser(id)
  if (!user) {
    notFound()
  }
  // ...
}
```

--------------------------------

### Automatically Apply Next.js basePath to Links

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath

This example shows how `next/link` automatically applies the configured `basePath` to internal navigation links. When `basePath` is set to '/docs', a link defined as `/about` will automatically resolve to `/docs/about` in the generated HTML, simplifying path management.

```javascript
exportdefaultfunctionHomePage() {
return (
    <>
      <Linkhref="/about">About Page</Link>
    </>
  )
}
```

```html
<ahref="/docs/about">About Page</a>
```

--------------------------------

### Handle Cookies in Next.js Middleware with TypeScript

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This TypeScript snippet illustrates how to interact with cookies in Next.js middleware using the `RequestCookies` and `ResponseCookies` APIs. It covers methods for getting, setting, checking existence (`has`), deleting, and clearing cookies on both incoming requests and outgoing responses.

```typescript
import { NextResponse } from'next/server'
importtype { NextRequest } from'next/server'
exportfunctionmiddleware(request:NextRequest) {
// Assume a "Cookie:nextjs=fast" header to be present on the incoming request
// Getting cookies from the request using the `RequestCookies` API
let cookie =request.cookies.get('nextjs')
console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
constallCookies=request.cookies.getAll()
console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
request.cookies.has('nextjs') // => true
request.cookies.delete('nextjs')
request.cookies.has('nextjs') // => false
// Setting cookies on the response using the `ResponseCookies` API
constresponse=NextResponse.next()
response.cookies.set('vercel','fast')
response.cookies.set({
    name:'vercel',
    value:'fast',
    path:'/',
  })
  cookie =response.cookies.get('vercel')
console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
// The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
return response
}
```

--------------------------------

### Server and Client Components

Source: https://nextjs.org/docs/app/getting-started/updating-data

Understanding the difference between Server Components and Client Components in Next.js App Router. Learn when to use each type and how they interact.

```APIDOC
# Server and Client Components

## Server Components

### Description
Server Components execute only on the server. They have direct access to backend resources like databases and APIs.

### Characteristics
- Execute on server only
- Direct database access
- Secure API keys and secrets
- Reduce JavaScript sent to browser
- Default in App Router

### When to Use
- Fetch data from databases
- Keep sensitive information secure
- Use backend-only libraries
- Perform operations that require secrets

### Example: Fetching Data
```javascript
// app/posts/page.js
export default async function PostsPage() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Client Components

### Description
Client Components render in the browser and enable interactivity. Marked with 'use client' directive.

### Characteristics
- Render in browser
- Access browser APIs
- Use hooks (useState, useEffect, etc.)
- Event listeners and interactivity
- Larger JavaScript bundle

### When to Use
- Interactive features (forms, buttons)
- Browser APIs (localStorage, geolocation)
- React hooks (useState, useContext, etc.)
- Event handlers

### Example: Interactive Component
```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Composition Pattern

### Recommended Pattern
Compose Server Components and Client Components together for optimal performance.

### Example: Server Component with Client Component
```javascript
// app/products/page.js (Server Component)
import ProductFilter from './product-filter';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductFilter products={products} />
    </div>
  );
}
```

```javascript
// app/products/product-filter.js (Client Component)
'use client';

import { useState } from 'react';

export default function ProductFilter({ products }) {
  const [filter, setFilter] = useState('');

  const filtered = products.filter(p => 
    p.name.includes(filter)
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search products..."
      />
      <ul>
        {filtered.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```
```

--------------------------------

### Display Login UI for Unauthorized Users with `unauthorized.js`

Source: https://nextjs.org/docs/app/api-reference/functions/unauthorized

This set of examples shows how to combine the `unauthorized` function with a custom `unauthorized.js` file to display a login UI to unauthenticated users. When `unauthorized()` is called in `app/dashboard/page.tsx`, the `app/unauthorized.tsx` component is rendered, allowing for a custom login experience.

```TypeScript
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export default async function DashboardPage() {
  const session = await verifySession()
  if (!session) {
    unauthorized()
  }
  return <div>Dashboard</div>
}
```

```TypeScript
import Login from '@/app/components/Login'

export default function UnauthorizedPage() {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Login />
    </main>
  )
}
```

--------------------------------

### Import Global CSS in Root Layout with TypeScript

Source: https://nextjs.org/docs/app/getting-started/css

Import the global CSS file in your Next.js root layout component to apply styles to every route in the application. This TypeScript example shows the standard root layout structure for Next.js App Router.

```typescript
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Create Static JSON Route Handler in Next.js

Source: https://nextjs.org/docs/app/guides/static-exports

Define a static GET route handler that generates a static JSON file during the build process. The file app/data.json/route.ts renders to a static data.json file containing the response object.

```TypeScript
export async function GET() {
  return Response.json({ name: 'Lee' })
}
```

--------------------------------

### Fetch Data in Next.js Server Component During Static Build

Source: https://nextjs.org/docs/app/guides/static-exports

This example demonstrates how a Server Component in Next.js performs data fetching during the `next build` process for static exports. The `fetch` call runs server-side, and the component renders into static HTML for the initial page load, with no changes required unless dynamic server functions are consumed.

```TypeScript
exportdefaultasyncfunctionPage() {
// This fetch will run on the server during `next build`
constres=awaitfetch('https://api.example.com/...')
constdata=awaitres.json()
return <main>...</main>
}
```

--------------------------------

### Handle Unauthorized Access in Next.js Server Action

Source: https://nextjs.org/docs/app/api-reference/functions/unauthorized

This example demonstrates invoking `unauthorized` within a Server Action to protect mutations. It ensures that only authenticated users can perform actions like updating a profile, throwing a 401 if the user's session is invalid.

```TypeScript
'use server'

import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'
import db from '@/app/lib/db'

export async function updateProfile(data: FormData) {
  const session = await verifySession()
  // If the user is not authenticated, return a 401
  if (!session) {
    unauthorized()
  }
  // Proceed with mutation
  // ...
}
```

--------------------------------

### Server and Client Components

Source: https://nextjs.org/docs/app/api-reference/functions/connection

Documentation for using server and client components in Next.js App Router. Learn when to use each component type and how to leverage server-side capabilities.

```APIDOC
## Server and Client Components

### Description
Next.js allows you to build applications with a mix of Server and Client Components, enabling you to choose the best execution environment for each part of your application.

### Directives

#### 'use server'
- Marks functions and modules to be executed on the server
- Used for sensitive operations, database access, and API calls
- Automatically handled by Next.js for Server Components

#### 'use client'
- Marks components and modules to be executed in the browser
- Required for using browser APIs and React hooks
- Enables interactive features and event listeners

#### 'use cache'
- Enables automatic caching of component results
- Reduces server load and improves performance
- Works with dynamic data and user-specific content

### Best Practices
- Use Server Components by default for data fetching
- Move 'use client' to leaf components for interactivity
- Combine both types for optimal performance
- Server Components run on every request or can be cached
```

--------------------------------

### Environment Variables for Web Push Configuration

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Configuration file containing VAPID public key (safe to expose to client) and private key (must remain secret on server). These keys authenticate the application server when sending push notifications.

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

--------------------------------

### Create a basic Route Handler in Next.js

Source: https://nextjs.org/docs/app/guides/draft-mode

Create a Route Handler file that will serve as the endpoint for enabling draft mode. This handler can have any name but is typically located at app/api/draft/route.ts. The handler exports an async GET function that receives a Request object and returns a Response.

```typescript
export async function GET(request: Request) {
  return new Response('')
}
```

--------------------------------

### Debounce Loading Indicator with CSS Animation

Source: https://nextjs.org/docs/app/getting-started/linking-and-navigating

Add CSS animations with delays and opacity transitions to loading indicators to prevent flickering on fast connections. The spinner uses fadeIn animation with a 100ms delay and infinite rotation, starting invisible to only display on prolonged navigation delays.

```CSS
.spinner {
  /* ... */
  opacity: 0;
  animation:
    fadeIn 500ms 100ms forwards,
    rotate 1s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
```

--------------------------------

### Import and Use CSS Module in React Component

Source: https://nextjs.org/docs/app/getting-started/css

Import CSS Module styles as a JavaScript object and apply the scoped class names to JSX elements. This TypeScript example shows importing and using a locally scoped CSS class.

```typescript
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

--------------------------------

### Implement Per-Page Layout with getLayout() (Pages Directory)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This JavaScript page component demonstrates the `getLayout()` pattern, which was Next.js's recommended way to apply specific layouts per page in the `pages` directory. The `getLayout` property is a function that returns the page wrapped in the desired layout.

```javascript
import DashboardLayout from '../components/DashboardLayout'
export default function Page() {
  return <p>My Page</p>
}
Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
```

--------------------------------

### Integrating Memoized Data into Next.js `generateMetadata` and Page

Source: https://nextjs.org/docs/app/getting-started/metadata-and-og-images

This example shows how to integrate the memoized `getPost` function into both the `generateMetadata` function and the page component itself. By calling `getPost` in both places, but ensuring it executes only once due to `React.cache`, it efficiently provides data for both dynamic metadata and page rendering without redundant fetches.

```typescript
import { getPost } from'@/app/lib/data'
exportasyncfunctiongenerateMetadata({
  params,
}: {
  params: { slug:string }
}) {
constpost=awaitgetPost(params.slug)
return {
    title:post.title,
    description:post.description,
  }
}
exportdefaultasyncfunctionPage({ params }: { params: { slug:string } }) {
constpost=awaitgetPost(params.slug)
return <div>{post.title}</div>
}
```

--------------------------------

### Implement a Next.js Loading Component with a Custom Skeleton

Source: https://nextjs.org/docs/app/api-reference/file-conventions/loading

This example shows how to use the `loading.js` file in Next.js to display a more complex loading UI, such as a custom `<LoadingSkeleton />` component. When placed in a route segment folder, `loading.js` automatically wraps the `page.js` file and its children within a `<Suspense>` boundary, ensuring the skeleton is shown during content loading.

```TypeScript
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

```JavaScript
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

--------------------------------

### Next.js CLI Basic Usage

Source: https://nextjs.org/docs/app/api-reference/cli/next

Basic syntax for running Next.js CLI commands. The CLI accepts a command followed by optional parameters and flags. Running 'next' without a command defaults to 'next dev' for development mode.

```bash
npx next [command] [options]
```

--------------------------------

### Using `redirect` with `RedirectType` in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/redirect

This example demonstrates how to explicitly control the `redirect` behavior using `RedirectType.replace` or `RedirectType.push`. By importing `RedirectType` from `next/navigation`, developers can override the default browser history management for redirects in various contexts.

```typescript
import { redirect, RedirectType } from'next/navigation'
redirect('/redirect-to',RedirectType.replace)
// or
redirect('/redirect-to',RedirectType.push)
```

--------------------------------

### Next.js API Routes Overview

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

Learn how to create serverless API endpoints using Next.js API Routes. This section covers the basic structure and how to handle requests and responses with NextRequest and NextResponse.

```APIDOC
## GET /api/example

### Description
Next.js API Routes allow you to build API endpoints within your Next.js application. These routes reside in the `pages/api` directory (Pages Router) or as Route Handlers in the `app` directory (App Router). They are server-side only bundles and will not increase your client-side bundle size. This example demonstrates a basic GET request handler.

### Method
GET

### Endpoint
`/api/example`

### Parameters
#### Path Parameters
- **[id]** (string) - Optional - Example: Access via `req.query.id` for dynamic routes like `/api/example/[id]`.

#### Query Parameters
- **name** (string) - Optional - The name to greet. Access via `req.query.name`.

#### Request Body
Not applicable for GET requests. For POST/PUT requests, the body can be accessed via `req.body`.

### Request Example
```javascript
// Example of accessing query parameters in a Next.js API Route handler (Pages Router)
export default function handler(req, res) {
  const { name } = req.query; // For URL: /api/example?name=World
  // ... further processing
}

// Example of accessing a path parameter in a Next.js API Route handler (Pages Router)
// For a file named pages/api/example/[id].js
export default function handler(req, res) {
  const { id } = req.query; // For URL: /api/example/123
  // ... further processing
}

// Example of a Route Handler in App Router
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name') || 'World';
  return NextResponse.json({ message: `Hello, ${name}!`, timestamp: Date.now() });
}
```

### Response
Next.js API Routes utilize `NextResponse` (App Router) or the standard Node.js `res` object (Pages Router) to send responses. This example shows a successful JSON response.

#### Success Response (200)
- **message** (string) - A greeting message.
- **timestamp** (number) - The current server timestamp.

#### Response Example
```json
{
  "message": "Hello, World!",
  "timestamp": 1678886400000
}
```
```

--------------------------------

### Set Absolute Page Title in Next.js Ignoring Parent Templates

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

This example shows how `title.absolute` can be used in `page.tsx` to set a page title that ignores any `title.template` defined in parent segments, providing complete control over the title for that specific route.

```TypeScript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {
  title: {
    template:'%s | Acme',
  },
}
```

```TypeScript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {
  title: {
    absolute:'About',
  },
}
// Output: <title>About</title>
```

--------------------------------

### Generate Dynamic Images in Route Handlers - JavaScript

Source: https://nextjs.org/docs/app/api-reference/functions/image-response

Shows how to use ImageResponse in a Next.js Route Handler to generate images dynamically at request time. The example creates a flexbox-based layout with text elements and returns the generated PNG image with error handling.

```javascript
import { ImageResponse } from 'next/og'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}
          >
            Welcome to My Site
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#666',
              marginTop: '20px',
            }}
          >
            Generated with Next.js ImageResponse
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
```

--------------------------------

### Data Fetching - getStaticProps

Source: https://nextjs.org/docs/app/api-reference/functions/use-pathname

getStaticProps enables Static Site Generation (SSG) by fetching data at build time. The page is generated once and reused for all requests, providing excellent performance for static content.

```APIDOC
## getStaticProps

### Description
getStaticProps generates static pages at build time by fetching data before rendering. This approach is ideal for content that doesn't change frequently and provides superior performance.

### Method
GET (Build-time)

### Function Signature
```javascript
export async function getStaticProps(context) {
  // context contains params, locale, locales, defaultLocale, preview, previewData
  const data = await fetchData()
  
  return {
    props: { data },
    revalidate: 3600 // ISR - revalidate every hour
  }
}
```

### Parameters
#### Context Object
- **params** (Object) - Dynamic route parameters from [id].js
- **locale** (String) - Current locale if using i18n
- **locales** (Array) - All locales if using i18n
- **defaultLocale** (String) - Default locale
- **preview** (Boolean) - Preview mode flag
- **previewData** (Object) - Preview data set by Preview Mode

### Return Object
- **props** (Object) - Required - Props passed to page component
- **revalidate** (Integer) - Optional - ISR revalidation time in seconds (0 = on-demand)
- **redirect** (Object) - Optional - Redirect to different page
- **notFound** (Boolean) - Optional - Return 404 page

### Request Example
```javascript
export async function getStaticProps({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.id}`)
    .then(res => res.json())
  
  if (!post) {
    return { notFound: true }
  }
  
  return {
    props: { post },
    revalidate: 10
  }
}
```

### Response Example
```javascript
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

### Features
- Incremental Static Regeneration (ISR) with revalidate
- Fallback page generation with getStaticPaths
- Works only in Pages Router
- Build-time only execution
```

--------------------------------

### API Reference: Components

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Describes the components available in the Next.js API. These components provide various functionalities for building web applications.

```APIDOC
## Components

### Description
This section describes the components available in the Next.js API.

### Components
- Font
- Form
- Head
- Image
- Image (Legacy)
- Link
- Script
```

--------------------------------

### App Router - Route Handlers

Source: https://nextjs.org/docs/app/api-reference/functions/use-pathname

Route Handlers are used to create custom request handlers for given routes. They support HTTP methods GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS, allowing you to build RESTful APIs directly within your Next.js application.

```APIDOC
## Route Handlers

### Description
Route Handlers allow you to create custom request handlers for specific routes using standard HTTP methods. They replace the need for separate API backend services for simple endpoints.

### Supported Methods
- GET - Retrieve data
- POST - Create new data
- PUT - Update existing data
- DELETE - Remove data
- PATCH - Partial update
- HEAD - Like GET but without response body
- OPTIONS - Describe communication options

### File Location
```
app/
  api/
    [resource]/
      route.js
```

### Basic Example Structure
```javascript
export async function GET(request) {
  // Handle GET requests
  return Response.json({ message: 'GET response' })
}

export async function POST(request) {
  const data = await request.json()
  // Handle POST requests
  return Response.json({ message: 'POST response' })
}

export async function PUT(request) {
  const data = await request.json()
  // Handle PUT requests
  return Response.json({ message: 'PUT response' })
}

export async function DELETE(request) {
  // Handle DELETE requests
  return Response.json({ message: 'DELETE response' })
}
```

### Request Parameters
- **request** (Request) - Required - Standard Web API Request object with query, params, and body

### Response
- Returns Response object or Response.json() for JSON responses
- Supports streaming responses and custom headers

### Middleware Integration
Route Handlers work seamlessly with middleware for authentication, logging, and request transformation.
```

--------------------------------

### Access Dynamic Route Segments in Next.js Page (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/page

This example illustrates how to access dynamic route segments from the `params` prop within a Next.js server component. It shows destructuring the `slug` value to render content specific to the matched route segment.

```TypeScript
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
const { slug } = await params
return <h1>Blog Post: {slug}</h1>
}
```

--------------------------------

### Configure Next.js Output Tracing Root in Monorepos

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/output

This configuration sets the root directory for Next.js output file tracing, allowing the build process to include files from outside the immediate project folder, which is crucial for monorepo setups. It uses `path.join(__dirname, '../../')` to specify a parent directory.

```javascript
module.exports= {
// this includes files from the monorepo base two directories up
  outputFileTracingRoot:path.join(__dirname,'../../'),
}
```

--------------------------------

### Configure Partial Prerendering in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr

Set up Partial Prerendering with incremental adoption by configuring the experimental.ppr option in next.config.js. This enables PPR functionality on a per-route basis starting with Next.js 15. The configuration uses the NextConfig type for TypeScript projects.

```TypeScript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}

export default nextConfig
```

--------------------------------

### Automatic Prefetch with Next.js Link Component

Source: https://nextjs.org/docs/app/guides/prefetching

Demonstrates the default automatic prefetching behavior using Next.js Link component. Next.js automatically prefetches full static routes in production, caching them for 5 minutes by default. Dynamic routes are not prefetched unless a loading.js file is present.

```typescript
import Link from 'next/link'

export default function NavLink() {
  return <Link href="/about">About</Link>
}
```

--------------------------------

### Memoizing Fetch Requests in Next.js

Source: https://nextjs.org/docs/app/guides/caching

This example demonstrates how Next.js automatically memoizes `fetch` requests with identical URLs and options within a single React render pass. Calling the same fetch function multiple times will only execute the network request once, returning the cached result for subsequent calls.

```TypeScript
async function getItem() {
// The `fetch` function is automatically memoized and the result
// is cached
const res = await fetch('https://.../item/1')
return res.json()
}
// This function is called twice, but only executed the first time
const item = await getItem() // cache MISS
// The second call could be anywhere in your route
const item = await getItem() // cache HIT
```

--------------------------------

### Configure webpack loaders with options in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack

Configure Turbopack webpack loaders with custom options using object format instead of string format. This example shows passing configuration options to the @svgr/webpack loader, such as the icon property, to customize loader behavior.

```javascript
module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}
```

--------------------------------

### Configuration and next.config.js

Source: https://nextjs.org/docs/app/getting-started/error-handling

Configuration options for next.config.js file controlling build behavior, performance optimization, security, and feature flags. Essential for customizing Next.js application behavior.

```APIDOC
## next.config.js Configuration

### Performance and Build Optimization

#### compress
- **Type**: boolean
- **Default**: true
- **Purpose**: Enable gzip compression for responses
- **Example**:
```javascript
module.exports = {
  compress: true
}
```

#### distDir
- **Type**: string
- **Default**: '.next'
- **Purpose**: Directory for build output

#### generateEtags
- **Type**: boolean
- **Default**: true
- **Purpose**: Generate ETags for caching

#### generateBuildId
- **Type**: function or string
- **Purpose**: Custom build ID generation
- **Example**:
```javascript
module.exports = {
  generateBuildId: async () => {
    return 'custom-build-id'
  }
}
```

#### inlineCss
- **Type**: boolean
- **Default**: true
- **Purpose**: Inline CSS for critical path

#### cssChunking
- **Type**: string
- **Default**: 'granular'
- **Purpose**: CSS splitting strategy ('granular' or 'loose')

### Routing and Paths

#### basePath
- **Type**: string
- **Purpose**: Prefix for all routes
- **Example**:
```javascript
module.exports = {
  basePath: '/docs'
}
```

#### assetPrefix
- **Type**: string
- **Purpose**: CDN prefix for assets
- **Example**:
```javascript
module.exports = {
  assetPrefix: 'https://cdn.example.com'
}
```

#### trailingSlash
- **Type**: boolean
- **Default**: false
- **Purpose**: Require trailing slash in URLs

#### pageExtensions
- **Type**: array
- **Default**: ['js', 'jsx', 'ts', 'tsx']
- **Purpose**: File extensions to treat as pages

#### redirects()
- **Type**: async function
- **Purpose**: Configure redirects
- **Returns**: Array of redirect objects with source, destination, permanent
- **Example**:
```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ]
  }
}
```

#### rewrites()
- **Type**: async function or object
- **Purpose**: Configure URL rewrites
- **Example**:
```javascript
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*'
        }
      ]
    }
  }
}
```

#### headers()
- **Type**: async function
- **Purpose**: Configure response headers
- **Example**:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'custom-value'
          }
        ]
      }
    ]
  }
}
```

### Image Optimization

#### images
- **Type**: object
- **Properties**:
  - `domains` (array) - Allowed image domains
  - `formats` (array) - Supported image formats
  - `deviceSizes` (array) - Responsive breakpoints
  - `imageSizes` (array) - Image size options
  - `cacheHandler` (string) - Custom cache handler
  - `remotePatterns` (array) - Regex patterns for remote images
- **Example**:
```javascript
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ]
  }
}
```

### React and Compiler

#### reactStrictMode
- **Type**: boolean
- **Default**: true
- **Purpose**: Enable React Strict Mode

#### reactCompiler
- **Type**: boolean or object
- **Purpose**: Enable React Compiler optimization

#### reactMaxHeadersLength
- **Type**: number
- **Purpose**: Max size for React headers

### Security

#### crossOrigin
- **Type**: string
- **Purpose**: Set CORS policy ('anonymous', 'use-credentials')

#### poweredByHeader
- **Type**: boolean
- **Default**: true
- **Purpose**: Include X-Powered-By header

#### taint
- **Type**: object
- **Purpose**: Taint sensitive values from client

### Server Configuration

#### httpAgentOptions
- **Type**: object
- **Purpose**: Custom HTTP agent options

#### serverExternalPackages
- **Type**: array
- **Purpose**: Packages to opt-out of bundling

#### serverComponentsHmrCache
- **Type**: boolean
- **Default**: true
- **Purpose**: Enable HMR cache for Server Components

#### serverActions
- **Type**: object
- **Properties**:
  - `allowedOrigins` (array) - Allowed origins for Server Actions
  - `bodySizeLimit` (string) - Max body size

### Build Output

#### output
- **Type**: string
- **Options**: 'standalone', 'export'
- **Purpose**: Configure build output type

#### productionBrowserSourceMaps
- **Type**: boolean
- **Default**: false
- **Purpose**: Generate source maps in production

### Experimental Features

#### ppr
- **Type**: boolean or object
- **Purpose**: Enable Partial Pre-rendering

#### cacheLife
- **Type**: object
- **Purpose**: Configure cache lifetime defaults

#### cacheComponents
- **Type**: boolean
- **Purpose**: Enable automatic component caching

#### useLightningcss
- **Type**: boolean
- **Purpose**: Use Lightning CSS compiler

#### viewTransition
- **Type**: boolean
- **Purpose**: Enable View Transitions API support

### Build Tools

#### turbopack
- **Type**: object
- **Purpose**: Turbopack configuration

#### webpack
- **Type**: function
- **Purpose**: Customize webpack configuration
- **Parameters**: config, context

#### typescript
- **Type**: object
- **Properties**: `tsconfigPath`, `ignoreBuildErrors`

#### eslint
- **Type**: object
- **Properties**: `dirs`, `ignoreDuringBuilds`
```

--------------------------------

### Tagging Data with Fetch for Revalidation (JavaScript)

Source: https://nextjs.org/docs/app/api-reference/functions/revalidateTag

This example demonstrates how to associate cache tags with data fetched using the native `fetch` API in Next.js. By including the `next: { tags: [...] }` option, you enable `revalidateTag` to invalidate this specific cached data.

```javascript
fetch(url, { next: { tags: [...] } });
```

--------------------------------

### Next.js System Information Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

Outputs relevant system and environment details useful for diagnosing issues and reporting Next.js bugs. Includes information about the operating system, Node.js version, and Next.js configuration.

```bash
next info
```

--------------------------------

### Utilize Server Functions in Client Components with TypeScript

Source: https://nextjs.org/docs/app/api-reference/directives/use-server

This set of examples illustrates how to define a server function in a dedicated file using the `use server` directive, and then import and execute it from a client-side React component. The `fetchUsers` function runs on the server, while `MyButton` in the client component triggers its execution upon a user interaction.

```TypeScript
'use server'
import { db } from'@/shared/db'// Your database client
exportasyncfunctionfetchUsers() {
constusers=awaitdb.user.findMany()
return users
}
```

```TypeScript
'use client'
import { fetchUsers } from'../actions'
exportdefaultfunctionMyButton() {
return <buttononClick={() =>fetchUsers()}>Fetch Users</button>
}
```

--------------------------------

### Define a Next.js Root Layout (layout.tsx)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout

This example illustrates how to define the top-most root layout for a Next.js application, typically located in `app/layout.tsx`. It is responsible for rendering the `<html>` and `<body>` tags and enclosing the entire application's content via the `children` prop, ensuring global UI elements are consistently present.

```TypeScript
exportdefaultfunctionRootLayout({
  children,
}: {
  children:React.ReactNode
}) {
return (
    <htmllang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Configure Font with Custom CSS Variable in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure a font with a custom CSS variable name for CSS variable method application. This example demonstrates using the variable option to define a custom CSS variable like --my-font.

```javascript
const inter = Inter({
  variable: '--my-font',
  subsets: ['latin'],
  display: 'swap',
})
```

--------------------------------

### File System Conventions

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Reference for Next.js file system structure and naming conventions including special files for routing, layouts, error handling, middleware, and public assets in both Pages and App Router.

```APIDOC
## File System Conventions

### Pages Router Structure

#### pages/
- **index.js** - Home page at '/'
- **[id].js** - Dynamic route
- **[...slug].js** - Catch-all route
- **[[optional]].js** - Optional catch-all

#### pages/api/
- **route.js** - API endpoint
- **[id].js** - Dynamic API route
- **[...slug].js** - Catch-all API route

#### Special Files
- **_app.js** - Custom App wrapper
- **_document.js** - Custom Document HTML
- **_error.js** - Error page
- **404.js** - Not found page
- **500.js** - Server error page

#### Configuration Files
- **next.config.js** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **.eslintrc.json** - ESLint configuration

### App Router Structure

#### app/ Directory
File-based routing system for App Router.

##### Special Files

**layout.js**
- Shared UI for route segment and children
- Can be nested at any level
- Receives children prop
- Example: app/layout.js, app/dashboard/layout.js

**page.js**
- Unique UI for route segment
- Makes route accessible
- Example: app/page.js, app/dashboard/page.js

**loading.js**
- Suspense fallback UI
- Shown while content loads
- Example: app/dashboard/loading.js

**error.js**
- Error boundary for segment
- 'use client' directive required
- Receives error and reset props
- Example: app/dashboard/error.js

**not-foun
```

--------------------------------

### Configure Wildcard Path Matching for Next.js Headers

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers

This example demonstrates using wildcard path matching (e.g., `:slug*`) to capture multiple nested path segments. This allows a single header configuration to apply to paths like `/blog/a/b/c/d/hello-world`, with the captured wildcard value available for use in the header `key` or `value`.

```javascript
module.exports= {
  async headers() {
    return [
      {
        source:'/blog/:slug*',
        headers: [
          {
            key:'x-slug',
            value:':slug*',// Matched parameters can be used in the value
          },
          {
            key:'x-slug-:slug*',// Matched parameters can be used in the key
            value:'my other custom header value',
          },
        ],
      },
    ]
  },
}
```

--------------------------------

### Implement Streaming with Web APIs Directly in Next.js App Router

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

This example demonstrates direct implementation of streaming using Web APIs in a Next.js App Router handler. It converts an async iterator into a `ReadableStream` to send data in chunks over time, simulating a delayed stream of HTML paragraphs.

```TypeScript
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
functioniteratorToStream(iterator:any) {
returnnewReadableStream({
asyncpull(controller) {
const { value,done } =awaititerator.next()
if (done) {
controller.close()
      } else {
controller.enqueue(value)
      }
    },
  })
}
functionsleep(time:number) {
returnnewPromise((resolve) => {
setTimeout(resolve, time)
  })
}
constencoder=newTextEncoder()
asyncfunction*makeIterator() {
yieldencoder.encode('<p>One</p>')
awaitsleep(200)
yieldencoder.encode('<p>Two</p>')
awaitsleep(200)
yieldencoder.encode('<p>Three</p>')
}
exportasyncfunctionGET() {
constiterator=makeIterator()
conststream=iteratorToStream(iterator)
returnnewResponse(stream)
}
```

--------------------------------

### Integrate remark and rehype Plugins with Next.js MDX

Source: https://nextjs.org/docs/app/guides/mdx

Explains how to configure `remark` and `rehype` plugins within `next.config.mjs` (or `.ts`) for transforming MDX content in a Next.js application. This example demonstrates adding `remark-gfm` to support GitHub Flavored Markdown. The use of `.mjs` or `.ts` is required because the remark and rehype ecosystem is ESM-only.

```javascript
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

// Combine MDX and Next.js config
export default withMDX(nextConfig)
```

--------------------------------

### Managing Image Loading Behavior with Next.js loading Prop

Source: https://nextjs.org/docs/app/api-reference/components/image

Explains the `loading` prop, which controls when an image starts loading. Options include `lazy` (default), which defers loading until the image is near the viewport, and `eager`, which loads the image immediately regardless of its position. `eager` should be used sparingly for critical images.

```jsx
// Defaults to lazy
<Image loading="lazy" />
```

--------------------------------

### Configure Next.js Experimental Static Generation Options

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/staticGeneration

This code snippet demonstrates how to configure experimental static generation options in the `next.config.ts` file. It sets properties such as `staticGenerationRetryCount` for retrying failed page generations, `staticGenerationMaxConcurrency` to limit concurrent page processing per worker, and `staticGenerationMinPagesPerWorker` to specify the minimum pages before a new worker starts, influencing the overall build performance for static sites.

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25
  }
}

export default nextConfig
```

```javascript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25
  }
}

export default nextConfig
```

--------------------------------

### Next.js: Implement useLinkStatus for Link Loading State

Source: https://nextjs.org/docs/app/api-reference/functions/use-link-status

This example demonstrates the fundamental usage of Next.js's `useLinkStatus` hook within a client component to create a `LoadingIndicator`. It shows how to conditionally render a spinner based on the `pending` state of a `<Link>`, providing immediate visual feedback during route transitions.

```TypeScript
'use client'
import { useLinkStatus } from'next/link'
exportdefaultfunctionLoadingIndicator() {
const { pending } =useLinkStatus()
return pending ? (
    <divrole="status"aria-label="Loading"className="spinner" />
  ) :null
}
```

```JavaScript
'use client'
import { useLinkStatus } from'next/link'
exportdefaultfunctionLoadingIndicator() {
const { pending } =useLinkStatus()
return pending ? (
    <divrole="status"aria-label="Loading"className="spinner" />
  ) :null
}
```

```TypeScript
import Link from'next/link'
import LoadingIndicator from'./loading-indicator'
exportdefaultfunctionHeader() {
return (
    <header>
      <Linkhref="/dashboard"prefetch={false}>
        Dashboard <LoadingIndicator />
      </Link>
    </header>
  )
}
```

```JavaScript
import Link from'next/link'
import LoadingIndicator from'./loading-indicator'
exportdefaultfunctionHeader() {
return (
    <header>
      <Linkhref="/dashboard"prefetch={false}>
        Dashboard <LoadingIndicator />
      </Link>
    </header>
  )
}
```

--------------------------------

### Create Static Sitemap XML File

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

A static sitemap.xml file placed in the app directory for smaller applications. Contains URL entries with location, last modification date, change frequency, and priority for search engine crawlers.

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

--------------------------------

### ReactDOM Prefetch DNS Resource Hint

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

Method signature and head output for ReactDOM.prefetchDNS(). Attempts to resolve a domain name before resources are requested, improving performance for third-party domains.

```typescript
ReactDOM.prefetchDNS(href: string)
```

```html
<link rel="dns-prefetch" href="..." />
```

--------------------------------

### CLI next build

Source: https://nextjs.org/docs/app/api-reference/cli/next

Creates an optimized production build of your Next.js application, displaying information about each route for deployment.

```APIDOC
## CLI Command: `next build`

### Description
Generates an optimized production build of the Next.js application. This process compiles all client-side and server-side code, optimizes assets, and provides a summary of each route's size and build time, preparing the application for deployment.

### Command
`next build`

### Arguments / Options
- **[directory]** (string) - Optional - A directory in which to build the application. If not provided, the current directory is used.
- **-h, --help** (boolean) - Optional - Show all available options for the `next build` command.

### Example Usage
```bash
npx next build
npx next build my-project
```

### Output
#### Success Output (CLI Output)
- **build_summary** (string) - Provides a summary of the build process, including route information (size, build time).
- **optimization_messages** (string) - Details about asset optimization and compilation.

#### Output Example
```text
info  - Creating an optimized production build ...
info  - Compiled client and server successfully in 1.2s
Route (app)                              Size     First Load JS
┌ ○ /                                    93.8 kB        173 kB
├ λ /api/hello                           0 B            79.2 kB
└ ƒ /dashboard                           89.1 kB        168 kB
+ First Load JS shared by all           79.2 kB
  ├ chunks/framework-xxxx.js            45.7 kB
  ├ chunks/main-xxxx.js                 32.5 kB
  └ others                              1 kB
```
```

--------------------------------

### Generate Dynamic App Icon with Route Parameters in Next.js

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

Generates an app icon that receives dynamic route parameters from the URL. This example shows how to accept params object containing slug or other route segments and use them in icon generation logic.

```TypeScript
export default function Icon({ params }: { params: { slug: string } }) {
  // ...
}
```

--------------------------------

### Next.js CLI Commands

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites

Command-line interface tools for creating projects, running development servers, building applications, and other Next.js operations. Essential commands for Next.js development workflow.

```APIDOC
## Next.js CLI Commands

### create-next-app

#### Description
Scaffold a new Next.js project with predefined templates and configurations.

#### Syntax
npx create-next-app@latest [project-name] [options]

#### Common Options
- **--typescript**: Use TypeScript (default: true)
- **--tailwind**: Include Tailwind CSS (default: true)
- **--eslint**: Include ESLint (default: true)
- **--app**: Use App Router (default: true)
- **--src-dir**: Create src directory
- **--import-alias**: Set import alias (default: @/*)
- **--skip-git**: Skip git initialization
- **--skip-install**: Skip dependency installation

#### Example
npx create-next-app@latest my-app --typescript --tailwind

### next CLI

#### next dev
- **Purpose**: Start development server
- **Port**: Default 3000
- **Options**: 
  - **-p, --port**: Custom port
  - **-H, --hostname**: Custom hostname
  - **--turbopack**: Use Turbopack bundler (experimental)

#### next build
- **Purpose**: Build application for production
- **Output**: .next directory
- **Optimization**: Automatic optimization and bundling
- **Options**:
  - **--profile**: Profile build performance
  - **--debug**: Enable debug mode

#### next start
- **Purpose**: Start production server
- **Requirements**: Must run 'next build' first
- **Options**:
  - **-p, --port**: Custom port
  - **-H, --hostname**: Custom hostname
  - **--keepAliveTimeout**: Keep-alive timeout in ms

#### next lint
- **Purpose**: Run ESLint on project
- **Config**: Uses .eslintrc.json
- **Options**:
  - **--dir**: Lint specific directory
  - **--file**: Lint specific file
  - **--fix**: Automatically fix issues
  - **--format**: Output format (default, json, etc.)

#### next telemetry
- **Purpose**: Manage telemetry data collection
- **Subcommands**:
  - **enable**: Enable telemetry
  - **disable**: Disable telemetry
  - **status**: Check telemetry status
- **Note**: Opt-in by default

#### next info
- **Purpose**: Display system and environment information
- **Usage**: Debugging and issue reporting
- **Output**: OS, Node version, Next.js version, dependencies

#### next export
- **Purpose**: Export static site (legacy, use output: 'export')
- **Deprecated**: Use next.config.js output option instead
```

--------------------------------

### Use Tailwind CSS Utility Classes in React Components

Source: https://nextjs.org/docs/app/getting-started/css

Apply Tailwind CSS utility classes directly to JSX elements using the className attribute. This TypeScript example demonstrates using Tailwind classes for layout, typography, and responsive design.

```typescript
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
    </main>
  )
}
```

--------------------------------

### Configure Turbopack Settings in Next.js

Source: https://nextjs.org/docs/app/api-reference/turbopack

This code snippet demonstrates how to configure Turbopack within your `next.config.js` file. It shows examples of setting up `resolveAlias` for module aliasing and defining `resolveExtensions` to specify supported file extensions for module resolution. These configurations enhance Turbopack's bundling behavior in Next.js applications.

```javascript
module.exports= {
  turbopack: {
// Example: adding an alias and custom file extension
    resolveAlias: {
      underscore:'lodash',
    },
    resolveExtensions: ['.mdx','.tsx','.ts','.jsx','.js','.json'],
  },
}
```

--------------------------------

### Create Async Layout with Featured Posts Navigation

Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout

Build an async layout component that fetches featured posts and renders NavLink components for each post. The layout demonstrates how to combine async data fetching with client-side navigation components.

```TypeScript
import { NavLink } from './nav-link'
import getPosts from './get-posts'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredPosts = await getPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <NavLink slug={post.slug}>{post.title}</NavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

--------------------------------

### Generate Localized Sitemaps in Next.js

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

This example illustrates how to create a sitemap with localization support in Next.js. By utilizing the `alternates.languages` property, you can specify different URLs for various language versions of a page, ensuring search engines correctly index localized content. The resulting XML includes `xhtml:link` elements for alternate language versions.

```TypeScript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es',
          de: 'https://acme.com/de'
        }
      }
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/about',
          de: 'https://acme.com/de/about'
        }
      }
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://acme.com/es/blog',
          de: 'https://acme.com/de/blog'
        }
      }
    }
  ]
}
```

```XML
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://acme.com</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de"/>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es/about"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de/about"/>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <xhtml:link
      rel="alternate"
      hreflang="es"
      href="https://acme.com/es/blog"/>
    <xhtml:link
      rel="alternate"
      hreflang="de"
      href="https://acme.com/de/blog"/>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
  </url>
</urlset>
```

--------------------------------

### Protect API Routes with `unauthorized` in Next.js Route Handler

Source: https://nextjs.org/docs/app/api-reference/functions/unauthorized

This example illustrates how to use the `unauthorized` function within a Route Handler for an API endpoint. It verifies the user's session before allowing access to fetch data, rendering a 401 error if authentication fails.

```TypeScript
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/app/lib/dal'
import { unauthorized } from 'next/navigation'

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Verify the user's session
  const session = await verifySession()
  // If no session exists, return a 401 and render unauthorized.tsx
  if (!session) {
    unauthorized()
  }
  // Fetch data
  // ...
  return NextResponse.json({ message: 'Data fetched successfully' });
}
```

--------------------------------

### Hooks & Utility Functions

Source: https://nextjs.org/docs/app/guides/analytics

Next.js provides hooks and utilities for routing, performance monitoring, and component functionality including useRouter for navigation, useAmp for AMP pages, and useReportWebVitals for performance metrics.

```APIDOC
## useRouter Hook

### Description
Access routing functionality in client components. Get current route, query parameters, and navigate programmatically.

### Usage
```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  return (
    <>

```

--------------------------------

### Hover-Triggered Prefetch Link Component

Source: https://nextjs.org/docs/app/guides/prefetching

Implements a custom Link wrapper that triggers prefetching only on mouse hover instead of the default viewport detection. This gives developers fine-grained control over prefetching behavior by setting prefetch={null} on hover to restore default prefetching, trading performance for reduced resource consumption.

```typescript
'use client'
import Link from 'next/link'
import { useState } from 'react'

export function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [active, setActive] = useState(false)
  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
    >
      {children}
    </Link>
  )
}
```

--------------------------------

### Type Next.js Layouts with LayoutProps Helper (layout.tsx)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/layout

This example demonstrates using the `LayoutProps` global helper to provide strong typing for layout components in Next.js. It allows for inferring types for `params` and named slots (e.g., `props.analytics` if an `app/dashboard/@analytics` slot exists), improving type safety and developer experience. Types are generated during development or build processes.

```TypeScript
exportdefaultfunctionLayout(props:LayoutProps<'/dashboard'>) {
return (
    <section>
      {props.children}
      {/* If you have app/dashboard/@analytics, it appears as a typed slot: */}
      {/* {props.analytics} */}
    </section>
  )
}
```

--------------------------------

### Configure webpack loaders in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack

Configure Turbopack to use webpack loaders for specific file extensions. This example demonstrates importing SVG files as React components using the @svgr/webpack loader. The configuration maps file extensions to loader names and specifies the output format.

```javascript
module.exports = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}
```

--------------------------------

### Set Request and Response Headers in Next.js Middleware with TypeScript

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This TypeScript example demonstrates how to set custom headers on both incoming requests and outgoing responses within Next.js middleware. It uses `NextResponse.next()` to clone and modify request headers, and `response.headers.set()` to add new response headers.

```typescript
import { NextResponse } from'next/server'
importtype { NextRequest } from'next/server'
exportfunctionmiddleware(request:NextRequest) {
// Clone the request headers and set a new header `x-hello-from-middleware1`
constrequestHeaders=newHeaders(request.headers)
requestHeaders.set('x-hello-from-middleware1','hello')
// You can also set request headers in NextResponse.next
constresponse=NextResponse.next({
    request: {
// New request headers
      headers: requestHeaders,
    },
  })
// Set a new response header `x-hello-from-middleware2`
response.headers.set('x-hello-from-middleware2','hello')
return response
}
```

--------------------------------

### Tagging Data Fetches for Granular Next.js Cache Revalidation

Source: https://nextjs.org/docs/app/guides/incremental-static-regeneration

This Server Component example shows how to tag individual `fetch` calls with `next: { tags: ['posts'] }`. This allows for more granular cache control, enabling revalidation of specific data sets using `revalidateTag` later.

```typescript
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog', {
    next: { tags: ['posts'] },
  })
  const posts = await data.json()
  // ...
}
```

--------------------------------

### Test component rendering with React Testing Library

Source: https://nextjs.org/docs/app/guides/testing/jest

Unit test using @testing-library/react to verify that a Page component renders a heading element. Uses screen.getByRole() to query the DOM and .toBeInTheDocument() custom matcher to assert the element exists. Tests are organized with describe() and it() blocks.

```JSX
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
```

--------------------------------

### Check Next.js Draft Mode Status in Server Component (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/functions/draft-mode

This example demonstrates how to import `draftMode` from `next/headers` and use its `isEnabled` property to check if Draft Mode is currently active within an asynchronous Next.js Server Component. The `draftMode` function must be awaited.

```TypeScript
import { draftMode } from'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

--------------------------------

### Configuring Remote Image Domains in Next.js

Source: https://nextjs.org/docs/app/getting-started/images

To securely use remote images, you must define a list of allowed URL patterns in your 'next.config.js' file. This configuration example shows how to specify a remote pattern for an AWS S3 bucket, allowing Next.js to optimize images only from trusted sources.

```TypeScript
import type { NextConfig } from'next'
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'s3.amazonaws.com',
        port:'',
        pathname:'/my-bucket/**',
        search:'',
      },
    ],
  },
}
export default config
```

```JavaScript
const config = {
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname:'s3.amazonaws.com',
        port:'',
        pathname:'/my-bucket/**',
        search:'',
      },
    ],
  },
}
export default config
```

--------------------------------

### Wrap Dynamic APIs with Suspense for PPR

Source: https://nextjs.org/docs/app/building-your-application/rendering

When using dynamic APIs like cookies() that require request-time evaluation, wrap the dynamic component with Suspense to allow PPR to prerender static content while streaming dynamic portions. The example demonstrates using cookies API in a User component wrapped with Suspense.

```TypeScript
import { cookies } from 'next/headers'
export async function User() {
  const session = (await cookies()).get('session')?.value
  return '...'
}
```

```TypeScript
import { Suspense } from 'react'
import { User, AvatarSkeleton } from './user'
export const experimental_ppr = true
export default function Page() {
  return (
    <section>
      <h1>This will be prerendered</h1>
      <Suspense fallback={<AvatarSkeleton />}>
        <User />
      </Suspense>
    </section>
  )
}
```

--------------------------------

### Write Cypress component test for Next.js page

Source: https://nextjs.org/docs/app/guides/testing/cypress

Creates a component test that mounts a React component and validates its rendered output. The test mounts the Page component, checks for an h1 element containing 'Home', and verifies a link to '/about' is visible. This demonstrates basic component testing patterns for Next.js.

```TypeScript
import Page from '../../app/page'
describe('<Page />', () => {
  it('should render and display expected content', () => {
    // Mount the React component for the Home page
    cy.mount(<Page />)
    // The new page should contain an h1 with "Home"
    cy.get('h1').contains('Home')
    // Validate that a link with the expected URL is present
    // Following the link is better suited to an E2E test
    cy.get('a[href="/about"]').should('be.visible')
  })
})
```

--------------------------------

### Generate App Icon with ImageResponse API in Next.js

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

Creates a dynamic app icon using the ImageResponse API from next/og. This example generates a 32x32 PNG icon displaying the letter 'A' on a black background. The icon is statically optimized and cached by default unless using Dynamic APIs or uncached data.

```TypeScript
import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        A
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
```

--------------------------------

### Manual Next.js Upgrade with Package Manager

Source: https://nextjs.org/docs/app/getting-started/upgrading

Manually upgrade Next.js, React, and related dependencies to their latest versions using your preferred package manager (pnpm, npm, yarn, or bun). This approach gives you control over the upgrade process.

```bash
pnpm install next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
npm install next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest
```

```bash
bun add next@latest react@latest react-dom@latest eslint-config-next@latest
```

--------------------------------

### next.config.js Configuration Options

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/productionBrowserSourceMaps

Comprehensive configuration options for next.config.js to customize build behavior, optimization, redirects, rewrites, and environment-specific settings.

```APIDOC
## next.config.js Configuration

### Description
Main configuration file for Next.js application customization and build optimization.

### File Location
```
next.config.js
```

### Common Configuration Options

#### basePath
**Type**: string  
**Default**: undefined  
**Description**: Deploy application under a sub-path.

```javascript
module.exports = {
  basePath: '/app',
  // Routes become /app/about, /app/posts, etc.
}
```

#### assetPrefix
**Type**: string  
**Default**: undefined  
**Description**: Set CDN prefix for static assets.

```javascript
module.exports = {
  assetPrefix: 'https://cdn.example.com',
}
```

#### env
**Type**: object  
**Description**: Environment variables exposed to browser (public).

```javascript
module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
  },
}
```

#### redirects
**Type**: async function  
**Description**: Configure URL redirects at build time.

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 redirect
      },
      {
        source: '/docs/:path*',
        destination: '/documentation/:path*',
        permanent: false, // 307 redirect
      },
    ]
  },
}
```

#### rewrites
**Type**: async function  
**Description**: Rewrite URL paths internally without changing displayed URL.

```javascript
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*',
        },
      ],
      afterFiles: [
        {
          source: '/:path*',
          destination: '/index.html',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: `https://custom-404-page.com/?path=/:path*`,
        },
      ],
    }
  },
}
```

#### headers
**Type**: async function  
**Description**: Set custom HTTP response headers.

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'custom-value',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}
```

#### images
**Type**: object  
**Description**: Configure image optimization behavior.

```javascript
module.exports = {
  images: {
    domains: ['cdn.example.com', 'images.example.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
```

#### compress
**Type**: boolean  
**Default**: true  
**Description**: Enable gzip compression for responses.

```javascript
module.exports = {
  compress: true,
}
```

#### trailingSlash
**Type**: boolean  
**Description**: Add trailing slash to routes.

```javascript
module.exports = {
  trailingSlash: true,
  // /about becomes /about/
}
```

#### reactStrictMode
**Type**: boolean  
**Default**: true  
**Description**: Enable React Strict Mode for development.

```javascript
module.exports = {
  reactStrictMode: true,
}
```

#### output
**Type**: string  
**Options**: 'standalone' | 'export'  
**Description**: Configure build output.

```javascript
module.exports = {
  output: 'standalone', // Self-contained deployment
  // output: 'export', // Static HTML export
}
```

#### typescript
**Type**: object  
**Description**: Configure TypeScript behavior.

```javascript
module.exports = {
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false,
  },
}
```

#### eslint
**Type**: object  
**Description**: Configure ESLint integration.

```javascript
module.exports = {
  eslint: {
    dirs: ['pages', 'utils'],
    ignoreDuringBuilds: false,
  },
}
```

#### webpack
**Type**: function  
**Description**: Customize webpack configuration.

```javascript
module.exports = {
  webpack: (config, { isServer }) => {
    return config
  },
}
```

#### experimental
**Type**: object  
**Description**: Enable experimental features.

```javascript
module.exports = {
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns'],
  },
}
```
```

--------------------------------

### Handle Pending Form Submission State using useActionState (React)

Source: https://nextjs.org/docs/app/guides/forms

This example highlights how `useActionState` provides a `pending` boolean, which can be used to disable the form's submit button. This offers immediate visual feedback to the user that the form is being processed after submission.

```TypeScript
'use client'
import { useActionState } from'react'
import { createUser } from'@/app/actions'
exportfunctionSignup() {
const [state,formAction,pending] =useActionState(createUser, initialState)
return (
    <formaction={formAction}>
      {/* Other form elements */}
      <buttondisabled={pending}>Sign up</button>
    </form>
  )
}
```

--------------------------------

### Get a Cookie Value with NextRequest `cookies.get()` in JavaScript

Source: https://nextjs.org/docs/app/api-reference/functions/next-request

Use this method to retrieve the value of a specific cookie by its name from the request. If multiple cookies with the same name are present, only the value of the first one found is returned. If the requested cookie is not found, the method returns `undefined`.

```javascript
// Given incoming request /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner')
```

--------------------------------

### Include Google Analytics in Root Layout - Next.js

Source: https://nextjs.org/docs/app/guides/third-party-libraries

Adds Google Analytics 4 to all routes by including the GoogleAnalytics component in the root layout file. Requires a measurement ID (gaId prop) that typically starts with 'G-'. The component automatically fetches scripts after hydration.

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

--------------------------------

### Server and Client Functions

Source: https://nextjs.org/docs/app/getting-started/error-handling

Utility functions for server-side operations, client-side hooks, and advanced features like caching, redirects, and metadata generation. These functions enable data fetching, navigation, and application configuration.

```APIDOC
## Server Functions

### Data Fetching Functions

#### fetch()
- **Purpose**: Extended fetch with caching and revalidation
- **Location**: Global scope in Server Components
- **Options**:
  - `cache` (string) - 'force-cache', 'no-store', 'revalidate-x'
  - `next.revalidate` (number) - Revalidation time in seconds
  - `next.tags` (array) - Tags for on-demand revalidation
- **Example**:
```javascript
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600, tags: ['products'] }
})
```

#### cookies()
- **Purpose**: Access and manipulate HTTP cookies
- **Location**: Server Components and Server Actions
- **Methods**: `get()`, `getAll()`, `set()`, `delete()`, `has()`
- **Example**:
```javascript
import { cookies } from 'next/headers'

const cookieStore = await cookies()
const token = cookieStore.get('auth-token')
```

#### headers()
- **Purpose**: Access incoming request headers
- **Location**: Server Components and Server Actions
- **Example**:
```javascript
import { headers } from 'next/headers'

const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

### Cache Management Functions

#### revalidatePath()
- **Purpose**: Revalidate cached data for specific path
- **Parameters**:
  - `path` (string) - Required - Route path to revalidate
  - `type` (string) - Optional - 'page' or 'layout'
- **Example**:
```javascript
import { revalidatePath } from 'next/cache'

revalidatePath('/products')
```

#### revalidateTag()
- **Purpose**: Revalidate data by tag
- **Parameters**:
  - `tag` (string) - Required - Cache tag to revalidate
- **Example**:
```javascript
import { revalidateTag } from 'next/cache'

revalidateTag('products')
```

#### unstable_noStore()
- **Purpose**: Disable caching for specific render
- **Usage**: Call at top of Server Component
- **Example**:
```javascript
import { unstable_noStore } from 'next/cache'

export default function DynamicPage() {
  unstable_noStore()
  // Component code
}
```

#### unstable_cache()
- **Purpose**: Manually cache expensive computations
- **Parameters**:
  - `callback` (function) - Function to cache
  - `keyParts` (array) - Cache key components
  - `options` (object) - Cache options including tags and revalidate

### Redirect and Navigation Functions

#### redirect()
- **Purpose**: Redirect user to different route
- **Parameters**: `path` (string) - Target path
- **Example**:
```javascript
import { redirect } from 'next/navigation'

if (!user) {
  redirect('/login')
}
```

#### permanentRedirect()
- **Purpose**: Permanent redirect (HTTP 308)
- **Parameters**: `path` (string) - Target path

### Metadata Functions

#### generateMetadata()
- **Purpose**: Generate dynamic metadata for pages
- **Parameters**: `props` (object) - Route params and search params
- **Returns**: Metadata object with title, description, og, etc.
- **Example**:
```javascript
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id)
  return {
    title: product.name,
    description: product.description
  }
}
```

#### generateStaticParams()
- **Purpose**: Pre-generate static pages for dynamic routes
- **Returns**: Array of param objects
- **Example**:
```javascript
export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map(product => ({
    id: String(product.id)
  }))
}
```

#### generateSitemaps()
- **Purpose**: Generate dynamic XML sitemaps
- **Returns**: Array of sitemap objects

#### generateImageMetadata()
- **Purpose**: Generate multiple images for OG and Twitter
- **Returns**: Array of image metadata

#### generateViewport()
- **Purpose**: Generate dynamic viewport metadata
- **Returns**: Viewport configuration object

## Client Hooks

### useRouter()
- **Purpose**: Access router for programmatic navigation
- **Location**: Client Components only
- **Methods**: `push()`, `replace()`, `prefetch()`, `back()`, `forward()`
- **Example**:
```javascript
'use client'

import { useRouter } from 'next/navigation'

export default function Button() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  )
}
```

### usePathname()
- **Purpose**: Get current pathname
- **Location**: Client Components only
- **Returns**: Current pathname string

### useSearchParams()
- **Purpose**: Access URL search parameters
- **Location**: Client Components only
- **Methods**: `get()`, `getAll()`, `entries()`
- **Example**:
```javascript
'use client'

import { useSearchParams } from 'next/navigation'

export default function Search() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  return <div>Search: {query}</div>
}
```

### useParams()
- **Purpose**: Access dynamic route parameters
- **Location**: Client Components only
- **Returns**: Object with route params
- **Example**:
```javascript
'use client'

import { useParams } from 'next/navigation'

export default function Product() {
  const params = useParams()
  return <div>Product ID: {params.id}</div>
}
```

### useSelectedLayoutSegment()
- **Purpose**: Get active route segment one level deep
- **Location**: Client Components in layouts

### useSelectedLayoutSegments()
- **Purpose**: Get all active route segments
- **Location**: Client Components in layouts

### useReportWebVitals()
- **Purpose**: Report Core Web Vitals metrics
- **Location**: Client Components
- **Example**:
```javascript
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals(metric => {
    console.log(metric)
  })
}
```
```

--------------------------------

### useReportWebVitals Hook Setup with Client Component

Source: https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals

Sets up the useReportWebVitals hook in a client component to log performance metrics. The hook requires the 'use client' directive and should be imported from 'next/web-vitals'. Best practice is to create a separate component for the WebVitals functionality to confine the client boundary.

```JavaScript
'use client'
import { useReportWebVitals } from 'next/web-vitals'

const logWebVitals = (metric) => {
  console.log(metric)
}

export function WebVitals() {
  useReportWebVitals(logWebVitals)
  return null
}
```

--------------------------------

### Integrate Client Component Context Provider in Next.js Server Component Layout

Source: https://nextjs.org/docs/app/getting-started/server-and-client-components

This example illustrates how to import and utilize a previously defined Client Component `ThemeProvider` within a Server Component, such as the `app/layout.tsx`. By wrapping child components with the `ThemeProvider`, the React context is made available to all client components rendered within this layout, effectively bridging client-side context with server-side rendering.

```typescript
import ThemeProvider from './theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```javascript
import ThemeProvider from './theme-provider'

export default function RootLayout({
  children,
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

--------------------------------

### Parallel Data Fetching with Promise.all in Next.js

Source: https://nextjs.org/docs/app/getting-started/fetching-data

Initiates multiple independent data requests in parallel by defining them outside components and resolving them together with Promise.all. This pattern significantly improves performance by starting both requests simultaneously rather than sequentially. Handles multiple data sources returning consolidated results.

```typescript
import Albums from './albums'

async function getArtist(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}

async function getAlbums(username: string) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)
  // Initiate both requests in parallel
  const [artist, albums] = await Promise.all([artistData, albumsData])
  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

--------------------------------

### Manifest.json File

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata

API Reference for manifest.json metadata file. This file defines web app manifest configuration for progressive web app support and browser integration.

```APIDOC
## Metadata File Convention: manifest.json

### Description
The manifest.json file defines web application metadata for PWA support and browser integration. This special metadata file is automatically served and cached.

### File Location
```
app/manifest.json
```

### File Convention
- **manifest.json** - Static web app manifest file
- **manifest.js|ts** - Dynamic manifest generation (code-based)

### Behavior
- Cached by default
- Automatically served with correct content type
- Linked in application head elements
- Supports both static and dynamic generation
```

--------------------------------

### Control Next.js Link Prefetching Behavior

Source: https://nextjs.org/docs/app/api-reference/components/link

This example demonstrates how to explicitly disable prefetching for a Next.js `<Link>` component. By setting `prefetch={false}`, the linked route and its data will not be loaded in the background when the component enters the viewport, allowing for fine-grained control over performance optimization.

```tsx
import Link from'next/link'

export default function Page() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

--------------------------------

### Trigger Unauthorized Page from a Next.js Component (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized

This example demonstrates how to use the `unauthorized` function from `next/navigation` within an asynchronous Next.js page component. If the `verifySession` function indicates no active session, calling `unauthorized()` will redirect the user to the custom `unauthorized.js` page defined elsewhere.

```TypeScript
import { verifySession } from '@/app/lib/dal';
import { unauthorized } from 'next/navigation';

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session) {
    unauthorized();
  }
  return <div>Dashboard</div>;
}
```

--------------------------------

### Add Jest test scripts to package.json

Source: https://nextjs.org/docs/app/guides/testing/jest

Configure npm scripts in package.json to run Jest tests. Includes 'test' for single run and 'test:watch' for continuous testing on file changes. These scripts enable running tests via npm run test, yarn test, or pnpm test commands.

```JSON
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

--------------------------------

### Define Default Metadata Title for Child Segments in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

This example sets a default title using `title.default` within `app/layout.tsx`. This default title acts as a fallback for child route segments that do not explicitly define their own title, ensuring a consistent base title.

```TypeScript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {
  title: {
    default:'Acme',
  },
}
```

```TypeScript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {}
// Output: <title>Acme</title>
```

--------------------------------

### Next.js Route Handler Factory Pattern (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Illustrates a common factory pattern used by libraries to create a shared Next.js Route Handler. It defines a single handler for multiple HTTP methods like GET and POST, allowing the library to customize responses based on request details such as method and pathname.

```typescript
import { createHandler } from'third-party-library'
consthandler=createHandler({
/* library-specific options */
})
exportconstGET= handler
// or
export { handler as POST }
```

--------------------------------

### Next.js Development Server Configuration Options

Source: https://nextjs.org/docs/app/api-reference/cli/next

Customizes the development server behavior including port, hostname, Turbopack bundler, and debug tracing. Allows specification of custom directories, network interfaces, and remote trace reporting for advanced debugging.

```bash
next dev -p 3000 --port 3000
next dev -H 0.0.0.0 --hostname 0.0.0.0
next dev --turbopack
next dev --experimental-upload-trace <traceUrl>
```

--------------------------------

### Implement Authentication and Authorization in a Server Function with TypeScript

Source: https://nextjs.org/docs/app/api-reference/directives/use-server

This example showcases how to integrate authentication and authorization checks within a server-side function defined using `use server`. Before performing sensitive operations like `createUser`, the function validates a provided token to ensure the user is authorized, throwing an error if access is denied.

```TypeScript
'use server'
import { db } from'@/shared/db'// Your database client
import { authenticate } from'@/shared/auth'// Your authentication library
exportasyncfunctioncreateUser(
  data: { name:string; email:string },
  token:string
) {
constuser=authenticate(token)
if (!user) {
thrownewError('Unauthorized')
  }
constnewUser=awaitdb.user.create({ data })
return newUser
}
```

--------------------------------

### Access URL Query Parameters in Next.js App Router

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

This example demonstrates how to retrieve URL query parameters within a Next.js App Router handler. It uses the `nextUrl.searchParams` property of the `NextRequest` object to access and extract specific query values.

```TypeScript
import { type NextRequest } from'next/server'
exportfunctionGET(request:NextRequest) {
constsearchParams=request.nextUrl.searchParams
constquery=searchParams.get('query')
// query is "hello" for /api/search?query=hello
}
```

--------------------------------

### Configure VS Code launch.json for Next.js Debugging

Source: https://nextjs.org/docs/app/guides/debugging

This configuration file (`.vscode/launch.json`) sets up various debugging profiles for a Next.js project within VS Code. It allows for server-side, client-side (Chrome/Firefox), and full-stack debugging with source map support by launching the development server and attaching debuggers.

```json
{
"version":"0.2.0",
"configurations": [
    {
"name":"Next.js: debug server-side",
"type":"node-terminal",
"request":"launch",
"command":"npm run dev"
    },
    {
"name":"Next.js: debug client-side",
"type":"chrome",
"request":"launch",
"url":"http://localhost:3000"
    },
    {
"name":"Next.js: debug client-side (Firefox)",
"type":"firefox",
"request":"launch",
"url":"http://localhost:3000",
"reAttach":true,
"pathMappings": [
        {
"url":"webpack://_N_E",
"path":"${workspaceFolder}"
        }
      ]
    },
    {
"name":"Next.js: debug full stack",
"type":"node",
"request":"launch",
"program":"${workspaceFolder}/node_modules/next/dist/bin/next",
"runtimeArgs": ["--inspect"],
"skipFiles": ["<node_internals>/**"],
"serverReadyAction": {
"action":"debugWithEdge",
"killOnServerStop":true,
"pattern":"- Local:.+(https?://.+)",
"uriFormat":"%s",
"webRoot":"${workspaceFolder}"
      }
    }
  ]
}
```

--------------------------------

### Read FormData Request Body in Next.js App Router

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

This example demonstrates how to process a `FormData` request body in a Next.js App Router handler. It uses `request.formData()` to retrieve form data and extract specific fields like 'name' and 'email'.

```TypeScript
exportasyncfunctionPOST(request:Request) {
constformData=awaitrequest.formData()
constname=formData.get('name')
constemail=formData.get('email')
returnResponse.json({ name, email })
}
```

--------------------------------

### Configure TypeScript baseUrl for Absolute Imports

Source: https://nextjs.org/docs/app/getting-started/installation

Set up absolute import paths in tsconfig.json or jsconfig.json using the baseUrl compiler option. This enables cleaner imports by aliasing project directories, allowing imports from '@/components/button' instead of '../../../components/button'.

```json
{
  "compilerOptions": {
    "baseUrl": "src/"
  }
}
```

--------------------------------

### Server Actions for Push Notification Management in Next.js

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Implements three core server action functions: subscribeUser stores push subscriptions, unsubscribeUser removes them, and sendNotification dispatches notifications via web-push. The code includes VAPID configuration setup and error handling. In production, subscriptions should be persisted in a database rather than memory.

```TypeScript
'use server'
import webpush from 'web-push'

webpush.setVapidDetails(
  'your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png'
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
```

--------------------------------

### Access Next.js Public Environment Variable in Client-Side Code

Source: https://nextjs.org/docs/app/guides/environment-variables

This example demonstrates accessing a `NEXT_PUBLIC_` prefixed environment variable within a Next.js client-side component. The variable's value is inlined into the JavaScript bundle during the build process, making it available in the browser.

```javascript
import setupAnalyticsService from'../lib/my-analytics-service'
// 'NEXT_PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC_'.
// It will be transformed at build time to `setupAnalyticsService('abcdefghijk')`.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)
functionHomePage() {
return <h1>Hello World</h1>
}
exportdefault HomePage
```

--------------------------------

### Conditional Redirects with Next.js Middleware

Source: https://nextjs.org/docs/app/guides/redirecting

This example demonstrates implementing conditional redirects using `NextResponse.redirect` within a Next.js Middleware function. It checks for user authentication and redirects unauthenticated users to a `/login` page, effectively controlling access to routes matching the `/dashboard/:path*` matcher.

```TypeScript
import { NextResponse, NextRequest } from'next/server'
import { authenticate } from'auth-provider'
exportfunctionmiddleware(request:NextRequest) {
constisAuthenticated=authenticate(request)
// If the user is authenticated, continue as normal
if (isAuthenticated) {
returnNextResponse.next()
  }
// Redirect to login page if not authenticated
returnNextResponse.redirect(newURL('/login',request.url))
}
exportconstconfig= {
  matcher:'/dashboard/:path*',
}
```

--------------------------------

### API Routes and Route Handlers

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/appDir

Documentation for creating API endpoints in Next.js applications. Covers both the legacy API Routes (Pages Router) and modern Route Handlers (App Router) for handling HTTP requests.

```APIDOC
## API Routes and Route Handlers

### Description
Next.js provides two patterns for creating API endpoints: API Routes (Pages Router) and Route Handlers (App Router). Both allow you to create serverless functions that handle HTTP requests.

### Pages Router - API Routes

#### File Location
`pages/api/[endpoint].js`

#### Supported HTTP Methods
- GET
- POST
- PUT
- DELETE
- PATCH
- HEAD
- OPTIONS

#### Handler Signature
```javascript
export default function handler(req, res) {
  // Handle request
}
```

#### Request Object Properties
- **req.method** (string) - HTTP method
- **req.headers** (object) - Request headers
- **req.query** (object) - Query parameters
- **req.body** (object) - Request body (for POST/PUT/PATCH)
- **req.cookies** (object) - Cookies

#### Response Object Methods
- **res.status(code)** - Set HTTP status code
- **res.json(data)** - Send JSON response
- **res.send(data)** - Send response
- **res.redirect(status, url)** - Redirect
- **res.setHeader(name, value)** - Set header

### App Router - Route Handlers

#### File Location
`app/api/[endpoint]/route.js`

#### Supported HTTP Methods
- GET
- POST
- PUT
- DELETE
- PATCH
- HEAD
- OPTIONS

#### Handler Signature
```javascript
export async function GET(request) {
  // Handle request
  return Response.json({ data })
}
```

#### Request Object
- **request.method** (string) - HTTP method
- **request.headers** - Headers object
- **request.url** (string) - Full URL
- **request.nextUrl** - Parsed URL with Next.js specific properties
- **request.json()** - Parse JSON body
- **request.text()** - Parse text body
- **request.formData()** - Parse form data

#### Response Object
- **Response.json(data, init)** - JSON response
- **Response.text(text, init)** - Text response
- **new Response(body, init)** - Custom response
- **NextResponse.json(data, init)** - Next.js enhanced JSON response
- **NextResponse.redirect(url)** - Redirect response
- **NextResponse.rewrite(url)** - URL rewrite

### Middleware

#### File Location
`middleware.js` (root or src directory)

#### Handler Signature
```javascript
export function middleware(request) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

#### Use Cases
- Request logging and monitoring
- Authentication and authorization
- Request/response modification
- Redirects and rewrites
- Rate limiting
```

--------------------------------

### Implementing Basic Next.js Error Recovery (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/error

This example shows a simplified `error.js` component for a Next.js route segment. It focuses on using the `reset` function to allow users to attempt recovery from an error by re-rendering the affected segment. This component is a client-side React Error Boundary.

```typescript
'use client'// Error boundaries must be Client Components
exportdefaultfunctionError({
  error,
  reset,
}: {
  error:Error& { digest?:string }
reset: () =>void
}) {
return (
    <div>
      <h2>Something went wrong!</h2>
      <buttononClick={() =>reset()}>Try again</button>
    </div>
  )
}
```

--------------------------------

### Intercept Login Route with a Modal Component (Next.js)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes

This example demonstrates intercepting the `/login` route within a Parallel Route slot using the `(.)` convention in the file name. It wraps the `Login` component within a `Modal` component, effectively displaying the login form as a modal when accessed through this intercepted route.

```TypeScript
import { Modal } from'@/app/ui/modal'
import { Login } from'@/app/ui/login'
exportdefaultfunctionPage() {
return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

--------------------------------

### Execute code with event handlers in Next.js Script Client Component

Source: https://nextjs.org/docs/app/guides/scripts

This code illustrates the use of event handlers like `onLoad` with the `next/script` component to execute functions at specific script lifecycle stages. It requires the containing component to be a Next.js Client Component, indicated by `'use client'`. The example logs a message once the external script has finished loading.

```TypeScript
'use client'
import Script from'next/script'
exportdefaultfunctionPage() {
return (
    <>
      <Script
src="https://example.com/script.js"
onLoad={() => {
console.log('Script has loaded')
        }}
      />
    </>
  )
}
```

--------------------------------

### Implement Locale Detection and Redirect in Next.js Middleware

Source: https://nextjs.org/docs/app/guides/internationalization

Next.js middleware that detects the user's preferred locale from the Accept-Language header and redirects incoming requests to include the locale in the pathname (e.g., /en-US/products). Skips internal Next.js paths and processes root URLs.

```javascript
import { NextResponse } from 'next/server';

let locales = ['en-US', 'nl-NL', 'nl']

// Get the preferred locale, similar to the above or using a library
function getLocale(request) { ... }

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
```

--------------------------------

### Configure Next.js ESLint root directory in monorepo (ESLint)

Source: https://nextjs.org/docs/app/api-reference/config/eslint

This snippet demonstrates how to specify a root directory for `eslint-plugin-next` in an ESLint configuration file (`eslint.config.mjs`). This is crucial for monorepo setups where the Next.js application is not located in the project's root, ensuring ESLint correctly identifies the application's base path.

```javascript
import { FlatCompat } from'@eslint/eslintrc'
constcompat=newFlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
  baseDirectory:import.meta.dirname,
})
consteslintConfig= [
...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir:'packages/my-app/',
      },
    },
  }),
]
exportdefault eslintConfig
```

--------------------------------

### Preload Resources with ReactDOM in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

Client component demonstrating how to use ReactDOM.preload(), ReactDOM.preconnect(), and ReactDOM.prefetchDNS() methods to insert resource hints into the document head. These methods provide alternatives to unsupported HTML link elements for resource optimization. Only supported in Client Components.

```typescript
'use client'
import ReactDOM from 'react-dom'
export function PreloadResources() {
  ReactDOM.preload('...', { as: '...' })
  ReactDOM.preconnect('...', { crossOrigin: '...' })
  ReactDOM.prefetchDNS('...')
  return '...'
}
```

--------------------------------

### Invoke Server Function with HTML Form Action

Source: https://nextjs.org/docs/app/getting-started/updating-data

Creates a React form component that invokes a Server Function using the HTML action prop. The Server Function automatically receives the FormData object containing form inputs, which can be extracted using native FormData methods like get().

```TypeScript
import { createPost } from'@/app/actions'
exportfunctionForm() {
  return (
    <formaction={createPost}>
      <inputtype="text"name="title" />
      <inputtype="text"name="content" />
      <buttontype="submit">Create</button>
    </form>
  )
}
```

```TypeScript
'use server'
exportasyncfunctioncreatePost(formData:FormData) {
  consttitle=formData.get('title')
  constcontent=formData.get('content')
  // Update data
  // Revalidate cache
}
```

--------------------------------

### next info CLI Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

The `next info` command prints relevant details about the current system, Next.js environment, and package versions. This information is useful for debugging and reporting issues.

```APIDOC
## next info

### Description
`next info` prints relevant details about the current system which can be used to report Next.js bugs when opening a GitHub issue. This information includes Operating System platform/arch/version, Binaries (Node.js, npm, Yarn, pnpm), package versions (`next`, `react`, `react-dom`), and more.

### Command
`next info`

### Usage
```bash
next info [options]
```

### Options
- **-h, --help** (flag) - Optional - Show all available options.
- **--verbose** (flag) - Optional - Collects additional information for debugging.

### Command Example
```bash
next info --verbose
```

### Output
Terminal output displaying system and Next.js environment details.

### Output Example
```
OperatingSystem:
Platform:darwin
Arch:arm64
Version:DarwinKernelVersion23.6.0
Availablememory (MB): 65536
AvailableCPUcores:10
Binaries:
Node:20.12.0
npm:10.5.0
Yarn:1.22.19
pnpm:9.6.0
RelevantPackages:
next:15.0.0-canary.115//Latestavailableversionisdetected (15.0.0-canary.115).
eslint-config-next:14.2.5
react:19.0.0-rc
react-dom:19.0.0
typescript:5.5.4
Next.jsConfig:
output:N/A
```
```

--------------------------------

### Use NEXT_PUBLIC_ Variable in Next.js Page Component

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

Shows how to use a NEXT_PUBLIC_ prefixed environment variable in a Next.js page component. The variable is transformed at build time to a hard-coded value, enabling its use in client-side code. The example imports an analytics service and passes the public environment variable to it.

```javascript
import setupAnalyticsService from '../lib/my-analytics-service'
// 'NEXT_PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC_'.
// It will be transformed at build time to `setupAnalyticsService('abcdefghijk')`.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)
function HomePage() {
  return <h1>Hello World</h1>
}
export default HomePage
```

--------------------------------

### Static robots.txt File Configuration

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

Create a static robots.txt file in the root app directory to define crawler access rules. This file follows the Robots Exclusion Standard and specifies user agents, allowed/disallowed paths, and sitemap location.

```text
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://acme.com/sitemap.xml
```

--------------------------------

### Configure htmlLimitedBots in Next.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots

This TypeScript example demonstrates how to set the `htmlLimitedBots` option within `next.config.ts` to a custom regular expression. This configuration overrides Next.js's default list, allowing specific user agents to receive blocking metadata instead of streaming metadata.

```TypeScript
import type { NextConfig } from 'next'

const config: NextConfig = {
  htmlLimitedBots: /MySpecialBot|MyAnotherSpecialBot|SimpleCrawler/,
}

export default config
```

--------------------------------

### Read Next.js Route Params and Query in Client Components (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/page

This example shows how to read `params` and `searchParams` inside a Next.js Client Component. Since Client Components cannot be `async`, React's `use` hook is employed to synchronously read the promise values provided by `params` and `searchParams`.

```TypeScript
'use client'
import { use } from 'react'
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
const { slug } = use(params)
const { query } = use(searchParams)
}
```

--------------------------------

### ReactDOM Preconnect Resource Hint

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

Method signature and head output for ReactDOM.preconnect(). Preemptively initiates a connection to an origin. Accepts optional crossOrigin parameter for handling cross-origin connections.

```typescript
ReactDOM.preconnect(href: string, options?: { crossOrigin?: string })
```

```html
<link rel="preconnect" href="..." crossorigin />
```

--------------------------------

### Understand Header Overriding Behavior in Next.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/headers

This example illustrates how Next.js handles header conflicts. If multiple header configurations match the same path and set the same header key, the last defined header's value will override previous ones. Here, for the path `/hello`, `x-hello` will ultimately be set to 'world' due to the order of definition.

```javascript
module.exports= {
  async headers() {
    return [
      {
        source:'/:path*',
        headers: [
          {
            key:'x-hello',
            value:'there',
          },
        ],
      },
      {
        source:'/hello',
        headers: [
          {
            key:'x-hello',
            value:'world',
          },
        ],
      },
    ]
  },
}
```

--------------------------------

### Create Client Dashboard Layout Component (App Directory)

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

This JavaScript component defines a client-side dashboard layout for use in the `app` directory. The `'use client'` directive marks it as a Client Component, allowing for interactive features and state management. It provides a consistent layout structure for its children.

```javascript
'use client' // this directive should be at top of the file, before any imports.
// This is a Client Component
export default function DashboardLayout({ children }) {
  return (
    <div>
      <h2>My Dashboard</h2>
      {children}
    </div>
  )
}
```

--------------------------------

### Create Dynamic Segment Route in Next.js

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Demonstrates how to create a dynamic route segment using square bracket notation and access the dynamic parameter from the params prop. The component is an async Server Component that fetches post data based on the slug parameter and renders the blog post content.

```typescript
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

--------------------------------

### Dynamic Redirects at Scale using Next.js Middleware and Edge Config

Source: https://nextjs.org/docs/app/guides/redirecting

This advanced Middleware example shows how to manage a large number of dynamic redirects by fetching redirect rules from an external data source, such as Vercel's Edge Config. It parses the retrieved redirect data to determine the destination and status code (307 or 308), then applies the redirect using `NextResponse.redirect`, enabling programmatic and scalable redirect management.

```TypeScript
import { NextResponse, NextRequest } from'next/server'
import { get } from'@vercel/edge-config'
typeRedirectEntry= {
  destination:string
  permanent:boolean
}
exportasyncfunctionmiddleware(request:NextRequest) {
constpathname=request.nextUrl.pathname
constredirectData=awaitget(pathname)
if (redirectData &&typeof redirectData ==='string') {
constredirectEntry:RedirectEntry=JSON.parse(redirectData)
conststatusCode=redirectEntry.permanent ?308:307
returnNextResponse.redirect(redirectEntry.destination, statusCode)
  }
// No redirect found, continue without redirecting
returnNextResponse.next()
}
```

--------------------------------

### Router Transition Tracking Hook (onRouterTransitionStart)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

The `onRouterTransitionStart` function can be exported from `instrumentation-client.js|ts` to receive notifications when router navigation begins, allowing for tracking of navigation events.

```APIDOC
## Router Transition Tracking Hook `onRouterTransitionStart`

### Description
You can export an `onRouterTransitionStart` function from your `instrumentation-client.js|ts` file to receive notifications when router navigation begins. This hook is useful for tracking navigation events and updating monitoring contexts.

### Parameters
-   **url** (string) - The URL being navigated to.
-   **navigationType** ('push' | 'replace' | 'traverse') - The type of navigation.
    *   `'push'`: New entry added to history.
    *   `'replace'`: Current history entry replaced.
    *   `'traverse'`: Navigating through history (e.g., back/forward buttons).

### Code Example
```typescript
performance.mark('app-init')
export function onRouterTransitionStart(
  url: string,
  navigationType: 'push' | 'replace' | 'traverse'
) {
  console.log(`Navigation started: ${navigationType} to ${url}`)
  performance.mark(`nav-start-${Date.now()}`)
}
```
```

--------------------------------

### Use Localization Dictionary in Next.js Server Component Page

Source: https://nextjs.org/docs/app/guides/internationalization

Demonstrates how to fetch and use the localized dictionary within a Next.js Server Component page. The `getDictionary` function is called with the current language parameter to display translated content, ensuring only the resulting HTML is sent to the client.

```typescript
import { getDictionary } from'./dictionaries'
exportdefaultasyncfunctionPage({
  params,
}: {
  params:Promise<{ lang:'en'|'nl' }>
}) {
const { lang } =await params
constdict=awaitgetDictionary(lang) // en
return <button>{dict.products.cart}</button> // Add to Cart
}
```

--------------------------------

### useSelectedLayoutSegment - Basic Hook Usage

Source: https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment

Basic example of using useSelectedLayoutSegment in a Client Component to display the active route segment. The hook returns a string representing the active segment name or null if no segment exists. This component must be marked with 'use client' directive.

```TypeScript
'use client'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()
  return <p>Active segment: {segment}</p>
}
```

--------------------------------

### App Router - Server and Client Components

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/poweredByHeader

Understand the difference between Server Components (default in App Router) and Client Components. Use 'use client' directive for interactivity and 'use server' for server actions.

```APIDOC
## Server and Client Components

### Description
App Router uses React Server Components by default. Server Components render on the server and send HTML to the client. Client Components run in the browser and handle interactivity.

### Server Components (Default)
- Render on the server
- Access databases and secrets directly
- Keep sensitive data on the server
- Reduce JavaScript bundle size
- Cannot use browser APIs

### Server Component Example
```javascript
// app/posts/page.js - Server Component by default
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

### Client Components
- Run in the browser
- Use browser APIs (localStorage, window, etc.)
- Use React hooks (useState, useEffect, etc.)
- Use event listeners and interactivity
- Marked with 'use client' directive

### Client Component Example
```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Server Actions
- Async functions that run on the server
- Can be called from Client Components
- Use 'use server' directive
- Handle form submissions and mutations

### Server Action Example
```javascript
'use server';

export async function submitForm(formData) {
  const email = formData.get('email');
  // Process on server
  await db.users.create({ email });
  return { success: true };
}
```

### Calling Server Action from Client Component
```javascript
'use client';

import { submitForm } from '@/app/actions';

export default function Form() {
  return (
    <form action={submitForm}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Composition Pattern
```javascript
// app/posts/[id]/page.js - Server Component
import InteractiveComponent from './interactive';

export default async function PostPage({ params }) {
  const post = await fetchPost(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <InteractiveComponent postId={params.id} />
    </article>
  );
}
```

```javascript
// app/posts/[id]/interactive.js - Client Component
'use client';

import { useState } from 'react';

export default function InteractiveComponent({ postId }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'} Like
    </button>
  );
}
```

### Best Practices
- Keep Server Components at the top of component tree
- Pass data from Server to Client Components via props
- Use Client Components for interactivity only
- Keep Client Components small and focused
- Use Server Actions for data mutations
```

--------------------------------

### Integrate custom search button with loading state into a Next.js form

Source: https://nextjs.org/docs/app/api-reference/components/form

This code updates the initial `next/form` example to incorporate the `SearchButton` component. By replacing the native button with the custom component, the form now leverages `useFormStatus` to display a dynamic loading state during submission, improving user feedback.

```TypeScript
import Form from'next/form'
import { SearchButton } from'@/ui/search-button'

exportdefaultfunctionPage() {
  return (
    <Formaction="/search">
      <inputname="query" />
      <SearchButton />
    </Form>
  )
}
```

--------------------------------

### next build CLI Command

Source: https://nextjs.org/docs/app/api-reference/cli/next

The `next build` command creates an optimized production build of your Next.js application, preparing it for deployment. It analyzes routes and displays information about their size and first load JavaScript.

```APIDOC
## next build

### Description
`next build` creates an optimized production build of your application. The output displays information about each route, including its size and First Load JS, both of which are compressed with gzip.

### Command
`next build`

### Usage
```bash
next build [directory] [options]
```

### Options
- **-h, --help** (flag) - Optional - Show all available options.
- **[directory]** (string) - Optional - A directory on which to build the application. If not provided, the current directory will be used.
- **-d, --debug** (flag) - Optional - Enables a more verbose build output, including rewrites, redirects, and headers.
- **--profile** (flag) - Optional - Enables production profiling for React.
- **--no-lint** (flag) - Optional - Disables linting. (Note: linting will be removed from `next build` in Next 16).
- **--no-mangling** (flag) - Optional - Disables mangling. This may affect performance and should only be used for debugging purposes.
- **--experimental-app-only** (flag) - Optional - Builds only App Router routes.
- **--experimental-build-mode** (string) - Optional - Uses an experimental build mode. (choices: "compile", "generate", default: "default")
- **--debug-prerender** (flag) - Optional - Debug prerender errors in development.

### Command Example
```bash
npm run build
# or
next build ./my-app --debug
```

### Output
Terminal output detailing route sizes and first load JS metrics.

### Output Example
```
Route (app)                              Size     First Load JS
┌○/_not-found0B0kB
└ƒ/products/[id]0B0kB
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
```

--------------------------------

### Configure Conditional Redirects with Headers in Next.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects

Implement conditional redirects in Next.js based on HTTP headers using the `has` field. The redirect only applies when specified header conditions are met. This example shows matching redirects when the 'x-redirect-me' header is present and excluding redirects when 'x-do-not-redirect' header exists.

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path((?!another-page$).*)',
        has: [
          {
            type: 'header',
            key: 'x-redirect-me'
          }
        ],
        permanent: false,
        destination: '/another-page'
      },
      {
        source: '/:path((?!another-page$).*)',
        missing: [
          {
            type: 'header',
            key: 'x-do-not-redirect'
          }
        ],
        permanent: false,
        destination: '/another-page'
      }
    ]
  }
}
```

--------------------------------

### use client Directive - Basic Counter Component

Source: https://nextjs.org/docs/app/api-reference/directives/use-client

Demonstrates how to declare a Client Component using the 'use client' directive at the top of a file. This example shows a simple counter component with state management using React's useState hook. The directive must be placed before any imports to properly mark the component for client-side rendering.

```typescript
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

--------------------------------

### Next.js: Insecure Client Component Props Interface (app/ui/profile.tsx - Bad Example)

Source: https://nextjs.org/docs/app/guides/data-security

Demonstrates a Client Component with a broad props interface that accepts an entire `User` object. This design encourages Server Components to pass unminimized data, increasing the likelihood of sensitive information reaching the client, even if not explicitly rendered.

```typescript
'use client'
// BAD: This is a bad props interface because it accepts way more data than the
// Client Component needs and it encourages server components to pass all that
// data down. A better solution would be to accept a limited object with just
// the fields necessary for rendering the profile.
exportdefaultasyncfunctionProfile({ user }: { user:User }) {
return (
    <div>
      <h1>{user.name}</h1>
      ...
    </div>
  )
}
```

--------------------------------

### Route Handlers Overview and Supported Methods

Source: https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

This section describes the core concepts of Next.js Route Handlers, their convention within the `app` directory, and lists all supported HTTP methods. It also touches upon the `NextRequest` and `NextResponse` extensions.

```APIDOC
## Route Handlers Overview

### Description
Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs, exclusively within the `app` directory. They are the equivalent of API Routes in the `pages` directory.

### Convention
Route Handlers are defined in a `route.js|ts` file inside the `app` directory. They can be nested anywhere but cannot coexist with a `page.js` file at the same route segment level.

### Method
Multiple (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)

### Endpoint
`/app/[...]/route.js|ts`

### Supported HTTP Methods
The following HTTP methods are supported:
- **GET**: Retrieve data.
- **POST**: Create data.
- **PUT**: Update or replace data.
- **PATCH**: Partially update data.
- **DELETE**: Delete data.
- **HEAD**: Retrieve headers only, without the response body.
- **OPTIONS**: Describe the communication options for the target resource.
If an unsupported method is called, Next.js will return a `405 Method Not Allowed` response.

### Extended APIs
Next.js extends the native Request and Response APIs with `NextRequest` and `NextResponse` to provide convenient helpers for advanced use cases.

### Request Example
```typescript
export async function GET(request: Request) {
  // Handle GET request
}

export async function POST(request: Request) {
  // Handle POST request
}
```

### Response
Conceptual response based on handler logic.
```

--------------------------------

### Unit Testing Next.js Middleware Function Response (Next.js)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This example shows how to unit test the entire Next.js middleware function. It uses `NextRequest` to simulate an incoming request and then asserts properties of the middleware's response using `isRewrite` and `getRewrittenUrl` from `next/experimental/testing/server`. This helps ensure that the middleware correctly modifies requests or responses, verifying rewrite behavior in this case.

```javascript
import { isRewrite, getRewrittenUrl } from'next/experimental/testing/server'
constrequest=newNextRequest('https://nextjs.org/docs')
constresponse=awaitmiddleware(request)
expect(isRewrite(response)).toEqual(true)
expect(getRewrittenUrl(response)).toEqual('https://other-domain.com/docs')
// getRedirectUrl could also be used if the response were a redirect
```

--------------------------------

### Import and Configure Google Font with Variable Font in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Import a variable font from next/font/google and apply it to the root layout component. This example demonstrates loading the Inter font with Latin subsets and swap display strategy without requiring explicit weight specification for variable fonts.

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Get Image Props with getImageProps Function

Source: https://nextjs.org/docs/app/api-reference/components/image

Use the getImageProps utility from next/image to extract props for the underlying img element and apply them to other components, styles, or canvas elements. This approach avoids calling React useState() for better performance but cannot be used with the placeholder prop.

```javascript
import { getImageProps } from 'next/image'

const props = getImageProps({
  src: 'https://example.com/image.jpg',
  alt: 'A scenic mountain view',
  width: 1200,
  height: 800,
})

function ImageWithCaption() {
  return (
    <figure>
      <img {...props} />
      <figcaption>A scenic mountain view</figcaption>
    </figure>
  )
}
```

--------------------------------

### Next.js Configuration (next.config.js)

Source: https://nextjs.org/docs/app/guides/single-page-applications

Comprehensive configuration options for customizing Next.js build behavior, optimization settings, and runtime features through the next.config.js file.

```APIDOC
## next.config.js Configuration Options

### Basic Configuration Structure

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration options
};

module.exports = nextConfig;
```

### Build & Optimization Options

#### compress
- **Type**: boolean
- **Default**: true
- **Description**: Enable gzip compression for generated pages and static assets

#### distDir
- **Type**: string
- **Default**: '.next'
- **Description**: Directory name for build output

#### generateBuildId
- **Type**: function or boolean
- **Description**: Custom build ID generation for cache busting

#### generateEtags
- **Type**: boolean
- **Default**: true
- **Description**: Generate ETags for static pages

#### productionBrowserSourceMaps
- **Type**: boolean
- **Default**: false
- **Description**: Enable source maps in production builds

#### optimizePackageImports
- **Type**: array
- **Description**: Optimize imports from specified packages

### Image Optimization

#### images
- **Type**: object
- **Properties**:
  - **domains** (array) - Allowed external image domains
  - **formats** (array) - Supported image formats
  - **deviceSizes** (array) - Responsive breakpoints
  - **imageSizes** (array) - Image size breakpoints
  - **minimumCacheTTL** (number) - Minimum cache duration
  - **dangerouslyAllowSVG** (boolean) - Allow SVG images

#### Example
```jsx
const nextConfig = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif']
  }
};
```

### Routing Configuration

#### basePath
- **Type**: string
- **Description**: Base path prefix for all routes
- **Example**: '/app' makes routes available at `/app/about`

#### trailingSlash
- **Type**: boolean
- **Default**: false
- **Description**: Add trailing slash to routes

#### pageExtensions
- **Type**: array
- **Default**: ['tsx', 'ts', 'jsx', 'js']
- **Description**: File extensions to treat as pages

#### assetPrefix
- **Type**: string
- **Description**: Prefix for static assets and images

#### redirects
- **Type**: async function
- **Description**: Configure route redirects

#### rewrites
- **Type**: async function
- **Description**: Configure URL rewrites

### Headers & Security

#### headers
- **Type**: async function
- **Description**: Set custom HTTP headers

#### crossOrigin
- **Type**: string
- **Description**: Set crossOrigin attribute for static assets

#### poweredByHeader
- **Type**: boolean
- **Default**: true
- **Description**: Include X-Powered-By header

### Environment & Runtime

#### env
- **Type**: object
- **Description**: Client-side environment variables

#### runtime
- **Type**: string
- **Options**: 'nodejs', 'edge'
- **Description**: Execution runtime

#### serverExternalPackages
- **Type**: array
- **Description**: Packages to exclude from bundling on server

#### transpilePackages
- **Type**: array
- **Description**: Packages to transpile in node_modules

### Development & Tooling

#### eslint
- **Type**: object
- **Properties**:
  - **dirs** (array) - Directories to lint
  - **ignoreDuringBuilds** (boolean) - Skip linting in builds

#### typescript
- **Type**: object
- **Properties**:
  - **tsconfigPath** (string) - tsconfig.json location
  - **ignoreDevErrors** (boolean) - Ignore dev-time errors

#### devIndicators
- **Type**: object
- **Properties**:
  - **buildActivity** (boolean) - Show build activity indicator
  - **buildActivityPosition** (string) - Indicator position

### Advanced Options

#### webpack
- **Type**: function
- **Description**: Customize webpack configuration

#### turbo
- **Type**: object
- **Description**: Turbopack-specific configuration

#### bundlePagesRouterDependencies
- **Type**: boolean
- **Description**: Bundle dependencies for Pages Router

#### onDemandEntries
- **Type**: object
- **Description**: Control on-demand entry behavior

#### useLightningcss
- **Type**: boolean
- **Description**: Use Lightning CSS for compilation
```

--------------------------------

### Generate Multiple Sitemaps in Next.js

Source: https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps

Demonstrates how to use generateSitemaps to create multiple sitemaps by returning an array of objects with unique IDs. The example shows fetching products in batches of 50,000 URLs per sitemap, respecting Google's sitemap limits. Uses async functions to generate consistent URLs between development and production environments.

```TypeScript
import { BASE_URL } from'@/app/lib/constants'
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id:0 }, { id:1 }, { id:2 }, { id:3 }]
}
export default async function sitemap({
  id,
}: {
  id:number
}):Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start= id *50000
  const end= start +50000
  const products=await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )
  return products.map((product) => ({
    url:`${BASE_URL}/product/${product.id}`,
    lastModified:product.date,
  }))
}
```

--------------------------------

### Configure Font with Adjusted Fallback for Layout Shift in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/font

Configure font fallback adjustment to reduce Cumulative Layout Shift. This example demonstrates disabling automatic fallback for Google fonts or specifying a fallback font like Times New Roman for local fonts.

```javascript
// For next/font/google
const inter = Inter({
  adjustFontFallback: false,
  subsets: ['latin'],
})

// For next/font/local
const customFont = localFont({
  adjustFontFallback: 'Times New Roman',
})
```

--------------------------------

### Implement Conditional Rendering with Parallel Routes (Next.js)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes

This example showcases how Parallel Routes can be used for conditional rendering based on specific criteria, such as a user's role. The `app/dashboard/layout.tsx` checks a user's role and renders either an 'admin' or 'user' specific component, providing flexible UI based on state.

```TypeScript
import { checkUserRole } from'@/shared/auth'
exportdefaultfunctionLayout({
  user,
  admin,
}: {
  user:React.ReactNode
  admin:React.ReactNode
}) {
constrole=checkUserRole()
return role ==='admin'? admin : user
}
```

--------------------------------

### Akamai Image Loader Configuration

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/images

Implement a custom image loader for Akamai's Image and Video Manager service. The loader constructs a URL with the imwidth parameter for image optimization.

```javascript
// Docs: https://techdocs.akamai.com/ivm/reference/test-images-on-demand
export default function akamaiLoader({ src, width, quality }) {
  return `https://example.com/${src}?imwidth=${width}`
}
```

--------------------------------

### Configure Tailwind Typography Plugin for MDX Layout in Next.js

Source: https://nextjs.org/docs/app/guides/mdx

Demonstrates how to integrate the `@tailwindcss/typography` plugin with a Next.js MDX layout component. This allows applying Tailwind's `prose` classes to styled markdown content, ensuring consistent typography across the application. The example defines a shared layout that wraps MDX children and applies custom heading styles.

```tsx
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
      {children}
    </div>
  )
}
```

--------------------------------

### Define metadata for Next.js global-not-found.tsx

Source: https://nextjs.org/docs/app/api-reference/file-conventions/not-found

This example illustrates how to define a static `metadata` object in `app/global-not-found.tsx` to customize the HTML head for a global 404 page. It sets the page title and description, with Next.js automatically injecting a `noindex` meta tag for SEO to prevent indexing of 404 pages.

```typescript
importtype { Metadata } from'next'
exportconstmetadata:Metadata= {
  title:'Not Found',
  description:'The page you are looking for does not exist.',
}
exportdefaultfunctionGlobalNotFound() {
return (
    <htmllang="en">
      <body>
        <div>
          <h1>Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </body>
    </html>
  )
}
```

--------------------------------

### Sitemap.xml File

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata

API Reference for sitemap.xml metadata file. This file provides search engines with a structured list of URLs on your application for better crawling and indexing.

```APIDOC
## Metadata File Convention: sitemap.xml

### Description
The sitemap.xml file contains a list of URLs on your application for search engine discovery and crawling.

### File Convention
- **sitemap.xml** - Static sitemap file (static)
- **sitemap.js|ts** - Dynamic sitemap generation (code-based)

### File Location
```
app/sitemap.xml
app/sitemap.js|ts
```

### Behavior
- Automatically served at /sitemap.xml
- Cached by default as special route handler
- Can be static or dynamically generated
- Supports both file formats
- Aids search engine indexing and discovery
```

--------------------------------

### Use Next.js Server Action in Client Component with TypeScript

Source: https://nextjs.org/docs/app/guides/single-page-applications

This example shows how to import and invoke a server action within a Next.js client component. The `'use client'` directive marks the component, which then directly calls the server action without needing a separate API endpoint. This simplifies server-side data interaction from the client.

```typescript
'use client'\nimport { create } from'./actions'\nexport function Button() {\nreturn <button onClick={() => create()}>Create</button>\n}
```

--------------------------------

### Fastly Image Loader Configuration

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/images

Implement a custom image loader for Fastly's image optimization service. The loader constructs a URL with auto webp format, width, and quality parameters.

```javascript
// Docs: https://developer.fastly.com/reference/io/
export default function fastlyLoader({ src, width, quality }) {
  const url = new URL(`https://example.com${src}`)
  url.searchParams.set('auto', 'webp')
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href
}
```

--------------------------------

### Environment Variable Dynamic Lookups That Will NOT Be Inlined

Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

Illustrates examples of dynamic environment variable lookups that Next.js will not inline at build time. These include accessing variables through variable names or accessing process.env as an object. Dynamic lookups prevent static inlining since the variable name is not known at build time.

```javascript
// This will NOT be inlined, because it uses a variable
const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
setupAnalyticsService(process.env[varName])
// This will NOT be inlined, because it uses a variable
const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)
```

--------------------------------

### Load External Libraries On-Demand in Next.js

Source: https://nextjs.org/docs/app/guides/lazy-loading

Load external libraries dynamically using the import() function only when needed. This example demonstrates loading fuse.js for fuzzy search functionality after user input. The library is fetched and instantiated only after the user types in the search field, reducing initial bundle size.

```javascript
'use client'
import { useState } from 'react'
const names = ['Tim', 'Joe', 'Bel', 'Lee']
export default function Page() {
  const [results, setResults] = useState()
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)
          setResults(fuse.search(value))
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```

--------------------------------

### Metadata Files General Configuration

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata

General guidelines and best practices for using metadata files in Next.js applications, including caching behavior and middleware configuration.

```APIDOC
## Metadata Files Configuration

### Overview
File-based metadata in Next.js can be defined using static files or dynamic variants that use code to generate files.

### Static vs Dynamic Files
#### Static Metadata Files
- Examples: `opengraph-image.jpg`, `favicon.ico`, `robots.txt`
- Defined as static files in route segments
- Automatically served with proper caching

#### Dynamic Metadata Files
- Examples: `opengraph-image.js`, `sitemap.ts`, `icon.tsx`
- Generated using code
- Automatically served with proper caching

### Caching Behavior
- All special metadata files are cached by default
- Production builds include hashes in URLs for cache busting
- Improves performance and CDN efficiency

### Middleware Configuration
When using metadata files along with `middleware.ts`:
- Configure the matcher to exclude metadata files
- Prevents unnecessary middleware execution
- Improves performance

### Automatic Updates
Next.js automatically:
- Serves files with correct content types
- Detects and includes file metadata (type, size, etc.)
- Updates relevant head elements
- Handles asset URL generation
```

--------------------------------

### Access Locale Parameter in Next.js Dynamic Route Page Component

Source: https://nextjs.org/docs/app/guides/internationalization

Page component that receives the dynamic locale parameter from the URL path segment [lang]. Extracts the lang parameter from the route params and uses it to determine the current locale for rendering locale-specific content.

```typescript
// You now have access to the current locale
// e.g. /en-US/products -> `lang` is "en-US"
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return...
}
```

--------------------------------

### Using unstable_noStore to Prevent Static Rendering in Next.js Server Components

Source: https://nextjs.org/docs/app/api-reference/functions/unstable_noStore

This example illustrates how to use `unstable_noStore` within a Next.js Server Component to prevent static rendering and caching. This is particularly useful when `fetch` options like `cache: 'no-store'` are not applicable or desired. Note that this API is considered legacy as of Next.js v15 and `connection` is recommended instead.

```javascript
import { unstable_noStore as noStore } from'next/cache';
exportdefaultasyncfunctionServerComponent() {
noStore();
constresult=awaitdb.query(...);
...
}
```

--------------------------------

### Video Sitemaps

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

Create video sitemaps by adding a videos property to sitemap entries. This allows search engines to discover and index video content on your pages. The videos property accepts an array of video objects with title, thumbnail location, and description.

```APIDOC
## Sitemap with Video Content

### Description
Generate a sitemap with embedded video metadata for Google Video Search indexing.

### Implementation
**File:** `app/sitemap.ts`

### Request Parameters
#### Return Type
- **url** (string) - Required - The canonical URL of the page
- **lastModified** (string | Date) - Optional - Last modification date
- **changeFrequency** (string) - Optional - How often the page changes (always, hourly, daily, weekly, monthly, yearly, never)
- **priority** (number) - Optional - Priority relative to other pages (0.0-1.0)
- **videos** (array) - Optional - Array of video objects
  - **title** (string) - Required - Video title
  - **thumbnail_loc** (string) - Required - URL to video thumbnail image
  - **description** (string) - Required - Video description

### Implementation Example
```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: '2021-01-01',
      changeFrequency: 'weekly',
      priority: 0.5,
      videos: [
        {
          title: 'example',
          thumbnail_loc: 'https://example.com/image.jpg',
          description: 'this is the description'
        }
      ]
    }
  ]
}
```

### Output Format
The generated sitemap at `acme.com/sitemap.xml` will include video namespace and elements:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com</loc>
    <video:video>
      <video:title>example</video:title>
      <video:thumbnail_loc>https://example.com/image.jpg</video:thumbnail_loc>
      <video:description>this is the description</video:description>
    </video:video>
    <lastmod>2021-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```
```

--------------------------------

### Schedule Post-Render Logging in Next.js Layout using `after`

Source: https://nextjs.org/docs/app/api-reference/functions/after

This example shows how to integrate the `after` function from `next/server` into a Next.js `app/layout.tsx`. It schedules a custom logging function to execute after the layout has been rendered and the response sent to the user, ensuring that logging does not block the initial page load. This pattern is suitable for non-critical side effects.

```TypeScript
import { after } from'next/server'
// Custom logging function
import { log } from'@/app/utils'
exportdefaultfunctionLayout({ children }: { children:React.ReactNode }) {
after(() => {
// Execute after the layout is rendered and sent to the user
log()
  })
return <>{children}</>
}
```

--------------------------------

### Load Google Font with Specific Weight in Next.js

Source: https://nextjs.org/docs/app/getting-started/fonts

This example illustrates how to configure a non-variable Google Font, `Roboto`, in a Next.js root layout by specifying its `weight`. This is necessary when using fonts that don't support variable weights, ensuring the correct font style is loaded and applied across the application.

```TypeScript
import { Roboto } from'next/font/google'

const roboto = Roboto({
  weight:'400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children:React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### HTTP Methods Implementation in Next.js Route Handlers

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

Defines multiple HTTP method handlers (GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS) within a single route file. If OPTIONS is not explicitly defined, Next.js automatically implements it and sets the appropriate Allow header based on other defined methods.

```typescript
export async function GET(request: Request) {}
export async function HEAD(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function DELETE(request: Request) {}
export async function PATCH(request: Request) {}
export async function OPTIONS(request: Request) {}
```

--------------------------------

### Create a Custom Next.js RSS Feed Route Handler

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

This Route Handler demonstrates how to build a custom `rss.xml` endpoint within Next.js. It fetches data from a specified RSS endpoint, dynamically generates an XML RSS feed string, and returns it with the correct `application/xml` content type header. This example highlights the flexibility of serving various non-UI content types.

```TypeScript
export async function GET(request: Request) {
  const rssResponse = await fetch(/* rss endpoint */);
  const rssData = await rssResponse.json();
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n<channel>\n <title>${rssData.title}<\/title>\n <description>${rssData.description}<\/description>\n <link>${rssData.link}<\/link>\n <copyright>${rssData.copyright}<\/copyright>\n${rssData.items.map((item) => {\nreturn `<item>\n    <title>${item.title}<\/title>\n    <description>${item.description}<\/description>\n    <link>${item.link}<\/link>\n    <pubDate>${item.publishDate}<\/pubDate>\n    <guid isPermaLink="false">${item.guid}<\/guid>\n <\/item>`;\n})}\n<\/channel>\n<\/rss>`;
  const headers = new Headers({ 'content-type': 'application/xml' });
  return new Response(rssFeed, { headers });
}
```

```JavaScript
export async function GET(request: Request) {
  const rssResponse = await fetch(/* rss endpoint */);
  const rssData = await rssResponse.json();
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n<channel>\n <title>${rssData.title}<\/title>\n <description>${rssData.description}<\/description>\n <link>${rssData.link}<\/link>\n <copyright>${rssData.copyright}<\/copyright>\n${rssData.items.map((item) => {\nreturn `<item>\n    <title>${item.title}<\/title>\n    <description>${item.description}<\/description>\n    <link>${item.link}<\/link>\n    <pubDate>${item.publishDate}<\/pubDate>\n    <guid isPermaLink="false">${item.guid}<\/guid>\n <\/item>`;\n})}\n<\/channel>\n<\/rss>`;
  const headers = new Headers({ 'content-type': 'application/xml' });
  return new Response(rssFeed, { headers });
}
```

--------------------------------

### Apply `use cache` Directive to Files, Components, and Functions

Source: https://nextjs.org/docs/app/api-reference/directives/use-cache

The `use cache` directive can be applied at different levels: at the top of a file to cache all its exports, at the top of a React component function, or within a regular function to cache its return value. This example demonstrates its usage in all three contexts.

```JavaScript
// File level
'use cache'
export default async function Page() {
// ...
}

// Component level
export async function MyComponent() {
'use cache'
return <></>
}

// Function level
export async function getData() {
'use cache'
const data = await fetch('/api/data')
return data
}
```

--------------------------------

### Next.js Framework Overview

Source: https://nextjs.org/docs/app/guides/progressive-web-apps

Next.js is a production-ready React framework providing built-in routing, server-side rendering, static site generation, and API routes. It supports both the traditional Pages Router and the modern App Router architecture.

```APIDOC
# Next.js Framework Documentation

## Overview
Next.js provides a comprehensive framework for building full-stack web applications with React.

## Key Features
- **Routing**: File-system based routing with dynamic routes support
- **Rendering**: Multiple rendering strategies (SSR, SSG, CSR, ISR)
- **Data Fetching**: Multiple data fetching methods for different use cases
- **Components**: Optimized built-in components (Image, Link, Script, Font, Form, Head)
- **Configuration**: Flexible configuration through next.config.js
- **API Routes**: Built-in backend API capabilities
- **Optimization**: Automatic image, font, and code optimization

## Available Routers
- **App Router**: Modern router supporting Server Components, async components, and advanced features
- **Pages Router**: Traditional file-system based routing

## Current Version
- **Latest**: 15.5.0
```

--------------------------------

### Configure CORS Headers in Next.js Middleware

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

Set up CORS headers to handle both simple and preflighted cross-origin requests. Validates request origin against an allowed list and sets appropriate response headers for GET, POST, PUT, DELETE methods. Applies middleware to all API routes matching '/api/:path*' pattern.

```typescript
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://acme.com', 'https://my-app.org']
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
  
  const isPreflight = request.method === 'OPTIONS'
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
  
  const response = NextResponse.next()
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

--------------------------------

### Metadata and Open Graph Configuration

Source: https://nextjs.org/docs/app/api-reference/functions/use-pathname

Configure page metadata and Open Graph tags for SEO and social media sharing. Metadata can be defined statically or generated dynamically based on page parameters.

```APIDOC
## Metadata and OG Images

### Description
Metadata configuration controls SEO tags, social media previews, and browser display. Use static export or generateMetadata function for dynamic configuration.

### Static Metadata (App Router)
```javascript
// app/page.js
export const metadata = {
  title: 'Home',
  description: 'Welcome to my website',
  keywords: ['next.js', 'react'],
  openGraph: {
    title: 'Home',
    description: 'Welcome to my website',
    url: 'https://example.com',
    type: 'website',
    images: [{
      url: 'https://example.com/og-image.jpg',
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home',
    description: 'Welcome to my website',
    images: ['https://example.com/twitter-image.jpg']
  }
}

export default function Home() {
  return <div>Home Page</div>
}
```

### Dynamic Metadata (App Router)
```javascript
// app/blog/[id]/page.js
export async function generateMetadata({ params }) {
  const post = await fetch(`/api/posts/${params.id}`)
    .then(res => res.json())
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [{
        url: post.image,
        width: 1200,
        height: 630
      }],
      publishedTime: post.publishedAt,
      authors: [post.author]
    }
  }
}

export default function BlogPost({ params }) {
  return <article>{/* content */}</article>
}
```

### Metadata Fields
- **title** (String) - Page title
- **description** (String) - Meta description
- **keywords** (Array) - SEO keywords
- **viewport** (String) - Viewport settings
- **robots** (String) - Robot directives
- **canonical** (String) - Canonical URL
- **openGraph** (Object) - Open Graph protocol tags
- **twitter** (Object) - Twitter card tags
- **icons** (Array) - Favicon URLs

### Open Graph Configuration
```javascript
openGraph: {
  type: 'website' | 'article' | 'profile',
  title: 'Page Title',
  description: 'Page description',
  url: 'https://example.com/page',
  siteName: 'My Website',
  images: [
    {
      url: 'https://example.com/image.jpg',
      width: 1200,
      height: 630,
      alt: 'Image description'
    }
  ],
  locale: 'en_US',
  type: 'article',
  publishedTime: '2024-01-01T00:00:00Z',
  authors: ['Author Name']
}
```
```

--------------------------------

### Link to Dynamic Route Segments in Next.js

Source: https://nextjs.org/docs/app/api-reference/components/link

This example shows how to construct links to dynamic route segments within a Next.js application using the `<Link>` component. It uses template literals and array mapping to generate a list of links, where each `href` dynamically points to a specific post or item based on its slug.

```tsx
import Link from'next/link'

interface Post {
  id: number
  title: string
  slug: string
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

--------------------------------

### Scroll to Specific ID using Next.js Link Component

Source: https://nextjs.org/docs/app/api-reference/components/link

This example illustrates how to use the Next.js `<Link>` component to navigate to a specific ID on a page. By including a hash link (e.g., `#settings`) in the `href` prop, the browser will automatically scroll to the corresponding HTML element with that ID after navigation.

```jsx
<Link href="/dashboard#settings">Settings</Link>
// Output
<a href="/dashboard#settings">Settings</a>
```

--------------------------------

### API Reference: Functions

Source: https://nextjs.org/docs/app/guides/migrating/app-router-migration

Provides information about the functions available in Next.js, which are used for various tasks like data fetching and routing.

```APIDOC
## Functions

### Description
This section provides information about the functions available in Next.js.

### Functions
- getInitialProps
- getServerSideProps
- getStaticPaths
- getStaticProps
- NextRequest
- NextResponse
- useAmp
- useReportWebVitals
- useRouter
- userAgent
```

--------------------------------

### Pass Next.js Server Function as a Prop to a Client Component (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/getting-started/updating-data

This example illustrates passing a Server Function as a prop to a Client Component. The `updateItemAction` Server Function is received by the `ClientComponent` as a prop, which then uses it directly in the `action` attribute of an HTML form. This pattern enables server-side actions to be dynamically provided to client-side interactive elements.

```typescript
// Parent component (implicit usage)
// <ClientComponent updateItemAction={updateItem} />

// app/client-component.tsx
'use client'
export default function ClientComponent({
  updateItemAction,
}: {
  updateItemAction: (formData:FormData) => void
}) {
  return <form action={updateItemAction}>{/* ... */}</form>
}
```

--------------------------------

### Integrate useFormStatus Enabled Button into a Form (React Client Component)

Source: https://nextjs.org/docs/app/guides/forms

This `Signup` client component shows how to integrate the previously defined `SubmitButton` component, which internally uses `useFormStatus`. This approach simplifies form rendering by decoupling the pending state logic from the main form component.

```TypeScript
import { SubmitButton } from'./button'
import { createUser } from'@/app/actions'
exportfunctionSignup() {
return (
    <formaction={createUser}>
      {/* Other form elements */}
      <SubmitButton />
    </form>
  )
}
```

--------------------------------

### Router Navigation Tracking with onRouterTransitionStart

Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client

Exports an onRouterTransitionStart function to receive notifications when navigation begins. This function receives the target URL and navigation type ('push', 'replace', or 'traverse') as parameters, enabling tracking of user navigation events and performance marks.

```TypeScript
performance.mark('app-init')
export function onRouterTransitionStart(
  url: string,
  navigationType: 'push' | 'replace' | 'traverse'
) {
  console.log(`Navigation started: ${navigationType} to ${url}`)
  performance.mark(`nav-start-${Date.now()}`)
}
```

--------------------------------

### Extend ESLint config with Prettier for Next.js (ESLint)

Source: https://nextjs.org/docs/app/api-reference/config/eslint

This configuration snippet shows how to integrate `eslint-config-prettier` into your ESLint setup by adding `prettier` to the `extends` array. This ensures that ESLint's formatting rules are disabled where they would conflict with Prettier, allowing Prettier to handle all code formatting.

```javascript
import { FlatCompat } from'@eslint/eslintrc'
constcompat=newFlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
  baseDirectory:import.meta.dirname,
})
consteslintConfig= [
...compat.config({
    extends: ['next','prettier'],
  }),
]
exportdefault eslintConfig
```

--------------------------------

### Define Next.js Template Component (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/file-conventions/template

This code snippet demonstrates how to define a `template.js` file in a Next.js application. By exporting a default React component that accepts a `children` prop, this establishes the basic structure for wrapping other components or pages. This setup enables template-specific behaviors like state resetting on navigation.

```typescript
exportdefaultfunctionTemplate({ children }: { children:React.ReactNode }) {
return <div>{children}</div>
}
```

--------------------------------

### Environment Variables & Configuration

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactStrictMode

Manage environment variables for different environments (development, preview, production). Configure Next.js behavior using next.config.js with options for performance, security, and feature toggles.

```APIDOC
## Environment Variables & Configuration

### Description
Manage sensitive data and configuration across development, preview, and production environments. Configure Next.js build and runtime behavior.

### Environment Variables Setup

#### .env.local
```bash
# Local environment variables (gitignored)
DATABASE_URL=postgresql://user:password@localhost/db
API_SECRET_KEY=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### .env.development.local
```bash
# Development-only variables
DEBUG=true
LOGGING_LEVEL=debug
```

#### .env.production.local
```bash
# Production-only variables
DATABASE_URL=postgresql://prod-user:prod-pass@prod-host/prod-db
API_SECRET_KEY=production-secret-key
```

### Accessing Environment Variables

#### Server-side
```typescript
// app/api/users/route.ts
export async function GET() {
  const dbUrl = process.env.DATABASE_URL
  const apiKey = process.env.API_SECRET_KEY
  
  // Use in server-side code
  const users = await fetchUsers(dbUrl, apiKey)
  
  return Response.json({ users })
}
```

#### Client-side (Public Variables Only)
```typescript
// Components can only access NEXT_PUBLIC_ prefixed variables
'use client'

export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  return <div>API URL: {apiUrl}</div>
}
```

### next.config.js Configuration

#### Basic Configuration
```javascript
module.exports = {
  // Build output directory
  distDir: '.next',
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Generate ETag for cache validation
  generateEtags: true,
  
  // Trailing slash in URLs
  trailingSlash: false,
  
  // Base path for deployment
  basePath: '',
  
  // Asset prefix for CDN
  assetPrefix: '',
  
  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Generate build ID
  generateBuildId: async () => 'build-id-' + Date.now()
}
```

#### Image Configuration
```javascript
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    sizes: [640, 750, 828, 1080, 1200, 1920],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif']
  }
}
```

#### Headers & Redirects
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-API-Version', value: '1' },
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      }
    ]
  },
  
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true  // 301 redirect
      }
    ]
  },
  
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*'
        }
      ]
    }
  }
}
```

#### Webpack Configuration
```javascript
module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ['@mdx-js/loader']
    })
    
    return config
  }
}
```

#### TypeScript Configuration
```javascript
module.exports = {
  typescript: {
    // Fail build on type errors
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false
  }
}
```

### Environment Variable Best Practices
- Keep sensitive keys in .env.local (gitignored)
- Use NEXT_PUBLIC_ prefix only for non-sensitive data
- Rotate secrets regularly
- Use environment-specific files
- Never commit .env files to version control
- Document required environment variables in .env.example
```

--------------------------------

### Error When Passing Tainted Value to Client Component

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/taint

Shows an example where accidentally passing a tainted value to a Client Component throws an error. Even reassigning the tainted value to a new variable maintains the taint, preventing the sensitive data from reaching client-side code.

```JavaScript
export async function Dashboard() {
  const systemConfig = await getSystemConfig()
  // Someone makes a mistake in a PR
  const version = systemConfig.SERVICE_API_KEY
  return <ClientDashboard version={version} />
}
```

--------------------------------

### Transform `withAmp` HOC to Next.js 9 page configuration

Source: https://nextjs.org/docs/app/guides/upgrading/codemods

This codemod migrates the deprecated `withAmp` Higher-Order Component (HOC) to the new Next.js 9 page configuration format for AMP pages. It replaces the HOC wrapper with an `export const config = { amp: true }` declaration within the page file, streamlining AMP page setup.

```Shell
npx@next/codemodwithamp-to-config
```

```JavaScript
// Before
import { withAmp } from 'next/amp'
function Home() {
  return <h1>My AMP Page</h1>
}
export default withAmp(Home)
```

```JavaScript
// After
export default function Home() {
  return <h1>My AMP Page</h1>
}
export const config = {
  amp: true,
}
```

--------------------------------

### Create Next.js Catch-All Page Component for Static Params

Source: https://nextjs.org/docs/app/guides/migrating/from-create-react-app

This snippet provides the initial content for `app/[[...slug]]/page.tsx`, defining a server component for a catch-all route. The `generateStaticParams` function is used to prerender a single static page for the empty slug, allowing the application to intercept all routes.

```TypeScript
export function generateStaticParams() {
return [{ slug: [''] }]
}
export default function Page() {
return'...'// We'll update this
}
```

```JavaScript
export function generateStaticParams() {
return [{ slug: [''] }]
}
export default function Page() {
return'...'// We'll update this
}
```

--------------------------------

### Render inline JavaScript using dangerouslySetInnerHTML with Next.js Script component

Source: https://nextjs.org/docs/app/guides/scripts

This example shows embedding inline JavaScript within the Next.js `Script` component using the `dangerouslySetInnerHTML` prop. This method is suitable for injecting raw HTML or JavaScript content. Ensure an `id` property is assigned for proper Next.js tracking and optimization.

```JavaScript
<Script
id="show-banner"
dangerouslySetInnerHTML={{
    __html:`document.getElementById('banner').classList.remove('hidden')`,
  }}
/>
```

--------------------------------

### Trigger Redirect from Next.js Client Component using Server Action

Source: https://nextjs.org/docs/app/api-reference/functions/redirect

This example shows a Next.js Client Component that triggers a server-side redirect through a Server Action. A form is used to submit data, which then invokes the `navigate` Server Action to perform the actual redirection based on user input.

```TypeScript
'use client'
import { navigate } from'./actions'
exportfunctionClientRedirect() {
return (
    <formaction={navigate}>
      <inputtype="text"name="id" />
      <button>Submit</button>
    </form>
  )
}
```

--------------------------------

### Display Next.js Draft Mode Status in Server Component UI (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/functions/draft-mode

This Server Component illustrates how to check the `isEnabled` property of `draftMode` and conditionally render text in the UI based on whether Draft Mode is active or disabled. The `draftMode` function is asynchronous and must be awaited to get the current status.

```TypeScript
import { draftMode } from'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

--------------------------------

### Return Multiple Image Metadata Objects from Next.js generateImageMetadata

Source: https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata

This example demonstrates how the `generateImageMetadata` function should return an array of objects, each representing metadata for a specific image version, such as `contentType`, `size`, and a required `id`. It also shows a default `Icon` component that consumes the `id` to render a unique image based on the generated metadata.

```TypeScript
import { ImageResponse } from'next/og'
exportfunctiongenerateImageMetadata() {
return [
    {
      contentType:'image/png',
      size: { width:48, height:48 },
      id:'small',
    },
    {
      contentType:'image/png',
      size: { width:72, height:72 },
      id:'medium',
    },
  ]
}
exportdefaultfunctionIcon({ id }: { id:string }) {
returnnewImageResponse(
    (
      <div
style={{
          width:'100%',
          height:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          fontSize:88,
          background:'#000',
          color:'#fafafa',
        }}
      >
        Icon {id}
      </div>
    )
  )
}
```

--------------------------------

### Fetch and Render Remote MDX Content in Next.js

Source: https://nextjs.org/docs/app/guides/mdx

Provides an example of dynamically fetching and rendering MDX content from a remote source (e.g., CMS, database) using the `next-mdx-remote-client` package in a Next.js server component. It includes a critical security warning about the risks of remote code execution (RCE) if MDX content is fetched from untrusted sources, as compiled MDX executes as JavaScript on the server.

```tsx
import { MDXRemote } from 'next-mdx-remote-client/rsc'

export default async function RemoteMdxPage() {
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const res = await fetch('https://...')
  const markdown = await res.text()

  return <MDXRemote source={markdown} />
}
```

--------------------------------

### Reference Static Assets from Public Folder

Source: https://nextjs.org/docs/app/getting-started/installation

Demonstrates how to reference static files stored in the public folder using the Next.js Image component. Files in the public directory are accessible via the root URL path and can be imported and displayed in page components.

```typescript
import Image from 'next/image'

export default function Page() {
  return <Image src="/profile.png" alt="Profile" width={100} height={100} />
}
```

--------------------------------

### Implement a Next.js POST Route Handler with Error Handling

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

This example showcases a `POST` Route Handler that incorporates robust error handling using a `try/catch` block for operations that may throw exceptions. It returns a 204 status for successful submissions and a 500 status with a generic error message upon failure, preventing the exposure of sensitive internal information to the client.

```TypeScript
import { submit } from '@/shared/submit';

export async function POST(request: Request) {
  try {
    await submit(request);
    return new Response(null, { status: 204 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected error';
    return new Response(message, { status: 500 });
  }
}
```

```JavaScript
import { submit } from '@/shared/submit';

export async function POST(request: Request) {
  try {
    await submit(request);
    return new Response(null, { status: 204 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected error';
    return new Response(message, { status: 500 });
  }
}
```

--------------------------------

### Create Root Layout Component in TypeScript

Source: https://nextjs.org/docs/app/getting-started/installation

Creates the required root layout file (app/layout.tsx) that wraps all pages in the application. This layout component must contain the HTML and body tags and receives children as a prop to render page content. Required for all Next.js App Router applications.

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Create Responsive Images with Static Export

Source: https://nextjs.org/docs/app/api-reference/components/image

Import static images in Next.js to automatically set width and height, then apply responsive styling with display flex and width/height auto to preserve aspect ratio. Use the sizes prop to optimize image loading for different viewport widths.

```javascript
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Responsive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        alt="Mountains"
        src={mountains}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
```

--------------------------------

### Forward Authorization Header in Next.js Server Component

Source: https://nextjs.org/docs/app/api-reference/functions/headers

This example illustrates how to access the 'authorization' header using the Next.js `headers` function within a Server Component. It demonstrates forwarding this header in a subsequent `fetch` request to an external API and processing the response to display user data. The `headers` function is asynchronous.

```JavaScript
import { headers } from'next/headers'
export default async function Page() {
  const authorization = (await headers()).get('authorization')
  const res = await fetch('...', {
    headers: { authorization } // Forward the authorization header
  })
  const user = await res.json()
  return <h1>{user.name}</h1>
}
```

--------------------------------

### Access Next.js search parameters on a results page

Source: https://nextjs.org/docs/app/api-reference/components/form

This example shows how to retrieve search query parameters from the URL within a Next.js page component. The `searchParams` prop, provided by Next.js, is used to access the submitted form data for fetching relevant information on the results page.

```TypeScript
import { getSearchResults } from'@/shared/search'

exportdefaultasyncfunctionSearchPage({
  searchParams,
}: {
  searchParams:Promise<{ [key:string]:string|string[] |undefined }>
}) {
  constresults=awaitgetSearchResults((await searchParams).query)
  return <div>...</div>
}
```

--------------------------------

### Control Next.js Rewrite Order with beforeFiles, afterFiles, and fallback

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites

This example illustrates advanced rewrite control in Next.js by using `beforeFiles`, `afterFiles`, and `fallback` arrays within the `rewrites` function. This allows for fine-grained control over when rewrites are applied in the request lifecycle relative to headers, redirects, static files, and dynamic routes. Conditional rewrites can be defined using the `has` property.

```javascript
module.exports= {
  asyncrewrites() {
    return {
      beforeFiles: [
// These rewrites are checked after headers/redirects
// and before all files including _next/public files which
// allows overriding page files
        {
          source:'/some-page',
          destination:'/somewhere-else',
          has: [{ type:'query', key:'overrideMe' }],
        },
      ],
      afterFiles: [
// These rewrites are checked after pages/public files
// are checked but before dynamic routes
        {
          source:'/non-existent',
          destination:'/somewhere-else',
        },
      ],
      fallback: [
// These rewrites are checked after both pages/public files
// and dynamic routes are checked
        {
          source:'/:path*',
          destination:`https://my-old-site.com/:path*`,
        },
      ],
    }
  },
}
```

--------------------------------

### Pass Non-Serializable Children to Cached Components

Source: https://nextjs.org/docs/app/api-reference/directives/use-cache

This example shows how a `use cache`-enabled component can accept non-serializable arguments, such as `children` props. These non-serializable values are passed through as references and are not inspected or included in the cache key, allowing uncached content to be nested within a cached component.

```TypeScript
function CachedComponent({ children }: { children: ReactNode }) {
'use cache'
return <div>{children}</div>
}
```

--------------------------------

### Define Next.js Zone with assetPrefix

Source: https://nextjs.org/docs/app/guides/multi-zones

This `next.config.js` configuration defines a Next.js zone by setting an `assetPrefix`. This ensures that JavaScript and CSS assets from this specific zone are prefixed (e.g., `/blog-static/_next/`), preventing conflicts with assets from other zones deployed on the same domain. This is the standard way to configure a zone's asset handling.

```javascript
/** @type{import('next').NextConfig} */
constnextConfig= {
  assetPrefix:'/blog-static',
}
```

--------------------------------

### Route Handler for Redirect Lookup and Validation

Source: https://nextjs.org/docs/app/guides/redirecting

Implements a GET Route Handler that retrieves the actual redirect entry from a JSON file based on the pathname parameter. It validates the request, handles Bloom filter false positives, and returns the redirect entry or an error response, with emphasis on validating requests to prevent malicious access.

```typescript
import { NextRequest, NextResponse } from 'next/server'
import redirects from '@/app/redirects/redirects.json'

type RedirectEntry = {
  destination: string
  permanent: boolean
}

export function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname')
  
  if (!pathname) {
    return new Response('Bad Request', { status: 400 })
  }
  
  // Get the redirect entry from the redirects.json file
  const redirect = (redirects as Record<string, RedirectEntry>)[pathname]
  
  // Account for bloom filter false positives
  if (!redirect) {
    return new Response('No redirect', { status: 400 })
  }
  
  // Return the redirect entry
  return NextResponse.json(redirect)
}
```

--------------------------------

### Load Remote Images with Next.js Image Component

Source: https://nextjs.org/docs/app/api-reference/components/image

This example shows how to use a remote image URL directly as the `src` property for the `next/image` component. For remote images, `width` and `height` attributes must be provided manually as Next.js cannot access remote files during the build process to infer dimensions.

```jsx
import Image from'next/image'
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

--------------------------------

### Run Jest tests with npm package managers

Source: https://nextjs.org/docs/app/guides/testing/jest

Terminal commands to execute Jest tests. Supports npm, yarn, and pnpm package managers. Tests can be run once or in watch mode for continuous testing during development.

```bash
npm run test
# or
yarn test
# or
pnpm test
```

--------------------------------

### Revalidate Cache Tag in Next.js Server Action (TypeScript)

Source: https://nextjs.org/docs/app/api-reference/functions/revalidateTag

This Server Action example illustrates how to use `revalidateTag` to invalidate cached data associated with the 'posts' tag after an asynchronous operation like `addPost()`. This ensures that subsequent requests for pages relying on 'posts' data will fetch fresh content.

```typescript
'use server'
import { revalidateTag } from'next/cache'
exportdefaultasyncfunctionsubmit() {
awaitaddPost()
revalidateTag('posts')
}
```

--------------------------------

### Set Turbopack Root Directory in `next.config.js`

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack

This configuration snippet demonstrates how to manually specify the `root` directory for Turbopack using `next.config.js`. This is useful for projects with non-standard structures, such as monorepos, or when Next.js cannot automatically detect the project root from lock files. The `path.join(__dirname, '..')` example sets the root to the parent directory of the config file.

```JavaScript
const path = require('path')
module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
}
```

--------------------------------

### Configure Vitest for Next.js with React Plugin

Source: https://nextjs.org/docs/app/guides/testing/vitest

Create a `vitest.config.mts` (or `.js`) file in the project root to configure Vitest. This configuration imports necessary plugins like `@vitejs/plugin-react` for React support and sets the test environment to `jsdom`, crucial for browser-like testing.

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
  },
})
```

--------------------------------

### Enable Next.js Core Web Vitals ESLint rule set (ESLint)

Source: https://nextjs.org/docs/app/api-reference/config/eslint

This ESLint configuration snippet shows how to enable the `next/core-web-vitals` rule set, typically activated when the 'strict' option is chosen during initial `next lint` setup. This extends the linting to error on issues that negatively impact Core Web Vitals, promoting performance best practices.

```javascript
import { FlatCompat } from'@eslint/eslintrc'
constcompat=newFlatCompat({
// import.meta.dirname is available after Node.js v20.11.0
  baseDirectory:import.meta.dirname,
})
consteslintConfig= [
...compat.config({
    extends: ['next/core-web-vitals'],
  }),
]
exportdefault eslintConfig
```

--------------------------------

### Access Runtime Environment Variables in Next.js Server Components

Source: https://nextjs.org/docs/app/guides/environment-variables

This example shows how to safely read non-`NEXT_PUBLIC_` environment variables on the server during dynamic rendering in a Next.js server component. Accessing Dynamic APIs like `connection()` opts the component into dynamic rendering, allowing runtime evaluation of environment variables.

```typescript
import { connection } from'next/server'
exportdefaultasyncfunctionComponent() {
awaitconnection()
// cookies, headers, and other Dynamic APIs
// will also opt into dynamic rendering, meaning
// this env variable is evaluated at runtime
constvalue=process.env.MY_VALUE
// ...
}
```

--------------------------------

### Revalidate Cached Data in Next.js App Router

Source: https://nextjs.org/docs/app/api-reference/file-conventions/route

This example demonstrates how to configure data revalidation for a Next.js App Router route handler. By exporting a `revalidate` constant, it instructs Next.js to revalidate cached data for this route every 60 seconds, fetching fresh data from an API.

```TypeScript
exportconstrevalidate=60
exportasyncfunctionGET() {
constdata=awaitfetch('https://api.vercel.app/blog')
constposts=awaitdata.json()
returnResponse.json(posts)
}
```

--------------------------------

### Display Static Image from public Folder - Next.js React

Source: https://nextjs.org/docs/app/api-reference/file-conventions/public-folder

Demonstrates how to import and display static images from the public folder using Next.js Image component. The example shows creating reusable Avatar components that reference image files stored in public/avatars directory using dynamic paths.

```jsx
import Image from 'next/image'

export function Avatar({ id, alt }) {
  return <Image src={`/avatars/${id}.png`} alt={alt} width="64" height="64" />
}

export function AvatarOfMe() {
  return <Avatar id="me" alt="A portrait of me" />
}
```

--------------------------------

### Create Video Sitemap with Next.js MetadataRoute

Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

This snippet demonstrates how to generate a video sitemap using Next.js's `MetadataRoute.Sitemap` interface. It shows how to define video-specific properties such as title, thumbnail location, and description within the sitemap entry to comply with Google Developer Docs for video sitemaps. The output is a standard XML sitemap with video extensions.

```TypeScript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: '2021-01-01',
      changeFrequency: 'weekly',
      priority: 0.5,
      videos: [
        {
          title: 'example',
          thumbnail_loc: 'https://example.com/image.jpg',
          description: 'this is the description'
        }
      ]
    }
  ]
}
```

```XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>https://example.com</loc>
    <video:video>
      <video:title>example</video:title>
      <video:thumbnail_loc>https://example.com/image.jpg</video:thumbnail_loc>
      <video:description>this is the description</video:description>
    </video:video>
    <lastmod>2021-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

--------------------------------

### Disable Prefetch for Specific Links in Next.js

Source: https://nextjs.org/docs/app/guides/prefetching

Custom link component wrapper that disables prefetching by setting the prefetch prop to false. Useful for fine-grained control over resource consumption, particularly for links that are unlikely to be visited (e.g., footer links). Maintains consistent Link component usage throughout the application.

```TypeScript
'use client'
import Link, { LinkProps } from 'next/link'
function NoPrefetchLink({
  prefetch,
  ...rest
}: LinkProps & { children: React.ReactNode }) {
  return <Link {...rest} prefetch={false} />
}
```

--------------------------------

### Using Google Fonts with Next.js `next/font` in app/layout.tsx

Source: https://nextjs.org/docs/app/api-reference/components/font

This example demonstrates how to import and configure a Google Font (Inter) using the `next/font/google` module within a Next.js `app/layout.tsx` file. It shows how to define font subsets and display options, then apply the font's class name to the `<html>` tag for automatic self-hosting and performance optimization.

```typescript
import { Inter } from'next/font/google'
// If loading a variable font, you don't need to specify the font weight
constinter=Inter({
  subsets: ['latin'],
  display:'swap',
})
exportdefaultfunctionRootLayout({
  children,
}: {
  children:React.ReactNode
}) {
return (
    <htmllang="en"className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

--------------------------------

### Next.js Turbopack

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/env

Information about Turbopack, the Next.js optimized bundler for faster development and builds.

```APIDOC
## Next.js Turbopack

### Description
This section introduces Turbopack, the next-generation bundler optimized for Next.js, designed to provide significantly faster development server startup and update times.

### Details
Turbopack aims to replace webpack for an even faster development experience and optimized production builds.
```

--------------------------------

### Upgrade Next.js Using Codemod

Source: https://nextjs.org/docs/app/getting-started/upgrading

Automatically upgrade your Next.js project to the latest version using the official upgrade codemod. This command runs the codemods that handle necessary code transformations and dependency updates for the new version.

```bash
npx @next/codemod@latest upgrade latest
```

--------------------------------

### Configure Next.js Middleware to Control Trailing Slash Redirects

Source: https://nextjs.org/docs/app/api-reference/file-conventions/middleware

This snippet demonstrates how to disable Next.js's default trailing slash redirect behavior using the `skipTrailingSlashRedirect` flag in `next.config.js`. It then provides a `middleware.js` example to implement custom trailing slash logic, allowing selective application based on path prefixes.

```javascript
module.exports= {
  skipTrailingSlashRedirect:true,
}
```

```javascript
constlegacyPrefixes= ['/docs','/blog']
exportdefaultasyncfunctionmiddleware(req) {
const { pathname } =req.nextUrl
if (legacyPrefixes.some((prefix) =>pathname.startsWith(prefix))) {
returnNextResponse.next()
  }
// apply trailing slash handling
if (
!pathname.endsWith('/') &&
!pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
returnNextResponse.redirect(
newURL(`${req.nextUrl.pathname}/`,req.nextUrl)
    )
  }
}
```

--------------------------------

### Components Reference

Source: https://nextjs.org/docs/app/guides/backend-for-frontend

Next.js provides built-in components for common use cases including optimized images, fonts, links, forms, and scripts with built-in performance enhancements.

```APIDOC
## Next.js Built-in Components

### Image Component

#### Description
Optimized image component with automatic lazy loading, responsive sizing, and modern format support.

#### Usage (App Router)
```jsx
import Image from 'next/image'

export default function MyImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={500}
      height={300}
      priority={false}
      fill={false}
    />
  )
}
```

### Link Component

#### Description
Client-side navigation component with automatic prefetching and scroll behavior.

#### Usage (App Router)
```jsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <Link href="/about" prefetch={true}>
      About
    </Link>
  )
}
```

### Font Component

#### Description
Optimized font loading with automatic font subsetting and performance optimization.

#### Usage (App Router)
```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Script Component

#### Description
Optimized script loading with strategy control (beforeInteractive, afterInteractive, lazyOnload).

#### Usage
```jsx
import Script from 'next/script'

export default function MyPage() {
  return (
    <>
      <Script
        src="/analytics.js"
        strategy="afterInteractive"
        onLoad={() => console.log('loaded')}
      />
    </>
  )
}
```

### Form Component

#### Description
Form component with built-in handling for form submissions and validation.

#### Usage (App Router)
```jsx
'use client'

import { Form } from 'next/form'

export default function MyForm() {
  return (
    <Form action="/api/submit">
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </Form>
  )
}
```
```

--------------------------------

### Define Custom Metadata Tags in Next.js with `other`

Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

This example demonstrates using the `other` option to add custom or non-standard metadata tags in Next.js within a `layout.js` or `page.js` file. It allows defining arbitrary key-value pairs (or arrays of values) which are rendered as `<meta name='key' content='value' />` tags, useful for site-specific or newly released metadata.

```javascript
export const metadata = {
  other: {
    custom:'meta'
  }
}
```

```javascript
export const metadata = {
  other: {
    custom: ['meta1','meta2']
  }
}
```

--------------------------------

### Nest a Layout for a Specific Route in Next.js

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

Next.js automatically nests layouts based on their folder hierarchy, with parent layouts wrapping child layouts via their `children` prop. To apply a specific layout to a particular route segment, add a `layout.tsx` file inside that segment's folder. This allows for modular UI structures where, for example, a root layout can wrap a blog-specific layout, which then wraps blog pages.

```TypeScript
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
return <section>{children}</section>
}
```

--------------------------------

### Configure pageExtensions in next.config.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions

Set up Next.js to accept markdown and MDX files as page extensions alongside the default JavaScript and TypeScript files. This example demonstrates using the withMDX wrapper with custom pageExtensions configuration. The configuration array specifies which file extensions should be treated as valid page files in your Next.js project.

```javascript
const withMDX = require('@next/mdx')()
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
}
module.exports = withMDX(nextConfig)
```

--------------------------------

### Server & Client Components Directives

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactStrictMode

Use 'use server' and 'use client' directives to define component execution context. Leverage server components for data fetching and security-sensitive operations, client components for interactivity.

```APIDOC
## Server & Client Components Directives

### Description
Manage component execution context using 'use server' and 'use client' directives. Default to server components for optimal performance, use client components only when needed for interactivity.

### Server Components (Default)

#### Benefits
- Access backend resources directly
- Keep sensitive data on server (API keys, tokens)
- Reduce JavaScript sent to client
- Perform large computations on server

#### Server Component Example
```typescript
// app/page.tsx
import { db } from '@/shared/db'

export default async function Page() {
  const data = await db.query('SELECT * FROM posts')
  
  return (
    <div>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
```

### Client Components

#### 'use client' Directive
```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

#### Client Component Features
- Event listeners (onClick, onChange, etc.)
- React hooks (useState, useEffect, useContext)
- Browser APIs (localStorage, window)
- Real-time updates and interactivity

### Server Actions

#### 'use server' Directive
```typescript
'use server'

import { db } from '@/shared/db'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  const post = await db.posts.create({
    title,
    content
  })
  
  return post
}
```

#### Calling Server Actions from Client
```typescript
'use client'

import { createPost } from '@/app/actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

### Using 'use cache' Directive

#### Request Memoization
```typescript
'use cache'

export async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`)
  return res.json()
}
```

### Component Composition Pattern

#### Server Component with Client Child
```typescript
// app/page.tsx (Server Component)
import ClientCounter from '@/components/counter'
import { getPostData } from '@/shared/posts'

export default async function Page() {
  const posts = await getPostData()
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <ClientCounter initialCount={post.views} />
        </div>
      ))}
    </div>
  )
}
```

### Best Practices
- Keep server components at the top level
- Move interactive features to leaf components
- Minimize client-side JavaScript
- Use server actions for data mutations
- Avoid passing serializable data between server and client
```

--------------------------------

### Wrap Data Access with React Cache Function

Source: https://nextjs.org/docs/app/getting-started/fetching-data

Shows how to use React's cache function to wrap ORM or database queries for request deduplication and data sharing across render passes. This approach is used when not utilizing Next.js fetch, allowing manual memoization of expensive data access operations. The example wraps a database query to fetch a post by ID.

```TypeScript
import { cache } from 'react'
import { db, posts, eq } from '@/shared/db'
export const getPost = cache(async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id))
  })
})
```

--------------------------------

### Configure Redirects with Header Value Capture Groups in Next.js

Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects

Implement advanced conditional redirects using regex capture groups in header values to extract and reuse values in destination URLs. This example captures an 'authorized' value from the 'x-authorized' header using a named group pattern and passes it as a query parameter.

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: '(?<authorized>yes|true)'
          }
        ],
        permanent: false,
        destination: '/home?authorized=:authorized'
      }
    ]
  }
}
```

--------------------------------

### Inline Server Function Definition in a Next.js Server Component (TypeScript/JavaScript)

Source: https://nextjs.org/docs/app/getting-started/updating-data

This example shows how to define an asynchronous Server Function, like `createPost`, directly within a Next.js Server Component. The `'use server'` directive is placed inside the function body to designate it as a server-side action, which can then be used for data operations within the component's scope.

```typescript
export default function Page() {
  // Server Action
  async function createPost(formData:FormData) {
    'use server'
    // ...
  }
  return <></>
}
```