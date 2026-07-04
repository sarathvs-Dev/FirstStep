import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import mathData from '../data/math.json'
import BigButton from '../components/BigButton.jsx'
import RewardPopup from '../components/RewardPopup.jsx'
import Emoji from '../components/Emoji.jsx'
import { useSpeech } from '../hooks/useSpeech.js'
import { useProgress } from '../hooks/useProgress.js'

const tabs = [
  { key: 'addition', label: 'Addition', emoji: '➕' },
  { key: 'subtraction', label: 'Subtraction', emoji: '➖' },
  { key: 'counting', label: 'Counting', emoji: '🔢' },
  { key: 'missingNumber', label: 'Missing Number', emoji: '❓' },
  { key: 'numberMatching', label: 'Number Match', emoji: '🔗' },
  { key: 'compare', label: 'Greater / Less', emoji: '⚖️' },
]

function AdditionProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    speak(`${p.a} plus ${p.b}. What does that make?`)
    setRevealed(false)
    // eslint-disable-next-line
  }, [p.id])
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 text-5xl mb-4 flex-wrap">
        <span><Emoji text={p.emoji.repeat(p.a)} /></span>
        <span className="font-display font-extrabold text-grass">+</span>
        <span><Emoji text={p.emoji.repeat(p.b)} /></span>
        <span className="font-display font-extrabold text-grass">=</span>
        <span className="font-display font-extrabold text-ink">{revealed ? p.answer : '?'}</span>
      </div>
      <BigButton
        color="grass"
        onClick={() => {
          setRevealed(true)
          speak(p.speech)
          onSolved()
        }}
      >
        Show Answer
      </BigButton>
    </div>
  )
}

function SubtractionProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    speak(`${p.a} minus ${p.b}. What does that make?`)
    setRevealed(false)
    // eslint-disable-next-line
  }, [p.id])
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 text-5xl mb-4 flex-wrap">
        <span><Emoji text={p.emoji.repeat(p.a)} /></span>
        <span className="font-display font-extrabold text-coral">−</span>
        <span><Emoji text={p.emoji.repeat(p.b)} /></span>
        <span className="font-display font-extrabold text-coral">=</span>
        <span className="font-display font-extrabold text-ink">{revealed ? p.answer : '?'}</span>
      </div>
      <BigButton
        color="coral"
        onClick={() => {
          setRevealed(true)
          speak(p.speech)
          onSolved()
        }}
      >
        Show Answer
      </BigButton>
    </div>
  )
}

function CountingProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  useEffect(() => {
    speak(p.speech)
    onSolved()
    // eslint-disable-next-line
  }, [p.id])
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-2 mb-4 max-w-md mx-auto">
        {Array.from({ length: p.count }).map((_, i) => (
          <motion.span
            key={i}
            className="text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <Emoji text={p.emoji} />
          </motion.span>
        ))}
      </div>
      <p className="font-display text-3xl font-bold text-sun">{p.count}</p>
    </div>
  )
}

function MissingNumberProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  const [picked, setPicked] = useState(null)
  useEffect(() => {
    speak(p.speech)
    setPicked(null)
    // eslint-disable-next-line
  }, [p.id])
  const choices = [p.answer, p.answer + 1, Math.max(0, p.answer - 1)].filter(
    (v, i, arr) => arr.indexOf(v) === i
  )
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 text-4xl font-display font-extrabold mb-6 flex-wrap">
        {p.sequence.map((n, i) => (
          <span key={i} className={n === null ? 'text-grape bg-grape/10 rounded-xl px-3' : 'text-ink'}>
            {n === null ? '?' : n}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {choices.map((c) => (
          <BigButton
            key={c}
            color={picked === c ? (c === p.answer ? 'grass' : 'coral') : 'white'}
            onClick={() => {
              setPicked(c)
              if (c === p.answer) {
                speak(`Yes, ${c} is correct!`)
                onSolved()
              } else {
                speak('Try again!')
              }
            }}
          >
            {c}
          </BigButton>
        ))}
      </div>
    </div>
  )
}

function NumberMatchProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  const [picked, setPicked] = useState(null)
  useEffect(() => {
    speak('How many do you see?')
    setPicked(null)
    // eslint-disable-next-line
  }, [p.id])
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-md mx-auto">
        {Array.from({ length: p.value }).map((_, i) => (
          <span key={i} className="text-4xl"><Emoji text={p.emoji} /></span>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {p.options.map((o) => (
          <BigButton
            key={o}
            color={picked === o ? (o === p.value ? 'grass' : 'coral') : 'white'}
            onClick={() => {
              setPicked(o)
              if (o === p.value) {
                speak(`Yes, ${o}!`)
                onSolved()
              } else {
                speak('Try again!')
              }
            }}
          >
            {o}
          </BigButton>
        ))}
      </div>
    </div>
  )
}

function CompareProblem({ p, onSolved }) {
  const { speak } = useSpeech()
  const [picked, setPicked] = useState(null)
  useEffect(() => {
    speak(p.speech)
    setPicked(null)
    // eslint-disable-next-line
  }, [p.id])
  const options = ['greater', 'less', 'equal']
  const labels = { greater: 'Left has more', less: 'Right has more', equal: 'They are equal' }
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="flex flex-wrap max-w-[120px] gap-1 justify-center">
          {Array.from({ length: p.left }).map((_, i) => (
            <span key={i} className="text-3xl"><Emoji text={p.leftEmoji} /></span>
          ))}
        </div>
        <span className="font-display text-3xl font-extrabold text-ink/40">vs</span>
        <div className="flex flex-wrap max-w-[120px] gap-1 justify-center">
          {Array.from({ length: p.right }).map((_, i) => (
            <span key={i} className="text-3xl"><Emoji text={p.rightEmoji} /></span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        {options.map((o) => (
          <BigButton
            key={o}
            size="sm"
            color={picked === o ? (o === p.answer ? 'grass' : 'coral') : 'white'}
            onClick={() => {
              setPicked(o)
              if (o === p.answer) {
                speak('That is correct!')
                onSolved()
              } else {
                speak('Try again!')
              }
            }}
          >
            {labels[o]}
          </BigButton>
        ))}
      </div>
    </div>
  )
}

const componentMap = {
  addition: AdditionProblem,
  subtraction: SubtractionProblem,
  counting: CountingProblem,
  missingNumber: MissingNumberProblem,
  numberMatching: NumberMatchProblem,
  compare: CompareProblem,
}

export default function MathPage() {
  const [tab, setTab] = useState('addition')
  const [index, setIndex] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const { completeLesson } = useProgress()

  const list = mathData[tab]
  const problem = list[index % list.length]
  const ProblemComponent = componentMap[tab]

  const handleSolved = () => {
    completeLesson('math', problem.id)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="➕ Simple Math" /></h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key)
              setIndex(0)
            }}
            className={`font-display font-bold rounded-full px-4 py-2 text-sm sm:text-base transition-colors ${
              tab === t.key ? 'bg-grass text-white' : 'bg-white text-ink/70 hover:bg-grass/10'
            }`}
          >
            <Emoji text={t.emoji} /> {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-blob shadow-soft p-8 sm:p-10">
        <ProblemComponent key={problem.id} p={problem} onSolved={handleSolved} />
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <BigButton
          color="white"
          onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
        >
          <Emoji text="⬅ Back" />
        </BigButton>
        <BigButton
          color="grass"
          onClick={() => {
            if (index === list.length - 1) setShowReward(true)
            setIndex((i) => (i + 1) % list.length)
          }}
        >
          <Emoji text="Next ➡" />
        </BigButton>
      </div>

      <RewardPopup
        open={showReward}
        title="Math Star!"
        message="You finished this set of problems!"
        emoji="🧮"
        onClose={() => setShowReward(false)}
      />
    </div>
  )
}
