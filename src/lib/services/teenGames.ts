export async function getTeenQuestion(game: TeenGame, rating: TeenGameRating) {
	const baseUrl = `https://api.truthordarebot.xyz/v1/${game.toLowerCase()}`;
	const params = new URLSearchParams({
		rating: rating
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
