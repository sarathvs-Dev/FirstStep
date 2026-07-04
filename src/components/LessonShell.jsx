import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaRedo, FaPlay, FaPause } from 'react-icons/fa'
import BigButton from './BigButton.jsx'
import SpeakButton from './SpeakButton.jsx'
import ProgressBar from './ProgressBar.jsx'
import { useSpeech } from '../hooks/useSpeech.js'
import { useProgress } from '../hooks/useProgress.js'

/**
 * LessonShell
 * Shared chrome for every "flip through a set of flashcards" lesson page
 * (Alphabets, Numbers, Animals, Birds, Fruits, Words). Handles: index
 * state, previous/next, repeat, autoplay, speech-on-change, per-item
 * completion + progress bar. Each page supplies its own data list and a
 * render function for the big visual, so the pages themselves stay tiny
 * and content lives only in JSON.
 */
export default function LessonShell({ items, category, getId, getSpeech, renderVisual, accent = 'sky' }) {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const { speak, stop, speaking, muted, toggleMute } = useSpeech()
  const { completeLesson, categoryProgress } = useProgress()

  const item = items[index]
  const { percent } = categoryProgress(category, items.length)

  const goTo = useCallback(
    (i) => {
      const clamped = (i + items.length) % items.length
      setIndex(clamped)
    },
    [items.length]
  )

  // Speak + mark complete whenever the visible card changes
  useEffect(() => {
    if (!item) return
    speak(getSpeech(item))
    completeLesson(category, getId(item))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // Autoplay advances to the next card a beat after speech finishes
  useEffect(() => {
    if (!autoplay) return
    if (speaking) return
    const t = setTimeout(() => goTo(index + 1), 1200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, speaking, index])

  if (!item) return null

  return (
    <div className="max-w-3xl mx-auto px-4">
      <ProgressBar percent={percent} label={`Progress: ${index + 1} of ${items.length}`} color={accent} />

      <div className="relative mt-6 min-h-[420px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={getId(item)}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-white rounded-blob shadow-soft p-8 sm:p-12 text-center"
          >
            {renderVisual(item)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <BigButton icon={<FaArrowLeft />} color="white" size="sm" onClick={() => goTo(index - 1)} ariaLabel="Previous">
          Back
        </BigButton>
        <SpeakButton speak={speak} text={getSpeech(item)} muted={muted} speaking={speaking} />
        <BigButton
          icon={autoplay ? <FaPause /> : <FaPlay />}
          color={autoplay ? 'coral' : 'grass'}
          size="sm"
          onClick={() => setAutoplay((a) => !a)}
          ariaLabel="Toggle autoplay"
        >
          {autoplay ? 'Stop' : 'Auto Play'}
        </BigButton>
        <BigButton icon={<FaRedo />} color="white" size="sm" onClick={() => speak(getSpeech(item))} ariaLabel="Repeat">
          Repeat
        </BigButton>
        <BigButton icon={<FaArrowRight />} color={accent} size="sm" onClick={() => goTo(index + 1)} ariaLabel="Next">
          Next
        </BigButton>
      </div>

      <button
        onClick={() => {
          stop()
          toggleMute()
        }}
        className="block mx-auto mt-4 text-sm font-bold text-ink/50 underline"
      >
        {muted ? 'Sound is off — tap to turn on' : 'Sound is on — tap to mute'}
      </button>
    </div>
  )
}
