import { useEffect, useState } from 'react'
import './App.css'
import { render } from '@testing-library/react'

function App() {
  const images = [
    {
      name: 1,
      img: './img/buta.png',
      opened: false
    },
    {
      name: 2,
      img: './img/hitsuji.png',
      opened: false
    },
    {
      name: 3,
      img: './img/inu.png',
      opened: false
    },
    {
      name: 4,
      img: './img/lion.png',
      opened: false
    },
    {
      name: 5,
      img: './img/neko.png',
      opened: false
    },
    {
      name: 6,
      img: './img/penguin.png',
      opened: false
    },
    {
      name: 7,
      img: './img/tora.png',
      opened: false
    },
    {
      name: 8,
      img: './img/usagi.png',
      opened: false
    }
  ]

  const [cards, setCards] = useState([
    {
      name: 8,
      img: './img/usagi.png',
      opened: false
    }
  ])
  const [count, setCount] = useState(0)
  const [selectedCard, setSelectedCard] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [complete, setComplete] = useState(false)

  const shuffleImages = () => {
    const shuffledImages = [...images, ...images]
      .map((item, index) => ({
        ...item,
        id: index + 1
      }))
      .sort(() => 0.5 - Math.random())
    setCards(shuffledImages)
  }

  // useEffect(() => {
  //   shuffleImages()
  // }, [])

  // カードを押すとひっくり返る
  const toggleCard = (index) => {
    setCount(count + 1)
    console.log(selectedCard)
    const newCards = cards.slice()
    const newSelect = [...selectedCard, newCards[index]]
    console.log(newSelect)
    setSelectedCard(newSelect)
    if (count === 0 || count === 1) {
      newCards[index] = {
        ...newCards[index],
        opened: !newCards[index].opened
      }
      setCards(newCards)
    }
    if (count >= 2) {
      console.log('三枚目は裏返せないよ')
    }
    if (newSelect.length === 2) {
      if (
        newSelect[0].name === newSelect[1].name &&
        newSelect[0].id !== newSelect[1].id
      ) {
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
        }, 1000)
      }
    }
    const isComplete = newCards.every((card) => card.opened === true)
    setComplete(isComplete)
  }

  const clickButton = () => {
    setCount(0)
    if (selectedCard.length === 2) {
      if (selectedCard[0].name === selectedCard[1].name) {
        // ここおかしいかも
        // const openCards = cards.map((card) =>
        //   card.id === selectedCard[0].id || card.id === selectedCard[1].id
        //     ? { ...card, opened: true }
        //     : card
        // )
        setCards(openCards)
        setTotalCount(totalCount)
      } else {
        const resetCards = cards.map((card) =>
          card.id === selectedCard[0].id || card.id === selectedCard[1].id
            ? { ...card, opened: false }
            : card
        )
        setCards(resetCards)
        setTotalCount(totalCount + 1)
      }
    }
    setSelectedCard([])
    // trueになってるものを裏返す
  }

  useEffect(() => {
    if (totalCount >= 11) {
      alert('残念！やり直し！')
      shuffleImages()
      setTotalCount(0)
      setCount(0)
    }
    // if (totalCount === 0) {
    //   shuffleImages()
    // }
  }, [totalCount])

  useEffect(() => {
    const timeout = setTimeout(() => {
      shuffleImages()
      setTotalCount(0)
      setCount(0)
      setComplete(false)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [complete === true])

  console.log(complete)
  // console.log(cards)
  return (
    <div className="App">
      {showPopup && (
        <div className="popup">
          <h2>あたり！</h2>
        </div>
      )}
      {complete ? (
        <div className="popup">
          <h2>成功！</h2>
        </div>
      ) : (
        console.log('a')
      )}
      <div className="header">
        <h1>神経衰弱</h1>
        <h2> 失敗数{totalCount}/10回</h2>
      </div>
      <div className="game-container">
        <div className="main">
          {cards.map((card, index) => (
            <div
              role="button"
              className="margin"
              onClick={() => toggleCard(index)}
              aria-hidden="true"
            >
              {' '}
              {card.opened ? (
                <img src={card.img} className="card" alt="" />
              ) : (
                <div className="card" alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button type="button" onClick={() => clickButton()}>
          めくり終わったら押すボタン
        </button>
      </div>
    </div>
  )
}

export default App
