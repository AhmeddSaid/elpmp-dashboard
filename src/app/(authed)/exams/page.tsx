
import React from "react";
import {GetData} from "@/utils/AxiosFetch";
import Exams from "@/features/exams";

export default async function page() {
    const allExams = await GetData("/exam") as {
        data: {
            data: {
                nameEn: string,
                nameAr: string,
                createdAt: string,
                updateAt: string,
                examsCount: number,
                questionsCount: number,
                isDeleted: boolean
            }[]
        }
    }
    console.log(allExams.data.data)
    return (
        <div>
            <Exams data={allExams?.data?.data ||[]}/>
        </div>
    );
}
