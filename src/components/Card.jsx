import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

function Card({ card, index, toggleCard }) {
  return (
    <div
      role="button"
      className="margin"
      onClick={() => toggleCard(index)}
      aria-hidden="true"
    >
      {card.opened ? (
        <img src={card.img} className="card" alt="" />
      ) : (
        <div className="card" alt="" />
      )}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  toggleCard: PropTypes.func.isRequired
}

export default Card
