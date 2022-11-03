type EndMessageProps = {
    isWinner: boolean;
    isLoser: boolean;
    language: string;
}

const EndMessage = ({isWinner, isLoser, language}: EndMessageProps) => {
    return (
        <div style={{ fontSize: "2rem", textAlign: "center"}}>
                {isWinner &&
                    (language === "en"
                        ? "Winner! - Press Enter to try again"
                        : "Ganaste! - Presiona Enter para volver a jugar")}
                {isLoser &&
                    (language === "en"
                        ? "Nice try! - Press Enter to try again"
                        : "Buen intento! - Presiona Enter para volver a jugar")}
            </div>
    );
};

export default EndMessage;