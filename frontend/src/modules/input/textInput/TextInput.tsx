import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
}

export function TextInput({value, setValue, label}: TextInputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <input
            type="text"
            value={value}
            onChange={handleChange}
            className={styles.textInput} // Use CSS module
            placeholder="Enter text here" // Optional placeholder
        />
    </div>
}