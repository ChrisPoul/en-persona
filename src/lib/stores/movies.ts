import { getFromLocalStorage } from '$lib/common';
import { writable } from 'svelte/store';

const localKey = 'movieMatch';
let storedMatch: MovieMatch | null = getFromLocalStorage(localKey);
if (!storedMatch) {
	storedMatch = {
		movies: [],
		currentMovieIndex: 0,
		nextMovieIndex: 1
	};
}

export const movieMatch = writable(storedMatch);

movieMatch.subscribe((value) => {
	localStorage.setItem(localKey, JSON.stringify(value));
});
