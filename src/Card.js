import React from 'react'

const Card = ({card}) => {
  return (
    <div>
        <div>
            <img src={card.img} alt='' />
        </div>
    </div>
  )
}

export default Card