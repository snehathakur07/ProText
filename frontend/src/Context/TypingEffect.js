import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text = '', speed = 10, fontSize = '1.3rem', lineHeight = '2' }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (typeof text !== 'string') return; // Ensure text is a string

        const cleanText = text.trim(); // Escape apostrophes
        let index = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => {
                const nextChar = cleanText[index] || '';
                return prev + nextChar;
            });
            index += 1;
            if (index >= cleanText.length) {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <div
            style={{ fontSize, lineHeight }}
            dangerouslySetInnerHTML={{ __html: displayedText }}
        />
    );
};

export default TypingEffect;
