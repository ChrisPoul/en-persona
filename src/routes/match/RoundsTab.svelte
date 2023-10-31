<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { press } from 'svelte-gestures';
	import { currentRoundIndex, rounds } from '$lib/stores/match';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let roundIndex: number;

	const modalStore = getModalStore();

	function confirmRemoveRound(roundIndex: number) {
		$currentRoundIndex = roundIndex;
		const modalSettings: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Borrar Ronda',
			body: 'Borrar ronda de forma permanente?',
			response: (confirmedRemoval: boolean) => {
				if (confirmedRemoval) removeRound(roundIndex);
			},
			buttonTextCancel: 'Cancelar',
			buttonTextConfirm: 'Confirmar'
		};
		setTimeout(() => {
			modalStore.trigger(modalSettings);
		}, 50);
	}
	function removeRound(roundIndex: number) {
		if ($rounds.length == 1) return;
		if ($currentRoundIndex == $rounds.length - 1) $currentRoundIndex -= 1;
		$rounds.splice(roundIndex, 1);
		$rounds = $rounds;
	}
</script>

<div
	class="flex py-2 px-4 gap-3 items-center cursor-none"
	use:press={{ timeframe: 300, spread: 25 }}
	on:press={() => confirmRemoveRound(roundIndex)}
	role="article"
	on:contextmenu|preventDefault={() => {
		return;
	}}
>
	<span class="select-none cursor-none">
		{roundIndex + 1}
	</span>
</div>
