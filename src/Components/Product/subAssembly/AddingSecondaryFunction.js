import React, { useState } from 'react';
import code from './ProductDetails.module.css';

function AddingSecondaryFunctions() {
    const [secondaryFunctions, setSecondaryFunctions] = useState(['']);
    const handleAddSecondary = () => {
        setSecondaryFunctions([...secondaryFunctions, ""]);
    }
    const handleDelete = () => {
        setSecondaryFunctions([...secondaryFunctions, ""]);
    }

  return (
    <div className={code.plusMinus}>
        <div><button className={code.btn} onClick={handleAddSecondary}>+</button></div>
        <div><button className={code.btn} onClick={handleDelete}>-</button></div>
    </div>
  )
}

export default AddingSecondaryFunctions;