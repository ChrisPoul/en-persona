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
		$currentRoundIndex = $rounds.length - 1;
	}
</script>

<div class="card pb-3 w-full">
	<TabGroup
		active="bg-primary-700 bg-opacity-60"
		rounded="rounded-none first:rounded-tl-xl last:rounded-tr-xl last:p-0 cursor-none"
	>
		<div class="flex">
			{#each $rounds as _, index}
				<Tab bind:group={$currentRoundIndex} name={`tab${index}`} value={index}>
					<span>{index + 1}</span>
				</Tab>
			{/each}
			<Tab bind:group={$currentRoundIndex} name={`tab-with-add-button`} value={null}>
				<button
					class="bg-secondary-500 py-2 px-3 transition
          active:bg-secondary-400 rounded-tr-xl"
					on:click={startNewRound}
				>
					New
				</button>
			</Tab>
		</div>

		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#key $currentRoundIndex}
				<Round />
			{/key}
		</svelte:fragment>
	</TabGroup>
</div>
