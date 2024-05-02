import React, { useCallback, useState } from 'react';
import Ticket from '../components/Ticket/Ticket';
import {
  Dimmer,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import styles from './styles.module.scss';
import {
  Field,
  GameState,
  LoadingState,
  ResultRequestData,
} from '../utils/types';
import {
  FIRST_FIELD_CHIP_COUNT,
  FIRST_FIELD_CHIP_REQUIRE,
  FIRST_WINNING_CONDITION,
  SECOND_FIELD_CHIP_COUNT,
  SECOND_FIELD_CHIP_REQUIRE,
  SECOND_WINNING_CONDITION,
} from '../utils/constants';
import { generateRandomArrNum } from '../utils/helpers';

function LotteryApp() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    error: false,
    loading: false,
    message: '',
  });
  const [firstField, setFirstField] = useState<Field>([]);
  const [secondField, setSecondField] = useState<Field>([]);
  const [firstFieldWin, setFirstFieldWin] = useState(() => generateRandomArrNum(FIRST_FIELD_CHIP_REQUIRE, FIRST_FIELD_CHIP_COUNT));
  const [secondFieldWin, setSecondFieldWin] = useState(() => generateRandomArrNum(SECOND_FIELD_CHIP_REQUIRE, SECOND_FIELD_CHIP_COUNT));
  const [gameState, setGameState] = useState<GameState>('inProgress');

  const sendResult = useCallback(async () => {
    try {
      setLoadingState({ error: false, loading: true, message: '' });

      const data: ResultRequestData = {
        selectedNumber: {
          firstField,
          secondField,
        },
        isTicketWon: gameState === 'win',
      }

      const response = await fetch('/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      // Расскомментировать, если нужно убедиться, что в UI есть обработка успешной отправки
      // const response = {
      //     status: 200
      // }

      // Сделаем вид, что все статусы, кроме 200-го, это ошибка
      if (response.status !== 200) {
        throw new Error("Ошибка при отправке результата");
      } else {
        setLoadingState({ error: false, loading: false, message: "Результат успешно опубликован" });
      }
    } catch (error) {
      if (typeof error === 'string') {
        setLoadingState({ error: true, loading: false, message: error });
      } else if (error instanceof Error) {
        setLoadingState({ error: true, loading: false, message: error.message });
      } else {
        setLoadingState({ error: true, loading: false, message: "Неизвестная ошибка при отправке результата" });
      }
    }
  }, [firstField, gameState, secondField]);

  const restartGame = () => {
    setFirstFieldWin(generateRandomArrNum(FIRST_FIELD_CHIP_REQUIRE, FIRST_FIELD_CHIP_COUNT));
    setSecondFieldWin(generateRandomArrNum(SECOND_FIELD_CHIP_REQUIRE, SECOND_FIELD_CHIP_COUNT));
    setGameState('inProgress');
    setFirstField([]);
    setSecondField([]);
    setLoadingState({
      error: false,
      loading: false,
      message: '',
    });
  }

  return (
    <Segment
      compact
      inverted
      color="violet"
      className={styles.container}
    >
      {loadingState.error && !loadingState.loading
        && (
          <Message
            error
            content={loadingState.message}
          />
        )}
      {!loadingState.error && !loadingState.loading && loadingState.message.length > 0
        && (
          <Message
            success
            content={loadingState.message}
          />
        )}
      <Ticket
        firstField={firstField}
        secondField={secondField}
        firstWinningCondition={FIRST_WINNING_CONDITION}
        secondWinningCondition={SECOND_WINNING_CONDITION}
        firstFieldRequire={FIRST_FIELD_CHIP_REQUIRE}
        secondFieldRequire={SECOND_FIELD_CHIP_REQUIRE}
        firstFieldCount={FIRST_FIELD_CHIP_COUNT}
        secondFieldCount={SECOND_FIELD_CHIP_COUNT}
        firstFieldWin={firstFieldWin}
        secondFieldWin={secondFieldWin}
        gameState={gameState}
        setGameState={setGameState}
        setFirstField={setFirstField}
        setSecondField={setSecondField}
        sendResult={sendResult}
        restartGame={restartGame}
      />
      <Dimmer active={loadingState.loading} inverted>
        <Loader inverted>Загрузка</Loader>
      </Dimmer>
    </Segment>
  );
}

export default LotteryApp;
