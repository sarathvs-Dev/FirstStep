import { motion } from 'framer-motion'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

/**
 * SpeakButton
 * A single round button that reads the given text aloud. Shared across
 * every lesson card so children always have one consistent "hear it again"
 * control, in the same spot, with the same icon.
 */
export default function SpeakButton({ speak, text, muted, speaking, size = 56, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={() => speak(text)}
      aria-label={muted ? 'Sound is muted' : `Hear "${text}" again`}
      whileTap={{ scale: 0.9 }}
      animate={speaking ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.6, repeat: speaking ? Infinity : 0 }}
      className={`flex items-center justify-center rounded-full bg-white shadow-soft text-skydark hover:bg-sky/10 ${className}`}
      style={{ width: size, height: size }}
    >
      {muted ? <FaVolumeMute size={size * 0.45} /> : <FaVolumeUp size={size * 0.45} />}
    </motion.button>
  )
}
