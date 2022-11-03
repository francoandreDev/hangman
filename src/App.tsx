import { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";
import wordsEnglish from "./wordList.json";
import wordsSpanish from "./palabrasLista.json";
import Keyboard from "./components/Keyboard";
import HangmanWord from "./components/HangmanWord";
import HangmanDrawing from "./components/HangmanDrawing";
import ChangeLanguage from "./components/ChangeLanguage";
import EndMessage from "./components/EndMessage";
import styles from "./styles/App.module.css";

const getRandom = (list: string[]): number => {
    return Math.floor(Math.random() * list.length);
};
const getWord = (list: string[]): string => {
    return list[getRandom(list)];
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

    const inputMobileRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        inputMobileRef.current?.focus()
    }, [inputMobileRef?.current])

    useEffect(()=>{
        const inputFocus = () => {
            if(window.innerWidth>800) return
            inputMobileRef.current?.focus()
        }
        window.addEventListener("click", inputFocus)
        return ()=>{
            window.removeEventListener("click", inputFocus)
        }
    }, [])

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
            <input type="text" className={`${styles["input-mobile"]}`} ref={inputMobileRef}/>
            <ChangeLanguage language={language} setLanguage={setLanguage} />
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
                />
            </div>
        </div>
    );
}

export default App;
