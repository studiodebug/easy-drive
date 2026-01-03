### Install Dependencies and Start Development Server

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/load-more-infinite-scroll

Install project dependencies and start the development server for local development. The --open flag automatically opens the app in a new browser tab.

```bash
npm install
npm run dev
```

```bash
npm run dev -- --open
```

---

### Setup QueryClient and useQuery with SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/quick-start

Demonstrates initializing a QueryClient, wrapping the app with QueryClientProvider, and using useQuery hook to fetch todos with SolidJS reactive components. The example shows handling loading, error, and success states using SolidJS Switch/Match components.

```typescript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { Switch, Match, For } from "solid-js";

const queryClient = new QueryClient();

function Example() {
  const query = useQuery(() => ({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  }));

  return (
    <div>
      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <For each={query.data}>{(todo) => <p>{todo.title}</p>}</For>
        </Match>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

---

### React Query Setup with Queries, Mutations, and Invalidation

Source: https://tanstack.com/query/latest/docs/framework/react/quick-start

Complete React Query application setup demonstrating how to create a QueryClient, provide it to the application using QueryClientProvider, execute queries with useQuery, handle mutations with useMutation, and invalidate cached queries on successful mutations. This example fetches todos, displays them in a list, and provides functionality to add new todos with automatic cache refresh.

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getTodos, postTodo } from "../my-api";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
```

---

### Setup TanStack Query with Solid.js and GraphQL

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Initializes QueryClient and QueryClientProvider for Solid.js application. Imports necessary utilities from @tanstack/solid-query and configures the endpoint for GraphQL requests using graphql-request library.

```typescript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { For, Match, Switch, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { gql, request } from "graphql-request";

const endpoint = "https://graphqlzero.almansi.me/api";
const queryClient = new QueryClient();
```

---

### Use Vue Query with Composition API and script setup

Source: https://tanstack.com/query/latest/docs/framework/vue/installation

Demonstrates using the useQuery hook with Vue's <script setup> syntax. Returns query state including isPending, isFetching, isError, data, and error properties from the useQuery hook with a query key and query function.

```vue
<script setup>
import { useQuery } from "@tanstack/vue-query";

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});
</script>

<template>...</template>
```

---

### Setup QueryClient and fetch GitHub data with useQuery in React

Source: https://tanstack.com/query/latest/docs/framework/react/overview

Demonstrates basic TanStack Query setup with QueryClientProvider and useQuery hook to fetch GitHub repository data. The example shows how to handle loading, error, and success states when fetching data from an external API endpoint.

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
```

---

### Start Svelte Development Server

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Launch the development server for local testing and debugging. The --open flag automatically opens the application in your default browser. Uses Vite for fast hot module reloading.

```bash
npm run dev
```

```bash
npm run dev -- --open
```

---

### Install Solid Query via Yarn

Source: https://tanstack.com/query/latest/docs/framework/solid/installation

Install Solid Query package using Yarn package manager. Yarn provides deterministic dependency installation with lock files for consistent builds.

```bash
yarn add @tanstack/solid-query
```

---

### Setup QueryClient and GraphQL Endpoint with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Initializes the QueryClient and defines the GraphQL endpoint configuration. This setup is required before using TanStack Query hooks in the application. The queryClient manages all query state and caching across the application.

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const endpoint = "https://graphqlzero.almansi.me/api";
const queryClient = new QueryClient();

type Post = {
  id: number;
  title: string;
  body: string;
};
```

---

### Run Svelte Development Server with npm

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/auto-refetching

After installing dependencies, these `npm` commands start the development server for a Svelte project. The optional `--open` flag can automatically launch the application in a web browser.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

---

### Start Development Server on Nuxt 3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Start the Nuxt 3 development server and access the application at http://localhost:3000. This command enables hot module reloading for rapid development.

```bash
yarn dev
```

---

### Initialize QueryClient and Setup App Component in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Sets up the TanStack Query client and wraps the application with QueryClientProvider. The App component manages post selection state and conditionally renders either a post list or individual post view, with SolidQueryDevtools for debugging.

```typescript
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { For, Match, Switch, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { gql, request } from "graphql-request";
import type { Accessor, Setter } from "solid-js";

const endpoint = "https://graphqlzero.almansi.me/api";

const queryClient = new QueryClient();

type Post = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId() > -1 ? (
        <Post postId={postId()} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </QueryClientProvider>
  );
}
```

---

### Build Production Version in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Create an optimized production build of your Svelte application. This command compiles and bundles the project for deployment. May require installing an adapter depending on the target environment.

```bash
npm run build
```

---

### Vue Query Core Concepts Example

Source: https://tanstack.com/query/latest/docs/framework/vue/quick-start

A complete Vue 3 example demonstrating queries, mutations, and query invalidation. The snippet shows how to use useQueryClient, useQuery, and useMutation hooks to fetch todos, add new todos, and automatically invalidate cached queries on successful mutation. Requires @tanstack/vue-query package and async query functions (getTodos, postTodo).

```vue
<script setup>
import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";

// Access QueryClient instance
const queryClient = useQueryClient();

// Query
const { isPending, isError, data, error } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});

// Mutation
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

function onButtonClick() {
  mutation.mutate({
    id: Date.now(),
    title: "Do Laundry",
  });
}
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else>
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
  <button @click="onButtonClick">Add Todo</button>
</template>
```

---

### Install Solid Query via Bun

Source: https://tanstack.com/query/latest/docs/framework/solid/installation

Install Solid Query package using Bun package manager. Bun is a modern, fast JavaScript runtime with built-in package management capabilities.

```bash
bun add @tanstack/solid-query
```

---

### Install Solid Query via NPM

Source: https://tanstack.com/query/latest/docs/framework/solid/installation

Install Solid Query package using NPM package manager. This is the standard installation method for Node.js projects using npm as the package manager.

```bash
npm i @tanstack/solid-query
```

---

### Complete Solid.js TanStack Query Basic Application

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

This comprehensive Solid.js example demonstrates a full-stack data fetching solution using TanStack Query. It includes QueryClient setup, useQuery hooks for fetching a list of posts and individual posts from jsonplaceholder.typicode.com, and Solid.js components (Posts, Post, App) to render the data, handle loading/error states, and manage navigation. It also showcases SolidQueryDevtools for debugging and query data access for conditional styling.

```tsx
/* @refresh reload */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { For, Match, Switch, createSignal } from "solid-js";
import { render } from "solid-js/web";
import type { Component, Setter } from "solid-js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

type Post = {
  id: number;
  title: string;
  body: string;
};

function createPosts() {
  return useQuery(() => ({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
  }));
}

function Posts(props: { setPostId: Setter<number> }) {
  const state = createPosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          // We can access the query data here to show bold links for
                          // ones that are cached
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}

const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await response.json();
};

function createPost(postId: number) {
  return useQuery(() => ({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  }));
}

function Post(props: { postId: number; setPostId: Setter<number> }) {
  const state = createPost(props.postId);

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data?.title}</h1>
            <div>
              <p>{state.data?.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}

const App: Component = () => {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId() > -1 ? (
        <Post postId={postId()} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </QueryClientProvider>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Install Solid Query via PNPM

Source: https://tanstack.com/query/latest/docs/framework/solid/installation

Install Solid Query package using PNPM package manager. PNPM is a faster, disk-efficient alternative to NPM with strict dependency management.

```bash
pnpm add @tanstack/solid-query
```

---

### Main SolidJS Application Setup with TanStack Query Provider

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

The `App` SolidJS component serves as the root of the application, wrapping its content with `QueryClientProvider` to make TanStack Query available. It also integrates `SolidQueryDevtools` for debugging. Using SolidJS's `createSignal`, it manages a `postId` state to dynamically switch between rendering the `Posts` list or a single `Post` detail component.

```typescript
const App: Component = () => {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId() > -1 ? (
        <Post postId={postId()} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </QueryClientProvider>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Set up QueryClient and QueryClientProvider in Solid.js

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

Initializes a QueryClient instance and wraps the application with QueryClientProvider to enable query functionality across the Solid.js component tree. The example also includes SolidQueryDevtools for development-time query inspection and debugging capabilities.

```typescript
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { Match, Switch } from "solid-js";
import { render } from "solid-js/web";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Example />
    </QueryClientProvider>
  );
}

render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Define Solid.js Home Component for SSR Streaming Demo

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/solid-start-streaming

This Solid.js component (`Home`) serves as the main entry point for the application. It utilizes `@solidjs/meta` to dynamically set the page title and displays introductory text explaining that the demo showcases Solid Query's capabilities in Server-Side Rendering (SSR) with streaming support.

```tsx
import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main>
      <Title>Solid Query v5</Title>

      <h1>Solid Query v5</h1>

      <p>
        This demo demonstrates how Solid Query can be used in SSR, with
        streaming support. Use the links in the top left to navigate between the
        various examples.
      </p>
    </main>
  );
}
```

---

### Install Vue Query via NPM

Source: https://tanstack.com/query/latest/docs/framework/vue/installation

Install @tanstack/vue-query package using npm package manager. Provides alternative commands for pnpm, yarn, and bun package managers to accommodate different project setups.

```bash
npm i @tanstack/vue-query
```

```bash
pnpm add @tanstack/vue-query
```

```bash
yarn add @tanstack/vue-query
```

```bash
bun add @tanstack/vue-query
```

---

### Install Dependencies with Yarn

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Install project dependencies using Yarn package manager. This command reads the package.json file and installs all required dependencies and devDependencies needed for the Nuxt 3 project.

```bash
yarn install
```

---

### Setup App Component with PersistQueryClientProvider

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Root App component wrapping TanStack Query provider with persistence configuration. Manages post selection state and toggles between posts list and detail views with query persistence enabled.

```typescript
function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  );
}
```

---

### Create Posts Query with GraphQL in Solid.js

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Defines a custom hook createPosts() that fetches all posts using TanStack Query. Executes a GraphQL query against the endpoint and returns typed data. Demonstrates query key and async query function setup.

```typescript
function createPosts() {
  return useQuery(() => ({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request<{ posts: { data: Array<Post> } }>(
        endpoint,
        gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `
      );
      return data;
    },
  }));
}
```

---

### Setup QueryClientProvider with Devtools in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Wraps the application with QueryClientProvider to enable TanStack Query functionality throughout the component tree. Includes ReactQueryDevtools for debugging query states and cache.

```typescript
<QueryClientProvider client={queryClient}>
  <onChange={(e) => setLocalFetchTimeMax(parseFloat(e.target.value))}
  style={{ width: '60px' }}
  />
  </div>
  <br />
  <App />
  <br />
  <ReactQueryDevtools initialIsOpen />
</QueryClientProvider>
```

---

### Setup QueryClientProvider with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll

Initializes and configures the TanStack Query provider at the application root level. Creates a QueryClient instance and wraps the application with QueryClientProvider to enable query caching and state management across the component tree.

```typescript
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

---

### Install Project Dependencies

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/ssr

Install required npm packages for the Svelte project. Supports multiple package managers including npm, pnpm, yarn, and bun for flexibility in dependency management.

```bash
npm install

# or
pnpm install

# or
yarn

# or
bun install
```

---

### Initialize TanStack Query in SolidJS Application

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

This snippet illustrates the fundamental setup for integrating TanStack Query into a SolidJS application. It imports necessary components from `@tanstack/solid-query` and `@tanstack/solid-query-devtools`, instantiates a `QueryClient`, and then wraps the main application component with `QueryClientProvider` to make the query client accessible throughout the component tree. The `SolidQueryDevtools` are also included for an enhanced development experience, providing a UI to inspect queries.

```typescript
/* @refresh reload */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { Match, Switch } from "solid-js";
import { render } from "solid-js/web";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Example />
    </QueryClientProvider>
  );
}
```

---

### Render SolidJS Application Component with TypeScript

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

This TypeScript code snippet illustrates the entry point for a SolidJS application. It uses the `render` function from `solid-js` to mount the main component onto a specified DOM element, typically 'root', enabling the application to start. Note: The provided snippet appears truncated or malformed.

```TypeScript
) } render(() => , document.getElementById('root') as HTMLElement)
```

---

### Initialize QueryClient and Setup Provider in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

Sets up TanStack Query in a Svelte application by creating a QueryClient instance and wrapping the application with QueryClientProvider. This enables query caching, synchronization, and state management across all child components. Includes optional SvelteQueryDevtools for development.

```svelte
<script lang="ts">
import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
import Simple from './lib/Simple.svelte'

const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Simple />
  </main>
  <SvelteQueryDevtools />
</QueryClientProvider>
```

---

### React TanStack Query Setup with Devtools

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Initializes a React application with TanStack Query client provider, React Query hooks imports, and React Query Devtools for debugging. Creates sample data array with fruit names and numeric IDs. This is the entry point demonstrating proper QueryClient and QueryClientProvider configuration for React applications.

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles.css";

let id = 0;
let list = [
  "apple",
  "banana",
  "pineapple",
  "grapefruit",
  "dragonfruit",
  "grapes",
].map((d) => ({ id: id++, name: d, notes: "" }));
```

---

### Setup TanStack Query with Standalone Angular App

Source: https://tanstack.com/query/latest/docs/framework/angular/quick-start

Provides the TanStack Query client to a standalone Angular application using the bootstrapApplication function. This initializes the QueryClient and HTTP client providers required for data fetching operations.

```typescript
import { provideHttpClient } from "@angular/common/http";
import {
  provideTanStackQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideTanStackQuery(new QueryClient())],
});
```

---

### Import Solid Query from ESM CDN

Source: https://tanstack.com/query/latest/docs/framework/solid/installation

Load Solid Query directly from ESM.sh CDN without a module bundler or package manager. Useful for quick prototyping or projects without build tools.

```html
<script type="module">
  import { QueryClient } from "https://esm.sh/@tanstack/solid-query";
</script>
```

---

### Create New Svelte Project with npm

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Initialize a new SvelteKit project named 'my-app' using the npm create command. This command scaffolds a new Svelte project with all necessary dependencies and configuration files.

```bash
npm create svelte@latest my-app
```

---

### Vite Build Tool Configuration for React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This TypeScript configuration file for Vite defines the build and development setup for a React project. It imports `defineConfig` from Vite and integrates the `@vitejs/plugin-react` to enable React-specific features like Fast Refresh and JSX transformation.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
});
```

---

### Main App Component with QueryClientProvider

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Root component wrapping the application with QueryClientProvider and SolidQueryDevtools. Manages post selection state and conditionally renders either the posts list or individual post view.

```typescript
function App() {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId() > -1 ? (
        <Post postId={postId()} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </QueryClientProvider>
  );
}
```

---

### Build Production Svelte Application

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Compile the Svelte application for production deployment. Generates optimized bundle with code splitting and minification. Preview the production build locally before deployment to verify correctness.

```bash
npm run build
```

```bash
npm run preview
```

---

### TanStack Query Provider Setup in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui

Wraps the application with QueryClientProvider to enable TanStack Query functionality across all components. Includes the ReactQueryDevtools component for development-time debugging and inspection of queries and mutations.

```jsx
export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
```

---

### Preview Production Build in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Preview the production build locally before deployment. This command allows you to test the optimized production version of your app in a local environment.

```bash
npm run preview
```

---

### Install TanStack Query Async Storage Persister Packages

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister

Commands to install the necessary packages for asynchronous query cache persistence: `@tanstack/query-async-storage-persister` and `@tanstack/react-query-persist-client`. Multiple package managers are supported.

```bash
npm install @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash
pnpm add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash
yarn add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash
bun add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

---

### Setup TanStack Query with NgModule-based Angular App

Source: https://tanstack.com/query/latest/docs/framework/angular/quick-start

Configures TanStack Query in a traditional NgModule-based Angular application by adding providers to the module's configuration. This approach is compatible with existing NgModule architectures.

```typescript
import { provideHttpClient } from "@angular/common/http";
import {
  provideTanStackQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideTanStackQuery(new QueryClient())],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

### TanStack Query React Example Project Dependencies

Source: https://tanstack.com/query/latest/docs/framework/react/examples/simple

This `package.json` file defines the project's metadata and dependencies for a TanStack Query React application. It includes core libraries like React, ReactDOM, and TanStack Query, along with dev tools and build setup using Vite.

```json
{
  "name": "@tanstack/query-example-react-simple",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-query-devtools": "^5.91.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "5.8.3",
    "vite": "^6.3.6"
  }
}
```

---

### Create Svelte Project with npm

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/basic

Initialize a new Svelte project using the create-svelte tool. This scaffolds a complete project structure with SvelteKit, build tools, and configuration files. Run with npm, pnpm, yarn, or bun depending on your preferred package manager.

```bash
npm create svelte@latest
```

```bash
npm create svelte@latest my-app
```

---

### Initialize Vue Query with VueQueryPlugin

Source: https://tanstack.com/query/latest/docs/framework/vue/installation

Initialize Vue Query in your application by importing VueQueryPlugin and registering it with your Vue app instance. This must be done before using any Vue Query functionality.

```typescript
import { VueQueryPlugin } from "@tanstack/vue-query";

app.use(VueQueryPlugin);
```

---

### Install @tanstack/query-persist-client-core

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister

Installs the core package for query persistence. This package provides the experimental_createQueryPersister utility. It can be installed using npm, pnpm, yarn, or bun.

```bash
npm install @tanstack/query-persist-client-core
```

```bash
pnpm add @tanstack/query-persist-client-core
```

```bash
yarn add @tanstack/query-persist-client-core
```

```bash
bun add @tanstack/query-persist-client-core
```

---

### Remove HydrationBoundary Boilerplate (Next.js Example)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

This Next.js example demonstrates how to centralize the `HydrationBoundary` in `_app.tsx` to reduce boilerplate in individual page components. It initializes the `QueryClient` and wraps the `Component` with `HydrationBoundary`, passing the `dehydratedState` from `pageProps`. This pattern avoids repeating the hydration setup in every route. Dependencies: `@tanstack/react-query`.

```tsx
// _app.tsx
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
```

```tsx
// pages/posts.tsx
// Remove PostsRoute with the HydrationBoundary and instead export Posts directly:
export default function Posts() { ... }
```

---

### Setup React App with TanStack Query Provider

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Root React component that wraps the application with QueryClientProvider to enable TanStack Query functionality. Manages post selection state and renders either the posts list or individual post view. Includes ReactQueryDevtools for debugging.

```typescript
function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
```

---

### Create and use SyncStoragePersister with React Query

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister

Initialize a QueryClient, create a sync storage persister with localStorage, and persist the query client. This example sets a 24-hour garbage collection time and demonstrates basic persistence setup.

```typescript
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
// const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
```

---

### Implement Basic TanStack React Query Application with Persistence

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

This full-stack React TypeScript application demonstrates fetching posts and individual post details using `useQuery` hooks, caching data, and persisting the query cache to `localStorage`. It includes `QueryClient` setup, `PersistQueryClientProvider`, `ReactQueryDevtools`, and React components for displaying post data with navigation.

```tsx
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
})

type Post = {
  id: number
  title: string
  body: string
}

function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await response.json()
    },
  })
}

function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>
}) {
  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = usePosts()

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === 'pending' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(['post', post.id])
                        ? {
                            fontWeight: 'bold',
                            color: 'green',
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}

const getPostById = async (id: number): Promise<Post> =>
```

---

### Render SolidJS Application to DOM

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

This is the entry point for mounting the SolidJS application into the DOM. It calls the `render` function provided by SolidJS, passing the root `App` component and the target HTML element where the application should be rendered.

```typescript
render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Create a New Svelte Project

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/optimistic-updates

Initialize a new SvelteKit project in a specified directory or the current one using the official Svelte project creation tool.

```bash
npm create svelte@latest my-app
```

```bash
npm create svelte@latest
```

---

### Build Application for Production with Nuxt 3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Build the Nuxt 3 application for production deployment. This command compiles and optimizes the application for distribution.

```bash
yarn build
```

---

### ESLint Configuration with TanStack and React Plugins

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

Configures ESLint using flat config format with TanStack ESLint config, TanStack Query plugin, and ESLint React plugin. This setup provides linting rules for React and Query best practices.

```javascript
import { tanstackConfig } from "@tanstack/eslint-config";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginReact from "@eslint-react/eslint-plugin";

export default [
  ...tanstackConfig,
  ...pluginQuery.configs["flat/recommended"],
  pluginReact.configs.recommended,
];
```

---

### Angular Component with Query and Mutation

Source: https://tanstack.com/query/latest/docs/framework/angular/quick-start

Demonstrates a complete TodosComponent with data fetching using injectQuery and mutations using injectMutation. Includes a TodoService that handles HTTP requests and shows automatic cache invalidation on successful mutations.

```typescript
import { Component, Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

import {
  injectMutation,
  injectQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

@Component({
  template: `
    <div>
      <button (click)="onAddTodo()">Add Todo</button>

      <ul>
        @for (todo of query.data(); track todo.title) {
        <li>{{ todo.title }}</li>
        }
      </ul>
    </div>
  `,
})
export class TodosComponent {
  todoService = inject(TodoService);
  queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => this.todoService.getTodos(),
  }));

  mutation = injectMutation(() => ({
    mutationFn: (todo: Todo) => this.todoService.addTodo(todo),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  }));

  onAddTodo() {
    this.mutation.mutate({
      id: Date.now().toString(),
      title: "Do Laundry",
    });
  }
}

@Injectable({ providedIn: "root" })
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Promise<Todo[]> {
    return lastValueFrom(
      this.http.get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    );
  }

  addTodo(todo: Todo): Promise<Todo> {
    return lastValueFrom(
      this.http.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
    );
  }
}

interface Todo {
  id: string;
  title: string;
}
```

---

### Setup QueryClient and App Provider with TanStack React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

Initializes a QueryClient with default options (retry: 0) and wraps the application with QueryClientProvider to enable query functionality across all child components. This establishes the foundation for data fetching with TanStack Query.

```typescript
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

---

### Mount Svelte Application Entry Point (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This TypeScript code defines the main entry point for the Svelte application, mounting the root App.svelte component to the DOM. It also imports the global CSS styles for the application.

```typescript
import { mount } from 'svelte' import './app.css' import App from './App.svelte' const app = mount(App, { target: document.querySelector('#app')!, }) export default app
```

---

### Display Individual Post with Loading States

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Renders a single post with loading, error, and success states. Includes back navigation and background update indicator. Uses Switch/Match for state management in Solid.js.

```typescript
function Post(props: { postId: number; setPostId: Setter<number> }) {
  const state = createPost(() => props.postId);

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data?.title}</h1>
            <div>
              <p>{state.data?.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}
```

---

### useMutation Hook Basic Setup and Return Values

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

Demonstrates the complete useMutation hook signature including all destructurable return values and the primary configuration options object. This shows the standard pattern for initializing a mutation with its state properties and control functions.

```typescript
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient
);
```

---

### Install TanStack React Query package via various package managers

Source: https://tanstack.com/query/latest/docs/framework/react/installation

Provides commands to install the main `@tanstack/react-query` library using NPM, PNPM, Yarn, or Bun. This is a common first step for integrating React Query into a project. The library is compatible with React v18+ and works with ReactDOM and React Native.

```bash
npm i @tanstack/react-query
```

```bash
pnpm add @tanstack/react-query
```

```bash
yarn add @tanstack/react-query
```

```bash
bun add @tanstack/react-query
```

---

### Install Angular Query with bun

Source: https://tanstack.com/query/latest/docs/framework/angular/installation

Install @tanstack/angular-query-experimental package using bun, a fast all-in-one JavaScript runtime and package manager.

```bash
bun add @tanstack/angular-query-experimental
```

---

### Set Placeholder Data as a Value (TanStack Query)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data

This example demonstrates how to provide `placeholderData` directly as a value to `useQuery`. This allows the query to start in a success state with the provided placeholder, preventing an initial pending state while the actual data is being fetched.

```tsx
function Todos() {
  const result = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/todos"),
    placeholderData: placeholderTodos,
  });
}
```

---

### Install Svelte Query v6

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

Instructions for adding `@tanstack/svelte-query` v6 to your project. Ensure your Svelte version is 5.25.0 or newer, as this version depends on `@tanstack/query-core` v5.

```bash
pnpm add @tanstack/svelte-query@latest
```

---

### Install createSyncStoragePersister with npm

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createSyncStoragePersister

Install the @tanstack/query-sync-storage-persister package along with the persist client utilities. Provides commands for multiple package managers.

```bash
npm install @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash
pnpm add @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash
yarn add @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash
bun add @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

---

### Setup QueryClientProvider with React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/default-query-function

Initializes TanStack Query (React Query) by creating a QueryClient instance and wrapping the application with QueryClientProvider. This sets up the global query cache and provides query functionality to all child components. Includes ReactQueryDevtools for development debugging.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
```

---

### Integrate React Query Devtools Panel in a React Application

Source: https://tanstack.com/query/latest/docs/framework/react/examples/devtools-panel

This example demonstrates how to set up a basic React application with TanStack React Query, fetch data from an API, and integrate the `ReactQueryDevtoolsPanel` component. It shows how to toggle the devtools panel visibility using a state variable and a button, providing a client for the `QueryClientProvider` and rendering fetched data.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/TanStack/query"
      );
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div
      style={{
        paddingBottom: 20,
      }}
    >
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### useMutationState - Get All Pending Mutation Variables

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState

Access all variables from mutations currently in pending status. This example demonstrates filtering mutations by status and extracting their variables using the select option.

```APIDOC
## useMutationState

### Description
Retrieve all variables from mutations with pending status using filters and select transformation.

### Hook Signature
```

useMutationState(options: UseMutationStateOptions) => Array<TResult>

````

### Parameters
#### Options
- **filters** (MutationFilters) - Optional - Filter criteria for mutations (e.g., status: 'pending')
- **select** ((mutation: Mutation) => TResult) - Optional - Transform function to extract specific mutation state
- **queryClient** (QueryClient) - Optional - Custom QueryClient instance, uses context default if not provided

### Request Example
```tsx
import { useMutationState } from '@tanstack/vue-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
````

### Response

#### Success Response

- **Array<TResult>** (Array) - Array of transformed mutation states matching the filter criteria

#### Response Example

```tsx
// variables contains all pending mutation variables
[
  { newPost: { title: "Post 1", content: "..." } },
  { newPost: { title: "Post 2", content: "..." } },
];
```

````

--------------------------------

### Initialize QueryClient and Configure TanStack Query in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Sets up the QueryClient and wraps the application with QueryClientProvider to enable TanStack Query functionality. Configures default query options including staleTime and gcTime through useEffect hooks that respond to state changes. The example demonstrates how these cache settings affect query behavior at runtime.

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './styles.css'

const queryClient = new QueryClient()

function Root() {
  const [staleTime, setStaleTime] = React.useState(1000)
  const [gcTime, setGcTime] = React.useState(3000)

  React.useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime,
        gcTime,
      },
    })
  }, [gcTime, staleTime])

  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
````

---

### Get mutation data by mutationKey using useMutationState

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutationState

Shows how to retrieve all data for specific mutations by matching the mutationKey. This example creates a mutation with a specific key and uses useMutationState to access the state data of mutations matching that key.

```tsx
import { useMutation, useMutationState } from "@tanstack/react-query";

const mutationKey = ["posts"];

// Some mutation that we want to get the state for
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post("/posts", newPost);
  },
});

const data = useMutationState({
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
});
```

---

### Render React App to DOM

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Entry point that renders the App component into the DOM root element. Uses React 18's createRoot API for rendering the application.

```typescript
const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### Install React Query Devtools with npm/pnpm/yarn/bun

Source: https://tanstack.com/query/latest/docs/framework/react/devtools

Install the React Query Devtools package using your preferred package manager. These commands are compatible with npm, pnpm, yarn, and bun. For Next.js 13+ App Dir, install as a dev dependency.

```bash
npm i @tanstack/react-query-devtools

pnpm add @tanstack/react-query-devtools

yarn add @tanstack/react-query-devtools

bun add @tanstack/react-query-devtools
```

---

### Create Angular Root Component with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/simple

Defines the root AppComponent for a TanStack Query Angular example. Uses standalone component architecture with OnPush change detection strategy for optimal performance. Imports SimpleExampleComponent and renders it via template.

```TypeScript
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SimpleExampleComponent } from './components/simple-example.component'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SimpleExampleComponent],
  template: `<simple-example />`,
})
export class AppComponent {}
```

---

### useMutationState - Get Specific Mutation Data by Key

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState

Retrieve mutation data for specific mutations identified by their mutationKey. This example shows how to filter mutations by a specific key and extract their state data.

```APIDOC
## useMutationState with mutationKey

### Description
Access mutation state data for specific mutations using the mutationKey filter and select transformation.

### Hook Signature
```

useMutationState(options: UseMutationStateOptions) => Array<TResult>

````

### Parameters
#### Options
- **filters.mutationKey** (string[] | Array) - Required - The mutation key to match against registered mutations
- **select** ((mutation: Mutation) => TResult) - Optional - Transform function to extract mutation.state.data
- **queryClient** (QueryClient) - Optional - Custom QueryClient instance

### Request Example
```tsx
import { useMutation, useMutationState } from '@tanstack/vue-query'

const mutationKey = ['posts']

const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState({
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})
````

### Response

#### Success Response

- **Array<TResult>** (Array) - Array of mutation data for all mutations matching the mutationKey

#### Response Example

```tsx
// data contains responses from all matching mutations
[{ id: 1, title: "New Post", createdAt: "2024-01-01T00:00:00Z" }];
```

````

--------------------------------

### Define Project Dependencies and Scripts (package.json)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This JSON configuration details the project's metadata, type, and essential scripts for development and building. It lists all runtime dependencies like '@tanstack/svelte-query' and development dependencies such as Vite and Svelte tooling.

```json
{
  "name": "@tanstack/query-example-svelte-simple",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/svelte-query": "^6.0.10",
    "@tanstack/svelte-query-devtools": "^6.0.2"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^5.1.1",
    "@tsconfig/svelte": "^5.0.4",
    "svelte": "^5.39.3",
    "svelte-check": "^4.3.1",
    "typescript": "5.8.3",
    "vite": "^6.3.6"
  }
}
````

---

### React Entry Point with ReactDOM Render

Source: https://tanstack.com/query/latest/docs/framework/react/examples/algolia

Initializes a React application by rendering the App component into the root HTML element using ReactDOM.createRoot(). This is the standard entry point for React applications using React 18+. Requires React and ReactDOM packages to be installed.

```tsx
import ReactDOM from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### Fetch and Display List of Posts with useQuery (SolidJS)

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

The `Posts` component demonstrates fetching a list of posts using `useQuery` with a simple query key `['/posts']`. It uses SolidJS's `Switch` and `Match` components to conditionally render UI based on the query's `status` (pending, error, or success). Clicking on a post title updates the `postId` state, and links are styled differently using `queryClient.getQueryData` if the specific post's data is already in the cache.

```typescript
function Posts(props: { setPostId: Setter<number> }) {
  // All you have to do now is pass a key!
  const state = useQuery<any[]>(() => ({ queryKey: ["/posts"] }));

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          // We can use the queryCache here to show bold links for
                          // ones that are cached
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
```

---

### Implement React Chat UI with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/chat

This code snippet outlines a complete React application that creates a functional chat interface. It leverages `@tanstack/react-query` for efficient data fetching, `useState` for managing user input and displayed questions, and `ReactDOM` for rendering the application. The `ChatMessage` component uses `useQuery` to fetch responses based on user questions, displaying loading and error states, while the `Example` component handles user input and message submission.

```tsx
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./style.css";
import { useState } from "react";
import { chatQueryOptions } from "./chat";
import { Message } from "./message";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Example />
    </QueryClientProvider>
  );
}

function ChatMessage({ question }: { question: string }) {
  const { error, data = [], isFetching } = useQuery(chatQueryOptions(question));

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Message message={{ content: question, isQuestion: true }} />
      <Message
        inProgress={isFetching}
        message={{ content: data.join(" "), isQuestion: false }}
      />
    </div>
  );
}

function Example() {
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const submitMessage = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion("");
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800">
        TanStack Chat Example
      </h1>
      <div className="overflow-y-auto mb-4 space-y-4">
        {questions.map((question) => (
          <ChatMessage key={question} question={question} />
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitMessage();
            }
          }}
          placeholder="Type your message..."
        />
        <button
          onClick={submitMessage}
          disabled={!currentQuestion.trim()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-2xl shadow-md transition"
        >
          <span>Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### Import TanStack React Query from CDN in HTML

Source: https://tanstack.com/query/latest/docs/framework/react/installation

Shows how to import React, ReactDOM, and `QueryClient` from `@tanstack/react-query` using an ESM-compatible CDN like ESM.sh. This method is suitable for projects not using module bundlers or package managers, requiring a `<script type="module">` tag in the HTML.

```html
<script type="module">
  import React from "https://esm.sh/react@18.2.0";
  import ReactDOM from "https://esm.sh/react-dom@18.2.0";
  import { QueryClient } from "https://esm.sh/@tanstack/react-query";
</script>
```

---

### Setup PersistQueryClientProvider with React

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

React component setup demonstrating how to use PersistQueryClientProvider instead of the standard QueryClientProvider. Configures a QueryClient with 24-hour garbage collection time and creates an async storage persister for localStorage persistence. Automatically handles subscription lifecycle and prevents race conditions during restoration.

```typescript
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.createRoot(rootElement).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
  >
    <App />
  </PersistQueryClientProvider>
);
```

---

### SolidJS TanStack Query: Configure Global Default Query Function

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

This example demonstrates setting up a global default query function for `@tanstack/solid-query` in a SolidJS application. It defines `defaultQueryFn` to fetch data from JSONPlaceholder based on the query key, then configures `QueryClient` to use this function globally. The `App`, `Posts`, and `Post` components then utilize `useQuery` without explicitly passing `queryFn`, relying on the default for data fetching and handling various loading states.

```tsx
/* @refresh reload */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { For, Match, Show, Switch, createSignal } from "solid-js";
import { render } from "solid-js/web";
import type { Setter } from "solid-js";
import type { QueryFunction } from "@tanstack/solid-query";

// Define a default query function that will receive the query key
const defaultQueryFn: QueryFunction<unknown> = async ({ queryKey }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
    {
      method: "GET",
    }
  );
  return response.json();
};

// provide the default query function to your app via the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      <Show when={postId() > -1} fallback={<Posts setPostId={setPostId} />}>
        <Post postId={postId()} setPostId={setPostId} />
      </Show>
    </QueryClientProvider>
  );
}

function Posts(props: { setPostId: Setter<number> }) {
  // All you have to do now is pass a key!
  const state = useQuery<any[]>(() => ({ queryKey: ["/posts"] }));

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          // We can use the queryCache here to show bold links for
                          // ones that are cached
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}

function Post(props: { postId: number; setPostId: Setter<number> }) {
  // You can even leave out the queryFn and just go straight into options
  const state = useQuery<any>(() => ({
    queryKey: [`/posts/${props.postId}`],
    enabled: !!props.postId,
  }));

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data.title}</h1>
            <div>
              <p>{state.data.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}

render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Demonstrate a Non-Dependent Nested Component Waterfall in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/request-waterfalls

This example shows a parent `Article` component and a child `Comments` component, both using `useQuery`. Although the `Comments` component's `id` prop is available early, its query only starts after the `Article` component finishes its data fetching and renders, creating a performance bottleneck known as a waterfall.

```tsx
function Article({ id }) {
  const { data: articleData, isPending } = useQuery(() => {
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  if (isPending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      <Comments id={id} />
    </>
  )

}

function Comments({ id }) {
  const { data, isPending } = useQuery(() => {
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  ...
}
```

---

### Get all variables of running mutations with useMutationState

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutationState

Demonstrates how to use useMutationState to retrieve variables from all mutations with a 'pending' status. This example filters mutations by status and uses the select function to extract only the variables property from each mutation's state.

```tsx
import { useMutationState } from "@tanstack/react-query";

const variables = useMutationState({
  filters: { status: "pending" },
  select: (mutation) => mutation.state.variables,
});
```

---

### Fetch data with useQuery hook in Solid.js

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

Uses the useQuery hook to fetch GitHub repository data asynchronously. The hook returns a reactive state object with isPending, error, data, and isFetching properties that automatically update when the query status changes. The queryFn performs an async fetch call to the GitHub API.

```typescript
function Example() {
  const state = useQuery(() => ({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/TanStack/query"
      );
      return await response.json();
    },
  }));

  return (
    <Switch>
      <Match when={state.isPending}>Loading...</Match>
      <Match when={state.error}>
        {"An error has occurred: " + (state.error as Error).message}
      </Match>
      <Match when={state.data !== undefined}>
        <div>
          <h1>{state.data.name}</h1>
          <p>{state.data.description}</p>
          <strong>👀 {state.data.subscribers_count}</strong>{" "}
          <strong>✨ {state.data.stargazers_count}</strong>{" "}
          <strong>🍴 {state.data.forks_count}</strong>
          <div>{state.isFetching ? "Updating..." : ""}</div>
        </div>
      </Match>
    </Switch>
  );
}
```

---

### Define Default Query Function for TanStack Query (SolidJS)

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

This function serves as the global default for all queries, providing a consistent way to fetch data. It uses the `fetch` API to make a GET request to `jsonplaceholder.typicode.com`, dynamically constructing the URL from the `queryKey` array. This eliminates the need to define a `queryFn` for every `useQuery` call unless a specific query requires a different fetching logic.

