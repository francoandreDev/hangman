import styles from "../styles/NewGame.module.css";

type NewGameProps = {
    language: string;
    setGuessedLetters: (letter: string[]) => void;
    changeWord: (language: string) => void;
};

const NewGame = ({ language, setGuessedLetters, changeWord }: NewGameProps) => {
    const newGame = () => {
        setGuessedLetters([]);
        changeWord(language);
    };
    return (
        <button
            onClick={() => newGame()}
            id={`${styles["new-game"]}`}
        >
            New Game
        </button>
    );
};

export default NewGame;
