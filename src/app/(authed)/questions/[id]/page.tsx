import React from 'react';
import EditQuestion from "@/components/EditQuestion/EditQuestion";
import {GetData} from "@/utils/AxiosFetch";

const Page = async ({params}: { params: { id: string } }) => {


    const res = await GetData(`question/${params.id}`);
    const AnswersData = await GetData(`/answer/question/${params.id}`);
    console.log(res.data.data, "lllllllll")
    return (
        <>
            <EditQuestion answersData={AnswersData.data.data} data={res.data.data} id={params.id}/>
        </>
    );
};

export default Page;