<script lang="ts">
	import { getTeenQuestion } from '$lib/services/teenGames';
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import { scale } from 'svelte/transition';

	let teenQuestion: TeenQuestion;
	let loaded = false;
	const games: TeenGame[] = ['TRUTH', 'DARE', 'NHIE', 'WYR'];
	let currentGame: TeenGame = 'TRUTH';

	onMount(async () => {
		teenQuestion = await getTeenQuestion(currentGame);
		loaded = true;
	});
</script>

<div class="flex flex-col h-screen w-full pb-10 px-2 sm:pb-0">
	{#if loaded}
		<div class="grid m-auto w-full">
			{#key teenQuestion.question}
				<h1
					class="col-start-1 row-start-1 text-4xl sm:text-5xl"
					in:scale={{ delay: 200 }}
					out:scale
				>
					{#if teenQuestion.translations.es}
						{teenQuestion.translations.es}
					{:else}
						{teenQuestion.question}
					{/if}
				</h1>
			{/key}
		</div>
		<div class="grid grid-cols-2 p-2 sm:px-10 gap-x-5 gap-y-4">
			{#each games as game}
				<button
					class="px-3 py-5 rounded-2xl bg-blue-500 font-bold shadow-xl w-full sm:text-2xl
					disabled:bg-gray-400 disabled:border-0 mx-auto text-xl origin-bottom-right"
					class:selected={game == currentGame}
					on:click={async () => {
						teenQuestion = await getTeenQuestion(game);
						currentGame = game;
					}}
				>
					{#if game == 'DARE'}
						Reto
					{:else if game == 'TRUTH'}
						Verdad
					{:else if game == 'NHIE'}
						Nunca Nunca
					{:else if game == 'WYR'}
						Que Prefieres
					{/if}
				</button>
			{/each}
		</div>
	{:else}
		<div class="m-auto">
			<Circle2 size="10" unit="em" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.selected {
		@apply bg-slate-200 border-2 border-cyan-500 text-slate-600;
	}
</style>
