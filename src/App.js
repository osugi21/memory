import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import { render } from '@testing-library/react';

function App() {
  const images = [
    {
      name: 1,
      img: "./img/buta.png",
      opened: true
    },
    {
      name: 2,
      img: "./img/hitsuji.png",
      opened: true
    },
    {
      name: 3,
      img: "./img/inu.png",
      opened: true
    },
    {
      name: 4,
      img: "./img/lion.png",
      opened: true
    },
    {
      name: 5,
      img: "./img/neko.png",
      opened: true
    },
    {
      name: 6,
      img: "./img/penguin.png",
      opened: true
    },
    {
      name: 7,
      img: "./img/tora.png",
      opened: true
    },
    {
      name: 8,
      img: "./img/usagi.png",
      opened: true
    }
  ]

  const [cards, setCards] = useState([
    {
      name: 8,
      img: "./img/usagi.png",
      opened: false
    }
  ]);

// 裏表くるくる
  const [isOpen, setIsOpen] = useState(false)
  const [get, setGet] = useState();

  const shuffleImages = () => {
    const shuffledImages = [...images, ...images]
    .map((item, index) => ({...item, id: index + 1}))
    .sort((a,b) => 0.5 - Math.random());;
    setCards(shuffledImages);
  }

  useEffect(() => {
    shuffleImages();
  }, []);

  const getCard = (id) => {
     setGet(cards.find((card) => card.id === id))
     console.log(get)
     console.log(id)
  }
  // カードを押すとひっくり返る
  const toggleCard = () => {
    setIsOpen()
  }
 
  // 正解不正解の判定
  const correctAnswer = () => {

  }

  //回数制限で失敗
  const failure = () => {

  }

  // console.log(cards)
  return (
    <div className="App">
      <div>
        {/* カードを並べる */}
        {/* {cards.map((card) => {
          return (<img src ={card.img} />)
        })} */}
      </div>
      <div>
        {
          cards.map((card) => {
            return (<div onClick={() => {card.opened = !card.opened; setIsOpen()}}> {card.opened ? <img src ={card.img} className='card'/> : <img className='card'/>}</div>)
          })
        }
        {/* {toggle
        ?<img className='card' src = {cards[0]?.img} />
        :<img className='card' />} */}
      </div>
     <img src ={cards[0]?.img} className='card' onClick={() => getCard(cards[1])}/>
    </div>
  );
}

export default App;
