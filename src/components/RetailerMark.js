// Simplified, recognizable retailer marks (not pixel-exact brand logos) used in
// the hero tile "available at" chips and the Shop-by-Retailer band. Kept generic
// enough to be defensible as icons; swap in licensed brand assets if available.
// Each mark draws inside a 24x24 viewBox.

function Amazon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <text x="12" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#232F3E">a</text>
      <path d="M5 16.2c4.2 2.4 9.8 2.4 14 0" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.6 15.1l1.9 1.1-2.1 0.9z" fill="#FF9900" />
    </svg>
  )
}
function BestBuy() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M3 8h15l3 4-3 4H3z" fill="#FFE000" />
      <text x="10.5" y="11.4" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.4" fontWeight="800" fill="#111">BEST</text>
      <text x="10.5" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.4" fontWeight="800" fill="#111">BUY</text>
    </svg>
  )
}
function Walmart() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <g fill="#FFC220">
        {[0, 60, 120, 180, 240, 300].map(function(a) {
          return <rect key={a} x="10.7" y="2.5" width="2.6" height="6.4" rx="1.3" transform={'rotate(' + a + ' 12 12)'} />
        })}
      </g>
    </svg>
  )
}
function Target() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#CC0000" />
      <circle cx="12" cy="12" r="5.6" fill="#fff" />
      <circle cx="12" cy="12" r="2.4" fill="#CC0000" />
    </svg>
  )
}
function Ebay() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9.2" fontWeight="800" letterSpacing="-0.5">
        <tspan fill="#E53238">e</tspan><tspan fill="#0064D2">b</tspan><tspan fill="#F5AF02">a</tspan><tspan fill="#86B817">y</tspan>
      </text>
    </svg>
  )
}

const MARKS = { amazon: Amazon, bestbuy: BestBuy, walmart: Walmart, target: Target, ebay: Ebay }

export default function RetailerMark({ id }) {
  const Mark = MARKS[id]
  return Mark ? <Mark /> : null
}

export const RETAILER_IDS = ['amazon', 'bestbuy', 'walmart', 'target', 'ebay']
