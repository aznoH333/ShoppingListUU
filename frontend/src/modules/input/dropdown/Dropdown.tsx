import React from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
    values: string[];
    defaultValue: string;
    setValue: (value: string) => void;
}

export function Dropdown({ values, defaultValue, setValue }: DropdownProps) {
    return (
        <select
            className={styles.dropdown}
            defaultValue={defaultValue}
            onChange={(e) => setValue(e.target.value)}
        >
            {values.map((value) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}
