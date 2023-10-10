interface TriviaQuestion {
	category: string;
	question: { text: string };
	correctAnswer: string;
	incorrectAnswers: string[];
	options: string[];
}

interface TriviaMatch {
	questions: TriviaQuestion[];
	currentQuestionIndex: number;
	players: Player[];
}
