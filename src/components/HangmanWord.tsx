type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
};

const HangmanWord = ({
    guessedLetters,
    wordToGuess,
    reveal = false
}: HangmanWordProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".25em",
                fontSize: "6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "50px"
            }}
        >
            {wordToGuess.split("").map((letter, index) => {
                return (
                    <span
                        style={{ borderBottom: ".1em solid black" }}
                        key={index}
                    >
                        <span
                            style={{
                                visibility:
                                    guessedLetters.includes(letter) || reveal
                                        ? "visible"
                                        : "hidden",
                                color:
                                    !guessedLetters.includes(letter) && reveal
                                        ? "rgb(13,143,67)"
                                        : "black"
                            }}
                        >
                            {letter}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default HangmanWord;
