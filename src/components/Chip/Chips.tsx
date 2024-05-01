import React, { memo, useMemo } from 'react';
import Chip from './Chip';

interface ChipsProps {
    fieldCount: number
    fieldSelected: number[]
    setField: React.Dispatch<React.SetStateAction<number[]>>
}

function Chips(props: ChipsProps) {
    const { fieldSelected, fieldCount, setField } = props;

    const field = useMemo(() => {
        const result: number[] = [];

        for (let i = 1; i <= fieldCount; i++) {
            result.push(i);
        }

        return result;
    }, [fieldCount]);

    return (
        <div>
            {field.map((el) => (
                <Chip
                    key={el}
                    value={el}
                    fieldSelected={fieldSelected}
                    setField={setField}
                />
            ))}
        </div>
    )
}

export default memo(Chips);
