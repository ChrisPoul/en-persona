import { writable } from 'svelte/store';

export const teenQuestion = writable<TeenQuestion>({
	rating: 'pg',
	question: '',
	type: 'TRUTH',
	translations: {
		es: null
	}
});

export const currentRating = writable<TeenGameRating>('pg');


export const currentGame = writable<TeenGame>("TRUTH")
