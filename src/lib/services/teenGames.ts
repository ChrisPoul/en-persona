export async function getTeenQuestion(game: TeenGame) {
	const baseUrl = `https://api.truthordarebot.xyz/v1/${game.toLowerCase()}`;
	const params = new URLSearchParams({
		rating: 'r'
	});
	const url = `${baseUrl}?${params}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	};
	const response = await fetch(url, options);
	const teenQuestion: TeenQuestion = await response.json();

	return teenQuestion;
}
