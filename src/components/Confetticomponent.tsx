import React, { useEffect, useRef, useState } from 'react'
import ConfettiWrapper from './PersonalHeading/ConfettiWrapper'
import ReactConfetti from 'react-confetti';
export interface IConfettiWrapper {
  setshowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  dimensions: { width: number; height: number };
  showConfetti: boolean;
  countdown: number;
  setCountdown?: React.Dispatch<React.SetStateAction<number>>;
}
const Confetticomponent = () => {
  const [showConfetti, setshowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [countdown, setCountdown] = useState(5);



const timerRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
    if (showConfetti) {
        // Reset countdown to 5 when confetti starts
        setCountdown(5);
        
        // Set up an interval to update the countdown every second
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    // When countdown reaches 0, clear interval and stop confetti
                    clearInterval(countdownInterval);
                    setshowConfetti(false);
                    return 5; // Reset to 5 for next time
                }
                return prev - 1;
            });
        }, 1000);
        
        // Store the interval reference for cleanup
        timerRef.current = countdownInterval as unknown as NodeJS.Timeout;
    } else {
        // When confetti stops (manually), reset countdown and clear any timers
        setCountdown(5);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }
    
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
}, [showConfetti]);

const props: IConfettiWrapper = {
    setshowConfetti,
    setDimensions,
    dimensions,
    showConfetti,
    countdown,
    setCountdown,
  };

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