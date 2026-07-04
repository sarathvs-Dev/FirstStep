import { motion } from 'framer-motion'
import Emoji from './Emoji.jsx'

const colorMap = {
  sky: 'bg-sky text-white',
  sun: 'bg-sun text-ink',
  grass: 'bg-grass text-white',
  coral: 'bg-coral text-white',
  grape: 'bg-grape text-white',
  bubblegum: 'bg-bubblegum text-white',
  white: 'bg-white text-ink border-4 border-ink/10',
}

/**
 * BigButton
 * A large, high-contrast, touch-friendly button used everywhere in the app.
 * Designed for small motor skills: big hit area, clear pressed state,
 * no reliance on color alone (icon + label together).
 */
export default function BigButton({
  children,
  icon,
  onClick,
  color = 'sky',
  size = 'md',
  className = '',
  ariaLabel,
  disabled = false,
  type = 'button',
}) {
  const sizes = {
    sm: 'text-lg px-5 py-3 gap-2',
    md: 'text-xl px-7 py-4 gap-3',
    lg: 'text-2xl px-9 py-5 gap-3',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      className={`font-display font-bold rounded-full shadow-pop active:shadow-none active:translate-y-1 transition-shadow flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed ${colorMap[color]} ${sizes[size]} ${className}`}
    >
      {icon && (
        <span className="text-2xl" aria-hidden="true">
          {typeof icon === 'string' ? <Emoji text={icon} /> : icon}
        </span>
      )}
      {children}
    </motion.button>
  )
}
