"use server"
import {PostData} from "@/utils/AxiosFetch";

export async function createSubExamAction(values: {
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
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}