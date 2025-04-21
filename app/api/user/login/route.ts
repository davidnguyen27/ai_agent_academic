import { authService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // ✅ Kiểm tra trước khi trả kết quả
    console.log("🚀 Đang xử lý login với:", email, password);
    const result = await authService.authenticate({ email, password });
    console.log("✅ Login thành công:", result);

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Lỗi login:", error.message);
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 });
  }
}
