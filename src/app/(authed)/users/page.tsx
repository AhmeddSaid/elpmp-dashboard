import Users from "@/features/users";
import React from "react";
import { getExams, getSettings, getUsers } from "./actions";

export default async function page({
  searchParams,
  params,
}: {
  params: { locale: string };
  searchParams: any;
}) {
  const email = searchParams.email || "";
  const page = searchParams.page || "1";
  const size = searchParams.size || 10;

  const usersData = await getUsers({
    email: searchParams?.email,
    size: searchParams?.size,
    page: searchParams?.page,
  });
  const exams = await getExams();

  return (
    <div>
      <Users
        data={usersData}
        exams={exams}
        page={page}
        size={size}
        showing={usersData.showing}
        lastPage={usersData.lastPage}
        total={usersData.total}
        email={email}
      />
    </div>
  );
}
