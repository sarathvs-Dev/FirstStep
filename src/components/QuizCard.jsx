import { useState } from 'react'
import { motion } from 'framer-motion'
import Emoji from './Emoji.jsx'

/**
 * QuizCard
 * Renders one quiz question with big tappable options. Wrong answers get a
 * gentle shake + "Try Again" instead of any negative language, correct
 * answers bubble up to the parent so it can show confetti / advance.
 */
export default function QuizCard({ question, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState(null) // 'correct' | 'wrong' | null

  const handlePick = (option) => {
    setSelected(option)
    const isRight = option === question.answer
    setStatus(isRight ? 'correct' : 'wrong')
    if (isRight) {
      onCorrect?.()
    } else {
      onWrong?.()
      setTimeout(() => {
        setStatus(null)
        setSelected(null)
      }, 900)
    }
  }

  return (
    <div className="bg-white rounded-blob shadow-soft p-8 max-w-xl mx-auto text-center">
      <h3 className="font-display text-2xl font-bold mb-6">{question.prompt}</h3>

      {question.type === 'color' && (
        <div
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-soft"
          style={{ background: question.answerHex }}
          aria-hidden="true"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isSelected = selected === option
          const showCorrect = status && option === question.answer
          const showWrong = isSelected && status === 'wrong'
          return (
            <motion.button
              key={option}
              onClick={() => handlePick(option)}
              disabled={status === 'correct'}
              animate={showWrong ? { x: [0, -8, 8, -8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`font-display text-3xl rounded-2xl py-6 shadow-pop border-4 transition-colors
                ${showCorrect ? 'bg-grass/20 border-grass' : showWrong ? 'bg-coral/20 border-coral' : 'bg-cream border-transparent hover:border-sky'}
              `}
            >
              <Emoji text={String(option)} />
            </motion.button>
          )
        })}
      </div>

      {status === 'wrong' && (
        <p className="mt-4 font-bold text-coral"><Emoji text="Try again — you can do it! 💪" /></p>
      )}
      {status === 'correct' && (
        <p className="mt-4 font-bold text-grass"><Emoji text="Yes! Wonderful! 🎉" /></p>
      )}
    </div>
  )
}
