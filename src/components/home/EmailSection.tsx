"use client";

import { useState } from "react";

export function EmailSection({ lang }: { lang: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to Formspree or email service
    setDone(true);
  }

  const isNL = lang === "nl";

  return (
    <section className="bg-emerald-deep py-20 px-6">
      <div className="max-w-[1280px] mx-auto text-center">
        <h2 className="font-serif font-bold text-[clamp(1.8rem,3vw,2.4rem)] text-paper leading-tight mb-2">
          {isNL ? (
            <>
              Één e-mail per maand.{" "}
              <em className="text-gold not-italic">Geen ruis.</em>
            </>
          ) : (
            <>
              One short email per month.{" "}
              <em className="text-gold not-italic">No noise.</em>
            </>
          )}
        </h2>
        <p className="text-paper/60 text-[0.95rem] max-w-[44ch] mx-auto mb-8">
          {isNL
            ? "Één overzicht: nieuwe calculators, renteveranderingen en de ene grafiek die er echt toe doet."
            : "A single digest: new calculators, rate changes, and the one chart that actually matters."}
        </p>

        {done ? (
          <p className="text-gold font-semibold text-lg">
            {isNL ? "Bedankt — je hoort van ons!" : "You're in — talk soon!"}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isNL ? "jij@voorbeeld.nl" : "you@example.com"}
              required
              suppressHydrationWarning
              className="flex-1 px-4 py-3 bg-paper/10 border border-paper/20 text-paper placeholder:text-paper/40 text-sm focus:outline-none focus:border-paper/50 rounded-md"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-emerald-deep text-sm font-bold rounded-md hover:bg-gold-bright transition-colors whitespace-nowrap"
            >
              {isNL ? "Inschrijven" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
