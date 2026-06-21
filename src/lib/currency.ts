export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
];

// Timezone is more reliable than locale — many users set browser to English
// while living in a non-USD country (e.g. en-GB in Netherlands → wrong)
const TIMEZONE_CURRENCY: Record<string, string> = {
  "Europe/Amsterdam": "EUR", "Europe/Berlin": "EUR", "Europe/Paris": "EUR",
  "Europe/Rome": "EUR", "Europe/Madrid": "EUR", "Europe/Lisbon": "EUR",
  "Europe/Brussels": "EUR", "Europe/Vienna": "EUR", "Europe/Athens": "EUR",
  "Europe/Helsinki": "EUR", "Europe/Dublin": "EUR", "Europe/Riga": "EUR",
  "Europe/Tallinn": "EUR", "Europe/Vilnius": "EUR", "Europe/Ljubljana": "EUR",
  "Europe/Bratislava": "EUR", "Europe/Luxembourg": "EUR", "Europe/Nicosia": "EUR",
  "Europe/Valletta": "EUR", "Atlantic/Azores": "EUR",
  "Europe/London": "GBP", "Europe/Zurich": "CHF",
  "Europe/Stockholm": "SEK", "Europe/Oslo": "NOK", "Europe/Copenhagen": "DKK",
  "Europe/Warsaw": "PLN", "Europe/Prague": "CZK", "Europe/Budapest": "HUF",
  "Europe/Bucharest": "RON", "Europe/Istanbul": "TRY", "Europe/Moscow": "RUB",
  "Europe/Kyiv": "UAH",
  "America/New_York": "USD", "America/Chicago": "USD", "America/Denver": "USD",
  "America/Los_Angeles": "USD", "America/Phoenix": "USD", "America/Anchorage": "USD",
  "Pacific/Honolulu": "USD",
  "America/Toronto": "CAD", "America/Vancouver": "CAD", "America/Edmonton": "CAD",
  "America/Winnipeg": "CAD", "America/Halifax": "CAD", "America/St_Johns": "CAD",
  "America/Sao_Paulo": "BRL", "America/Mexico_City": "MXN",
  "America/Santiago": "CLP", "America/Bogota": "COP", "America/Argentina/Buenos_Aires": "ARS",
  "Asia/Tokyo": "JPY", "Asia/Shanghai": "CNY", "Asia/Hong_Kong": "HKD",
  "Asia/Seoul": "KRW", "Asia/Kolkata": "INR", "Asia/Singapore": "SGD",
  "Asia/Dubai": "AED", "Asia/Riyadh": "SAR", "Asia/Jerusalem": "ILS",
  "Asia/Bangkok": "THB", "Asia/Ho_Chi_Minh": "VND", "Asia/Jakarta": "IDR",
  "Asia/Kuala_Lumpur": "MYR", "Asia/Manila": "PHP",
  "Australia/Sydney": "AUD", "Australia/Melbourne": "AUD", "Australia/Brisbane": "AUD",
  "Australia/Perth": "AUD",
  "Pacific/Auckland": "NZD",
  "Africa/Johannesburg": "ZAR",
};

const LOCALE_CURRENCY: Record<string, string> = {
  "en-US": "USD", "en-CA": "CAD", "en-GB": "GBP", "en-AU": "AUD", "en-NZ": "NZD",
  "en-IN": "INR", "en-SG": "SGD", "en-HK": "HKD", "en-ZA": "ZAR", "en-IE": "EUR",
  "nl-NL": "EUR", "nl-BE": "EUR", "nl": "EUR",
  "fr-FR": "EUR", "fr-CA": "CAD", "fr-BE": "EUR", "fr-CH": "CHF", "fr": "EUR",
  "de-DE": "EUR", "de-AT": "EUR", "de-CH": "CHF", "de": "EUR",
  "es-ES": "EUR", "es-MX": "MXN", "es-AR": "ARS", "es-CO": "COP", "es-CL": "CLP", "es": "EUR",
  "pt-PT": "EUR", "pt-BR": "BRL", "pt": "EUR",
  "it-IT": "EUR", "it": "EUR",
  "ja-JP": "JPY", "ja": "JPY",
  "zh-CN": "CNY", "zh-TW": "TWD", "zh-HK": "HKD", "zh": "CNY",
  "ko-KR": "KRW", "ko": "KRW",
  "hi-IN": "INR", "hi": "INR",
  "ru-RU": "RUB", "ru": "RUB",
  "tr-TR": "TRY", "tr": "TRY",
  "pl-PL": "PLN", "pl": "PLN",
  "sv-SE": "SEK", "sv": "SEK",
  "da-DK": "DKK", "da": "DKK",
  "nb-NO": "NOK", "nb": "NOK",
  "fi-FI": "EUR", "fi": "EUR",
  "en": "USD",
};

const STORAGE_KEY = "moneycho_currency";

export function detectCurrency(): string {
  // 1. User's saved preference
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CURRENCIES.find((c) => c.code === saved)) return saved;
  } catch {}

  // 2. Timezone (most reliable signal)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONE_CURRENCY[tz]) return TIMEZONE_CURRENCY[tz];
  } catch {}

  // 3. Locale fallback
  try {
    const locale = navigator.language;
    const byFull = LOCALE_CURRENCY[locale];
    if (byFull) return byFull;
    const byLang = LOCALE_CURRENCY[locale.slice(0, 2)];
    if (byLang) return byLang;
  } catch {}

  return "USD";
}

export function saveCurrency(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
}

export function formatCurrency(amount: number, currency: string, locale?: string): string {
  return new Intl.NumberFormat(locale ?? navigator.language, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
