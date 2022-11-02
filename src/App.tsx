import { useCallback, useEffect, useState } from "react";
import wordsEs from "./wordList.json";
import wordsEn from "./palabrasLista.json";
import Keyboard from "./components/Keyboard";
import HangmanWord from "./components/HangmanWord";
import HangmanDrawing from "./components/HangmanDrawing";
import ChangeLanguage from "./components/ChangeLanguage";

function App() {
    const [language, setLanguage] = useState<string>("es");

    function getWord() {
        return language === "en"
            ? wordsEs[Math.floor(Math.random() * wordsEs.length)]
            : wordsEn[Math.floor(Math.random() * wordsEn.length)];
    }

    const [wordToGuess, setWordToGuess] = useState(getWord);

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split("")
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;
            setGuessedLetters((currentLetters) => [...currentLetters, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
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

    const newWord = () => {
        setGuessedLetters([]);
        setWordToGuess(getWord());
    }

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (key !== "Enter") return;
            e.preventDefault();
            newWord()
        };
        document.addEventListener("keypress", handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, []);

    useEffect(()=>{
        newWord()
    },[language])

    return (
        <div
            style={{
                display: "flex",
                maxWidth: "800px",
                flexDirection: "column",
                gap: "2rem",
                margin: "0 auto",
                alignItems: "center",
            }}
        >
            <ChangeLanguage language={language} setLanguage={setLanguage}/>
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {isWinner && "Winner! - Press Enter to try again"}
                {isLoser && "Nice try! - Press Enter to try again"}
            </div>
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
