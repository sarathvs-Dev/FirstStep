import { motion } from 'framer-motion'
import numbers from '../data/numbers.json'
import LessonShell from '../components/LessonShell.jsx'
import Emoji from '../components/Emoji.jsx'

export default function Numbers() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="🔢 Learn Numbers" /></h1>
      <p className="text-center text-ink/50 font-semibold -mt-4 mb-6 text-sm">
        Counting 0 to 20 — the same lesson pattern works all the way to 100, just add more entries to numbers.json
      </p>
      <LessonShell
        items={numbers}
        category="numbers"
        getId={(n) => n.value}
        getSpeech={(n) => n.speech}
        accent="sun"
        renderVisual={(n) => (
          <div>
            <motion.span
              className="font-display text-9xl font-extrabold text-sun block"
              key={n.value}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {n.value}
            </motion.span>
            <p className="font-display text-2xl font-bold text-ink mt-1 mb-5">{n.word}</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {Array.from({ length: n.count }).map((_, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Emoji text={n.emoji} />
                </motion.span>
              ))}
              {n.count === 0 && <span className="text-ink/40 font-semibold">(none — zero!)</span>}
            </div>
          </div>
        )}
      />
    </div>
  )
}
