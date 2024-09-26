'use client'
import React from 'react'

// MUI
import { Tab, Tabs } from '@mui/material'

export default function tabnav({setNewState}: {setNewState: (newState: number) => void}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setNewState(newValue);
    };
    return (
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Ordenes" />
            <Tab label="Productos" />
        </Tabs>)
}
