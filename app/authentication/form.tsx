"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { useCreateUser, useLogin } from "../hooks/api/useUserApi";
import { useFormik } from "formik";
import { PropsWithChildren, useState } from "react";
import { pick } from "ramda";
import clsx from "clsx";
import {
  LoginSchema,
  SignupSchema,
  AUTHENTICATION_FORM_INITIAL_VALUES,
} from "./constants";
import { isEmpty } from "class-validator";
import { GraphQLError } from "graphql";
import { redirect, useRouter } from "next/navigation";
import useAuthenticate from "../hooks/useAuthenticate";
import routes from "../routes";

const Form: React.FC<PropsWithChildren> = ({ className, ...props }: any) => {
  const { mutate: createUser, isLoading: isCreatingUser } = useCreateUser();
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const [errors, setErrors] = useState<Array<GraphQLError>>([]);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const router = useRouter();

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
          { onSuccess: () => setIsSignup(false) }
        );
        return;
      }
      login(
        { input: pick(["email", "password"], values) },
        {
          onSuccess: (res) => {
            if (res.login) router.push(routes.dashboard);
          },
          onError: (error: any) => setErrors(error.response.errors),
        }
      );
    },
  });

  const isSubmitting = isCreatingUser || isLoggingIn;

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          <a
            className={clsx("cursor-pointer", {
              "text-gray-500": isSignup,
              "text-black": !isSignup,
            })}
            onClick={() => setIsSignup((isSignup) => !isSignup)}
          >
            Login{" "}
          </a>
          /{" "}
          <a
            className={clsx("cursor-pointer", {
              "text-black": isSignup,
              "text-gray-500": !isSignup,
            })}
            onClick={() => setIsSignup((isSignup) => !isSignup)}
          >
            Create an account
          </a>
        </h1>
        {isSignup && (
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        )}
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-2">
            {isSignup && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Mohit Harshan"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isSubmitting}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <span className="text-xs text-red-500">
                    {formik.errors.name}
                  </span>
                )}
              </div>
            )}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isSubmitting}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="*********"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isSubmitting}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <span className="text-xs text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>
            {!isEmpty(errors) &&
              errors.map((error: GraphQLError) => (
                <span className="text-xs text-red-500">{error.message}</span>
              ))}
            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSignup ? "Sign Up with Email" : "Get started"}
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          Github
        </Button>
      </div>
    </>
  );
};

export default Form;
