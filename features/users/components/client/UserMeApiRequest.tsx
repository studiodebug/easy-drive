"use client";

import { Card } from "@/components/retroui/Card";
import { useEffect, useState } from "react";

type UserMeApiState =
  | { status: "idle" | "loading" }
  | { status: "success"; httpStatus: number; data: unknown }
  | { status: "error"; httpStatus?: number; error: string; details?: unknown };

export function UserMeApiRequest() {
  const [state, setState] = useState<UserMeApiState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: "loading" });

      try {
        const res = await fetch("/api/users/me", { credentials: "include" });
        const httpStatus = res.status;

        const contentType = res.headers.get("content-type") ?? "";
        const body = contentType.includes("application/json")
          ? await res.json()
          : await res.text();

        if (!res.ok) {
          const errorMessage =
            typeof body === "object" && body && "error" in body
              ? String((body as { error?: unknown }).error ?? "Request failed")
              : "Request failed";

          if (!cancelled) {
            setState({
              status: "error",
              httpStatus,
              error: errorMessage,
              details: body,
            });
          }
          return;
        }

        if (!cancelled) {
          setState({ status: "success", httpStatus, data: body });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setState({
            status: "error",
            error: e instanceof Error ? e.message : "Request failed",
          });
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">API: /api/users/me</h3>
        {state.status === "loading" || state.status === "idle" ? (
          <p className="text-sm text-foreground/70">Requesting...</p>
        ) : null}

        {state.status === "success" ? (
          <>
            <p className="text-sm text-foreground/70">
              Status: <span className="font-mono">{state.httpStatus}</span>
            </p>
            <pre className="text-xs font-mono p-3 rounded border max-h-64 overflow-auto w-full">
              {JSON.stringify(state.data, null, 2)}
            </pre>
          </>
        ) : null}

        {state.status === "error" ? (
          <>
            <p className="text-sm text-red-500">
              {state.httpStatus ? (
                <>
                  Status <span className="font-mono">{state.httpStatus}</span>:{" "}
                </>
              ) : null}
              {state.error}
            </p>
            {state.details ? (
              <pre className="text-xs font-mono p-3 rounded border max-h-64 overflow-auto w-full">
                {JSON.stringify(state.details, null, 2)}
              </pre>
            ) : null}
          </>
        ) : null}
      </div>
    </Card>
  );
}
