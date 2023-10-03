import { getFromLocalStorage } from '$lib/common';
import { writable } from 'svelte/store';

const localKey = 'match';
let storedMatch: Match | null = getFromLocalStorage(localKey);
if (!storedMatch) {
	storedMatch = {
		gameTitle: '',
		players: [],
		comments: '',
		created: ''
	};
}

export const match = writable(storedMatch);

match.subscribe((value) => {
	localStorage.setItem(localKey, JSON.stringify(value));
});
