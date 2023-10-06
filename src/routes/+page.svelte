<script>
	import Icon from '@iconify/svelte';
	import MovieImg from '$lib/images/ready-set-go.png';
	import { rounds, currentRoundIndex, match } from '$lib/stores/match';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { pb } from '$lib/services/pocketbase';

	let ongoingMatch = false;

	onMount(() => {
		if (localStorage.getItem('match')) {
			ongoingMatch = true;
		}
	});
	function saveMatch() {
		const matchIsValidToSave =
			$rounds[$currentRoundIndex].players.length >= 2 && $match.gameTitle.length > 0;

		if (!matchIsValidToSave) {
			return;
		}
		$match.rounds = $rounds;
		try {
			pb.collection('matches').create($match);
		} catch (error) {
			console.log('Now internet');
		}
	}
	function startNewMatch() {
		saveMatch();
		$rounds = [
			{
				players: [],
				winner: null
			}
		];
		$currentRoundIndex = 0;
		$match = {
			gameTitle: 'Nuevo Juego',
			rounds: [],
			comments: '',
			created: ''
		};
		goto('/match');
	}
</script>

<div class="p-5 sm:p-8 pt-16 sm:pt-8">
	<h1 class="pb-14 sm:pb-8 text-5xl">EN PERSONA</h1>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6">
		<button class="game" on:click={startNewMatch}>
			<Icon class="m-auto text-8xl" icon="typcn:plus" />
		</button>
		<button
			on:click={() => {
				goto('/match');
			}}
			class="game"
			disabled={!ongoingMatch}
		>
			{#if ongoingMatch}
				<Icon icon="ph:play-fill" />
			{:else}
				<b class="text-xl text-center">No ongoing match</b>
			{/if}
		</button>
		<a href="/movies" class="game">
			<img class="object-contain h-full w-full" src={MovieImg} alt="movie" />
		</a>
		<a href="/trivia" class="game">
			<Icon icon="fa:question" />
		</a>
		<a href="/teen-games" class="game">
			<Icon class="text-8xl" icon="fluent-emoji-high-contrast:clinking-beer-mugs" />
		</a>
	</div>
</div>

<style lang="postcss">
	.game {
		@apply flex rounded-3xl bg-gradient-to-t from-primary-600 to-secondary-400
		shadow-xl justify-center items-center text-7xl transition text-primary-100
		h-36 sm:h-40 md:h-48 lg:h-56 p-3;
	}
</style>
