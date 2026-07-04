import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import animals from '../../data/animals.json'
import BigButton from '../BigButton.jsx'
import Emoji from '../Emoji.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { useProgress } from '../../hooks/useProgress.js'

const ROUNDS = 8

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildRound(all, correct) {
  const distractors = shuffle(all.filter((a) => a.id !== correct.id)).slice(0, 3)
  return shuffle([correct, ...distractors])
}

/**
 * AnimalMatchGame
 * Shows a large animal picture; the child taps the matching name from
 * four choices. Correct answers add a star and move to the next round.
 */
export default function AnimalMatchGame() {
  const [order] = useState(() => shuffle(animals).slice(0, ROUNDS))
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)
  const { speak } = useSpeech()
  const { addStars, unlockAchievement } = useProgress()

  const correct = order[round]
  const [options, setOptions] = useState(() => buildRound(animals, order[0]))

  useEffect(() => {
    if (!correct) return
    speak(`Which animal is this?`)
    setPicked(null)
    setOptions(buildRound(animals, correct))
    // eslint-disable-next-line
  }, [round])

  if (!correct) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl font-bold text-grass mb-4"><Emoji text="You matched them all! 🎉" /></p>
        <BigButton color="grass" onClick={() => window.location.reload()}>Play Again</BigButton>
      </div>
    )
  }

  const handlePick = (opt) => {
    setPicked(opt.id)
    const right = opt.id === correct.id
    speak(right ? 'Correct!' : 'Try again!')
    if (right) {
      addStars(1)
      setTimeout(() => {
        if (round === order.length - 1) {
          unlockAchievement('Animal Matcher')
          setRound(round + 1)
        } else {
          setRound((r) => r + 1)
        }
      }, 700)
    } else {
      setTimeout(() => setPicked(null), 700)
    }
  }

  return (
    <div className="text-center">
      <p className="font-bold text-ink/60 mb-2">Round {round + 1} of {order.length}</p>
      <motion.div key={correct.id} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-8xl mb-6">
        <Emoji text={correct.emoji} />
      </motion.div>
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => handlePick(opt)}
            whileTap={{ scale: 0.92 }}
            className={`font-display font-bold text-lg rounded-2xl py-4 border-4 ${
              picked === opt.id
                ? opt.id === correct.id
                  ? 'bg-grass/20 border-grass'
                  : 'bg-coral/20 border-coral'
                : 'bg-cream border-transparent hover:border-sky'
            }`}
          >
            {opt.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
