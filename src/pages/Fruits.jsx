import { motion } from 'framer-motion'
import fruits from '../data/fruits.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

export default function Fruits() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="🍎 Yummy Fruits" /></h1>
      <LessonShell
        items={fruits}
        category="fruits"
        getId={(f) => f.id}
        getSpeech={(f) => f.speech}
        accent="coral"
        renderVisual={(f) => (
          <div>
            <motion.div
              className="text-9xl my-4"
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
            >
              <Emoji text={f.emoji} />
            </motion.div>
            <p className="font-display text-3xl font-bold text-ink">{f.name}</p>
          </div>
        )}
      />
    </div>
  )
}
