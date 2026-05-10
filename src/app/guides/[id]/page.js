import { notFound } from 'next/navigation'
import { GUIDES } from './guides-data'
import GuideClient from './guide-client'

export function generateStaticParams() {
  return GUIDES.map(function(g) { return { id: g.id } })
}

export async function generateMetadata({ params }) {
  const guide = GUIDES.find(function(g) { return g.id === params.id })
  if (!guide) {
    return {
      title: 'Guide not found',
      alternates: { canonical: '/guides/' + params.id },
    }
  }
  const url = '/guides/' + guide.id
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: 'https://cloudpricedeals.com' + url,
      type: 'article',
    },
  }
}

export default function GuidePage({ params }) {
  const guide = GUIDES.find(function(g) { return g.id === params.id })
  if (!guide) notFound()
  return <GuideClient id={params.id} />
}
