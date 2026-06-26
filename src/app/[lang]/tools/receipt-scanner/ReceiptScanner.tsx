'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  type Receipt,
  type StoreComparison,
  loadReceipts,
  addReceipt,
  deleteReceipt,
  buildComparisons,
  buildSummary,
  cheapestStore,
} from '@/lib/receipt';

type Tab = 'upload' | 'compare' | 'summary' | 'receipts';

export default function ReceiptScanner({ lang }: { lang: string }) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [tab, setTab] = useState<Tab>('upload');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [lastAdded, setLastAdded] = useState<Receipt | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isNL = lang === 'nl';

  useEffect(() => {
    setReceipts(loadReceipts());
  }, []);

  const comparisons = buildComparisons(receipts);
  const summary = buildSummary(receipts);

  const handleFile = useCallback(async (file: File) => {
    setError('');
    setUploading(true);
    setLastAdded(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/parse-receipt', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }
      const receipt: Receipt = await res.json();
      const updated = addReceipt(receipt);
      setReceipts(updated);
      setLastAdded(receipt);
      setTab('upload');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDelete = (id: string) => {
    setReceipts(deleteReceipt(id));
    if (lastAdded?.id === id) setLastAdded(null);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat(isNL ? 'nl-NL' : 'en-NL', { style: 'currency', currency: 'EUR' }).format(n);

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: 'upload', label: isNL ? 'Uploaden' : 'Upload' },
    { key: 'compare', label: isNL ? 'Vergelijken' : 'Compare', count: comparisons.length },
    { key: 'summary', label: isNL ? 'Overzicht' : 'Summary' },
    { key: 'receipts', label: isNL ? 'Bonnetjes' : 'Receipts', count: receipts.length },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-10 border-b border-emerald-deep/10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'border-emerald-deep text-emerald-deep'
                : 'border-transparent text-emerald-deep/40 hover:text-emerald-deep/70'
            }`}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="ml-2 text-xs bg-emerald-deep/10 text-emerald-deep px-1.5 py-0.5 rounded-full">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* UPLOAD TAB */}
      {tab === 'upload' && (
        <div className="max-w-xl">
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-emerald-deep/20 hover:border-emerald-deep/50 transition-colors cursor-pointer p-16 text-center mb-6"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {uploading ? (
              <div>
                <div className="w-8 h-8 border-2 border-emerald-deep border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-emerald-deep/60">
                  {isNL ? 'Bonnetje wordt gelezen...' : 'Reading receipt...'}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-4">🧾</div>
                <p className="text-sm font-semibold text-emerald-deep mb-1">
                  {isNL ? 'Sleep een foto hierheen' : 'Drop a receipt photo here'}
                </p>
                <p className="text-xs text-emerald-deep/40">
                  {isNL ? 'of klik om te kiezen' : 'or click to choose'} · JPG, PNG, HEIC
                </p>
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 mb-6">
              {error}
            </p>
          )}

          {/* Last added */}
          {lastAdded && (
            <div className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-emerald-deep">{lastAdded.storeName}</p>
                  <p className="text-xs text-emerald-deep/50">{lastAdded.date}</p>
                </div>
                <p className="font-display text-xl font-bold text-emerald-deep">{fmt(lastAdded.total)}</p>
              </div>
              <div className="space-y-1.5">
                {lastAdded.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-emerald-deep/70">{item.name}</span>
                    <span className="text-emerald-deep font-medium">{fmt(item.price)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-emerald-deep/40 mt-4 border-t border-emerald-deep/10 pt-3">
                {lastAdded.items.length} {isNL ? 'artikelen herkend' : 'items recognised'}
              </p>
            </div>
          )}

          {receipts.length > 0 && !lastAdded && (
            <p className="text-sm text-emerald-deep/50">
              {receipts.length} {isNL ? 'bonnetjes opgeslagen. Upload er nog een.' : 'receipts saved. Upload another.'}
            </p>
          )}
        </div>
      )}

      {/* COMPARE TAB */}
      {tab === 'compare' && (
        <div>
          {comparisons.length === 0 ? (
            <div className="text-center py-20 text-emerald-deep/40">
              <div className="text-4xl mb-4">🏪</div>
              <p className="text-sm">
                {isNL
                  ? 'Upload bonnetjes van minimaal 2 verschillende winkels om prijzen te vergelijken.'
                  : 'Upload receipts from at least 2 different stores to compare prices.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-emerald-deep/40 mb-6">
                {comparisons.length} {isNL ? 'producten gevonden in meerdere winkels' : 'products found across multiple stores'}
              </p>
              {comparisons.map((c: StoreComparison) => {
                const best = cheapestStore(c);
                const stores = Object.entries(c.byStore).sort((a, b) => a[1].price - b[1].price);
                const [cheapPrice, expPrice] = [stores[0][1].price, stores[stores.length - 1][1].price];
                const saving = expPrice - cheapPrice;
                return (
                  <div key={c.canonicalName} className="border border-emerald-deep/10 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-emerald-deep">{c.canonicalName}</p>
                        <p className="text-xs text-emerald-deep/40">{c.category}</p>
                      </div>
                      {saving > 0.01 && (
                        <span className="text-xs font-bold text-emerald-deep bg-gold/20 px-2 py-1">
                          {isNL ? 'bespaar' : 'save'} {fmt(saving)}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {stores.map(([store, { price }]) => {
                        const pct = expPrice > cheapPrice ? ((price - cheapPrice) / (expPrice - cheapPrice)) * 100 : 0;
                        return (
                          <div key={store} className="flex items-center gap-3">
                            <span className={`text-xs w-28 shrink-0 font-medium ${store === best ? 'text-emerald-deep' : 'text-emerald-deep/50'}`}>
                              {store === best ? '✓ ' : ''}{store}
                            </span>
                            <div className="flex-1 bg-emerald-deep/5 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${store === best ? 'bg-emerald-deep' : 'bg-emerald-deep/20'}`}
                                style={{ width: `${Math.max(10, 100 - pct)}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold w-16 text-right ${store === best ? 'text-emerald-deep' : 'text-emerald-deep/60'}`}>
                              {fmt(price)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUMMARY TAB */}
      {tab === 'summary' && (
        <div className="space-y-10">
          {receipts.length === 0 ? (
            <div className="text-center py-20 text-emerald-deep/40">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-sm">{isNL ? 'Upload bonnetjes om je overzicht te zien.' : 'Upload receipts to see your summary.'}</p>
            </div>
          ) : (
            <>
              {/* Total */}
              <div className="bg-emerald-deep/[0.04] border border-emerald-deep/15 p-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-2">
                  {isNL ? 'Totaal uitgegeven' : 'Total spent'}
                </p>
                <p className="font-display text-4xl font-bold text-emerald-deep">{fmt(summary.grandTotal)}</p>
                <p className="text-xs text-emerald-deep/40 mt-1">{receipts.length} {isNL ? 'bonnetjes' : 'receipts'}</p>
              </div>

              {/* By store */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
                  {isNL ? 'Per winkel' : 'By store'}
                </p>
                <div className="space-y-3">
                  {Object.entries(summary.byStore)
                    .sort((a, b) => b[1] - a[1])
                    .map(([store, total]) => (
                      <div key={store} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-emerald-deep w-32 shrink-0">{store}</span>
                        <div className="flex-1 bg-emerald-deep/5 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-deep rounded-full"
                            style={{ width: `${(total / summary.grandTotal) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-emerald-deep w-20 text-right">{fmt(total)}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* By category */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
                  {isNL ? 'Per categorie' : 'By category'}
                </p>
                <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
                  {Object.entries(summary.byCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, total]) => (
                      <div key={cat} className="flex justify-between py-3 text-sm">
                        <span className="text-emerald-deep/70">{cat}</span>
                        <span className="font-semibold text-emerald-deep">{fmt(total)}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Top items */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-deep/40 mb-4">
                  {isNL ? 'Meest gekochte producten' : 'Most purchased items'}
                </p>
                <div className="divide-y divide-emerald-deep/10 border-t border-emerald-deep/10">
                  {summary.topItems.map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-sm font-medium text-emerald-deep">{item.name}</p>
                        <p className="text-xs text-emerald-deep/40">{item.count}× {isNL ? 'gekocht' : 'bought'}</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-deep">{fmt(item.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* RECEIPTS TAB */}
      {tab === 'receipts' && (
        <div className="space-y-3">
          {receipts.length === 0 ? (
            <div className="text-center py-20 text-emerald-deep/40">
              <div className="text-4xl mb-4">🧾</div>
              <p className="text-sm">{isNL ? 'Nog geen bonnetjes.' : 'No receipts yet.'}</p>
            </div>
          ) : (
            receipts.map((r) => (
              <div key={r.id} className="border border-emerald-deep/10 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-emerald-deep">{r.storeName}</p>
                    <p className="text-xs text-emerald-deep/50">{r.date} · {r.items.length} {isNL ? 'artikelen' : 'items'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-display text-lg font-bold text-emerald-deep">{fmt(r.total)}</p>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs text-emerald-deep/30 hover:text-red-500 transition-colors"
                      aria-label="Delete receipt"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {receipts.length > 0 && (
            <button
              onClick={() => {
                if (confirm(isNL ? 'Alle bonnetjes verwijderen?' : 'Delete all receipts?')) {
                  setReceipts([]);
                  localStorage.removeItem('moneycho_receipts');
                  setLastAdded(null);
                }
              }}
              className="text-xs text-red-400 hover:text-red-600 transition-colors mt-4"
            >
              {isNL ? 'Alles verwijderen' : 'Delete all'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
