import { motion } from 'framer-motion'
import words from '../data/words.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

export default function Words() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="📖 Simple Words" /></h1>
      <LessonShell
        items={words}
        category="words"
        getId={(w) => w.id}
        getSpeech={(w) => w.speech}
        accent="grape"
        renderVisual={(w) => (
          <div>
            <div className="text-8xl mb-3"><Emoji text={w.emoji} /></div>
            <motion.p
              className="font-display text-5xl font-extrabold text-grape mb-4"
              initial={{ letterSpacing: '0.4em', opacity: 0 }}
              animate={{ letterSpacing: '0.02em', opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {w.word}
            </motion.p>
            <p className="text-xl text-ink/70 font-semibold bg-cream inline-block px-4 py-2 rounded-2xl">
              {w.sentence}
            </p>
          </div>
        )}
      />
    </div>
  )
}
