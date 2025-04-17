import SubExams from "@/features/sub-exams";
import {GetData} from "@/utils/AxiosFetch";
import React from "react";

export default async function page() {
    const AllSubExams = await GetData("/subExam/all/admin") as {
        data: {
            data: {
                nameAr: string;
                nameEn: string;
                sessionCount: number;
                _count: { ExamHistory: number };
                id: string
            }[]
        }
    }
    // console.log(SubExams.data.data)
    return (
        <div>
            <SubExams data={AllSubExams.data.data || []}/>
        </div>
    );
}
