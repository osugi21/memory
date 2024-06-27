import { useEffect, useState } from 'react'
import './App.css'
import { render } from '@testing-library/react'
import Card from './components/Card'

function App() {
  // カードの画像
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

  // ゲームに必要なステート類
  // gameのカード
  const [cards, setCards] = useState([
    {
      name: 8,
      img: './img/usagi.png',
      opened: false
    }
  ])
  // 1枚目か２枚目かそういう、めくれているカードの枚数を保持するステート
  const [count, setCount] = useState(1)
  // 選択されたカード つまり、画像が表示されているカード
  const [selectedCard, setSelectedCard] = useState([])
  // ポップアップの表示がされるかどうか
  const [showPopup, setShowPopup] = useState(false)
  // 失敗した回数
  const [totalCount, setTotalCount] = useState(0)
  // ゲームが終了したかどうか
  const [complete, setComplete] = useState(false)

  // カードをシャッフルして配置
  const shuffleImages = () => {
    const shuffledImages = [...images, ...images]
      .map((item, index) => ({
        ...item,
        id: index + 1
      }))
      .sort(() => 0.5 - Math.random())

    // ゲーム用にカードを初期化
    setCards(shuffledImages)
  }

  // useEffect(() => {
  //   shuffleImages()
  // }, [])

  // カードを押すとひっくり返る
  // カードをひっくり返す関数
  const toggleCard = (index) => {
    // めくったのでカウントを増やす
    setCount(count + 1)
    // setCount((prevCount) => prevCount + 1)
    console.log(selectedCard)

    // gameのカードをコピー
    const newCards = cards.slice()
    if (count <= 2) {
      newCards[index] = {
        ...newCards[index],
        opened: !newCards[index].opened
      }
      setCards(newCards)
    }
    if (count >= 3) {
      console.log('三枚目は裏返せないよ')
    }
    const newSelect = [...selectedCard, newCards[index]]
    setSelectedCard(newSelect)
    if (newSelect.length === 2) {
      if (newSelect[0].name === newSelect[1].name) {
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
        }, 1000)
      }
    }
    const isComplete = newCards.every((card) => card.opened === true)
    setComplete(isComplete)
  }

  // めくったカードが2枚の時に押すボタンの処理
  const clickButton = () => {
    setCount(1)
    // めくったカードが2枚の時
    if (selectedCard.length === 2) {
      if (selectedCard[0].name === selectedCard[1].name) {
        // カードをオープンにする処理（opendをtrueにする）
        const openCards = cards.map((card) =>
          card.id === selectedCard[0].id || card.id === selectedCard[1].id
            ? { ...card, opened: true }
            : card
        )
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

  // ゲームをやり直しする処理
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

  // ゲームが終了したら3秒後にリセットする処理
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

  // console.log(complete)
  // console.log(cards)

  // 画面描写部分
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
        console.log('ゲームは続く')
      )}
      <div className="header">
        <h1>神経衰弱</h1>
        <h2> 失敗数{totalCount}/10回</h2>
      </div>
      <div className="game-container">
        <div className="main">
          {cards.map((card, index) => (
            <Card card={card} index={index} toggleCard={toggleCard} />
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
