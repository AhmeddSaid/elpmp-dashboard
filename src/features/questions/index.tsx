"use client";

import {columns} from "./components/columns";
import {DataTable} from "./components/data-table";
import {TasksDialogs} from "./components/tasks-dialogs";
import {TasksPrimaryButtons} from "./components/tasks-primary-buttons";
import TasksProvider from "./context/tasks-context";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Questions({
                                      data, lastPage,
                                      page,
                                      size,
                                      reference,
                                      showing,
                                      total,
                                  }: { data: [] }) {


    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [debouncedRefrence, setDebouncedReference] = useState(reference || "");

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (debouncedRefrence) {
                params.set("reference", debouncedRefrence);
            } else {
                params.delete("reference");
            }

            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedRefrence, searchParams, pathname, router]);

    function handleEmailSearch(reference: string) {
        setDebouncedReference(reference);
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
        <TasksProvider>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Questions</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your questions.
                    </p>
                </div>
                <TasksPrimaryButtons/>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                <DataTable
                    data={data}
                    handleEmailSearch={handleEmailSearch}
                    reference={debouncedRefrence}
                    page={page}
                    size={size}
                    showing={showing}
                    lastPage={lastPage}
                    total={total}
                    handlePageSize={handlePageSize}
                    handlePageChange={handlePageChange}


                    columns={columns}/>
            </div>
            <TasksDialogs/>
        </TasksProvider>
    );
}
