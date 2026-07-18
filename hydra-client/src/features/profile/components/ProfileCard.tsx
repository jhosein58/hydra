export function ProfileCard() {
  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-xl">
      <div className="flex flex-col items-center">
        <button className="group relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border bg-secondary">
            <span className="text-4xl font-semibold">A</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium">
              تغییر عکس
            </span>
          </div>
        </button>

        <h1 className="mt-5 text-2xl font-bold">
          Alireza has
        </h1>

        <p className="mt-1 text-muted-foreground">
          @flatrov
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Display Name
          </label>

          <input
            className="h-12 w-full rounded-xl border border-border bg-secondary px-4 outline-none transition focus:border-primary"
            placeholder="Display name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Username
          </label>

          <div className="flex h-12 items-center rounded-xl border border-border bg-secondary px-4 focus-within:border-primary">
            <span className="mr-2 text-muted-foreground">
              @
            </span>

            <input
              className="h-full flex-1 bg-transparent outline-none"
              placeholder="username"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Bio
          </label>

          <textarea
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-secondary p-4 outline-none transition focus:border-primary"
            placeholder="Write something about yourself..."
          />
        </div>

        <button
          className="mt-4 h-12 w-full rounded-xl bg-primary font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}