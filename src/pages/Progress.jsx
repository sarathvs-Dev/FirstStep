import { motion } from 'framer-motion'
import { FaStar, FaFire, FaTrophy } from 'react-icons/fa'
import { useProgress } from '../hooks/useProgress.js'
import ProgressBar from '../components/ProgressBar.jsx'
import BigButton from '../components/BigButton.jsx'
import Emoji from '../components/Emoji.jsx'
import alphabet from '../data/alphabet.json'
import numbers from '../data/numbers.json'
import animals from '../data/animals.json'
import birds from '../data/birds.json'
import fruits from '../data/fruits.json'
import colors from '../data/colors.json'
import objects from '../data/objects.json'
import words from '../data/words.json'

const categories = [
  { key: 'alphabet', label: 'Alphabets', data: alphabet, color: 'sky' },
  { key: 'numbers', label: 'Numbers', data: numbers, color: 'sun' },
  { key: 'animals', label: 'Animals', data: animals, color: 'grass' },
  { key: 'birds', label: 'Birds', data: birds, color: 'sky' },
  { key: 'fruits', label: 'Fruits', data: fruits, color: 'coral' },
  { key: 'colors', label: 'Colors', data: colors, color: 'bubblegum' },
  { key: 'objects', label: 'Objects', data: objects, color: 'sun' },
  { key: 'words', label: 'Words', data: words, color: 'grape' },
]

export default function Progress() {
  const { progress, categoryProgress, resetProgress } = useProgress()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-8"><Emoji text="⭐ My Progress" /></h1>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-blob shadow-soft p-5 text-center">
          <FaStar className="text-sun text-3xl mx-auto mb-2" />
          <p className="font-display text-2xl font-extrabold">{progress.stars}</p>
          <p className="text-xs font-bold text-ink/50">Stars</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-blob shadow-soft p-5 text-center">
          <FaFire className="text-coral text-3xl mx-auto mb-2" />
          <p className="font-display text-2xl font-extrabold">{progress.streak}</p>
          <p className="text-xs font-bold text-ink/50">Day Streak</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-blob shadow-soft p-5 text-center">
          <FaTrophy className="text-grape text-3xl mx-auto mb-2" />
          <p className="font-display text-2xl font-extrabold">{progress.quizBest}</p>
          <p className="text-xs font-bold text-ink/50">Best Quiz Score</p>
        </motion.div>
      </div>

      <h2 className="font-display text-2xl font-bold text-ink mb-4">Lesson Completion</h2>
      <div className="space-y-4 mb-10">
        {categories.map((c) => {
          const { done, total, percent } = categoryProgress(c.key, c.data.length)
          return (
            <div key={c.key} className="bg-white rounded-2xl shadow-soft p-4">
              <ProgressBar percent={percent} label={`${c.label} (${done}/${total})`} color={c.color === 'sun' ? 'sun' : c.color === 'coral' ? 'coral' : c.color === 'sky' ? 'sky' : 'grass'} />
            </div>
          )
        })}
      </div>

      {progress.achievements.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-3">
            {progress.achievements.map((a) => (
              <span key={a} className="bg-sun/20 text-ink font-bold rounded-full px-4 py-2 flex items-center gap-2">
                <Emoji text="🏅" /> {a}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <BigButton
          color="white"
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) resetProgress()
          }}
        >
          Reset Progress
        </BigButton>
      </div>
    </div>
  )
}
