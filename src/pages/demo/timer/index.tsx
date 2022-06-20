import React, { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "../../../styles/timer.module.css";

interface HalfDigitProps {
  children: ReactNode;
  zIndex?: number;
  deg?: number;
  needTransition?: boolean;
  className?: string;
}

const TopHalfDigit = React.memo(function TopHalfDigit(props: HalfDigitProps) {
  const { children, deg = 0, zIndex = 0, needTransition, ...rest } = props;

  return (
    <div
      style={{
        width: "5rem",
        height: "4rem",
        overflow: "hidden",
        position: "absolute",
        transformOrigin: "bottom",
        transform: `rotateX(${deg}deg)`,
        transition: needTransition ? "transform .5s" : "none",
        backfaceVisibility: "hidden",
        zIndex,
      }}
      {...rest}
    >
      <div
        style={{
          width: "5rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#333333",
          borderRadius: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
});

const BottomHalfDigit = React.memo(function BottomHalfDigit(
  props: HalfDigitProps
) {
  const {
    children,
    deg = 0,
    zIndex = 0,
    needTransition = false,
    ...rest
  } = props;

  return (
    <div
      style={{
        width: "5rem",
        height: "4rem",
        top: "4rem",
        overflow: "hidden",
        position: "absolute",
        transformOrigin: "top",
        transform: `rotateX(${deg}deg)`,
        transition: needTransition ? "transform .5s" : "none",
        backfaceVisibility: "hidden",
        zIndex,
      }}
      {...rest}
    >
      <div
        style={{
          width: "5rem",
          height: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#333333",
          borderRadius: "1rem",
          position: "absolute",
          top: "-100%",
        }}
      >
        {children}
      </div>
    </div>
  );
});

interface DigitProps {
  number: number;
}

const Digit = (props: DigitProps) => {
  const { number } = props;
  const [currentNumber, setCurrentNumber] = useState(number);
  const [reset, setReset] = useState(true);

  useEffect(() => {
    setReset(false);
    let timeout: NodeJS.Timeout;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setReset(true);
        timeout = setTimeout(() => {
          setCurrentNumber(number);
        }, 600);
      });
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [number]);

  return (
    <>
      <div
        style={{
          width: "5rem",
          height: "8rem",
          perspective: "300px",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <TopHalfDigit>{number}</TopHalfDigit>
          <BottomHalfDigit deg={-180} className={reset ? styles.open : ""}>
            {number}
          </BottomHalfDigit>

          <TopHalfDigit className={reset ? styles.close : ""}>
            {currentNumber}
          </TopHalfDigit>
          <BottomHalfDigit>{currentNumber}</BottomHalfDigit>
        </div>
      </div>
    </>
  );
};

const Colon = () => {
  return <div className={styles.colon}>:</div>;
};

const useTimer = () => {
  const date = useMemo(() => new Date(), []);
  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setHours(date.getHours());
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { hours, minutes, seconds };
};

const Timer = () => {
  const { hours, minutes, seconds } = useTimer();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          fontSize: "5rem",
        }}
      >
        {/* HH */}
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={Math.floor(hours / 10)} />
        </div>
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={hours % 10} />
        </div>
        <Colon />
        {/* mm */}
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={Math.floor(minutes / 10)} />
        </div>
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={minutes % 10} />
        </div>
        <Colon />
        {/* ss */}
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={Math.floor(seconds / 10)} />
        </div>
        <div
          style={{
            margin: "0 0.5rem",
          }}
        >
          <Digit number={seconds % 10} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
