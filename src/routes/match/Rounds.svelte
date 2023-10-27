<script lang="ts">
	import { Tab, TabGroup, type ModalSettings } from '@skeletonlabs/skeleton';
	import { press } from 'svelte-gestures';
	import Round from './Round.svelte';
	import { currentRoundIndex, rounds } from '$lib/stores/match';
	import Icon from '@iconify/svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	let deleteButtonIsVisible = false;
	$: {
		$currentRoundIndex;
		deleteButtonIsVisible = false;
	}

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
	function confirmRemoveRound(roundIndex: number) {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Confirmar Operación',
			body: 'Borrar ronda de forma permanente?',
			response: (confirmedRemoval: boolean) => {
				if (confirmedRemoval) removeRound(roundIndex);
				else deleteButtonIsVisible = false;
			},
			buttonTextCancel: 'Cancelar',
			buttonTextConfirm: 'Confirmar'
		};
		modalStore.trigger(modalSettings);
	}
	function removeRound(roundIndex: number) {
		if ($rounds.length == 1) return;
		if ($currentRoundIndex == $rounds.length - 1) $currentRoundIndex -= 1;
		$rounds.splice(roundIndex, 1);
		$rounds = $rounds;
		deleteButtonIsVisible = false;
	}
	function handlePress(roundIndex: number) {
		$currentRoundIndex = roundIndex;
		deleteButtonIsVisible = true;
	}
</script>

<div class="card pb-3 w-full overflow-y-hidden">
	<TabGroup
		active="bg-primary-700 bg-opacity-60"
		rounded="rounded-none first:rounded-tl-xl last:rounded-tr-xl last:p-0"
	>
		<div class="flex over">
			{#each $rounds as _, roundIndex}
				<Tab
					class="active:bg-opacity-40 active:bg-surface-500 cursor-none"
					padding="py-0 px-0"
					bind:group={$currentRoundIndex}
					name={`tab${roundIndex}`}
					value={roundIndex}
				>
					<div
						class="flex py-2 px-4 gap-2 items-center"
						use:press={{ timeframe: 300, triggerBeforeFinished: true, spread: 25 }}
						on:press={() => {
							handlePress(roundIndex);
						}}
					>
						{roundIndex + 1}
						<button
							class="btn-icon variant-ghost-error hidden text-lg h-9 w-9"
							class:visible={$currentRoundIndex == roundIndex && deleteButtonIsVisible}
							on:contextmenu|preventDefault={() => {
								return;
							}}
							on:click={() => confirmRemoveRound(roundIndex)}
						>
							<Icon icon="fa-solid:trash-alt" />
						</button>
					</div>
				</Tab>
			{/each}
			<Tab bind:group={$currentRoundIndex} name={`tab-with-add-button`} value={null}>
				<button
					class="bg-secondary-500 py-3 px-3 transition
          active:bg-secondary-400 rounded-tr-xl"
					on:contextmenu|preventDefault={() => {
						return;
					}}
					on:click={startNewRound}
				>
					<Icon icon="mingcute:plus-fill" />
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

<style>
	.visible {
		display: flex;
	}
</style>
