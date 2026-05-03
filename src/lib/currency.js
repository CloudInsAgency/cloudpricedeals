// Single source of truth for dollar formatting and price math.
//
// JS float math on prices like 79.99 - 59.99 produces 19.999999999999993
// because 79.99 and 59.99 cannot be represented exactly in binary floats.
// To avoid this we work in integer cents wherever subtraction/addition
// happens, then convert back at the edge.
//
// Display always goes through the Intl.NumberFormat instance below, which
// handles locale, thousands separators, and exact 2-decimal output.

// Memoized at module scope — Intl.NumberFormat construction is non-trivial
// and we want to avoid building a new one on every render.
const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function toCents(value) {
  // Math.round is required: (5.99 * 100) === 598.9999999999999 in JS.
  return Math.round(Number(value) * 100)
}

function fromCents(cents) {
  return cents / 100
}

// Format a number as "$XX.XX". Returns "$0.00" for null/undefined/NaN.
export function formatCurrency(value) {
  if (value === null || value === undefined) return '$0.00'
  const n = Number(value)
  if (!isFinite(n)) return '$0.00'
  return USD.format(n)
}

// Compute savings between an original price and a sale price.
// Returns { amount, percent } where:
//   amount  — number, rounded to cents (e.g., 20.00 not 19.999999...)
//   percent — integer, rounded to nearest whole percent
// Both are 0 when inputs are missing/invalid or when original <= 0.
export function calculateSavings(original, sale) {
  const o = Number(original)
  const s = Number(sale)
  if (!isFinite(o) || !isFinite(s) || o <= 0) {
    return { amount: 0, percent: 0 }
  }
  const amountCents = toCents(o) - toCents(s)
  const amount = fromCents(amountCents)
  const percent = Math.round((amountCents / toCents(o)) * 100)
  return { amount, percent }
}

// Cent-accurate subtraction for two prices. Useful for "competitor delta"
// rows ($+4.00 vs best price) where we need clean 2-decimal output.
export function priceDiff(a, b) {
  const x = Number(a)
  const y = Number(b)
  if (!isFinite(x) || !isFinite(y)) return 0
  return fromCents(toCents(x) - toCents(y))
}
