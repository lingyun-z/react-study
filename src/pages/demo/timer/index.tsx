import React, { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "../../../styles/timer.module.css";

interface HalfDigitProps {
  children: ReactNode;
  zIndex?: number;
  deg?: number;
  needTransition?: boolean;
}

const TopHalfDigit = React.memo(function TopHalfDigit(props: HalfDigitProps) {
  const { children, deg = 0, zIndex = 0, needTransition } = props;

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
  const { children, deg = 0, zIndex = 0, needTransition = false } = props;

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

const Digit = (props) => {
  const { number } = props;
  const [numberA, setNumberA] = useState(number);
  const [numberB, setNumberB] = useState(number);
  const [status, setStatus] = useState(0);
  const { cardStatus, needTransition } = useMemo(
    () => ({
      cardStatus: [
        { deg: status === 3 ? -180 : 0, zIndex: status > 1 ? 1 : 0 },
        { deg: status === 0 ? 180 : 0, zIndex: status === 1 ? 1 : 0 },
        { deg: status === 1 ? -180 : 0, zIndex: status === 0 ? 1 : 0 },
        { deg: status === 2 ? 180 : 0, zIndex: status === 3 ? 1 : 0 },
      ],
      needTransition: status === 1 || status === 3,
    }),
    [status]
  );

  useEffect(() => {
    if (status === 1 || status === 2) {
      setNumberB(number);
      setStatus(3);
    } else {
      setNumberA(number);
      setStatus(1);
    }

    const timeout = setTimeout(() => {
      setStatus((prevState) => (prevState + 1) % 4);
    }, 500);

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
          perspective: "250px",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <TopHalfDigit
            deg={cardStatus[0].deg}
            zIndex={cardStatus[0].zIndex}
            needTransition={needTransition}
          >
            {numberA}
          </TopHalfDigit>
          <BottomHalfDigit
            deg={cardStatus[1].deg}
            zIndex={cardStatus[1].zIndex}
            needTransition={needTransition}
          >
            {numberA}
          </BottomHalfDigit>

          <TopHalfDigit
            deg={cardStatus[2].deg}
            zIndex={cardStatus[2].zIndex}
            needTransition={needTransition}
          >
            {numberB}
          </TopHalfDigit>
          <BottomHalfDigit
            deg={cardStatus[3].deg}
            zIndex={cardStatus[3].zIndex}
            needTransition={needTransition}
          >
            {numberB}
          </BottomHalfDigit>
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
