import { useState, useCallback, useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'

export default function GradientText({
  children,
  className = '',
  colors = ['#50e6ff', '#0078d4', '#a259ff', '#50e6ff', '#0078d4'],
  animationSpeed = 5,
  pauseOnHover = true,
  yoyo = true,
}) {
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const animationDuration = animationSpeed * 1000

  useAnimationFrame(time => {
    if (isPaused) { lastTimeRef.current = null; return }
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return }
    const delta = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += delta
    if (yoyo) {
      const full = animationDuration * 2
      const t = elapsedRef.current % full
      progress.set(t < animationDuration ? (t / animationDuration) * 100 : 100 - ((t - animationDuration) / animationDuration) * 100)
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100)
    }
  })

  const backgroundPosition = useTransform(progress, p => `${p}% 50%`)
  const gradientColors = [...colors, colors[0]].join(', ')
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: '300% 100%',
    backgroundRepeat: 'repeat',
  }

  return (
    <motion.div
      className={className}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{ display: 'inline-block' }}
    >
      <motion.span style={{ ...gradientStyle, backgroundPosition, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>
        {children}
      </motion.span>
    </motion.div>
  )
}
