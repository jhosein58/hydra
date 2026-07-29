export default function DefaultMessengerPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="relative mb-4 text-5xl">
          <div
            className="top-0 left-1/2 -translate-x-1/2
        absolute
        h-40
        w-40
        rounded-full
        bg-[#7B3FFF]/20
        blur-3xl
    "
          />
          ◈
        </div>

        <h2 className="text-lg font-semibold text-white">Welcome to Haydra</h2>

        <p className="mt-2 text-sm text-zinc-500">
          Select a conversation to start messaging
        </p>
      </div>
    </div>
  );
}
