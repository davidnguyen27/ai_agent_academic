"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { authService } from "@/services/auth.service";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu tối thiểu 5 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Authentication() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { accessToken, refreshToken } = await authService.authenticate(data);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("Đăng nhập thành công!");
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Đăng nhập thất bại");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-900">Đăng nhập</h2>

        <div>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Input type="password" placeholder="Mật khẩu" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
}
