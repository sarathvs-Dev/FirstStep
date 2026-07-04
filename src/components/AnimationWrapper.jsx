import { motion } from 'framer-motion'

/**
 * AnimationWrapper
 * Wraps every page with the same gentle fade + rise-in transition so
 * navigating the app always feels smooth and predictable.
 */
export default function AnimationWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-[70vh]"
    >
      {children}
    </motion.div>
  )
}
