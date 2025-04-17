"use server"

import {GetData} from "@/utils/AxiosFetch";
import {generateQueryString} from "@/lib/utils";



export async function getQuestion(params: {
    reference?: string;
    size?: string;
    page?: number;
}) {
    try {
        const queryString = generateQueryString(params);
        const query = queryString ? `?${queryString}` : "";
        const res = await GetData(`/question/admin${query}`);
        return res.data.data;
    } catch (error) {
        console.error("Error fetching users data:", error);
        return [];
    }
}

export async function getSettings() {
    try {
        const res = await GetData("/question/admin");
        return res.data.data;
    } catch (error) {
        console.error("Error fetching users settings:", error);
        return null;
    }
}




