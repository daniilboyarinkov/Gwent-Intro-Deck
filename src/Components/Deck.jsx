import { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { to, from, trans } from '../Helpers/Deck.Animation'

// Cards from https://www.playgwent.com/ru/card-reveals

const Deck = ({ cards, setCurrentCard, setLayoutActive, showCardInfo }) => {
  const [gone] = useState(() => new Set())

  const [props, api] = useSprings(cards.length, (i) => ({ ...to(i), from: from(i) }))

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    if (active && Math.abs(mx) > 0) mx > 0 ? setLayoutActive('right') : setLayoutActive('left')
    if (!active) setLayoutActive(false)
    if (!active && vx > 0.2 && xDir > 0) showCardInfo()
    if (!active && vx > 0.2) {
      setCurrentCard(cards[index])
      gone.add(index)
    }
    api.start((i) => {
      if (index !== i) return
      const isGone = gone.has(index)

      // Card goes left or right, else backs to 0
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0
      const rot = mx / 100 + (isGone ? xDir * 10 : 0)
      const scale = active ? 1.12 : 1

      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      }
    })
    // When last card return others
    if (!active && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start((i) => to(i))
      }, 1000)
  })

  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div className='CardContainer' key={i} style={{ x, y }}>
      <animated.div
        className='Card'
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}>
        <div className='banner'></div>
        <img draggable={false} className='CardPicture' src={`${cards[i].img}`} alt='' />
        <img draggable={false} className='CardFrame' src='/Gwent-Intro-Deck/imgs/frame.png' alt='' />
        <div className='CardBannerWrapper'>
          <img className='CardBanner' draggable={false} src={`${cards[i].banner}`} alt='' />
          {cards[i].power.length > 0 && (
            <img className='CardPower' draggable={false} src={`${cards[i].power}`} alt='' />
          )}
          <img className='CardDiamond' draggable={false} src={`${cards[i].diamonds}`} alt='' />
        </div>
      </animated.div>
    </animated.div>
  ))
}

export { Deck }
