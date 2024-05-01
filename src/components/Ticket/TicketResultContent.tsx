import React, { memo } from 'react';
import { Button, Header } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { GameState } from '../../utils/types';

interface TicketResultContentProps {
    gameState: GameState
    restartGame: () => void
}

function TicketResultContent(props: TicketResultContentProps) {
    const { gameState, restartGame } = props;

    return (
        <div className={styles.ticket_result_wrapper}>
            <div>
                <Header
                    content="Билет 1"
                />
                <div>
                    {gameState === 'win' ? "Вы победили, поздравляем! За это вы получаете абсолютно ничего! Вот это да!" : "Вы проиграли! Не может быть! :("}
                </div>
            </div>
            <div className={styles.ticket_button_wrapper}>
                <Button
                    basic
                    icon="redo"
                    content="Попробовать снова"
                    onClick={() => restartGame()}
                />
            </div>
        </div>
    )
}

export default memo(TicketResultContent);