```typescript
const defaultQueryFn: QueryFunction<unknown> = async ({ queryKey }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
    {
      method: "GET",
    }
  );
  return response.json();
};
```

---

### Angular Root Component with OnPush Change Detection

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/pagination

Defines the root AppComponent with OnPush change detection strategy for optimized performance. The component uses a simple template that renders the ExampleComponent and imports it as a standalone dependency. This setup is typical for Angular applications using TanStack Query for data fetching.

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ExampleComponent } from "./components/example.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  template: `<example />`,
  imports: [ExampleComponent],
})
export class AppComponent {}
```

---

### Configure TypeScript Compiler Options for SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

This JSON file defines the TypeScript compiler configuration for the project. It specifies target JavaScript version (ES2020), module system (ESNext), JSX support for SolidJS, and various

---

### Retrieve Latest Mutation Data by Key with useMutationState (Solid Query)

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useMutationState

Building on the previous example, this snippet shows how to get the most recent data entry for a mutation identified by `mutationKey`. It uses `useMutationState` with `filters` and `select` to get all matching data, then accesses the last element of the returned array to find the latest invocation's data. Each `mutate` call adds a new entry to the cache for `gcTime` milliseconds.

```tsx
import { useMutation, useMutationState } from '@tanstack/solid-query'

const mutationKey = ['posts']

// Some mutation that we want to get the state for
const mutation = useMutation(() => {
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState(() => {
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})

// Latest mutation data
const latest = data[data.length - 1]
```

---

### Create Basic Example Component with Angular Signals

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/basic

Defines a BasicExampleComponent with OnPush change detection strategy that manages postId state using Angular signals. This component imports PostComponent and PostsComponent for displaying posts and individual post details. The component uses signal(-1) to initialize the postId state, enabling reactive updates.

```typescript
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { PostComponent } from "./components/post.component";
import { PostsComponent } from "./components/posts.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "basic-example",
  templateUrl: "./app.component.html",
  imports: [PostComponent, PostsComponent],
})
export class BasicExampleComponent {
  readonly postId = signal(-1);
}
```

---

### Get Pending Mutation Variables with useMutationState (Solid Query)

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useMutationState

This example demonstrates how to use `useMutationState` to retrieve the `variables` of all mutations that are currently in a 'pending' state. It uses filters to narrow down mutations by status and selects the `variables` property from each matching mutation's state.

```tsx
import { useMutationState } from '@tanstack/solid-query'

const variables = useMutationState(() => {
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

---

### Project Package Dependencies and Lock File

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This `package-lock.json` excerpt details the exact dependency versions and their tree structure for the project. It lists both runtime dependencies, such as `@tanstack/react-query` and `react`, and development dependencies, including `@vitejs/plugin-react` and `typescript`, ensuring consistent builds.

```json
{ "name": "@tanstack/query-example-react-playground", "lockfileVersion": 2, "requires": true, "packages": { "": { "name": "@tanstack/query-example-react-playground", "dependencies": { "@tanstack/react-query": "^5.90.12", "@tanstack/react-query-devtools": "^5.91.1", "react": "^19.0.0", "react-dom": "^19.0.0" }, "devDependencies": { "@vitejs/plugin-react": "^4.3.4", "typescript": "5.8.3", "vite": "^6.3.6" } }, "node_modules/@babel/code-frame": { "version": "7.27.1", "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz", "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJ
```

---

### Implement Query Prefetching with Button Handler

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

Uses useQueryClient hook to prefetch project data when the user clicks the 'Show Projects' button. The prefetching occurs only on the transition from hidden to visible state, optimizing the data loading experience by initiating the fetch before the component mounts.

```typescript
const queryClient = useQueryClient()

<Button
  onClick={() => {
    setShowProjects((old) => {
      if (!old) {
        queryClient.prefetchQuery({
          queryKey: ['projects'],
          queryFn: fetchProjects,
        })
      }
      return !old
    })
  }}
>
  {showProjects ? 'Hide Projects' : 'Show Projects'}
</Button>
```

---

### Install TanStack Svelte Query Devtools (npm, pnpm, yarn, bun)

Source: https://tanstack.com/query/latest/docs/framework/svelte/devtools

These commands show how to install the TanStack Svelte Query Devtools package using different package managers. Ensure you have Node.js and a package manager installed.

```bash
npm i @tanstack/svelte-query-devtools
```

```bash
pnpm add @tanstack/svelte-query-devtools
```

```bash
yarn add @tanstack/svelte-query-devtools
```

```bash
bun add @tanstack/svelte-query-devtools
```

---

### useMutationState - Get data for specific mutations by mutationKey

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState

Retrieves mutation state data for a specific mutation identified by mutationKey. This example demonstrates creating a mutation with a specific key and then accessing its state data through useMutationState with matching mutationKey filter.

```typescript
import { useMutation, useMutationState } from "@tanstack/vue-query";

const mutationKey = ["posts"];

// Some mutation that we want to get the state for
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post("/posts", newPost);
  },
});

const data = useMutationState({
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
});
```

---

### Setup QueryClient and App State Management in React Native

Source: https://tanstack.com/query/latest/docs/framework/react/examples/react-native

Initializes QueryClient with default retry options and integrates focus management and online status detection for React Native. The focusManager updates query refetch behavior based on app state (active/inactive), while useOnlineManager handles network connectivity. This ensures queries refetch appropriately when the app regains focus or network connection.

```tsx
import * as React from "react";
import { AppStateStatus, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";

import { useAppState } from "./src/hooks/useAppState";
import { MoviesStack } from "./src/navigation/MoviesStack";
import { useOnlineManager } from "./src/hooks/useOnlineManager";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  useOnlineManager();

  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MoviesStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
```

---

### Install Angular Query with pnpm

Source: https://tanstack.com/query/latest/docs/framework/angular/installation

Install @tanstack/angular-query-experimental package using pnpm, a fast and disk space efficient package manager.

```bash
pnpm add @tanstack/angular-query-experimental
```

---

### Todo List Display with Map Rendering

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

Renders a dynamic list of todos by mapping over data array. Each list item uses the todo item as its key and displays the item text.

```jsx
<ul>
  {data.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

---

### Configure Svelte Preprocessing (svelte.config.js)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This JavaScript configuration file sets up preprocessing for Svelte components using 'vitePreprocess' from '@sveltejs/vite-plugin-svelte'. It also enables Svelte's 'runes' compiler option for reactive primitives.

```javascript
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte' export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
}
```

---

### Define Root Vue Component for TanStack Query Example

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/basic

This `App.vue` component serves as the root of a basic Vue application utilizing TanStack Vue Query. It imports `Posts` and `Post` components, manages `postId` and `visitedPosts` states, and conditionally renders the `Post` or `Posts` view. The component also integrates `VueQueryDevtools` for debugging query states, demonstrating how to track user interactions and leverage caching for faster subsequent loads.

```vue
<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

import Posts from "./Posts.vue";
import Post from "./Post.vue";

export default defineComponent({
  name: "App",
  components: { Posts, Post, VueQueryDevtools },
  setup() {
    const visitedPosts = ref(new Set());
    const isVisited = (id: number) => visitedPosts.value.has(id);

    const postId = ref(-1);
    const setPostId = (id: number) => {
      visitedPosts.value.add(id);
      postId.value = id;
    };

    return {
      isVisited,
      postId,
      setPostId,
    };
  },
});
</script>

<template>
  <h1>Vue Query - Basic</h1>
  <p>
    As you visit the posts below, you will notice them in a loading state the
    first time you load them. However, after you return to this list and click
    on any posts you have already visited again, you will see them load
    instantly and background refresh right before your eyes!
    <strong>
      (You may need to throttle your network speed to simulate longer loading
      sequences)
    </strong>
  </p>
  <Post v-if="postId > -1" :postId="postId" @setPostId="setPostId" />
  <Posts v-else :isVisited="isVisited" @setPostId="setPostId" />
  <VueQueryDevtools />
</template>
```

---

### Package Dependencies Configuration for TanStack Query React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

Defines production and development dependencies for the TanStack Query React Shadow DOM example. Includes React 19, TanStack React Query 5.90.12, React DOM 19, TypeScript, Vite, and related type definitions.

```json
{
  "name": "@tanstack/query-example-react-shadow-dom",
  "dependencies": {
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-query-devtools": "^5.91.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "5.8.3",
    "vite": "^6.3.6"
  }
}
```

---

### Install Angular Query with npm

Source: https://tanstack.com/query/latest/docs/framework/angular/installation

Install @tanstack/angular-query-experimental package using npm package manager. This is the standard installation method for Node.js projects.

```bash
npm i @tanstack/angular-query-experimental
```

---

### React App Root Component and Rendering Setup with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

This code snippet illustrates the main React application component ('App') structure, featuring conditional rendering for 'Projects' components, React.Suspense for lazy loading, and ErrorBoundary for general error handling. It specifically integrates 'QueryErrorResetBoundary' from TanStack Query for error recovery within queries and includes 'ReactQueryDevtools' for debugging TanStack Query state. The final lines demonstrate how the React application is mounted to the DOM using ReactDOM.createRoot.

```jsx
                    setActiveProject={setActiveProject}
                  />
                ) : (
                  <Projects setActiveProject={setActiveProject} />
                )}
              </React.Suspense>
            ) : null}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### Configure Vite for Svelte (vite.config.ts)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This TypeScript file defines the Vite build configuration for the Svelte project. It imports and applies the Svelte plugin for Vite, enabling compilation of Svelte components.

```typescript
import { defineConfig } from 'vite' import { svelte } from '@sveltejs/vite-plugin-svelte' export default defineConfig({ plugins: [svelte()], })
```

---

### Perform basic data fetching with useQuery in Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useQuery

This example demonstrates the most fundamental usage of the `useQuery` hook to fetch data from an API. It illustrates how to define a query key and an asynchronous query function, then render UI elements based on the query's loading, error, and success states using SolidJS's `Show` component.

```tsx
import { useQuery } from "@tanstack/solid-query";

function App() {
  const todos = useQuery(() => ({
    queryKey: "todos",
    queryFn: async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
  }));

  return (
    <div>
      <Show when={todos.isError}>
        <div>Error: {todos.error.message}</div>
      </Show>
      <Show when={todos.isLoading}>
        <div>Loading...</div>
      </Show>
      <Show when={todos.isSuccess}>
        <div>
          <div>Todos:</div>
          <ul>
            <For each={todos.data}>{(todo) => <li>{todo.title}</li>}</For>
          </ul>
        </div>
      </Show>
    </div>
  );
}
```

---

### Initialize TanStack Query Client and Provider (SolidJS)

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

This snippet initializes the `QueryClient` and provides it to the SolidJS application using `QueryClientProvider`. It configures a `defaultOptions` object for all queries, setting the `queryFn` to the previously defined `defaultQueryFn`. The `QueryClientProvider` makes the query client available to all descendant components, enabling them to use TanStack Query hooks.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  const [postId, setPostId] = createSignal(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      <Show when={postId() > -1} fallback={<Posts setPostId={setPostId} />}>
        <Post postId={postId()} setPostId={setPostId} />
      </Show>
    </QueryClientProvider>
  );
}
```

---

### Initialize useQuery with TanStack Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/queries

Basic setup of useQuery hook from @tanstack/solid-query with a unique query key and async fetch function. Returns a query result object containing state information and fetched data.

```typescript
import { useQuery } from '@tanstack/solid-query'

function App() {
  const info = useQuery(() => { queryKey: ['todos'], queryFn: fetchTodoList })
}
```

---

### Initialize TanStack Svelte Query with QueryClientProvider

Source: https://tanstack.com/query/latest/docs/framework/svelte/overview

This Svelte component sets up the TanStack Svelte Query client. It imports `QueryClient` and `QueryClientProvider` to create a new client instance and makes it available to child components, such as `Example`, which will consume the query data.

```svelte
<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import Example from './lib/Example.svelte'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <Example />
</QueryClientProvider>
```

---

### Create SvelteKit API Endpoint for Todos

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/optimistic-updates

This TypeScript snippet defines a SvelteKit API endpoint (`+server.ts`) for managing a todo list. It includes a GET handler to return current items with simulated latency and a POST handler to add new items, featuring a random failure condition to test optimistic update rollback.

```typescript
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

type Todo = {
  id: string;
  text: string;
};

const items: Array<Todo> = [];

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (req) => {
  await new Promise((r) => setTimeout(r, 1000));
  return json({ ts: Date.now(), items }, { status: 200 });
};

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }) => {
  const { text } = await request.json();
  if (Math.random() > 0.7) {
    return json({ message: "Could not add item!" }, { status: 500 });
  }
  const newTodo = {
    id: Math.random().toString(),
    text: text.toUpperCase() as string,
  };
  items.push(newTodo);
  return json(newTodo, { status: 200 });
};
```

---

### Create Individual Post Query Hook and Component in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Implements a createPost hook that fetches a single post by ID with conditional enabling based on postId validity. The Post component displays post details with status handling, error display, and background update indicator. Includes back navigation to the post list.

```typescript
function createPost(postId: Accessor<number>) {
  return useQuery(() => ({
    queryKey: ["post", postId()],
    queryFn: async () => {
      const { post } = await request<{ post: Post }>(
        endpoint,
        gql`
        query {
          post(id: ${postId()}) {
            id
            title
            body
          }
        }
        `
      );

      return post;
    },
    enabled: !!postId(),
  }));
}

function Post(props: { postId: number; setPostId: Setter<number> }) {
  const state = createPost(() => props.postId);

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data?.title}</h1>
            <div>
              <p>{state.data?.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}

render(() => <App />, document.getElementById("root") as HTMLElement);
```

---

### Define Angular Root Component for Optimistic Updates

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/optimistic-updates

This Angular `AppComponent` serves as the root of the application, utilizing `ChangeDetectionStrategy.OnPush` for optimized performance. It imports and renders the `OptimisticUpdatesComponent`, which is expected to house the core logic for demonstrating optimistic UI updates. This setup is typical for bootstrapping an Angular application.

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OptimisticUpdatesComponent } from "./components/optimistic-updates.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  template: `<optimistic-updates />`,
  imports: [OptimisticUpdatesComponent],
})
export class AppComponent {}
```

---

### Install Testing Dependencies

Source: https://tanstack.com/query/latest/docs/framework/react/guides/testing

Installs the necessary libraries for testing React hooks, including `@testing-library/react-hooks` and `react-test-renderer`. These are essential for creating isolated testing environments for custom hooks.

```sh
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

---

### Provide QueryClient to SvelteKit layout component

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Wraps child components with QueryClientProvider using the QueryClient from layout data. This makes the prefetched query cache available to all descendant components without prop-drilling.

```svelte
<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
```

---

### React Application Root Rendering

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This line of code initializes a React application by locating a root DOM element and rendering the main component into it. It marks the entry point for mounting the React application onto the web page using ReactDOM's `createRoot` API.

```typescript
const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render();
```

---

### Import Solid Query Devtools Component

Source: https://tanstack.com/query/latest/docs/framework/solid/devtools

Demonstrates how to import the `SolidQueryDevtools` component into a SolidJS application. This is the first step after installation to make the devtools available.

```tsx
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
```

---

### Install Angular Query with yarn

Source: https://tanstack.com/query/latest/docs/framework/angular/installation

Install @tanstack/angular-query-experimental package using yarn package manager, offering fast and reliable dependency management.

```bash
yarn add @tanstack/angular-query-experimental
```

---

### Configure Package Dependencies for React Query Project

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Defines npm package configuration for a TanStack Query React playground with Vite as the build tool. Includes React Query, React Query DevTools, React, and Vite with TypeScript support for development.

```json
{
  "name": "@tanstack/query-example-react-playground",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-query-devtools": "^5.91.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "5.8.3",
    "vite": "^6.3.6"
  }
}
```

---

### Fetch All Posts using TanStack Query in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

The `createPosts` SolidJS hook utilizes TanStack Query's `useQuery` to asynchronously fetch a list of `Post` objects. It defines a `queryKey` of `['posts']` for caching and provides an `async queryFn` to make an API call to `jsonplaceholder.typicode.com/posts` and parse the JSON response.

```typescript
function createPosts() {
  return useQuery(() => ({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
  }));
}
```

---

### Render React Root Component

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This snippet is responsible for initializing and rendering the main React application. It uses `ReactDOM.createRoot` to attach the `<Root />` component to the HTML element with the ID 'root', making the application interactive in the browser.

```javascript
const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<Root />)
```

---

### Create Posts Query Hook and Component in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Implements a custom createPosts hook that fetches a list of posts from GraphQL endpoint using TanStack Query. The Posts component renders the list with status handling and visual indicators for cached posts. Displays loading state, errors, and background update status.

```typescript
function createPosts() {
  return useQuery(() => ({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request<{ posts: { data: Array<Post> } }>(
        endpoint,
        gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `
      );
      return data;
    },
  }));
}

function Posts(props: { setPostId: Setter<number> }) {
  const state = createPosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post: any) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
```

---

### Use Async Setup with Vue Query useQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/suspense

Implements a suspendable component with an async setup function that uses Vue Query's useQuery hook. The suspense() function is awaited to trigger data fetching and component suspension. Returns the fetched data for template use.

```vue
<script>
import { defineComponent } from "vue";
import { useQuery } from "@tanstack/vue-query";

const todoFetcher = async () =>
  await fetch("https://jsonplaceholder.cypress.io/todos").then((response) =>
    response.json()
  );
export default defineComponent({
  name: "SuspendableComponent",
  async setup() {
    const { data, suspense } = useQuery(["todos"], todoFetcher);
    await suspense();

    return { data };
  },
});
</script>
```

---

### Initialize TanStack Query React Application

Source: https://tanstack.com/query/latest/docs/framework/react/examples/rick-morty

This foundational TypeScript React snippet sets up the main entry point for a web application. It uses `ReactDOM.createRoot` to render the primary `App` component into the DOM, making it ready for component-based rendering.

```tsx
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### React Component for Paginated Data Fetching with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/pagination

This React component, `Example`, integrates TanStack Query to manage paginated data for a list of projects. It utilizes `useQuery` to fetch data for the current page, `keepPreviousData` to prevent flickering during page transitions, and `prefetchQuery` within a `useEffect` hook to load the next page's data in advance. The component also handles displaying loading, error, and data states, alongside navigation buttons for pagination.

```tsx
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const fetchProjects = async (
  page = 0
): Promise<{
  projects: Array<{ name: string; id: number }>;
  hasMore: boolean;
}> => {
  const response = await fetch(`/api/projects?page=${page}`);
  return await response.json();
};

function Example() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["projects", page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <div>
      <p>
        In this example, each page of data remains visible as the next page is
        fetched. The buttons and capability to proceed to the next page are also
        supressed until the next page cursor is known. Each page is cached as a
        normal query too, so when going to previous pages, you'll see them
        instantaneously while they are also refetched invisibly in the
        background.
      </p>
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        // `data` will either resolve to the latest page's data
        // or if fetching a new page, the last successful page's data
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button> <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'pending'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{" "}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
```

---

### Display Posts List with Caching Status in Solid.js

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Renders a list of posts with loading, error, and success states using Solid.js Switch/Match components. Shows cached posts in bold green and displays background update status. Uses queryClient to check for cached data.

```typescript
function Posts(props: { setPostId: Setter<number> }) {
  const state = createPosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post: any) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
```

---

### Handle query states with Solid.js Switch/Match components

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/simple

Renders different UI content based on query state using Solid.js' Switch/Match control flow. Displays loading message during data fetch, error message if fetch fails, and formatted repository data when successful. The isFetching flag shows 'Updating...' during background refetches.

```typescript
<Switch>
  <Match when={state.isPending}>Loading...</Match>
  <Match when={state.error}>
    {"An error has occurred: " + (state.error as Error).message}
  </Match>
  <Match when={state.data !== undefined}>
    <div>
      <h1>{state.data.name}</h1>
      <p>{state.data.description}</p>
      <strong>👀 {state.data.subscribers_count}</strong>{" "}
      <strong>✨ {state.data.stargazers_count}</strong>{" "}
      <strong>🍴 {state.data.forks_count}</strong>
      <div>{state.isFetching ? "Updating..." : ""}</div>
    </div>
  </Match>
</Switch>
```

---

### Use initialData with createQuery in Svelte component

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Receives server-loaded data through PageData and passes it to createQuery as initialData. The query uses this cached data on initial render, avoiding a client-side fetch. Useful for simple SSR scenarios with minimal setup.

```svelte
<script>
  import { createQuery } from '@tanstack/svelte-query'
  import type { PageData } from './$types'

  export let data: PageData

  const query = createQuery(() => ({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: data.posts,
  }))
</script>
```

---

### SolidJS Component to Display List of Posts with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

This `Posts` SolidJS component renders a list of fetched posts, managing and displaying different UI states (loading, error, data) using `Switch` and `Match`. It allows users to click on a post title to view its details, and dynamically styles links based on whether the individual post data is already cached by `queryClient.getQueryData`.

```typescript
function Posts(props: { setPostId: Setter<number> }) {
  const state = createPosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        <Switch>
          <Match when={state.status === "pending"}>Loading...</Match>
          <Match when={state.status === "error"}>
            <span>Error: {(state.error as Error).message}</span>
          </Match>
          <Match when={state.data !== undefined}>
            <>
              <div>
                <For each={state.data}>
                  {(post) => (
                    <p>
                      <a
                        onClick={() => props.setPostId(post.id)}
                        href="#"
                        style={
                          // We can access the query data here to show bold links for
                          // ones that are cached
                          queryClient.getQueryData(["post", post.id])
                            ? {
                                "font-weight": "bold",
                                color: "green",
                              }
                            : {}
                        }
                      >
                        {post.title}
                      </a>
                    </p>
                  )}
                </For>
              </div>
              <div>{state.isFetching ? "Background Updating..." : " "}</div>
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
```

---

### Server Component Fetching and Hydrating Data with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

This TypeScript example demonstrates a React Server Component (`PostsPage`) that uses `@tanstack/react-query`'s `fetchQuery` to retrieve posts. It then dehydrates the query client state and passes it to a `HydrationBoundary` for client-side hydration, while also rendering a data-dependent value (`posts.length`) directly on the server. This setup illustrates a scenario where client-side revalidation can lead to data inconsistencies if not managed carefully.

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Posts from "./posts";

export default async function PostsPage() {
  const queryClient = new QueryClient();

  // Note we are now using fetchQuery()
  const posts = await queryClient.fetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* This is the new part */}
      <div>Nr of posts: {posts.length}</div>
      <Posts />
    </HydrationBoundary>
  );
}
```

---

### Install TanStack Solid Query Devtools

Source: https://tanstack.com/query/latest/docs/framework/solid/devtools

Installs the TanStack Solid Query Devtools package using various package managers. This package is essential for enabling the debugging interface for Solid Query.

```bash
npm i @tanstack/solid-query-devtools

```

```bash
pnpm add @tanstack/solid-query-devtools

```

```bash
yarn add @tanstack/solid-query-devtools

```

```bash
bun add @tanstack/solid-query-devtools

```

---

### Install Vue Query Devtools Package

Source: https://tanstack.com/query/latest/docs/framework/vue/devtools

Installs the @tanstack/vue-query-devtools package using various package managers. This package is necessary for integrating the devtools component into a Vue 3 application. By default, these devtools are only included in development bundles.

```bash
npm i @tanstack/vue-query-devtools
```

```bash
pnpm add @tanstack/vue-query-devtools
```

```bash
yarn add @tanstack/vue-query-devtools
```

```bash
bun add @tanstack/vue-query-devtools
```

---

### Fetch user projects based on user data using TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/dependent-queries

This JavaScript example demonstrates a dependent query pattern using `useQuery`. It first fetches a user's data by email. Once the `user.id` is available, a second `useQuery` is enabled to fetch projects associated with that `userId`, preventing the projects query from running until the user data is retrieved.

```js
// Get the user
const { data: user } = useQuery({
  queryKey: ["user", email],
  queryFn: () => getUserByEmail(email.value),
});

const userId = computed(() => user.value?.id);
const enabled = computed(() => !!user.value?.id);

// Then get the user's projects
const { isIdle, data: projects } = useQuery({
  queryKey: ["projects", userId],
  queryFn: () => getProjectsByUser(userId.value),
  enabled, // The query will not execute until `enabled == true`
});
```

---

### Install React Query v4 Dependencies

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4

Uninstall the old react-query package and install the new @tanstack/react-query and @tanstack/react-query-devtools packages. This must be done before updating imports in your codebase.

```bash
npm uninstall react-query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

---

### React App Root with React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This code sets up the root component for the React application, integrating React Query. It uses `QueryClientProvider` to provide the query client to the application, and includes UI elements for controlling `staleTime` and `gcTime` of queries, and error rate and fetch times for the simulated API calls.

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './styles.css'

let id = 0
let list = [
  'apple',
  'banana',
  'pineapple',
  'grapefruit',
  'dragonfruit',
  'grapes',
].map((d) => ({ id: id++, name: d, notes: 'These are some notes' }))

type Todos = typeof list
type Todo = Todos[0]

let errorRate = 0.05
let queryTimeMin = 1000
let queryTimeMax = 2000

const queryClient = new QueryClient()

function Root() {
  const [staleTime, setStaleTime] = React.useState(1000)
  const [gcTime, setGcTime] = React.useState(3000)
  const [localErrorRate, setErrorRate] = React.useState(errorRate)
  const [localFetchTimeMin, setLocalFetchTimeMin] = React.useState(queryTimeMin)
  const [localFetchTimeMax, setLocalFetchTimeMax] = React.useState(queryTimeMax)

  React.useEffect(() => {
    errorRate = localErrorRate
    queryTimeMin = localFetchTimeMin
    queryTimeMax = localFetchTimeMax
  }, [localErrorRate, localFetchTimeMax, localFetchTimeMin])

  React.useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime,
        gcTime,
      },
    })
  }, [gcTime, staleTime])

  return (
    <QueryClientProvider client={queryClient}>
      <p>
        The "staleTime" and "gcTime" durations have been altered in this example
        to show how query stale-ness and query caching work on a granular level
      </p>
      <div>
        Stale Time:{' '}
        <input
          type="number"
          min="0"
          step="1000"
          value={staleTime}
          onChange={(e) => setStaleTime(parseFloat(e.target.value))}
          style={{ width: '100px' }}
        />
      </div>
      <div>
        Garbage collection Time:{' '}
        <input
          type="number"
          min="0"
          step="1000"
          value={gcTime}
          onChange={(e) => setGcTime(parseFloat(e.target.value))}
          style={{ width: '100px' }}
        />
      </div>
      <br />
      <div>
        Error Rate:{' '}
        <input
          type="number"
          min="0"
          max="1"
          step=".05"
          value={localErrorRate}
          onChange={(e) => setErrorRate(parseFloat(e.target.value))}
          style={{ width: '100px' }}
        />
      </div>
      <div>
        Fetch Time Min:{' '}
        <input
          type="number"
          min="1"
          step="500"
          value={localFetchTimeMin}
          onChange={(e) => setLocalFetchTimeMin(parseFloat(e.target.value))}
          style={{ width: '60px' }}
        />{' '}
      </div>
      <div>
        Fetch Time Max:{' '}
        <input
          type="number"
          min="1"
          step="500"
          value={localFetchTimeMax}

```

---

### Configure React Application with Vite and TanStack DevTools

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

Sets up the React root with ReactDOM.createRoot and integrates ReactQueryDevtools for debugging query state in development. The devtools panel initializes open by default for easy inspection of queries and cache.

```typescript
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)

// Inside App component
<ReactQueryDevtools initialIsOpen />
```

---

### Angular Root Component with Router Navigation

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/devtools-panel

Standalone Angular component serving as the application root with router configuration. Uses OnPush change detection strategy and displays navigation links to different devtools panel examples. Imports RouterOutlet and RouterLink for navigation functionality.

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  template: `
    <ul>
      <li>
        <a routerLink="basic">Basic devtools panel example</a>
      </li>
      <li>
        <a routerLink="lazy">Lazy load devtools panel example</a>
      </li>
    </ul>

    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
```

---

### Solid Query Code Splitting with Double Waterfall Example

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/request-waterfalls

This Solid.js (tsx) snippet illustrates a common scenario of code splitting where a lazily loaded component (`GraphFeedItem`) contains its own data fetch using TanStack Query. This setup creates a 'double waterfall' of network requests, as the component's JavaScript must load before its data fetch can begin, impacting initial render performance.

```tsx
// This lazy loads the GraphFeedItem component, meaning
// it wont start loading until something renders it
const GraphFeedItem = Solid.lazy(() => import('./GraphFeedItem'))

function Feed() {
  const { data, isPending } = useQuery(() => {
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

// GraphFeedItem.tsx
function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery(() => {
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
```

---

### Set custom batching function in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5

Configure a custom batching function for TanStack Query using notifyManager.setBatchNotifyFunction. Since unstable_batchedUpdates is a noop in React 18, frameworks must explicitly set their batching function. This example demonstrates setup in solid-query using the batch function from solid-js.

```typescript
import { notifyManager } from "@tanstack/query-core";
import { batch } from "solid-js";

notifyManager.setBatchNotifyFunction(batch);
```

---

### Fetch and Display Single Post with useQuery (SolidJS)

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/default-query-function

The `Post` component fetches a single post based on the `postId` prop. It uses `useQuery` with an `enabled` option to conditionally fetch data only when `postId` is valid. Similar to the `Posts` component, it displays loading, error, and data states using SolidJS's `Switch` and `Match`. A 'Back' link allows the user to return to the posts list by resetting the `postId` state.

```typescript
function Post(props: { postId: number; setPostId: Setter<number> }) {
  // You can even leave out the queryFn and just go straight into options
  const state = useQuery<any>(() => ({
    queryKey: [`/posts/${props.postId}`],
    enabled: !!props.postId,
  }));

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data.title}</h1>
            <div>
              <p>{state.data.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}
```

---

### Create usePosts Hook with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Custom React hook that fetches all posts from JSONPlaceholder API using useQuery. Returns query status, data, and error states for rendering posts list with proper TypeScript typing.

```typescript
function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
  });
}
```

---

### Initialize QueryClient and Configure TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Sets up a QueryClient instance and configures default query options including staleTime and gcTime (garbage collection time). These settings control how long data is considered fresh and how long inactive queries are retained in the cache.

```typescript
const queryClient = new QueryClient();

React.useEffect(() => {
  queryClient.setDefaultOptions({
    queries: {
      staleTime,
      gcTime,
    },
  });
}, [gcTime, staleTime]);
```

---

### Create Async Storage Persister for TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Initializes an async storage persister using localStorage to persist TanStack Query cache across sessions. The persister enables automatic cache hydration and persistence without manual implementation.

```typescript
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});
```

---

### Initialize TanStack Query Provider in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This Svelte component code initializes the QueryClient and wraps the main application with QueryClientProvider, making TanStack Query available throughout the Svelte app. It also includes the SvelteQueryDevtools for debugging.

```svelte
<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import Simple from './lib/Simple.svelte'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <Simple />
  </main>
  <SvelteQueryDevtools />
</QueryClientProvider>
```

---

### React Query Prefetching with useQuery and useQueryClient

Source: https://tanstack.com/query/latest/docs/framework/react/examples/prefetching

Demonstrates data prefetching implementation using TanStack React Query. The component fetches a list of Rick and Morty characters and individual character details, prefetching data on hover via queryClient.prefetchQuery() with a 10-second stale time. Implements visual feedback by bolding prefetched items and includes React Query DevTools for monitoring cache state.

```typescript
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const getCharacters = async (): Promise<{
  results: Array<{ id: number; name: string }>;
}> => {
  await new Promise((r) => setTimeout(r, 500));
  const response = await fetch("https://rickandmortyapi.com/api/character/");
  return await response.json();
};

const getCharacter = async (selectedChar: number) => {
  await new Promise((r) => setTimeout(r, 500));
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${selectedChar}`
  );
  return await response.json();
};

export default function Example() {
  const queryClient = useQueryClient();
  const rerender = React.useState(0)[1];
  const [selectedChar, setSelectedChar] = React.useState(1);

  const charactersQuery = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  const characterQuery = useQuery({
    queryKey: ["character", selectedChar],
    queryFn: () => getCharacter(selectedChar),
  });

  return (
    <div className="App">
      <p>
        Hovering over a character will prefetch it, and when it's been
        prefetched it will turn <strong>bold</strong>. Clicking on a prefetched
        character will show their stats below immediately.
      </p>
      <h2>Characters</h2>
      {charactersQuery.isPending ? (
        "Loading..."
      ) : (
        <>
          <ul>
            {charactersQuery.data?.results.map((char) => (
              <li
                key={char.id}
                onClick={() => {
                  setSelectedChar(char.id);
                }}
                onMouseEnter={async () => {
                  await queryClient.prefetchQuery({
                    queryKey: ["character", char.id],
                    queryFn: () => getCharacter(char.id),
                    staleTime: 10 * 1000,
                  });

                  setTimeout(() => {
                    rerender({});
                  }, 1);
                }}
              >
                <div
                  style={
                    queryClient.getQueryData(["character", char.id])
                      ? {
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  {char.id} - {char.name}
                </div>
              </li>
            ))}
          </ul>

          <h3>Selected Character</h3>
          {characterQuery.isPending ? (
            "Loading..."
          ) : (
            <>
              <pre>{JSON.stringify(characterQuery.data, null, 2)}</pre>
            </>
          )}
          <ReactQueryDevtools initialIsOpen />
        </>
      )}
    </div>
  );
}
```

---

### SolidJS Component to Display Single Post Details with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

The `Post` SolidJS component displays the detailed view of a single post. It uses the `createPost` hook to fetch data based on `props.postId` and employs `Switch` and `Match` for conditional rendering of loading, error, or data states. A 'Back' link is provided to return to the posts list.

```typescript
function Post(props: { postId: number; setPostId: Setter<number> }) {
  const state = createPost(props.postId);

  return (
    <div>
      <div>
        <a onClick={() => props.setPostId(-1)} href="#">
          Back
        </a>
      </div>
      <Switch>
        <Match when={!props.postId || state.status === "pending"}>
          Loading...
        </Match>
        <Match when={state.status === "error"}>
          <span>Error: {(state.error as Error).message}</span>
        </Match>
        <Match when={state.data !== undefined}>
          <>
            <h1>{state.data?.title}</h1>
            <div>
              <p>{state.data?.body}</p>
            </div>
            <div>{state.isFetching ? "Background Updating..." : " "}</div>
          </>
        </Match>
      </Switch>
    </div>
  );
}
```

---

### Create QueryClient in SvelteKit layout load function

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Initializes a QueryClient in the root layout's load function with server-side query execution disabled. The QueryClient instance is returned and made available to child routes, enabling prefetching on the server before sending data to the client.

```typescript
import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";

export async function load() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });

  return { queryClient };
}
```

---

### Implementing Dependent Queries with Lazy Loading in React and TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

This example demonstrates a common scenario where a component (`GraphFeedItem`) is lazy-loaded using `React.lazy` and its data is fetched via `useQuery` only when rendered. The `Feed` component fetches its primary data, then conditionally renders `GraphFeedItem`, leading to a request waterfall where the graph data fetch starts only after the component's JavaScript has loaded.

```tsx
const GraphFeedItem = React.lazy(() => import('./GraphFeedItem'))

function Feed() {
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

// GraphFeedItem.tsx
function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery({
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
```

---

### Setup mutation defaults and persist with dehydrate/hydrate

Source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

Demonstrates how to define mutation defaults with optimistic updates and error handling, then persist mutations to storage using dehydrate() and resume them with hydrate() and resumePausedMutations(). This pattern ensures mutations can survive application restarts.

```typescript
const queryClient = new QueryClient();

// Define the "addTodo" mutation
queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: addTodo,
  onMutate: async (variables, context) => {
    // Cancel current queries for the todos list
    await context.client.cancelQueries({ queryKey: ["todos"] });

    // Create optimistic todo
    const optimisticTodo = { id: uuid(), title: variables.title };

    // Add optimistic todo to todos list
    context.client.setQueryData(["todos"], (old) => [...old, optimisticTodo]);

    // Return a result with the optimistic todo
    return { optimisticTodo };
  },
  onSuccess: (result, variables, onMutateResult, context) => {
    // Replace optimistic todo in the todos list with the result
    context.client.setQueryData(["todos"], (old) =>
      old.map((todo) =>
        todo.id === onMutateResult.optimisticTodo.id ? result : todo
      )
    );
  },
  onError: (error, variables, onMutateResult, context) => {
    // Remove optimistic todo from the todos list
    context.client.setQueryData(["todos"], (old) =>
      old.filter((todo) => todo.id !== onMutateResult.optimisticTodo.id)
    );
  },
  retry: 3,
});

// Start mutation in some component:
const mutation = useMutation({ mutationKey: ["addTodo"] });
mutation.mutate({ title: "title" });

// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient);

// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state);

// Resume the paused mutations:
queryClient.resumePausedMutations();
```

---

### Initialize React App with TanStack Query and MSW Worker

Source: https://tanstack.com/query/latest/docs/framework/react/examples/offline

Sets up a React application entry point with TanStack Query, initializing MSW (Mock Service Worker) for API mocking and rendering the main App component. This enables offline functionality and request interception for testing and development purposes.

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./api";

worker.start();

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <div style={{ padding: "16px" }}>
    <App />
  </div>
);
```

---

### Main App Component with QueryClientProvider

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Root React component that wraps the application with QueryClientProvider to enable TanStack Query functionality. Manages post navigation state and conditionally renders either Posts list or individual Post component. Includes ReactQueryDevtools for debugging.

```TypeScript
function App() {
  const [postId, setPostId] = React.useState(-1)

  return (
    <QueryClientProvider client={queryClient}>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
```

---

### ReactQueryDevtools Component Integration

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

Integrates TanStack Query's DevTools component with initial open state. Provides debugging and monitoring capabilities for queries and mutations in development.

```jsx
<ReactQueryDevtools initialIsOpen />
```

---

### Install TanStack Query ESLint Plugin via npm/pnpm/yarn/bun

Source: https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query

Install the @tanstack/eslint-plugin-query package as a development dependency using your preferred package manager. The plugin is a separate package required for ESLint integration.

```bash
npm i -D @tanstack/eslint-plugin-query
```

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

```bash
yarn add -D @tanstack/eslint-plugin-query
```

```bash
bun add -D @tanstack/eslint-plugin-query
```

---

### Configure Angular Root Component for Auto-Refetching Example

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/auto-refetching

This Angular `AppComponent` serves as the root component for the application. It utilizes `ChangeDetectionStrategy.OnPush` for optimized performance and directly renders the `AutoRefetchingExampleComponent`, which presumably contains the core auto-refetching logic.

```ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AutoRefetchingExampleComponent } from "./components/auto-refetching.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root",
  template: `<auto-refetching-example />`,
  imports: [AutoRefetchingExampleComponent],
})
export class AppComponent {}
```

---

### Fetch Posts List with GraphQL and TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Custom hook that fetches all posts from a GraphQL API using the useQuery hook. Returns an array of posts with id and title. Implements automatic caching and can be refetched in the background.

```typescript
function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const {
        posts: { data },
      } = await request<{ posts: { data: Array<Post> } }>(
        endpoint,
        gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `
      );
      return data;
    },
  });
}
```

---

### Configure TypeScript for Nuxt 3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Extend the TypeScript configuration that is automatically generated by Nuxt 3. This allows proper type checking and IDE support for the project.

```typescript
{
  // https://v3.nuxtjs.org/concepts/typescript
  "extends": "./.nuxt/tsconfig.json"
}
```

---

### Infinite Query FetchNextPage Option Example

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/infinite-queries

Illustrates how to use the `cancelRefetch: false` option within `fetchNextPage` to allow simultaneous fetching for infinite queries, preventing potential data overwrites when fetching concurrently.

```jsx
<List
  onEndReached={() =>
    hasNextPage && !isFetching && fetchNextPage({ cancelRefetch: false })
  }
