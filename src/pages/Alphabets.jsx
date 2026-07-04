import { motion } from 'framer-motion'
import alphabet from '../data/alphabet.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

// A short animated stroke that sits under the big letter, suggesting
// handwriting motion without needing a real tracing/handwriting library.
function WritingAnimation() {
  return (
    <motion.svg width="120" height="24" viewBox="0 0 120 24" className="mx-auto mt-2">
      <motion.path
        d="M4 12 Q 30 2, 60 12 T 116 12"
        stroke="#4FC3F7"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

export default function Alphabets() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="🔤 Learn the Alphabet" /></h1>
      <LessonShell
        items={alphabet}
        category="alphabet"
        getId={(a) => a.id}
        getSpeech={(a) => a.speech}
        accent="sky"
        renderVisual={(a) => (
          <div>
            <div className="flex items-center justify-center gap-6 mb-4">
              <motion.span
                className="font-display text-8xl sm:text-9xl font-extrabold text-skydark"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {a.uppercase}
              </motion.span>
              <span className="font-display text-6xl sm:text-7xl font-bold text-sky/70">{a.lowercase}</span>
            </div>
            <WritingAnimation />
            <motion.div
              className="text-7xl my-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <Emoji text={a.emoji} />
            </motion.div>
            <p className="font-display text-2xl font-bold text-ink">{a.word}</p>
          </div>
        )}
      />
    </div>
  )
}
