"use client";
import { useEffect, useState } from "react";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersTable } from "./components/users-table";
import UsersProvider from "./context/users-context";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Enrollments({
  data,
  exams,
  page,
  size,
  showing,
  lastPage,
  total,
  email,
}: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [debouncedEmail, setDebouncedEmail] = useState(email || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (debouncedEmail) {
        params.set("email", debouncedEmail);
      } else {
        params.delete("email");
      }

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedEmail, searchParams, pathname, router]);

  function handleEmailSearch(email: string) {
    setDebouncedEmail(email);
  }

  function handlePageSize(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("size", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  function handlePageChange(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <UsersProvider>
      {/* <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header> */}

      {/* <Main> */}
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Enrollments List
          </h2>
          <p className="text-muted-foreground">Manage your Enrollments here.</p>
        </div>
        <UsersPrimaryButtons />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <UsersTable
          data={data}
          columns={columns}
          handleEmailSearch={handleEmailSearch}
          email={debouncedEmail}
          page={page}
          size={size}
          showing={showing}
          lastPage={lastPage}
          total={total}
          handlePageSize={handlePageSize}
          handlePageChange={handlePageChange}
        />
      </div>
      {/* </Main> */}

      <UsersDialogs />
    </UsersProvider>
  );
}
