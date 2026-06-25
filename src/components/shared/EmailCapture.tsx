'use client';

import { useState } from 'react';

export function EmailCapture({ lang = 'en' }: { lang?: string }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const isNL = lang === 'nl';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to email service (Mailchimp, ConvertKit, etc.)
    setDone(true);
  }

  return (
    <div className="border-t border-emerald-deep/10 mt-12 pt-10">
      {done ? (
        <div className="bg-gold/10 border border-gold/30 rounded p-6">
          <p className="text-sm font-semibold text-emerald-deep">
            {isNL
              ? '✓ Bedankt! We sturen je de resultaten zodra e-mail klaarstaat.'
              : '✓ Got it! Email delivery coming soon. We\'ll notify you when it\'s live.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
            {isNL ? 'Resultaten bewaren' : 'Save Your Results'}
          </p>
          <p className="text-sm text-emerald-deep/60 mb-5">
            {isNL
              ? 'Voer je e-mailadres in om de berekeningen naar jezelf te sturen.'
              : 'Enter your email and we\'ll send you these calculations to review later.'}
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isNL ? 'jouw@email.nl' : 'your@email.com'}
              className="flex-1 bg-paper border border-emerald-deep/20 px-4 py-3 text-sm text-emerald-deep placeholder:text-emerald-deep/30 focus:outline-none focus:border-emerald-deep transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-colors whitespace-nowrap"
            >
              {isNL ? 'Versturen' : 'Send'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
