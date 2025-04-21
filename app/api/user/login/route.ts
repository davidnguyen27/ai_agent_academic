import { authService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = await authService.authenticate({ email, password });

    // Trả về token/user tuỳ ý bạn trong authService
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 });
  }
}
