import React from 'react'
import TypingEffect from '../Context/TypingEffect'
import { useGlobalContext } from '../Context/GlobalContext';

export default function Response({ response, title }) {
    const { formatText } = useGlobalContext()
    console.log(response.content)
    console.log("hi")
    return (
        <div className="response">
            <div><h3>{title}</h3></div>

            <TypingEffect text={formatText(response.content)} />

        </div>
    )
}
