<script lang="ts">
	import { Tab, TabGroup, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Motion } from 'svelte-motion';
	import { press } from 'svelte-gestures';
	import Round from './Round.svelte';
	import { currentRoundIndex, rounds } from '$lib/stores/match';
	import Icon from '@iconify/svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

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
					class="active:bg-opacity-40 active:bg-surface-500"
					padding="py-0 px-0"
					bind:group={$currentRoundIndex}
					name={`tab${roundIndex}`}
					value={roundIndex}
				>
					<Motion
						let:motion
						whileTap={{ scale: 1.4 }}
						onTapStart={() => ($currentRoundIndex = roundIndex)}
					>
						<div
							class="flex py-2 px-4 gap-3 items-center cursor-none"
							use:motion
							use:press={{ timeframe: 300, spread: 25 }}
							on:press={() => confirmRemoveRound(roundIndex)}
							role="article"
							on:contextmenu|preventDefault={() => {
								return;
							}}
						>
							<span class="select-none">
								{roundIndex + 1}
							</span>
						</div>
					</Motion>
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
