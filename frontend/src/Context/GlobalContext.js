import React, { useContext, useState } from "react";
import axios from "axios"
const BASE_URL1 = "http://localhost:5000/api/writing-toolkit/";
const BASE_URL2 = "http://localhost:5000/api/creative-writing/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const [summaryPrompt, setSummaryPrompt] = useState({
        text: "",
        wordLimit: 0
    });
    const [summaryResponse, setSummaryResponse] = useState({
        title: "",
        summary: ""
    });


    const [paraphrasePrompt, setParaphrasePrompt] = useState({
        text: "",
        mode: "Standard"
    });
    const [paraphraseResponse, setParaphraseResponse] = useState({
        title: "",
        paraphrased: ""
    });

    const [spellCheckPrompt, setSpellCheckPrompt] = useState({
        text: ""
    });
    const [spellCheckResponse, setSpellCheckResponse] = useState({
        corrected: ""
    });


    const [grammarCheckPrompt, setGrammarCheckPrompt] = useState({ text: "" });
    const [grammarCheckResponse, setGrammarCheckResponse] = useState({
        suggestions: "",
        example: ""
    });

    const [wordMeaningPrompt, setwordMeaningPrompt] = useState({ word: "" });
    const [wordMeaningResponse, setwordMeaningResponse] = useState({
        word: "",
        meaning: "",
        synonyms: [],
        antonyms: [],
        example: ""
    });


    const addSummary = async (prompt) => {
        setLoading(true);
        setSummaryPrompt({
            text: "",
            wordLimit: 0
        })
        const response = await axios.post(`${BASE_URL1}summary`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false)
        setSummaryResponse({
            title: response.data.title,
            summary: response.data.summary
        })
        console.log(summaryResponse)
    }

    const addParaphrase = async (prompt) => {
        setLoading(true);
        setParaphrasePrompt({
            text: "",
            mode: "Standard"
        })
        const response = await axios.post(`${BASE_URL1}paraphrase`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false)
        setParaphraseResponse({
            title: response.data.title,
            paraphrased: response.data.paraphrased
        })
        console.log(paraphrasePrompt)
        // setRecentSummary({})
        // console.log(response.data)
        // setSummaryResponse(response.data)
    }

    const addSpellCheck = async (prompt) => {
        setLoading(true);
        setSpellCheckPrompt({
            text: ""
        })
        const response = await axios.post(`${BASE_URL1}spellcheck`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false)
        console.log(response)
        console.log(response.data)
        setSpellCheckResponse({
            corrected: response.data
        })
        console.log(spellCheckResponse)
    }
    const addGrammarCheck = async (prompt) => {
        setLoading(true);
        setGrammarCheckPrompt({
            text: ""
        })
        const response = await axios.post(`${BASE_URL1}grammar-style`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false)
        console.log(response)
        console.log(response.data)
        setGrammarCheckResponse({
            suggestions: response.data.suggestions,
            example: response.data.example
        })
        console.log(grammarCheckResponse)
    }

    const addWordMeaning = async (prompt) => {
        setLoading(true);
        setwordMeaningPrompt({
            word: ""
        })
        const response = await axios.post(`${BASE_URL1}word-meaning`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setwordMeaningResponse({
            word: response.data.word,
            meaning: response.data.meaning,
            antonyms: response.data.antonyms,
            synonyms: response.data.synonyms,
            example: response.data.example
        })
        console.log(wordMeaningResponse)

    }





    const [articlePrompt, setArticlePrompt] = useState({
        category: "Article",
        context: "",
        wordLimit: ""
    })
    const [articleResponse, setArticleResponse] = useState({
        title: "",
        content: ""
    })

    const addArticle = async (prompt) => {
        console.log("article")
        setLoading(true);
        setArticlePrompt({
            category: "Article",
            context: "",
            wordLimit: ""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setArticleResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(articleResponse)

    }


    const [essayPrompt, setEssayPrompt] = useState({
        category: "Essay",
        context: "",
        wordLimit: ""
    })
    const [essayResponse, setEssayResponse] = useState({
        title: "",
        content: ""
    })

    const addEssay = async (prompt) => {
        setLoading(true);
        setEssayPrompt({
            category: "Essay",
            context: "",
            wordLimit: ""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setEssayResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(essayResponse)

    }



    const [storyPrompt, setStoryPrompt] = useState({
        category: "Story",
        context: "",
        wordLimit: "",
        genre:""
    })
    const [storyResponse, setStoryResponse] = useState({
        title: "",
        content: ""
    })

    const addStory = async (prompt) => {
        setLoading(true);
        setStoryPrompt({
            category: "Story",
            context: "",
            wordLimit: "",
            genre:""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setStoryResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(storyResponse)

    }



    const [poemPrompt, setPoemPrompt] = useState({
        category: "Poem",
        context: "",
        genre:""
    })
    const [poemResponse, setPoemResponse] = useState({
        title: "",
        content: ""
    })

    const addPoem = async (prompt) => {
        setLoading(true);
        setPoemPrompt({
            category: "Poem",
            context: "",
            genre:""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setPoemResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(poemResponse)

    }



    const [playPrompt, setPlayPrompt] = useState({
        category: "Poem",
        context: "",
        genre:""
    })
    const [playResponse, setPlayResponse] = useState({
        title: "",
        content: ""
    })

    const addPlay = async (prompt) => {
        setLoading(true);
        setPlayPrompt({
            category: "Play",
            context: "",
            genre:""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setPlayResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(playResponse)

    }



    const [debatePrompt, setDebatePrompt] = useState({
        category: "Debate",
        context: "",
        genre:"",
        motion:""
    })
    const [debateResponse, setDebateResponse] = useState({
        title: "",
        content: ""
    })

    const addDebate = async (prompt) => {
        setLoading(true);
        setDebatePrompt({
            category: "Debate",
            context: "",
            genre:"",
            motion:""
        })
        const response = await axios.post(`${BASE_URL2}`, prompt)
            .catch((err) => {
                console.log(err)
            })
        setLoading(false);
        console.log(response.data)
        setDebateResponse({
            title: response.data.title,
            content: response.data.content
        })
        console.log(debateResponse)

    }


    const formatText = (text) => {
        if (!text) return "";
        let formattedText = text.replace(/\n/g, '<br/>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold text
        formattedText = formattedText.replace(/\*/g, '<br/>'); // Line breaks
        formattedText = formattedText.replace(/(\+ .+)/g, '<li>$1</li>'); // List items
        formattedText = formattedText.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); // Wrap list items in <ul>
        formattedText = formattedText.replace(/<\/ul>\s*<ul>/g, ''); // Merge consecutive <ul> elements
    
        // Add formatting for headers
        formattedText = formattedText.replace(/### (.*?)<br\/>/g, '<h3>$1</h3>'); // H3 headers
        formattedText = formattedText.replace(/## (.*?)<br\/>/g, '<h2>$1</h2>'); // H2 headers
        formattedText = formattedText.replace(/# (.*?)<br\/>/g, '<h1>$1</h1>'); // H1 headers
    
        return formattedText;
    };
    




    return (
        <GlobalContext.Provider value={{
            summaryPrompt,
            setSummaryPrompt,
            addSummary,
            summaryResponse,

            paraphrasePrompt,
            setParaphrasePrompt,
            addParaphrase,
            paraphraseResponse,

            spellCheckPrompt,
            setSpellCheckPrompt,
            spellCheckResponse,
            addSpellCheck,

            grammarCheckPrompt,
            setGrammarCheckPrompt,
            grammarCheckResponse,
            addGrammarCheck,

            wordMeaningPrompt,
            setwordMeaningPrompt,
            wordMeaningResponse,
            addWordMeaning,

            articlePrompt,
            setArticlePrompt,
            articleResponse,
            addArticle,

            essayPrompt,
            setEssayPrompt,
            essayResponse,
            addEssay,

            storyPrompt,
            setStoryPrompt,
            storyResponse,
            addStory,

            poemPrompt,
            setPoemPrompt,
            poemResponse,
            addPoem,

            playPrompt,
            setPlayPrompt,
            playResponse,
            addPlay,

            debatePrompt,
            setDebatePrompt,
            debateResponse,
            addDebate,

            formatText,
            loading,
            setLoading
        }}>{children}</GlobalContext.Provider>
    );
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}