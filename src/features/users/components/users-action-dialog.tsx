"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addStudent } from "@/app/(authed)/users/actions";
import { log } from "console";

interface Exam {
  id: string;
  nameEn: string;
}

interface Props {
  exams: Exam[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ exams, open, onOpenChange }: Props) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    exam: "",
    isActivate: false,
    ActiveUntil: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    exam: Yup.string().required("Exam selection is required"),
    isActivate: Yup.boolean(),
    ActiveUntil: Yup.lazy((value, context) => {
      const isActivate = context.parent.isActivate;
      return isActivate 
        ? Yup.date().required("Active Until is required") 
        : Yup.date().notRequired();
    }),
  });

  const onSubmit = async (values: any, { resetForm }: any) => {
    // If not activated, clear the ActiveUntil value
    if (!values.isActivate) {
      values.ActiveUntil = null;
    }

    toast({
      title: "User Details",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    try {
      onOpenChange(false);
      resetForm();
      const res = await addStudent(values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create new user here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, handleChange, handleBlur }) => (
              <Form className="space-y-4 p-0.5">
                <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <label className="col-span-2 text-right">First Name</label>
                  <div className="col-span-4">
                    <Field
                      name="firstName"
                      placeholder="John"
                      as={Input}
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <label className="col-span-2 text-right">Last Name</label>
                  <div className="col-span-4">
                    <Field
                      name="lastName"
                      placeholder="Doe"
                      as={Input}
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <label className="col-span-2 text-right">Email</label>
                  <div className="col-span-4">
                    <Field
                      name="email"
                      placeholder="john.doe@gmail.com"
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <label className="col-span-2 text-right">Enroll</label>
                  <div className="col-span-4">
                    <Field
                      as="select"
                      name="exam"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="">Select an Exam</option>
                      {exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                          {exam.nameEn}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="exam"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                  <label className="col-span-2 text-right">Active</label>
                  <div className="col-span-4">
                    <Field
                      type="checkbox"
                      name="isActivate"
                      id="isActivate"
                      className="cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const isChecked = e.target.checked;
                        setFieldValue('isActivate', isChecked);
                        if (!isChecked) {
                          setFieldValue('ActiveUntil', '');
                        }
                      }}
                    />
                  </div>
                </div>

                {values.isActivate && (
                  <div className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <label className="col-span-2 text-right">
                      Active Until
                    </label>
                    <div className="col-span-4">
                      <Field
                        type="date"
                        name="ActiveUntil"
                        id="ActiveUntil"
                        className="cursor-pointer"
                      />
                      <ErrorMessage
                        name="ActiveUntil"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                )}

                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}