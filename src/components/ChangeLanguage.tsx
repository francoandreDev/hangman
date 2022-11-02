import styles from "../styles/ChangeLanguage.module.css";

type ChangeLanguageProp = {
    language: string;
    setLanguage: (language: string) => void;
};

const ChangeLanguage = ({ language, setLanguage }: ChangeLanguageProp) => {
    const toggleLanguage = () => {
        setLanguage(language === "en" ? "es" : "en");
    };
    return (
        <div
            style={{
                position: "absolute",
                top: "50px",
                left: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                textAlign: "justify",
            }}
        >
            <div
                className={`${
                    language === "es" ? styles.british : styles.spain
                } ${styles.btn}`}
            >
                {language === "en" ? "Español" : "English"}
                {language === "es" ? (
                    <div>
                        <span></span>
                    </div>
                ) : null}
            </div>
            <button
                onClick={() => toggleLanguage()}
                style={{
                    width: "100%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                }}
                className={`${styles["text-flag"]}`}
            >
                <p>
                    {language === "es"
                        ? "Press the flag to change the game language"
                        : "Presiona la bandera para cambiar el idioma del juego"}
                </p>
            </button>
        </div>
    );
};

export default ChangeLanguage;
