'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Contact',
//   description: 'Get in touch with the MoneyCho team.',
// };

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace action with your Formspree endpoint:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } })
    setSent(true);
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase block mb-4">
            Get in Touch
          </span>
          <h1 className="font-serif font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.1] text-emerald-deep mb-6">
            Contact Us
          </h1>
          <p className="text-[1.05rem] leading-[1.7] text-emerald-deep/60 mb-12 max-w-[42ch]">
            Questions about a calculator, feedback on a guide, or just want to say hello. We read every message.
          </p>

          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">Response time</p>
              <p className="text-sm text-emerald-deep/70">Usually within 1–2 business days.</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">About the tools</p>
              <p className="text-sm text-emerald-deep/70">
                Spotted an error in a calculation or a tax figure that needs updating? Please include the calculator name and the specific number.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-1">No financial advice</p>
              <p className="text-sm text-emerald-deep/70">
                We cannot provide personal financial advice. The calculators are educational tools only.
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {sent ? (
            <div className="bg-gold/10 border border-gold/30 p-10 text-center">
              <p className="font-serif text-2xl text-emerald-deep mb-3">Message sent.</p>
              <p className="text-sm text-emerald-deep/60">Thanks for reaching out. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-paper border border-emerald-deep/20 px-4 py-3 text-sm text-emerald-deep placeholder:text-emerald-deep/30 focus:outline-none focus:border-emerald-deep transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-paper border border-emerald-deep/20 px-4 py-3 text-sm text-emerald-deep placeholder:text-emerald-deep/30 focus:outline-none focus:border-emerald-deep transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-paper border border-emerald-deep/20 px-4 py-3 text-sm text-emerald-deep focus:outline-none focus:border-emerald-deep transition-colors appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="calculator-question">Question about a calculator</option>
                  <option value="calculator-error">Calculator error or outdated data</option>
                  <option value="guide-feedback">Guide feedback</option>
                  <option value="partnership">Partnership or collaboration</option>
                  <option value="press">Press inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-paper border border-emerald-deep/20 px-4 py-3 text-sm text-emerald-deep placeholder:text-emerald-deep/30 focus:outline-none focus:border-emerald-deep transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-deep text-paper text-xs font-bold uppercase tracking-widest hover:bg-emerald-mid transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
