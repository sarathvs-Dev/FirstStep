import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useSpeech
 * A small, kid-friendly wrapper around the browser SpeechSynthesis API.
 * Provides speak(text), stop(), a "speaking" flag, and a global mute toggle
 * that persists to localStorage so a muted child doesn't get surprised
 * with sound the next time they open the app.
 */
export function useSpeech() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('sunny-steps-muted') === 'true'
    } catch {
      return false
    }
  })
  const [speaking, setSpeaking] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const voiceRef = useRef(null)

  useEffect(() => {
    if (!supported) return
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      // Prefer a friendly, clear English voice if available
      const preferred =
        voices.find((v) => /en-US|en-GB|en_/i.test(v.lang) && /female|child|samantha|zira/i.test(v.name)) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0]
      voiceRef.current = preferred || null
    }
    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice
  }, [supported])

  useEffect(() => {
    try {
      localStorage.setItem('sunny-steps-muted', String(muted))
    } catch {
      /* ignore storage errors */
    }
  }, [muted])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text, { rate = 0.85, pitch = 1.15 } = {}) => {
      if (!supported || muted || !text) return
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = rate
      utter.pitch = pitch
      utter.volume = 1
      if (voiceRef.current) utter.voice = voiceRef.current
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      utter.onerror = () => setSpeaking(false)
      window.speechSynthesis.speak(utter)
    },
    [supported, muted]
  )

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m) stop()
      return !m
    })
  }, [stop])

  return { speak, stop, speaking, muted, toggleMute, supported }
}
