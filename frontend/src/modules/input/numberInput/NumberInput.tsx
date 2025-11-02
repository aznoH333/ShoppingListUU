import React from 'react';
import styles from './NumberInput.module.css'; // Import the CSS module

interface NumberInputProps {
    value: number;
    setValue: (value: number) => void;
    label: string;
    minValue?: number;
    maxValue?: number;
}

export function NumberInput({ value, setValue, label, minValue, maxValue }: NumberInputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value); // Parse the input value to a number

        if (event.target.value !== "" && maxValue && newValue > maxValue) {
            newValue = maxValue;
        }

        if (event.target.value !== "" && minValue && newValue < minValue) {
            newValue = minValue;
        }

        event.target.value = newValue.toString();
        setValue(newValue);
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                className={styles.numberInput}
            />
        </div>
    );
}