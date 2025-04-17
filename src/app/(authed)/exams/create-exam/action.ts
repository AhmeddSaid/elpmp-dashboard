"use server"
import {PostData} from "@/utils/AxiosFetch";

export async function createExamAction(values: {
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    slug: string;
    subExamType: string;
    exam: string;
    tag: string;
    passingScore: string;
    durationPerQuestion: string;
    patsh: string;
    isDeleted: boolean
}) {

    try {
        const res = await PostData(``, values);
        console.log(res, "response");
        return {status: res.status};
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}