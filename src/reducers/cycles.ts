import { produce } from "immer"
import { Cycle } from "../contexts/CyclesContext"

interface CyclesReducerState {
    cycles: Cycle[],
    activeCycle: Cycle | null
}


export const useCyclesReducer = (
        state: CyclesReducerState, 
        props: any
    ) => {
        switch (props.type) {
            case 'FINISH_CYCLE': 
                return produce(state, (draft) => {
                    draft.activeCycle = null;
                    draft.cycles = state.cycles.map(cycle => {
                        if (cycle.id === state.activeCycle?.id) {
                            cycle.finishedDate = new Date();
                        }
                        return cycle;
                    })
                })
            case 'INTERRUPT_CYCLE': 
                return produce(state, draft => {
                    draft.activeCycle = null;
                    draft.cycles = state. cycles.map(c => {
                        if (c.id === state.activeCycle?.id) {
                            c.interruptedDate = new Date();
                        }
                        return c;
                    })
                })
            
            case 'CREATE_NEW_CYCLE': 
                return produce(state, draft => {
                    draft.activeCycle = props.payload?.cycle,
                    draft.cycles.push(props.payload?.cycle)
                })
            default:
                return state;
        }
}

export const finishCycle = (): any => {
    return {
        type: 'FINISH_CYCLE',
        payload: {}
    }
}

export const interruptActiveCycle = (): any => {
    return {
        type: 'INTERRUPT_CYCLE',
        payload: {}
    }
}

export const addNewCycle = (cycle: Cycle): any => {
    return {
        type: 'CREATE_NEW_CYCLE',
        payload: {
            cycle,
        }
    }
}