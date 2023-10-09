import { getFromLocalStorage } from '$lib/common';
import { writable } from 'svelte/store';

const localKey = 'match';
let storedMatch: Match | null = getFromLocalStorage(localKey);
if (!storedMatch) {
	storedMatch = {
		gameTitle: '',
		comments: '',
		started: '',
		ended: ''
	};
}

export const match = writable(storedMatch);

match.subscribe((value) => {
	localStorage.setItem(localKey, JSON.stringify(value));
});

// rounds
const roundsLocalKey = 'rounds';
let storedRounds: Round[] | null = getFromLocalStorage(roundsLocalKey);
if (!storedRounds) {
	storedRounds = [
		{
			players: [],
			winner: null
		}
	];
}

export const rounds = writable(storedRounds);

rounds.subscribe((value) => {
	localStorage.setItem(roundsLocalKey, JSON.stringify(value));
});

// current round index
const currentRoundIndexKey = 'currentRoundIndex';
let storedCurrentRoundIndex: number | null = getFromLocalStorage(currentRoundIndexKey);
if (!storedCurrentRoundIndex) {
	storedCurrentRoundIndex = 0;
}

export const currentRoundIndex = writable(storedCurrentRoundIndex);

currentRoundIndex.subscribe((value) => {
	localStorage.setItem(currentRoundIndexKey, JSON.stringify(value));
});
