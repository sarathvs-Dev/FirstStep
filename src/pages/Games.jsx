import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BigButton from '../components/BigButton.jsx'
import FruitBasketGame from '../components/games/FruitBasketGame.jsx'
import AnimalMatchGame from '../components/games/AnimalMatchGame.jsx'
import BalloonPopGame from '../components/games/BalloonPopGame.jsx'
import MemoryGame from '../components/games/MemoryGame.jsx'
import Emoji from '../components/Emoji.jsx'

const games = [
  { key: 'fruit', label: 'Fruit Basket', emoji: '🧺', colorClass: 'bg-coral', Component: FruitBasketGame },
  { key: 'animal', label: 'Animal Match', emoji: '🐾', colorClass: 'bg-grass', Component: AnimalMatchGame },
  { key: 'balloon', label: 'Balloon Pop', emoji: '🎈', colorClass: 'bg-sky', Component: BalloonPopGame },
  { key: 'memory', label: 'Memory Cards', emoji: '🧠', colorClass: 'bg-grape', Component: MemoryGame },
]

export default function Games() {
  const [active, setActive] = useState(null)
  const ActiveGame = games.find((g) => g.key === active)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-8"><Emoji text="🎮 Mini Games" /></h1>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {games.map((g) => (
              <motion.button
                key={g.key}
                onClick={() => setActive(g.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-blob shadow-soft p-8 flex flex-col items-center gap-2 ${g.colorClass} text-white`}
              >
                <span className="text-5xl"><Emoji text={g.emoji} /></span>
                <span className="font-display text-xl font-bold">{g.label}</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white rounded-blob shadow-soft p-6 sm:p-10">
              <ActiveGame.Component />
            </div>
            <div className="text-center mt-6">
              <BigButton color="white" onClick={() => setActive(null)}><Emoji text="⬅ Back to Games" /></BigButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
