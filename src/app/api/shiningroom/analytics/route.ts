import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/shiningroom/server";
export async function GET(request: Request) {
  try {
    await requireOwner(request);
    const token = process.env.VERCEL_TOKEN,
      project = process.env.VERCEL_PROJECT_ID;
    if (!token || !project)
      return NextResponse.json(
        {
          error: "Configure the Vercel token and project ID to load analytics.",
        },
        { status: 503 },
      );
    const days = Number(new URL(request.url).searchParams.get("days") || 7);
    if (![7, 30, 90].includes(days))
      return NextResponse.json(
        { error: "Invalid date range." },
        { status: 400 },
      );
    const until = new Date().toISOString().slice(0, 10);
    const since = new Date(Date.now() - days * 86400000)
      .toISOString()
      .slice(0, 10);
    const groups = [
      "day",
      "requestPath",
      "referrerHostname",
      "country",
      "deviceType",
    ];
    const results = await Promise.all(
      groups.map(async (by) => {
        const params = new URLSearchParams({
          projectId: project,
          since,
          until,
          by,
          limit: by === "day" ? "100" : "10",
          filter: "requestPath ne '/shiningroom'",
        });
        if (process.env.VERCEL_TEAM_ID)
          params.set("teamId", process.env.VERCEL_TEAM_ID);
        const response = await fetch(
          `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${params}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 300 },
            signal: AbortSignal.timeout(15000),
          },
        );
        if (!response.ok)
          throw new Error(
            `Vercel analytics returned ${response.status}. Check project access and the reporting window.`,
          );
        const result = await response.json();
        return [by, result.data];
      }),
    );
    return NextResponse.json(
      { since, until, reports: Object.fromEntries(results) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Analytics unavailable.",
      },
      {
        status:
          error instanceof Error && error.message === "Unauthorized"
            ? 401
            : 502,
      },
    );
  }
}
