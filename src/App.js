import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import { render } from '@testing-library/react';

function App() {
  const images = [
    {
      name: 1,
      img: "./img/buta.png",
      opened: false
    },
    {
      name: 2,
      img: "./img/hitsuji.png",
      opened: false
    },
    {
      name: 3,
      img: "./img/inu.png",
      opened: false
    },
    {
      name: 4,
      img: "./img/lion.png",
      opened: false
    },
    {
      name: 5,
      img: "./img/neko.png",
      opened: false
    },
    {
      name: 6,
      img: "./img/penguin.png",
      opened: false
    },
    {
      name: 7,
      img: "./img/tora.png",
      opened: false
    },
    {
      name: 8,
      img: "./img/usagi.png",
      opened: false
    }
  ]

  const [cards, setCards] = useState([
    {
      name: 8,
      img: "./img/usagi.png",
      opened: false
    }
  ]);



  const shuffleImages = () => {
    const shuffledImages = [...images, ...images]
    .map((item, index) => ({...item, id: index + 1}))
    .sort((a,b) => 0.5 - Math.random());;
    setCards(shuffledImages);
  }

  useEffect(() => {
    shuffleImages();
  }, []);


  // カードを押すとひっくり返る
  const toggleCard = (index) => {
    const newCards = cards.slice()
    newCards[index] = {
      ...newCards[index],
      opened: !newCards[index].opened
    }
    setCards(newCards)
  }

  useEffect(() => {
    console.log("2")
  },[])
  // const toggleCard = (index) => {
  //   const newIsOpen = isOpen.slice()
  //   newIsOpen[index] = !newIsOpen[index]
  //   setIsOpen(newIsOpen)
  // }

  // 三枚目をひっくり返せない(二枚まで)

 
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
      </div>
      <div className='main'>
        {
          cards.map((card, index) => {
            return (<div className='margin' onClick={() => toggleCard(index)}> {card.opened ? <img src ={card.img} className='card'/> : <img className='card'/>}</div>)
          })
        }

      </div>
      {/* return (<div className='margin' onClick={() => toggleCard(index)}> {isOpen[index] ? <img src ={card.img} className='card'/> : <img className='card'/>}</div>) */}
      {/* return (<div className='margin' onClick={() => toggleCard(index)}> {card.opened ? <img src ={card.img} className='card'/> : <img className='card'/>}</div>) */}
    </div>
  );
}

export default App;
