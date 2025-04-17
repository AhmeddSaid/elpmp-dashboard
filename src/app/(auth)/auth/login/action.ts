"use server";
import axios from "axios";
import { cookies } from "next/headers";
import httpStatus from "@/utils/httpStatus";
import HttpStatus from "@/utils/httpStatus";
import { axiosInstance } from "@/utils/AxiosFetch";
import { redirect } from "next/navigation";

export const loginAction = async (values: {
  email: string;
  rememberMe: boolean;
  password: string;
}): Promise<{ status: number }> => {
  try {
    const res = await axiosInstance.post(
      "/auth/admin/login",
      {
        email: values.email,
        password: values.password,
        rememberMe: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      const setCookieHeader = res.headers["set-cookie"];
      if (setCookieHeader) {
        const match = setCookieHeader[0].match(/pmp_db_userId=([^;]+)/);

        if (match) {
          const accessToken = match[1];
          const cookiesStore = cookies();

          if (process.env.ENV === "PRODUCTION") {
            cookiesStore.set("pmp_db_userId", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              path: "/",
              domain: "elpmp.com",
              maxAge: values.rememberMe ? 60 * 60 * 24 * 3 : undefined,
            });
          } else {
            cookiesStore.set("pmp_db_userId", accessToken, {
              httpOnly: false,
              // secure: false,
              // sameSite: "lax",
              maxAge: values.rememberMe ? 60 * 60 * 24 * 3 : undefined,
            });
          }
        } else {
          return { status: httpStatus.INTERNAL_SERVER_ERROR };
        }
      } else {
        return { status: httpStatus.INTERNAL_SERVER_ERROR };
      }
      // sessionStorage.setItem("email", values.email);
      // redirect("/");

    }
    console.log(res.status,"statusssss")
    return { status: res.status };
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } else if (error instanceof Error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    } else {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
};
