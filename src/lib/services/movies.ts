export async function getMovies() {
	const MAX_PAGE_NUMBER = 499;
	const random_page_number = Math.floor(Math.random() * MAX_PAGE_NUMBER);
	const baseUrl = 'https://api.themoviedb.org/3/movie/popular';
	const params = new URLSearchParams({
		page: String(random_page_number),
		language: 'es-MX'
	});
	const url = `${baseUrl}?${params}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NThiMTYyZDIxNTQ4ZDVhYTdmODQ2ZTg5YWE4ZDJjMSIsInN1YiI6IjY0ZTM5Njc1ODU2NmQyMDBlMzkwMGE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OCRWnNiOWlbuK26cKUG2YIAd-YUYMS3MW8wrMTylFTw'
		}
	};
	const response = await fetch(url, options);
	const responseJson = await response.json();
	const movies: Movie[] = responseJson.results;
	setCorrectPosterPath(movies);

	return movies;
}

function setCorrectPosterPath(movies: Movie[]) {
	for (let i = 0; i < movies.length; i++) {
		const incomplete_poster_path = movies[i].poster_path;
		movies[i].poster_path = `https://image.tmdb.org/t/p/original${incomplete_poster_path}`;
	}
}
