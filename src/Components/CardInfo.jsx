import { useSpring, animated } from 'react-spring'
import { useDrag } from '@use-gesture/react'

import { CrossSvg } from './CrossSvg'

export const CardInfo = ({ currentCard, closeCardInfo }) => {
  const spring = useSpring({ from: { scale: 0 }, to: [{ scale: 1.05 }, { scale: 1 }] })
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })

  return (
    <div className='CardInfoWrapper'>
      <animated.div {...bind()} style={{ x, y, ...spring, touchAction: 'none' }} className='CardInfo'>
        <div
          className='CardInfoHeader'
          style={{
            backgroundImage: `url(${currentCard.top})`,
          }}>
          <div className='CardInfoName'>{currentCard.name}</div>
          <div className='CardInfoFraction'>{currentCard.fraction}</div>
        </div>
        <div className='CardInfoContent'>
          <img draggable={false} src={currentCard.img} alt='' />
          <div className='CardInfoText'>
            {currentCard &&
              Array.apply(null, {
                // массив индексов от 0 до наибольшей длины texts или titles
                length: Math.max(currentCard.text.titles.length, currentCard.text.texts.length),
              })
                .map(Number.call, Number)
                .map((i) => (
                  <div key={i} style={{ marginBottom: 6 }}>
                    <div className='CardInfoContentTitle'>{currentCard.text.titles[i] ?? ''}</div>
                    <div className='CardInfoContentText'>{currentCard.text.texts[i] ?? ''}</div>
                  </div>
                ))}
          </div>
        </div>
        <div className='Cross' onClick={closeCardInfo}>
          <CrossSvg />
        </div>
      </animated.div>
    </div>
  )
}
