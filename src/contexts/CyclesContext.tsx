import { ReactNode, createContext, useReducer, useState } from "react";

interface Cycle {
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

interface CyclesReducerProps {
    type: 'INTERRUPT_CYCLE' | 'FINISH_CYCLE' | 'CREATE_NEW_CYCLE'
    payload: {
        cycle: Cycle
    }
}

interface CyclesReducerState {
    cycles: Cycle[],
    activeCycle: Cycle | null
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [ { activeCycle, cycles }, dispatch ] = useReducer(
        ({ cycles, activeCycle }: CyclesReducerState, { type, payload }: CyclesReducerProps) => {
            console.log(type)
            if (type === 'FINISH_CYCLE') {
                return {
                    cycles: cycles.map(cycle => {
                        if (cycle.id === payload.cycle.id) {
                            cycle.finishedDate = new Date();
                        }
                        return cycle;
                    }),
                    activeCycle: null,
                };
            } else if (type === 'INTERRUPT_CYCLE'){
                return {
                    cycles: cycles.map(c => {
                        if (c.id === payload.cycle.id) {
                            c.interruptedDate = new Date();
                        }
            
                        return c;
                    }),
                    activeCycle: null,

                }
            } else if (type === 'CREATE_NEW_CYCLE') {
                return {
                    cycles: [ ...cycles, payload.cycle ],
                    activeCycle: payload.cycle,
                };
            } else {
                console.log(`INVALID STATE PASSED: type(${type})`)
                return {
                    cycles,
                    activeCycle,
                };
            }
        }, 
        { activeCycle: null, cycles: [] } as CyclesReducerState,
    );
    
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState<number>(0);
    
    const markActiveCycleFinished = () => {
        dispatch({
            type: 'FINISH_CYCLE',
            payload: {
                cycle: activeCycle as Cycle,
            }
        })
    }

    const createNewCycle = ({ task, minutesAmount }: NewCycleFormData) => {
        dispatch({
            type: 'CREATE_NEW_CYCLE',
            payload: {
                cycle: {
                    id: String(new Date().getTime()),
                    task: task,
                    minutesAmount: minutesAmount,
                    startDate: new Date(),
                },
            }
        });
        setAmountSecondsPassed(0);
    }

    const stopCountDown = () => {
        dispatch({
            type: 'INTERRUPT_CYCLE',
            payload: {
                cycle: activeCycle as Cycle,
            }
        })
        setAmountSecondsPassed(0);
    }

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
