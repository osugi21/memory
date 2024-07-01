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
  // 並べる全てのカードの状態(このstateを使って選んだカードの状態を変えられるんじゃないか)
  const [cards, setCards] = useState([
    {
      name: 8,
      img: './img/usagi.png',
      opened: false
    }
  ])
  // 選んだカードの配列（これをcardsのstateに統一するのがよさそう）
  const [selectedCard, setSelectedCard] = useState([])
  // 当たりのエフェクトの状態
  const [showPopup, setShowPopup] = useState(false)
  // ボタンをクリックしたカウントの状態
  const [totalCount, setTotalCount] = useState(0)
  // 全部のカードの裏表の状態（これも統一できる？）
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
    console.log(selectedCard)
    if (cards[index].opened || selectedCard.length >= 2) {
      return
    }
    const newCards = cards.slice()
    // 選んだカードの配列を作ってる
    const newSelect = [...selectedCard, newCards[index]]
    console.log(newSelect)
    setSelectedCard(newSelect)
    if (newSelect.length <= 2) {
      // カードをひっくり返す
      newCards[index] = {
        ...newCards[index],
        opened: !newCards[index].opened
      }
      // ひっくり返した配列にセット
      setCards(newCards)
    }
    if (newSelect.length === 2) {
      if (
        newSelect[0].name === newSelect[1].name &&
        newSelect[0].id !== newSelect[1].id
      ) {
        // 当たりのエフェクトが一秒後出るようになる
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
        }, 1000)
      }
    }
    // 全てが表の時はtrue、全てが表出ないときはfalse
    const isComplete = newCards.every((card) => card.opened === true)
    setComplete(isComplete)
  }

  // 次がめくれるようになるボタン
  const clickButton = () => {
    // 選んだカードの配列の長さが二個の時
    if (selectedCard.length <= 1) {
      return
    }
    if (
      selectedCard.length === 2 &&
      selectedCard[0].name === selectedCard[1].name
    ) {
      const openCards = cards.map((card) =>
        card.id === selectedCard[0].id || card.id === selectedCard[1].id
          ? { ...card, opened: true }
          : card
      )
      // 当たったもののカードを表にしたままの配列にセット
      setCards(openCards)
    } else {
      // そのほかの場合カードを裏にする
      const resetCards = cards.map((card) =>
        card.id === selectedCard[0].id || card.id === selectedCard[1].id
          ? { ...card, opened: false }
          : card
      )
      setCards(resetCards)
      // ボタンをクリックするとカウントが増える
      setTotalCount(totalCount + 1)
    }
    // 選んだカードの配列は空にする
    setSelectedCard([])
  }

  useEffect(() => {
    // 失敗数が11回以上になると
    if (totalCount >= 11) {
      alert('残念！やり直し！')
      // カードがシャッフルされる
      shuffleImages()
      // ボタンのカウントが0になる
      setTotalCount(0)
      // カードのクリック数が0になる
      setSelectedCard([])
    }
  }, [totalCount])

  useEffect(() => {
    // 全てが表になる条件で3秒後にいろいろリセットされる
    const timeout = setTimeout(() => {
      shuffleImages()
      setTotalCount(0)
      setSelectedCard([])
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
        console.log('終わらない')
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
