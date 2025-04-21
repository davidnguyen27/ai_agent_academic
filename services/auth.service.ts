import axiosInstance from "@/lib/axios";

export const authService = {
  authenticate: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>("/api/user/login", credentials);
    return res.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>("/api/user/refresh-token", { refreshToken });
    return res.data;
  },
};
