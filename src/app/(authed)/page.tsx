import Dashboard from "@/features/dashboard";
import React from "react";
import {GetData} from "@/utils/AxiosFetch";

export default async function page() {
    const res = await GetData("/user/get-students") as {
        data: {
            data: {
                data: {
                    totalStudents: string,
                    totalEnrolled: string,
                    totalExams: string
                }
            }
        }
    };
    // console.log(res.data.data.data)
    return (
        <div>
            <Dashboard data={res?.data?.data?.data || {}}/>
        </div>
    );
}
