import React, { memo, useCallback } from 'react';
import {
    Button,
    Divider,
    Header,
    Icon,
} from 'semantic-ui-react';
import TicketHeader from './TicketHeader';
import Chips from '../Chip/Chips';
import styles from './styles.module.scss';
import { generateRandomArrNum, validateWin } from '../../utils/helpers';
import { GameState, WinningCondition } from '../../utils/types';

interface TicketGameContentProps {
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
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
    setFirstField: React.Dispatch<React.SetStateAction<number[]>>
    setSecondField: React.Dispatch<React.SetStateAction<number[]>>
    sendResult: () => Promise<void>
}

function TicketGameContent(props: TicketGameContentProps) {
    const {
        firstWinningCondition,
        secondWinningCondition,
        firstField,
        secondField,
        firstFieldCount,
        secondFieldCount,
        firstFieldRequire,
        secondFieldRequire,
        firstFieldWin,
        secondFieldWin,
        setGameState,
        setFirstField,
        setSecondField,
        sendResult,
    } = props;

    const isFieldsValid = (firstField.length === firstFieldRequire) && (secondField.length === secondFieldRequire);

    const selectRandom = useCallback(() => {
        // Получаем случайные выбранные значения для полей
        const firstFieldNumbers = generateRandomArrNum(firstFieldRequire, firstFieldCount);
        const secondFieldNumbers = generateRandomArrNum(secondFieldRequire, secondFieldCount);

        setFirstField(firstFieldNumbers);
        setSecondField(secondFieldNumbers);
    }, [firstFieldCount, firstFieldRequire, secondFieldCount, secondFieldRequire, setFirstField, setSecondField]);

    const onShowResultClick = useCallback(() => {
        const result = validateWin(
            firstField,
            secondField,
            firstFieldWin,
            secondFieldWin,
            firstWinningCondition,
            secondWinningCondition,
        );

        setGameState(result ? 'win' : 'lose');
        sendResult();
    }, [firstField, firstFieldWin, firstWinningCondition, secondField, secondFieldWin, secondWinningCondition, sendResult, setGameState]);

    return (
        <>
            <div className={styles.ticket_main_header}>
                <Header
                    content="Билет 1"
                />
                <Icon
                    color="black"
                    name="magic"
                    className={styles.ticket_magic_icon}
                    onClick={selectRandom}
                />
            </div>
            <TicketHeader
                withProgress
                fieldNumber={1}
                requireCount={firstFieldRequire}
                selectedCount={firstField.length}
            />
            <Divider />
            <Chips
                fieldSelected={firstField}
                fieldCount={firstFieldCount}
                setField={setFirstField}
            />
            <Divider />
            <TicketHeader
                withProgress={false}
                fieldNumber={2}
                requireCount={secondFieldRequire}
                selectedCount={secondField.length}
            />
            <Chips
                fieldSelected={secondField}
                fieldCount={secondFieldCount}
                setField={setSecondField}
            />
            <div className={styles.ticket_button_wrapper}>
                <Button
                    basic
                    content="Показать результат"
                    disabled={!isFieldsValid}
                    onClick={onShowResultClick}
                />
            </div>
        </>
    )
}

export default memo(TicketGameContent);
