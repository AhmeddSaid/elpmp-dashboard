"use client";
import {loginAction} from "@/app/(auth)/auth/login/action";
import {PasswordInput} from "@/components/password-input";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {HTMLAttributes, useState} from "react";
import * as yup from "yup";
import {redirect} from "next/navigation";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

const LoginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Enter a valid email address.")
        .matches(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            "Enter a valid email address."
        )
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean().optional(),
});

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = async (
        values: typeof loginAction.arguments,
        {setSubmitting}: any
    ) => {
        setIsLoading(true);
        try {
            // console.log("Login values:", values);
            const {status} = await loginAction(values);
            console.log(status)
            if (status === 200) redirect("/");

            // console.log("Login response:", response);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="grid gap-2">
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    as={Input}
                                    placeholder="name@example.com"
                                    disabled={isLoading || isSubmitting}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-destructive"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </label>
                                    {/* <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-muted-foreground hover:opacity-75"
                  >
                    Forgot password?
                  </Link> */}
                                </div>
                                <Field
                                    name="password"
                                    as={PasswordInput}
                                    placeholder="********"
                                    disabled={isLoading || isSubmitting}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-destructive"
                                />
                            </div>

                            <Button
                                className="mt-2"
                                type="submit"
                                disabled={isLoading || isSubmitting}
                            >
                                Login
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
