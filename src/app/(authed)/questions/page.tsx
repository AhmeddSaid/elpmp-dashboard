import Questions from "@/features/questions";
import React from "react";
import {getQuestion, getSettings} from "@/app/(authed)/questions/action";

export default async function page({
                                       searchParams,
                                       params,
                                   }: {
    params: { locale: string };
    searchParams: any;
}) {



    const reference = searchParams.reference || "";
    const page = searchParams.page || 1;
    const size = searchParams.size || 10;

    const QuestionData = await getQuestion({
        reference: searchParams?.reference,
        size: searchParams?.size,
        page: searchParams?.page,
    });


    const {lastPage, showing, total} = await getSettings();


    return (
        <div>
            <Questions lastPage={lastPage}
                       page={page}
                       size={size}
                       reference={reference}
                       showing={showing}
                       total={total}
                       data={QuestionData}/>
        </div>
    );
}
