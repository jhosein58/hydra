"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfile } from "../hooks/useProfile";
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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-500">
        Loading profile...
      </div>
    );
  }

  const handler = (data: Profile) => {
    updateProfile(data);
  };

  return (
    <div className="flex flex-col min-w-3xl">
      <header className="border-b border-white/10 px-10 py-7">
        <h1 className="text-3xl font-semibold text-white">Profile</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Customize how other users see you on Haydra.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(handler)}
        className="grid flex-1 grid-cols-[240px_1fr] gap-12 px-10 py-8"
      >
        <aside className="flex flex-col items-center">
          <button type="button" className="group relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#7B3FFF]/60">
              <span className="text-4xl font-semibold text-white">
                {(name ?? "A").charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100">
              <span className="text-sm font-medium text-white">
                Change Photo
              </span>
            </div>
          </button>

          <h2 className="mt-6 text-xl font-semibold text-white">
            {name || "Display Name"}
          </h2>

          <p className="mt-1 text-sm text-[#7B3FFF]">
            @{username || "username"}
          </p>

          <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <p className="mt-8 text-center text-sm leading-6 text-zinc-400">
            Your username is how other people can find you on Haydra.
          </p>
        </aside>

        <section className="flex flex-col">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-400"
              >
                Display Name
              </label>

              <input
                id="name"
                placeholder="Display name"
                defaultValue={name ?? undefined}
                {...register("name")}
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-[#7B3FFF]"
              />

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-zinc-400"
              >
                Username
              </label>

              <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-[#7B3FFF]">
                <span className="mr-2 font-semibold text-[#7B3FFF]">@</span>

                <input
                  id="username"
                  placeholder="username"
                  defaultValue={username ?? undefined}
                  {...register("username")}
                  className="h-full flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none"
                />
              </div>

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.username?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-zinc-400"
              >
                Bio
              </label>

              <textarea
                id="bio"
                rows={4}
                placeholder="Write something about yourself..."
                defaultValue={bio ?? undefined}
                {...register("bio")}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-[#7B3FFF]"
              />

              <p className="mt-2 h-4 text-sm text-red-400">
                {errors.bio?.message}
              </p>
            </div>
          </div>

          <div className="mt-auto flex justify-end pt-4">
            <button
              disabled={!isValid}
              className="h-12 rounded-2xl bg-linear-to-r from-[#7B3FFF] to-[#5D5FEF] px-8 font-medium text-white transition hover:shadow-[0_0_30px_rgba(123,63,255,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save Changes
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}