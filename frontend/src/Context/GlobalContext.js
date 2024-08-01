import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL1 = "http://localhost:5000/api/writing-toolkit/";
const BASE_URL2 = "http://localhost:5000/api/creative-writing/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const [summaryPrompt, setSummaryPrompt] = useState({
        text: "",
        wordLimit: 0
    });
    const [summaryResponse, setSummaryResponse] = useState({
        title: "",
        content: ""
    });
    const addSummary = async (prompt) => {
        setLoading(true);
        setSummaryPrompt({ text: "", wordLimit: 0 });
        try {
            const response = await axios.post(`${BASE_URL1}summary`, prompt);
            setSummaryResponse({
                title: response.data.title,
                content: response.data.summary
            });
            console.log(summaryResponse.content)
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };



    const [paraphrasePrompt, setParaphrasePrompt] = useState({
        text: "",
        mode: "Standard"
    });
    const [paraphraseResponse, setParaphraseResponse] = useState({
        title: "",
        content: ""
    });
    const addParaphrase = async (prompt) => {
        setLoading(true);
        setParaphrasePrompt({ text: "", mode: "Standard" });
        try {
            const response = await axios.post(`${BASE_URL1}paraphrase`, prompt);
            setParaphraseResponse({
                title: response.data.title,
                content: response.data.paraphrased
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };



    const [spellCheckPrompt, setSpellCheckPrompt] = useState({
        text: ""
    });
    const [spellCheckResponse, setSpellCheckResponse] = useState({
        content: ""
    });
    const addSpellCheck = async (prompt) => {
        setLoading(true);
        setSpellCheckPrompt({ text: "" });
        try {
            const response = await axios.post(`${BASE_URL1}spellcheck`, prompt);
            console.log(response.data)
            setSpellCheckResponse({ content: response.data});
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };



    const [grammarCheckPrompt, setGrammarCheckPrompt] = useState({ text: "" });
    const [grammarCheckResponse, setGrammarCheckResponse] = useState({
        suggestions: "",
        example: ""
    });
    const addGrammarCheck = async (prompt) => {
        setLoading(true);
        setGrammarCheckPrompt({ text: "" });
        try {
            const response = await axios.post(`${BASE_URL1}grammar-style`, prompt);
            setGrammarCheckResponse({
                suggestions: response.data.suggestions,
                example: response.data.example
            });
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };



    const [wordMeaningPrompt, setWordMeaningPrompt] = useState({ word: "" });
    const [wordMeaningResponse, setWordMeaningResponse] = useState({
        word: "",
        meaning: "",
        synonyms: [],
        antonyms: [],
        example: ""
    });

    const addWordMeaning = async (prompt) => {
        setLoading(true);
        setWordMeaningPrompt({ word: "" });
        try {
            const response = await axios.post(`${BASE_URL1}word-meaning`, prompt);
            setWordMeaningResponse({
                word: response.data.word,
                meaning: response.data.meaning,
                antonyms: response.data.antonyms,
                synonyms: response.data.synonyms,
                example: response.data.example
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [articlePrompt, setArticlePrompt] = useState({
        category: "Article",
        context: "",
        wordLimit: ""
    });
    const [articleResponse, setArticleResponse] = useState({
        title: "",
        content: ""
    });

    const addArticle = async (prompt) => {
        setLoading(true);
        setArticlePrompt({ category: "Article", context: "", wordLimit: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setArticleResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [essayPrompt, setEssayPrompt] = useState({
        category: "Essay",
        context: "",
        wordLimit: ""
    });
    const [essayResponse, setEssayResponse] = useState({
        title: "",
        content: ""
    });

    const addEssay = async (prompt) => {
        setLoading(true);
        setEssayPrompt({ category: "Essay", context: "", wordLimit: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setEssayResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [storyPrompt, setStoryPrompt] = useState({
        category: "Story",
        context: "",
        wordLimit: "",
        genre: ""
    });
    const [storyResponse, setStoryResponse] = useState({
        title: "",
        content: ""
    });

    const addStory = async (prompt) => {
        setLoading(true);
        setStoryPrompt({ category: "Story", context: "", wordLimit: "", genre: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setStoryResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [poemPrompt, setPoemPrompt] = useState({
        category: "Poem",
        context: "",
        genre: ""
    });
    const [poemResponse, setPoemResponse] = useState({
        title: "",
        content: ""
    });

    const addPoem = async (prompt) => {
        setLoading(true);
        setPoemPrompt({ category: "Poem", context: "", genre: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setPoemResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [playPrompt, setPlayPrompt] = useState({
        category: "Play",
        context: "",
        genre: ""
    });
    const [playResponse, setPlayResponse] = useState({
        title: "",
        content: ""
    });

    const addPlay = async (prompt) => {
        setLoading(true);
        setPlayPrompt({ category: "Play", context: "", genre: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setPlayResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const [debatePrompt, setDebatePrompt] = useState({
        category: "Debate",
        context: "",
        genre: "",
        motion: ""
    });
    const [debateResponse, setDebateResponse] = useState({
        title: "",
        content: ""
    });

    const addDebate = async (prompt) => {
        setLoading(true);
        setDebatePrompt({ category: "Debate", context: "", genre: "", motion: "" });
        try {
            const response = await axios.post(`${BASE_URL2}`, prompt);
            setDebateResponse({
                title: response.data.title,
                content: response.data.content
            });
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const formatText = (text) => {
        if (!text) return "";

        let formattedText = text
            .replace(/\n/g, '<br/>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\*/g, '<br/>') // Line breaks
            .replace(/(\+ .+)/g, '<li>$1</li>') // List items
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>') // Wrap list items in <ul>
            .replace(/<\/ul>\s*<ul>/g, '') // Merge consecutive <ul> elements
            .replace(/### (.*?)<br\/>/g, '<h3>$1</h3>') // H3 headers
            .replace(/## (.*?)<br\/>/g, '<h2>$1</h2>') // H2 headers
            .replace(/# (.*?)<br\/>/g, '<h1>$1</h1>'); // H1 headers

        // console.log(form)
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
            addSpellCheck,
            spellCheckResponse,

            grammarCheckPrompt,
            setGrammarCheckPrompt,
            addGrammarCheck,
            grammarCheckResponse,

            wordMeaningPrompt,
            setWordMeaningPrompt,
            addWordMeaning,
            wordMeaningResponse,

            articlePrompt,
            setArticlePrompt,
            addArticle,
            articleResponse,

            essayPrompt,
            setEssayPrompt,
            addEssay,
            essayResponse,

            storyPrompt,
            setStoryPrompt,
            addStory,
            storyResponse,

            poemPrompt,
            setPoemPrompt,
            addPoem,
            poemResponse,

            playPrompt,
            setPlayPrompt,
            addPlay,
            playResponse,

            debatePrompt,
            setDebatePrompt,
            addDebate,
            debateResponse,

            formatText,
            loading,
            setLoading
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
