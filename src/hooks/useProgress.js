import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'sunny-steps-progress'

const defaultProgress = {
  stars: 0,
  streak: 0,
  lastVisit: null,
  completedLessons: {}, // { "alphabet:A": true, "numbers:5": true, ... }
  quizBest: 0,
  achievements: [],
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultProgress }
    return { ...defaultProgress, ...JSON.parse(raw) }
  } catch {
    return { ...defaultProgress }
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore storage errors (e.g. private browsing) */
  }
}

function isSameDay(a, b) {
  if (!a || !b) return false
  const da = new Date(a)
  const db = new Date(b)
  return da.toDateString() === db.toDateString()
}

function isYesterday(a, b) {
  if (!a || !b) return false
  const da = new Date(a)
  const db = new Date(b)
  const diff = (db - da) / (1000 * 60 * 60 * 24)
  return Math.round(diff) === 1
}

/**
 * useProgress
 * Tracks lesson completion, stars, quiz scores, and daily streak in
 * localStorage so a child's progress survives closing the browser tab.
 */
export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  // Bump the daily streak once per day, first time the app is opened.
  useEffect(() => {
    setProgress((p) => {
      const today = new Date().toISOString()
      if (isSameDay(p.lastVisit, today)) return p
      const next = {
        ...p,
        streak: isYesterday(p.lastVisit, today) ? p.streak + 1 : p.lastVisit ? 1 : p.streak || 1,
        lastVisit: today,
      }
      saveProgress(next)
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addStars = useCallback((amount = 1) => {
    setProgress((p) => {
      const next = { ...p, stars: p.stars + amount }
      saveProgress(next)
      return next
    })
  }, [])

  const completeLesson = useCallback((category, id) => {
    const key = `${category}:${id}`
    setProgress((p) => {
      if (p.completedLessons[key]) return p
      const next = {
        ...p,
        completedLessons: { ...p.completedLessons, [key]: true },
        stars: p.stars + 1,
      }
      saveProgress(next)
      return next
    })
  }, [])

  const isLessonComplete = useCallback(
    (category, id) => !!progress.completedLessons[`${category}:${id}`],
    [progress.completedLessons]
  )

  const categoryProgress = useCallback(
    (category, total) => {
      const done = Object.keys(progress.completedLessons).filter((k) => k.startsWith(`${category}:`)).length
      return { done, total, percent: total ? Math.round((done / total) * 100) : 0 }
    },
    [progress.completedLessons]
  )

  const recordQuizScore = useCallback((score) => {
    setProgress((p) => {
      const next = {
        ...p,
        quizBest: Math.max(p.quizBest, score),
        stars: p.stars + score,
      }
      saveProgress(next)
      return next
    })
  }, [])

  const unlockAchievement = useCallback((name) => {
    setProgress((p) => {
      if (p.achievements.includes(name)) return p
      const next = { ...p, achievements: [...p.achievements, name] }
      saveProgress(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const fresh = { ...defaultProgress }
    saveProgress(fresh)
    setProgress(fresh)
  }, [])

  return {
    progress,
    addStars,
    completeLesson,
    isLessonComplete,
    categoryProgress,
    recordQuizScore,
    unlockAchievement,
    resetProgress,
  }
}
