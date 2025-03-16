import * as Yup from "yup";

export const authSchema = Yup.object({
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(/^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат номера"),
  otp: Yup.string()
    .required("Обязательное поле")
    .matches(/\d{2}-\d{2}-\d{2}$/, "Неверный формат кода"),
});
