import { motion } from 'framer-motion'
import Emoji from './Emoji.jsx'

// A calm, decorative layer of floating clouds, balloons, and stars.
// Purely ambient — pointer-events disabled so it never blocks taps.
// Animations are slow and gentle to stay comfortable for sensitive viewers,
// and prefers-reduced-motion is respected globally in index.css.
const items = [
  { emoji: '☁️', top: '8%', left: '5%', size: 60, duration: 30, delay: 0 },
  { emoji: '☁️', top: '15%', left: '70%', size: 50, duration: 36, delay: 3 },
  { emoji: '🎈', top: '60%', left: '88%', size: 46, duration: 6, delay: 0.5, float: true },
  { emoji: '🎈', top: '75%', left: '4%', size: 40, duration: 5, delay: 1, float: true },
  { emoji: '⭐', top: '25%', left: '20%', size: 28, duration: 4, delay: 0.2, float: true },
  { emoji: '⭐', top: '40%', left: '92%', size: 24, duration: 4.5, delay: 1.2, float: true },
  { emoji: '🌈', top: '5%', left: '40%', size: 70, duration: 8, delay: 0, float: true },
]

export default function FloatingBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {items.map((it, i) =>
        it.float ? (
          <motion.span
            key={i}
            className="absolute select-none"
            style={{ top: it.top, left: it.left, fontSize: it.size }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: it.duration, repeat: Infinity, delay: it.delay, ease: 'easeInOut' }}
          >
            <Emoji text={it.emoji} />
          </motion.span>
        ) : (
          <motion.span
            key={i}
            className="absolute select-none opacity-70"
            style={{ top: it.top, fontSize: it.size }}
            initial={{ left: '-10%' }}
            animate={{ left: '110%' }}
            transition={{ duration: it.duration, repeat: Infinity, delay: it.delay, ease: 'linear' }}
          >
            <Emoji text={it.emoji} />
          </motion.span>
        )
      )}
    </div>
  )
}
