"use client"
import React from 'react';
import {useFormik} from "formik";
import {
    createExamInitialValues,
    createExamValidationSchema
} from "@/app/(authed)/exams/create-exam/_createExamUtils/createExam.validation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


export interface ExamValuesType {
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    slug: string;
    image: string;
    priceUSD: string;
    priceEGP: string;
    discountedPriceUSD: string;
    discountedPriceEGP: string;
    period: string;
    isDeleted: boolean;
}

const CreateExam = () => {
    async function handleForm(values: Partial<ExamValuesType>) {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: createExamInitialValues,
        validationSchema: createExamValidationSchema,
        onSubmit: handleForm
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"w-2/3 flex flex-col gap-y-4"}>
                <div className={"flex-grow flex flex-col gap-0.5"}>
                    <label htmlFor="image">Image</label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            formik.setFieldValue("image", file || "");
                        }}
                        onBlur={formik.handleBlur}
                        placeholder="Upload Image"
                    />
                    {formik.errors.image && formik.touched.image &&
                        <p className={"text-red-600"}>{formik.errors.image}</p>}


                </div>

                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5 "}>
                        <label>Name En</label>
                        <Input
                            id={"nameEn"}
                            name={"nameEn"}
                            value={formik.values.nameEn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        {formik.errors.nameEn && formik.touched.nameEn &&
                            <p className={"text-red-600"}>{formik.errors.nameEn}</p>}

                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Name Ar</label>
                        <Input
                            id={"nameAr"}
                            name={"nameAr"}
                            value={formik.values.nameAr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.nameAr && formik.touched.nameAr &&
                            <p className={"text-red-600"}>{formik.errors.nameAr}</p>}
                    </div>
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Description En</label>
                        <Input
                            id={"descriptionEn"}
                            name={"descriptionEn"}
                            value={formik.values.descriptionEn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.descriptionEn && formik.touched.descriptionEn &&
                            <p className={"text-red-600"}>{formik.errors.descriptionEn}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Description Ar</label>
                        <Input
                            id={"descriptionAr"}
                            name={"descriptionAr"}
                            value={formik.values.descriptionAr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.descriptionAr && formik.touched.descriptionAr &&
                            <p className={"text-red-600"}>{formik.errors.descriptionAr}</p>}
                    </div>
                </div>
                <div className={"flex-grow flex flex-col gap-0.5 "}>
                    <label>slug</label>
                    <Input
                        id={"slug"}
                        name={"slug"}
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.slug && formik.touched.slug &&
                        <p className={"text-red-600"}>{formik.errors.slug}</p>}
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Price USD</label>
                        <Input
                            id={"priceUSD"}
                            name={"priceUSD"}
                            value={formik.values.priceUSD}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.priceUSD && formik.touched.priceUSD &&
                            <p className={"text-red-600"}>{formik.errors.priceUSD}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Price EGP</label>
                        <Input
                            id={"priceEGP"}
                            name={"priceEGP"}
                            value={formik.values.priceEGP}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.priceEGP && formik.touched.priceEGP &&
                            <p className={"text-red-600"}>{formik.errors.priceEGP}</p>}
                    </div>
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Discounted Price USD</label>
                        <Input
                            id={"discountedPriceUSD"}
                            name={"discountedPriceUSD"}
                            value={formik.values.discountedPriceUSD}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.discountedPriceUSD && formik.touched.discountedPriceUSD &&
                            <p className={"text-red-600"}>{formik.errors.discountedPriceUSD}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Discounted Price EGP</label>
                        <Input
                            id={"discountedPriceEGP"}
                            name={"discountedPriceEGP"}
                            value={formik.values.discountedPriceEGP}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.discountedPriceEGP && formik.touched.discountedPriceEGP &&
                            <p className={"text-red-600"}>{formik.errors.discountedPriceEGP}</p>}
                    </div>
                </div>
                <div className={"flex-grow flex flex-col gap-0.5 "}>
                    <label>period</label>
                    <Input
                        id={"period"}
                        name={"period"}
                        value={formik.values.period}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.errors.period && formik.touched.period &&
                        <p className={"text-red-600"}>{formik.errors.period}</p>}
                </div>
                <div className={"flex items-center gap-2"}>
                    <div>

                        <Input
                            className={"bg-amber-400 flex-shrink"}
                            type={"checkbox"}
                            id={"isDeleted"}
                            name={"isDeleted"}
                            onChange={formik.handleChange}
                            checked={formik.values.isDeleted}
                        />
                        {formik.errors.isDeleted && formik.touched.isDeleted &&
                            <p className={"text-red-600"}>{formik.errors.isDeleted}</p>}
                    </div>
                    <label htmlFor={"isDeleted"}>is published</label>
                </div>

            </div>
            <Button type={"submit"} className='space-x-1 w-fit mt-4'
            >
                <span> Submit</span>
            </Button>

        </form>
    )

};

export default CreateExam;