import ChangeLanguage from "./ChangeLanguage";
import EndMessage from "./EndMessage";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import styles from "../styles/App.module.css";
import wordsEnglish from "../wordList.json";
import wordsSpanish from "../palabrasLista.json";
import { useCallback, useEffect, useState } from "react";
import NewGame from "./NewGame";

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
            if (guessedLetters.includes(letter) || isLoser || isWinner) {
                return;
            }
            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        setScore((guessedLetters.length - incorrectLetters.length) * 100);
    }, [guessedLetters, incorrectLetters]);

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

    const [score, setScore] = useState<number>(0);
    const [maxScore, setMaxScore] = useState<number>(0);

    useEffect(() => {
        if (maxScore !== 0)
            localStorage.setItem("max-score", JSON.stringify(maxScore));
    }, [maxScore]);

    useEffect(() => {
        try {
            const maxScore = JSON.parse(
                localStorage.getItem("max-score") || ""
            );
            if (maxScore) setMaxScore(maxScore);
        } catch (err) {
            setMaxScore(0);
        }
    }, []);

    useEffect(() => {
        if (score > maxScore) setMaxScore(score);
        setScore(0);
    }, [wordToGuess]);

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
            <section className={`${styles["scores"]}`}>
                <span>
                    {language === "en" ? "Score:" : "Puntaje:"} {score}
                </span>
                <span>
                    {language === "en" ? "Best score:" : "Mejor puntaje:"}{" "}
                    {maxScore}
                </span>
            </section>
            <NewGame
                language={language}
                setGuessedLetters={setGuessedLetters}
                changeWord={changeWord}
            />
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