/>
```

---

### Fetch Todos with Filter using useQuery

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Todos component uses useQuery to fetch filtered todo lists based on filter state. Displays loading, error, and success states with retry functionality and background refresh indicators.

```typescript
function Todos({
  initialFilter = "",
  setEditingIndex,
}: {
  initialFilter: string;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [filter, setFilter] = React.useState(initialFilter);

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ["todos", { filter }],
    queryFn: fetchTodos,
  });

  return (
    <div>
      <div>
        <label>
          Filter:{" "}
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </label>
      </div>
      {status === "pending" ? (
        <span>Loading... (Attempt: {failureCount + 1})</span>
      ) : status === "error" ? (
        <span>
          Error: {error.message}
          <br />
          <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <>
          <ul>
            {data
              ? data.map((todo) => (
                  <li key={todo.id}>
                    {todo.name}{" "}
                    <button onClick={() => setEditingIndex(todo.id)}>
                      Edit
                    </button>
                  </li>
                ))
              : null}
          </ul>
          <div>
            {isFetching ? (
              <span>
                Background Refreshing... (Attempt: {failureCount + 1})
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
```

---

### Initialize QueryClient with SSR defaults in Next.js \_app

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

Sets up the QueryClient provider at the application root with default staleTime configuration to prevent unnecessary refetching immediately upon client hydration. This is the initial setup required for all Next.js pages router applications using server-side rendering with TanStack Query.

```typescript
// _app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

---

### useQuery with Function Arguments in Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/quick-start

Solid Query primitives require function arguments instead of object arguments for reactive tracking. This enables fine-grained reactivity in Solid's scope. The function wraps the configuration object to track it reactively.

```tsx
// ❌ react version
useQuery({
  queryKey: ["todos", todo],
  queryFn: fetchTodos,
});

// ✅ solid version
useQuery(() => ({
  queryKey: ["todos", todo],
  queryFn: fetchTodos,
}));
```

---

### Fetch GitHub Stats with Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/overview

This snippet demonstrates fetching GitHub repository statistics using Solid Query within a SolidJS application. It utilizes `useQuery` to manage data fetching, caching, and state. The example includes error handling with `ErrorBoundary` and loading states with `Suspense`, leveraging SolidJS's reactivity.

```tsx
import { ErrorBoundary, Suspense } from "solid-js";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";

function App() {
  const repositoryQuery = useQuery(() => ({
    queryKey: ["TanStack Query"],
    queryFn: async () => {
      const result = await fetch("https://api.github.com/repos/TanStack/query");
      if (!result.ok) throw new Error("Failed to fetch data");
      return result.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    throwOnError: true, // Throw an error if the query fails
  }));

  return (
    <div>
      <div>Static Content</div>
      {/* An error while fetching will be caught by the ErrorBoundary */}
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        {/* Suspense will trigger a loading state while the data is being fetched */}
        <Suspense fallback={<div>Loading...</div>}>
          {/* 
            The `data` property on a query is a SolidJS resource  
            so it will work with Suspense and transitions out of the box! 
          */}
          <div>{repositoryQuery.data?.updated_at}</div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const root = document.getElementById("root");
const client = new QueryClient();

render(
  () => (
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  ),
  root!
);
```

---

### useQuery Configuration - Initial and Placeholder Data

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Options for providing initial data and placeholder data to improve user experience during loading states.

````APIDOC
## useQuery Configuration - Initial and Placeholder Data

### Description
Provides mechanisms for setting initial query data and placeholder data during pending states.

### Configuration Parameters

#### initialData
- **Type**: `TData | () => TData`
- **Required**: No
- **Description**: Sets the initial data for the query cache
  - Used only if query hasn't been created or cached yet
  - If function provided, called **once** during shared/root query initialization
  - Function must synchronously return initialData
  - Considered stale by default unless `staleTime` is set
  - **Is persisted** to the cache

#### initialDataUpdatedAt
- **Type**: `number | (() => number | undefined)`
- **Required**: No
- **Description**: Sets the timestamp (in milliseconds) of when initialData was last updated
  - If function provided, called to dynamically compute the timestamp

#### placeholderData
- **Type**: `TData | (previousValue: TData | undefined, previousQuery: Query | undefined) => TData`
- **Required**: No
- **Description**: Provides placeholder data while query is in pending state
  - **Not persisted** to the cache
  - If function provided:
    - First argument: Previously watched query data (if available)
    - Second argument: Complete previous Query instance
  - Useful for optimistic UI updates

### Usage Example
```javascript
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  initialData: { name: 'Loading...', email: '' },
  initialDataUpdatedAt: Date.now()
})

const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  placeholderData: (previousData) => previousData || { name: 'Guest' }
})

// Shows previous data or fallback placeholder while loading
````

````

--------------------------------

### Git Ignore Configuration for Node.js and Nuxt

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Specify files and directories to exclude from version control for a Nuxt 3 project. Excludes node_modules, build artifacts, environment files, and lock files.

```text
node_modules
*.log
.nuxt
nuxt.d.ts
.output
.env
package-lock.json
yarn.lock
pnpm-lock.yaml
````

---

### Configure Vite Project Dependencies for React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

Package configuration specifying TanStack React Query and React Query Devtools as core dependencies, along with React, TypeScript, and Vite development tools. Enables a complete development environment for building Shadow DOM-compatible React applications.

```json
{
  "name": "@tanstack/query-example-react-shadow-dom",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.90.12",
    "@tanstack/react-query-devtools": "^5.91.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "5.8.3",
    "vite": "^6.3.6"
  }
}
```

---

### Configure Vite for React Development (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

The `vite.config.ts` file defines the build configuration for the React application using Vite. It imports and applies the official `@vitejs/plugin-react` to enable React-specific features like JSX transformation and fast refresh.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

---

### Define Project Dependencies and Scripts

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Configure npm/yarn scripts and project dependencies including TanStack Vue Query v5.90.2 and Nuxt v3.12.4. The package name is @tanstack/query-example-vue-nuxt3.

```json
{
  "name": "@tanstack/query-example-vue-nuxt3",
  "private": true,
  "scripts": {
    "dev": "nuxi dev",
    "_build": "nuxi build",
    "_start": "node .output/server/index.mjs"
  },
  "dependencies": {
    "@tanstack/vue-query": "^5.90.2"
  },
  "devDependencies": {
    "nuxt": "^3.12.4"
  }
}
```

---

### Check Current Focus State with FocusManager

Source: https://tanstack.com/query/latest/docs/reference/focusManager

Provides an example of how to retrieve the current focus state using the 'isFocused' method of the FocusManager.

```tsx
const isFocused = focusManager.isFocused();
```

---

### Configure TanStack Query in Angular Standalone Application

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/provideTanStackQuery

This example demonstrates how to integrate TanStack Query into an Angular standalone application using `bootstrapApplication`. It provides a new `QueryClient` instance to `provideTanStackQuery` as part of the application's root providers.

```ts
import {
  provideTanStackQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

bootstrapApplication(AppComponent, {
  providers: [provideTanStackQuery(new QueryClient())],
});
```

---

### Example of Global State after TanStack Query Integration

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/does-this-replace-client-state

This snippet demonstrates how the global state object can be simplified after migrating server-state to TanStack Query. It highlights the reduction in complexity by focusing on remaining client-only state.

```tsx
const globalState = {
  themeMode,
  sidebarStatus,
};
```

---

### Define Global Application Styles (CSS)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This CSS code defines global styles for the Svelte application, including font families, colors, layout for the body and app container, and styles for interactive elements like links and buttons. It also includes media queries for color scheme preferences.

```css
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
.card {
  padding: 2em;
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

---

### Prefetch data using initialData in SvelteKit load

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Demonstrates passing server-side loaded data to createQuery via the initialData option. The server load function fetches data and returns it, which is then provided to the query as initial cached data. This approach is minimal but requires prop-drilling if used in nested components.

```typescript
export async function load() {
  const posts = await getPosts();
  return { posts };
}
```

---

### Demonstrate Deterministic Hashing of TanStack Query Keys (Equal)

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-keys

Shows examples of query keys that are considered equal by TanStack Query's deterministic hashing, highlighting that the order of keys within objects does not affect uniqueness.

```tsx
useQuery(() => { queryKey: ['todos', { status, page }], ... })
useQuery(() => { queryKey: ['todos', { page, status }], ...})
useQuery(() => { queryKey: ['todos', { page, status, other: undefined }], ... })
```

---

### Basic Query Setup with injectQuery in Angular

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/queries

Demonstrates how to set up a basic query using injectQuery with a unique query key and a fetch function. This is the foundational pattern for all TanStack Query implementations, requiring a unique key for caching and refetching, and a function that returns a promise or observable.

```typescript
import { injectQuery } from "@tanstack/angular-query-experimental";

export class TodosComponent {
  info = injectQuery(() => ({ queryKey: ["todos"], queryFn: fetchTodoList }));
}
```

---

### Fetch and Display Data with Reactive Query in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

Demonstrates a Svelte component using TanStack Query to fetch GitHub repository data. Handles loading, error, and success states reactively, displaying repository statistics including subscribers, stars, and forks. Uses conditional rendering to show appropriate UI based on query status.

```svelte
# Simple
{#if query.isPending}
  Loading...
{/if}

{#if query.error}
  An error has occurred: {query.error.message}
{/if}

{#if query.isSuccess}
  # {query.data.full_name}
  {query.data.description}
  **👀 {query.data.subscribers_count}**{' '}
  **✨ {query.data.stargazers_count}**{' '}
  **🍴 {query.data.forks_count}**
{/if}
```

---

### Clear All Button with TanStack Query Mutation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

Implements a button that triggers the clearMutation from TanStack Query when clicked. Provides functionality to clear all todos from the list.

```jsx
<button
  onClick={() => {
    clearMutation.mutate();
  }}
>
  Clear All
</button>
```

---

### Prepopulate Query with initialData

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Basic example of using the initialData option to prepopulate a query's cache. The initialData is persisted to the cache and skips the initial loading state. This approach treats the provided data as fresh data.

```typescript
result = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: initialTodos,
}));
```

---

### useInfiniteQuery Hook Usage Pattern

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery

Demonstrates the basic setup of useInfiniteQuery hook with destructured return values and configuration options. The hook handles infinite scrolling with next/previous page navigation, page parameters, and pagination state tracking. Requires queryFn, initialPageParam, getNextPageParam, and getPreviousPageParam to be configured.

```typescript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
});
```

---

### GET /queryClient/mutationCache

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Retrieves the mutation cache instance connected to the `queryClient`. This allows direct access to the cache for inspecting or managing ongoing mutations.

````APIDOC
## GET /queryClient/mutationCache

### Description
This method returns the mutation cache instance that the `queryClient` is currently connected to. It allows direct access to the cache for inspection or advanced operations related to mutations.

### Method
Client Method (Conceptual GET operation for retrieval)

### Endpoint
/queryClient/mutationCache

### Parameters
This method does not accept any parameters.

#### Path Parameters
None

#### Query Parameters
None

#### Request Body
This method does not require a request body.

### Request Example
```tsx
const mutationCache = queryClient.getMutationCache()
````

### Response

#### Success Response (Conceptual 200)

- **mutationCache** (MutationCache) - The MutationCache instance connected to the client, allowing programmatic access to cached mutations.

#### Response Example

```typescript
// Represents the returned MutationCache instance.
// The exact structure of MutationCache is internal to TanStack Query,
// but it contains data and configuration related to mutations.
// Example (simplified):
// {
//   "mutations": [ /* array of Mutation objects */ ],
//   "config": { /* cache configuration */ }
// }
```

````

--------------------------------

### Create QueryClient and Setup QueryClientProvider in Next.js Pages Router

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

Initialize a QueryClient instance within React state in the _app.tsx file to ensure each request has its own isolated cache, preventing data sharing between users. Configure default query options like staleTime to optimize server-side rendering behavior. Wrap the application with QueryClientProvider to make the client available to all child components.

```typescript
// _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// NEVER DO THIS:
// const queryClient = new QueryClient()
//
// Creating the queryClient at the file root level makes the cache shared
// between all requests and means _all_ data gets passed to _all_ users.
// Besides being bad for performance, this also leaks any sensitive data.

export default function MyApp({ Component, pageProps }) {
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
````

---

### useMutation Hook Configuration

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useMutation

Configuration parameters for the useMutation hook, including metadata storage and custom QueryClient setup. These parameters control how mutations are initialized and managed within the TanStack Query system.

````APIDOC
## useMutation Hook Configuration

### Description
Configures the useMutation hook with optional metadata and custom QueryClient instance.

### Parameters

#### meta (Record<string, unknown>)
- **Type**: `Record<string, unknown>`
- **Required**: No
- **Description**: Stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever the mutation is available (e.g., `onError`, `onSuccess` functions of the `MutationCache`).

#### queryClient (QueryClient)
- **Type**: `QueryClient`
- **Required**: No
- **Description**: Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

### Configuration Example
```javascript
const mutation = useMutation({
  mutationFn: async (variables) => {
    // mutation logic
  },
  meta: {
    customKey: "customValue"
  },
  queryClient: customQueryClientInstance
});
````

````

--------------------------------

### Edit Todo with useQuery and useMutation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

EditTodo component fetches individual todo data using useQuery and updates it with useMutation. Automatically invalidates related queries on successful save and manages local state synchronization.

```typescript
function EditTodo({
  editingIndex,
  setEditingIndex,
}: {
  editingIndex: number
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>
}) {
  const queryClient = useQueryClient()

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ['todo', { id: editingIndex }],
    queryFn: () => fetchTodoById({ id: editingIndex }),
  })

  const [todo, setTodo] = React.useState(data || {})

  React.useEffect(() => {
    if (editingIndex !== null && data) {
      setTodo(data)
    } else {
      setTodo({})
    }
  }, [data, editingIndex])

  const saveMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.setQueryData(['todo', { id: editingIndex }], data)
    },
  })

  const onSave = () => {
    saveMutation.mutate(todo)
  }

  const disableEditSave =
    status === 'pending' || saveMutation.status === 'pending'

  return (
    <div>
      <div>
        {data ? (
          <>
            <button onClick={() => setEditingIndex(null)}>Back</button> Editing
            Todo "{data.name}" (#
            {editingIndex})
          </>
        ) : null}
      </div>
      {status === 'pending' ? (
        <span>Loading... (Attempt: {failureCount + 1})</span>
      ) : error ? (
        <span>
          Error! <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <>
          <label>
            Name:{' '}
            <input
              value={todo.name}
              onChange={(e) =>
                e.persist() ||
                setTodo((old) => ({ ...old, name: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>
          <label>
            Notes:{' '}
            <input
              value={todo.notes}
              onChange={(e) =>
                e.persist()
            />
          </label>
        </>
      )}
    </div>
  )
}
````

---

### Example of Global State before TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/does-this-replace-client-state

This snippet illustrates a typical global state object that includes server-state items managed by a client-state library. It shows the potential for redundancy when client-state managers handle asynchronous data.

```tsx
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
};
```

---

### Initialize Full QueryClient Persistence

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

Combines cache restoration and subscription in one call. Immediately restores any persisted cache and subscribes to future changes, returning an unsubscribe function. This is the recommended approach for complete persistence setup.

```typescript
persistQueryClient({
  queryClient,
  persister,
  maxAge = 1000 * 60 * 60 * 24, // 24 hours
  buster = "",
  hydrateOptions = undefined,
  dehydrateOptions = undefined,
});
```

---

### Prefetch Data with initialData in Remix

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

Use a Remix loader function to fetch data on the server and access it client-side with useLoaderData, then pass this data to useQuery via the initialData option. This pattern provides a minimal setup for prefetching but shares the same limitations as the Next.js initialData approach.

```typescript
export async function loader() {
  const posts = await getPosts();
  return json({ posts });
}

function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: posts,
  });

  // ...
}
```

---

### Create QueryClient and Setup QueryClientProvider in Remix

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

Initialize a QueryClient instance within React state in the root.tsx file to maintain separate cache instances per request in Remix applications. Configure default query options like staleTime for optimal server-side rendering. Wrap the application with QueryClientProvider and render the Outlet component for nested routes.

```typescript
// app/root.tsx
import { Outlet } from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyApp() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
```

---

### Show Global Background Fetching Loading State (TypeScript/JSX)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators

This example shows how to use the `useIsFetching` hook to display a global loading indicator whenever any queries are fetching in the background. This is useful for providing a consistent loading experience across the application.

```tsx
import { useIsFetching } from "@tanstack/react-query";

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null;
}
```

---

### Create Single Post Query with Conditional Fetching

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic-graphql-request

Defines createPost() hook that fetches individual post details by ID. Uses enabled option to conditionally execute the query only when postId is available. Demonstrates dependent queries in TanStack Query.

```typescript
function createPost(postId: Accessor<number>) {
  return useQuery(() => ({
    queryKey: ["post", postId()],
    queryFn: async () => {
      const { post } = await request<{ post: Post }>(
        endpoint,
        gql`
        query {
          post(id: ${postId()}) {
            id
            title
            body
          }
        }
        `
      );

      return post;
    },
    enabled: !!postId(),
  }));
}
```

---

### Define Nuxt 3 Configuration

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Configure Nuxt 3 application settings using the defineNuxtConfig function. This file extends the auto-generated TypeScript configuration from .nuxt/tsconfig.json.

```typescript
import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({});
```

---

### Vite Configuration for React Projects (vite.config.ts)

Source: https://tanstack.com/query/latest/docs/framework/react/examples/simple

Defines the build configuration for a Vite project, specifically integrating the React plugin. This setup enables Vite to correctly process and bundle React components for development and production environments.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

---

### Monitor Fetching Queries with useIsFetching (TanStack React Query)

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useIsFetching

This snippet demonstrates how to use the `useIsFetching` hook from `@tanstack/react-query` to obtain the count of queries currently in a fetching state. It shows two common use cases: getting a global count of all fetching queries and getting a filtered count for queries matching a specific `queryKey` like 'posts'.

```tsx
import { useIsFetching } from "@tanstack/react-query";
// How many queries are fetching?
const isFetching = useIsFetching();
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ["posts"] });
```

---

### Implement Infinite Scroll with useInfiniteQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll

Configures the useInfiniteQuery hook to fetch paginated data with cursor-based pagination. Defines query key, fetch function with cursor parameter, initial page parameter, and page boundary functions for previous/next page detection.

```typescript
const {
  status,
  data,
  error,
  isFetching,
  isFetchingNextPage,
  isFetchingPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
} = useInfiniteQuery({
  queryKey: ["projects"],
  queryFn: async ({
    pageParam,
  }): Promise<{
    data: Array<{ name: string; id: number }>;
    previousId: number;
    nextId: number;
  }> => {
    const response = await fetch(`/api/projects?cursor=${pageParam}`);
    return await response.json();
  },
  initialPageParam: 0,
  getPreviousPageParam: (firstPage) => firstPage.previousId,
  getNextPageParam: (lastPage) => lastPage.nextId,
});
```

---

### GET /queryClient/queryCache

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Retrieves the query cache instance connected to the `queryClient`. This allows direct access to the cache for inspection or advanced operations.

````APIDOC
## GET /queryClient/queryCache

### Description
This method returns the query cache instance that the `queryClient` is currently connected to. It allows direct access to the cache for inspection or advanced operations.

### Method
Client Method (Conceptual GET operation for retrieval)

### Endpoint
/queryClient/queryCache

### Parameters
This method does not accept any parameters.

#### Path Parameters
None

#### Query Parameters
None

#### Request Body
This method does not require a request body.

### Request Example
```tsx
const queryCache = queryClient.getQueryCache()
````

### Response

#### Success Response (Conceptual 200)

- **queryCache** (QueryCache) - The QueryCache instance connected to the client, allowing programmatic access to cached queries.

#### Response Example

```typescript
// Represents the returned QueryCache instance.
// The exact structure of QueryCache is internal to TanStack Query,
// but it contains data and configuration related to queries.
// Example (simplified):
// {
//   "queries": [ /* array of Query objects */ ],
//   "config": { /* cache configuration */ }
// }
```

````

--------------------------------

### Render Infinite Scroll UI with Loading States

Source: https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll

Displays paginated data with status handling (pending, error, success), load more buttons with loading indicators, and renders all page items. Includes visual styling and navigation links between pages.

```typescript
return (
  <div>
    <h1>Infinite Loading</h1>
    {status === 'pending' ? (
      <p>Loading...</p>
    ) : status === 'error' ? (
      <span>Error: {error.message}</span>
    ) : (
      <>
        <div>
          <button
            onClick={() => fetchPreviousPage()}
            disabled={!hasPreviousPage || isFetchingPreviousPage}
          >
            {isFetchingPreviousPage
              ? 'Loading more...'
              : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
          </button>
        </div>
        {data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((project) => (
              <p
                style={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '10rem 1rem',
                  background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                }}
                key={project.id}
              >
                {project.name}
              </p>
            ))}
          </React.Fragment>
        ))}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage
            ? 'Background Updating...'
            : null}
        </div>
      </>
    )}
    <hr />
    <Link href="/about">Go to another page</Link>
  </div>
)
````

---

### SolidJS Infinite Query Hook Implementation

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/infinite-queries

An example of using `useInfiniteQuery` from TanStack Query in a SolidJS component to fetch and display paginated project data. It handles loading states, errors, and implements a 'Load More' button.

```jsx
import { useInfiniteQuery } from '@tanstack/solid-query'

function Projects() {
  const fetchProjects = async ({ pageParam }) => {
    const res = await fetch('/api/projects?cursor=' + pageParam)
    return res.json()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(() => {
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

```

---

### Create usePost Hook for Single Post Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Custom React hook using useQuery to fetch a single post by ID with conditional enabling based on postId validity. Caches individual post data with unique query keys for efficient lookups.

```typescript
function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}
```

---

### Display Individual Post Details with React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

React component that displays full post details (title and body) fetched from GraphQL. Shows loading and error states, includes background update indicator, and provides navigation back to the posts list.

```typescript
function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}
```

---

### Use Function as initialData

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Example using a function as the initialData value. The function executes only once during query initialization, saving memory and CPU resources for expensive data access operations.

```typescript
result = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: () => getExpensiveTodos(),
}));
```

---

### Get Mutation Cache - TanStack Query

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Returns the mutation cache instance that the client is connected to. Provides access to the mutation cache for managing and inspecting mutation state.

```tsx
const mutationCache = queryClient.getMutationCache();
```

---

### Fetch Single Post by ID

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Async function that fetches a single post by ID from JSONPlaceholder API. Returns a typed Post object and handles JSON parsing for individual post detail views.

```typescript
const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await response.json();
};
```

---

### Prefetch Dependent Queries in Server-Side Loaders

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

This example demonstrates how to prefetch dependent queries in a server-side loader function (like Remix's `loader` or Next.js' `getServerSideProps`). It first fetches the `user` and then conditionally prefetches `projects` based on the `userId`. The `dehydratedState` is then returned for client-side hydration. Dependencies: `@tanstack/react-query`.

```tsx
// For Remix, rename this to loader instead
export async function getServerSideProps() {
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user", email],
    queryFn: getUserByEmail,
  });

  if (user?.userId) {
    await queryClient.prefetchQuery({
      queryKey: ["projects", userId],
      queryFn: getProjectsByUser,
    });
  }

  // For Remix:
  // return json({ dehydratedState: dehydrate(queryClient) })
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
```

---

### Configure Default Options for React QueryClient in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-3

This example shows how to set global `defaultOptions` for all queries and mutations when initializing the `QueryClient`. This approach centralizes common configuration, ensuring consistent behavior across your application without needing to repeat options for every individual hook or query.

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
    },
    mutations: {
      // mutation options
    },
  },
});
```

---

### Handle Mutation Settled State with useMutation (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

This example shows how to use the `onSettled` function within `useMutation` to handle logic after a mutation has completed, whether it succeeded or failed. This can be used as an alternative to separate `onError` and `onSuccess` handlers.

```tsx
useMutation({
  mutationFn: updateTodo,
  // ...
  onSettled: async (newTodo, error, variables, onMutateResult, context) => {
    if (error) {
      // do something
    }
  },
});
```

---

### Configure TanStack Query in Angular NgModule-based Application

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/provideTanStackQuery

This example shows how to set up TanStack Query in an Angular NgModule-based application. The `provideTanStackQuery` function, instantiated with a new `QueryClient`, is included in the `providers` array of the `@NgModule` decorator.

```ts
import {
  provideTanStackQuery,
  QueryClient,
} from "@tanstack/angular-query-experimental";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideTanStackQuery(new QueryClient())],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

### Configure TypeScript Compiler Options for Svelte (tsconfig.json)

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/simple

This TypeScript configuration extends the Svelte TypeScript preset and sets specific compiler options for the project. It ensures proper type checking and module resolution for Svelte components and other TypeScript files.

```json
{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    /**
     * Typecheck JS in `.svelte` and `.js` files by default.
     * Disable checkJs if you'd like to use dynamic types in JS.
     * Note that setting allowJs false does not prevent the use
     * of JS in `.svelte` files.
     */
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  },
  "include": [
    "src/**/*.d.ts",
    "src/**/*.ts",
    "src/**/*.js",
    "src/**/*.svelte",
    "vite.config.ts"
  ]
}
```

---

### queryCache.clear

Source: https://tanstack.com/query/latest/docs/reference/QueryCache

Clear the entire query cache and start fresh. Removes all stored queries, data, and state from the cache.

````APIDOC
## queryCache.clear

### Description
Clears the entire query cache, removing all stored queries, data, and state. This allows starting with a fresh cache.

### Method
Mutation

### Syntax
```tsx
queryCache.clear()
````

### Parameters

None

### Request Example

```tsx
queryCache.clear();
```

### Response

- No return value

### Effects

- All queries are removed from the cache
- All cached data is deleted
- Cache state is reset to empty

````

--------------------------------

### Demonstrate Deterministic Hashing of TanStack Query Keys (Unequal)

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-keys

Provides examples of query keys that are considered unequal, emphasizing that the order of items within the top-level query key array *does* matter for uniqueness.

```tsx
useQuery(() => { queryKey: ['todos', status, page], ... })
useQuery(() => { queryKey: ['todos', page, status], ...})
useQuery(() => { queryKey: ['todos', undefined, page, status], ...})
````

---

### Configure initialData with Custom staleTime

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Example demonstrating initialData with a staleTime of 1000ms. Data is considered fresh for 1 second after initialization and won't refetch until an interaction event occurs after that period.

```typescript
// Show initialTodos immediately, but won't refetch until
// another interaction event is encountered after 1000 ms
result = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: initialTodos,
  staleTime: 1000,
}));
```

---

### Initialize Query Client and Manage Todo Views in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/playground

This Svelte component initializes the TanStack Query client and manages multiple todo list views with editing and filtering capabilities. It uses reactive stores to track active views and editing state, provides cache invalidation via queryClient.invalidateQueries(), and dynamically renders TodosList components with different filters. The component also conditionally displays an EditTodo form when an item is being edited.

```Svelte
<script lang="ts">
  import { useQueryClient } from '@tanstack/svelte-query'
  import TodosList from './TodosList.svelte'
  import EditTodo from './EditTodo.svelte'
  import AddTodo from './AddTodo.svelte'
  import { views, editingIndex } from '../lib/stores.svelte'

  const queryClient = useQueryClient()
</script>

