const sourceRates = [
  { base: "AUD", terms: "USD", value: 0.8371 },
  { base: "CAD", terms: "USD", value: 0.8711 },
  { base: "USD", terms: "CNY", value: 6.1715 },
  { base: "EUR", terms: "USD", value: 1.2315 },
  { base: "GBP", terms: "USD", value: 1.5683 },
  { base: "NZD", terms: "USD", value: 0.775 },
  { base: "USD", terms: "JPY", value: 119.95 },
  { base: "EUR", terms: "CZK", value: 27.6028 },
  { base: "EUR", terms: "DKK", value: 7.4405 },
  { base: "EUR", terms: "NOK", value: 8.6651 },
];

// symmetric rates by reversing base and terms
// this solution will help trim down the logic
// by increasing the number of rates
export const rates = [
    ...sourceRates,
    ...sourceRates.map(({ base, terms, value }) => ({ base: terms, terms: base, value: 1 / value })),
]


export const currencyList: string[] = [
  "AUD",
  "CAD",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "JPY",
  "NOK",
  "NZD",
  "USD",
];

export const fractionDigits: Record<string, number> = {
  "AUD": 2,
  "CAD": 2,
  "CNY": 2,
  "CZK": 2,
  "DKK": 2,
  "EUR": 2,
  "GBP": 2,
  "JPY": 0,
  "NOK": 2,
  "NZD": 2,
  "USD": 2,
}
