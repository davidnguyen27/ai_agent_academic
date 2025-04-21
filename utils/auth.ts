import { jwtDecode } from "jwt-decode";

export const isAdmin = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    interface DecodedToken {
      [key: string]: string;
    }
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return role === "Admin";
  } catch {
    return false;
  }
};
