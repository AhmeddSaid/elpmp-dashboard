"use server";
import { cookies } from "next/headers";
import { axiosInstance } from "@/Utils/AxiosFetch";
import httpStatus from "@/Utils/httpStatus";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  try {
    const requestCookies = (await cookies()).getAll();
    const cookieHeader = requestCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await axiosInstance.get("/auth/logout", {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    if (
      res.status === httpStatus.SUCCESS ||
      res.status === httpStatus.UNAUTHORIZED ||
      res.status === httpStatus.FORBIDDEN
    ) {
      const setCookieHeader = res.headers["set-cookie"];
      if (setCookieHeader) {
        const match = setCookieHeader[0].match(/userId=([^;]+)/);
        if (match) {
          const accessToken = match[1];
          const cookiesStore = cookies();
          (await cookiesStore).set("pmp_db_userId", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            domain: "elpmp.com",
            maxAge: 0,
          });
        } else {
          return { status: httpStatus.INTERNAL_SERVER_ERROR };
        }
      }
    }
    // redirect("/auth/login");
    return { status: httpStatus.SUCCESS };
  } catch (error) {
    console.log(error);
    const cookiesStore = cookies();
    (await cookiesStore).set("pmp_db_userId", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: "elpmp.com",
      maxAge: 0,
    });
    return { status: httpStatus.INTERNAL_SERVER_ERROR };
  }
}
