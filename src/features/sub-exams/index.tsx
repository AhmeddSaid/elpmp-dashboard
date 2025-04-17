"use client";

import {columns} from "./components/columns";
import {DataTable} from "./components/data-table";
import {TasksPrimaryButtons} from "./components/tasks-primary-buttons";
import TasksProvider from "./context/tasks-context";

export default function SubExams({data}: {
    data: {
        nameAr: string;
        nameEn: string;
        sessionCount: number;
        _count: { ExamHistory: number };
        id: string
    }[]
}) {
    const tasks = data.map(exam => ({
        nameEn: exam.nameEn,
        nameAr: exam.nameAr,
        sessionCount: exam.sessionCount,
        examHistory: exam._count.ExamHistory,
    }))
    return (
        <TasksProvider>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Sub Exams</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your exams.
                    </p>
                </div>
                <TasksPrimaryButtons/>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                <DataTable data={tasks} columns={columns}/>
            </div>
            {/*<TasksDialogs />*/}
        </TasksProvider>
    );
}
