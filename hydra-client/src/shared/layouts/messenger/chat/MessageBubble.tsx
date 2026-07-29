type Props = {
    message: string;
    time: string;
    isMine: boolean;
};

export function MessageBubble({
    message,
    time,
    isMine,
}: Props) {
    return (
        <div
            className={`
                flex
                ${isMine ? "justify-end" : "justify-start"}
            `}
        >
            <div
                className={`
                    max-w-sm
                    rounded-2xl
                    px-4
                    py-3

                    ${
                        isMine
                            ? "bg-[#7B3FFF] text-white"
                            : "bg-white/10 text-zinc-100"
                    }
                `}
            >
                <p className="text-sm leading-relaxed">
                    {message}
                </p>

                <div
                    className={`
                        mt-1
                        text-[11px]

                        ${
                            isMine
                                ? "text-white/60"
                                : "text-zinc-500"
                        }
                    `}
                >
                    {time}
                </div>
            </div>
        </div>
    );
}