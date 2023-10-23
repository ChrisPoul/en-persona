<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { press } from 'svelte-gestures';
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
	function handlePress(roundIndex: number) {
		console.log('pene');
		if ($rounds.length == 1) return;
		if ($currentRoundIndex == $rounds.length - 1) $currentRoundIndex -= 1;
		$rounds.splice(roundIndex, 1);
		$rounds = $rounds;
	}
</script>

<div class="card pb-3 w-full">
	<TabGroup
		active="bg-primary-700 bg-opacity-60"
		rounded="rounded-none first:rounded-tl-xl last:rounded-tr-xl last:p-0"
	>
		<div class="flex">
			{#each $rounds as _, index}
				<Tab
					class="active:bg-opacity-40 active:bg-primary-400 cursor-none"
					padding="py-0 px-0"
					bind:group={$currentRoundIndex}
					name={`tab${index}`}
					value={index}
				>
					<div
						class="py-2 px-4"
						use:press
						on:press={() => {
							handlePress(index);
						}}
					>
						{index + 1}
					</div>
				</Tab>
			{/each}
			<Tab bind:group={$currentRoundIndex} name={`tab-with-add-button`} value={null}>
				<button
					class="bg-secondary-500 py-2 px-3 transition
          active:bg-secondary-400 rounded-tr-xl"
					on:contextmenu|preventDefault={() => {
						return;
					}}
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
