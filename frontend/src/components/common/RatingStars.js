import React, { useEffect, useState } from 'react';
import Star from './Star';

const RatingStars = ({ value, totalStars = 5, edit = false, onRatingChange = () => {} }) => {
  //making this component super reusable
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(null);

  let filledSize = Math.floor(tempRating ?? rating);
  let halfSize = filledSize === (tempRating ?? rating) ? 0 : 1;
  let emptySize = totalStars - (filledSize + halfSize);

  useEffect(() => {
    setRating(value);
  }, [value]);

  function handleEditable(value) {
    if (edit) {
      return {
        onClick: () => {
          setRating(value);
          onRatingChange(value);
        },
        onMouseEnter: () => setTempRating(value),
        onMouseLeave: () => setTempRating(null)
      };
    } else return {};
  }

  return (
    <div className="flex flex-row gap-x-1 items-center">
      {Array.from({ length: totalStars }).map((_, idx) => {
        if (filledSize !== 0) {
          filledSize--;
          return <Star type={'Full'} key={idx} {...handleEditable(idx + 1)} />;
        } else if (halfSize !== 0) {
          halfSize--;
          return <Star type={'Half'} key={idx} {...handleEditable(idx + 1)} />;
        } else if (emptySize !== 0) {
          emptySize--;
          return <Star type={'Empty'} key={idx} {...handleEditable(idx + 1)} />;
        }
      })}
    </div>
  );
};

export default RatingStars;
