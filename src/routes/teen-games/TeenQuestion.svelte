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
			class="px-3 py-4 btn variant-filled-surface font-bold shadow-xl w-full sm:text-2xl
      mx-auto text-xl origin-bottom-right"
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
		@apply variant-ghost-surface text-primary-400;
	}
</style>
