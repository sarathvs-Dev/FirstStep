import { motion } from 'framer-motion'

export default function ProgressBar({ percent = 0, label, color = 'grass' }) {
  const colorMap = {
    grass: '#5FCB6C',
    sky: '#4FC3F7',
    sun: '#FFC93C',
    coral: '#FF7E79',
  }
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm font-bold text-ink/70">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        className="w-full h-5 bg-white rounded-full shadow-inner overflow-hidden border-2 border-ink/5"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: colorMap[color] }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
