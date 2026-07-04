import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Emoji from './Emoji.jsx'

const COLORS = ['#FF7E79', '#FFC93C', '#5FCB6C', '#4FC3F7', '#B18CFF', '#FF8FD8']
const SHAPES = ['🎉', '⭐', '🎊', '💫']

/**
 * Confetti
 * A short, joyful burst of shapes used as positive reinforcement after a
 * correct quiz answer or completed lesson. Purely decorative + auto-clears.
 */
export default function Confetti({ count = 24 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 500,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.2,
        color: COLORS[i % COLORS.length],
        shape: Math.random() > 0.5 ? SHAPES[i % SHAPES.length] : null,
        size: 10 + Math.random() * 10,
      })),
    [count]
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/3"
          style={{ color: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: 400 + Math.random() * 200, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.4, delay: p.delay, ease: 'easeOut' }}
        >
          {p.shape ? (
            <span style={{ fontSize: p.size + 10 }}><Emoji text={p.shape} /></span>
          ) : (
            <div style={{ width: p.size, height: p.size, background: p.color, borderRadius: 4 }} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
