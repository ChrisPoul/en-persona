<script lang="ts">
	import Icon from '@iconify/svelte';
	import { triviaMatch } from '$lib/stores/trivia';

</script>

<div class="fixed top-0 left-0 flex justify-center w-full pt-4 gap-2">
	{#each $triviaMatch.players as player}
		<span class="flex">
			{#if player.name == 'Ignorancia'}
				<Icon class="text-black text-3xl" icon="octicon:dot-fill-24" />
			{:else}
				<Icon class="text-blue-600 text-3xl" icon="octicon:dot-fill-24" />
			{/if}
			{player.score}
		</span>
	{/each}
</div>
