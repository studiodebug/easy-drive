"use client";

import { Card } from "@/components/retroui/Card";
import { useEffect, useState } from "react";

import type { InstructorPublicDTO } from "@/shared/dtos/instructor.dto";
import type { UserPrivateDTO } from "@/shared/dtos/user.dto";

type UserMeApiState =
  | { status: "idle" | "loading" }
  | { status: "success"; httpStatus: number; data: unknown }
  | { status: "error"; httpStatus?: number; error: string; details?: unknown };

type UserMeResponse = {
  user: UserPrivateDTO;
  instructor: InstructorPublicDTO | null;
};

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
            {isUserMeResponse(state.data) ? (
              <div className="mt-2 grid gap-3">
                <div className="rounded border p-3">
                  <p className="font-semibold">Usuário</p>
                  <div className="mt-2 grid gap-1 text-sm">
                    <Row label="id" value={state.data.user.id} />
                    <Row label="name" value={state.data.user.name} />
                    <Row
                      label="photoUrl"
                      value={state.data.user.photoUrl ?? "—"}
                    />
                    <Row
                      label="createdAt"
                      value={state.data.user.createdAt ?? "—"}
                    />
                    <Row
                      label="documentType"
                      value={state.data.user.documentType ?? "—"}
                    />
                    <Row
                      label="documentMasked"
                      value={state.data.user.documentMasked ?? "—"}
                    />
                    <Row
                      label="addressId"
                      value={state.data.user.addressId ?? "—"}
                    />
                    {state.data.user.address ? (
                      <Row
                        label="address"
                        value={`${state.data.user.address.city}, ${state.data.user.address.state} (${state.data.user.address.country})`}
                      />
                    ) : null}
                    <Row
                      label="instructorId"
                      value={state.data.user.instructorId ?? "—"}
                    />
                    <Row
                      label="studentId"
                      value={state.data.user.studentId ?? "—"}
                    />
                    <Row
                      label="walletId"
                      value={state.data.user.walletId ?? "—"}
                    />
                  </div>
                </div>

                <div className="rounded border p-3">
                  <p className="font-semibold">Instrutor</p>
                  {state.data.instructor ? (
                    <div className="mt-2 grid gap-1 text-sm">
                      <Row label="id" value={state.data.instructor.id} />
                      <Row
                        label="isActive"
                        value={
                          typeof state.data.instructor.isActive === "boolean"
                            ? String(state.data.instructor.isActive)
                            : "—"
                        }
                      />
                      <Row
                        label="rating"
                        value={
                          typeof state.data.instructor.rating === "number"
                            ? String(state.data.instructor.rating)
                            : "—"
                        }
                      />
                      <Row
                        label="driversLicense"
                        value={state.data.instructor.driversLicense ?? "—"}
                      />
                      <Row
                        label="profileId"
                        value={state.data.instructor.profileId ?? "—"}
                      />
                      {state.data.instructor.profile ? (
                        <>
                          <Row
                            label="profile.specialty"
                            value={
                              state.data.instructor.profile.specialty ?? "—"
                            }
                          />
                          <Row
                            label="profile.description"
                            value={
                              state.data.instructor.profile.description ?? "—"
                            }
                          />
                          <Row
                            label="profile.yearsOfExperience"
                            value={
                              typeof state.data.instructor.profile
                                .yearsOfExperience === "number"
                                ? String(
                                    state.data.instructor.profile
                                      .yearsOfExperience
                                  )
                                : "—"
                            }
                          />
                          <Row
                            label="profile.currentDriversLicenseType"
                            value={
                              state.data.instructor.profile
                                .currentDriversLicenseType ?? "—"
                            }
                          />
                        </>
                      ) : null}
                      {state.data.instructor.address ? (
                        <Row
                          label="address"
                          value={`${state.data.instructor.address.city}, ${state.data.instructor.address.state} (${state.data.instructor.address.country})`}
                        />
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/70 mt-2">
                      Nenhum vínculo de instrutor encontrado.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <pre className="text-xs font-mono p-3 rounded border max-h-64 overflow-auto w-full">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            )}
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

function isUserMeResponse(value: unknown): value is UserMeResponse {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (!v.user || typeof v.user !== "object") return false;
  const u = v.user as Record<string, unknown>;
  return typeof u.id === "string" && typeof u.name === "string";
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <span className="font-mono text-xs text-foreground/60">{label}</span>
      <span className="font-mono text-xs break-all">{value}</span>
    </div>
  );
}
