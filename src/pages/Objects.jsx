import { motion } from 'framer-motion'
import objects from '../data/objects.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

export default function Objects() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="📦 Everyday Objects" /></h1>
      <LessonShell
        items={objects}
        category="objects"
        getId={(o) => o.id}
        getSpeech={(o) => o.speech}
        accent="sun"
        renderVisual={(o) => (
          <div>
            <motion.div
              className="text-9xl my-4"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Emoji text={o.emoji} />
            </motion.div>
            <p className="font-display text-3xl font-bold text-ink">{o.name}</p>
          </div>
        )}
      />
    </div>
  )
}
