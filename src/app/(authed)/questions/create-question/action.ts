"use server"



import {PostData} from "@/utils/AxiosFetch";

export async function AddQuestion(values) {
    try {
        const res = await PostData(`/question/add/answers`, values);
        console.log(res, "ssssss");
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}