<div>
  <div>
    <button onclick={() => queryClient.invalidateQueries()}>
      Force Refetch All
    </button>
  </div>
  <br />
  <hr />

  {#each views.value as view}
    <div>
      <TodosList initialFilter={view} />
      <br />
    </div>
  {/each}

  <button
    onclick={() => {
      views.value.push('')
    }}
  >
    Add Filter List
  </button>
  <hr />

  {#if editingIndex.value !== null}
    <EditTodo />
    <hr />
  {/if}

  <AddTodo />
</div>
```

---

### Get Query Cache - TanStack Query

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Returns the query cache instance that the client is connected to. This allows direct access to the query cache for advanced cache manipulation and inspection.

```tsx
const queryCache = queryClient.getQueryCache();
```

---

### Trigger Infinite Query on Viewport Visibility

Source: https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll

Uses react-intersection-observer to detect when the load button enters the viewport and automatically triggers fetchNextPage. Prevents duplicate requests by checking isFetchingNextPage and hasNextPage conditions.

```typescript
const { ref, inView } = useInView();

React.useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
```

---

### Derive initialData from Cached Query Results

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Example showing how to retrieve initial data from the cached result of another query. Demonstrates searching a todos list cache for an individual todo item to use as initial data.

```typescript
result = injectQuery(() => ({
  queryKey: ["todo", this.todoId()],
  queryFn: () => fetch("/todos"),
  initialData: () => {
    // Use a todo from the 'todos' query as the initial data for this todo query
    return this.queryClient
      .getQueryData(["todos"])
      ?.find((d) => d.id === this.todoId());
  },
}));
```

---

### Simulate Fetching All Todos with Delay and Error in JavaScript

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

The `fetchTodos` function simulates an asynchronous API call to retrieve a list of todo items. It introduces an artificial network delay and a configurable random error rate. It also demonstrates handling `AbortSignal` for request cancellation and filters todos based on a provided `filter` parameter.

```javascript
function fetchTodos({ signal, queryKey: [, { filter }] }): Promise<Todos> {
  console.info("fetchTodos", { filter });

  if (signal) {
    signal.addEventListener("abort", () => {
      console.info("cancelled", filter);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        return reject(
          new Error(JSON.stringify({ fetchTodos: { filter } }, null, 2))
        );
      }
      resolve(list.filter((d) => d.name.includes(filter)));
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
```

---

### UI-Driven Optimistic Updates with useMutation

Source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

This example demonstrates updating the UI optimistically by leveraging the `variables` returned by `useMutation`. It shows how to display a pending item and handle error states, allowing for potential retries. This approach is suitable when the mutation and query reside in the same component.

```tsx
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post("/api/data", { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
});

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation;
```

```tsx
<ul>
  {todoQuery.items.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
  {isPending && <li style={{ opacity: 0.5 }}>{variables}</li>}
</ul>
```

```tsx
{
  isError && (
    <li style={{ color: "red" }}>
      {variables}
      <button onClick={() => mutate(variables)}>Retry</button>
    </li>
  );
}
```

---

### useQuery Hook with Caching - TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/caching

Demonstrates basic useQuery hook usage for fetching and caching todos. The hook automatically manages data caching based on query keys, handles background refetching, and maintains cache state across multiple component instances. Default behavior uses staleTime of 0 (immediately stale) and gcTime of 5 minutes.

```javascript
useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
```

---

### Clear MutationCache

Source: https://tanstack.com/query/latest/docs/reference/MutationCache

Demonstrates the usage of the `clear` method on the MutationCache to remove all mutations from the cache, effectively resetting it. This can be useful for cleanup operations or when starting a new state.

```tsx
mutationCache.clear();
```

---

### Prefetch and Fetch Data using React QueryClient in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-3

This example illustrates how to `prefetchQuery` to load data into the cache for future use without immediately returning it, and how to `fetchQuery` to actively retrieve and return data from a query, including basic error handling. Both methods directly interact with the `QueryClient` for data management.

```tsx
// Prefetch a query:
await queryClient.prefetchQuery("posts", fetchPosts);

// Fetch a query:
try {
  const data = await queryClient.fetchQuery("posts", fetchPosts);
} catch (error) {
  // Error handling
}
```

---

### Prefetch query on server using prefetchQuery in SvelteKit

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Uses queryClient.prefetchQuery to fetch and cache data on the server before sending HTML to the browser. Retrieves the QueryClient from parent load context and uses SvelteKit's fetch function for proper data loading. This approach ensures cached data is immediately available client-side.

```typescript
export async function load({ parent, fetch }) {
  const { queryClient } = await parent();

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => (await fetch("/api/posts")).json(),
  });
}
```

---

### Fetching Multiple Queries with useQueries (TanStack Query)

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useQueries

Demonstrates how to use the `useQueries` hook to fetch multiple queries in parallel. It takes an array of query configuration objects, each similar to `useQuery` options, and returns an array of results in the same order as the input queries.

```tsx
const ids = [1, 2, 3];
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
});
```

---

### Integrate useQuery with SolidJS Suspense and ErrorBoundary

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useQuery

This example demonstrates how `useQuery` can integrate seamlessly with SolidJS's `Suspense` and `ErrorBoundary` components for declarative loading and error handling. By setting `throwOnError: true`, `useQuery` will throw errors that are caught by `ErrorBoundary` and suspend when loading, which `Suspense` can then handle with a fallback UI.

```tsx
import { useQuery } from "@tanstack/solid-query";

function App() {
  const todos = useQuery(() => ({
    queryKey: "todos",
    queryFn: async () => {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
    throwOnError: true,
  }));

  return (
    <ErrorBoundary fallback={<div>Error: {todos.error.message}</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div>Todos:</div>
          <ul>
            <For each={todos.data}>{(todo) => <li>{todo.title}</li>}</For>
          </ul>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

### Vue Infinite Query Example with useInfiniteQuery

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/infinite-queries

Implements an infinite scrolling list using Vue.js and TanStack Query's `useInfiniteQuery`. It defines a fetch function, configures `useInfiniteQuery` with `getNextPageParam`, and provides a UI to display data and fetch more.

```vue
<script setup>
import { useInfiniteQuery } from "@tanstack/vue-query";

const fetchProjects = async ({ pageParam = 0 }) => {
  const res = await fetch("/api/projects?cursor=" + pageParam);
  return res.json();
};

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
} = useInfiniteQuery({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
</script>

<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <div v-else-if="data">
    <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
    <ul v-for="(group, index) in data.pages" :key="index">
      <li v-for="project in group.projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
    <button
      @click="() => fetchNextPage()"
      :disabled="!hasNextPage || isFetchingNextPage"
    >
      <span v-if="isFetchingNextPage">Loading more...</span>
      <span v-else-if="hasNextPage">Load More</span>
      <span v-else>Nothing more to load</span>
    </button>
  </div>
</template>
```

---

### Post a Todo Item in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This function simulates creating a new todo item. It accepts an object with `name` and `notes` properties, simulates an API post request with `setTimeout`, and handles potential errors based on the `errorRate`. Upon success, it resolves with the newly created todo object.

```typescript
function postTodo({ name, notes }: Omit<Todo, "id">) {
  console.info("postTodo", { name, notes });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        return reject(
          new Error(JSON.stringify({ postTodo: { name, notes } }, null, 2))
        );
      }
      const todo = { name, notes, id: id++ };
      list = [...list, todo];
      resolve(todo);
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
```

---

### Force Refetch All Queries

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Invalidates all queries in the cache, triggering a complete refetch of all active queries. Useful for manual refresh operations or when external data changes require a full cache update.

```typescript
queryClient.invalidateQueries();
```

---

### Create a New Svelte Project using npm

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/auto-refetching

These `npm` commands initialize a new Svelte project. Users can create a project in the current directory or specify a new directory name, leveraging `create-svelte` for scaffolding.

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

---

### Define Post Type in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic

Defines the TypeScript interface for a Post object with id, title, and body properties. This type ensures type safety throughout the application when working with post data.

```typescript
type Post = {
  id: number;
  title: string;
  body: string;
};
```

---

### Configure initialData with Default staleTime

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Example showing initialData with default staleTime of 0, which causes immediate refetch. The query shows initial data immediately but refetches when a component or service instance is created.

```typescript
// Will show initialTodos immediately, but also immediately refetch todos
// when an instance of the component or service is created
result = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: initialTodos,
}));
```

---

### Global Stylesheet for React Application (CSS)

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

This stylesheet defines the application's global visual appearance, including font settings, color schemes, link styles, and button aesthetics. It incorporates media queries for responsive light/dark mode adjustments.

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

---

### Show Individual Query Background Fetching State (TypeScript/JSX)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators

This example demonstrates how to use the `isFetching` boolean from `useQuery` to show a 'Refreshing...' indicator when a specific query is being refetched in the background. It differentiates between initial loading and background refetching.

```tsx
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return status === "pending" ? (
    <span>Loading...</span>
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  );
}
```

---

### Parallelizing Multiple Suspense Queries with `useSuspenseQueries` in React

Source: https://tanstack.com/query/latest/docs/framework/react/guides/request-waterfalls

This TypeScript/TSX example shows the recommended approach for fetching multiple suspenseful queries concurrently using the `useSuspenseQueries` hook. By providing an array of query configurations, all queries are executed in parallel, eliminating serial roundtrips and improving the perceived performance of the application.

```tsx
const [usersQuery, teamsQuery, projectsQuery] = useSuspenseQueries({
  queries: [
    { queryKey: ["users"], queryFn: fetchUsers },
    { queryKey: ["teams"], queryFn: fetchTeams },
    { queryKey: ["projects"], queryFn: fetchProjects },
  ],
});
```

---

### Define Angular App Component with Router

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/router

Creates a root Angular component using OnPush change detection strategy and imports RouterOutlet for dynamic route rendering. This component serves as the main application entry point and handles navigation through the router outlet.

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

---

### Fetch Single Todo by ID with useQuery

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Fetches a single todo item by its ID using useQuery. The query only attempts to run when editingIndex is truthy, preventing unnecessary queries. Provides full query state management including loading, error, and retry functionality.

```typescript
const { status, data, isFetching, error, failureCount, refetch } = useQuery({
  queryKey: ["todo", { id: editingIndex }],
  queryFn: () => fetchTodoById({ id: editingIndex }),
});
```

---

### Get Default Options for Specific Mutations in TanStack Query (TypeScript)

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

The `getMutationDefaults` method retrieves the default options that have been configured for mutations associated with a specific mutation key. This allows inspection of the pre-set configurations for particular mutation types.

```tsx
const defaultOptions = queryClient.getMutationDefaults(["addPost"]);
```

---

### Configure TanStack Query Client `gcTime` for Caching

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

This configuration sets the `gcTime` property for the TanStack Query client. It defines the duration (24 hours in this case) for which unused cached data remains in memory before being garbage collected, optimizing memory usage while maintaining fast access to recently fetched data.

```typescript
gcTime: 1000 * 60 * 60 * 24;
```

---

### Fetch Todos Data with useQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Uses the useQuery hook to fetch a list of todos with optional filtering. Returns query status, data, loading states, error information, and failure count. The query is automatically refetched based on staleTime settings and includes retry logic with configurable error rates.

```typescript
const { status, data, isFetching, error, failureCount, refetch } = useQuery({
  queryKey: ["todos", { filter }],
  queryFn: fetchTodos,
});
```

---

### Invalidate All or Prefix-Matched Queries in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-invalidation

Demonstrates how to invalidate all queries currently in the cache or specifically invalidate queries whose keys start with a given prefix, such as 'todos', using `queryClient.invalidateQueries()`.

```tsx
// Invalidate every query in the cache
queryClient.invalidateQueries();
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ["todos"] });
```

---

### Display TanStack Query Data with JSON Formatting in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/prefetching

This React JSX snippet handles the display of fetched data from a TanStack Query. It conditionally renders 'Loading...' if `characterQuery.isPending` is true. Once data is available, it's displayed within a `<pre>` tag, formatted with `JSON.stringify` for readability with a 2-space indentation.

```javascript
characterQuery.isPending ? (
  "Loading..."
) : (
  <>
    <pre>{JSON.stringify(characterQuery.data, null, 2)}</pre>
  </>
);
```

---

### Configure TanStack Query staleTime

Source: https://tanstack.com/query/latest/docs/framework/react/examples/prefetching

This snippet defines the `staleTime` property, commonly used within TanStack Query configurations (e.g., `useQuery` or `prefetchQuery`). It specifies that data should be considered fresh for 10 seconds (10,000 milliseconds), influencing when background refetches occur.

```javascript
staleTime: 10 * 1000, // only prefetch if older than 10 seconds
```

---

### Implement React Infinite Query with TanStack Query and Max Pages

Source: https://tanstack.com/query/latest/docs/framework/react/examples/infinite-query-with-max-pages

This React component utilizes `useInfiniteQuery` from `@tanstack/react-query` to fetch and display a paginated list of 'projects'. It supports both loading next and previous pages based on a cursor, and enforces a maximum of 3 loaded pages using the `maxPages` configuration. The component handles loading states, errors, and provides buttons for navigation.

```tsx
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/projects?cursor=${pageParam}`);
      return await response.json();
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    maxPages: 3,
  });

  return (
    <div>
      <h1>Infinite Query with max pages</h1>
      <h3>4 projects per page</h3>
      <h3>3 pages max</h3>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.data.map((project) => (
                <p
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "8px",
                    fontSize: "14px",
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.name}
                </p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
      <hr />
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
```

---

### Fetch Single Post by ID using TanStack Query in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/basic

This snippet defines a helper function `getPostById` to fetch a single post from the API. The `createPost` SolidJS hook then uses `useQuery` with `['post', postId]` as its `queryKey` and `getPostById` as its `queryFn`. The `enabled` option ensures the query only runs when `postId` is a valid (truthy) value.

```typescript
const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await response.json();
};

function createPost(postId: number) {
  return useQuery(() => ({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  }));
}
```

---

### Basic Usage of createAsyncStoragePersister with React Native AsyncStorage

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister

Demonstrates how to set up TanStack Query with `createAsyncStoragePersister` using React Native's `AsyncStorage`. It shows importing required components, initializing `QueryClient` and the persister, and wrapping the application with `PersistQueryClientProvider` for cache persistence.

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const Root = () => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister: asyncStoragePersister }}
  >
    <App />
  </PersistQueryClientProvider>
);

export default Root;
```

---

### Implement Multi-View Query Management with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Demonstrates managing multiple filtered query views simultaneously using useQuery with queryKey arrays that include filter parameters. Provides functionality to add/remove filter views dynamically and force refetch all queries using queryClient.invalidateQueries(). Manages editing state across multiple todo lists in a single component.

```typescript
function App() {
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [views, setViews] = React.useState(["", "fruit", "grape"]);

  return (
    <div className="App">
      <div>
        <button onClick={() => queryClient.invalidateQueries()}>
          Force Refetch All
        </button>
      </div>
      <br />
      <hr />
      {views.map((view, index) => (
        <div key={index}>
          <Todos
            initialFilter={view}
            setEditingIndex={setEditingIndex}
            onRemove={() => {
              setViews((old) => [...old, ""]);
            }}
          />
          <br />
        </div>
      ))}
      <button
        onClick={() => {
          setViews((old) => [...old, ""]);
        }}
      >
        Add Filter List
      </button>
      <hr />
      {editingIndex !== null ? (
        <>
          <EditTodo
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
          <hr />
        </>
      ) : null}
      <AddTodo />
    </div>
  );
}
```

---

### useMutationState - Access Latest Mutation Data

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useMutationState

Retrieve the most recent mutation data for a specific mutation key. Each invocation of mutate adds a new entry to the cache, and this example demonstrates accessing the latest one.

```APIDOC
## useMutationState - Latest Mutation Data

### Description
Access the latest mutation data from a series of mutation invocations by filtering on mutationKey and selecting the last array element.

### Hook Signature
```

useMutationState(options: UseMutationStateOptions) => Array<TResult>

````

### Parameters
#### Options
- **filters.mutationKey** (string[] | Array) - Required - The mutation key to identify target mutations
- **select** ((mutation: Mutation) => TResult) - Optional - Transform function to extract mutation state
- **queryClient** (QueryClient) - Optional - Custom QueryClient instance

### Request Example
```tsx
import { useMutation, useMutationState } from '@tanstack/vue-query'

const mutationKey = ['posts']

const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState({
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})

// Latest mutation data
const latest = data[data.length - 1]
````

### Response

#### Success Response

- **TResult** (Any) - The transformed state of the most recent mutation invocation
- **gcTime** (milliseconds) - Duration each mutation entry persists in cache before removal

#### Response Example

```tsx
// latest contains only the most recent mutation response
{ id: 5, title: 'Most Recent Post', createdAt: '2024-01-15T12:30:00Z' }
```

````

--------------------------------

### Manage TanStack Query Mutations with Filters

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/filters

Illustrates using MutationFilters to manage mutations. Examples include checking the number of all fetching mutations, filtering mutations by `mutationKey`, and filtering mutations using a `predicate` function to match specific mutation states.

```typescript
await queryClient.isMutating()

await queryClient.isMutating({ mutationKey: ['post'] })

await queryClient.isMutating({
  predicate: (mutation) => mutation.state.variables?.id === 1,
})
````

---

### Manual Parallel Queries with `useQuery` (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries

This snippet demonstrates how to execute multiple `useQuery` hooks in parallel. Each `useQuery` call will run concurrently, maximizing fetching efficiency when the set of queries is static. This approach requires no special setup beyond calling the hooks side-by-side.

```tsx
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

---

### Configure QueryClient with browser detection in SvelteKit

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Sets up a QueryClient with conditional query execution based on whether code runs in the browser. This prevents queries from executing on the server, avoiding asynchronous operations after HTML is sent to the client. Uses SvelteKit's browser module to conditionally enable queries.

```svelte
<script lang="ts">
  import { browser } from '$app/environment'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
```

---

### Dynamic Parallel Queries with `useQueries` (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/parallel-queries

This example shows how to use the `useQueries` hook to execute a dynamic number of queries in parallel. This is essential when the queries depend on props or state that can change between renders, adhering to the rules of hooks. It accepts an options object with a `queries` array, returning an array of query results.

```tsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  });
}
```

---

### Configuring `initialData` with a custom `staleTime` in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/initial-query-data

This example shows how to use `initialData` alongside a custom `staleTime` to control data freshness. By setting a `staleTime`, the initial data will be considered fresh for the specified duration, preventing immediate refetching upon component mount.

```tsx
// Show initialTodos immediately, but won't refetch until another interaction event is encountered after 1000 ms
const result = useQuery({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: initialTodos,
  staleTime: 1000,
});
```

---

### Pass Signals Directly to useQuery Configuration

Source: https://tanstack.com/query/latest/docs/framework/solid/quick-start

Solid Query automatically tracks signals and store values passed to function arguments, updating the query store when signal values change. This eliminates the need for manual dependency tracking compared to React Query's dependency arrays.

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/solid-query";
import { createSignal, For } from "solid-js";

const queryClient = new QueryClient();

function Example() {
  const [enabled, setEnabled] = createSignal(false);
  const [todo, setTodo] = createSignal(0);

  const todosQuery = useQuery(() => ({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: enabled(),
  }));

  const todoDetailsQuery = useQuery(() => ({
    queryKey: ["todo", todo()],
    queryFn: fetchTodo,
    enabled: todo() > 0,
  }));

  return (
    <div>
      <Switch>
        <Match when={todosQuery.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={todosQuery.isError}>
          <p>Error: {todosQuery.error.message}</p>
        </Match>
        <Match when={todosQuery.isSuccess}>
          <For each={todosQuery.data}>
            {(todo) => (
              <button onClick={() => setTodo(todo.id)}>{todo.title}</button>
            )}
          </For>
        </Match>
      </Switch>
      <button onClick={() => setEnabled(!enabled())}>Toggle enabled</button>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
```

---

### Manual Parallel Queries with `useQuery` (Vue)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/parallel-queries

Demonstrates how to execute multiple `useQuery` hooks in parallel within a Vue component. These queries run concurrently without additional setup, leveraging TanStack Query's built-in capabilities. Ensure `fetchUsers`, `fetchTeams`, and `fetchProjects` functions are defined and accessible.

```vue
<script setup lang="ts">
// The following queries will execute in parallel
const usersQuery = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
const teamsQuery = useQuery({ queryKey: ["teams"], queryFn: fetchTeams });
const projectsQuery = useQuery({
  queryKey: ["projects"],
  queryFn: fetchProjects,
});
</script>
```

---

### Suspense Integration with useQuery in Solid

Source: https://tanstack.com/query/latest/docs/framework/solid/quick-start

Suspense works automatically in Solid Query when query data is accessed within a Suspense boundary component. Data accessed outside the Suspense boundary will not trigger the loading fallback, requiring manual loading state handling.

```tsx
import { For, Suspense } from "solid-js";

function Example() {
  const query = useQuery(() => ({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  }));
  return (
    <div>
      {/* ✅ Will trigger loading fallback, data accessed in a suspense boundary. */}
      <Suspense fallback={"Loading..."}>
        <For each={query.data}>{(todo) => <div>{todo.title}</div>}</For>
      </Suspense>
      {/* ❌ Will not trigger loading fallback, data not accessed in a suspense boundary. */}
      <For each={query.data}>{(todo) => <div>{todo.title}</div>}</For>
    </div>
  );
}
```

---

### Define a basic mutation in TanStack Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/invalidations-from-mutations

This snippet shows a basic setup for a mutation using `useMutation` in TanStack Solid Query. It defines the `mutationFn` responsible for performing an asynchronous operation, such as posting a new todo item.

```tsx
const mutation = useMutation(() => {
  mutationFn: postTodo;
});
```

---

### Get Global Default Options for TanStack Query Client (TypeScript)

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

The `getDefaultOptions` method retrieves the global default options that were configured when the `queryClient` instance was created or subsequently modified using `setDefaultOptions`. This provides access to the current overarching configuration for queries and mutations.

```tsx
const defaultOptions = queryClient.getDefaultOptions();
```

---

### Get Current Online State

Source: https://tanstack.com/query/latest/docs/reference/onlineManager

Retrieves the current online status as determined by TanStack Query's OnlineManager. This method returns a boolean indicating whether the application is currently considered online.

```typescript
const isOnline = onlineManager.isOnline();
```

---

### Get Cached Query Data synchronously using queryClient in TypeScript

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Synchronously retrieve cached data for an existing query using queryClient.getQueryData. Returns the cached data or undefined if the query does not exist. This method does not perform any fetching.

```typescript
const data = queryClient.getQueryData(queryKey);
```

---

### Setup Vue Query Plugin for Nuxt 2

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/ssr

Configure Vue Query plugin for Nuxt 2 with server-side context handling and client-side hydration. Stores queryClient in SSR context on server and hydrates it on client initialization.

```javascript
import Vue from "vue";
import { VueQueryPlugin, QueryClient, hydrate } from "@tanstack/vue-query";

export default (context) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  });

  if (process.server) {
    context.ssrContext.VueQuery = queryClient;
  }

  if (process.client) {
    Vue.use(VueQueryPlugin, { queryClient });

    if (context.nuxtState && context.nuxtState.vueQueryState) {
      hydrate(queryClient, context.nuxtState.vueQueryState);
    }
  }
};
```

---

### Monitor TanStack Solid Query Fetching State

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useIsFetching

This snippet demonstrates how to use the `useIsFetching` hook from `@tanstack/solid-query` to monitor the number of active queries. It shows how to get the total number of fetching queries and how to filter by a specific `queryKey` prefix, like 'posts'. The hook returns a number representing the count of matching fetching queries.

```tsx
import { useIsFetching } from "@tanstack/solid-query";
// How many queries are fetching?
const isFetching = useIsFetching();
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ["posts"] });
```

---

### Clear entire query cache

Source: https://tanstack.com/query/latest/docs/reference/QueryCache

Remove all cached queries and start with a fresh empty cache using queryCache.clear(). This method provides a complete cache reset without needing to recreate the QueryCache instance.

```typescript
queryCache.clear();
```

---

### Use initialDataUpdatedAt to Track Data Freshness

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

Example using initialDataUpdatedAt to specify when the initialData was last updated via a JS timestamp in milliseconds. Allows the query to determine if refetch is needed based on staleTime and data age.

```typescript
// Show initialTodos immediately, but won't refetch until
// another interaction event is encountered after 1000 ms
result = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  initialData: initialTodos,
  staleTime: 60 * 1000, // 1 minute
  // This could be 10 seconds ago or 10 minutes ago
  initialDataUpdatedAt: initialTodosUpdatedTimestamp, // eg. 1608412420052
}));
```

---

### Lazy Load Components with React.lazy

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

Uses React.lazy() to dynamically import Projects and Project components, enabling code splitting and reducing initial bundle size. Components are rendered conditionally and wrapped with React.Suspense to display a loading fallback while the chunks are being fetched.

```typescript
import { lazy } from "react";

const Projects = lazy(() => import("./components/Projects"));
const Project = lazy(() => import("./components/Project"));
```

---

### Achieve Reactivity with Svelte Query Runes

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

Demonstrates how to achieve reactivity for query inputs using Svelte 5's `$state` for reactive variables and passing options as a thunk to `createQuery`, eliminating the need for `$derived` or `writable` stores for reactivity.

```typescript
let intervalMs = $state(1000);

const query = createQuery(() => ({
  queryKey: ["refetch"],
  queryFn: async () => await fetch("/api/data").then((r) => r.json()),
  refetchInterval: intervalMs,
}));
```

---

### Demonstrate Race Condition with Synchronous Persistence

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

Example showing anti-pattern of calling persistQueryClient without proper lifecycle management. Demonstrates the race condition that occurs when rendering React App while restoration is ongoing, causing queries to fetch before cache restoration completes.

```typescript
// 🚨 never unsubscribes from syncing
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

// 🚨 happens at the same time as restoring
ReactDOM.createRoot(rootElement).render(<App />);
```

---

### Async Storage Interface

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister

Defines the interface for an asynchronous storage client. It must provide methods for getting, setting, and removing items, and optionally an `entries` method to retrieve all key-value pairs. This is used by the query persister to interact with various storage mechanisms.

```typescript
interface AsyncStorage<TStorageValue = string> {
  getItem: (key: string) => MaybePromise<TStorageValue | undefined | null>;
  setItem: (key: string, value: TStorageValue) => MaybePromise<unknown>;
  removeItem: (key: string) => MaybePromise<void>;
  entries?: () => MaybePromise<Array<[key: string, value: TStorageValue]>>;
}
```

---

### Initialize React Query with Shadow DOM in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

Sets up a React application with TanStack Query and React Query Devtools, rendering into a Shadow DOM root element. The QueryClient manages global state, and devtools are configured with shadowDOMTarget to work within the isolated Shadow DOM context.

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DogList } from "./DogList";

const appRoot = document.getElementById("root");

if (appRoot) {
  const queryClient = new QueryClient();
  const shadowRoot = appRoot.attachShadow({ mode: "open" });
  const root = ReactDOM.createRoot(shadowRoot);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <div
          style={{
            width: "100vw",
            padding: "30px",
          }}
        >
          <h2>Dog Breeds</h2>
          <DogList />
        </div>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
          shadowDOMTarget={appRoot.shadowRoot!}
        />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
```

---

### Initialize Vue Query Plugin in Nuxt 3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Sets up the Vue Query plugin for Nuxt 3 using the plugin API. Manages query state through Nuxt's useState composable and configures the QueryClient with options for global settings. Enables server-side rendering with hydration and dehydration of query state.

```typescript
import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";
import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState("vue-query");
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  nuxt.vueApp.use(VueQueryPlugin, { queryClient });
});
```

---

### Import and Initialize broadcastQueryClient

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/broadcastQueryClient

Import the broadcastQueryClient function from the experimental package and initialize it with a QueryClient instance. Optionally specify a broadcastChannel name to identify communication channels between tabs/windows.

```typescript
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";

const queryClient = new QueryClient();

broadcastQueryClient({
  queryClient,
  broadcastChannel: "my-app",
});
```

---

### Configure TypeScript for a React Project (JSON)

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

This `tsconfig.json` file sets up the TypeScript compiler for a React application, specifying language features, module resolution for bundlers, JSX processing, and strict linting rules to ensure code quality. It includes source files and ESLint configuration in the compilation scope.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    /* Bundler mode */ "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    /* Linting */ "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "eslint.config.js"]
}
```

---

### Using onSettled for Mutation Completion Handling in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/optimistic-updates

An alternative approach using the `onSettled` handler within `useMutation` to manage post-mutation logic, including error handling. This can simplify the mutation setup when specific error-handling logic within `onSettled` is sufficient.

```tsx
useMutation(() => {
  mutationFn: updateTodo,
  // ...
  onSettled: async (newTodo, error, variables, onMutateResult, context) => {
    if (error) {
      // do something
    }
  },
})
```

---

### Reset Mutation State with Error Handling

Source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

Demonstrates how to reset mutation state (error and data) using the reset() function. This example shows a form that displays error messages and allows users to clear errors by clicking on them, maintaining controlled input state.

```tsx
const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const mutation = useMutation({ mutationFn: createTodo });

  const onCreateTodo = (e) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <form onSubmit={onCreateTodo}>
      {mutation.error && (
        <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  );
};
```

---

### useInfiniteQuery Hook Implementation with Pagination

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useInfiniteQuery

Core implementation of useInfiniteQuery demonstrating destructuring of pagination controls and state properties. The hook accepts queryKey, queryFn with pageParam context, initialPageParam, and pagination parameter calculators. Returns pagination methods (fetchNextPage, fetchPreviousPage), state flags (hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage), and a promise property alongside standard useQuery results.

```typescript
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery(() => {
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

---

### Create Interactive Query Configuration Controls in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Implements UI controls for dynamically adjusting query behavior parameters including staleTime, gcTime, error rate, and fetch time ranges. Uses React state and input elements to allow real-time experimentation with how these settings impact query caching and data freshness. Updates global variables via useEffect to simulate different network conditions.

```typescript
let errorRate = 0.05;
let queryTimeMin = 1000;
let queryTimeMax = 2000;

function Root() {
  const [staleTime, setStaleTime] = React.useState(1000);
  const [gcTime, setGcTime] = React.useState(3000);
  const [localErrorRate, setErrorRate] = React.useState(errorRate);
  const [localFetchTimeMin, setLocalFetchTimeMin] =
    React.useState(queryTimeMin);
  const [localFetchTimeMax, setLocalFetchTimeMax] =
    React.useState(queryTimeMax);

  return (
    <>
      <div>
        Stale Time:{" "}
        <input
          type="number"
          min="0"
          step="1000"
          value={staleTime}
          onChange={(e) => setStaleTime(parseFloat(e.target.value))}
          style={{ width: "100px" }}
        />
      </div>
      <div>
        Garbage collection Time:{" "}
        <input
          type="number"
          min="0"
          step="1000"
          value={gcTime}
          onChange={(e) => setGcTime(parseFloat(e.target.value))}
          style={{ width: "100px" }}
        />
      </div>
      <div>
        Error Rate:{" "}
        <input
          type="number"
          min="0"
          max="1"
          step=".05"
          value={localErrorRate}
          onChange={(e) => setErrorRate(parseFloat(e.target.value))}
          style={{ width: "100px" }}
        />
      </div>
      <div>
        Fetch Time Min:{" "}
        <input
          type="number"
          min="1"
          step="500"
          value={localFetchTimeMin}
          onChange={(e) => setLocalFetchTimeMin(parseFloat(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>
      <div>
        Fetch Time Max:{" "}
        <input
          type="number"
          min="1"
          step="500"
          value={localFetchTimeMax}
          onChange={(e) => setLocalFetchTimeMax(parseFloat(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>
    </>
  );
}
```

---

### Angular AppComponent with RouterOutlet

Source: https://tanstack.com/query/latest/docs/framework/angular/examples/query-options-from-a-service

Defines a standalone Angular component with RouterOutlet for application routing. This component serves as the root component that imports necessary Angular modules and uses a template file for rendering. It demonstrates modern Angular standalone component syntax with decorator-based configuration.

```typescript
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

---

### Cancel graphql-request with AbortSignal (Client Constructor)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

For graphql-request versions prior to v4.0.0, this example demonstrates passing the AbortSignal to the `GraphQLClient` constructor. This allows for cancellation of all requests made by that client instance when the signal is aborted by TanStack Query.

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: ({ signal }) => {
    const client = new GraphQLClient(endpoint, {
      signal,
    });
    return client.request(query, variables);
  },
});
```

---

### Remove dehydrate boolean options in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5

The dehydrateMutations and dehydrateQueries boolean options have been removed from the dehydrate API. Use shouldDehydrateQuery and shouldDehydrateMutation function callbacks instead for more granular control over what gets dehydrated.

```typescript
- dehydrateMutations?: boolean // [!code --]
- dehydrateQueries?: boolean // [!code --]
```

---

### Next.js SSG with React Query Prefetching and Dehydration

Source: https://tanstack.com/query/latest/docs/framework/react/examples/nextjs

Demonstrates server-side query prefetching using QueryClient in Next.js getStaticProps, followed by state dehydration for client-side hydration. This pattern enables efficient static site generation with pre-populated data, reducing initial load time and improving SEO. The dehydrated state is passed as props and automatically rehydrated in the browser.

```typescript
import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Header, InfoBox, Layout, PostList } from "../components";
import { fetchPosts } from "../hooks/usePosts";

const Home = () => {
  return (
    <Layout>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with React-Query.</InfoBox>
      <PostList />
    </Layout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 10],
    queryFn: () => fetchPosts(10),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
```

---

### Provide TanStack QueryClient using Angular InjectionToken

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/provideTanStackQuery

This advanced example demonstrates how to provide the `QueryClient` using an Angular `InjectionToken`. This optimization allows for lazy loading TanStack Query, potentially reducing the main bundle size, and is particularly useful for sharing a `QueryClient` across lazy-loaded routes or components.

```ts
export const MY_QUERY_CLIENT = new InjectionToken("", {
  factory: () => new QueryClient(),
});

// In a lazy loaded route or lazy loaded component's providers array:
providers: [provideTanStackQuery(MY_QUERY_CLIENT)];
```

---

### Manual Error Throwing with useSuspenseQuery

Source: https://tanstack.com/query/latest/docs/framework/react/guides/suspense

Shows how to manually throw errors to Error Boundaries when using useSuspenseQuery. By default, not all errors are thrown to the nearest Error Boundary - only when there is no cached data to show. This example demonstrates checking for errors and throwing them manually.

```typescript
import { useSuspenseQuery } from "@tanstack/react-query";

const { data, error, isFetching } = useSuspenseQuery({ queryKey, queryFn });

if (error && !isFetching) {
  throw error;
}

// continue rendering data
```

---

### Fetch data with createQuery in Svelte

Source: https://tanstack.com/query/latest/docs/framework/svelte/overview

This Svelte component demonstrates how to use `createQuery` to fetch data. It defines a query with `queryKey` and `queryFn`, then conditionally renders loading, error, or success states, iterating over the fetched data if successful.

```svelte
<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  const query = createQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  }))
</script>

<div>
  {#if query.isLoading}
    <p>Loading...</p>
  {:else if query.isError}
    <p>Error: {query.error.message}</p>
  {:else if query.isSuccess}
    {#each query.data as todo}
      <p>{todo.title}</p>
    {/each}
  {/if}
</div>
```

---

### Incorrect useMutation() Property Order

Source: https://tanstack.com/query/latest/docs/eslint/mutation-property-order

Example of incorrect property ordering in useMutation() configuration where inference-sensitive callbacks are not in the required sequence. This violates the @tanstack/query/mutation-property-order ESLint rule and can cause type inference issues.

```typescript
/* eslint "@tanstack/query/mutation-property-order": "warn" */
import { useMutation } from "@tanstack/react-query";

const mutation = useMutation({
  mutationFn: () => Promise.resolve("success"),
  onSettled: () => {
    results.push("onSettled-promise");
    return Promise.resolve("also-ignored");
  },
  onMutate: async () => {
    results.push("onMutate-async");
    await sleep(1);
    return { backup: "async-data" };
  },
  onError: async () => {
    results.push("onError-async-start");
    await sleep(1);
    results.push("onError-async-end");
  },
});
```

---

### Prefetch Query with Next.js Server Component and Hydration

Source: https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching

Demonstrates server-side query prefetching in a Next.js App Router component using TanStack Query's HydrationBoundary and dehydrate utilities. The query client prefetches data server-side, dehydrates the state, and passes it to the client component for immediate hydration. This pattern eliminates waterfalls and improves initial page load performance by having data ready before client-side rendering.

```typescript
import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { pokemonOptions } from "@/app/pokemon";
import { getQueryClient } from "@/app/get-query-client";
import { PokemonInfo } from "./pokemon-info";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokemonOptions);

  return (
    <main>
      <h1>Pokemon Info</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonInfo />
      </HydrationBoundary>
    </main>
  );
}
```

---

### Combine Error Boundary with Query Error Reset

Source: https://tanstack.com/query/latest/docs/framework/react/examples/suspense

Wraps lazy-loaded components with QueryErrorResetBoundary and ErrorBoundary to catch and handle errors gracefully. Provides a fallback UI with a 'Try again' button that resets the error state and allows retry of the failed query.

```typescript
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          There was an error!{" "}
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      )}
      onReset={reset}
    >
      {showProjects ? (
        <React.Suspense fallback={<h1>Loading projects...</h1>}>
          {activeProject ? (
            <Project
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          ) : (
            <Projects setActiveProject={setActiveProject} />
          )}
        </React.Suspense>
      ) : null}
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
```

---

### Basic Paginated Query in React

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/paginated-queries

A fundamental example of fetching paginated data using `useQuery` in React. This snippet demonstrates how to include page information in the query key. Note that this basic implementation can lead to UI jumps between success and pending states for each new page.

```tsx
const result = useQuery({
  queryKey: ["projects", page],
  queryFn: () => fetchProjects(page),
});
```

---

### Derive TanStack Query `initialData` from Another Query's Cache

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/initial-query-data

This example demonstrates how to use data already present in the TanStack Query cache as `initialData` for a different query. It retrieves a specific todo item from the cached 'todos' list using `queryClient.getQueryData` to pre-populate an individual todo query, reducing redundant network requests.

```tsx
const result = useQuery(() => {
  queryKey: ['todo', todoId],
  queryFn: () => fetch('/todos'),
  initialData: () => {
    // Use a todo from the 'todos' query as the initial data for this todo query
    return queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId)
  },
})
```

---

### Initialize TanStack Query with useQuery hook

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/queries

This snippet demonstrates how to initialize a basic query using the `useQuery` hook. It requires a unique `queryKey` (an array for identification) and a `queryFn` that returns a promise to fetch data. The `result` object, returned by `useQuery`, contains the query's state and data, applicable in both Vue (via `@tanstack/vue-query`) and general TypeScript/React contexts.

```ts
import { useQuery } from "@tanstack/vue-query";

const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
```

```tsx
const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
```

---

### Exponential Backoff Retry Delay Implementation

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

Demonstrates a retryDelay function that implements exponential backoff strategy with a 30-second maximum. Each retry attempt doubles the delay, starting from 1 second, capping at 30 seconds to prevent excessive wait times.

```typescript
(attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000);
```

---

### Configure Individual Query Retries (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

This example shows how to set a specific number of retries for an individual `useQuery` call. If a query fails, it will be retried up to 10 times before the error is considered final. This configuration overrides global settings for this specific query.

```tsx
import { useQuery } from "@tanstack/react-query";

