import React, { memo, useCallback } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface ChipProps {
    value: number
    fieldSelected: number[]
    setField: React.Dispatch<React.SetStateAction<number[]>>
}

function Chip(props: ChipProps) {
    const { value, fieldSelected, setField } = props;

    const isActive = fieldSelected.includes(value);

    const clickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
        if (typeof data.content === 'number') {
            if (isActive) {
                setField(fieldSelected.filter((field) => field !== value));
            } else {
                setField((prevState) => [
                    ...prevState,
                    value,
                ]);
            }
        }
    }, [fieldSelected, isActive, value, setField]);

    return (
        <Button
            color="pink"
            className={styles.chip}
            basic={!isActive}
            content={value}
            active={isActive}
            onClick={clickHandler}
        />
    )
}

export default memo(Chip);
