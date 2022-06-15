import { useEffect, useState } from 'react'
import { useSpring, useTransition, animated } from 'react-spring'

import { CancelSvg } from './CancelSvg'
import { OkSvg } from './OkSvg'

const Layout = ({ toggle }) => {
  const [isLeft, setIsLeft] = useState(toggle === 'left' ?? false)
  const [isRight, setIsRight] = useState(toggle === 'right' ?? false)

  useEffect(() => {
    setIsLeft(toggle === 'left')
    setIsRight(toggle === 'right')
  }, [toggle])

  const stylesLeft = useSpring({ opacity: isLeft ? 1 : 0.1 })
  const stylesRight = useSpring({ opacity: isRight ? 1 : 0.1 })

  const transitionLeft = useTransition(isLeft, {
    from: { x: -50, y: -30, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -50, y: -30, opacity: 0 },
  })
  const transitionRight = useTransition(isRight, {
    from: { x: 50, y: -30, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 50, y: -30, opacity: 0 },
  })
  return (
    <div className='Wrapper'>
      <animated.div style={stylesLeft}>
        <CancelSvg />
        {window.innerWidth > 670 &&
          transitionLeft(
            (styles, item) =>
              item && (
                <animated.span style={styles} className='LayoutTitle CancelTitle'>
                  Next one
                </animated.span>
              )
          )}
      </animated.div>
      <animated.div style={stylesRight}>
        {window.innerWidth > 670 &&
          transitionRight(
            (styles, item) =>
              item && (
                <animated.span style={styles} className='LayoutTitle OkTitle'>
                  Look up
                </animated.span>
              )
          )}
        <OkSvg />
      </animated.div>
    </div>
  )
}

export { Layout }
