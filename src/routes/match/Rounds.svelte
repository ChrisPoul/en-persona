<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Round from './Round.svelte';
	import { currentRoundIndex, rounds } from '$lib/stores/match';

	function startNewRound() {
		const lastRoundPlayers = $rounds[$rounds.length - 1].players;
		const newRoundPlayers: Player[] = [];
		for (const player of lastRoundPlayers) {
			newRoundPlayers.push({
				name: player.name,
				score: 0
			});
		}
		$rounds.push({
			players: newRoundPlayers,
			winner: null
		});
		$rounds = $rounds;
		$currentRoundIndex += 1;
	}
</script>

<div class="relative card pb-3 w-full">
	<TabGroup
		active="bg-primary-700 bg-opacity-60"
		rounded="rounded-none first:rounded-tl-xl last:rounded-tr-xl cursor-none"
	>
		<div class="flex pr-24">
			{#each $rounds as _, index}
				<Tab bind:group={$currentRoundIndex} name={`tab${index}`} value={index}>
					<span>{index + 1}</span>
				</Tab>
			{/each}
		</div>

		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#key $currentRoundIndex}
				<Round />
			{/key}
		</svelte:fragment>
	</TabGroup>
	<button
		class="absolute top-0 right-0 rounded-tr-xl bg-secondary-500 py-2 px-3 transition
    active:bg-secondary-400"
		on:click={startNewRound}
	>
		New
	</button>
</div>
