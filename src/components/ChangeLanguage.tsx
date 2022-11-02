import styles from "../styles/ChangeLanguage.module.css";
import BritishFlag from "./flags/British.flag";
import SpainFlag from "./flags/Spain.flag";

type ChangeLanguageProp = {
    language: string;
    setLanguage: (language: string) => void;
};

const ChangeLanguage = ({
    language,
    setLanguage,
}: ChangeLanguageProp) => {

    const toggleLanguage = (language: string): void => {
        setLanguage(language === "en" ? "es" : "en");
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "100px",
                left: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                textAlign: "justify"
            }}
        >
            <span
                style={{
                    position: "absolute",
                    top: "-45px",
                    textAlign: "center",
                    fontSize: "1.2rem"
                }}
            >
                {language === "en"
                    ? "Change language to spanish "
                    : "Cambiar idioma a inglés "}
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
                    {language === "es"
                        ? "Press the flag to change the game language and press Enter"
                        : "Presiona la bandera para cambiar el idioma del juego y presiona enter"}
                </p>
            </button>
        </div>
    );
};

export default ChangeLanguage;
