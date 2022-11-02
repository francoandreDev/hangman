import styles from "../styles/Keyboard.module.css";

type KeyboardProps = {
    disabled?: boolean;
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    language: string;
};

const KEYS_EN = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];

const KEYS_ES = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];

const Keyboard = ({
    disabled = false,
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    language
}: KeyboardProps) => {
    const getKeyLanguage = () => {
        return language === "en" ? KEYS_EN : KEYS_ES;
    };
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
                gap: ".5rem"
            }}
        >
            {getKeyLanguage().map((key) => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${styles.btn} ${
                            isActive ? styles.active : null
                        } ${isInactive ? styles.inactive : null}`}
                        disabled={isInactive || isActive || disabled}
                        key={key}
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    );
};

export default Keyboard;
