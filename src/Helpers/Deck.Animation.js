const DELAY_INTERVAL = 210

const PERSPECTIVE = 1600
const X_ANGLE = 40

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: Math.random() * 20 - 12,
  delay: i * DELAY_INTERVAL,
})
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -2100 })
const trans = (r, s) =>
  `perspective(${PERSPECTIVE}px) rotateX(${X_ANGLE}deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export { to, from, trans }
