import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { CountDown } from "./CountDown";
import { NewCycleForm } from "./NewCycleForm";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod
        .string()
        .min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(0)
        .max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { createNewCycle, activeCycle, stopCountDown } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            minutesAmount: 5,
            task: '',
        },
    });

    const handleCreateNewCycle = (data: NewCycleFormData) => {
        createNewCycle(data);
        reset();
    }

    const { handleSubmit, watch, reset} = newCycleForm;

    return (
        <HomeContainer>
            <form action="#" onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />
                {!activeCycle ?
                    (
                        <StartCountDownButton disabled={!watch('task')} type="submit">
                            <Play size={24}></Play>
                            Começar
                        </StartCountDownButton>
                    ) : (
                        <StopCountDownButton 
                            type="button"
                            onClick={stopCountDown}
                        >
                            <HandPalm size={24}></HandPalm>
                            Interromper
                        </StopCountDownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}