// Make a specific query retry a certain number of times
const result = useQuery({
  queryKey: ["todos", 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
});
```

---

### Access Svelte Query Properties Without $ Prefix

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

With the migration to Svelte 5 runes, the `$` prefix previously used for accessing store-like properties is no longer necessary, simplifying component templates.

```svelte
{#if todos.isSuccess}
    <ul>
    {#each todos.data.items as item}
        <li>{item}</li>
    {/each}
    </ul>
{/if}
```

---

### Implement Dynamic Dependent Queries with useQueries in TanStack React Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

This example illustrates how to use `useQueries` to perform multiple dependent queries dynamically. It first fetches a list of user IDs using `useQuery`. Subsequently, `useQueries` is used to fetch messages for each of those user IDs, creating an array of queries based on the data obtained from the initial query. The `queries` array for `useQueries` is conditionally built only when `userIds` are available.

```tsx
// Get the users ids
const { data: userIds } = useQuery({
  queryKey: ["users"],
  queryFn: getUsersData,
  select: (users) => users.map((user) => user.id),
});

// Then get the users messages
const usersMessages = useQueries({
  queries: userIds
    ? userIds.map((id) => {
        return {
          queryKey: ["messages", id],
          queryFn: () => getMessagesByUsers(id),
        };
      })
    : [], // if userIds is undefined, an empty array will be returned
});
```

---

### Enable Svelte Runes Mode Project-Wide

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

Once your application has fully migrated away from legacy Svelte store syntax, you can enable runes mode globally by adding `compilerOptions.runes: true` to your `svelte.config.js`.

```json
  compilerOptions: {
    runes: true,
  },
```

---

### Dynamic Parallel Queries with useQueries in React

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/parallel-queries

This code example shows how to use the `useQueries` hook in TanStack Query to dynamically execute multiple queries in parallel. This is useful when the number of queries changes per render, adhering to the rules of hooks. It accepts an options object with a `queries` key containing an array of query objects and returns an array of query results.

```tsx
function App({ users }) {
  const userQueries = useQueries(() => {
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  })
}
```

---

### Use prefetched query data in Svelte component

Source: https://tanstack.com/query/latest/docs/framework/svelte/ssr

Creates a query using the same queryKey and queryFn as the server-side prefetch. Since data was prefetched and cached on the server, no fetch occurs on the client-side initial render. The query immediately returns cached data with accurate metadata like dataUpdatedAt.

```svelte
<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const query = createQuery(() => ({
    queryKey: ['posts'],
    queryFn: async () => (await fetch('/api/posts')).json(),
  }))
</script>
```

---

### Limit Stored Pages in Infinite Query with maxPages

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/infinite-queries

Implements a limited infinite query that maintains only a specified number of pages (3 in this example) using the maxPages option. Improves performance by reducing memory usage and refetch time when dealing with large numbers of pages. Requires getNextPageParam and getPreviousPageParam for bidirectional pagination.

```typescript
injectInfiniteQuery(() => ({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  maxPages: 3,
}));
```

---

### Invalidate TanStack Queries by Prefix Key (TSX)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/query-invalidation

Illustrates how to invalidate multiple queries by providing a `queryKey` prefix to `invalidateQueries`. This example shows that queries with the same root key but different sub-keys will all be invalidated, useful for updating related data sets.

```tsx
import { useQuery, useQueryClient } from "@tanstack/vue-query";

// Get QueryClient from the context
const queryClient = useQueryClient();

queryClient.invalidateQueries({ queryKey: ["todos"] });

// Both queries below will be invalidated
const todoListQuery = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodoList,
});
const todoListQuery = useQuery({
  queryKey: ["todos", { page: 1 }],
  queryFn: fetchTodoList,
});
```

---

### Custom Background Retry Behavior

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-retries

This example shows how to disable built-in retries (`retry: false`) and implement a custom refetch strategy when `refetchIntervalInBackground` is enabled. It allows for manual control over retry timing, such as refetching more frequently when the query is in an error state.

```tsx
const result = useQuery(() => {
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchInterval: (query) => {
    // Refetch more frequently when in error state
    return query.state.status === 'error' ? 5000 : 30000
  },
  refetchIntervalInBackground: true,
  retry: false, // Disable built-in retries
})
```

---

### Implement Suspendable Data Fetching with useQuery in Solid

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/suspense

Shows how to define an async data fetcher and use `useQuery` from `@tanstack/solid-query` within a component. Accessing `query.data` directly inside a `<Suspense>` boundary automatically triggers the suspension until the data is fully loaded.

```tsx
import { useQuery } from "@tanstack/solid-query";

const todoFetcher = async () =>
  await fetch("https://jsonplaceholder.cypress.io/todos").then((response) =>
    response.json()
  );

function SuspendableComponent() {
  const query = useQuery(() => ({
    queryKey: ["todos"],
    queryFn: todoFetcher,
  }));

  // Accessing query.data directly inside a <Suspense> boundary
  // automatically triggers suspension until data is ready
  return <div>Data: {JSON.stringify(query.data)}</div>;
}
```

---

### Force React Component Re-render with setTimeout

Source: https://tanstack.com/query/latest/docs/framework/react/examples/prefetching

This JavaScript snippet demonstrates a technique to trigger a component re-render after a minimal delay. Using `setTimeout` with a 1ms delay allows the `rerender` function (assumed to be a state updater) to execute in the next event loop tick, which can be useful for certain UI update scenarios.

```javascript
setTimeout(() => {
  rerender({});
}, 1);
```

---

### Fetch Todos by Filter in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This function simulates fetching a list of todos based on a filter string. It uses `setTimeout` to mimic an API call with a configurable delay and error rate. The function returns a promise that resolves with the filtered todo list or rejects with an error.

```typescript
function fetchTodos(filter: string): Promise<Todos> {
  console.info("fetchTodos", filter);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        return reject(
          new Error(JSON.stringify({ fetchTodos: { filter } }, null, 2))
        );
      }
      resolve(list.filter((d) => d.name.includes(filter)));
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
```

---

### Vue Composition API App Component with State Management

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/2

Main App component using Vue 2.6 composition API with TypeScript. Manages visited posts state and post selection logic. Demonstrates conditional rendering between Posts list and Post detail views, with state persistence across component switches.

```vue
<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

import Posts from "./Posts.vue";
import Post from "./Post.vue";

export default defineComponent({
  name: "App",
  components: { Posts, Post },
  setup() {
    const visitedPosts = ref(new Set());
    const isVisited = (id: number) => visitedPosts.value.has(id);

    const postId = ref(-1);
    const setPostId = (id: number) => {
      visitedPosts.value.add(id);
      postId.value = id;
    };

    return {
      isVisited,
      postId,
      setPostId,
    };
  },
});
</script>

<template>
  <div>
    <h1>Vue Query - Basic</h1>
    <p>
      As you visit the posts below, you will notice them in a loading state the
      first time you load them. However, after you return to this list and click
      on any posts you have already visited again, you will see them load
      instantly and background refresh right before your eyes!
      <strong>
        (You may need to throttle your network speed to simulate longer loading
        sequences)
      </strong>
    </p>
    <Post v-if="postId > -1" :postId="postId" @setPostId="setPostId" />
    <Posts v-else :isVisited="isVisited" @setPostId="setPostId" />
  </div>
</template>
```

---

### Implement Optimistic Updates in Svelte Component

Source: https://tanstack.com/query/latest/docs/framework/svelte/examples/optimistic-updates

This Svelte component template demonstrates optimistic updates for a todo list. It handles form submission, calls a mutation to add items, and displays loading, error, and success states while showing optimistically added items or reverting on failure. It relies on a `todos` object, presumably from TanStack Query, and an `addTodoMutation`.

```html
<form on:submit={(e) => {
  e.preventDefault();
  e.stopPropagation();
  addTodoMutation.mutate(text);
}}>
  <input type="text" bind:value={text} />
  <button type="submit">Create</button>
</form>

{#if todos.isPending}
  Loading...
{/if}

{#if todos.error}
  An error has occurred: {todos.error.message}
{/if}

{#if todos.isSuccess}
  Updated At: {new Date(todos.data.ts).toLocaleTimeString()}
  <ul>
    {#each todos.data.items as todo}
      <li>{todo.text}</li>
    {/each}
  </ul>
{/if}

{#if todos.isFetching}
  'Background Updating...' : ' '
{/if}
```

---

### Flatten a Non-Dependent Nested Component Waterfall by Hoisting in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/request-waterfalls

To resolve the waterfall shown previously, this example hoists the `Comments` component's data fetching (`useQuery`) into the parent `Article` component. This allows both the article data and comments data to be fetched in parallel, improving the loading performance of the page.

```tsx
function Article({ id }) {
  const { data: articleData, isPending: articlePending } = useQuery(() => {
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  const { data: commentsData, isPending: commentsPending } = useQuery(() => {
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  if (articlePending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      {commentsPending ? (
        'Loading comments...'
      ) : (
        <Comments commentsData={commentsData} />
      )}
    </>
  )
}
```

---

### Update Todo with useMutation and Query Invalidation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Uses useMutation to handle todo updates (PATCH requests). On successful mutation, invalidates the 'todos' query to trigger a refetch and updates the individual todo query cache. Provides mutation status tracking and error handling.

```typescript
const saveMutation = useMutation({
  mutationFn: patchTodo,
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    queryClient.setQueryData(["todo", { id: editingIndex }], data);
  },
});

const onSave = () => {
  saveMutation.mutate(todo);
};
```

---

### Todo Form with TanStack Query Mutation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

Implements a form that handles todo submission using TanStack Query's addMutation. On form submit, prevents default behavior, triggers the mutation with the current value, and clears the input field on successful submission.

```jsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    addMutation.mutate(value, {
      onSuccess: () => {
        setValue("");
      },
    });
  }}
>
  <input
    placeholder="enter something"
    value={value}
    onChange={(ev) => setValue(ev.target.value)}
  />
</form>
```

---

### Get Default Options for Specific Queries in TanStack Query (TypeScript)

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

The `getQueryDefaults` method retrieves the default options that have been specifically set for queries matching a given key. When multiple defaults match, they are merged based on their registration order, with more specific keys overriding generic ones.

```tsx
const defaultOptions = queryClient.getQueryDefaults(["posts"]);
```

---

### Infinite Query Pagination UI with Previous/Next Navigation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll

React component that renders paginated data with bidirectional navigation buttons. Displays loading states for fetching previous and next pages, maps through paginated data, and shows background update status. Integrates TanStack Query's useInfiniteQuery hook with error handling and conditional rendering based on fetch status.

```jsx
) : status === 'error' ? (
  <span>Error: {error.message}</span>
) : (
  <>
    <div>
      <button
        onClick={() => fetchPreviousPage()}
        disabled={!hasPreviousPage || isFetchingPreviousPage}
      >
        {isFetchingPreviousPage
          ? 'Loading more...'
          : hasPreviousPage
            ? 'Load Older'
            : 'Nothing more to load'}
      </button>
    </div>
    {data.pages.map((page) => (
      <React.Fragment key={page.nextId}>
        {page.data.map((project) => (
          <p
            style={{
              border: '1px solid gray',
              borderRadius: '5px',
              padding: '10rem 1rem',
              background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
            }}
            key={project.id}
          >
            {project.name}
          </p>
        ))}
      </React.Fragment>
    ))}
    <div>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
      </button>
    </div>
    <div>
      {isFetching && !isFetchingNextPage
        ? 'Background Updating...'
        : null}
    </div>
  </>
)
<hr />
<Link href="/about">Go to another page</Link>
<ReactQueryDevtools initialIsOpen />
```

---

### Query Configuration: Initial and Placeholder Data

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

Options for providing initial data values and placeholder data to display while queries are loading, including metadata about when initial data was updated.

````APIDOC
## Query Configuration: Initial and Placeholder Data

### Description
Provide initial cache values and placeholder data for improved user experience while queries are pending.

### Parameters

#### initialData
- **Type**: `TData | () => TData`
- **Optional**: Yes
- **Description**: Value used as initial data for query cache (only if query hasn't been created or cached yet)
  - If function: Called **once** during shared/root query initialization; must synchronously return initialData
  - **Staleness**: Initial data is considered stale by default unless `staleTime` is set
  - **Persistence**: `initialData` **is persisted** to the cache

#### initialDataUpdatedAt
- **Type**: `number | (() => number | undefined)`
- **Optional**: Yes
- **Description**: Timestamp (in milliseconds) indicating when the `initialData` was last updated
  - If function: Returns timestamp or undefined

#### placeholderData
- **Type**: `TData | (previousValue: TData | undefined, previousQuery: Query | undefined) => TData`
- **Optional**: Yes
- **Description**: Placeholder data displayed while query is in `pending` state
  - **Persistence**: `placeholderData` is **not persisted** to the cache
  - If function: Receives two arguments:
    - First: Previously watched query data (if available)
    - Second: Complete previousQuery instance

### Request Example
```javascript
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  initialData: { name: 'Default User' },
  initialDataUpdatedAt: Date.now(),
  placeholderData: (previousData) => previousData || { name: 'Loading...' }
})
````

````

--------------------------------

### Todo List Display with Optimistic Updates in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui

Renders the todo list with support for optimistic updates, pending items, and error states. Displays completed todos from the server, shows pending items with reduced opacity while being submitted, and provides retry functionality for failed mutations with error styling.

```jsx
{todoQuery.isSuccess && (
  <>
    <div>
      {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */}
      Updated At: {new Date(todoQuery.data.ts).toLocaleTimeString()}
    </div>
    <ul>
      {todoQuery.data.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
      {addTodoMutation.isPending && (
        <li style={{ opacity: 0.5 }}>{addTodoMutation.variables}</li>
      )}
      {addTodoMutation.isError && (
        <li style={{ color: 'red' }}>
          {addTodoMutation.variables}
          <button
            onClick={() =>
              addTodoMutation.mutate(addTodoMutation.variables)
            }
          >
            Retry
          </button>
        </li>
      )}
    </ul>
    {todoQuery.isFetching && <div>Updating in background...</div>}
  </>
)}
````

---

### Implement React Query Auto Refetching and Mutations in TSX

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

This React component sets up a `QueryClientProvider` to manage data fetching. It uses `useQuery` to continuously refetch a list of 'todos' from an API endpoint at a user-defined interval. Additionally, it implements `useMutation` for adding new todo items and clearing all existing ones, with `onSuccess` callbacks invalidating the 'todos' query to trigger a refetch and update the UI.

```tsx
import React from "react";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const queryClient = useQueryClient();
  const [intervalMs, setIntervalMs] = React.useState(1000);
  const [value, setValue] = React.useState("");

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<Array<string>> => {
      const response = await fetch("/api/data");
      return await response.json();
    },
    // Refetch the data every second
    refetchInterval: intervalMs,
  });

  const addMutation = useMutation({
    mutationFn: (add: string) => fetch(`/api/data?add=${add}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const clearMutation = useMutation({
    mutationFn: () => fetch(`/api/data?clear=1`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;

  return (
    <div>
      <h1>Auto Refetch with stale-time set to {intervalMs}ms</h1>
      <p>
        This example is best experienced on your own machine, where you can open
        multiple tabs to the same localhost server and see your changes
        propagate between the two.
      </p>
      <label>
        Query Interval speed (ms):{" "}
        <input
          value={intervalMs}
          onChange={(ev) => setIntervalMs(Number(ev.target.value))}
          type="number"
          step="100"
        />{" "}
        <span
          style={{
            display: "inline-block",
            marginLeft: ".5rem",
            width: 10,
            height: 10,
            background: isFetching ? "green" : "transparent",
            transition: !isFetching ? "all .3s ease" : "none",
            borderRadius: "100%",
            transform: "scale(2)",
          }}
        />
      </label>
      <h2>Todo List</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addMutation.mutate(value, {
            onSuccess: () => {
              setValue("");
            },
          });
        }}
      >
        <input
          placeholder="enter something"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />
      </form>
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            clearMutation.mutate();
          }}
        >
          Clear All
        </button>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
```

---

### Select Option with useQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/react/guides/render-optimizations

Demonstrates using the select option to subscribe to a subset of query data, allowing components to only re-render when the selected data changes. The example shows a custom useTodos hook and useTodoCount hook that only triggers re-renders when the length of todos changes, not when individual todo properties change.

```javascript
export const useTodos = (select) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select,
  });
};

export const useTodoCount = () => {
  return useTodos((data) => data.length);
};
```

---

### QueryClient Instantiation in Async Server Component

Source: https://tanstack.com/query/latest/docs/eslint/stable-query-client

Demonstrates the correct usage of QueryClient instantiation within an asynchronous Server Component. In this context, creating a new instance is permissible because the async function is executed only once on the server, satisfying the stable QueryClient requirement.

```tsx
async function App() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(options);
}
```

---

### Execute Filtered Queries with useQuery Hook in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Uses the useQuery hook to fetch and manage todo data with dynamic filtering. Demonstrates query key composition with filter parameters, query function execution, and accessing query states including status, data, isFetching, error, and failureCount. The queryKey array structure enables automatic cache invalidation when filter changes.

```typescript
function Todos({
  initialFilter = "",
  setEditingIndex,
}: {
  initialFilter: string;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [filter, setFilter] = React.useState(initialFilter);

  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ["todos", { filter }],
    queryFn: fetchTodos,
  });

  return (
    <div>
      <div>
        <label></label>
      </div>
    </div>
  );
}
```

---

### Interval Control with Fetching Status Indicator

Source: https://tanstack.com/query/latest/docs/framework/react/examples/auto-refetching

Creates an input field for setting an interval value in milliseconds with a visual indicator (colored circle) that shows the current fetching status. The indicator displays green when fetching is active and transitions smoothly when fetching stops.

```jsx
onChange={(ev) => setIntervalMs(Number(ev.target.value))}
type="number"
step="100"
/>{' '}
<span
  style={{
    display: 'inline-block',
    marginLeft: '.5rem',
    width: 10,
    height: 10,
    background: isFetching ? 'green' : 'transparent',
    transition: !isFetching ? 'all .3s ease' : 'none',
    borderRadius: '100%',
    transform: 'scale(2)',
  }}
/>
```

---

### Set Up Basic Query with useQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/react/guides/queries

Initialize a query using the useQuery hook from TanStack Query with a unique key and async function. The hook requires a queryKey for caching and refetching, and a queryFn that returns a promise. This is the fundamental pattern for fetching data in TanStack Query applications.

```tsx
import { useQuery } from "@tanstack/react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

---

### Implement Dependent useQuery with enabled in TanStack Query (TSX)

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/dependent-queries

This example demonstrates how to chain queries using `useQuery` where the execution of one query depends on the successful completion and data availability from a preceding query. The `projects` query is configured with the `enabled` option, ensuring it only fetches data once the `userId` derived from the `user` query is present. This pattern is essential for scenarios where sequential data fetching is required.

```tsx
const { data: user } = useQuery(() => {
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

const {
  status,
  fetchStatus,
  data: projects,
} = useQuery(() => {
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  enabled: !!userId,
})
```

---

### Display Posts List with Cache Indicator in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

React component that renders a list of posts and visually indicates which posts are cached (bold, green text). Uses useQueryClient to check if post data exists in the cache before rendering. Displays loading, error, and background update states.

```typescript
function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}
```

---

### infiniteQueryOptions Configuration

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/infiniteQueryOptions

This section details the `infiniteQueryOptions` function, which creates a configuration object for infinite queries. These options are largely compatible with `useInfiniteQuery`.

````APIDOC
## infiniteQueryOptions Configuration

### Description
Function to generate a configuration object for infinite queries. It accepts options similar to those available in [`useInfiniteQuery`](./useInfiniteQuery.md), which can then be used with TanStack Query methods like `queryClient.prefetchInfiniteQuery` or directly with `useInfiniteQuery`.

### Configuration Options
- **queryKey** (`QueryKey`) - **Required** - A unique array key that identifies the infinite query. This is crucial for caching and invalidation.
- **...options** (various types) - **Optional** - All other options that can be passed to `useInfiniteQuery`. This includes properties like `queryFn`, `getNextPageParam`, `initialPageParam`, `staleTime`, `cacheTime`, `enabled`, and more. Refer to the `useInfiniteQuery` documentation for a full list of available options.

### Usage Example
```tsx
infiniteQueryOptions({
  queryKey: ['myInfiniteData', userId],
  queryFn: async ({ pageParam }) => {
    const res = await fetch(`/api/data?page=${pageParam}`);
    return res.json();
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages, lastPageParam) => lastPage.nextCursor ?? undefined,
  staleTime: 5 * 60 * 1000 // 5 minutes
})
````

### Returns

A configuration object suitable for use with TanStack Query's infinite query functionalities (e.g., `useInfiniteQuery`, `queryClient.prefetchInfiniteQuery`).

### Returned Object Structure (Example)

```json
{
  "queryKey": ["myInfiniteData", "123"],
  "queryFn": "[function for data fetching]",
  "initialPageParam": 1,
  "getNextPageParam": "[function for pagination logic]",
  "staleTime": 300000
}
```

````

--------------------------------

### Type getQueriesData with explicit generic for heterogeneous arrays

Source: https://tanstack.com/query/latest/docs/framework/react/typescript

getQueriesData returns an array of tuples with heterogeneous data types that cannot be inferred from queryOptions. Explicitly specify the generic type to get proper type safety for the entries array.

```typescript
const entries = queryClient.getQueriesData<Group[]>(groupOptions().queryKey)
//     ^? const entries: Array<[QueryKey, Group[] | undefined]>
````

---

### Setup Vue Query with Vite SSR entry point

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/ssr

Initialize Vue Query client in the Vite SSR main hook, dehydrate state during server-side rendering, and hydrate state on the client. The queryClient is created fresh per request and provided to Vue app components via VueQueryPlugin.

```javascript
// main.js (entry point)
import App from "./App.vue";
import viteSSR from "vite-ssr/vue";
import {
  QueryClient,
  VueQueryPlugin,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";

export default viteSSR(App, { routes: [] }, ({ app, initialState }) => {
  // -- This is Vite SSR main hook, which is called once per request

  // Create a fresh VueQuery client
  const queryClient = new QueryClient();

  // Sync initialState with the client state
  if (import.meta.env.SSR) {
    // Indicate how to access and serialize VueQuery state during SSR
    initialState.vueQueryState = { toJSON: () => dehydrate(queryClient) };
  } else {
    // Reuse the existing state in the browser
    hydrate(queryClient, initialState.vueQueryState);
  }

  // Mount and provide the client to the app components
  app.use(VueQueryPlugin, { queryClient });
});
```

---

### Correct useMutation() Property Order

Source: https://tanstack.com/query/latest/docs/eslint/mutation-property-order

Example of correct property ordering in useMutation() configuration where inference-sensitive callbacks follow the required sequence: onMutate, onError, onSettled. This ensures proper type inference and complies with the @tanstack/query/mutation-property-order ESLint rule.

```typescript
/* eslint "@tanstack/query/mutation-property-order": "warn" */
import { useMutation } from "@tanstack/react-query";

const mutation = useMutation({
  mutationFn: () => Promise.resolve("success"),
  onMutate: async () => {
    results.push("onMutate-async");
    await sleep(1);
    return { backup: "async-data" };
  },
  onError: async () => {
    results.push("onError-async-start");
    await sleep(1);
    results.push("onError-async-end");
  },
  onSettled: () => {
    results.push("onSettled-promise");
    return Promise.resolve("also-ignored");
  },
});
```

---

### Supply Placeholder Data as a Static Value

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/placeholder-query-data

Sets a static placeholder data value for a query using the placeholderData option. The query will start in a success state with the placeholder data and set isPlaceholderData flag to true until the actual data is fetched.

```tsx
const result = useQuery({
  queryKey: ["todos"],
  queryFn: () => fetch("/todos"),
  placeholderData: placeholderTodos,
});
```

---

### Patch a Todo Item in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This function simulates updating an existing todo item. It takes a `Todo` object as input, simulates a PATCH request with a delay and error rate, and updates the local todo list. The function resolves with the updated todo if the update is successful.

```typescript
function patchTodo(todo?: Todo): Promise<Todo> {
  console.info("patchTodo", todo);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        return reject(new Error(JSON.stringify({ patchTodo: todo }, null, 2)));
      }
      list = list.map((d) => {
        if (d.id === todo.id) {
          return todo;
        }
        return d;
      });
      resolve(todo);
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
```

---

### Hydrate QueryClient state on client-side app creation in Nuxt3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Restores the QueryClient state on the client side using the hydrate function when the app is created. This synchronizes client-side queries with the server-rendered state, preventing unnecessary refetches and improving performance during hydration.

```TypeScript
if (import.meta.client) {
  nuxt.hooks.hook('app:created', () => {
    hydrate(queryClient, vueQueryState.value)
  })
}
```

---

### Filter and Select Mutation Data by Key with useMutationState (Solid Query)

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useMutationState

This example illustrates how to use `useMutationState` to access data from mutations identified by a specific `mutationKey`. It first defines a mutation and then uses `filters` to match mutations with the `['posts']` key, selecting the `data` property from their state. This is useful for tracking specific operations.

```tsx
import { useMutation, useMutationState } from '@tanstack/solid-query'

const mutationKey = ['posts']

// Some mutation that we want to get the state for
const mutation = useMutation(() => {
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState(() => {
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})
```

---

### Global State Before TanStack Query Migration

Source: https://tanstack.com/query/latest/docs/framework/react/guides/does-this-replace-client-state

Example of typical global state structure containing both server-state and client-state properties before migrating async operations to TanStack Query. This demonstrates how server-state data (projects, teams, tasks, users) is mixed with client-state properties (themeMode, sidebarStatus) in a traditional global state manager.

```typescript
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
};
```

---

### Initialize Query with injectQuery - TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/caching

Creates a new query instance using injectQuery with a query key and fetch function. When no cached data exists, the query enters a hard loading state and makes a network request. The returned data is cached under the specified query key.

```typescript
injectQuery(() => ({ queryKey: ["todos"], queryFn: fetchTodos }));
```

---

### Update Svelte Query Function Inputs to Thunks

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

Svelte Query functions now require options to be provided as a 'thunk' (`() => options`) to ensure proper reactivity. TypeScript will help identify where this notation is needed.

```typescript
const query = createQuery(() => ({
  queryKey: ["todos"],
  queryFn: () => fetchTodos(),
}));
```

---

### Disable Per-Query Window Focus Refetching (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/window-focus-refetching

This example shows how to disable window focus refetching for a specific query. By setting `refetchOnWindowFocus` to `false` directly within the query configuration, you can override the global setting for individual queries.

```typescript
injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
}));
```

---

### Lazy Query based on Condition - Vue

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries

Illustrates how to create a lazy query that only runs when a specific condition is met, using the `enabled` option with a computed boolean. This example shows a Vue component fetching todos only after a filter value is provided.

```vue
<script setup>
import { useQuery } from "@tanstack/vue-query";

const filter = ref("");
const isEnabled = computed(() => !!filter.value);
const { data } = useQuery({
  queryKey: ["todos", filter],
  queryFn: () => fetchTodos(filter),
  // ⬇️ disabled as long as the filter is empty
  enabled: isEnabled,
});
</script>

<template>
  <span v-if="data">Filter was set and data is here!</span>
</template>
```

---

### Combine Results from Multiple Queries with `combine` Option (React Query)

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useQueries

Illustrates how to use the `combine` option within `useQueries` to process and consolidate the results of multiple queries into a single, custom object. This example combines the `data` and `isPending` states from individual queries into a unified `data` array and `pending` boolean.

```tsx
const ids = [1, 2, 3]
const combinedQueries = useQueries(() => {
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }
  },
})
```

---

### Register Vue Query plugin in Nuxt3 application

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Registers the VueQueryPlugin with the Nuxt Vue application instance using the configured QueryClient. This makes Vue Query functionality available throughout the application and enables query management features in all components.

```TypeScript
const options: VueQueryPluginOptions = {
  queryClient
}
nuxt.vueApp.use(VueQueryPlugin, options)
```

---

### Derive Placeholder Data from Cache (TanStack Query)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/placeholder-query-data

This example shows how to use `queryClient.getQueryData` within the `placeholderData` function to provide placeholder data from an existing query's cache. This is useful for populating a detailed view with a preview version of data already available from a list query, improving perceived loading speed.

```tsx
function BlogPost({ blogPostId }) {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["blogPost", blogPostId],
    queryFn: () => fetch(`/blogPosts/${blogPostId}`),
    placeholderData: () => {
      // Use the smaller/preview version of the blogPost from the 'blogPosts'
      // query as the placeholder data for this blogPost query
      return queryClient
        .getQueryData(["blogPosts"])
        ?.find((d) => d.id === blogPostId);
    },
  });
}
```

---

### Fetch Todo by ID in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This function fetches a single todo item by its ID. It simulates an API request using `setTimeout`, including error handling based on the `errorRate`. The function returns a promise that either resolves with the found todo or rejects with an error.

```typescript
function fetchTodoById({ id }: { id: number }): Promise<Todo> {
  console.info("fetchTodoById", { id });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        return reject(
          new Error(JSON.stringify({ fetchTodoById: { id } }, null, 2))
        );
      }
      resolve(list.find((d) => d.id === id));
    }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin));
  });
}
```

---

### Include Dependent Variables in TanStack Query Keys

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/query-keys

This example demonstrates how to correctly include variables that a query function depends on within its query key. This practice ensures that each unique set of variable values results in a distinct cached entry and triggers automatic refetches when those variables change.

```ts
import type { Ref } from "vue";

function useTodos(todoId: Ref<string>) {
  const queryKey = ["todos", todoId];
  return useQuery({
    queryKey,
    queryFn: () => fetchTodoById(todoId.value),
  });
}
```

---

### Asynchronous Function to Fetch Todos with Filtering and Cancellation

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This TypeScript function simulates an asynchronous API call to fetch a list of todos. It supports filtering based on `queryKey` and request cancellation via a `signal`, demonstrating error handling with a random failure rate and a simulated network delay.

```typescript
function fetchTodos({ signal, queryKey: [, { filter }] }): Promise { console.info('fetchTodos', { filter }) if (signal) { signal.addEventListener('abort', () => { console.info('cancelled', filter) }) } return new Promise((resolve, reject) => { setTimeout( () => { if (Math.random() < errorRate) { return reject( new Error(JSON.stringify({ fetchTodos: { filter } }, null, 2)), ) } resolve(list.filter((d) => d.name.includes(filter))) }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin), ) }) }
```

---

### Solid.js Utility Functions for URL Search Parameters and String Formatting

Source: https://tanstack.com/query/latest/docs/framework/solid/examples/astro

This TypeScript snippet provides two utility functions for Solid.js applications. The 'getSearchParams' function creates a reactive signal that retrieves and updates a specific URL search parameter ('id') when the browser's history state changes. The 'properCase' function capitalizes the first letter of a given string.

```ts
import { createSignal } from "solid-js";

export const getSearchParams = (init: string) => {
  const [search, setSearch] = createSignal(init);
  if (typeof window !== "undefined") {
    window.addEventListener("popstate", () => {
      const location = window.location;
      const params = new URLSearchParams(location.search);
      setSearch(params.get("id") || "");
    });
  }
  return search;
};

export const properCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
```

---

### Fetch and Display Posts List with React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/default-query-function

Component that fetches and displays a list of posts using useQuery hook with query key '/posts'. Manages loading, error, and success states. Uses queryClient.getQueryData() to check if individual posts are cached, styling cached links in bold green to indicate instant loading capability.

```typescript
function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();

  const { status, data, error, isFetching } = useQuery<Array<Post>>({
    queryKey: ["/posts"],
  });

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      queryClient.getQueryData([`/posts/${post.id}`])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}
```

---

### Enable Svelte Runes Mode Per File

Source: https://tanstack.com/query/latest/docs/framework/svelte/migrate-from-v5-to-v6

To ensure a specific Svelte component fully adopts runes mode, especially during gradual migrations, add `<svelte:options runes={true} />` at the top of the `.svelte` file.

```svelte
<svelte:options runes={true} />
```

---

### Lazy Loading Component with Dependent Query in Solid.js

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/prefetching

Illustrates a common pattern where a component (`GraphFeedItem`) is lazy-loaded, and its data fetching (`getGraphDataById`) is dependent on the result of a parent query (`getFeed`). This setup leads to a request waterfall where the graph data is fetched only after the component's JavaScript has loaded.

```tsx
// This lazy loads the GraphFeedItem component, meaning
// it wont start loading until something renders it
const GraphFeedItem = Solid.lazy(() => import('./GraphFeedItem'))

function Feed() {
  const { data, isPending } = useQuery(() => {
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

// GraphFeedItem.tsx
function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery(() => {
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
}
```

---

### Configure TanStack Query with Lazy Devtools Loading

Source: https://tanstack.com/query/latest/docs/framework/angular/devtools

This Angular configuration example shows how to integrate TanStack Query with devtools, enabling lazy loading in production environments. It uses a custom service (`DevtoolsOptionsManager`) and the `withDevtools` function with `deps` to conditionally load devtools upon a specific keyboard shortcut. The `production` sub-path import ensures optimal bundling.

```typescript
// ...
// 👇 Note we import from the production sub-path to enable devtools lazy loading in production builds
import { withDevtools } from "@tanstack/angular-query-experimental/devtools/production";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideTanStackQuery(
      new QueryClient(),
      withDevtools(
        (devToolsOptionsManager: DevtoolsOptionsManager) => ({
          loadDevtools: devToolsOptionsManager.loadDevtools(),
        }),
        {
          // `deps` is used to inject and pass `DevtoolsOptionsManager` to the `withDevtools` callback.
          deps: [DevtoolsOptionsManager],
        }
      )
    ),
  ],
};
```

---

### Create and Configure Query Persister

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister

Demonstrates how to create an instance of experimental_createQueryPersister with AsyncStorage and configure it within the QueryClient's default options. This sets up persistence for all queries managed by this client.

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";

const persister = experimental_createQueryPersister({
  storage: AsyncStorage,
  maxAge: 1000 * 60 * 60 * 12, // 12 hours
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 30, // 30 seconds
      persister: persister.persisterFn,
    },
  },
});
```

---

### Implement Optimistic Updates for Todo List with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui

This TypeScript React code demonstrates an optimistic UI update pattern using `useMutation` from TanStack Query. It fetches a list of todos, allows new todos to be added, and temporarily displays the new todo in the UI before server confirmation. Error handling includes reverting the UI and providing a retry mechanism, while `onSettled` ensures data invalidation after any mutation attempt.

```tsx
import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

type Todos = {
  items: ReadonlyArray<{
    id: string;
    text: string;
  }>;
  ts: number;
};

async function fetchTodos(): Promise<Todos> {
  const response = await fetch("/api/data");
  return await response.json();
}

function useTodos() {
  return useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}

function Example() {
  const queryClient = useQueryClient();
  const [text, setText] = React.useState("");
  const todoQuery = useTodos();

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: string) => {
      const response = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify({ text: newTodo }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json();
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <div>
      <p>
        In this example, new items can be created using a mutation. The new item
        will be optimistically added to the list in hopes that the server
        accepts the item. If it does, the list is refetched with the true items
        from the list. Every now and then, the mutation may fail though. When
        that happens, the previous list of items is restored and the list is
        again refetched from the server.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText("");
          addTodoMutation.mutate(text);
        }}
      >
        <input
          type="text"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <button disabled={addTodoMutation.isPending}>Create</button>
      </form>
      <br />
      {todoQuery.isSuccess && (
        <>
          <div>
            {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */}
            Updated At: {new Date(todoQuery.data.ts).toLocaleTimeString()}
          </div>
          <ul>
            {todoQuery.data.items.map((todo) => (
              <li key={todo.id}>{todo.text}</li>
            ))}
            {addTodoMutation.isPending && (
              <li style={{ opacity: 0.5 }}>{addTodoMutation.variables}</li>
            )}
            {addTodoMutation.isError && (
              <li style={{ color: "red" }}>
                {addTodoMutation.variables}
                <button
                  onClick={() =>
                    addTodoMutation.mutate(addTodoMutation.variables)
                  }
                >
                  Retry
                </button>
              </li>
            )}
          </ul>
          {todoQuery.isFetching && <div>Updating in background...</div>}
        </>
      )}
      {todoQuery.isPending && "Loading"}
      {todoQuery.error instanceof Error && todoQuery.error.message}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
```

---

### Enable Solid Query Devtools with Floating Mode

Source: https://tanstack.com/query/latest/docs/framework/solid/devtools

Shows how to integrate the `SolidQueryDevtools` component into the root of a SolidJS application using `QueryClientProvider`. The `initialIsOpen` prop controls the default visibility of the devtools panel.

```tsx
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

### Define and Use Default Query Function with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function

This example shows how to define a `defaultQueryFn` using `axios` to fetch data from a JSON placeholder API. It then configures `QueryClient` with this default function and demonstrates its usage within `useQuery` hooks in a React application, simplifying query definitions by only requiring `queryKey`.

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`
  );
  return data;
};

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}

// All you have to do now is pass a key!
function Posts() {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["/posts"],
  });

  // ...
}

// You can even leave out the queryFn and just go straight into options
function Post({ postId }) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`/posts/${postId}`],
    enabled: !!postId,
  });

  // ...
}
```

---

### Configure `streamedQuery` with React Query

Source: https://tanstack.com/query/latest/docs/reference/streamedQuery

This snippet demonstrates how to import the experimental `streamedQuery` helper from `@tanstack/react-query` and configure a basic query using `queryOptions`. It sets up a `queryKey` and assigns `streamedQuery` to `queryFn`, providing a `streamFn` (like `fetchDataInChunks`) to handle the asynchronous data stream.

```tsx
import { experimental_streamedQuery as streamedQuery } from "@tanstack/react-query";

const query = queryOptions({
  queryKey: ["data"],
  queryFn: streamedQuery({
    streamFn: fetchDataInChunks,
  }),
});
```

---

### Asynchronous Function to Create a New Todo

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This TypeScript function simulates an API call for creating a new todo item. It accepts `name` and `notes`, assigns a new unique ID, adds it to a local list of todos, and returns a `Promise` that resolves with the newly created todo or rejects if an error occurs.

```typescript
function postTodo({ name, notes }: Omit): Promise { console.info('postTodo', { name, notes }) return new Promise((resolve, reject) => { setTimeout( () => { if (Math.random() < errorRate) { return reject( new Error(JSON.stringify({ postTodo: { name, notes } }, null, 2)), ) } const todo = { name, notes, id: id++ } list = [...list, todo] resolve(todo) }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin), ) }) }
```

---

### Prefetch queries and hydrate component in Next.js pages router

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

Demonstrates the complete pattern for server-side prefetching using getStaticProps or getServerSideProps, dehydrating the queryClient state, and using HydrationBoundary to wrap components with the preloaded data. Shows both prefetched queries (available immediately) and client-only queries (fetched after hydration) working together.

```typescript
// pages/posts.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

// This could also be getServerSideProps
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ["posts-comments"],
    queryFn: getComments,
  });

  // ...
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
```

---

### Consume Non-Reactive Vue-Query Composable

Source: https://tanstack.com/query/latest/docs/framework/vue/reactivity

This TypeScript example illustrates how the initially defined `useUserProjects` composable might be consumed. By passing `userId.value` directly, the query is not reactive to changes in the `userId` ref, meaning it will not re-fetch when `userId` is updated.

```ts
// Reactive user ID ref.
const userId = ref("1");
// Fetches the user 1's projects.
const { data: projects } = useUserProjects(userId.value);

const onChangeUser = (newUserId: string) => {
  // Edits the userId, but the query will not re-fetch.
  userId.value = newUserId;
};
```

---

### Initialize Query Persister with Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/plugins/createPersister

Demonstrates how to initialize the experimental_createQueryPersister and integrate it with Vue Query's QueryClient. It sets a default persister for all queries with a specified maxAge and garbage collection time.

```tsx
import { QueryClient } from "@tanstack/vue-query";
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";

const persister = experimental_createQueryPersister({
  storage: AsyncStorage,
  maxAge: 1000 * 60 * 60 * 12, // 12 hours
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 30, // 30 seconds
      persister: persister.persisterFn,
    },
  },
});
```

---

### useMutation Hook - Parameters & Configuration

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

Documentation for the useMutation hook parameters including meta data and QueryClient configuration. This section covers optional parameters that customize mutation behavior and context management.

````APIDOC
## useMutation Hook - Parameters

### Description
Configures and initializes a mutation with optional metadata and custom QueryClient settings.

### Parameters

#### meta (Optional)
- **Type**: `unknown`
- **Description**: Stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever the mutation is available (e.g., `onError`, `onSuccess` functions of the `MutationCache`).

#### queryClient (Optional)
- **Type**: `QueryClient`
- **Description**: Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

### Usage Example
```javascript
const mutation = useMutation({
  mutationFn: async (variables) => {
    // mutation function
  },
  meta: { customData: 'value' },
  queryClient: customQueryClient
})
````

````

--------------------------------

### Get Query State with queryClient.getQueryState (TypeScript/TSX)

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

The `getQueryState` function provides synchronous access to an existing query's state in the cache. It returns `undefined` if the specified query, identified by `queryKey`, does not currently exist. This method allows inspecting properties of the query's state, such as `dataUpdatedAt`.

```tsx
const state = queryClient.getQueryState(queryKey)
console.log(state.dataUpdatedAt)
````

---

### Global CSS Body Styling

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This CSS snippet defines global styles applied to the `body` element of the web page. It sets basic layout properties such as margin and padding, specifies a font family stack, enables font smoothing, and defines the default text and background colors.

```css
body {
  margin: 0;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: #0b1521;
}
```

---

### Await Asynchronous Callbacks in TanStack Query Mutations

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/mutations

This example illustrates that when a promise is returned from any `useMutation` callback (e.g., `onSuccess` or `onSettled`), TanStack Query will await its resolution before proceeding to execute subsequent callbacks in the lifecycle chain. This ensures proper sequencing of asynchronous side effects.

```tsx
useMutation(() => {
  mutationFn: addTodo,
  onSuccess: async () => {
    console.log("I'm first!")
  },
  onSettled: async () => {
    console.log("I'm second!")
  },
})
```

---

### Asynchronous Function to Fetch a Single Todo by ID

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This TypeScript function simulates fetching a single todo item by its unique identifier. It introduces an artificial delay and a random error rate to mimic network conditions, resolving with the found todo or rejecting with an error if not found or if an error occurs.

```typescript
function fetchTodoById({ id }: { id: number }): Promise { console.info('fetchTodoById', { id }) return new Promise((resolve, reject) => { setTimeout( () => { if (Math.random() < errorRate) { return reject( new Error(JSON.stringify({ fetchTodoById: { id } }, null, 2)), ) } resolve(list.find((d) => d.id === id)) }, queryTimeMin + Math.random() * (queryTimeMax - queryTimeMin), ) }) }
```

---

### Consume Flexible Vue-Query Composable with Plain or Reactive Values

Source: https://tanstack.com/query/latest/docs/framework/vue/reactivity

This TypeScript example demonstrates the versatility of the `useUserProjects` composable when it accepts `MaybeRef`. It shows how to pass a plain string for static queries and a reactive `ref` for queries that require automatic re-fetching based on changing dependencies.

```ts
// Fetches the user 1's projects, userId is not expected to change.
const { data: projects } = useUserProjects("1");

