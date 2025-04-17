import React from 'react';
import CreateQuestion from "@/components/CreateQuestion/CreateQuestion";
import {GetData} from "@/utils/AxiosFetch";

const Page = async () => {


    const res = await GetData(`tag/`);

    // console.log(res.data.data, "resssssss")
    return (
        <>
            <CreateQuestion data={res?.data?.data}/>
        </>
    );
};

export default Page;