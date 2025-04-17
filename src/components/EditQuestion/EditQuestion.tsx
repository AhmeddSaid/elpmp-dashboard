"use client";
import React, {useCallback} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {FieldArray, Form, Formik, FormikHelpers} from "formik";

interface Answer {
    answerEn: string;
    answerAr: string;
    isCorrect?: boolean;
}

interface EditQuestionProps {
    id: string;
    data: {
        questionEn: string;
        questionAr: string;
        correctAnswersCount: number;
        explanationEn: string;
        explanationAr: string;
        reference: string;
    };
    answersData: Answer[];
}

const EditQuestion: React.FC<EditQuestionProps> = ({id, data, answersData}) => {
    const initialValues = {
        questionEn: data.questionEn,
        questionAr: data.questionAr,
        correctAnswersCount: data.correctAnswersCount,
        explanationEn: data.explanationEn,
        explanationAr: data.explanationAr,
        image: "",
        reference: data.reference,
        answers: answersData.map(answer => ({...answer, isCorrect: answer.isCorrect || false}))
    };

    const handleSubmit = useCallback(
        (formValues: typeof initialValues, actions: FormikHelpers<typeof initialValues>) => {
            console.log(formValues, "data");
            // EditQuestion(formValues, id);
            actions.setSubmitting(false);
        },
        []
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-y-4">
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
                        </div>
                    </div>

                    <div className="flex w-full gap-3">
                        <div className="flex-grow">
                            <label htmlFor="explanationEn">Explanation En</label>
                            <Textarea
                                id="explanationEn"
                                name="explanationEn"
                                value={values.explanationEn}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Explanation In English"
                            />
                        </div>
                        <div className="flex-grow h-3">
                            <label htmlFor="explanationAr">Explanation Ar</label>
                            <Textarea

                                name="explanationAr"
                                id="explanationAr"
                                value={values.explanationAr}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Explanation In Arabic"
                            />
                        </div>
                    </div>

                    <div className="flex w-full gap-3">
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
                        <div className="flex-grow">
                            <label htmlFor="correctAnswersCount">Number of Correct Answer</label>
                            <Input
                                name="correctAnswersCount"
                                id="correctAnswersCount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.correctAnswersCount}
                                placeholder="Enter Number Of correct answer"
                                type="number"
                            />
                        </div>
                    </div>

                    <div>
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

                    <FieldArray name="answers">
                        {() => (
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
                                                value={answer.answerEn}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <label htmlFor={`answers[${index}].answerAr`}>Enter answer in Arabic</label>
                                            <Input
                                                type="text"
                                                name={`answers[${index}].answerAr`}
                                                id={`answers[${index}].answerAr`}
                                                value={answer.answerAr}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="checkbox"
                                                name={`answers[${index}].isCorrect`}
                                                checked={answer.isCorrect || false}
                                                onChange={(event) => {
                                                    setFieldValue(`answers[${index}].isCorrect`, event.target.checked);
                                                }}
                                            />
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
    );
};

export default EditQuestion;
