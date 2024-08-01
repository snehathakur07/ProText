import React from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';

export default function Response() {
    const { wordMeaningResponse, formatText } = useGlobalContext();

    return (
        <div className="response">
            <div><h3>{wordMeaningResponse.word}</h3></div>
            <div className="res">
                <p>
                    <b>Meaning: </b> 
                    <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(wordMeaningResponse.meaning) }} />
                </p>
                <br/>
                <p>
                    <b>Synonyms: </b>
                    <div className="summary-content">
                        {wordMeaningResponse.synonyms && wordMeaningResponse.synonyms.length > 0 
                            ? wordMeaningResponse.synonyms.join(', ')
                            : 'No synonyms available.'}
                    </div>
                </p>
                <br/>

                <p>
                    <b>Antonyms: </b>
                    <div className="summary-content">
                        {wordMeaningResponse.antonyms && wordMeaningResponse.antonyms.length > 0 
                            ? wordMeaningResponse.antonyms.join(', ')
                            : 'No antonyms available.'}
                    </div>
                </p>
                <br/>
                <p>
                    <b>Example: </b> 
                    <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(wordMeaningResponse.example) }} />
                </p>
                
            </div>
        </div>
    );
}
