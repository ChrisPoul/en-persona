export async function getTriviaQuestions() {
	const baseUrl = 'https://the-trivia-api.com/v2/questions';
	const params = new URLSearchParams({
		limit: '50',
		region: 'MX'
	});
	const url = `${baseUrl}?${params}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	};
	const response = await fetch(url, options);
	const questions: TriviaQuestion[] = await response.json();
	setQuestionsOptions(questions);

	return questions;
}

function setQuestionsOptions(questions: TriviaQuestion[]) {
	for (const question of questions) {
		const options = question.incorrectAnswers;
		const randomIndex = Math.floor(Math.random() * 4);
		options.splice(randomIndex, 0, question.correctAnswer);
		question.options = options;
	}
}
