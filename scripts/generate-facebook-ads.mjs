// Generates 1200x628 Facebook ad images for every "hot" deal in src/data/deals.js.
// Output goes to /facebook-ads/ at the repo root, one PNG per deal id.
//
// Usage:
//   npm install --save-dev canvas        # one-time install
//   node scripts/generate-facebook-ads.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage } from 'canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const OUTPUT_DIR = path.join(ROOT, 'facebook-ads')
const DEALS_FILE = path.join(ROOT, 'src/data/deals.js')

// ── Brand palette (matches globals.css) ──────────────────────────────
const GREEN = '#00A86B'
const GREEN_DARK = '#008A57'
const HOT = '#FF6B35'
const TEXT_PRIMARY = '#0F172A'
const TEXT_SECONDARY = '#475569'
const TEXT_MUTED = '#94A3B8'
const BG_SECTION = '#F1F5F9'
const BG_CARD = '#FFFFFF'

// ── Canvas size (Facebook ad recommended) ────────────────────────────
const W = 1200
const H = 628

async function main() {
  // deals.js uses ES module `export const`, but the project's package.json
  // has no "type": "module" — so a regular dynamic import of the .js path
  // would fall back to CommonJS and fail. Workaround: read the source and
  // import via a data: URL, which Node always treats as ES module.
  const source = await fs.promises.readFile(DEALS_FILE, 'utf-8')
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(source).toString('base64')
  const { DEALS, RETAILERS } = await import(dataUrl)

  const hotDeals = DEALS.filter((d) => d.badge === 'hot')
  if (hotDeals.length === 0) {
    console.log('No deals with badge: "hot" found in src/data/deals.js — nothing to render.')
    return
  }

  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true })

  console.log(`Rendering ${hotDeals.length} Facebook ad${hotDeals.length === 1 ? '' : 's'}…`)
  const start = Date.now()
  let succeeded = 0
  let failed = 0

  for (const deal of hotDeals) {
    const out = path.join(OUTPUT_DIR, `${deal.id}.png`)
    try {
      await renderAd(deal, RETAILERS, out)
      console.log(`  ✓ ${path.relative(ROOT, out)}`)
      succeeded++
    } catch (err) {
      console.log(`  ✗ ${deal.id}: ${err.message}`)
      failed++
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\nDone in ${elapsed}s — ${succeeded} succeeded, ${failed} failed.`)
  console.log(`Output: ${path.relative(ROOT, OUTPUT_DIR)}/`)
}

async function renderAd(deal, RETAILERS, outPath) {
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext('2d')

  // White background
  ctx.fillStyle = BG_CARD
  ctx.fillRect(0, 0, W, H)

  // ── Top brand bar ──────────────────────────────────────────────────
  ctx.fillStyle = GREEN
  ctx.fillRect(0, 0, W, 56)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 22px sans-serif'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('⚡ CloudPriceDeals', 32, 28)
  ctx.font = '15px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('Compare prices weekly', W - 32, 28)
  ctx.textAlign = 'left'

  // ── Product image (left half) ──────────────────────────────────────
  const imgX = 60
  const imgY = 96
  const imgW = 460
  const imgH = 444

  ctx.fillStyle = BG_SECTION
  drawRoundRect(ctx, imgX, imgY, imgW, imgH, 16)
  ctx.fill()

  let drewImage = false
  try {
    const img = await loadProductImage(deal)
    if (img) {
      // Fit image into box, maintain aspect ratio, leave padding
      const padding = 32
      const boxW = imgW - padding * 2
      const boxH = imgH - padding * 2
      const ratio = Math.min(boxW / img.width, boxH / img.height)
      const dw = img.width * ratio
      const dh = img.height * ratio
      ctx.drawImage(img, imgX + (imgW - dw) / 2, imgY + (imgH - dh) / 2, dw, dh)
      drewImage = true
    }
  } catch (err) {
    // Network blip or decode failure — fall through to emoji fallback below.
  }

  if (!drewImage) {
    ctx.fillStyle = TEXT_MUTED
    ctx.font = '180px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(deal.emoji || '🛒', imgX + imgW / 2, imgY + imgH / 2)
    ctx.textAlign = 'left'
  }

  // HOT DEAL badge (top-left of image)
  ctx.fillStyle = HOT
  drawRoundRect(ctx, imgX + 16, imgY + 16, 130, 36, 18)
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 13px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🔥 HOT DEAL', imgX + 16 + 65, imgY + 16 + 18)

  // ── Right column ───────────────────────────────────────────────────
  const rx = imgX + imgW + 56
  const rRight = W - 60
  const rWidth = rRight - rx
  let ry = imgY + 8

  // Product name (wrap, max 3 lines)
  ctx.fillStyle = TEXT_PRIMARY
  ctx.font = 'bold 34px serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  const wrapped = wrapText(ctx, deal.shortName || deal.name, rWidth, 3)
  for (const line of wrapped) {
    ctx.fillText(line, rx, ry)
    ry += 42
  }
  ry += 18

  // Big sale price
  ctx.fillStyle = GREEN
  ctx.font = 'bold 84px sans-serif'
  ctx.textBaseline = 'top'
  const priceText = `$${deal.price}`
  ctx.fillText(priceText, rx, ry)
  const priceW = ctx.measureText(priceText).width

  // Crossed-out original price
  ctx.fillStyle = TEXT_MUTED
  ctx.font = '30px sans-serif'
  const origText = `$${deal.originalPrice}`
  const origX = rx + priceW + 18
  const origY = ry + 22
  ctx.fillText(origText, origX, origY)
  const origW = ctx.measureText(origText).width
  ctx.strokeStyle = TEXT_MUTED
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(origX, origY + 17)
  ctx.lineTo(origX + origW, origY + 17)
  ctx.stroke()

  // Savings pill (orange)
  const pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
  const savingsText = `Save ${pct}%`
  ctx.font = 'bold 20px sans-serif'
  const stw = ctx.measureText(savingsText).width
  const pillX = origX
  const pillY = origY + 44
  ctx.fillStyle = HOT
  drawRoundRect(ctx, pillX, pillY, stw + 28, 32, 16)
  ctx.fill()
  ctx.fillStyle = '#FFFFFF'
  ctx.textBaseline = 'middle'
  ctx.fillText(savingsText, pillX + 14, pillY + 16)
  ctx.textBaseline = 'top'

  ry += 110

  // ── Retailer comparison ───────────────────────────────────────────
  ctx.fillStyle = TEXT_MUTED
  ctx.font = 'bold 13px sans-serif'
  ctx.fillText('PRICES AT', rx, ry)
  ry += 26

  if (deal.comparePrices && deal.comparePrices.length > 0) {
    const minPrice = Math.min(...deal.comparePrices.map((cp) => cp.price))
    const rows = deal.comparePrices.slice(0, 3)
    for (const cp of rows) {
      const r = RETAILERS[cp.retailer]
      const isBest = cp.price === minPrice
      const rowH = 38

      // Retailer label
      ctx.fillStyle = isBest ? GREEN : TEXT_SECONDARY
      ctx.font = isBest ? 'bold 22px sans-serif' : '20px sans-serif'
      ctx.textBaseline = 'middle'
      const labelText = r ? r.label : cp.retailer
      const labelW = ctx.measureText(labelText).width
      ctx.fillText(labelText, rx, ry + 14)

      // "BEST" tag for cheapest — measured with the label's font, then drawn at 11px
      if (isBest) {
        ctx.fillStyle = GREEN
        ctx.font = 'bold 11px sans-serif'
        ctx.fillText('★ BEST', rx + labelW + 14, ry + 16)
      }

      // Price (right-aligned)
      ctx.fillStyle = isBest ? GREEN : TEXT_PRIMARY
      ctx.font = isBest ? 'bold 26px sans-serif' : '22px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(`$${cp.price}`, rRight, ry + 14)
      ctx.textAlign = 'left'

      ry += rowH
    }
  }

  // ── Bottom CTA bar ────────────────────────────────────────────────
  ctx.fillStyle = TEXT_PRIMARY
  ctx.fillRect(0, H - 64, W, 64)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 22px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Compare every deal at cloudpricedeals.com', W / 2, H - 32)

  // ── Save ──────────────────────────────────────────────────────────
  await fs.promises.writeFile(outPath, canvas.toBuffer('image/png'))
}

async function loadProductImage(deal) {
  if (!deal.imageUrl) return null
  if (deal.imageUrl.startsWith('http://') || deal.imageUrl.startsWith('https://')) {
    return await loadImage(deal.imageUrl)
  }
  // Local path like '/AnkerNano45GaNCharger.png' — resolve from public/.
  const localPath = path.join(PUBLIC_DIR, deal.imageUrl.replace(/^\//, ''))
  if (fs.existsSync(localPath)) {
    return await loadImage(localPath)
  }
  return null
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrapText(ctx, text, maxWidth, maxLines) {
  const words = String(text).split(/\s+/)
  const lines = []
  let current = ''
  for (const word of words) {
    const test = current ? current + ' ' + word : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
      if (lines.length >= maxLines) break
    } else {
      current = test
    }
  }
  if (current && lines.length < maxLines) lines.push(current)
  if (lines.length >= maxLines) {
    let last = lines[maxLines - 1]
    while (ctx.measureText(last + '…').width > maxWidth && last.length > 0) {
      last = last.slice(0, -1)
    }
    lines[maxLines - 1] = last + '…'
  }
  return lines.slice(0, maxLines)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
