import { motion } from 'framer-motion'
import birds from '../data/birds.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

export default function Birds() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="🦜 Meet the Birds" /></h1>
      <LessonShell
        items={birds}
        category="birds"
        getId={(b) => b.id}
        getSpeech={(b) => b.speech}
        accent="sky"
        renderVisual={(b) => (
          <div>
            <motion.div
              className="text-8xl my-2"
              animate={{ y: [0, -20, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Emoji text={b.emoji} />
            </motion.div>
            <p className="font-display text-3xl font-bold text-ink mb-1">{b.name}</p>
            <p className="text-ink/60 font-semibold mb-2"><Emoji text="🔊" /> {b.sound}</p>
            <p className="max-w-sm mx-auto text-ink/70">{b.fact}</p>
          </div>
        )}
      />
    </div>
  )
}
