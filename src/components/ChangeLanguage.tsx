import styles from "../styles/ChangeLanguage.module.css";
import BritishFlag from "./flags/British.flag";
import SpainFlag from "./flags/Spain.flag";

type ChangeLanguageProp = {
    language: string;
    setLanguage: (language: string) => void;
    setGuessedLetters: (letter: string[]) => void;
    changeWord: (language: string) => void;
};

const ChangeLanguage = ({
    language,
    setLanguage,
    setGuessedLetters,
    changeWord
}: ChangeLanguageProp) => {
    const toggleLanguage = (language: string): void => {
        setLanguage(language === "en" ? "es" : "en");
        setGuessedLetters([]);
        changeWord(language === "en" ? "es" : "en");
    };

    return (
        <div className={`${styles["main-container-position"]}`}>
            <span
                style={{
                    position: "absolute",
                    top: "-45px",
                    textAlign: "center",
                    fontSize: "1.2rem"
                }}
            >
                {language === "en"
                    ? "Cambiar idioma a español "
                    : "Change language to english "}
            </span>

            {language === "en" ? <BritishFlag /> : <SpainFlag />}

            <button
                onClick={() => toggleLanguage(language)}
                style={{
                    width: "100%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center"
                }}
                className={`${styles["text-flag"]}`}
            >
                <p style={{ fontSize: "1rem" }}>
                    {language === "en"
                        ? "Press the flag to change the game language"
                        : "Presiona la bandera para cambiar el idioma del juego"}
                </p>
            </button>
        </div>
    );
};

export default ChangeLanguage;
