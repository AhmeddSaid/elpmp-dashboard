"use client"
import React, {Fragment, useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CirclePlus, Trash2} from "lucide-react";
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import makeAnimated from 'react-select/animated';
import 'react-dropdown/style.css';
import Select from "react-select";

const CreateQuestion = ({data}: { data: [] }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTypeOption, setSelectedTypeOption] = useState(null);
    // console.log(selectedTypeOption?.value,"555")

    let valuesOfSelectTag;
    if (selectedOption !== null) {
        valuesOfSelectTag = selectedOption.map((item) => item.value);
    }
    const animatedComponents = makeAnimated();
    const initialValues = {
        questionEn: "",
        questionAr: "",
        type: "",
        correctAnswersCount: "",
        explanationEn: "",
        explanationAr: "",
        image: "",
        reference: "",
        answers: [{
            answerEn: "",
            answerAr: "",
            isCorrect: false
        }],
        tags: []
    };

    const createAnswer = Yup
        .object()
        .shape({
            answerEn: Yup
                .string()
                .trim("Answer must not contain leading or trailing spaces")
                .min(3, "Min 3 characters")
                .max(1024, "max 1024 characters")
                .matches(/^[a-zA-Z0-9\s-'.]+$/, {
                    message: "Enter a valid answer",
                })
                .required("Answer is required"),
            answerAr: Yup
                .string()
                .trim("يجب ألا يحتوي الاجابة على مسافات بادئة أو لاحقة")
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, {
                    message: "Enter a valid answer",
                })
                .required("الاجابة مطلوب"),
            isCorrect: Yup.boolean().default(false).required(),
            isDeleted: Yup.boolean().default(false).notRequired(),
            patsh: Yup.string().notRequired(),
        })
        .noUnknown(true, {noExtensions: true, message: "Unknown field"})
        .strict(true);


    const QuestionTypes = {
        MULTIPLE_CHOICE: "MULTIPLECHOICE",
        MATCH: "MATCH",
        SINGLE: "SINGLE",
    } as const;

    const validationSchema = Yup
        .object()
        .shape({
            answers: Yup.array().of(createAnswer),
            questionEn: Yup
                .string()
                .trim("Question must not contain leading or trailing spaces")
                .min(3, "Min 3 characters")
                .max(1024, "max 1024 characters")
                .matches(/^[a-zA-Z0-9\s-'.]+$/, {
                    message: "Question must contain only English letters"
                    // ar: "السؤال يجب أن يحتوي على أحرف انجليزية فقط",

                })
                .required("Question is required"),
            questionAr: Yup
                .string()
                .trim("يجب ألا يحتوي السؤال على مسافات بادئة أو لاحقة")
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, {
                    message: "Question must contain only Arabic letters"
                })
                .required("السؤال مطلوب"),
            explanationAr: Yup
                .string()
                .trim("يجب ألا يحتوي  على مسافات بادئة أو لاحقة")
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, {
                    message: "Explanation must contain only Arabic letters"
                }),
            explanationEn: Yup
                .string()
                .trim("Explanation must not contain leading or trailing spaces")
                .min(3, "Min 3 characters")
                .max(1024, "max 1024 characters")
                .matches(/^[a-zA-Z0-9\s-'.]+$/, {
                    message: "Explanation must contain only English letters"
                }),
            reference: Yup.string().notRequired(),
            correctAnswersCount: Yup.number().positive().integer().min(1).required(),
            type: Yup.string().oneOf(Object.values(QuestionTypes)).default("SINGLE"),
            isDeleted: Yup.boolean().default(false).notRequired(),
            tags: Yup
                .array()
                .of(Yup.string())
                .required({en: "Tags are required", ar: "برجاء ادخال العلامات"}),
            patsh: Yup.string().notRequired(),
        })
        .noUnknown(true, {
            noExtensions: true,
            message: {en: "Unknown field found", ar: "يوجد حقل غير معروف"},
        })
        .strict(true);


    function handleSubmitForm(formValues) {
        // AddQuestion(formValues)
        const numberOfCorrectAnswers: number = formValues.answers.filter((item) => item.isCorrect).length;
        formValues.correctAnswersCount = numberOfCorrectAnswers;

        const payLoad = {
            ...formValues,
            type: selectedTypeOption?.value,
            correctAnswersCount: numberOfCorrectAnswers,
            tags: valuesOfSelectTag
        };

        console.log(payLoad, "payLoad")
    }


    const options = [
        {value: 'SINGLE', label: 'SINGLE'},
        {value: 'MATCH', label: 'MATCH'},
        {value: 'MULTIBLECHOISE', label: 'MULTIBLECHOISE'}
    ]


    const TagSelect =

        data?.map((item) => (
            {value: item.id, label: item.nameEn}
        ))


    return (
        <>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                // validationSchema={validationSchema}
                enableReinitialize
            >
                {({values, handleChange, handleBlur, setFieldValue, errors}) => (
                    <Form className="w-2/3 flex flex-col gap-y-4">
                        <div className="flex w-full gap-3">
                            <div className="flex-grow">
                                <label htmlFor="questionEn">NameEn</label>
                                <Input
                                    id="questionEn"
                                    name="questionEn"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.questionEn}
                                    placeholder="Enter Question Name"
                                />
                                <ErrorMessage
                                    name="questionEn"
                                    component="div"
                                    className="text-red-500"
                                />

                            </div>
                            <div className="flex-grow">
                                <label htmlFor="questionAr">NameAr</label>
                                <Input
                                    name="questionAr"
                                    id="questionAr"
                                    value={values.questionAr}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Question in Arabic"
                                />

                                <ErrorMessage
                                    name="questionAr"
                                    component="div"
                                    className="text-red-500"
                                />


                            </div>
                        </div>

                        <div className="flex w-full gap-3">
                            <div className="flex-grow w-1/2">
                                <label htmlFor="explanationEn">Explanation En</label>
                                <Textarea
                                    id="explanationEn"
                                    name="explanationEn"
                                    value={values.explanationEn}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Explanation In English"
                                />


                                <ErrorMessage
                                    name="explanationEn"
                                    component="div"
                                    className="text-red-500 w-fit"
                                />
                            </div>
                            <div className="flex-grow h-3 w-1/2">
                                <label htmlFor="explanationAr">Explanation Ar</label>
                                <Textarea

                                    name="explanationAr"
                                    id="explanationAr"
                                    value={values.explanationAr}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Explanation In Arabic"
                                />


                                <ErrorMessage
                                    name="explanationAr"
                                    component="div"
                                    className="text-red-500 w-fit"
                                />


                            </div>
                        </div>

                        <div className="flex w-full gap-3">


                            <div className={"flex-grow w-3/4"}>

                                <label htmlFor="tagId">tag</label>

                                <Select
                                    id={"tagId"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={setSelectedOption}
                                    isMulti
                                    options={TagSelect}
                                    name={"tags"}
                                />

                                <ErrorMessage
                                    name="tags"
                                    component="div"
                                    className="text-red-500 w-fit"
                                />

                            </div>


                            <div className="flex-grow w-1/4">
                                <label htmlFor="correctAnswersCount">Type</label>

                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    options={options}
                                    name={"type"}
                                    // defaultValue={[options[4], options[2]]}
                                    // name={"type"}
                                    // value={values.type}
                                    // onBlur={handleBlur}
                                    onChange={setSelectedTypeOption}
                                    // styles={colourStyles}
                                />
                                <ErrorMessage
                                    name="type"
                                    component="div"
                                    className="text-red-500 w-fit"
                                />

                            </div>
                        </div>

                        <div className={"flex"}>
                            <div className={"flex-grow"}>

                                <label htmlFor="image">Image</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    id="image"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0];
                                        setFieldValue("image", file || "");
                                    }}
                                    onBlur={handleBlur}
                                    placeholder="Upload Image"
                                />


                            </div>

                            <div className="flex-grow">
                                <label htmlFor="reference">Reference</label>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.reference}
                                    id="reference"
                                    name="reference"
                                    placeholder="Enter Reference"
                                />
                            </div>


                        </div>

                        <FieldArray name="answers">
                            {({push, remove}) => (
                                <>
                                    {values.answers.map((answer, index) => (

                                        <div key={index} className="flex w-full gap-3">
                                            <div className="flex-grow">
                                                <label htmlFor={`answers[${index}].answerEn`}>Enter answer in
                                                    English</label>
                                                <Input
                                                    type="text"
                                                    name={`answers[${index}].answerEn`}
                                                    id={`answers[${index}].answerEn`}
                                                    value={answer.answerEn || ""}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />

                                                <ErrorMessage
                                                    name={`answers[${index}].answerEn`}
                                                    component="div"
                                                    className="text-red-500 w-fit"
                                                />


                                            </div>
                                            <div className="flex-grow">
                                                <label htmlFor={`answers[${index}].answerAr`}>Enter answer in
                                                    Arabic</label>
                                                <Input
                                                    type="text"
                                                    name={`answers[${index}].answerAr`}
                                                    id={`answers[${index}].answerAr`}
                                                    value={answer.answerAr || ""}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />

                                                <ErrorMessage
                                                    name={`answers[${index}].answerAr`}
                                                    component="div"
                                                    className="text-red-500 w-fit"
                                                />


                                            </div>
                                            <div>
                                                <Input
                                                    type={selectedTypeOption?.value === "SINGLE" ? "radio" : "checkbox"}
                                                    name={`answer`}
                                                    checked={answer.isCorrect || false}
                                                    onChange={(event) => {
                                                        setFieldValue(`answers[${index}].isCorrect`, event.target.checked);
                                                    }}
                                                />
                                            </div>

                                            <div className={"flex gap-2"}>
                                                <div onClick={() => push(index)}><CirclePlus size={32}/></div>
                                                <div onClick={() => remove(index)}><Trash2 size={32}/></div>


                                            </div>

                                        </div>
                                    ))}
                                </>
                            )}
                        </FieldArray>

                        <Button variant="default" className="h-8 px-2 lg:px-3 w-28" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>

        </>
    );
};

export default CreateQuestion;