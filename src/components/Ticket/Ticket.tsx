import React, { memo } from 'react';
import { Segment } from 'semantic-ui-react';
import TicketGameContent from './TicketGameContent';
import styles from './styles.module.scss';
import TicketResultContent from './TicketResultContent';
import { GameState, WinningCondition } from '../../utils/types';

interface TicketProps {
    firstField: number[]
    secondField: number[]
    firstFieldCount: number
    secondFieldCount: number
    firstWinningCondition: WinningCondition
    secondWinningCondition: WinningCondition
    firstFieldRequire: number
    secondFieldRequire: number
    firstFieldWin: number[]
    secondFieldWin: number[]
    gameState: GameState
    sendResult: () => Promise<void>
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
    setFirstField: React.Dispatch<React.SetStateAction<number[]>>
    setSecondField: React.Dispatch<React.SetStateAction<number[]>>
    restartGame: () => void
}

function Ticket(props: TicketProps) {
    const {
        firstField,
        secondField,
        firstFieldCount,
        secondFieldCount,
        firstWinningCondition,
        secondWinningCondition,
        firstFieldRequire,
        secondFieldRequire,
        firstFieldWin,
        secondFieldWin,
        gameState,
        sendResult,
        setGameState,
        setFirstField,
        setSecondField,
        restartGame,
    } = props;

    return (
        <Segment
            padded
            className={styles.ticket}
        >
            {gameState === 'inProgress'
                && (
                    <TicketGameContent
                        firstWinningCondition={firstWinningCondition}
                        secondWinningCondition={secondWinningCondition}
                        firstFieldRequire={firstFieldRequire}
                        secondFieldRequire={secondFieldRequire}
                        firstField={firstField}
                        secondField={secondField}
                        firstFieldCount={firstFieldCount}
                        secondFieldCount={secondFieldCount}
                        firstFieldWin={firstFieldWin}
                        secondFieldWin={secondFieldWin}
                        setFirstField={setFirstField}
                        setSecondField={setSecondField}
                        setGameState={setGameState}
                        sendResult={sendResult}
                    />
                )}
            {(gameState === 'win' || gameState === 'lose')
                && (
                    <TicketResultContent
                        gameState={gameState}
                        restartGame={restartGame}
                    />
                )
            }
        </Segment>
    )
}

export default memo(Ticket);
