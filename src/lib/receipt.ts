export interface LineItem {
  id: string;
  receiptId: string;
  name: string;
  canonicalName: string;
  category: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  storeName: string;
  date: string;
  total: number;
  createdAt: string;
  items: LineItem[];
}

export interface StoreComparison {
  canonicalName: string;
  category: string;
  byStore: Record<string, { price: number; name: string }>;
}

export interface SpendingSummary {
  byStore: Record<string, number>;
  byCategory: Record<string, number>;
  topItems: { name: string; total: number; count: number }[];
  grandTotal: number;
}

const STORAGE_KEY = 'moneycho_receipts';

export function loadReceipts(): Receipt[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Receipt[]) : [];
  } catch {
    return [];
  }
}

export function saveReceipts(receipts: Receipt[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(receipts));
}

export function addReceipt(receipt: Receipt): Receipt[] {
  const existing = loadReceipts();
  const updated = [receipt, ...existing];
  saveReceipts(updated);
  return updated;
}

export function deleteReceipt(id: string): Receipt[] {
  const updated = loadReceipts().filter((r) => r.id !== id);
  saveReceipts(updated);
  return updated;
}

export function buildComparisons(receipts: Receipt[]): StoreComparison[] {
  const map = new Map<string, StoreComparison>();

  for (const receipt of receipts) {
    for (const item of receipt.items) {
      const key = item.canonicalName.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          canonicalName: item.canonicalName,
          category: item.category,
          byStore: {},
        });
      }
      const entry = map.get(key)!;
      // Keep the lowest price seen per store
      const existing = entry.byStore[receipt.storeName];
      if (!existing || item.price < existing.price) {
        entry.byStore[receipt.storeName] = { price: item.price, name: item.name };
      }
    }
  }

  // Only return items seen in 2+ stores
  return Array.from(map.values())
    .filter((c) => Object.keys(c.byStore).length >= 2)
    .sort((a, b) => a.canonicalName.localeCompare(b.canonicalName));
}

export function buildSummary(receipts: Receipt[]): SpendingSummary {
  const byStore: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const itemMap: Record<string, { total: number; count: number }> = {};
  let grandTotal = 0;

  for (const receipt of receipts) {
    byStore[receipt.storeName] = (byStore[receipt.storeName] ?? 0) + receipt.total;
    grandTotal += receipt.total;
    for (const item of receipt.items) {
      const cat = item.category || 'Other';
      byCategory[cat] = (byCategory[cat] ?? 0) + item.price * item.quantity;
      const k = item.canonicalName;
      if (!itemMap[k]) itemMap[k] = { total: 0, count: 0 };
      itemMap[k].total += item.price * item.quantity;
      itemMap[k].count += 1;
    }
  }

  const topItems = Object.entries(itemMap)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return { byStore, byCategory, topItems, grandTotal };
}

export function cheapestStore(comparison: StoreComparison): string {
  return Object.entries(comparison.byStore).sort((a, b) => a[1].price - b[1].price)[0][0];
}
