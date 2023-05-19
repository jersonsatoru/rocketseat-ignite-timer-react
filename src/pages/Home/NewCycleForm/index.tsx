import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext);

    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text" 
                list="task-suggestion"
                id="task"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register("task") }
            />
            <datalist id="task-suggestion">
                <option value="Projeto 1">Projeto 1</option>
                <option value="Projeto 2">Projeto 2</option>
                <option value="Projeto 3">Projeto 3</option>
                <option value="Projeto 4">Projeto 4</option>
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountInput
                type="number" 
                id="minutesAmount" 
                placeholder="00"
                step="5"
                min="0"
                max="60"
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true }) }
            />
            <span>minutos.</span>
        </FormContainer>
    )
}