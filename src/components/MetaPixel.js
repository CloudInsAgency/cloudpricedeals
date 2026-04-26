'use client'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────
// META PIXEL CONFIG
// Replace 'YOUR_PIXEL_ID' below with the numeric Pixel ID from
// Meta Events Manager → Data Sources → your Pixel → Settings.
// (e.g. '1234567890123456'). The same ID is used by the base script
// AND by the noscript <img> fallback below.
// ─────────────────────────────────────────────────────────────────────
const PIXEL_ID = 'YOUR_PIXEL_ID'

export default function MetaPixel() {
  const pathname = usePathname()

  // Fire PageView on initial mount AND on every client-side route change.
  // The inline base snippet only runs fbq('init', …) — PageView lives in
  // this effect so SPA navigations are captured, not just the first hard
  // load. Without this hook, going / → /browse → /about would log a single
  // PageView instead of three.
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [pathname])

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
        `}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* ───────────────────────────────────────────────────────────────
          FIRING CUSTOM EVENTS LATER

          Once the Pixel is loaded, any client component can fire standard
          or custom events via window.fbq:

            if (typeof window !== 'undefined' && window.fbq) {
              window.fbq('track', 'ViewContent', {
                content_ids: [deal.id],
                content_name: deal.name,
                value: deal.price,
                currency: 'USD',
              })
            }

          Suggested instrumentation spots in this codebase:
            • product/[id] page mount        → 'ViewContent'
            • EmailCapture submit            → 'Lead'
            • DealCard "Buy on Amazon" click → 'AddToCart' (or custom)
            • Wishlist heart click           → 'AddToWishlist'

          Standard event reference:
          https://developers.facebook.com/docs/meta-pixel/reference
          ─────────────────────────────────────────────────────────────── */}
    </>
  )
}
