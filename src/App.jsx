import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingBackground from './components/FloatingBackground.jsx'
import AnimationWrapper from './components/AnimationWrapper.jsx'
import { useSpeech } from './hooks/useSpeech.js'
import { useProgress } from './hooks/useProgress.js'

import Home from './pages/Home.jsx'
import Alphabets from './pages/Alphabets.jsx'
import Numbers from './pages/Numbers.jsx'
import Animals from './pages/Animals.jsx'
import Birds from './pages/Birds.jsx'
import Fruits from './pages/Fruits.jsx'
import Colors from './pages/Colors.jsx'
import Objects from './pages/Objects.jsx'
import Words from './pages/Words.jsx'
import Math from './pages/Math.jsx'
import Quiz from './pages/Quiz.jsx'
import Games from './pages/Games.jsx'
import Progress from './pages/Progress.jsx'

export default function App() {
  const location = useLocation()
  const { muted, toggleMute } = useSpeech()
  const { progress } = useProgress()

  return (
    <div className="min-h-screen flex flex-col font-body">
      <FloatingBackground />
      <Navbar stars={progress.stars} muted={muted} toggleMute={toggleMute} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimationWrapper><Home /></AnimationWrapper>} />
            <Route path="/alphabets" element={<AnimationWrapper><Alphabets /></AnimationWrapper>} />
            <Route path="/numbers" element={<AnimationWrapper><Numbers /></AnimationWrapper>} />
            <Route path="/animals" element={<AnimationWrapper><Animals /></AnimationWrapper>} />
            <Route path="/birds" element={<AnimationWrapper><Birds /></AnimationWrapper>} />
            <Route path="/fruits" element={<AnimationWrapper><Fruits /></AnimationWrapper>} />
            <Route path="/colors" element={<AnimationWrapper><Colors /></AnimationWrapper>} />
            <Route path="/objects" element={<AnimationWrapper><Objects /></AnimationWrapper>} />
            <Route path="/words" element={<AnimationWrapper><Words /></AnimationWrapper>} />
            <Route path="/math" element={<AnimationWrapper><Math /></AnimationWrapper>} />
            <Route path="/quiz" element={<AnimationWrapper><Quiz /></AnimationWrapper>} />
            <Route path="/games" element={<AnimationWrapper><Games /></AnimationWrapper>} />
            <Route path="/progress" element={<AnimationWrapper><Progress /></AnimationWrapper>} />
            <Route path="*" element={<AnimationWrapper><Home /></AnimationWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
