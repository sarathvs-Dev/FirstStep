import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fruits from '../../data/fruits.json'
import BigButton from '../BigButton.jsx'
import Emoji from '../Emoji.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { useProgress } from '../../hooks/useProgress.js'

const ROUND_SIZE = 6

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * FruitBasketGame
 * A simplified, touch-friendly take on "drag fruit into the basket":
 * tapping a fruit animates it flying down into the basket and increases
 * the score. Tap-to-collect is used instead of pointer drag-and-drop so
 * the game works equally well with a finger, a mouse, or a switch device.
 */
export default function FruitBasketGame() {
  const [pool] = useState(() => shuffle(fruits).slice(0, ROUND_SIZE))
  const [collected, setCollected] = useState([])
  const [flying, setFlying] = useState(null)
  const { speak } = useSpeech()
  const { addStars, unlockAchievement } = useProgress()

  const remaining = pool.filter((f) => !collected.includes(f.id) && flying !== f.id)
  const done = collected.length === pool.length

  const handleTap = (fruit) => {
    if (flying) return
    setFlying(fruit.id)
    speak(fruit.name)
    setTimeout(() => {
      setCollected((c) => {
        const next = [...c, fruit.id]
        if (next.length === pool.length) {
          addStars(2)
          unlockAchievement('Fruit Basket Champ')
        }
        return next
      })
      setFlying(null)
    }, 500)
  }

  const reset = () => window.location.reload()

  return (
    <div className="text-center">
      <p className="font-display text-xl font-bold text-ink mb-4">
        Tap each fruit to put it in the basket! ({collected.length}/{pool.length})
      </p>

      <div className="relative min-h-[220px] flex flex-wrap items-center justify-center gap-6 mb-6">
        <AnimatePresence>
          {remaining.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => handleTap(f)}
              className="text-6xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ y: { duration: 2, repeat: Infinity } }}
              aria-label={`Collect ${f.name}`}
            >
              <Emoji text={f.emoji} />
            </motion.button>
          ))}
        </AnimatePresence>

        {flying && (
          <motion.span
            className="absolute text-6xl"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 120, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <Emoji text={fruits.find((f) => f.id === flying)?.emoji} />
          </motion.span>
        )}
      </div>

      <div className="text-7xl mb-2"><Emoji text="🧺" /></div>
      <div className="flex flex-wrap justify-center gap-1 mb-6 min-h-[2.5rem]">
        {collected.map((id) => (
          <span key={id} className="text-2xl"><Emoji text={fruits.find((f) => f.id === id)?.emoji} /></span>
        ))}
      </div>

      {done && (
        <div>
          <p className="font-display text-2xl font-bold text-grass mb-4"><Emoji text="All done! Great job! 🎉" /></p>
          <BigButton color="grass" onClick={reset}>Play Again</BigButton>
        </div>
      )}
    </div>
  )
}
