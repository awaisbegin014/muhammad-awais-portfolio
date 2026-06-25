import { owner } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white">
      <section className="flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Portfolio
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">{owner.name}</h1>
          <p className="mt-5 text-lg text-slate-300">{owner.headline}</p>
        </div>
      </section>
    </main>
  );
}
