<script lang="ts">
	import { getTeenQuestion } from '$lib/services/teenGames';
	import { currentGame, currentRating, teenQuestion } from '$lib/stores/teenGames';
	import { scale } from 'svelte/transition';

	const games: TeenGame[] = ['TRUTH', 'DARE', 'NHIE', 'WYR'];
</script>

<div class="grid m-auto w-full">
	{#key $teenQuestion.question}
		<h1 class="col-start-1 row-start-1 text-4xl sm:text-5xl" in:scale={{ delay: 200 }} out:scale>
			{#if $teenQuestion.translations.es}
				{$teenQuestion.translations.es}
			{:else}
				{$teenQuestion.question}
			{/if}
		</h1>
	{/key}
</div>
<div class="grid grid-cols-2 p-2 sm:px-10 gap-x-5 gap-y-4">
	{#each games as game}
		<button
			class="px-3 py-5 rounded-2xl bg-blue-500 font-bold shadow-xl w-full sm:text-2xl
      disabled:bg-gray-400 disabled:border-0 mx-auto text-xl origin-bottom-right"
			class:selected={game == $currentGame}
			on:click={async () => {
				$teenQuestion = await getTeenQuestion(game, $currentRating);
				$currentGame = game;
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

<style lang="postcss">
	.selected {
		@apply bg-slate-200 border-2 border-cyan-500 text-slate-600;
	}
</style>
