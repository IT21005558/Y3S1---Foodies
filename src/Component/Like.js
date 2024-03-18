import React, { useState } from "react";
import { Heart } from "react-feather";
import './LikeComponent/LikeStyle.css';

const LikeButton = () => {
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleLike} className={count > 0 ? "clicked" : ""}>
        <Heart /> {count}
      </button>
    </div>
  );
};

export default LikeButton;
