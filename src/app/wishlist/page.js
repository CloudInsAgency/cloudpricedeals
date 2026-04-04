'use client'
import { useState, useEffect } from 'react'
import { Heart, Plus, Share2, Trash2, X, ChevronDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RetailerBadge from '@/components/RetailerBadge'
import EmailCapture from '@/components/EmailCapture'
import { WISHLIST_OCCASIONS } from '@/data/deals'

const DEMO_LISTS = [
  {
    id: 'list-1',
    name: "Emma's Birthday 2026",
    occasion: 'birthday',
    items: [
      { id: 'sony-wh1000xm5', name: 'Sony WH-1000XM5', emoji: '🎧', price: 89, originalPrice: 149, retailer: 'amazon' },
      { id: 'fitbit-charge6',  name: 'Fitbit Charge 6',  emoji: '⌚', price: 99, originalPrice: 159, retailer: 'bestbuy' },
    ],
    createdAt: '2026-03-20',
  },
  {
    id: 'list-2',
    name: 'Christmas 2026',
    occasion: 'christmas',
    items: [
      { id: 'bose-qc-earbuds2', name: 'Bose QC Earbuds II', emoji: '🎵', price: 119, originalPrice: 179, retailer: 'amazon' },
      { id: 'tcl-43-4k-tv',     name: 'TCL 43" 4K Smart TV',  emoji: '📺', price: 119, originalPrice: 179, retailer: 'bestbuy' },
      { id: 'dell-27-monitor',  name: 'Dell 27" 4K Monitor',   emoji: '🖥️', price: 129, originalPrice: 199, retailer: 'target' },
    ],
    createdAt: '2026-03-15',
  },
  {
    id: 'list-3',
    name: 'Baby shower — Jess & Mike',
    occasion: 'babyshower',
    items: [
      { id: 'instant-pot-duo', name: 'Instant Pot Duo 7-in-1', emoji: '🍲', price: 59, originalPrice: 99, retailer: 'walmart' },
      { id: 'keurig-k-slim',   name: 'Keurig K-Slim',          emoji: '☕', price: 59, originalPrice: 89, retailer: 'amazon' },
    ],
    createdAt: '2026-03-28',
  },
]

export default function WishlistPage() {
  const [lists, setLists] = useState(DEMO_LISTS)
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newOccasion, setNewOccasion] = useState('birthday')
  const [expandedList, setExpandedList] = useState('list-1')
  const [copiedId, setCopiedId] = useState(null)

  const totalItems = lists.reduce((sum, l) => sum + l.items.length, 0)
  const totalSaved = lists.reduce((sum, l) => sum + l.items.reduce((s, i) => s + (i.originalPrice - i.price), 0), 0)

  const createList = () => {
    if (!newName.trim()) return
    const newList = {
      id: `list-${Date.now()}`,
      name: newName.trim(),
      occasion: newOccasion,
      items: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setLists([newList, ...lists])
    setNewName('')
    setShowNew(false)
  }

  const deleteList = (id) => setLists(lists.filter(l => l.id !== id))

  const removeItem = (listId, itemId) => {
    setLists(lists.map(l => l.id === listId ? { ...l, items: l.items.filter(i => i.id !== itemId) } : l))
  }

  const shareList = (list) => {
    const url = `${window.location.origin}/wishlist/shared/${list.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(list.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-3xl text-ink mb-1">My wishlists</h1>
            <p className="text-gray-400 text-sm">Save deals to occasion lists — then share with family & friends</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 bg-brand-400 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-500 transition-colors"
          >
            <Plus size={15} /> New list
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Lists', value: lists.length },
            { label: 'Items saved', value: totalItems },
            { label: 'Total savings', value: `$${totalSaved}` },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="font-display font-bold text-2xl text-ink">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* New list form */}
        {showNew && (
          <div className="card p-5 mb-4 border-brand-200 bg-brand-50">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm text-ink">Create new list</p>
              <button onClick={() => setShowNew(false)} className="text-gray-400 hover:text-ink">
                <X size={16} />
              </button>
            </div>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="List name e.g. Sarah's Birthday 2026"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-brand-300 mb-3"
              onKeyDown={e => e.key === 'Enter' && createList()}
              autoFocus
            />
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {WISHLIST_OCCASIONS.map(occ => (
                  <button
                    key={occ.id}
                    onClick={() => setNewOccasion(occ.id)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all font-medium"
                    style={{
                      background: newOccasion === occ.id ? occ.bg : 'white',
                      color: newOccasion === occ.id ? occ.color : '#888',
                      borderColor: newOccasion === occ.id ? occ.color : '#e5e7eb',
                    }}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNew(false)} className="btn-outline flex-1 justify-center text-sm py-2">Cancel</button>
              <button onClick={createList} className="flex-1 bg-brand-400 text-white text-sm font-semibold py-2 rounded-xl hover:bg-brand-500 transition-colors">
                Create list
              </button>
            </div>
          </div>
        )}

        {/* Occasions legend */}
        <div className="flex flex-wrap gap-2 mb-5">
          {WISHLIST_OCCASIONS.map(occ => (
            <span
              key={occ.id}
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: occ.bg, color: occ.color }}
            >
              {occ.label}
            </span>
          ))}
        </div>

        {/* Lists */}
        <div className="flex flex-col gap-3">
          {lists.map(list => {
            const occasion = WISHLIST_OCCASIONS.find(o => o.id === list.occasion)
            const listTotal = list.items.reduce((s, i) => s + i.price, 0)
            const isExpanded = expandedList === list.id

            return (
              <div key={list.id} className="card overflow-visible">
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedList(isExpanded ? null : list.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-ink">{list.name}</span>
                      {occasion && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: occasion.bg, color: occasion.color }}
                        >
                          {occasion.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {list.items.length} {list.items.length === 1 ? 'item' : 'items'} · ${listTotal} total · Created {list.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); shareList(list) }}
                      className="p-2 rounded-xl hover:bg-brand-50 transition-colors"
                      title="Copy share link"
                    >
                      <Share2 size={14} className={copiedId === list.id ? 'text-brand-400' : 'text-gray-400'} />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); deleteList(list.id) }}
                      className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                      title="Delete list"
                    >
                      <Trash2 size={14} className="text-gray-300 hover:text-red-400" />
                    </button>
                    <ChevronDown
                      size={16}
                      className={`text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-50 px-4 pb-4 pt-3">
                    {list.items.length === 0 ? (
                      <div className="text-center py-6">
                        <Heart size={24} className="text-gray-200 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 mb-1">No items yet</p>
                        <p className="text-xs text-gray-300">Browse deals and tap the heart to save here</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {list.items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 p-2.5 bg-surface rounded-xl">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shrink-0">
                              {item.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink leading-tight">{item.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <RetailerBadge retailer={item.retailer} size="xs" />
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-semibold price-green">${item.price}</p>
                              <p className="text-xs text-gray-300 line-through">${item.originalPrice}</p>
                            </div>
                            <button
                              onClick={() => removeItem(list.id, item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                            >
                              <X size={13} className="text-gray-300 hover:text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <button
                        onClick={() => shareList(list)}
                        className="flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-500 transition-colors"
                      >
                        <Share2 size={13} />
                        {copiedId === list.id ? 'Link copied!' : 'Share this list'}
                      </button>
                      <a href="/" className="text-xs font-medium text-gray-400 hover:text-ink transition-colors">
                        + Browse more deals →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8">
          <EmailCapture variant="banner" />
        </div>

      </div>
      <Footer />
    </div>
  )
}
