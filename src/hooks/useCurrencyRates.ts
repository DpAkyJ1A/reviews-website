// store/useCurrencyStore.ts
import { create } from "zustand";
import axios from "axios";

export const CURRENCIES = [
  { code: "AUD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
] as const;

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  AU: "AUD",
  DE: "EUR",
  FR: "EUR",
  US: "USD",
  GB: "GBP",
};

type Currency = (typeof CURRENCIES)[number];

type CurrencyState = {
  currency: Currency;
  exchangeRates: { [key: string]: number };
  lastSync: number | null;
  setCurrency: (currency: Currency) => void;
  convert: (amount: number) => number;
  fetchExchangeRates: () => Promise<void>;
};

const STORAGE_KEY = "exchangeRates";
const CURRENCY_STORAGE_KEY = "selectedCurrency";
const SYNC_INTERVAL = 60 * 60 * 1000; // 1 час

export const useCurrencyStore = create<CurrencyState>((set, get) => {
  const storedData = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const storedCurrency = typeof window !== "undefined" ? localStorage.getItem(CURRENCY_STORAGE_KEY) : null;
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const initialCurrency = storedCurrency
    ? JSON.parse(storedCurrency)
    : (() => {
        const locale = typeof window !== "undefined" ? navigator.language : "en-US";
        const country = locale.split("-")[1];
        const currencyCode = COUNTRY_CURRENCY_MAP[country] || "USD";
        return CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[2];
      })();

  return {
    currency: initialCurrency,
    exchangeRates: parsedData?.rates || {},
    lastSync: parsedData?.lastSync || null,

    setCurrency: (currency) => {
      set({ currency });
      localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency));
    },

    convert: (amount) => {
      const { currency, exchangeRates } = get();
      return currency.code in exchangeRates ? amount * exchangeRates[currency.code] : amount;
    },

    fetchExchangeRates: async () => {
      try {
        const { lastSync } = get();
        const now = Date.now();
        if (lastSync && now - lastSync < SYNC_INTERVAL) return;

        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY}&base_currency=USD`);
        const rates = response.data.data;

        set({ exchangeRates: rates, lastSync: now });
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ rates, lastSync: now }));
      } catch (error) {
        console.error("Ошибка загрузки курсов валют", error);
      }
    },
  };
});
