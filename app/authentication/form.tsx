"use client";

import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";

import { useCreateUser, useLogin } from "../hooks/api/useUserApi";
import { useFormik } from "formik";
import { PropsWithChildren, useEffect, useState } from "react";
//@ts-ignore
import { pick } from "ramda";
import clsx from "clsx";
import {
  LoginSchema,
  SignupSchema,
  AUTHENTICATION_FORM_INITIAL_VALUES,
} from "./constants";
import { isEmpty } from "class-validator";
import { GraphQLError } from "graphql";
import { useRouter } from "next/navigation";
import routes from "../routes";

const Form: React.FC<PropsWithChildren> = ({ className, ...props }: any) => {
  const { mutate: createUser, isLoading: isCreatingUser } = useCreateUser();
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const [errors, setErrors] = useState<Array<GraphQLError>>([]);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => setErrors([]), [isSignup]);

  const formik = useFormik({
    initialValues: AUTHENTICATION_FORM_INITIAL_VALUES,
    validationSchema: isSignup ? SignupSchema : LoginSchema,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (isSignup) {
        createUser(
          { input: { ...values } },
          {
            onSuccess: () => setIsSignup(false),
            onError: (error: any) => setErrors(error.response.errors),
          },
        );
        return;
      }
      login(
        { input: pick(["email", "password"], values) },
        {
          onSuccess: (res) => {
            if (res.login) router.push(routes.dashboard.menu);
          },
          onError: (error: any) => setErrors(error.response.errors),
        },
      );
    },
  });

  const isSubmitting = isCreatingUser || isLoggingIn;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex flex-row w-screen space-x-2">
          <Typography
            variant="h3"
            className={clsx("cursor-pointer", {
              "text-gray-500": isSignup,
              "text-black": !isSignup,
            })}
            onClick={() => setIsSignup((isSignup) => !isSignup)}
          >
            Login{" "}
          </Typography>
          <Typography variant="h3">/</Typography>
          <Typography
            variant="h3"
            className={clsx("cursor-pointer", {
              "text-black": isSignup,
              "text-gray-500": !isSignup,
            })}
            onClick={() => setIsSignup((isSignup) => !isSignup)}
          >
            Create an account
          </Typography>
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-2">
            {isSignup && (
              <div className="grid gap-1">
                <Input
                  id="restaurantName"
                  label="Restaurant Name"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  value={formik.values.restaurantName}
                  onChange={formik.handleChange}
                />
                {formik.errors.restaurantName && (
                  <Typography variant="small" color="red">
                    {formik.errors.restaurantName}
                  </Typography>
                )}
              </div>
            )}
            <div className="grid gap-1">
              <Input
                label="Email"
                id="email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isSubmitting}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <Typography variant="small" color="red">
                  {formik.errors.email}
                </Typography>
              )}
            </div>
            <Input
              label="Password"
              id="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isSubmitting}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <Typography variant="small" color="red">
                {formik.errors.password}
              </Typography>
            )}
            {!isEmpty(errors) &&
              errors.map((error: GraphQLError) => (
                <Typography variant="small" color="red">{error.message}</Typography>
              ))}
            <Button disabled={isSubmitting} className="rounded-xl flex flex-row items-center space-x-4 justify-center" type="submit">
              {isSignup ? "Sign Up with Email" : "Get started"}
              {isSubmitting && <Spinner className="w-4 ml-4" />}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
