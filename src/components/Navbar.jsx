import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaStar, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import Emoji from './Emoji.jsx'

const links = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/alphabets', label: 'ABC', emoji: '🔤' },
  { to: '/numbers', label: '123', emoji: '🔢' },
  { to: '/animals', label: 'Animals', emoji: '🐘' },
  { to: '/birds', label: 'Birds', emoji: '🦜' },
  { to: '/fruits', label: 'Fruits', emoji: '🍎' },
  { to: '/colors', label: 'Colors', emoji: '🎨' },
  { to: '/objects', label: 'Objects', emoji: '📦' },
  { to: '/words', label: 'Words', emoji: '📖' },
  { to: '/math', label: 'Math', emoji: '➕' },
  { to: '/quiz', label: 'Quiz', emoji: '❓' },
  { to: '/games', label: 'Games', emoji: '🎮' },
  { to: '/progress', label: 'Me', emoji: '⭐' },
]

export default function Navbar({ stars, muted, toggleMute }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-soft">
      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-3">
        <NavLink to="/" className="flex items-center gap-2 shrink-0 font-display text-xl font-extrabold text-skydark">
          <span className="text-2xl"><Emoji text="🌈" /></span>
          <span className="hidden sm:inline">First Step</span>
        </NavLink>

        <nav className="flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1.5 sm:gap-2 min-w-max px-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center rounded-2xl px-3 py-1.5 text-xs sm:text-sm font-bold transition-colors ${
                      isActive ? 'bg-sky text-white' : 'text-ink/70 hover:bg-sky/10'
                    }`
                  }
                >
                  <span className="text-lg"><Emoji text={l.emoji} /></span>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <motion.div
            className="flex items-center gap-1 bg-sun/20 text-ink font-bold rounded-full px-3 py-1.5"
            whileHover={{ scale: 1.05 }}
          >
            <FaStar className="text-sun" />
            <span>{stars}</span>
          </motion.div>
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            className="rounded-full bg-sky/10 text-skydark p-2.5 hover:bg-sky/20"
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    </header>
  )
}
