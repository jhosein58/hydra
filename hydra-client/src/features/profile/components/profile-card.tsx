"use client";

import { useForm } from "react-hook-form";
import { useProfile } from "../hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, ProfileSchema } from "../schema/profile.schema";

export function ProfileCard() {
  const {
    updateProfile,
    profileData: { name, username, bio },
    loading,
  } = useProfile();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
  });

  if (loading) return <p>is loading...</p>;

  const handler = (data: Profile) => {
    updateProfile(data);
  };

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-xl">
      <div className="flex flex-col items-center">
        <button className="group relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border bg-secondary">
            <span className="text-4xl font-semibold">A</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium">تغییر عکس</span>
          </div>
        </button>

        <h1 className="mt-5 text-2xl font-bold">{name || "defalt name"}</h1>

        <p className="mt-1 text-muted-foreground">
          {username || "defalt username"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handler)} className="mt-10 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm text-muted-foreground"
          >
            Display Name
          </label>

          <input
            className="h-12 w-full rounded-xl border border-border bg-secondary px-4 outline-none transition focus:border-primary"
            id="name"
            placeholder="Display name"
            defaultValue={name ?? undefined}
            {...register("name")}
          />

          <p className="h-4 mt-2 text-sm text-red-500">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm text-muted-foreground"
          >
            Username
          </label>

          <div className="flex h-12 items-center rounded-xl border border-border bg-secondary px-4 focus-within:border-primary">
            <span className="mr-2 text-muted-foreground">@</span>

            <input
              className="h-full flex-1 bg-transparent outline-none"
              placeholder="username"
              id="username"
              defaultValue={username ?? undefined}
              {...register("username")}
            />
          </div>

          <p className="h-4 mt-2 text-sm text-red-500">
            {errors.username?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm text-muted-foreground"
          >
            Bio
          </label>

          <textarea
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-secondary p-4 outline-none transition focus:border-primary"
            placeholder="Write something about yourself..."
            id="bio"
            defaultValue={bio ?? undefined}
            {...register("bio")}
          />

          <p className="h-4 mt-2 text-sm text-red-500">{errors.bio?.message}</p>
        </div>

        <button
          disabled={!isValid}
          className="mt-4 h-12 w-full rounded-xl bg-primary font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