// Fetches the user 1's projects, queries will react to changes on userId.
const userId = ref("1");

// Make some changes to userId...

// Query re-fetches based on any changes to userId.
const { data: projects } = useUserProjects(userId);
```

---

### Prefix-Based Query Matching in TanStack Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-invalidation

Demonstrates how to invalidate multiple queries using prefix matching on query keys. In this example, both queries with keys ['todos'] and ['todos', { page: 1 }] will be invalidated when using the prefix ['todos']. This approach allows bulk invalidation of related queries.

```typescript
import { useQuery, useQueryClient } from "@tanstack/solid-query";

// Get QueryClient from the context
const queryClient = useQueryClient();

queryClient.invalidateQueries({ queryKey: ["todos"] });

// Both queries below will be invalidated
const todoListQuery = useQuery(() => ({
  queryKey: ["todos"],
  queryFn: fetchTodoList,
}));
const todoListQuery = useQuery(() => ({
  queryKey: ["todos", { page: 1 }],
  queryFn: fetchTodoList,
}));
```

---

### Setup Vue Query Plugin for Nuxt 3

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/ssr

Configure Vue Query plugin for Nuxt 3 with server-side dehydration and client-side hydration. Creates a queryClient with default stale time settings and handles dehydration on server render and hydration on client initialization.

```typescript
import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";
import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value);
  }
});
```

---

### Type Inference with Select Transformer in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/solid/typescript

Shows how type inference flows through the select function. When a select function transforms the data, the inferred type updates accordingly. In this example, the data type becomes string | undefined after the toString() transformation.

```typescript
import { useQuery } from "@tanstack/solid-query";

const query = useQuery(() => ({
  queryKey: ["test"],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
}));

query.data;
//    ^? (property) data: string | undefined
```

---

### Fetch Single Post with Conditional Query Enabling

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Custom hook that fetches a single post by ID using TanStack Query's useQuery with conditional enabling. Only executes the query when a valid postId is provided. Makes GraphQL request for post details including title and body.

```TypeScript
function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { post } = await request<{ post: Post }>(
        endpoint,
        gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `,
      )

      return post
    },
    enabled: !!postId,
  })
}
```

---

### Configure Global Retry Delay (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-retries

This example shows how to set a global retry delay for all queries using `QueryClient`. The `retryDelay` is configured as a function that doubles the delay with each attempt, up to a maximum of 30 seconds. This implements an exponential back-off strategy. This configuration is applied via `QueryClient` and `defaultOptions`.

```typescript
// Configure for all queries
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/angular-query-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

bootstrapApplication(AppComponent, {
  providers: [provideTanStackQuery(queryClient)],
});
```

---

### Optimistically Update Single Todo with useMutation (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

This example demonstrates how to optimistically update a single todo item using the `useMutation` hook. It includes canceling outgoing refetches, snapshotting the previous value, setting the new query data, and handling errors and settled states for optimistic updates.

```tsx
useMutation({
  mutationFn: updateTodo,
  // When mutate is called:
  onMutate: async (newTodo, context) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await context.client.cancelQueries({ queryKey: ["todos", newTodo.id] });

    // Snapshot the previous value
    const previousTodo = context.client.getQueryData(["todos", newTodo.id]);

    // Optimistically update to the new value
    context.client.setQueryData(["todos", newTodo.id], newTodo);

    // Return a result with the previous and new todo
    return { previousTodo, newTodo };
  },
  // If the mutation fails, use the result we returned above
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(
      ["todos", onMutateResult.newTodo.id],
      onMutateResult.previousTodo
    );
  },
  // Always refetch after error or success:
  onSettled: (newTodo, error, variables, onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: ["todos", newTodo.id] }),
});
```

---

### Correct QueryClient Instantiation using useState in React

Source: https://tanstack.com/query/latest/docs/eslint/stable-query-client

Shows a correct method for instantiating QueryClient in React using the useState hook with an initializer function. This ensures that the QueryClient is created only once and persists across renders, adhering to the stable QueryClient rule.

```tsx
function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
```

---

### Asynchronous Function to Update an Existing Todo

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This TypeScript function simulates an API call for updating an existing todo item. It takes an optional `Todo` object, finds and replaces it in a local list, and returns a `Promise` that resolves with the updated todo or rejects if an error is simulated.

```typescript
function patchTodo(todo?: Todo): Promise { console.info('patchTodo', todo) return new Promise((resolve, reject) => { setTimeout( () => { if (Math.random() < errorRate) { return reject(new Error(JSON.stringify({ patchTodo: todo }, null, 2))) } list = list.map((d) => { if (d.id === todo.id) { return todo } return d }) resolve(todo) }, queryTimeMin + Math.random() * (queryTimeMax - queryMinTime), ) }) }
```

---

### Setup ReactQueryStreamedHydration Provider in Next.js

Source: https://tanstack.com/query/latest/docs/framework/react/guides/suspense

Configures TanStack Query with ReactQueryStreamedHydration wrapper for Next.js Suspense streaming. Creates a singleton QueryClient that persists on the browser while generating new instances on the server, with staleTime set to prevent immediate refetching. This provider component must wrap the application to enable streaming hydration.

```typescript
// app/providers.tsx
"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers(props: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
```

---

### React Component for Displaying Todo Status and Input Fields

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This JSX snippet shows a React component rendering UI based on query and mutation statuses (pending, error, success). It includes input fields for 'Name' and 'Notes' with event handlers that update component state and disabled states based on mutation status, along with a save button reflecting the `saveMutation` status.

```jsx
{status === 'pending' ? ( ' Loading... (Attempt: {failureCount + 1}) ' ) : error ? ( ' Error! ' refetch() >Retry ' ) : ( <> Name: {' '} <input value={todo.name} onChange={(e) => { e.persist() || setTodo((old) => ({ ...old, name: e.target.value })) }} disabled={disableEditSave} /> Notes: {' '} <input value={todo.notes} onChange={(e) => { e.persist() || setTodo((old) => ({ ...old, notes: e.target.value })) }} disabled={disableEditSave} /> Save {saveMutation.status === 'pending' ? 'Saving...' : saveMutation.status === 'error' ? saveMutation.error.message : 'Saved!'} {isFetching ? ( ' Background Refreshing... (Attempt: {failureCount + 1}) ' ) : ( ' ' )} ) }
```

---

### Initialize and Subscribe to InfiniteQueryObserver (TypeScript/TSX)

Source: https://tanstack.com/query/latest/docs/reference/InfiniteQueryObserver

This code snippet demonstrates how to instantiate `InfiniteQueryObserver` with a `queryClient` and specific query options, including functions to determine the next and previous page parameters for infinite scrolling. It then sets up a subscription to listen for query result updates, logging the result and immediately unsubscribing after the first update.

```tsx
const observer = new InfiniteQueryObserver(queryClient, {
  queryKey: ["posts"],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
});

const unsubscribe = observer.subscribe((result) => {
  console.log(result);
  unsubscribe();
});
```

---

### Configure Mutation with Lifecycle Callbacks in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/mutations

Set up injectMutation with callback functions that execute at different stages of the mutation lifecycle: onMutate before mutation starts, onError on failure, onSuccess on completion, and onSettled after either outcome. The onMutate callback can return data for rollback scenarios.

```typescript
mutation = injectMutation(() => ({
  mutationFn: addTodo,
  onMutate: (variables, context) => {
    // A mutation is about to happen!

    // Optionally return a result containing data to use when for example rolling back
    return { id: 1 };
  },
  onError: (error, variables, onMutateResult, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${onMutateResult.id}`);
  },
  onSuccess: (data, variables, onMutateResult, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, onMutateResult, context) => {
    // Error or success... doesn't matter!
  },
}));
```

---

### Prefetch Query in Parent Component - React Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/prefetching

Optimizes the request waterfall by prefetching the comments query in the parent Article component using useQuery with ignored results. The notifyOnChangeProps option prevents unnecessary rerenders. This approach starts both queries in parallel instead of sequentially.

```typescript
function Article({ id }) {
  const { data: articleData, isPending } = useQuery(() => {
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  // Prefetch
  useQuery(() => {
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
    // Optional optimization to avoid rerenders when this query changes:
    notifyOnChangeProps: [],
  })

  if (isPending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      <Comments id={id} />
    </>
  )
}

function Comments({ id }) {
  const { data, isPending } = useQuery(() => {
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  ...
}
```

---

### Migrate isLoading to isInitialLoading for disabled queries in TypeScript/TSX

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4

Replace isLoading with isInitialLoading to properly detect initial loading state for disabled queries. Disabled queries now start in loading state, requiring this flag change to correctly display loading spinners.

```typescript
-isLoading + isInitialLoading;
```

---

### Prefetch Inside Query Function - React Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/prefetching

Prefetches dependent queries within the queryFn using queryClient.prefetchQuery. This approach is useful when you know that every time a primary query executes, a secondary query will likely be needed, allowing you to start both fetches together.

```typescript
const queryClient = useQueryClient()
const { data: articleData, isPending } = useQuery(() => {
  queryKey: ['article', id],
  queryFn: (...args) => {
    queryClient.prefetchQuery({
      queryKey: ['article-comments', id],
      queryFn: getArticleCommentsById,
    })

    return getArticleById(...args)
  },
})
```

---

### Vue.js App Component for Post Navigation

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/persister

This root Vue.js component (`App.vue`) uses the Composition API to manage application state. It tracks visited post IDs and the currently active `postId`, dynamically rendering either a `Post` detail view or a `Posts` list view based on user interaction. It demonstrates basic routing logic and state persistence within the client.

```vue
<script lang="ts">
import { defineComponent, ref } from "vue";

import Posts from "./Posts.vue";
import Post from "./Post.vue";

export default defineComponent({
  name: "App",
  components: { Posts, Post },
  setup() {
    const visitedPosts = ref(new Set());
    const isVisited = (id: number) => visitedPosts.value.has(id);

    const postId = ref(-1);
    const setPostId = (id: number) => {
      visitedPosts.value.add(id);
      postId.value = id;
    };

    return {
      isVisited,
      postId,
      setPostId,
    };
  },
});
</script>

<template>
  <h1>Vue Query - Basic</h1>
  <p>
    As you visit the posts below, you will notice them in a loading state the
    first time you load them. However, after you return to this list and click
    on any posts you have already visited again, you will see them load
    instantly and background refresh right before your eyes!
    <strong>
      (You may need to throttle your network speed to simulate longer loading
      sequences)
    </strong>
  </p>
  <Post v-if="postId > -1" :postId="postId" @setPostId="setPostId" />
  <Posts v-else :isVisited="isVisited" @setPostId="setPostId" />
</template>
```

---

### Fetch Individual Post with Conditional Query Execution

Source: https://tanstack.com/query/latest/docs/framework/react/examples/default-query-function

Component that fetches a single post by ID using useQuery with enabled option set to conditionally execute only when postId is valid. Demonstrates query key parameterization with dynamic postId and managing individual post loading states with background refresh indication.

```typescript
function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = useQuery<Post>({
    queryKey: [`/posts/${postId}`],
    enabled: !!postId,
  });

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}
```

---

### useQuery Configuration - retry and retryDelay Options

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Shows exponential and linear backoff implementations for retry delay strategies. These functions demonstrate common patterns for handling failed query attempts with progressive delays between retries.

```typescript
// Exponential backoff
const exponentialBackoff = (attempt) =>
  Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000);

// Linear backoff
const linearBackoff = (attempt) => attempt * 1000;
```

---

### React Component for Adding New Todos with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This React functional component allows users to add new todo items. It utilizes `useQueryClient` to invalidate queries on successful addition, and `useMutation` to handle the asynchronous `postTodo` operation, managing input state and disabling the add button during pending mutations.

```jsx
function AddTodo() { const queryClient = useQueryClient() const [name, setName] = React.useState('') const addMutation = useMutation({ mutationFn: postTodo, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['todos'] }) }, }) return ( <input value={name} onChange={(e) => setName(e.target.value)} disabled={addMutation.status === 'pending'} /> <button onClick={() => { addMutation.mutate({ name, notes: 'These are some notes' }) }} disabled={addMutation.status === 'pending' || !name} > Add Todo </button> {addMutation.status === 'pending' ? 'Saving...' : addMutation.status === 'error' ? addMutation.error.message : 'Saved!'} ) }
```

---

### Configure Fixed Retry Delay (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

This example shows how to set a constant retry delay for a specific query. Instead of a dynamic back-off strategy, the query will wait for a fixed 1000ms before each retry attempt, regardless of the number of retries that have occurred. This can be useful for scenarios where a consistent retry interval is desired.

```tsx
const result = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodoList,
  retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
});
```

---

### Fetch Individual Post with Conditional GraphQL Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/basic-graphql-request

Custom hook that fetches a single post by ID from GraphQL API. Uses the enabled option to prevent queries when postId is invalid (-1). Implements GraphQL string interpolation for dynamic ID parameter.

```typescript
function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { post } = await request<{ post: Post }>(
        endpoint,
        gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `
      );
      return post;
    },
    enabled: !!postId,
  });
}
```

---

### Monitor Query Fetching Status with Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useIsFetching

This snippet demonstrates how to use the `useIsFetching` hook from `@tanstack/vue-query` to track the number of active queries. It shows how to get the total number of fetching queries and how to filter by a specific `queryKey` like 'posts'. The hook returns a number indicating the count of matching fetching queries.

```tsx
import { useIsFetching } from "@tanstack/vue-query";
// How many queries are fetching?
const isFetching = useIsFetching();
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ["posts"] });
```

---

### Inferring Data Type with Select Transform in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/typescript

This example shows how type inference adapts when a `select` transformation function is used. Although the `queryFn` returns a `number`, the `select` function transforms it to a `string`, causing `data` to be inferred as `string | undefined` after the transformation.

```tsx
const { data } = useQuery({
  //      ^? const data: string | undefined
  queryKey: ["test"],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
});
```

---

### useQuery Configuration - Refetch Options

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Configuration options that control when and how queries are refetched automatically. These options determine refetch behavior on mount, window focus, and reconnection events.

````APIDOC
## useQuery Configuration - Refetch Options

### Description
Controls automatic refetching behavior for queries based on various lifecycle events and conditions.

### Configuration Parameters

#### refetchOnMount
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Required**: No
- **Default**: `true`
- **Description**: Determines if the query should refetch on component mount
  - `true`: Refetch if data is stale
  - `false`: Do not refetch on mount
  - `"always"`: Always refetch on mount (except when `staleTime: 'static'`)
  - `function`: Execute function with query to compute refetch value

#### refetchOnWindowFocus
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Required**: No
- **Default**: `true`
- **Description**: Determines if the query should refetch when window regains focus
  - `true`: Refetch if data is stale
  - `false`: Do not refetch on window focus
  - `"always"`: Always refetch on window focus (except when `staleTime: 'static'`)
  - `function`: Execute function with query to compute refetch value

#### refetchOnReconnect
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Required**: No
- **Default**: `true`
- **Description**: Determines if the query should refetch when network reconnects
  - `true`: Refetch if data is stale
  - `false`: Do not refetch on reconnect
  - `"always"`: Always refetch on reconnect (except when `staleTime: 'static'`)
  - `function`: Execute function with query to compute refetch value

### Usage Example
```javascript
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  refetchOnMount: true,
  refetchOnWindowFocus: 'always',
  refetchOnReconnect: (query) => !query.isStale()
})
````

````

--------------------------------

### Improved Paginated Queries with placeholderData in Vue

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/paginated-queries

An enhanced example using Vue.js and TanStack Query's `useQuery` hook with `placeholderData: keepPreviousData`. This approach prevents UI jumps by retaining the previous data while new data is being fetched, and `isPlaceholderData` indicates when placeholder data is being shown.

```vue
<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'

const fetcher = (page: Ref<number>) =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`,
  ).then((response) => response.json())

const page = ref(1)
const { isPending, isError, data, error, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetcher(page),
    placeholderData: keepPreviousData,
  })
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}
const nextPage = () => {
  if (!isPlaceholderData.value) {
    page.value = page.value + 1
  }
}
</script>

<template>
  <h1>Posts</h1>
  <p>Current Page: {{ page }} | Previous data: {{ isPlaceholderData }}</p>
  <button @click="prevPage">Prev Page</button>
  <button @click="nextPage">Next Page</button>
  <div v-if="isPending">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <div v-else-if="data">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
````

---

### Create Second Data Package with Custom Context - React Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4

Shows creating an independent data package with its own custom context and QueryClient instance for managing component-specific data. This isolated setup prevents data conflicts and allows multiple QueryClient instances to operate independently within the same application.

```tsx
// Our second data package: @my-scope/my-component-data

const context = React.createContext<QueryClient | undefined>(undefined);
const queryClient = new QueryClient();

export const useItems = () => {
  return useQuery(ITEMS_KEY, ITEMS_FETCHER, {
    context,
  });
};

export const MyComponentDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
    </QueryClientProvider>
  );
};
```

---

### Configure Global Retry Delay (Vue)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/query-retries

This example shows how to set a global default retry delay for all queries in a Vue application using `VueQueryPlugin`. The `retryDelay` is configured with a back-off strategy, doubling the delay with each attempt up to a maximum of 30 seconds. It can also be set to a fixed integer for a constant delay.

```ts
import { VueQueryPlugin } from "@tanstack/vue-query";

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
```

---

### TypeScript Function: Fetching Todos with Filter and Abort Signal

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This asynchronous function is responsible for fetching a list of todos from an API. It accepts a 'signal' for aborting the request and 'queryKey' containing a 'filter' string. It logs the filter value for debugging purposes and demonstrates how to attach an event listener to the 'signal' for request cancellation.

```typescript
function fetchTodos({ signal, queryKey: [, { filter }] }): Promise<Todos> {
  console.info('fetchTodos', { filter })

  if (signal) {
    signal.addEventListener('abort', () => {

```

---

### Get Multiple Cached Queries Data using queryClient in TypeScript

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Synchronously retrieve cached data for multiple queries matching specified filters using queryClient.getQueriesData. Returns an array of tuples containing query keys and their associated data. Returns empty array if no matches found.

```typescript
const data = queryClient.getQueriesData(filters);
```

---

### Apply Conditional Styling based on TanStack Query Cache Data

Source: https://tanstack.com/query/latest/docs/framework/react/examples/prefetching

This JSX expression applies conditional inline styling to an element. It checks if `queryClient.getQueryData(['character', char.id])` returns any data from the TanStack Query cache. If data is present, `fontWeight: 'bold'` is applied; otherwise, an empty style object is used.

```javascript
queryClient.getQueryData(["character", char.id])
  ? {
      fontWeight: "bold",
    }
  : {};
```

---

### Invalidate queries on mutation success in TanStack Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/invalidations-from-mutations

This example demonstrates how to invalidate related queries after a mutation successfully completes using the `onSuccess` callback of `useMutation` and `queryClient.invalidateQueries`. It shows how to invalidate a single query or multiple queries simultaneously, ensuring the UI reflects the updated data.

```tsx
import { useMutation, useQueryClient } from '@tanstack/solid-query'

const queryClient = useQueryClient()

// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation(() => {
  mutationFn: addTodo,
  onSuccess: async () => {
    // If you're invalidating a single query
    await queryClient.invalidateQueries({ queryKey: ['todos'] })

    // If you're invalidating multiple queries
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['todos'] }),
      queryClient.invalidateQueries({ queryKey: ['reminders'] })
    ])
  }
})
```

---

### useQuery Configuration - Render and Tracking Options

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Options for controlling component re-renders and property change tracking, enabling fine-grained control over when components update in response to query state changes.

````APIDOC
## useQuery Configuration - Render and Tracking Options

### Description
Controls component re-rendering behavior and which query properties trigger updates.

### Configuration Parameters

#### notifyOnChangeProps
- **Type**: `string[] | "all" | (() => string[] | "all" | undefined)`
- **Required**: No
- **Description**: Specifies which query properties should trigger component re-renders
  - `string[]`: Re-render only when listed properties change (e.g., `['data', 'error']`)
  - `"all"`: Opt-out of smart tracking, re-render on any query update
  - `function`: Execute function to dynamically compute list of properties
  - **Default behavior**: Access to properties is tracked, component re-renders only when tracked properties change

### Usage Example
```javascript
const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  notifyOnChangeProps: ['data', 'error']
})

// Component only re-renders when data or error changes
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  notifyOnChangeProps: 'all'
})

// Component re-renders on all query updates
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  notifyOnChangeProps: () => ['data', 'isLoading']
})

// Dynamically determine which properties to track
````

````

--------------------------------

### Render Infinite Scroll UI with TanStack Query in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/infinite-query-with-max-pages

This JSX snippet defines the rendering logic for an infinite scroll interface. It iterates through fetched project data, displays a 'Load Newer' button (which triggers `fetchNextPage`), and shows different messages based on the loading state, such as 'Loading more...' or 'Background Updating...'. It assumes `fetchNextPage`, `hasNextPage`, and `isFetchingNextPage` are provided by a TanStack Query hook like `useInfiniteQuery`.

```jsx
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '8px',
                    fontSize: '14px',
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.name}
                </p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load Newer'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
      <hr />
      <ReactQueryDevtools initialIsOpen />
    </div>
````

---

### Todo Form with Mutation in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui

Handles form submission for creating new todos using TanStack Query's useMutation hook. The form captures user input, triggers the mutation on submit, and displays loading state on the button. Resets the input field after successful submission.

```jsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    setText("");
    addTodoMutation.mutate(text);
  }}
>
  <input
    type="text"
    onChange={(event) => setText(event.target.value)}
    value={text}
  />
  <button disabled={addTodoMutation.isPending}>Create</button>
</form>
```

---

### Query Garbage Collection Configuration - TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/caching

Demonstrates the default garbage collection behavior with gcTime (5 minutes) and staleTime (0 milliseconds). When all query instances are destroyed, a garbage collection timeout is set to delete cached data if no new instances appear within the gcTime window.

```typescript
// Default configuration:
// gcTime: 5 minutes (300000 ms)
// staleTime: 0 ms (immediately stale)
// When all instances destroyed, cache deleted after 5 minutes of inactivity
```

---

### Fetch and Display Dog Breeds with Tanstack Query (React/TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/react/examples/shadow-dom

This React component, `DogList`, uses Tanstack Query to asynchronously fetch a list of all dog breeds from the `dog.ceo` API. It manages and displays different UI states for pending requests, errors, and successful data retrieval, rendering the breeds in an unordered list. The `useQuery` hook encapsulates the data fetching logic.

```typescript
import { useQuery } from "@tanstack/react-query";

type DogsResp = { message: { [dog: string]: Array } };

export const DogList = () => {
  const { data, status } = useQuery({
    queryKey: ["dogs"],
    queryFn: async () => {
      const resp = await fetch("https://dog.ceo/api/breeds/list/all");
      if (resp.ok) {
        return resp.json();
      }
      throw new Error("something went wrong");
    },
  });

  if (status === "pending") return "Loading...";
  if (status === "error") return "Error!";

  const dogs = Object.keys(data.message);
  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog}>{dog}</li>
      ))}
    </ul>
  );
};
```

---

### React Application Root Rendering in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/examples/simple

This snippet represents a fragment of a React application's entry point, demonstrating how to mount a React component to a DOM element using `ReactDOM.createRoot` in TypeScript. It's an incomplete segment, likely part of a larger file.

```typescript
) } const rootElement = document.getElementById('root') as HTMLElement ReactDOM.createRoot(rootElement).render()
```

---

### Define Component Props with userId in Vue

Source: https://tanstack.com/query/latest/docs/framework/vue/reactivity

Sets up a Vue component with typed props using script setup syntax. Defines a userId prop as a string that will be passed to the component. This pattern is commonly used when userId needs to be tracked for query dependencies.

```vue
<script setup lang="ts">
const props = defineProps<{
  userId: string;
}>();
</script>
```

---

### Query Loading and Error States in React Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui

Handles loading and error states for the todo query using TanStack Query's query status properties. Displays a loading indicator while data is being fetched initially and shows error messages if the query encounters an error.

```jsx
{
  todoQuery.isPending && "Loading";
}
{
  todoQuery.error instanceof Error && todoQuery.error.message;
}
```

---

### Disable Query with enabled: false - Vue

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/disabling-queries

Demonstrates how to completely disable a query from automatically running using `enabled: false`. The query will only fetch when `refetch()` is manually called. This example shows a Vue component fetching a list of todos, initially disabled, with a button to trigger the fetch.

```vue
<script setup>
import { useQuery } from "@tanstack/vue-query";

const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodoList,
  enabled: false,
});
</script>

<template>
  <button @click="refetch()">Fetch Todos</button>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div v-else-if="data">
    <span v-if="isFetching">Fetching...</span>
    <ul>
      <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
  <span v-else>Not ready...</span>
</template>
```

---

### Type-Safe Disabling with skipToken (Angular)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/disabling-queries

This Angular example demonstrates how to use `skipToken` for type-safe query disabling. When the filter is empty, the query is effectively disabled by returning `skipToken` as the `queryFn`. This prevents execution while maintaining type safety, though manual `refetch` will not work.

```typescript
import { Component, signal } from "@angular/core";
import { skipToken, injectQuery } from "@tanstack/query-angular";

async function fetchTodos(filter: string) {
  // Simulate API call with filter
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [{ id: 1, title: `Todo for ${filter}` }];
}

@Component({
  selector: "todos",
  template: `
    <div>
      // 🚀 applying the filter will enable and execute the query
      <filters-form (onApply)="filter.set($event)" />
      <todos-table [data]="todosQuery.data()" />
    </div>
  `,
})
export class TodosComponent {
  filter = signal("");

  todosQuery = injectQuery(() => ({
    queryKey: ["todos", this.filter()],
    queryFn: this.filter() ? () => fetchTodos(this.filter()) : skipToken,
  }));
}

// Dummy components for demonstration
@Component({
  selector: "filters-form",
  template: `<button (click)="emitApply('filterValue')">Apply Filter</button>`,
  outputs: ["onApply"],
})
export class FiltersForm {
  // Dummy emit logic
  emitApply(value: string) {
    /* emit to parent */
  }
}

@Component({
  selector: "todos-table",
  template: `<div>{{ data ? data[0].title : "No data" }}</div>`,
  inputs: ["data"],
})
export class TodosTable {
  // Dummy input
  data: any;
}
```

---

### Dehydrate QueryClient state on server-side render in Nuxt3

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Captures and serializes the QueryClient state after server-side rendering is complete using the dehydrate function. This state is stored in vueQueryState for transmission to the client, enabling proper hydration of cached queries on the client side.

```TypeScript
if (import.meta.server) {
  nuxt.hooks.hook('app:rendered', () => {
    vueQueryState.value = dehydrate(queryClient)
  })
}
```

---

### Memoize Placeholder Data with createMemo

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/placeholder-query-data

Shows how to memoize placeholder data generation to avoid expensive computations on every render. This approach is useful when generating placeholder data requires intensive processing or when you want to optimize performance.

```tsx
function Todos() {
  const placeholderData = createMemo(() => generateFakeTodos(), [])
  const result = useQuery(() => {
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData,
  })
}
```

---

### Lazy Query with Conditional Fetching (Angular)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/disabling-queries

This example shows how to implement a lazy query in Angular that only fetches data when a condition is met. The `enabled` option is set to a boolean expression derived from a filter signal, ensuring the query runs only when a filter value is present.

```typescript
import { Component, signal } from "@angular/core";
import { injectQuery } from "@tanstack/query-angular";

async function fetchTodos(filter: string) {
  // Simulate API call with filter
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [{ id: 1, title: `Todo for ${filter}` }];
}

@Component({
  selector: "todos",
  template: `
    <div>
      // 🚀 applying the filter will enable and execute the query
      <filters-form (onApply)="filter.set($event)" />
      <todos-table [data]="todosQuery.data()" />
    </div>
  `,
})
export class TodosComponent {
  filter = signal("");

  todosQuery = injectQuery(() => ({
    queryKey: ["todos", this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    enabled: !!this.filter(),
  }));
}

// Dummy components for demonstration
@Component({
  selector: "filters-form",
  template: `<button (click)="emitApply('filterValue')">Apply Filter</button>`,
  outputs: ["onApply"],
})
export class FiltersForm {
  // Dummy emit logic
  emitApply(value: string) {
    /* emit to parent */
  }
}

@Component({
  selector: "todos-table",
  template: `<div>{{ data ? data[0].title : "No data" }}</div>`,
  inputs: ["data"],
})
export class TodosTable {
  // Dummy input
  data: any;
}
```

---

### Manually Cancel TanStack Query with QueryClient

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-cancellation

This example illustrates how to manually cancel a query using `queryClient.cancelQueries()`. It shows a button click handler that triggers the cancellation of a specific query identified by its `queryKey`. This is useful for scenarios where user interaction should abort ongoing operations, ensuring the UI remains responsive and data is consistent.

```typescript
@Component({
  template: `<button (click)="onCancel()">Cancel</button>`,
})
export class TodosComponent {
  query = injectQuery(() => ({
    queryKey: ["todos"],
    queryFn: async ({ signal }) => {
      const resp = await fetch("/todos", { signal });
      return resp.json();
    },
  }));

  queryClient = inject(QueryClient);

  onCancel() {
    this.queryClient.cancelQueries(["todos"]);
  }
}
```

---

### Cancel Fetch Requests with AbortSignal in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

This example demonstrates how to use the AbortSignal provided by TanStack Query to cancel fetch requests. The signal can be passed directly to the fetch options, allowing for automatic cancellation when the query becomes inactive or is updated. This ensures that only relevant data is processed.

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch("/todos", {
      // Pass the signal to one fetch
      signal,
    });
    const todos = await todosResponse.json();

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      });
      return response.json();
    });

    return Promise.all(todoDetails);
  },
});
```

---

### Distinguish Callbacks for Consecutive Mutations in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/mutations

This example highlights the differing behavior of callbacks during consecutive mutations. `useMutation`'s handlers will be invoked for each `mutate` call, while callbacks passed directly to the `mutate` function will only execute once for the _last_ mutation, provided the component remains mounted. This is due to the mutation observer being reset per `mutate` call.

```tsx
useMutation(() => {
  mutationFn: addTodo,
  onSuccess: (data, variables, onMutateResult, context) => {
    // Will be called 3 times
  },
})

const todos = ['Todo 1', 'Todo 2', 'Todo 3']
todos.forEach((todo) => {
  mutate(todo, {
    onSuccess: (data, variables, onMutateResult, context) => {
      // Will execute only once, for the last mutation (Todo 3),
      // regardless which mutation resolves first
    },
  })
})
```

---

### Display Individual Query Fetching State in Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/background-fetching-indicators

Shows how to use the isFetching boolean along with status states to display loading indicators for individual queries. The example displays a refreshing indicator when fetching, loading state when pending, error message if failed, and data list on success using Vue's conditional rendering directives.

```vue
<script setup>
import { useQuery } from "@tanstack/vue-query";

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ["todos"],
  queryFn: getTodos,
});
</script>

<template>
  <div v-if="isFetching">Refreshing...</div>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <ul v-else-if="data">
    <li v-for="todo in data" :key="todo.id">{{ todo.title }}</li>
  </ul>
</template>
```

---

### React Component: Editing a Single Todo with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This React component allows users to edit details of a specific todo item. It uses 'useQuery' to fetch the todo's data based on 'editingIndex' and 'useMutation' to save changes. It manages local state for the todo fields and handles various query and mutation states like loading, error, and saving. 'queryClient' is used to invalidate and update queries upon successful mutation.

```typescript
function EditTodo({
  editingIndex,
  setEditingIndex,
}: {
  editingIndex: number;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const queryClient = useQueryClient();

  // Don't attempt to query until editingIndex is truthy
  const { status, data, isFetching, error, failureCount, refetch } = useQuery({
    queryKey: ["todo", { id: editingIndex }],
    queryFn: () => fetchTodoById({ id: editingIndex }),
  });

  const [todo, setTodo] = React.useState(data || {});

  React.useEffect(() => {
    if (editingIndex !== null && data) {
      setTodo(data);
    } else {
      setTodo({});
    }
  }, [data, editingIndex]);

  const saveMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: (data) => {
      // Update `todos` and the individual todo queries when this mutation succeeds
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueryData(["todo", { id: editingIndex }], data);
    },
  });

  const onSave = () => {
    saveMutation.mutate(todo);
  };

  const disableEditSave =
    status === "pending" || saveMutation.status === "pending";

  return (
    <div>
      <div>
        {data ? (
          <>
            <button onClick={() => setEditingIndex(null)}>Back</button> Editing
            Todo "{data.name}" (#
            {editingIndex})
          </>
        ) : null}
      </div>
      {status === "pending" ? (
        <span>Loading... (Attempt: {failureCount + 1})</span>
      ) : error ? (
        <span>
          Error! <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <>
          <label>
            Name:{" "}
            <input
              value={todo.name}
              onChange={(e) =>
                e.persist() ||
                setTodo((old) => ({ ...old, name: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>
          <label>
            Notes:{" "}
            <input
              value={todo.notes}
              onChange={(e) =>
                e.persist() ||
                setTodo((old) => ({ ...old, notes: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>
          <div>
            <button onClick={onSave} disabled={disableEditSave}>
              Save
            </button>
          </div>
          <div>
            {saveMutation.status === "pending"
              ? "Saving..."
              : saveMutation.status === "error"
              ? saveMutation.error.message
              : "Saved!"}
          </div>
          <div>
            {isFetching ? (
              <span>
                Background Refreshing... (Attempt: {failureCount + 1})
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
```

---

### Fetch GitHub Repository Statistics using TanStack Query in Angular

Source: https://tanstack.com/query/latest/docs/framework/angular/overview

This Angular component utilizes `injectQuery` from `@tanstack/angular-query-experimental` to fetch public repository data from the GitHub API. It displays the loading state, error messages, and successful data including the repository name, description, subscribers, stars, and forks. The example uses Angular's `HttpClient` and RxJS `lastValueFrom` for the data fetching logic.

```angular-ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { injectQuery } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error().message }}
    }
    @if (query.data(); as data) {
      <h1>{{ data.name }}</h1>
      <p>{{ data.description }}</p>
      <strong>👀 {{ data.subscribers_count }}</strong>
      <strong>✨ {{ data.stargazers_count }}</strong>
      <strong>🍴 {{ data.forks_count }}</strong>
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      lastValueFrom(
        this.http.get<Response>('https://api.github.com/repos/tanstack/query'),
      ),
  }))
}

interface Response {
  name: string
  description: string
  subscribers_count: number
  stargazers_count: number
  forks_count: number
}
```

---

### Create Reusable TanStack Query Mutation Hook for Cache Updates (React/TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/updates-from-mutation-responses

This example shows how to encapsulate the `useMutation` logic, including the `onSuccess` cache update, into a reusable custom hook. This promotes code reusability and maintains consistent cache update strategies across your application. Note how `variables` are accessed in `onSuccess` to identify the correct query key.

```tsx
const useMutateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTodo,
    // Notice the second argument is the variables object that the `mutate` function receives
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todo", { id: variables.id }], data);
    },
  });
};
```

---

### Import TanStack Query Devtools for Production Builds

Source: https://tanstack.com/query/latest/docs/framework/angular/devtools

Shows how to import `withDevtools` from the production sub-path to ensure devtools are available in production builds when explicitly configured.

```typescript
import { withDevtools } from "@tanstack/angular-query-experimental/devtools/production";
```

---

### React Pagination Component with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/pagination

A React functional component that manages paginated data fetching using TanStack Query. It renders a list of projects from the current page, provides previous/next page navigation buttons with appropriate disabled states, and displays a loading indicator during background fetches. The component leverages query state management to handle placeholder data and fetch status.

```javascript
() => {
  return (
    <div>
      {data.projects.map((project) => (
        <p key={project.id}>{project.name}</p>
      ))}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};
```

---

### React Component: Adding a New Todo with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This React component provides functionality to add a new todo item. It uses 'useMutation' to send the new todo data to the server and 'queryClient.invalidateQueries' to refresh the main todo list after a successful addition. It includes an input for the todo name and a button to trigger the addition, with disabling logic during the pending mutation state.

```javascript
function AddTodo() {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");

  const addMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={addMutation.status === "pending"}
      />
      <button
        onClick={() => {
          addMutation.mutate({ name, notes: "These are some notes" });
        }}
        disabled={addMutation.status === "pending" || !name}
      >
        Add Todo
      </button>
      <div>
        {addMutation.status === "pending"
          ? "Saving..."
          : addMutation.status === "error"
          ? addMutation.error.message
          : "Saved!"}
      </div>
    </div>
  );
}
```

---

### Cache-Based Optimistic Updates with onMutate and Rollback

Source: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates

This example illustrates performing optimistic updates directly on the cache using the `onMutate` option within `useMutation`. It includes logic to cancel outgoing refetches, update the cache optimistically, and importantly, provides a rollback mechanism using the `onError` handler to revert to the previous state if the mutation fails. The `onSettled` handler ensures a refetch occurs regardless of success or failure.

```typescript
const queryClient = useQueryClient();

useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo, context) => {
    await context.client.cancelQueries({ queryKey: ["todos"] });
    const previousTodos = context.client.getQueryData(["todos"]);
    context.client.setQueryData(["todos"], (old) => [...old, newTodo]);
    return { previousTodos };
  },
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(["todos"], onMutateResult.previousTodos);
  },
  onSettled: (data, error, variables, onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: ["todos"] }),
});
```

---

### Fetch Data with Suspense and Error Handling in SolidJS

Source: https://tanstack.com/query/latest/docs/framework/solid/overview

Demonstrates fetching data from an API using SolidJS's `createResource`, `Suspense`, and `ErrorBoundary`. This snippet handles loading states and potential errors during data fetching, providing a basic structure for asynchronous data management in SolidJS applications.

```tsx
import { createResource, ErrorBoundary, Suspense } from "solid-js";
import { render } from "solid-js/web";

function App() {
  const [repository] = createResource(async () => {
    const result = await fetch("https://api.github.com/repos/TanStack/query");
    if (!result.ok) throw new Error("Failed to fetch data");
    return result.json();
  });

  return (
    <div>
      <div>Static Content</div>
      {/* An error while fetching will be caught by the ErrorBoundary */}
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        {/* Suspense will trigger a loading state while the data is being fetched */}
        <Suspense fallback={<div>Loading...</div>}>
          <div>{repository()?.updated_at}</div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const root = document.getElementById("root");

render(() => <App />, root!);
```

---

### Default Options for createAsyncStoragePersister

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createAsyncStoragePersister

Outlines the default values used for `key`, `throttleTime`, `serialize`, and `deserialize` if not explicitly provided in the `CreateAsyncStoragePersisterOptions`.

```tsx
{
  key = `REACT_QUERY_OFFLINE_CACHE`,
  throttleTime = 1000,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}
```

---

### Configure Query with Dynamic Placeholder Data Function (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/placeholder-query-data

This example shows `placeholderData` being defined as a function that receives `previousData` and `previousQuery` from a prior successful query. This pattern is particularly useful for scenarios such as paginated queries, where it helps maintain existing data on the screen during query key transitions, thereby preventing a loading spinner while new data is being fetched.

```ts
class TodosComponent {
  result = injectQuery(() => ({
    queryKey: ["todos", id()],
    queryFn: () => fetch(`/todos/${id}`),
    placeholderData: (previousData, previousQuery) => previousData,
  }));
}
```

---

### Conditionally Load Initial Data from Cache in TanStack Query (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/initial-query-data

This example shows how to conditionally provide initial data to a TanStack Query from the cache based on its freshness. It uses `queryClient.getQueryState` to retrieve `dataUpdatedAt` and only returns cached data if it's within a specified freshness window (e.g., 10 seconds), otherwise allowing the query to enter a hard loading state and fetch new data from the server.

```ts
result = injectQuery(() => ({
  queryKey: ["todo", this.todoId()],
  queryFn: () => fetch(`/todos/${this.todoId()}`),
  initialData: () => {
    // Get the query state
    const state = queryClient.getQueryState(["todos"]);

    // If the query exists and has data that is no older than 10 seconds...
    if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
      // return the individual todo
      return state.data.find((d) => d.id === this.todoId());
    }

    // Otherwise, return undefined and let it fetch from a hard loading state!
  },
}));
```

---

### prefetchInfiniteQuery with Multiple Pages

Source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

Shows how to prefetch infinite queries with multiple pages using the pages option. Requires initialPageParam and getNextPageParam to determine page boundaries. By default, only the first page is prefetched, but you can specify how many pages to prefetch upfront.

```tsx
const prefetchProjects = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3, // prefetch the first 3 pages
  });
};
```

---

### Parallel Queries with useQueries Hook in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/request-waterfalls

Demonstrates the recommended solution for executing multiple queries in parallel when using Suspense. The useQueries hook accepts an array of query configurations and executes them concurrently, avoiding waterfall behavior and improving performance.

```tsx
const [usersQuery, teamsQuery, projectsQuery] = useQueries({
  queries: [
    { queryKey: ["users"], queryFn: fetchUsers },
    { queryKey: ["teams"], queryFn: fetchTeams },
    { queryKey: ["projects"], queryFn: fetchProjects },
  ],
});
```

---

### Cancel graphql-request with AbortSignal (Client Request Method)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

This example shows how to cancel requests made with graphql-request using TanStack Query's AbortSignal. The signal is passed directly to the client's `request` method, enabling automatic cancellation of the GraphQL query when the query is no longer active.

```tsx
const client = new GraphQLClient(endpoint);

const query = useQuery({
  queryKey: ["todos"],
  queryFn: ({ signal }) => {
    client.request({ document: query, signal });
  },
});
```

---

### Configure dynamic query options with useQuery in Solid Query

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useQuery

This snippet showcases how to use reactive options with `useQuery`, allowing the query to re-run automatically when its dependencies change. By using a SolidJS signal for filtering, the `queryKey` and `queryFn` become dynamic, enabling the application to fetch data based on user interactions like changing a filter.

```tsx
import { useQuery } from "@tanstack/solid-query";

function App() {
  const [filter, setFilter] = createSignal("all");

  const todos = useQuery(() => ({
    queryKey: ["todos", filter()],
    queryFn: async () => {
      const response = await fetch(`/api/todos?filter=${filter()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
  }));

  return (
    <div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <Show when={todos.isError}>
        <div>Error: {todos.error.message}</div>
      </Show>
      <Show when={todos.isLoading}>
        <div>Loading...</div>
      </Show>
      <Show when={todos.isSuccess}>
        <div>
          <div>Todos:</div>
          <ul>
            <For each={todos.data}>{(todo) => <li>{todo.title}</li>}</For>
          </ul>
        </div>
      </Show>
    </div>
  );
}
```

---

### Configure Global Retry Delay (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

This example demonstrates how to set a custom retry delay for all queries globally using `QueryClient`. The `retryDelay` function calculates the delay based on the attempt index, doubling the previous delay each time, with a maximum delay of 30 seconds. This ensures that retries do not happen too frequently.

```tsx
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
}
```

---

### Invalidate Queries after Mutation Success (Vue)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/invalidations-from-mutations

Shows how to invalidate queries after a mutation successfully completes in Vue using `useMutation` and `useQueryClient` from `@tanstack/vue-query`. The `onSuccess` callback is used to call `invalidateQueries` for specific query keys, ensuring data is updated. This example invalidates both 'todos' and 'reminders' queries.

```js
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();

// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    queryClient.invalidateQueries({ queryKey: ["reminders"] });
  },
});
```

---

### Cancel XMLHttpRequest with AbortSignal in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

This example illustrates how to cancel XMLHttpRequest requests using TanStack Query's AbortSignal. A Promise is created to wrap the XMLHttpRequest, and an event listener on the signal's abort event is used to call `oReq.abort()`, effectively cancelling the ongoing request.

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: ({ signal }) => {
    return new Promise((resolve, reject) => {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", () => {
        resolve(JSON.parse(oReq.responseText));
      });
      signal?.addEventListener("abort", () => {
        oReq.abort();
        reject();
      });
      oReq.open("GET", "/todos");
      oReq.send();
    });
  },
});
```

---

### Disable Query with `enabled: false` - React/TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries

Demonstrates how to disable a query from automatically running using the `enabled: false` option in TanStack Query. The query will only fetch when `refetch()` is manually called. This example shows fetching a list of todos and handling loading, error, and success states.

```tsx
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
    enabled: false,
  });

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? "Fetching..." : null}</div>
    </div>
  );
}
```

---

### queryOptions Function

Source: https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions

This section details the `queryOptions` function, which creates a reusable configuration object for queries that can be passed to `useQuery` or `queryClient.prefetchQuery`.

````APIDOC
## queryOptions

### Description
Generates a configuration object for TanStack Query, allowing you to define `queryKey` and other query-related options in a standardized way. These options can then be used with various TanStack Query functions like `useQuery` or `queryClient.prefetchQuery`.

### Type
Configuration Function Call

### Parameters
#### Function Arguments
- **queryKey** (`QueryKey`) - Required - The query key to generate options for.
- **...options** (object) - Optional - Additional options that can generally be passed to `useQuery`. Note that some options may have no effect when forwarded to functions like `queryClient.prefetchQuery`.
- **experimental_prefetchInRender** (`boolean`) - Optional - Defaults to `false`. When set to `true`, queries will be prefetched during render, which can be useful for certain optimization scenarios and is needed for the experimental `useQuery().promise` functionality.

### Return Value
#### Options Object
An object containing the `queryKey` and all provided options, typed appropriately for TanStack Query.

#### Example Return Value
```typescript
{
  queryKey: ['todos', 1],
  staleTime: 5 * 60 * 1000,
  experimental_prefetchInRender: true
}
````

````

--------------------------------

### Access Query Properties in Reactive Context without Destructuring

Source: https://tanstack.com/query/latest/docs/framework/solid/quick-start

Solid Query returns a store object whose properties are only tracked within reactive contexts like JSX. Destructuring breaks reactivity, so properties must be accessed directly on the store object. Use Switch/Match components to handle different query states.

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/solid-query'
import { Match, Switch } from 'solid-js'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const query = useQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
  }))

  return (
    <Switch>
      <Match when={query.isPending}>Loading...</Match>
      <Match when={query.isError}>Error: {query.error.message}</Match>
      <Match when={query.isSuccess}>
        <div>
          <h1>{query.data.name}</h1>
          <p>{query.data.description}</p>
          <strong>👀 {query.data.subscribers_count}</strong>{' '}
          <strong>✨ {query.data.stargazers_count}</strong>{' '}
          <strong>🍴 {query.data.forks_count}</strong>
        </div>
      </Match>
    </Switch>
  )
}
````

---

### Persisting and Resuming TanStack Query Mutations with Hydration

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/mutations

This example demonstrates how to define a mutation with optimistic updates, persist its state using `dehydrate` when the application quits, and then rehydrate and resume it later using `hydrate` and `resumePausedMutations`. It handles optimistic UI updates on `onMutate`, `onSuccess`, and `onError` callbacks for an 'addTodo' mutation, ensuring data consistency even with network interruptions.

```typescript
const queryClient = new QueryClient();

// Define the "addTodo" mutation
queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: addTodo,
  onMutate: async (variables, context) => {
    // Cancel current queries for the todos list
    await context.client.cancelQueries({ queryKey: ["todos"] });

    // Create optimistic todo
    const optimisticTodo = { id: uuid(), title: variables.title };

    // Add optimistic todo to todos list
    context.client.setQueryData(["todos"], (old) => [...old, optimisticTodo]);

    // Return result with the optimistic todo
    return { optimisticTodo };
  },
  onSuccess: (result, variables, onMutateResult, context) => {
    // Replace optimistic todo in the todos list with the result
    context.client.setQueryData(["todos"], (old) =>
      old.map((todo) =>
        todo.id === onMutateResult.optimisticTodo.id ? result : todo
      )
    );
  },
  onError: (error, variables, onMutateResult, context) => {
    // Remove optimistic todo from the todos list
    context.client.setQueryData(["todos"], (old) =>
      old.filter((todo) => todo.id !== onMutateResult.optimisticTodo.id)
    );
  },
  retry: 3,
});

class someComponent {
  // Start mutation in some component:
  mutation = injectMutation(() => ({ mutationKey: ["addTodo"] }));

  someMethod() {
    mutation.mutate({ title: "title" });
  }
}

// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient);

// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state);

// Resume the paused mutations:
queryClient.resumePausedMutations();
```

---

### useQuery Configuration - Error Handling and Metadata

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Options for error handling behavior and attaching custom metadata to queries.

````APIDOC
## useQuery Configuration - Error Handling and Metadata

### Description
Controls error propagation and allows attaching custom metadata to queries.

### Configuration Parameters

#### throwOnError
- **Type**: `undefined | boolean | (error: TError, query: Query) => boolean`
- **Required**: No
- **Description**: Controls error handling behavior
  - `true`: Throw errors in render phase, propagate to nearest error boundary
  - `false`: Disable suspense default behavior of throwing to error boundary
  - `function`: Custom error handling logic
    - Receives error and query as arguments
    - Returns boolean:
      - `true`: Show error in error boundary
      - `false`: Return error as state
  - **Use case**: Implement fine-grained error handling and error boundary integration

#### meta
- **Type**: `Record<string, unknown>`
- **Required**: No
- **Description**: Attach custom metadata to the query
  - Can store any custom properties
  - Useful for tracking query-specific information
  - Accessible through query instance

### Usage Example
```javascript
const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  throwOnError: true
})

// Errors propagate to nearest error boundary

const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  throwOnError: (error, query) => error.status === 404
})

// Only throw 404 errors to error boundary

const { data, error } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  meta: {
    description: 'Fetch current user profile',
    priority: 'high',
    retryable: true
  }
})

// Attach custom metadata to query
````

````

--------------------------------

### Serialize and Deserialize Custom Data for Hydration - React

Source: https://tanstack.com/query/latest/docs/framework/react/reference/hydration

When dehydrating data that is not JSON serializable (like `Error` objects), you need to provide custom serialization and deserialization functions. This example shows how to dehydrate all queries (including errors) and then serialize the state, and on the client, deserialize it before hydrating the `QueryClient`.

```tsx
// server
const state = dehydrate(client, { shouldDehydrateQuery: () => true }) // to also include Errors
const serializedState = mySerialize(state) // transform Error instances to objects

// client
const state = myDeserialize(serializedState) // transform objects back to Error instances
hydrate(client, state)
````

---

### Handle Todo Item Notes Editing and Status Display in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This React JSX snippet demonstrates how to update a todo's notes within a form, save changes using an `onSave` handler, and display the real-time status of a TanStack Query mutation (pending, error, or saved). It also includes a conditional display for background refreshing.

```javascript
                setTodo((old) => ({ ...old, notes: e.target.value }))
              }
              disabled={disableEditSave}
            />
          </label>
          <div>
            <button onClick={onSave} disabled={disableEditSave}>
              Save
            </button>
          </div>
          <div>
            {saveMutation.status === 'pending'
              ? 'Saving...'
              : saveMutation.status === 'error'
                ? saveMutation.error.message
                : 'Saved!'}
          </div>
          <div>
            {isFetching ? (
              <span>
                Background Refreshing... (Attempt: {failureCount + 1})
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
```

---

### React Component: Displaying and Filtering Todos with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

This React component renders a list of todos, allows filtering via an input field, and provides edit functionality. It displays loading, error, and background refreshing states using 'status', 'isFetching', 'failureCount', and 'error.message' from a TanStack Query hook. It assumes 'data' is an array of todo objects with 'id' and 'name' properties.

```javascript
          Filter:{' '}
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </label>
      </div>
      {status === 'pending' ? (
        <span>Loading... (Attempt: {failureCount + 1})</span>
      ) : status === 'error' ? (
        <span>
          Error: {error.message}
          <br />
          <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <>
          <ul>
            {data
              ? data.map((todo) => (
                  <li key={todo.id}>
                    {todo.name}{' '}
                    <button onClick={() => setEditingIndex(todo.id)}>
                      Edit
                    </button>
                  </li>
                ))
              : null}
          </ul>
          <div>
            {isFetching ? (
              <span>
                Background Refreshing... (Attempt: {failureCount + 1})
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </>
      )}
    </div>
```

---

### Reversing Page Order in Infinite Queries

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/infinite-queries

Illustrates how to display pages from an infinite query in reverse order using the `select` option. This is useful for scenarios where newer data should appear at the top of the list by default.

```typescript
query = injectInfiniteQuery(() => ({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  select: (data) => ({
    pages: [...data.pages].reverse(),
    pageParams: [...data.pageParams].reverse(),
  }),
}));
```

---

### Initialize QueryClient with default staleTime option in Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/examples/nuxt3

Creates a new QueryClient instance with custom default options. The staleTime property is set to 5000 milliseconds, which defines how long cached data is considered fresh before being refetched. This is the first step in configuring Vue Query for your application.

```TypeScript
queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000
    }
  }
})
```

---

### Configure and persist TanStack Query mutations

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/mutations

This snippet demonstrates how to define a mutation with `setMutationDefaults` for an `addTodo` operation, including optimistic updates, success handling, error handling, and retries. It then shows how to `dehydrate` the `queryClient` state for storage, `hydrate` it back upon application start, and `resumePausedMutations`, enabling mutations to survive across sessions or offline periods.

```tsx
const queryClient = new QueryClient();

// Define the "addTodo" mutation
queryClient.setMutationDefaults(["addTodo"], {
  mutationFn: addTodo,
  onMutate: async (variables, context) => {
    // Cancel current queries for the todos list
    await context.client.cancelQueries({ queryKey: ["todos"] });

    // Create optimistic todo
    const optimisticTodo = { id: uuid(), title: variables.title };

    // Add optimistic todo to todos list
    context.client.setQueryData(["todos"], (old) => [...old, optimisticTodo]);

    // Return a result with the optimistic todo
    return { optimisticTodo };
  },
  onSuccess: (result, variables, onMutateResult, context) => {
    // Replace optimistic todo in the todos list with the result
    context.client.setQueryData(["todos"], (old) =>
      old.map((todo) =>
        todo.id === onMutateResult.optimisticTodo.id ? result : todo
      )
    );
  },
  onError: (error, variables, onMutateResult, context) => {
    // Remove optimistic todo from the todos list
    context.client.setQueryData(["todos"], (old) =>
      old.filter((todo) => todo.id !== onMutateResult.optimisticTodo.id)
    );
  },
  retry: 3,
});

// Start mutation in some component:
const mutation = useMutation(() => {
  mutationKey: ["addTodo"];
});
mutation.mutate({ title: "title" });

// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient);

// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state);

// Resume the paused mutations:
queryClient.resumePausedMutations();
```

---

### Schedule Callback with TimeoutManager

Source: https://tanstack.com/query/latest/docs/reference/timeoutManager

This example shows how to use `timeoutManager.setTimeout` to schedule a callback function to execute after a specified delay in milliseconds. The function returns a timer ID, which can be a number or a special object type. This timer ID can then be used with `timeoutManager.clearTimeout` to cancel the scheduled execution. The returned ID can be explicitly converted to a number if needed.

```typescript
import { timeoutManager } from "@tanstack/react-query";

const timeoutId = timeoutManager.setTimeout(
  () => console.log("ran at:", new Date()),
  1000
);

const timeoutIdNumber: number = Number(timeoutId);
```

---

### Custom Background Refetch with Disabled Retries (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-retries

This example demonstrates a custom background refetch strategy where built-in retries are disabled (`retry: false`). It uses `refetchInterval` to control refetch frequency, making it more frequent when the query is in an error state. `refetchIntervalInBackground: true` ensures refetches continue even when the tab is inactive, providing a manual retry mechanism.

```typescript
const result = injectQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  refetchInterval: (query) => {
    // Refetch more frequently when in error state
    return query.state.status === "error" ? 5000 : 30000;
  },
  refetchIntervalInBackground: true,
  retry: false, // Disable built-in retries
});
```

---

### Configure useQuery with various query function patterns

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-functions

Demonstrates multiple valid configurations for query functions using TanStack Query's useQuery hook. Query functions can be simple callbacks, async functions, or parameterized functions that receive queryKey data. Each configuration shows different ways to structure queries for fetching todos.

```typescript
useQuery(() => { queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery(() => { queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery(() => {
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery(() => {
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

---

### Define Type-Safe Mutation Options in Angular Service

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/mutationOptions

Demonstrates how to create reusable mutation options within an Angular service using the mutationOptions() function. The example shows creating an updatePost mutation with type-safe onSuccess callback, then consuming it in a component using injectMutation(). This pattern enables sharing mutation logic across multiple components while maintaining type safety.

```typescript
export class QueriesService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);

  updatePost(id: number) {
    return mutationOptions({
      mutationFn: (post: Post) => Promise.resolve(post),
      mutationKey: ["updatePost", id],
      onSuccess: (newPost) => {
        //           ^? newPost: Post
        this.queryClient.setQueryData(["posts", id], newPost);
      },
    });
  }
}

class ComponentOrService {
  queries = inject(QueriesService);
  id = signal(0);
  mutation = injectMutation(() => this.queries.updatePost(this.id()));

  save() {
    this.mutation.mutate({ title: "New Title" });
  }
}
```

---

### Predicate Function for Advanced Query Invalidation

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-invalidation

Uses a predicate function to provide granular control over query invalidation by inspecting each query instance. The function receives Query instances and returns true/false to determine invalidation. In this example, only 'todos' queries with version >= 10 are invalidated, enabling complex conditional invalidation logic.

```typescript
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === "todos" && query.queryKey[1]?.version >= 10,
});

// The query below will be invalidated
const todoListQuery = useQuery(() => ({
  queryKey: ["todos", { version: 20 }],
  queryFn: fetchTodoList,
}));

// The query below will be invalidated
const todoListQuery = useQuery(() => ({
  queryKey: ["todos", { version: 10 }],
  queryFn: fetchTodoList,
}));

// However, the following query below will NOT be invalidated
const todoListQuery = useQuery(() => ({
  queryKey: ["todos", { version: 5 }],
  queryFn: fetchTodoList,
}));
```

---

### Configure Nock Mock with Query Parameter Differentiation

Source: https://tanstack.com/query/latest/docs/framework/react/guides/testing

Sets up nock HTTP mocking to intercept GET requests to /api/data and return different paginated responses based on the page query parameter. Uses .persist() to allow multiple requests and .query(true) to match any query parameters. The reply callback extracts the page parameter from the URI and returns the corresponding mocked response.

```typescript
const expectation = nock("http://example.com")
  .persist()
  .query(true)
  .get("/api/data")
  .reply(200, (uri) => {
    const url = new URL(`http://example.com${uri}`);
    const { page } = Object.fromEntries(url.searchParams);
    return generateMockedResponse(page);
  });
```

---

### Manually Cancel a Query with a Button (TypeScript/JSX)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

This example demonstrates how to manually cancel a specific query using `queryClient.cancelQueries` when a button is clicked. It utilizes the `useQuery` hook to fetch data and `useQueryClient` to access the query client instance. The `signal` passed to the query function ensures that the fetch request itself is also aborted. The function returns a JSX button that triggers the cancellation.

```tsx
const query = useQuery({
  queryKey: ["todos"],
  queryFn: async ({ signal }) => {
    const resp = await fetch("/todos", { signal });
    return resp.json();
  },
});

const queryClient = useQueryClient();

return (
  <button
    onClick={(e) => {
      e.preventDefault();
      queryClient.cancelQueries({ queryKey: ["todos"] });
    }}
  >
    Cancel
  </button>
);
```

---

### Invalidate Queries by Key Prefix in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation

Illustrates how to invalidate multiple related queries by providing a key prefix to `queryClient.invalidateQueries()`. This ensures that all queries with keys starting with `['todos']`, including those with additional sub-keys like `['todos', { page: 1 }]`, are marked stale and refetched. Requires `useQuery` and `useQueryClient` from `@tanstack/react-query`.

```tsx
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Get QueryClient from the context
const queryClient = useQueryClient();

queryClient.invalidateQueries({ queryKey: ["todos"] });

// Both queries below will be invalidated
const todoListQuery = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodoList,
});
const todoListQuery = useQuery({
  queryKey: ["todos", { page: 1 }],
  queryFn: fetchTodoList,
});
```

---

### Handle Mutations with Promises using mutateAsync in TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/mutations

This snippet demonstrates using `mutateAsync` instead of `mutate` to get a Promise that resolves on successful mutation or rejects on error. This pattern allows for composing asynchronous side effects using `await` and `try...catch...finally` blocks, providing more control over post-mutation logic.

```tsx
const mutation = useMutation(() => {
  mutationFn: addTodo;
});

try {
  const todo = await mutation.mutateAsync(todo);
  console.log(todo);
} catch (error) {
  console.error(error);
} finally {
  console.log("done");
}
```

---

### Load and Hydrate TanStack Query Data in Remix Route

Source: https://tanstack.com/query/latest/docs/framework/react/guides/ssr

This Remix route demonstrates server-side data prefetching using `queryClient.prefetchQuery` within the `loader` function. The `dehydratedState` is then passed to the client via `json` and used to hydrate the `HydrationBoundary`. On the client, `useQuery` consumes this prefetched data, while also showing how to fetch additional data client-side. Dependencies: `@remix-run/node`, `@tanstack/react-query`.

```tsx
// app/routes/posts.tsx
import { json } from "@remix-run/node";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

export async function loader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return json({ dehydratedState: dehydrate(queryClient) });
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ["posts-comments"],
    queryFn: getComments,
  });

  // ...
}

export default function PostsRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
```

---

### Nested Server Components with Multiple QueryClients - TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

Demonstrates implementing nested Server Components where each component creates its own QueryClient instance for prefetching data before rendering. Uses HydrationBoundary to dehydrate and serialize query state. This approach is recommended as it isolates data fetching per component while potentially causing server-side waterfalls when components are rendered sequentially.

```TypeScript
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'
import CommentsServerComponent from './comments-server'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
      <CommentsServerComponent />
    </HydrationBoundary>
  )
}

// app/posts/comments-server.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Comments from './comments'

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments />
    </HydrationBoundary>
  )
}
```

---

### useInfiniteQuery Hook

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-cache

Manages infinite pagination by fetching data in pages. Supports load-more and infinite scroll patterns with automatic page management.

````APIDOC
## useInfiniteQuery Hook

### Description
Manages infinite or paginated queries with support for load-more and infinite scroll patterns. Automatically manages page cursors and data accumulation.

### Usage
```javascript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage
})
````

### Parameters

#### Options Object

- **queryKey** (array) - Required - Unique identifier for the query
- **queryFn** (function) - Required - Async function receiving pageParam
- **getNextPageParam** (function) - Required - Returns next page cursor or undefined
- **initialPageParam** (unknown) - Optional - Initial value for pageParam
- **staleTime** (number) - Optional - Time before data is stale
- **enabled** (boolean) - Optional - Enable/disable the query

### Response

- **data** (object) - Contains pages array with all fetched data
- **fetchNextPage** (function) - Fetch the next page
- **fetchPreviousPage** (function) - Fetch the previous page
- **hasNextPage** (boolean) - True if more pages available
- **hasPreviousPage** (boolean) - True if previous pages available
- **isFetchingNextPage** (boolean) - True while fetching next page
- **isFetchingPreviousPage** (boolean) - True while fetching previous page

````

--------------------------------

### Cancel Axios Requests with AbortSignal in TanStack Query (Pre-v0.22.0)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

For axios versions prior to 0.22.0, this example demonstrates how to manually create and manage a CancelToken source to achieve cancellation with TanStack Query's AbortSignal. The AbortSignal's abort event listener is used to trigger the cancellation of the axios request via the CancelToken.

```tsx
import axios from 'axios'

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    // Create new CancelToken source for this request
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const promise = axios.get('/todos', {
      // Pass the source token to your request
      cancelToken: source.token,
    })

    // Cancel the request if TanStack Query signals to abort
    signal?.addEventListener('abort', () => {
      source.cancel('Query was cancelled by TanStack Query')
    })

    return promise
  },
})
````

---

### Configure Default Query Function with TanStack Query (TypeScript/Vue)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/default-query-function

Sets a global default query function for TanStack Query using `axios` to fetch data from JSONPlaceholder. This function is provided via `defaultOptions` in `queryClientConfig` during the application setup with `VueQueryPlugin`. It simplifies data fetching by only requiring the query key for subsequent `useQuery` calls.

```tsx
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import axios from "axios";

// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`
  );
  return data;
};

// provide the default query function to your app with defaultOptions
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { queryFn: defaultQueryFn } },
  },
};

// Assuming 'app' is your Vue application instance
// app.use(VueQueryPlugin, vueQueryPluginOptions);

// Example of using useQuery with the default function:
// const { status, data, error, isFetching } = useQuery({
//   queryKey: [`/posts/${postId}`],
// });
```

---

### Cancel Fetch API Requests with AbortSignal

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-cancellation

This example shows how to pass an AbortSignal to the native fetch API within a TanStack Query function. This allows the fetch request to be cancelled if the query is aborted, preventing unnecessary network activity and ensuring data consistency. The signal can be passed to multiple fetch calls within the same query function.

```javascript
query = injectQuery(() => ({
  queryKey: ["todos"],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch("/todos", {
      // Pass the signal to one fetch
      signal,
    });
    const todos = await todosResponse.json();

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      });
      return response.json();
    });

    return Promise.all(todoDetails);
  },
}));
```

---

### Override Query Options with `select` for Data Transformation in Vue

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

This TypeScript example illustrates how to extend or override pre-defined `queryOptions` at the component level using the spread operator. It demonstrates adding a `select` function to transform the query's returned data, ensuring type inference is correctly maintained even after data manipulation. This pattern is useful for component-specific data shaping.

```ts
const query = useQuery({
  ...groupOptions(1),
  select: (data) => data.groupName,
});
```

---

### Create Basic Mutation with useMutation Hook

Source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

Demonstrates creating a basic mutation that adds a todo item to a server using axios. The component displays loading, error, and success states while providing a button to trigger the mutation with data parameters.

```tsx
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    },
  });

  return (
    <div>
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

---

### Solid-Query useIsFetching Hook

Source: https://tanstack.com/query/latest/docs/framework/solid/reference/useIsFetching

The `useIsFetching` hook returns the number of queries currently loading or fetching in the background, useful for app-wide loading indicators.

````APIDOC
## Hook: `useIsFetching`

### Description
`useIsFetching` is an optional hook that returns the `number` of the queries that your application is loading or fetching in the background (useful for app-wide loading indicators).

### Usage
```tsx
import { useIsFetching } from '@tanstack/solid-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
````

### Options

- `filters?`: `QueryFilters` - [Query Filters](../guides/filters.md#query-filters)
- `queryClient?`: `QueryClient` - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

### Returns

- `isFetching`: `number` - Will be the `number` of the queries that your application is currently loading or fetching in the background.

````

--------------------------------

### Cancel Axios Requests with AbortSignal in TanStack Query (v0.22.0+)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

This example shows how to integrate TanStack Query's AbortSignal with axios version 0.22.0 and above. The signal is passed directly in the axios request configuration, enabling automatic cancellation of the request if the query is no longer needed. This prevents unnecessary network activity and ensures data consistency.

```tsx
import axios from 'axios'

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) =>
    axios.get('/todos', {
      // Pass the signal to `axios`
      signal,
    }),
})
````

---

### Initialize QueryClient with Custom Serialization

Source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

Creates a QueryClient instance configured with custom deserialize and serialize functions. These transformers are applied during the hydrate and dehydrate phases to handle complex data types that cannot be serialized to JSON by default.

```typescript
import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { deserialize, serialize } from "./transformer";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      hydrate: {
        deserializeData: deserialize,
      },
      dehydrate: {
        serializeData: serialize,
      },
    },
  });
}
```

---

### Define Type-Safe Todo Data Structures in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/examples/playground

Establishes type-safe data structures for todo items using TypeScript, defining a list of initial todos and deriving types using typeof. Each todo contains an id, name, and notes field. These types are used throughout the application to ensure compile-time type safety for mutations and queries.

```typescript
let id = 0;
let list = [
  "apple",
  "banana",
  "pineapple",
  "grapefruit",
  "dragonfruit",
  "grapes",
].map((d) => ({ id: id++, name: d, notes: "These are some notes" }));

type Todos = typeof list;
type Todo = Todos[0];
```

---

### API Fetching Pattern for Infinite Queries

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/infinite-queries

Demonstrates a typical API response structure for paginated data, including data for the current page and a cursor for fetching the next page. This pattern is fundamental for implementing infinite scrolling.

```json
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

---

### Custom Background Refetch Strategy (React)

Source: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

This example illustrates how to disable built-in retries and implement a custom refetch strategy for background updates. By setting `retry: false`, you can control retry timing manually. The `refetchInterval` is configured to refetch more frequently (every 5 seconds) when the query is in an 'error' state and less frequently (every 30 seconds) otherwise, while `refetchIntervalInBackground: true` ensures these refetches continue even when the tab is inactive.

```tsx
const result = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  refetchInterval: (query) => {
    // Refetch more frequently when in error state
    return query.state.status === "error" ? 5000 : 30000;
  },
  refetchIntervalInBackground: true,
  retry: false, // Disable built-in retries
});
```

---

### useQueryClient Hook

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-cache

Provides access to the QueryClient instance within components. Enables manual cache manipulation and query management from any component.

````APIDOC
## useQueryClient Hook

### Description
Returns the current QueryClient instance for manual cache manipulation and query management.

### Usage
```javascript
const queryClient = useQueryClient()

const handleRefresh = () => {
  queryClient.invalidateQueries({ queryKey: ['todos'] })
}
````

### Returns

- **QueryClient** - The current QueryClient instance

````

--------------------------------

### React Message Input Component with Submit Handler

Source: https://tanstack.com/query/latest/docs/framework/react/examples/chat

A React functional component that provides a text input field with dynamic state management and a send button. The component handles form submission through both Enter key press and button click events, with input validation to disable the button when the field is empty. Uses Tailwind CSS for styling with focus states, shadows, and hover effects.

```JSX
<div className="flex items-center space-x-2">
  <input
    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
    value={currentQuestion}
    onChange={(e) => setCurrentQuestion(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        submitMessage()
      }
    }}
    placeholder="Type your message..."
  />
  <button
    onClick={submitMessage}
    disabled={!currentQuestion.trim()}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-2xl shadow-md transition"
  >
    <span>Send</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  </button>
</div>
````

---

### Create Query Options with Angular Query Service

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/query-options

Demonstrates creating a reusable query options helper in an Angular service using @tanstack/angular-query-experimental. The helper returns queryOptions with a queryKey and queryFn that fetches data from an HTTP endpoint. Shows usage patterns including prefetchQuery and setQueryData with type-safe query keys.

```typescript
import { queryOptions } from "@tanstack/angular-query-experimental";

@Injectable({
  providedIn: "root",
})
export class QueriesService {
  private http = inject(HttpClient);

  post(postId: number) {
    return queryOptions({
      queryKey: ["post", postId],
      queryFn: () => {
        return lastValueFrom(
          this.http.get<Post>(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          )
        );
      },
    });
  }
}

// usage:

postId = input.required({
  transform: numberAttribute,
});
queries = inject(QueriesService);

postQuery = injectQuery(() => this.queries.post(this.postId()));

queryClient.prefetchQuery(this.queries.post(23));
queryClient.setQueryData(this.queries.post(42).queryKey, newPost);
```

---

### Wrap Suspendable Component with Solid's Suspense

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/suspense

Demonstrates wrapping a component that uses Solid Query with Solid's native `Suspense` component. This allows Solid to manage the loading state, displaying a `fallback` while data is being fetched by the query.

```tsx
import { Suspense } from "solid-js";
<Suspense fallback={<LoadingSpinner />}>
  <SuspendableComponent />
</Suspense>;
```

---

### Type Inference with HttpClient Generic in Angular

Source: https://tanstack.com/query/latest/docs/framework/angular/typescript

Demonstrates type inference by providing explicit generic type parameters to HttpClient's get method. By specifying Group[] as the generic parameter, TypeScript infers the query data type as Group[] | undefined. This approach works well with HTTP libraries that require explicit type parameters.

```angular-ts
@Component({
  template: `@let data = query.data();`,
  //               ^? data: Group[] | undefined
})
class MyComponent {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['groups'],
    queryFn: () => lastValueFrom(this.http.get<Group[]>('/groups')),
  }))
}
```

---

### useQuery Hook Usage - TanStack Query React

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

Demonstrates the complete useQuery hook implementation with all available return values and configuration options. This hook manages data fetching, caching, and synchronization with server state. Returns query state properties (data, error, status), status flags (isLoading, isError, isSuccess), and control methods (refetch). Requires queryKey and queryFn parameters, with queryClient as optional second parameter.

```tsx
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    subscribed,
    throwOnError,
  },
  queryClient
);
```

---

### useQuery Hook Configuration

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

The useQuery hook accepts a configuration object with query options and an optional queryClient parameter. It returns an object containing query state, status flags, and control methods for managing server state in React applications.

````APIDOC
## useQuery Hook

### Description
The useQuery hook is the primary method for fetching and managing server state in TanStack Query. It handles data fetching, caching, synchronization, and provides comprehensive status tracking and control methods.

### Method
Hook (React)

### Signature
```tsx
const queryResult = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    subscribed,
    throwOnError,
  },
  queryClient,
)
````

### Parameters

#### Configuration Object

