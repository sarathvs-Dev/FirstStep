import { useState } from 'react'
import { motion } from 'framer-motion'
import animals from '../data/animals.json'
import LessonShell from '../components/LessonShell.jsx'
import BigButton from '../components/BigButton.jsx'
import Emoji from '../components/Emoji.jsx'
import { useSpeech } from '../hooks/useSpeech.js'

const moves = {
  walk: { x: [0, 12, 0, -12, 0], transition: { duration: 2, repeat: Infinity } },
  blink: { scaleY: [1, 0.1, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } },
  jump: { y: [0, -30, 0], transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.6 } },
}

function AnimalStage({ animal }) {
  const [move, setMove] = useState('walk')
  const { speak } = useSpeech()

  return (
    <div>
      <motion.div className="text-8xl my-2" animate={moves[move]}>
        <Emoji text={animal.emoji} />
      </motion.div>
      <p className="font-display text-3xl font-bold text-ink mb-1">{animal.name}</p>
      <p className="text-ink/60 font-semibold mb-4"><Emoji text="🔊" /> {animal.sound}</p>
      <p className="max-w-sm mx-auto text-ink/70 mb-4">{animal.fact}</p>
      <div className="flex justify-center gap-2 flex-wrap">
        <BigButton size="sm" color={move === 'walk' ? 'sky' : 'white'} onClick={() => setMove('walk')}>
          <Emoji text="🚶 Walk" />
        </BigButton>
        <BigButton size="sm" color={move === 'blink' ? 'sky' : 'white'} onClick={() => setMove('blink')}>
          <Emoji text="😉 Blink" />
        </BigButton>
        <BigButton size="sm" color={move === 'jump' ? 'sky' : 'white'} onClick={() => setMove('jump')}>
          <Emoji text="🤸 Jump" />
        </BigButton>
        <BigButton size="sm" color="sun" onClick={() => speak(animal.sound)}>
          <Emoji text="🔊 Sound" />
        </BigButton>
      </div>
    </div>
  )
}

export default function Animals() {
  return (
    <div className="py-8">
      <h1 className="text-center font-display text-4xl font-extrabold text-ink mb-6"><Emoji text="🐘 Meet the Animals" /></h1>
      <LessonShell
        items={animals}
        category="animals"
        getId={(a) => a.id}
        getSpeech={(a) => a.speech}
        accent="grass"
        renderVisual={(a) => <AnimalStage animal={a} />}
      />
    </div>
  )
}
