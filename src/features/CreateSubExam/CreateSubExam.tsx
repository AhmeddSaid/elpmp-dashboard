"use client"
import React from 'react';
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import {Button} from "@/components/ui/button";
import * as yup from "yup";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const CreateSubExam = () => {
    const subExamType = {
        FULLEXAMS: "FULLEXAMS",
        DOMAIN: "DOMAIN",
        KNOWLEDGEAREA: "KNOWLEDGEAREA",
        PMI: "PMI",
        OTHER: "OTHER",
    } as const;


    const validationSchema = yup
        .object()
        .shape({
            nameEn: yup
                .string()
                .trim()
                .min(3, "Min 3 characters")
                .max(1024, "max 1024 characters")
                .matches(/^[a-zA-Z0-9\s-'.]+$/, "Sub Exam's name must contain only English letters")
                .required("SubExam's name is required"),
            nameAr: yup
                .string()
                .trim()
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, "Sub Exam's name must contain only Arabic letters")
                .required("اسم الامتحان مطلوب"),
            descriptionEn: yup
                .string()
                .trim()
                .min(3, "Min 3 characters")
                .max(1024, "max 1024 characters")
                .matches(/^[a-zA-Z0-9\s-'.]+$/, "Description must contain only English letters")
                .required("Description is required"),
            descriptionAr: yup
                .string()
                .trim("يجب ألا يحتوي الوصف على مسافات بادئة أو لاحقة")
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, "Description name must contain only Arabic letters")
                .required("الوصف مطلوب"),
            isDeleted: yup.boolean().default(false).notRequired(),
            slug: yup
                .string()
                .trim()
                .required("slug is required")
                .min(3, "Minimum 3 characters")
                .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, and hyphens are allowed"),
            subExamType: yup.string().trim().oneOf(Object.values(subExamType)).required("subExamType is required"),
            exam: yup.string().trim().required("exam is required"),
            tag: yup.string().trim().required("tag is required"),
            durationPerQuestion: yup.number().required("durationPerQuestion is required"),
            patsh: yup.string().notRequired(),
        })
        .noUnknown(true, {noExtensions: true, message: "Unknown field"})
        .strict(true);

    const initialValues = {
        nameEn: "",
        nameAr: "",
        descriptionEn: "",
        descriptionAr: "",
        slug: "",
        subExamType: "",
        exam: "",
        tag: "",
        passingScore: "",
        durationPerQuestion: "",
        patsh: "",
        isDeleted: false
    }

    async function handleForm(values: {
        nameEn: string,
        nameAr: string,
        descriptionEn: string,
        descriptionAr: string,
        slug: string,
        subExamType: string,
        exam: string,
        tag: string,
        passingScore: string,
        durationPerQuestion: string,
        patsh: string,
        isDeleted: boolean
    }) {
        console.log(values)
        // const res = await createSubExamAction(values)
    }

    const formik = useFormik({
            initialValues,
            validationSchema,
            onSubmit: handleForm
        }
    )


    return (
        <>
            <form onSubmit={formik.handleSubmit} className={"w-2/3 flex flex-col gap-y-4"}>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5 "}>
                        <label>NameEn</label>
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
                        <label>NameAr</label>
                        <Input name={"nameAr"}
                               id={"nameAr"}
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
                        <label>DescriptionEn</label>
                        <Input id={"descriptionEn"}
                               name={"descriptionEn"}
                               value={formik.values.descriptionEn}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                        />
                        {formik.errors.descriptionEn && formik.touched.descriptionEn &&
                            <p className={"text-red-600"}>{formik.errors.descriptionEn}</p>}

                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>DescriptionAr</label>
                        <Input
                            name={"descriptionAr"}
                            id={"descriptionAr"}
                            value={formik.values.descriptionAr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.descriptionAr && formik.touched.descriptionAr &&
                            <p className={"text-red-600"}>{formik.errors.descriptionAr}</p>}
                    </div>
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Slug</label>
                        <Input
                            name={"slug"}
                            id={"slug"}
                            value={formik.values.slug}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.slug && formik.touched.slug &&
                            <p className={"text-red-600"}>{formik.errors.slug}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>SubExam Type</label>
                        <Input
                            name={"subExamType"}
                            id={"subExamType"}
                            value={formik.values.subExamType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.subExamType && formik.touched.subExamType &&
                            <p className={"text-red-600"}>{formik.errors.subExamType}</p>}
                    </div>
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Exam</label>
                        <Input
                            name={"exam"}
                            id={"exam"}
                            value={formik.values.exam}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.exam && formik.touched.exam &&
                            <p className={"text-red-600"}>{formik.errors.exam}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Tag</label>
                        <Input
                            name={"tag"}
                            id={"tag"}
                            value={formik.values.tag}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.tag && formik.touched.tag &&
                            <p className={"text-red-600"}>{formik.errors.tag}</p>}
                    </div>
                </div>
                <div className={"flex w-full  gap-3"}>

                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Passing Score</label>
                        <Input
                            name={"passingScore"}
                            id={"passingScore"}
                            value={formik.values.passingScore}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.passingScore && formik.touched.passingScore &&
                            <p className={"text-red-600"}>{formik.errors.passingScore}</p>}
                    </div>
                    <div className={"flex-grow flex flex-col gap-0.5"}>
                        <label>Duration Per Question</label>
                        <Input
                            name={"durationPerQuestion"}
                            id={"durationPerQuestion"}
                            value={formik.values.durationPerQuestion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.durationPerQuestion && formik.touched.durationPerQuestion &&
                            <p className={"text-red-600"}>{formik.errors.durationPerQuestion}</p>}
                    </div>

                </div>
                <div>
                    <label htmlFor="correctAnswersCount">Type</label>

                    <Select onValueChange={formik.handleChange}>
                        {/* Trigger button (button that opens the select dropdown) */}
                        <SelectTrigger>
                            <SelectValue placeholder="Select an option"/>
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="SINGLE">SINGLE</SelectItem>
                            <SelectItem value="MATCH">MATCH</SelectItem>
                            <SelectItem value="MULTIPLECHOICE">MULTIPLECHOICE</SelectItem>


                        </SelectContent>
                    </Select>
                    {formik.errors.subExamType && formik.touched.subExamType &&
                        <p className={"text-red-600"}>{formik.errors.subExamType}</p>}
                </div>

                <Button type={"submit"} className='space-x-1 w-fit'
                >
                    <span> Submit</span>
                </Button>
            </form>
        </>

    );
};

export default CreateSubExam;