- **queryKey** (unknown[]) - Required - The query key used for caching and identifying the query. Will be hashed into a stable hash and automatically updates when the key changes (if enabled).
- **queryFn** (function) - Required (if no default query function defined) - The function that requests data. Receives QueryFunctionContext and must return a Promise that resolves data or throws an error. Data cannot be undefined.
- **enabled** (boolean | function) - Optional - Set to false to disable automatic query execution. Can be a function receiving the Query object for conditional execution (Dependent Queries).
- **networkMode** ('online' | 'always' | 'offlineFirst') - Optional, defaults to 'online' - Determines how the query behaves in different network states.
- **retry** (boolean | number | function) - Optional, defaults to 3 on client, 0 on server - Retry strategy for failed queries. False disables retries, true retries infinitely, number specifies max attempts, function provides custom logic.
- **retryOnMount** (boolean) - Optional, defaults to true - If false, failed queries won't retry when the component mounts.
- **retryDelay** (number | function) - Optional - Delay in milliseconds before next retry attempt. Can be a function for exponential or linear backoff strategies.
- **staleTime** (number | 'static' | function) - Optional, defaults to 0 - Time in milliseconds before data is considered stale. Infinity means never stale, 'static' for never stale behavior.
- **gcTime** (number | Infinity) - Optional, defaults to 5 minutes (or Infinity during SSR) - Time in milliseconds that unused cache data remains in memory before garbage collection.
- **queryKeyHashFn** (function) - Optional - Custom function to hash the queryKey to a string.
- **refetchInterval** (number | false | function) - Optional - Frequency in milliseconds for continuous refetching. Can be a function that returns the interval based on the Query object.
- **refetchIntervalInBackground** (boolean) - Optional - If true, refetching continues when the tab/window is in the background.
- **refetchOnMount** (boolean | 'always' | function) - Optional, defaults to true - Determines if query refetches when component mounts.
- **refetchOnReconnect** (boolean) - Optional - If true, query refetches when network connection is restored.
- **refetchOnWindowFocus** (boolean) - Optional - If true, query refetches when the window regains focus.
- **initialData** (any) - Optional - Initial data to use before the first fetch completes.
- **initialDataUpdatedAt** (number) - Optional - Timestamp for when initialData was last updated.
- **meta** (object) - Optional - Additional metadata to attach to the query.
- **notifyOnChangeProps** (string[]) - Optional - Specific properties to notify about changes.
- **placeholderData** (any) - Optional - Placeholder data to show while fetching.
- **select** (function) - Optional - Function to select or transform query data.
- **structuralSharing** (boolean) - Optional - Whether to use structural sharing for data.
- **subscribed** (boolean) - Optional - Whether the query is subscribed to.
- **throwOnError** (boolean) - Optional - Whether to throw errors instead of handling them internally.

#### Optional Parameters

- **queryClient** (QueryClient) - Optional - Specific QueryClient instance to use.

### Return Value

#### Query State Properties

- **data** (TData | undefined) - The resolved data from the query.
- **dataUpdatedAt** (number) - Timestamp when data was last updated.
- **error** (TError | null) - Error object if the query failed.
- **errorUpdatedAt** (number) - Timestamp when error was last updated.
- **failureCount** (number) - Number of times the query has failed.
- **failureReason** (Error | null) - Reason for the most recent failure.
- **fetchStatus** (string) - Current fetch status ('idle' | 'fetching' | 'paused').

#### Status Flags

- **isError** (boolean) - True if the query encountered an error.
- **isFetched** (boolean) - True if the query has ever completed a fetch.
- **isFetchedAfterMount** (boolean) - True if the query fetched after component mount.
- **isFetching** (boolean) - True while the query is currently fetching.
- **isInitialLoading** (boolean) - True during initial load with no cached data.
- **isLoading** (boolean) - True while loading (deprecated, use isInitialLoading or isFetching).
- **isLoadingError** (boolean) - True if query failed during initial load.
- **isPaused** (boolean) - True if query is paused.
- **isPending** (boolean) - True if query is pending.
- **isPlaceholderData** (boolean) - True if currently showing placeholder data.
- **isRefetchError** (boolean) - True if query failed during a refetch.
- **isRefetching** (boolean) - True while refetching in the background.
- **isStale** (boolean) - True if data is considered stale.
- **isSuccess** (boolean) - True if query completed successfully.
- **isEnabled** (boolean) - True if the query is enabled.

#### Control Methods

- **refetch** (function) - Manually trigger a refetch of the query.
- **promise** (Promise) - Promise that resolves when query completes.

#### Additional Properties

- **status** (string) - Query status ('pending' | 'error' | 'success').

### Usage Example

```tsx
const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["users", userId],
  queryFn: async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  retry: 3,
  refetchOnWindowFocus: true,
});
```

### Common Patterns

#### Dependent Queries

Use `enabled` as a function to create dependent queries:

```tsx
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: fetchUser,
});

const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user?.id,
});
```

#### Exponential Backoff

```tsx
const query = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  retryDelay: (attempt) =>
    Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
});
```

#### Background Refetching

```tsx
const query = useQuery({
  queryKey: ["data"],
  queryFn: fetchData,
  refetchInterval: 1000 * 60,
  refetchIntervalInBackground: true,
});
```

````

--------------------------------

### Type Inference with injectQuery in Angular

Source: https://tanstack.com/query/latest/docs/framework/angular/typescript

Demonstrates automatic type inference for query data using Angular's injectQuery function. The return type of queryFn is automatically inferred, allowing TypeScript to determine that data is number | undefined without explicit type annotations. This example shows basic type inference where the Promise return value flows through to the template.

```angular-ts
@Component({
  // ...
  template: `@let data = query.data();`,
  //               ^? data: number | undefined
})
class MyComponent {
  query = injectQuery(() => ({
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
  }))
}
````

---

### Create Query Persister with Storage Options

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/createPersister

This function initializes a query persister using provided storage options. It allows customization of storage, serialization, deserialization, cache buster, max age, key prefix, and refetch behavior on restore. The storage client must implement `getItem`, `setItem`, `removeItem`, and optionally `entries`.

```tsx
experimental_createQueryPersister(options: StoragePersisterOptions)
```

---

### Bi-directional Infinite List Fetching Parameters

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/infinite-queries

Demonstrates how to configure TanStack Query for bi-directional infinite scrolling. It utilizes `getNextPageParam` and `getPreviousPageParam` to manage cursors for both forward and backward pagination.

```typescript
query = injectInfiniteQuery(() => ({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
}));
```

---

### Monitor Mutation Count with useIsMutating in TanStack Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useIsMutating

This snippet demonstrates how to use the `useIsMutating` hook from `@tanstack/vue-query` to monitor the number of active mutations. It shows two use cases: getting a total count of all ongoing mutations and filtering mutations by a `mutationKey` (e.g., `['posts']`) to count specific types of mutations. The hook returns a number representing the count of matching mutations.

```tsx
import { useIsMutating } from "@tanstack/vue-query";
// How many mutations are fetching?
const isMutating = useIsMutating();
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ["posts"] });
```

---

### Test Infinite Queries in Angular

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/testing

Demonstrates testing infinite queries using `injectInfiniteQuery`. It covers fetching the first page, awaiting stability, fetching the next page, advancing timers, and asserting on the `data().pages` array.

```typescript
import { TestBed } from "@angular/core/testing";
import { ApplicationRef } from "@angular/core";
import { injectInfiniteQuery } from "@tanstack/angular-query";

// Assume fetchPage is defined elsewhere and returns Promise<any[]>
// declare function fetchPage(pageParam: number): Promise<any[]>;

const appRef = TestBed.inject(ApplicationRef);
const infinite = TestBed.runInInjectionContext(() =>
  injectInfiniteQuery(() => ({
    queryKey: ["pages"],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
    getNextPageParam: (last, all) => all.length + 1,
  }))
);

await appRef.whenStable();
expect(infinite.data().pages).toHaveLength(1);

await infinite.fetchNextPage();
await vi.advanceTimersByTimeAsync(0);
await appRef.whenStable();

expect(infinite.data().pages).toHaveLength(2);
```

---

### Create infinite query options in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions

This code snippet demonstrates the basic usage of `infiniteQueryOptions` to construct a configuration object for infinite queries. It requires a `queryKey` and can accept additional options, similar to those found in `useInfiniteQuery` for TanStack Query. Be aware that some options might not have a functional effect when used in contexts like `queryClient.prefetchInfiniteQuery`.

```tsx
infiniteQueryOptions({
  queryKey,
  ...options,
});
```

---

### Client Component with useQuery in Next.js App Router

Source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

Implements the client-side portion of the App Router pattern with a 'use client' directive. The component uses useQuery to access prefetched data and can also fetch additional data that wasn't prefetched on the server. Data from prefetched queries is available immediately, while non-prefetched queries initiate on the client.

```typescript
// app/posts/posts.tsx
"use client";

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ["posts-comments"],
    queryFn: getComments,
  });

  // ...
}
```

---

### Create Query Options with queryOptions

Source: https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions

The queryOptions function creates type-safe query configuration objects that can be passed to useQuery and other query methods like queryClient.prefetchQuery. It requires a queryKey parameter and accepts all standard useQuery options, with an optional experimental_prefetchInRender flag for render-phase prefetching optimization.

```typescript
queryOptions({
  queryKey,
  ...options,
});
```

---

### provideQueryClient() Function

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/provideQueryClient

Creates an Angular provider that injects a QueryClient instance into the dependency injection container. This function enables flexible QueryClient configuration for different parts of an Angular application or for testing purposes.

````APIDOC
## provideQueryClient()

### Description
Provides a QueryClient instance to the Angular dependency injection container. While provideTanStackQuery is typically used for application-wide setup, provideQueryClient can provide different QueryClient instances for specific application sections or unit testing.

### Method
Provider Function

### Function Signature
```ts
function provideQueryClient(queryClient): Provider;
````

### Parameters

#### Function Arguments

- **queryClient** (QueryClient | InjectionToken<QueryClient>) - Required - A QueryClient instance or an InjectionToken that provides a QueryClient instance

### Return Type

- **Provider** - An Angular provider object that can be used in the dependency injection system

### Usage Example

```ts
// Providing a custom QueryClient instance
import { provideQueryClient } from "@tanstack/angular-query-experimental";
import { QueryClient } from "@tanstack/query-core";

const customQueryClient = new QueryClient();

// In your component or module
bootstrapApplication(AppComponent, [provideQueryClient(customQueryClient)]);
```

### Usage Example - With InjectionToken

```ts
import { InjectionToken } from "@angular/core";
import { provideQueryClient } from "@tanstack/angular-query-experimental";

const QUERY_CLIENT_TOKEN = new InjectionToken<QueryClient>("query-client");

bootstrapApplication(AppComponent, [
  {
    provide: QUERY_CLIENT_TOKEN,
    useValue: new QueryClient(),
  },
  provideQueryClient(QUERY_CLIENT_TOKEN),
]);
```

### Related Functions

- **provideTanStackQuery** - Application-wide TanStack Query setup (typically used instead of provideQueryClient alone)

### Use Cases

- Providing alternative QueryClient instances for specific application features
- Setting up different configurations for different parts of the application
- Unit testing with isolated QueryClient instances
- Feature-specific query client configuration

### Source

Defined in: providers.ts:14

````

--------------------------------

### Query Configuration: Refetch Options

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

Configuration options that control when and how queries refetch data automatically. These options determine refetch behavior on mount, window focus, and network reconnection events.

```APIDOC
## Query Configuration: Refetch Options

### Description
Control automatic query refetching behavior in response to various events such as component mount, window focus, and network reconnection.

### Parameters

#### refetchOnMount
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Optional**: Yes
- **Default**: `true`
- **Description**: Controls whether the query refetches on component mount if data is stale
  - `true`: Refetch on mount if data is stale
  - `false`: Do not refetch on mount
  - `"always"`: Always refetch on mount (except when `staleTime: 'static'` is used)
  - `function`: Execute function with query to compute the value

#### refetchOnWindowFocus
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Optional**: Yes
- **Default**: `true`
- **Description**: Controls whether the query refetches when the window regains focus if data is stale
  - `true`: Refetch on window focus if data is stale
  - `false`: Do not refetch on window focus
  - `"always"`: Always refetch on window focus (except when `staleTime: 'static'` is used)
  - `function`: Execute function with query to compute the value

#### refetchOnReconnect
- **Type**: `boolean | "always" | ((query: Query) => boolean | "always")`
- **Optional**: Yes
- **Default**: `true`
- **Description**: Controls whether the query refetches when network connection is restored if data is stale
  - `true`: Refetch on reconnect if data is stale
  - `false`: Do not refetch on reconnect
  - `"always"`: Always refetch on reconnect (except when `staleTime: 'static'` is used)
  - `function`: Execute function with query to compute the value
````

---

### QueryClientProvider

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-cache

React context provider that makes QueryClient available to all components. Must wrap your application to enable hooks usage.

````APIDOC
## QueryClientProvider

### Description
Context provider component that supplies QueryClient to all child components. Required for using TanStack Query hooks.

### Usage
```javascript
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}
````

### Props

- **client** (QueryClient) - Required - The QueryClient instance
- **children** (ReactNode) - Required - Child components

````

--------------------------------

### useIsFetching Hook

Source: https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-cache

Returns the number of queries currently fetching. Useful for showing global loading indicators or disabling UI while data is being fetched.

```APIDOC
## useIsFetching Hook

### Description
Returns the count of queries currently fetching. Useful for global loading states.

### Usage
```javascript
const isFetching = useIsFetching()

return (
  <>
    {isFetching > 0 && <GlobalLoadingIndicator />}
    <App />
  </>
)
````

### Parameters

#### Options Object

- **filters** (object) - Optional - Filter which queries to count
- **filters.queryKey** (array) - Optional - Match specific query key
- **filters.type** (string) - Optional - 'query' | 'mutation'

### Returns

- **number** - Count of fetching queries

````

--------------------------------

### Prevent Object Rest Destructuring on Query Results (TSX)

Source: https://tanstack.com/query/latest/docs/eslint/no-rest-destructuring

This example demonstrates incorrect usage of object rest destructuring with TanStack Query's `useQuery` hook in a TSX environment. Automatically subscribing to all fields via rest destructuring can lead to unnecessary re-renders. The correct approach involves destructuring only the needed properties.

```tsx
/* eslint "@tanstack/query/no-rest-destructuring": "warn" */

const useTodos = () => {
  const { data: todos, ...rest } = useQuery({
    queryKey: ['todos'],
    queryFn: () => api.getTodos(),
  })
  return { todos, ...rest }
}
````

```tsx
const todosQuery = useQuery({
  queryKey: ["todos"],
  queryFn: () => api.getTodos(),
});

// normal object destructuring is fine
const { data: todos } = todosQuery;
```

---

### useQuery Configuration - Caching and Structural Sharing

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Options for controlling cache behavior and structural sharing of query results to optimize performance and memory usage.

````APIDOC
## useQuery Configuration - Caching and Structural Sharing

### Description
Controls how query results are cached and how structural sharing is handled for performance optimization.

### Configuration Parameters

#### structuralSharing
- **Type**: `boolean | (oldData: unknown | undefined, newData: unknown) => unknown`
- **Required**: No
- **Default**: `true`
- **Description**: Controls structural sharing between query results
  - `true`: Enable structural sharing (default)
  - `false`: Disable structural sharing
  - `function`: Custom sharing logic
    - Receives old and new data values
    - Should combine them and retain references from old data
    - Useful for non-serializable values
    - Improves performance by retaining object references

#### subscribed
- **Type**: `boolean`
- **Required**: No
- **Default**: `true`
- **Description**: Controls cache subscription behavior
  - `true`: Instance is subscribed to cache updates
    - Triggers `queryFn` automatically
    - Receives updates when data enters cache
  - `false`: Instance is not subscribed
    - Won't trigger `queryFn` on its own
    - Won't receive updates from other cache sources

### Usage Example
```javascript
const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  structuralSharing: true
})

// Enable structural sharing for better performance

const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  structuralSharing: (oldData, newData) => {
    return { ...oldData, ...newData }
  }
})

// Custom structural sharing logic

const { data } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  subscribed: false
})

// Manual query control without automatic cache subscription
````

````

--------------------------------

### Define TanStack Query Keys with Variables

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-keys

Illustrates how to use arrays with strings and serializable objects to create unique query keys for hierarchical resources or queries with additional parameters.

```tsx
// An individual todo
useQuery(() => { queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery(() => { queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery(() => { queryKey: ['todos', { type: 'done' }], ... })
````

---

### Utility Hook Functions

Source: https://tanstack.com/query/latest/docs/framework/svelte/reference/index

Utility hooks for monitoring global query and mutation states, including fetching status, mutation tracking, and restoring state awareness.

````APIDOC
## FUNCTION: useIsFetching

### Description
Creates a readable store that tracks the number of queries currently fetching. Useful for displaying global loading indicators.

### Syntax
```svelte
const count = useIsFetching(filters?)
````

### Parameters

- **filters** (IsFetchingOptions) - Optional - Filter queries by queryKey or other criteria

### Returns

- Readable store of type **number** - Count of queries currently fetching

---

## FUNCTION: useIsMutating

### Description

Creates a readable store that tracks the number of mutations currently in progress. Useful for displaying mutation activity indicators.

### Syntax

```svelte
const count = useIsMutating(filters?)
```

### Parameters

- **filters** (IsMutatingOptions) - Optional - Filter mutations by status or other criteria

### Returns

- Readable store of type **number** - Count of mutations in progress

---

## FUNCTION: useIsRestoring

### Description

Creates a readable store that indicates whether queries are currently being restored from server state. True during SSR hydration.

### Syntax

```svelte
const isRestoring = useIsRestoring()
```

### Returns

- Readable store of type **boolean** - True if restoring from server state

---

## FUNCTION: useMutationState

### Description

Creates a readable store that filters and returns mutation states from all active mutations. Useful for displaying mutation history or status.

### Syntax

```svelte
const mutations = useMutationState(options?)
```

### Parameters

- **options** (MutationStateOptions) - Optional - Filter mutations by status, predicate, or other criteria

### Returns

- Readable store of type **MutationState[]** - Array of matching mutation states

---

## FUNCTION: useQueryClient

### Description

Retrrieves the QueryClient instance from context. Commonly used for manual query invalidation or cache updates.

### Syntax

```svelte
const queryClient = useQueryClient()
```

### Returns

- **QueryClient** - The active QueryClient instance

````

--------------------------------

### Define usePrefetchInfiniteQuery Hook Signature (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchInfiniteQuery

This snippet illustrates the basic signature for the `usePrefetchInfiniteQuery` hook. It accepts an `options` object, which is compatible with the configuration expected by `queryClient.prefetchInfiniteQuery`. This hook is primarily used to initiate data fetching for infinite queries, typically before a suspense boundary, and does not return a value itself.

```tsx
usePrefetchInfiniteQuery(options)
````

---

### Create First Data Package with Custom Context - React Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4

Demonstrates creating a custom React context paired with a QueryClient and useQuery hook for managing container-specific data. The context is passed to both the useQuery hook and QueryClientProvider to ensure they use the same client instance. This pattern enables multiple independent data packages to coexist without conflicts.

```tsx
// Our first data package: @my-scope/container-data

const context = React.createContext<QueryClient | undefined>(undefined);
const queryClient = new QueryClient();

export const useUser = () => {
  return useQuery(USER_KEY, USER_FETCHER, {
    context,
  });
};

export const ContainerDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
    </QueryClientProvider>
  );
};
```

---

### Basic Usage of usePrefetchQuery Hook (TypeScript/TSX)

Source: https://tanstack.com/query/latest/docs/framework/react/reference/usePrefetchQuery

This snippet illustrates the fundamental way to invoke the `usePrefetchQuery` hook. It accepts an `options` object, which must include `queryKey` to identify the data to be prefetched and may require a `queryFn` if no default is defined. The hook is typically used to initiate data fetching before a Suspense boundary, preparing data for subsequent `useSuspenseQuery` calls without returning any direct value.

```tsx
usePrefetchQuery(options);
```

---

### Dynamic Parallel Queries with `useQueries` (JavaScript)

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/parallel-queries

Shows how to dynamically execute multiple queries in parallel using the `useQueries` hook when the number of queries is not fixed. This is essential for adhering to the rules of hooks in React-like frameworks. It takes an options object with a `queries` array and returns an array of query results. Assumes `users` is a computed property and `fetchUserById` is a defined function.

```javascript
const users = computed(...)
const queries = computed(() => users.value.map(user => {
    return {
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    }
  })
);
const userQueries = useQueries({queries: queries})
```

---

### Query Functions - createQuery

Source: https://tanstack.com/query/latest/docs/framework/svelte/reference/index

Creates a reactive query that automatically fetches and caches data based on dependencies. Returns a readable Svelte store with query state including data, isLoading, error, and isFetching properties.

````APIDOC
## FUNCTION: createQuery

### Description
Creates a reactive query store that manages fetching, caching, and synchronization of server data. Automatically handles refetching based on stale time and window focus events.

### Syntax
```svelte
const query = createQuery(options)
````

### Parameters

- **options** (CreateQueryOptions) - Required - Query configuration including queryKey, queryFn, enabled, staleTime, etc.

### Returns

- Readable Svelte store containing:
  - **data** (T | undefined) - The cached query data
  - **status** ('pending' | 'error' | 'success') - Current query status
  - **isLoading** (boolean) - True while initial data is loading
  - **isFetching** (boolean) - True while any fetch is in progress
  - **error** (Error | null) - Error object if query failed
  - **isError** (boolean) - True if query errored
  - **isSuccess** (boolean) - True if query succeeded

### Usage Example

```svelte
<script>
  import { createQuery } from '@tanstack/svelte-query'

  const query = createQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts')
      return res.json()
    },
    staleTime: 1000 * 60 * 5
  })
</script>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.error}
  <p>Error: {$query.error.message}</p>
{:else}
  <div>{$query.data}</div>
{/if}
```

---

### Prefetch in Event Handlers with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

Implements prefetching triggered by user interactions such as mouse enter or focus events. Uses queryClient.prefetchQuery with onMouseEnter and onFocus handlers to initiate data fetching before the user clicks. Includes staleTime configuration to control when prefetch actually fires.

```tsx
function ShowDetailsButton() {
  const queryClient = useQueryClient()

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['details'],
      queryFn: getDetailsData,
      // Prefetch only fires when data is older than the staleTime,
      // so in a case like this you definitely want to set one
      staleTime: 60000,
    })
  }

  return (
    <button onMouseEnter={prefetch} onFocus={prefetch} onClick={...}>
      Show Details
    </button>
  )
}
```

---

### Prefetch and Hydrate Data with Next.js Pages Router

Source: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

Demonstrates server-side data prefetching using getStaticProps and client-side hydration with HydrationBoundary. The queryClient prefetches the posts query on the server, serializes it via dehydrate(), and rehydrates it on the client to avoid duplicate requests. The Posts component uses useQuery (not useSuspenseQuery) since data is already prefetched.

```typescript
// pages/posts.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";

// This could also be getServerSideProps
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  //
  // Note that we are using useQuery here instead of useSuspenseQuery.
  // Because this data has already been prefetched, there is no need to
  // ever suspend in the component itself. If we forget or remove the
  // prefetch, this will instead fetch the data on the client, while
  // using useSuspenseQuery would have had worse side effects.
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ["posts-comments"],
    queryFn: getComments,
  });

  // ...
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  );
}
```

---

### Configure QueryClient with gcTime for Persistence

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient

Sets up a QueryClient instance with appropriate gcTime configuration to ensure persistent cache is not prematurely garbage collected. The gcTime value should match or exceed the persistQueryClient's maxAge option to prevent unexpected cache discarding.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
```

---

### prefetchQuery with TanStack Query

Source: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

Demonstrates basic prefetchQuery usage to cache query results before they are needed. The prefetch operation returns a Promise and uses the configured staleTime to determine cache freshness. Results are cached like a normal query and will be garbage collected after gcTime if no useQuery instances reference the prefetched query.

```tsx
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
```

---

### Display Global Background Fetching Loading State in Vue Query

Source: https://tanstack.com/query/latest/docs/framework/vue/guides/background-fetching-indicators

Demonstrates using the useIsFetching hook to create a global loading indicator that displays when any queries are fetching in the background. This provides application-wide visibility into background data synchronization across all queries.

```vue
<script setup>
import { useIsFetching } from "@tanstack/vue-query";

const isFetching = useIsFetching();
</script>

<template>
  <div v-if="isFetching">Queries are fetching in the background...</div>
</template>
```

---

### Initialize QueryClient with default options in React

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

Creates a new QueryClient instance with default configuration options. This sets up a cache manager with customizable defaults for all queries and mutations, such as staleTime which controls when cached data is considered stale and needs refetching.

```tsx
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: fetchPosts });
```

---

### Define provideQueryClient function signature (TypeScript)

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/functions/provideQueryClient

This function signature defines `provideQueryClient` which accepts a `queryClient` parameter and returns a `Provider`. It's used to provide a `QueryClient` instance, either directly or via an `InjectionToken`, for specific parts of an application or for unit testing, offering more granular control than `provideTanStackQuery`.

```ts
function provideQueryClient(queryClient): Provider;
```

---

### Handle Async Callbacks with Promise Sequencing in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/react/guides/mutations

Demonstrate sequential execution of async callbacks in useMutation. When callbacks return promises, they are awaited before the next callback executes, ensuring proper ordering of side effects like logging or data validation.

```typescript
useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    console.log("I'm first!");
  },
  onSettled: async () => {
    console.log("I'm second!");
  },
});
```

---

### Test First Angular Query with TestBed

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/testing

Demonstrates testing a basic query injected using `injectQuery` within Angular's `TestBed.runInInjectionContext`. It awaits query completion using `ApplicationRef.whenStable()` and asserts on the query's status and data.

```typescript
import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { injectQuery } from "@tanstack/angular-query";

const appRef = TestBed.inject(ApplicationRef);
const query = TestBed.runInInjectionContext(() =>
  injectQuery(() => ({
    queryKey: ["greeting"],
    queryFn: () => "Hello",
  }))
);

TestBed.tick(); // Trigger effect

// Application is stable when queries are idle
await appRef.whenStable();

expect(query.status()).toBe("success");
expect(query.data()).toBe("Hello");
```

---

### queryClient.prefetchQuery

Source: https://tanstack.com/query/latest/docs/reference/QueryClient

An asynchronous method that prefetches a query before it is needed or rendered with useQuery. It works similarly to fetchQuery but will not throw or return any data.

````APIDOC
## queryClient.prefetchQuery

### Description
Prefetches a query before it is needed or rendered with `useQuery` and friends. The method works the same as `fetchQuery` except that it will not throw or return any data.

### Method
Asynchronous Function

### Syntax
```tsx
await queryClient.prefetchQuery({ queryKey, queryFn })
````

You can also use it with a default queryFn in your config:

```tsx
await queryClient.prefetchQuery({ queryKey });
```

### Parameters

#### Options

- **queryKey** (QueryKey) - Required - The query key to prefetch
- **queryFn** (QueryFunction) - Optional - The query function to execute (can use default from config)
- All other options are the same as [`fetchQuery`](#queryclientfetchquery)

### Returns

- **Promise<void>**
  - A promise that will either immediately resolve if no fetch is needed or after the query has been executed. It will not return any data or throw any errors.

````

--------------------------------

### Test Mutations in Angular with TestBed

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/testing

Shows how to test mutations using `injectMutation` in Angular. It covers initiating a mutation, triggering effects, awaiting stability, and asserting the mutation's success status and returned data.

```typescript
import { TestBed } from '@angular/core/testing'
import { injectMutation } from '@tanstack/angular-query'
import { ApplicationRef } from '@angular/core'

const appRef = TestBed.inject(ApplicationRef)
const mutation = TestBed.runInInjectionContext(() =>
  injectMutation(() => ({
    mutationFn: async (input: string) => input.toUpperCase(),
  })),
)

mutation.mutate('test')

// Trigger effect
TestBed.tick()

await appRef.whenStable()

expect(mutation.isSuccess()).toBe(true)
expect(mutation.data()).toBe('TEST')
````

---

### Initialize MutationCache with Callbacks

Source: https://tanstack.com/query/latest/docs/reference/MutationCache

Demonstrates how to initialize a MutationCache instance with global callbacks for handling mutation errors and successes. These callbacks are invoked for all mutations managed by this cache. The `onError` callback logs any errors, and `onSuccess` logs successful mutation data.

```tsx
import { MutationCache } from "@tanstack/react-query";

const mutationCache = new MutationCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});
```

---

### useQuery Configuration - Data Transformation and Selection

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery

Options for transforming and selecting specific portions of query data without affecting cache storage.

````APIDOC
## useQuery Configuration - Data Transformation

### Description
Provides mechanisms to transform or select portions of query data for component consumption.

### Configuration Parameters

#### select
- **Type**: `(data: TData) => unknown`
- **Required**: No
- **Description**: Transforms or selects a portion of the query data
  - Only affects the returned `data` value
  - Does not affect what is stored in the query cache
  - Function only runs if `data` changed or if function reference changes
  - **Optimization**: Wrap in `useCallback` to prevent unnecessary re-executions

### Usage Example
```javascript
const { data: userName } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  select: (data) => data.name
})

// userName contains only the name field from the full user object

const { data: userEmail } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  select: useCallback((data) => data.email, [])
})

// Optimized selection with useCallback
````

````

--------------------------------

### Fetch GitHub Repository Data with TanStack Query in React

Source: https://tanstack.com/query/latest/docs/framework/react/examples/simple

This React component sets up TanStack Query with `QueryClientProvider` and uses the `useQuery` hook to fetch public repository data from the GitHub API. It displays loading, error, and fetched data states, demonstrating basic data fetching and UI updates.

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/repos/TanStack/query',
      )
      return await response.json()
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)

````

---

### Manage TanStack Query Queries with Filters

Source: https://tanstack.com/query/latest/docs/framework/angular/guides/filters

Demonstrates how to use QueryFilters to manage queries. This includes canceling all queries, removing inactive queries by key, and refetching active queries by key or all active queries. It utilizes the `queryClient` methods with different filter configurations.

```typescript
await queryClient.cancelQueries();

queryClient.removeQueries({ queryKey: ["posts"], type: "inactive" });

await queryClient.refetchQueries({ type: "active" });

await queryClient.refetchQueries({ queryKey: ["posts"], type: "active" });
```

---

### CreateQueryOptions Interface Definition

Source: https://tanstack.com/query/latest/docs/framework/angular/reference/interfaces/CreateQueryOptions

Core interface for query options configuration in TanStack Query. Extends CreateBaseQueryOptions and provides type-safe generic parameters for query data, error handling, transformed data, and query keys.

````APIDOC
## CreateQueryOptions Interface

### Description
Interface that defines configuration options for creating queries in TanStack Query. Extends CreateBaseQueryOptions while omitting the suspense property. Provides flexible generic type parameters for type-safe query configuration.

### Interface Definition
```typescript
interface CreateQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends OmitKeyof<
  CreateBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >,
  "suspense"
> {}
````

### Type Parameters

- **TQueryFnData** (type) - Optional - The type of data returned by the query function. Defaults to `unknown`
- **TError** (type) - Optional - The type of errors that can occur during query execution. Defaults to `DefaultError`
- **TData** (type) - Optional - The type of the final query data after transformation. Defaults to `TQueryFnData`
- **TQueryKey** (type) - Optional - The type of the query key, must extend `QueryKey`. Defaults to `QueryKey`

### Extends

- `OmitKeyof<CreateBaseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, "suspense">`
- Inherits all properties from CreateBaseQueryOptions except the suspense property

### Source Location

- **File**: types.ts
- **Line**: 35
- **Repository**: [TanStack Query GitHub](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L35)

### Usage Example

```typescript
const queryOptions: CreateQueryOptions<User, Error, User, ["user", id]> = {
  queryKey: ["user", id],
  queryFn: async () => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  retry: 3,
};
```

````

--------------------------------

### useMutation Hook - Return Values

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

Complete documentation of all return values from the useMutation hook, including the mutate function, status tracking properties, and state management utilities for handling mutation lifecycle.

```APIDOC
## useMutation Hook - Return Values

### Description
Returns an object containing mutation control functions, status properties, and state information for managing the mutation lifecycle.

### Returns

#### mutate Function
- **Type**: `(variables: TVariables, { onSuccess, onSettled, onError }) => void`
- **Description**: The mutation function you can call with variables to trigger the mutation and optionally hook on additional callback options.

##### mutate Parameters
- **variables** (TVariables) - Optional - The variables object to pass to the `mutationFn`.
- **onSuccess** (callback) - Optional - Fires when the mutation is successful and receives the mutation's result. Void function, returned value is ignored.
  - Parameters: `(data: TData, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
- **onError** (callback) - Optional - Fires if the mutation encounters an error and receives the error. Void function, returned value is ignored.
  - Parameters: `(err: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
- **onSettled** (callback) - Optional - Fires when the mutation is either successfully fetched or encounters an error. Void function, returned value is ignored.
  - Parameters: `(data: TData | undefined, error: TError | null, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
- **Note**: If you make multiple requests, `onSuccess` will fire only after the latest call you've made.

#### mutateAsync Function
- **Type**: `(variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
- **Description**: Similar to `mutate` but returns a promise which can be awaited.

#### status Property
- **Type**: `MutationStatus`
- **Description**: Current status of the mutation
- **Possible Values**:
  - `idle` - Initial status prior to the mutation function executing
  - `pending` - The mutation is currently executing
  - `error` - The last mutation attempt resulted in an error
  - `success` - The last mutation attempt was successful

#### Status Boolean Flags
- **isIdle** (boolean) - Derived from `status`, true when status is 'idle'
- **isPending** (boolean) - Derived from `status`, true when status is 'pending'
- **isSuccess** (boolean) - Derived from `status`, true when status is 'success'
- **isError** (boolean) - Derived from `status`, true when status is 'error'

#### isPaused Property
- **Type**: `boolean`
- **Description**: Will be `true` if the mutation has been paused. See Network Mode documentation for more information.

#### data Property
- **Type**: `undefined | unknown`
- **Default**: `undefined`
- **Description**: The last successfully resolved data for the mutation.

#### error Property
- **Type**: `null | TError`
- **Description**: The error object for the mutation, if an error was encountered.

#### reset Function
- **Type**: `() => void`
- **Description**: A function to clean the mutation internal state. Resets the mutation to its initial state.

#### failureCount Property
- **Type**: `number`
- **Description**: The failure count for the mutation. Incremented every time the mutation fails. Reset to 0 when the mutation succeeds.

#### failureReason Property
- **Type**: `null | TError`
- **Description**: The failure reason for the mutation retry. Reset to `null` when the mutation succeeds.

#### submittedAt Property
- **Type**: `number`
- **Default**: `0`
- **Description**: The timestamp for when the mutation was submitted.

#### variables Property
- **Type**: `undefined | TVariables`
- **Default**: `undefined`
- **Description**: The variables object passed to the `mutationFn`.
````

---

### Define and use TanStack Query Options in TypeScript

Source: https://tanstack.com/query/latest/docs/framework/solid/guides/query-options

This TypeScript snippet demonstrates defining a reusable `queryOptions` object using the `queryOptions` helper, co-locating `queryKey` and `queryFn` with `staleTime`. It then illustrates diverse applications of these options with `useQuery`, `useSuspenseQuery`, `useQueries`, `queryClient.prefetchQuery`, and `queryClient.setQueryData` for efficient data management.

```typescript
import { queryOptions } from '@tanstack/solid-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(() => groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries(() => {
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

---

### Default broadcastQueryClient Configuration

Source: https://tanstack.com/query/latest/docs/framework/react/plugins/broadcastQueryClient

Shows the default configuration options used by broadcastQueryClient when optional parameters are not provided. The default broadcast channel is 'tanstack-query' if not explicitly specified.

```typescript
{
  broadcastChannel: 'tanstack-query',
}
```

---

### Query Options Configuration

Source: https://tanstack.com/query/latest/docs/framework/vue/reference/queryOptions

Documents the `queryOptions` function, used to create reusable and type-safe configuration objects for TanStack Query hooks and client methods.

````APIDOC
## FUNCTION queryOptions

### Description
The `queryOptions` function is used to define a structured and reusable set of configuration options for TanStack Query. These options can then be passed to hooks like `useQuery` or client methods such as `queryClient.prefetchQuery`, organizing query logic and ensuring consistency across your application.

### Method
N/A (Local Function Call)

### Endpoint
N/A (Local Function)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body (Function Arguments)
- **queryKey** (QueryKey) - Required - The unique key used to identify and cache the query's data. This key is fundamental for invalidation, refetching, and cache management.
- **experimental_prefetchInRender** (boolean) - Optional - Defaults to `false`. If set to `true`, queries will be prefetched during the component's render cycle. This is an experimental feature often used for specific performance optimizations and is required for the experimental `useQuery().promise` functionality.
- **...options** (object) - Optional - Represents any other standard TanStack Query options that can typically be passed to `useQuery` (e.g., `staleTime`, `cacheTime`, `enabled`, `select`, etc.). Note that some of these options might have no effect when the `queryOptions` object is forwarded to functions like `queryClient.prefetchQuery`, but TypeScript will still allow them.

### Request Example
```tsx
import { queryOptions } from '@tanstack/react-query';

const todoOptions = queryOptions({
  queryKey: ['todos', { status: 'active' }],
  queryFn: async () => fetch('/api/todos?status=active').then(res => res.json()),
  staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
  experimental_prefetchInRender: true,
});

// This todoOptions object can then be used with:
// useQuery(todoOptions);
// queryClient.prefetchQuery(todoOptions);
````

### Response

#### Success Response (Configuration Object)

- (object) - Returns a fully configured options object that consolidates the provided `queryKey` and other options. This object is ready to be consumed by TanStack Query's API.

#### Response Example

```json
{
  "queryKey": ["todos", { "status": "active" }],
  "queryFn": "function (async)",
  "staleTime": 300000,
  "experimental_prefetchInRender": true
}
```

````

--------------------------------

### Basic useSuspenseQueries Hook Usage (TypeScript/React Query)

Source: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQueries

Demonstrates the basic invocation of the `useSuspenseQueries` hook. It accepts an `options` object, similar to `useQueries`, and returns an array `result` where `data` is guaranteed to be defined for each query upon successful loading within a Suspense boundary.

```tsx
const result = useSuspenseQueries(options)
````
