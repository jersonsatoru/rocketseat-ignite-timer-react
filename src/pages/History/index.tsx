import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(c => (
                            <tr key={c.id}>
                                <td>{c.task}</td>
                                <td>{c.minutesAmount}</td>
                                <td>{formatDistanceToNow(new Date(c.startDate), {
                                    addSuffix: true,
                                    locale: ptBR
                                })}</td>
                                <td>
                                    {
                                        c.finishedDate ? (
                                            <Status statusColor="green">
                                                Concluido
                                            </Status>
                                        ) : (
                                            c.interruptedDate ? (
                                                (
                                                    <Status statusColor="red">
                                                        Interrompido
                                                    </Status>
                                                )
                                            ) : (
                                                (
                                                    <Status statusColor="yellow">
                                                        Andamento
                                                    </Status>
                                                )
                                            )
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}