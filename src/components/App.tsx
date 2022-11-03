import ChangeLanguage from "./ChangeLanguage";
import EndMessage from "./EndMessage";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import styles from "../styles/App.module.css";
import wordsEnglish from "../wordList.json";
import wordsSpanish from "../palabrasLista.json";
import { useCallback, useEffect, useState } from "react";

const getRandom = (list: string[]): number => {
    return Math.floor(Math.random() * list.length);
};

const normalizeWord = (word: string): string => {
    const Accents: object = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        Á: "A",
        É: "E",
        Í: "I",
        Ó: "O",
        Ú: "U"
    };
    return word
        .split("")
        .map((letter) => Accents[letter as keyof object] || letter)
        .join("")
        .toString()
        .toLowerCase();
};

const getWord = (list: string[]): string => {
    return normalizeWord(list[getRandom(list)]);
};

function App() {
    const [language, setLanguage] = useState<string>("en");
    const [wordToGuess, setWordToGuess] = useState<string>(
        getWord(wordsEnglish)
    );
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const incorrectLetters: string[] = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );
    const isLoser: boolean = incorrectLetters.length >= 6;
    const isWinner: boolean = wordToGuess
        .split("")
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string): void => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;
            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            const key = e.key;
            if (!key.match(/^[a-z]$/)) return;
            e.preventDefault();
            addGuessedLetter(key);
        };
        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [guessedLetters]);

    const changeWord = (language: string): void => {
        language === "en"
            ? setWordToGuess(getWord(wordsEnglish))
            : setWordToGuess(getWord(wordsSpanish));
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            const key = e.key;
            if (key !== "Enter") return;
            e.preventDefault();
            setGuessedLetters([]);
            changeWord(language);
        };
        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [language]);

    return (
        <div
            className={`${styles["parent-div"]}`}
            style={{
                display: "flex",
                maxWidth: "800px",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center"
            }}
        >
            <ChangeLanguage
                language={language}
                setLanguage={setLanguage}
                setGuessedLetters={setGuessedLetters}
                changeWord={changeWord}
            />
            <EndMessage
                isWinner={isWinner}
                isLoser={isLoser}
                language={language}
            />
            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                    language={language}
                    setGuessedLetters={setGuessedLetters}
                    changeWord={changeWord}
                />
            </div>
        </div>
    );
}

export default App;
