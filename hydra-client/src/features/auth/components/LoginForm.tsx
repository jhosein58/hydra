"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, LoginSchema } from "../schemas/login.schema";
import Link from "next/link";

import { User2, Lock, Eye, EyeClosed } from "lucide-react";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const [isHide, setIsHide] = useState<boolean>(true);
  const { mutateAsync, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await mutateAsync(data);

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <User2 size={18} className="text-muted-foreground" />

          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
        </div>

        <input
          {...register("username")}
          className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition-colors focus:border-primary"
          placeholder="Enter username"
          id="username"
        />

        <p className="mt-2 min-h-4 text-xs indent-1 text-red-400">
          {errors.username?.message}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Lock size={18} className="text-muted-foreground" />

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
        </div>

        <div className="flex items-center h-11 rounded-xl border border-border bg-background px-4 transition-colors focus-within:border-primary">
          <input
            type={isHide ? "password" : "text"}
            {...register("password")}
            className=" w-full  outline-none"
            placeholder="Enter password"
            id="password"
          />

          <button
            type="button"
            className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => setIsHide((val) => !val)}
            tabIndex={-1}
          >
            {isHide ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        </div>

        <p className="mt-2 min-h-4 text-xs indent-1 text-red-400">
          {errors.password?.message}
        </p>
      </div>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={!isValid || isPending}
        className="h-11 w-full rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Log In..." : "Log In"}
      </button>
    </form>
  );
}
