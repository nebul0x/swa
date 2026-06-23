import { useEffect, useRef, useState, useCallback } from 'react'

const dist = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist)
  return Math.max(minVal, val + minVal)
}

export default function TextPressure({
  text = 'Azure AI Search',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  fontFamily = 'Roboto Flex',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  scale = false,
  textColor = '#50e6ff',
  minFontSize = 24,
}) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const spansRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })
  const [fontSize, setFontSize] = useState(minFontSize)
  const [scaleY, setScaleY] = useState(1)
  const [lineHeight, setLineHeight] = useState(1)
  const chars = text.split('')

  useEffect(() => {
    const onMove = e => { cursorRef.current.x = e.clientX; cursorRef.current.y = e.clientY }
    const onTouch = e => { cursorRef.current.x = e.touches[0].clientX; cursorRef.current.y = e.touches[0].clientY }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      mouseRef.current = { x: left + width / 2, y: top + height / 2 }
      cursorRef.current = { ...mouseRef.current }
    }
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch) }
  }, [])

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return
    const { width: cw, height: ch } = containerRef.current.getBoundingClientRect()
    const fs = Math.max(cw / (chars.length / 2), minFontSize)
    setFontSize(fs); setScaleY(1); setLineHeight(1)
    requestAnimationFrame(() => {
      if (!titleRef.current) return
      if (scale) {
        const r = titleRef.current.getBoundingClientRect()
        if (r.height > 0) { setScaleY(ch / r.height); setLineHeight(ch / r.height) }
      }
    })
  }, [chars.length, minFontSize, scale])

  useEffect(() => {
    let t
    const debounced = () => { clearTimeout(t); t = setTimeout(setSize, 100) }
    debounced()
    window.addEventListener('resize', debounced)
    return () => window.removeEventListener('resize', debounced)
  }, [setSize])

  useEffect(() => {
    let rafId
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        const maxDist = rect.width / 2
        spansRef.current.forEach(span => {
          if (!span) return
          const r = span.getBoundingClientRect()
          const d = dist(mouseRef.current, { x: r.x + r.width / 2, y: r.y + r.height / 2 })
          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400
          const ital = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0
          const fvs = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`
          if (span.style.fontVariationSettings !== fvs) span.style.fontVariationSettings = fvs
          if (alpha) span.style.opacity = getAttr(d, maxDist, 0, 1).toFixed(2)
        })
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafId)
  }, [width, weight, italic, alpha])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`@import url('${fontUrl}');`}</style>
      <h1
        ref={titleRef}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
          color: textColor,
          display: flex ? 'flex' : 'block',
          justifyContent: flex ? 'space-between' : undefined,
        }}
      >
        {chars.map((char, i) => (
          <span key={i} ref={el => (spansRef.current[i] = el)} style={{ display: 'inline-block', color: textColor }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}
