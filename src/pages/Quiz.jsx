import { useState } from 'react'
import quizData from '../data/quiz.json'
import QuizCard from '../components/QuizCard.jsx'
import RewardPopup from '../components/RewardPopup.jsx'
import BigButton from '../components/BigButton.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Emoji from '../components/Emoji.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { useSpeech } from '../hooks/useSpeech.js'

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const { recordQuizScore, unlockAchievement } = useProgress()
  const { speak } = useSpeech()

  const question = quizData[index]
  const isLast = index === quizData.length - 1

  const handleCorrect = () => {
    setScore((s) => s + 1)
    setTimeout(() => {
      if (isLast) {
        recordQuizScore(score + 1)
        if (score + 1 === quizData.length) unlockAchievement('Perfect Quiz')
        setFinished(true)
      } else {
        setIndex((i) => i + 1)
        speak(quizData[index + 1].prompt)
      }
    }, 900)
  }

  const restart = () => {
    setIndex(0)
    setScore(0)
    setFinished(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-4"><Emoji text="❓ Quiz Time" /></h1>
      <div className="max-w-sm mx-auto mb-8">
        <ProgressBar percent={Math.round((index / quizData.length) * 100)} label={`Question ${index + 1} of ${quizData.length}`} color="coral" />
      </div>

      <QuizCard question={question} onCorrect={handleCorrect} onWrong={() => {}} />

      <RewardPopup
        open={finished}
        title={score === quizData.length ? 'Perfect Score!' : 'Quiz Complete!'}
        message={`You got ${score} out of ${quizData.length} correct!`}
        emoji={score === quizData.length ? '🏆' : '🌟'}
        onClose={restart}
      />

      {finished && (
        <div className="text-center mt-4">
          <BigButton color="coral" onClick={restart}>
            Play Again
          </BigButton>
        </div>
      )}
    </div>
  )
}
