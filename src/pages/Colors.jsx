import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import colors from '../data/colors.json'
import BigButton from '../components/BigButton.jsx'
import SpeakButton from '../components/SpeakButton.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Emoji from '../components/Emoji.jsx'
import { useSpeech } from '../hooks/useSpeech.js'
import { useProgress } from '../hooks/useProgress.js'

export default function Colors() {
  const [index, setIndex] = useState(0)
  const { speak, muted, speaking, toggleMute } = useSpeech()
  const { completeLesson, categoryProgress } = useProgress()
  const color = colors[index]
  const { percent } = categoryProgress('colors', colors.length)

  useEffect(() => {
    speak(color.speech)
    completeLesson('colors', color.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const isLight = ['#FFFFFF', '#FACC15'].includes(color.hex)

  return (
    <motion.div
      className="min-h-[80vh] transition-colors duration-700 flex flex-col items-center justify-center px-4 py-10"
      animate={{ backgroundColor: color.hex }}
    >
      <div className="max-w-md w-full mx-auto mb-6">
        <ProgressBar percent={percent} label="Progress" color="grass" />
      </div>

      <h1 className={`font-display text-2xl font-extrabold mb-6 ${isLight ? 'text-ink' : 'text-white'}`}>
        <Emoji text="🎨 Learn Colors" />
      </h1>

      {/* Paint splash burst */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={color.id}
            className="absolute inset-0 rounded-full"
            style={{ background: color.hex, border: isLight ? '4px solid #3A3358' : '4px solid white' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          />
        </AnimatePresence>
      </div>

      <p className={`font-display text-4xl font-extrabold mb-6 ${isLight ? 'text-ink' : 'text-white'}`}>
        This is {color.name}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <BigButton color="white" size="sm" onClick={() => setIndex((i) => (i - 1 + colors.length) % colors.length)}>
          <Emoji text="⬅ Back" />
        </BigButton>
        <SpeakButton speak={speak} text={color.speech} muted={muted} speaking={speaking} />
        <BigButton color="white" size="sm" onClick={() => setIndex((i) => (i + 1) % colors.length)}>
          <Emoji text="Next ➡" />
        </BigButton>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-xl">
        {colors.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setIndex(i)}
            aria-label={c.name}
            className={`w-9 h-9 rounded-full border-2 ${i === index ? 'border-ink scale-110' : 'border-white/60'} transition-transform`}
            style={{ background: c.hex }}
          />
        ))}
      </div>

      <button
        onClick={toggleMute}
        className={`mt-6 text-sm font-bold underline ${isLight ? 'text-ink/60' : 'text-white/80'}`}
      >
        {muted ? 'Sound is off — tap to turn on' : 'Sound is on — tap to mute'}
      </button>
    </motion.div>
  )
}
