import { getFromLocalStorage } from '$lib/common';
import { writable } from 'svelte/store';

const localKey = 'triviaMatch';

let storedMatch: TriviaMatch | null = getFromLocalStorage('triviaMatch');
if (!storedMatch) {
	storedMatch = {
		questions: [],
		currentQuestionIndex: 0,
		players: [
			{ name: 'Tú', score: 0 },
			{ name: 'Ignorancia', score: 0 }
		]
	};
}

export const triviaMatch = writable(storedMatch);

triviaMatch.subscribe((value) => {
	localStorage.setItem(localKey, JSON.stringify(value));
});
