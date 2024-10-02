import React, { useState } from "react";
import styles from "./main.module.css";
import Cards from "../cards/Cards";
import Dots from "../../common/design/Dots";
function FeaturedProducts() {
  const [number, setNumber] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.title}>Featured Products </div>

      <div className={styles.Cards}>
        <Cards number={number} />
      </div>

      <Dots setNumber={setNumber} numberOfButtons={3} />
    </div>
  );
}

export default FeaturedProducts;
