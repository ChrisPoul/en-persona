interface Movie {
	id: number;
	title: string;
	poster_path: string;
	release_date: string;
}

interface MovieMatch {
	movies: Movie[];
	currentMovieIndex: number;
	nextMovieIndex: number;
}
