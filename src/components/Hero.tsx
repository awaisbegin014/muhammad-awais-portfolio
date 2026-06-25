import Image from "next/image";

import { owner } from "@/data/portfolio";

import { MotionDiv } from "./Motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute left-1/2 top-28 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute bottom-8 right-10 -z-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <h1 className="text-balance text-4xl font-semibold text-white sm:text-6xl lg:text-7xl">
            {owner.name}
          </h1>
          <p className="mt-5 text-xl font-medium text-cyan-100 sm:text-2xl">{owner.headline}</p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
            {owner.heroLine}
          </p>

        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <MotionDiv
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid size-[280px] place-items-center sm:size-[360px] lg:size-[430px]"
          >
            <div className="absolute inset-4 rounded-full border border-cyan-300/20" />
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-amber-200 p-[2px] shadow-[0_0_60px_rgba(34,211,238,0.25)]">
              <div className="size-full overflow-hidden rounded-full border border-white/15 bg-slate-950">
                <Image
                  src="/profile.jpg"
                  width={640}
                  height={640}
                  priority
                  alt="Portrait of Muhammad Awais"
                  className="size-full object-cover"
                />
              </div>
            </div>
            <span className="absolute right-7 top-16 size-3 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.9)]" />
            <span className="absolute bottom-20 left-8 size-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,230,138,0.8)]" />
            <div className="absolute bottom-7 right-6 rounded-full border border-white/10 bg-white/8 px-4 py-2 font-mono text-xs text-cyan-100 backdrop-blur">
              system.builder
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
