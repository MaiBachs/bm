import React from "react";
import Input from "../component/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosUnprocessableEntityError } from "../utils/utils";

import Button from "../component/Button";
import { schema } from "../utils/Rules";
const loginSchema = schema.pick(["userName", "password"]);
export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const loginAccountMutation = useMutation(authApi.loginAccount);

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key, {
                message: formError[key],
                type: "Server",
              });
            });
          }
        }
      },
    });
  });
  return (
    <div className="bg-green-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>
              <Input
                name="userName"
                type="userName"
                className="mt-8"
                placeholder="userName"
                register={register}
                errorMessage={errors.userName?.message}
              />
              <Input
                name="password"
                type="password"
                className="mt-2"
                classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
                placeholder="Password"
                autoComplete="on"
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className="mt-2">
                <Button
                  type="submit"
                  className="flex w-full items-center justify-center bg-green-500 py-4 px-2 text-sm uppercase text-white hover:bg-green-600"
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.disabled}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="flex justify-center mx-3 mt-2">
                <span className="text-gray-400 capitalize ">
                  {" "}
                  Bạn đã có tài khoản chưa ?{" "}
                </span>
                <Link className="ml-1 text-red-500" to="/register">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
