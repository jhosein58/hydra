"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfile } from "../model/useUpdateProfile";
import {
  UserProfile,
  UserProfileSchema,
  useUserProfile,
} from "@/entities/user";

export function ProfileCard() {
  const { updateProfile } = useProfile();
  const {
    loading,
    profileData: { name, username, bio },
  } = useUserProfile();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(UserProfileSchema),
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-500">
        Loading profile...
      </div>
    );
  }

  const handler = (data: UserProfile) => {
    updateProfile(data);
  };

  return (
    <div className="flex min-w-3xl flex-col">
      <header className="border-b border-border px-10 py-7">
        <h1 className="text-3xl font-semibold text-foreground">Profile</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Customize how other users see you on Haydra.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handler)}
        className="grid flex-1 grid-cols-[240px_1fr] gap-12 px-10 py-8"
      >
        <aside className="flex flex-col items-center">
          <button type="button" className="group relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 group-hover:border-primary/60">
              <span className="text-4xl font-semibold text-foreground">
                {(name ?? "A").charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100">
              <span className="text-sm font-medium text-foreground">
                Change Photo
              </span>
            </div>
          </button>

          <h2 className="mt-6 text-xl font-semibold text-foreground">
            {name || "Display Name"}
          </h2>

          <p className="mt-1 text-sm text-primary">@{username || "username"}</p>

          <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

          <p className="mt-8 text-center text-sm leading-6 text-muted-foreground">
            Your username is how other people can find you on Haydra.
          </p>
        </aside>

        <section className="flex flex-col">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-muted-foreground"
              >
                Display Name
              </label>

              <input
                id="name"
                placeholder="Display name"
                defaultValue={name ?? undefined}
                {...register("name")}
                className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary"
              />

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-muted-foreground"
              >
                Username
              </label>

              <div className="flex h-12 items-center rounded-2xl border border-border bg-card px-4 transition focus-within:border-primary">
                <span className="mr-2 font-semibold text-primary">@</span>

                <input
                  id="username"
                  placeholder="username"
                  defaultValue={username ?? undefined}
                  {...register("username")}
                  className="h-full flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.username?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-muted-foreground"
              >
                Bio
              </label>

              <textarea
                id="bio"
                rows={4}
                placeholder="Write something about yourself..."
                defaultValue={bio ?? undefined}
                {...register("bio")}
                className="w-full resize-none rounded-2xl border border-border bg-card p-4 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary"
              />

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.bio?.message}
              </p>
            </div>
          </div>

          <div className="mt-auto flex justify-end pt-4">
            <button
              disabled={!isValid}
              className="h-12 rounded-2xl bg-linear-to-r from-primary to-primary-dark px-8 font-medium text-primary-foreground transition hover:shadow-[0_0_30px_rgba(123,63,255,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save Changes
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
