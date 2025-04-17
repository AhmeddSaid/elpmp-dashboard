"use server";

import { generateQueryString } from "@/lib/utils";
import { GetData, PostData } from "@/utils/AxiosFetch";

export async function getUsers(params: {
  email?: string;
  size?: string;
  page?: number;
}) {
  try {
    const queryString = generateQueryString(params);
    const query = queryString ? `?${queryString}` : "";
    const res = await GetData(`/user${query}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
}

export const getExams = async () => {
  try {
    const data = await GetData("/exam");
    console.log(data.data.data, "EXAAMS");
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (values: {
  exam: string;
  firstName: string;
  lastName: string;
  email: string;
  isActivate: boolean;
  ActiveUntil: string;
}) => {
  try {
    // const res = await PostData("/user/add-student", values);
    // console.log(res.status);
    // return res.status;
    const res = "user added successfully";
    console.log(values);
    return res;
  } catch (error) {
    console.log(error);
  }
};
