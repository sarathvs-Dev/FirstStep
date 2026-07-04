import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BigButton from '../BigButton.jsx'
import Emoji from '../Emoji.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { useProgress } from '../../hooks/useProgress.js'

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ROUNDS = 8
const BALLOON_COLORS = ['#FF7E79', '#4FC3F7', '#FFC93C', '#5FCB6C', '#B18CFF', '#FF8FD8']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * BalloonPopGame
 * A target letter is announced; four floating balloons carry letters and
 * the child taps the balloon that matches. Popping plays a little
 * "pop" scale-out animation plus a happy sound via speech synthesis.
 */
export default function BalloonPopGame() {
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState(() => shuffle(ALL_LETTERS)[0])
  const [balloons, setBalloons] = useState([])
  const [popped, setPopped] = useState(null)
  const { speak } = useSpeech()
  const { addStars, unlockAchievement } = useProgress()

  const setupRound = () => {
    const t = shuffle(ALL_LETTERS)[0]
    const distractors = shuffle(ALL_LETTERS.filter((l) => l !== t)).slice(0, 3)
    const options = shuffle([t, ...distractors]).map((letter, i) => ({
      id: `${round}-${letter}-${i}`,
      letter,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      left: 10 + i * 22,
      delay: i * 0.3,
    }))
    setTarget(t)
    setBalloons(options)
    setPopped(null)
    speak(`Find the letter ${t}`)
  }

  useEffect(() => {
    setupRound()
    // eslint-disable-next-line
  }, [round])

  if (round >= ROUNDS) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl font-bold text-grass mb-4"><Emoji text="All balloons popped! 🎈" /></p>
        <BigButton color="grass" onClick={() => window.location.reload()}>Play Again</BigButton>
      </div>
    )
  }

  const handlePop = (balloon) => {
    if (popped) return
    setPopped(balloon.id)
    const right = balloon.letter === target
    speak(right ? 'Pop! Correct!' : 'Try again!')
    if (right) addStars(1)
    setTimeout(() => {
      if (right) {
        if (round === ROUNDS - 1) unlockAchievement('Balloon Popper')
        setRound((r) => r + 1)
      } else {
        setPopped(null)
      }
    }, 600)
  }

  return (
    <div className="text-center">
      <p className="font-bold text-ink/60 mb-2">Round {round + 1} of {ROUNDS}</p>
      <p className="font-display text-3xl font-extrabold text-ink mb-6">Find the letter: {target}</p>
      <div className="relative h-64">
        <AnimatePresence>
          {balloons.map((b) => (
            <motion.button
              key={b.id}
              onClick={() => handlePop(b)}
              className="absolute bottom-0 flex flex-col items-center"
              style={{ left: `${b.left}%` }}
              initial={{ y: 260, opacity: 0 }}
              animate={
                popped === b.id
                  ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] }
                  : { y: [260, 0], opacity: 1 }
              }
              transition={popped === b.id ? { duration: 0.4 } : { duration: 1.6, delay: b.delay, ease: 'easeOut' }}
              aria-label={`Balloon with letter ${b.letter}`}
            >
              <svg width="70" height="90" viewBox="0 0 70 90">
                <ellipse cx="35" cy="35" rx="32" ry="35" fill={b.color} />
                <line x1="35" y1="70" x2="35" y2="88" stroke="#3A3358" strokeWidth="2" />
              </svg>
              <span className="absolute top-6 font-display text-3xl font-extrabold text-white">{b.letter}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
