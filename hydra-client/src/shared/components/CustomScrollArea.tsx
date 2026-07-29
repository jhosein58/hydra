"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function CustomScrollArea({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [visible, setVisible] = useState(false);

  const updateScrollbar = () => {
    const container = containerRef.current;

    if (!container) return;

    const { scrollHeight, clientHeight, scrollTop } = container;

    if (scrollHeight <= clientHeight) {
      setVisible(false);
      return;
    }

    setThumbHeight((clientHeight / scrollHeight) * clientHeight);

    setThumbTop(
      (scrollTop / (scrollHeight - clientHeight)) *
        (clientHeight - thumbHeight),
    );
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    updateScrollbar();

    container.addEventListener("scroll", updateScrollbar);

    window.addEventListener("resize", updateScrollbar);

    return () => {
      container.removeEventListener("scroll", updateScrollbar);

      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  return (
    <div
      className="relative h-full overflow-hidden"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        ref={containerRef}
        className="
                    h-full
                    overflow-y-auto
                    pr-1

                    scrollbar-none
                "
      >
        {children}
      </div>

      <div
        className={`
                    pointer-events-none
                    absolute
                    right-1
                    top-0

                    w-1

                    transition-opacity
                    duration-200

                    ${visible ? "opacity-100" : "opacity-0"}
                `}
      >
        <div
          style={{
            height: thumbHeight,
            transform: `translateY(${thumbTop}px)`,
          }}
          className="
                        w-full
                        bg-linear-to-b
                        from-[#7B3FFF]
                        to-[#4F8CFF]
                    "
        />
      </div>
    </div>
  );
}
