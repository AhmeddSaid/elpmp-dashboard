import Enrollments from "@/features/enrollments";
import React from "react";
import { getEnrollments } from "./actions";

export default async function page({ searchParams }: { searchParams: any }) {
  const email = searchParams.email || "";
  const page = searchParams.page || "1";
  const size = searchParams.size || 10;

  const data = await getEnrollments({
    email: searchParams?.email,
    size: searchParams?.size,
    page: searchParams?.page,
  });

  console.log(data);

  return (
    <Enrollments
      data={data}
      page={page}
      size={size}
      showing={data.showing}
      lastPage={data.lastPage}
      total={data.total}
      email={email}
    />
  );
}
