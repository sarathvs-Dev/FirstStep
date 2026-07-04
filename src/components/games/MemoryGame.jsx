import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BigButton from '../BigButton.jsx'
import Emoji from '../Emoji.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { useProgress } from '../../hooks/useProgress.js'

const EMOJIS = ['🐱', '🐶', '🐰', '🐸', '🦁', '🐼', '🐵', '🦋']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildDeck() {
  const chosen = shuffle(EMOJIS).slice(0, 6)
  return shuffle(
    chosen.flatMap((emoji, i) => [
      { uid: `${i}-a`, emoji, matched: false },
      { uid: `${i}-b`, emoji, matched: false },
    ])
  )
}

/**
 * MemoryGame
 * Classic flip-two-cards memory matching, sized down to 12 cards (6
 * pairs) so it stays achievable for young players and doesn't overload
 * working memory.
 */
export default function MemoryGame() {
  const [deck, setDeck] = useState(buildDeck)
  const [flipped, setFlipped] = useState([])
  const [matchedCount, setMatchedCount] = useState(0)
  const { speak } = useSpeech()
  const { addStars, unlockAchievement } = useProgress()

  const allMatched = matchedCount === deck.length / 2

  useEffect(() => {
    if (flipped.length !== 2) return
    const [a, b] = flipped
    const cardA = deck.find((c) => c.uid === a)
    const cardB = deck.find((c) => c.uid === b)
    const isMatch = cardA.emoji === cardB.emoji
    const t = setTimeout(() => {
      if (isMatch) {
        setDeck((d) => d.map((c) => (c.uid === a || c.uid === b ? { ...c, matched: true } : c)))
        setMatchedCount((m) => {
          const next = m + 1
          if (next === deck.length / 2) unlockAchievement('Memory Master')
          return next
        })
        addStars(1)
        speak('Match found!')
      }
      setFlipped([])
    }, 700)
    return () => clearTimeout(t)
    // eslint-disable-next-line
  }, [flipped])

  const handleFlip = (card) => {
    if (flipped.length === 2 || card.matched || flipped.includes(card.uid)) return
    setFlipped((f) => [...f, card.uid])
  }

  const reset = () => {
    setDeck(buildDeck())
    setFlipped([])
    setMatchedCount(0)
  }

  return (
    <div className="text-center">
      <p className="font-bold text-ink/60 mb-4">Matched {matchedCount} of {deck.length / 2} pairs</p>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-6">
        {deck.map((card) => {
          const isFlipped = card.matched || flipped.includes(card.uid)
          return (
            <motion.button
              key={card.uid}
              onClick={() => handleFlip(card)}
              className="aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-pop"
              style={{ background: isFlipped ? '#FFFBF2' : '#4FC3F7' }}
              whileTap={{ scale: 0.9 }}
              animate={card.matched ? { scale: [1, 1.15, 1] } : {}}
              aria-label={isFlipped ? card.emoji : 'Hidden card'}
            >
              <Emoji text={isFlipped ? card.emoji : '❓'} />
            </motion.button>
          )
        })}
      </div>
      {allMatched && (
        <div>
          <p className="font-display text-2xl font-bold text-grass mb-4"><Emoji text="You found them all! 🎉" /></p>
          <BigButton color="grass" onClick={reset}>Play Again</BigButton>
        </div>
      )}
    </div>
  )
}
