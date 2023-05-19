import { useContext, useEffect } from "react";
import { CountDownContainer, SeparatorContainer } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function CountDown() {

    const { 
        activeCycle,
        amountSecondsPassed, 
        setAmountSecondsPassed,
        markActiveCycleFinished,
    } = useContext(CyclesContext);

    const totalSeconds = activeCycle 
        ? activeCycle.minutesAmount * 60 
        : 0;

    const minutes = Math.floor((totalSeconds - amountSecondsPassed) /60).toString().padStart(2, "0");

    const seconds = ((totalSeconds - amountSecondsPassed) % 60).toString().padStart(2, "0");

    useEffect(() => {
        let intervalId: number;
        if (activeCycle) {
            intervalId = setInterval(() => { 
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    activeCycle.startDate
                );

                if (secondsDifference >= totalSeconds) {
                    markActiveCycleFinished();
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(intervalId);
                } else {
                    setAmountSecondsPassed(secondsDifference); 
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [activeCycle, totalSeconds, markActiveCycleFinished, setAmountSecondsPassed])

    useEffect(() => {
        if (activeCycle) {
            document.title = `Vite - ${minutes}:${seconds}`
        }
    }, [activeCycle, minutes, seconds]);

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <SeparatorContainer>:</SeparatorContainer>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}