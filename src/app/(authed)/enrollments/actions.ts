"use server";

import { generateQueryString } from "@/lib/utils";
import { GetData } from "@/utils/AxiosFetch";

export const getExams = async (id) => {
  try {
    const data = await GetData(`/exam/${id}`);

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export async function getEnrollments(params: {
  email?: string;
  size?: string;
  page?: number;
}) {
  try {
    const queryString = generateQueryString(params);
    const query = queryString ? `?${queryString}` : "";
    const res = await GetData(`/enroll/get-all-enroll-admin${query}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
}

export async function getSettings() {
  try {
    const res = await GetData("/enroll/get-all-enroll-admin");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching users settings:", error);
    return null;
  }
}
