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
  // 並べる全てのカードの状態
  const [cards, setCards] = useState([
    {
      name: 8,
      img: './img/usagi.png',
      opened: false
    }
  ])
  // カードをクリックしたカウントの状態
  const [count, setCount] = useState(0)
  // 選んだカードの配列
  const [selectedCard, setSelectedCard] = useState([])
  // 当たりのエフェクトの状態
  const [showPopup, setShowPopup] = useState(false)
  // ボタンをクリックしたカウントの状態
  const [totalCount, setTotalCount] = useState(0)
  // 全部のカードの裏表の状態
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
    // カードをクリックしたカウントを増やしていく
    setCount(count + 1)
    console.log(selectedCard)
    const newCards = cards.slice()
    // 選んだカードの配列を作ってる
    const newSelect = [...selectedCard, newCards[index]]
    console.log(newSelect)
    setSelectedCard(newSelect)
    // カードを１回または２回クリックしたら（ここはselectedCardでもできる？）
    if (count === 0 || count === 1) {
      // カードをひっくり返す
      newCards[index] = {
        ...newCards[index],
        opened: !newCards[index].opened
      }
      // ひっくり返した配列にセット
      setCards(newCards)
    }
    // カードを三回以上クリックするとコンソールがでる
    // ここの処理考えてもいいかも？
    if (count >= 2) {
      console.log('三枚目は裏返せないよ')
    }
    // 選んだカードの配列の数が二個の時
    if (newSelect.length === 2) {
      // 0個目と1個目の選んだカードの名前が同じかつidが同じでない時
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
    // カードのクリック数のリセット
    setCount(0)
    // 選んだカードの配列の長さが二個の時
    if (selectedCard.length === 2) {
      // 選んだカードの0個目の名前と1個目の名前が同じとき
      if (selectedCard[0].name === selectedCard[1].name) {
        // ここおかしいかも
        // カードのidが選んだカードの0個目か1個目のidと同じなら表のまま
        const openCards = cards.map((card) =>
          card.id === selectedCard[0].id || card.id === selectedCard[1].id
            ? { ...card, opened: true }
            : card
        )
        // 当たったもののカードを表にしたままの配列にセット
        setCards(openCards)
        // ボタンをクリックした数はそのまま増えない
        setTotalCount(totalCount)
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
      setCount(0)
    }
  }, [totalCount])

  useEffect(() => {
    // 全てが表になる条件で3秒後にいろいろリセットされる
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
