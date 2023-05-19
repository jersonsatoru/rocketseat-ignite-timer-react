import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { addNewCycle, finishCycle, interruptActiveCycle, useCyclesReducer } from "../reducers/cycles";
import { differenceInSeconds } from "date-fns";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextProps {
    activeCycle: Cycle | null;
    cycles: Cycle[];
    amountSecondsPassed: number;
    setAmountSecondsPassed: (secondsPassed: number) => void;
    markActiveCycleFinished: () => void;
    createNewCycle: (data: NewCycleFormData) => void;
    stopCountDown: () => void;
}

interface NewCycleFormData {
    task: string;
    minutesAmount: number;
}

export const CyclesContext = createContext({} as CyclesContextProps);

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [ cyclesState, dispatch ] = useReducer(
        useCyclesReducer, 
        { activeCycle: null, cycles: [] },
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON);
            } 

            return initialState;
        }
    );

    const { activeCycle, cycles } = cyclesState;
    
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState<number>(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0;
    });
    
    const markActiveCycleFinished = () => {
        dispatch(finishCycle())
    }

    const createNewCycle = ({ task, minutesAmount }: NewCycleFormData) => {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: task,
            minutesAmount: minutesAmount,
            startDate: new Date(),
        };

        dispatch(addNewCycle(newCycle));
        setAmountSecondsPassed(0);
    }

    const stopCountDown = () => {
        dispatch(interruptActiveCycle())
        setAmountSecondsPassed(0);
    }

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
    }, [cyclesState])

    return (
        <CyclesContext.Provider value={{ 
            activeCycle,
            amountSecondsPassed,
            setAmountSecondsPassed,
            markActiveCycleFinished,
            createNewCycle,
            stopCountDown,
            cycles,
        }} >
            {children}
        </CyclesContext.Provider>
    )
}
