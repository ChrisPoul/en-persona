<script>
	import Icon from '@iconify/svelte';
	import MovieImg from '$lib/images/ready-set-go.png';
	import { match } from '$lib/stores/match';
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
		try {
			pb.collection('matches').create($match);
		} catch (error) {
			console.log('Now internet');
		}
	}
	function startNewMatch() {
		const matchIsValidToSave = $match.players.length >= 2 && $match.gameTitle.length > 0;
		if (matchIsValidToSave) {
			saveMatch();
		}
		$match = {
			gameTitle: 'Nuevo Juego',
			players: [],
			comments: '',
			created: ''
		};
		goto('/match');
	}
</script>

<div class="p-4 sm:p-8 pt-16 sm:pt-8">
	<h1 class="pb-14 sm:pb-8 text-5xl">EN PERSONA</h1>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
		<button class="game" on:click={startNewMatch}>
			<Icon class="m-auto" icon="typcn:plus" />
		</button>
		<button
			on:click={() => {
				goto('/match');
			}}
			class="game"
			disabled={!ongoingMatch}
		>
			{#if ongoingMatch}
				<Icon icon="codicon:debug-continue" />
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
		@apply flex w-full shadow-2xl rounded-3xl h-32 p-3 text-7xl
		text-slate-200 transition active:scale-110
		bg-gradient-to-tl from-violet-900 to-violet-400;
	}
	.game :global(*) {
		@apply m-auto;
	}
</style>
