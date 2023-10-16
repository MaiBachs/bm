import * as yup from "yup";

const handleConfirmPasswordYup = (refString) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};

export const schema = yup.object({
  userName: yup
    .string()
    .required("userName là bắt buộc")

    .min(5, "Độ dài từ 5 - 160 ký tự")
    .max(160, "Độ dài từ 5 - 160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự"),
  confirm_password: handleConfirmPasswordYup("password"),
});

export const getRules = (getValues) => ({
  userName: {
    required: {
      value: true,
      message: "userName là bắt buộc",
    },

    maxLength: {
      value: 160,
      message: "Độ dài từ 5 - 160 ký tự",
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5 - 160 ký tự",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    validate:
      typeof getValues === "function"
        ? (value) =>
            value === getValues("password") || "Nhập lại password không khớp"
        : undefined,
  },
});

export const rules = getRules();
