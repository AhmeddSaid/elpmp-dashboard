"use server"


import {PostData} from "@/utils/AxiosFetch";

export async function EditQuestion(values, questionId) {
    try {
        const res = await PostData(`/update/answers/${questionId}`, values);
        console.log(res, "ssssss");
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}