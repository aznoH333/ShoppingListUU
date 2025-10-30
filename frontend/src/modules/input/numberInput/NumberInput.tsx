import React from 'react';
import styles from './NumberInput.module.css'; // Import the CSS module

interface NumberInputProps {
    value: number;
    setValue: (value: number) => void;
    label: string;
}

export function NumberInput({ value, setValue, label }: NumberInputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value); // Parse the input value to a number
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