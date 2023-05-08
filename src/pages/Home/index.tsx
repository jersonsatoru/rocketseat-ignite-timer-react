import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="#">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        list="task-suggestion"
                        id="task"
                        placeholder="Dê um nome para o seu projeto" 
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
                        min="5"
                        max="60"
                    />
                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton type="submit">
                    <Play size={24}></Play>
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}