import React, { useEffect, useRef, useState } from 'react'
import ConfettiWrapper from './PersonalHeading/ConfettiWrapper'
import ReactConfetti from 'react-confetti';
export interface IConfettiWrapper {
  setToggleForRightBorder: React.Dispatch<React.SetStateAction<boolean>>;
  setshowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  dimensions: { width: number; height: number };
  showConfetti: boolean;
}
const Confetticomponent = () => {
      const [toggleForRightBorder, setToggleForRightBorder] = useState(true);
  const [showConfetti, setshowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

      const props: IConfettiWrapper = {
    setToggleForRightBorder,
    setshowConfetti,
    setDimensions,
    dimensions,
    showConfetti,
  };

const timerRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
    if (showConfetti) {
        timerRef.current = setTimeout(() => {
            setshowConfetti(false);
        }, 5000);
    } else {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }
    return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
}, [showConfetti]);

  return (
    <div className='flex absolute w-full h-screen items-end'>      
    <div id='confettiBottomContainer' className='flex-1 items-end justify-end flex relative mb-10'>
        <ConfettiWrapper {...props} />
        {showConfetti && (
            <ReactConfetti
                width={dimensions.width}
                height={dimensions.height}
                gravity={0.3}
                style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
            />
        )}
    </div>
    </div>
  )
}

export default Confetticomponent