import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import { useTransition, animated, useSpring } from 'react-spring'

import { Deck } from './Components/Deck'
import { Table } from './Components/Table'
import { Layout } from './Components/Layout'
import { CardInfo } from './Components/CardInfo'
import { BeyondScenes } from './Components/BeyondScenes'

import './App.css'

const cards = require('./Config/config.json')

function App() {
  const [layoutActive, setLayoutActive] = useState(false)
  const [cardInfoActive, setCardInfoActive] = useState(false)
  const [currentCard, setCurrentCard] = useState({})

  const SeparatorPosition = useSpring({ y: 0 })
  const SeparatorBind = useDrag((params) => {
    const y = params.xy[1]
    const screenHeight = window.innerHeight - 45
    if (params.dragging) {
      if (y >= 0 && y <= screenHeight) SeparatorPosition.y.set(y)
    } else {
      if (y > screenHeight / 2) SeparatorPosition.y.start(screenHeight)
      else SeparatorPosition.y.start(0)
    }
  })

  const cardInfoTransition = useTransition(cardInfoActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      <BeyondScenes />
      <animated.div {...SeparatorBind()} style={{ y: SeparatorPosition.y, touchAction: 'none' }} className='Separator'>
        Drag me
      </animated.div>
      <animated.div className='App' style={{ y: SeparatorPosition.y, touchAction: 'none' }}>
        <Table />
        <Layout toggle={layoutActive} />
        <Deck
          cards={cards}
          setCurrentCard={setCurrentCard}
          setLayoutActive={setLayoutActive}
          showCardInfo={() => setCardInfoActive(true)}
        />

        {cardInfoTransition(
          (styles, item) =>
            item && (
              <animated.div style={styles}>
                <CardInfo currentCard={currentCard} closeCardInfo={() => setCardInfoActive(false)} />
              </animated.div>
            )
        )}
      </animated.div>
    </>
  )
}

export default App
