import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Emoji from './Emoji.jsx'

const bgMap = {
  sky: 'from-sky/90 to-skydark',
  sun: 'from-sun to-orange-300',
  grass: 'from-grass to-emerald-500',
  coral: 'from-coral to-rose-400',
  grape: 'from-grape to-purple-500',
  bubblegum: 'from-bubblegum to-pink-400',
}

/**
 * LessonCard
 * The big colorful tappable card used on the Home page for each subject
 * area (Alphabets, Numbers, Animals, ...). Speaks its own label on hover
 * for kids who benefit from audio cues before committing to a tap.
 */
export default function LessonCard({ to, title, description, emoji, color = 'sky', onHover }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.96 }}
      className="h-full"
    >
      <Link
        to={to}
        onMouseEnter={onHover}
        onFocus={onHover}
        className={`group h-full flex flex-col items-center text-center gap-2 rounded-blob p-6 shadow-soft bg-gradient-to-br ${bgMap[color]} text-white min-h-[220px] justify-center`}
      >
        <motion.span
          className="text-6xl drop-shadow"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Emoji text={emoji} />
        </motion.span>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="text-white/90 text-sm font-semibold">{description}</p>
      </Link>
    </motion.div>
  )
}
