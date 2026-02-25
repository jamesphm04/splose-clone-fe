import React from 'react'
import './styles.css'

interface CardRowProps {
    label: string;
    value: string;
}

export const CardRow: React.FC<CardRowProps> = ({ label, value }) => {
    return (
        <div className="container">
            <span className="label">{label}:</span>
            <span className="value">{value}</span>
        </div>
    )
}