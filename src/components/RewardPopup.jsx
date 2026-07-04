import { AnimatePresence, motion } from 'framer-motion'
import Confetti from './Confetti.jsx'
import BigButton from './BigButton.jsx'
import Emoji from './Emoji.jsx'

/**
 * RewardPopup
 * Positive-reinforcement-only popup. There is no "you failed" version of
 * this component by design — mistakes are handled gently inline instead.
 */
export default function RewardPopup({ open, title = 'Great Job!', message = "You're doing amazing!", emoji = '🌟', onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <Confetti />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-white rounded-blob shadow-soft px-8 py-10 max-w-sm w-full text-center"
            >
              <motion.div
                className="text-7xl mb-3"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Emoji text={emoji} />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-ink mb-2">{title}</h2>
              <p className="text-lg text-ink/70 mb-6">{message}</p>
              <BigButton color="grass" onClick={onClose} icon="👍">
                Continue
              </BigButton>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
