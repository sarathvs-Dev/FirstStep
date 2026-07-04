import { motion } from 'framer-motion'
import LessonCard from '../components/LessonCard.jsx'
import Emoji from '../components/Emoji.jsx'
import { useSpeech } from '../hooks/useSpeech.js'

const cards = [
  { to: '/alphabets', title: 'Alphabets', description: 'Learn A to Z', emoji: '🔤', color: 'sky' },
  { to: '/numbers', title: 'Numbers', description: 'Count 0 to 20', emoji: '🔢', color: 'sun' },
  { to: '/words', title: 'Simple Words', description: 'Read easy words', emoji: '📖', color: 'grape' },
  { to: '/animals', title: 'Animals', description: 'Meet 20 animals', emoji: '🐘', color: 'grass' },
  { to: '/birds', title: 'Birds', description: 'Meet friendly birds', emoji: '🦜', color: 'sky' },
  { to: '/fruits', title: 'Fruits', description: 'Yummy fruit names', emoji: '🍎', color: 'coral' },
  { to: '/colors', title: 'Colors', description: 'See every color', emoji: '🎨', color: 'bubblegum' },
  { to: '/objects', title: 'Objects', description: 'Things around us', emoji: '📦', color: 'sun' },
  { to: '/math', title: 'Simple Math', description: 'Add and count', emoji: '➕', color: 'grass' },
  { to: '/quiz', title: 'Quiz', description: 'Test what you know', emoji: '❓', color: 'coral' },
  { to: '/games', title: 'Mini Games', description: 'Play and learn', emoji: '🎮', color: 'grape' },
  { to: '/progress', title: 'My Progress', description: 'See your stars', emoji: '⭐', color: 'bubblegum' },
]

export default function Home() {
  const { speak } = useSpeech()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          className="text-7xl mb-3"
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Emoji text="🌈" />
        </motion.div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mb-2">
          Welcome to First Step!
        </h1>
        <p className="text-lg text-ink/60 font-semibold"><Emoji text="Tap a card to start a fun lesson 🎉" /></p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <LessonCard {...c} onHover={() => speak(c.title)} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
