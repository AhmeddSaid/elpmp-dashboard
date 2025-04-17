import * as yup from "yup";
import {ExamValuesType} from "@/features/CreateExam/CreateExam";


export const createExamInitialValues: ExamValuesType = {
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    slug: "",
    image: "",
    priceUSD: "",
    priceEGP: "",
    discountedPriceUSD: "",
    discountedPriceEGP: "",
    period: "",
    isDeleted: true,
};

const PriceValidationSchema = yup
    .number()
    .positive("Price must be positive")
    .min(0.01, "Price must be greater than or equal to 0.01"
    )
    .max(1000000, "Price must be less than or equal to 1,000,000"
    )
    .required("Please enter price");

export const createExamValidationSchema = yup
    .object()
    .shape({
        nameEn: yup
            .string()
            .trim()
            .min(3, "Min 3 characters")
            .max(1024, "max 1024 characters")
            .matches(/^[a-zA-Z0-9\s-'.]+$/, "Exam's name must contain only English letters"
            )
            .required("Exam's name is required"),
        nameAr: yup
            .string()
            .trim()
            .min(3)
            .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, "Exam's name must contain only Arabic letters",
            )
            .required("اسم الامتحان مطلوب"),
        descriptionEn: yup
            .string
            ()
            .trim()
            .min(3, "Min 3 characters")
            .max(1024, "max 1024 characters")
            .matches(/^[a-zA-Z0-9\s-'.]+$/, "Description must contain only English letters")
            .required("Description is required"),
        descriptionAr:
            yup
                .string()
                .trim("يجب ألا يحتوي الوصف على مسافات بادئة أو لاحقة")
                .min(3)
                .matches(/^(?!^\d+$)(?!^[\u0660-\u0669]+$)(?!^\s+$)(?!.[\u0620\uFEFF\n\r\t\u00A0\u2003])(?=.{2,})(?=.[\u0600-\u06FF])(?:(?=.*[0-9\u0660-\u0669\s])|)^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF0-9\u0660-\u0669\s،؟]+$/, "Description name must contain only Arabic letters")
                .required("الوصف مطلوب"),
        isDeleted:
            yup.boolean().default(false).notRequired(),
        slug:
            yup
                .string()
                .trim()
                .required("Slug is required")
                .min(3, "Minimum 3 characters")
                .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores, and hyphens are allowed"),
        image:
            yup.string().trim().required("Image is required"),
        priceUSD:
        PriceValidationSchema,
        priceEGP:
        PriceValidationSchema,
        discountedPriceUSD:
        PriceValidationSchema,
        discountedPriceEGP:
        PriceValidationSchema,
        period:
            yup.number().integer().positive().min(1).notRequired(),
    })
    .noUnknown(true, {noExtensions: true, message: "Unknown field"})
    .strict(true);