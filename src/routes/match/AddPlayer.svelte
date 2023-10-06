<script lang="ts">
	import { match } from '$lib/stores/match';
	import Icon from '@iconify/svelte';

	let newPlayerName = '';
	$: {
		newPlayerName = newPlayerName.replace(' ', '');
		newPlayerName = newPlayerName.toUpperCase();
	}
	let errorMessage: string | null = null;
	const maxNumOfPlayers = 16;
	const minNameLength = 2;
	const maxNameLength = 14;
	let playerInputRef: HTMLInputElement;

	function addPlayer() {
		errorMessage = null;
		if (newPlayerName.length < minNameLength) {
			errorMessage = `El nombre tiene que tener mas de ${minNameLength} letras`;
			return;
		}
		if ($match.players.length == maxNumOfPlayers) {
			errorMessage = `No se pueden agregar mas de ${maxNumOfPlayers} jugadores`;
			return;
		}
		for (const player of $match.players) {
			if (newPlayerName == player.name) {
				errorMessage = `El nombre ${newPlayerName} ya está en uso`;
				return;
			}
		}
		let player: Player = {
			name: newPlayerName,
			score: 0
		};
		$match.players.push(player);
		$match = $match;
		newPlayerName = '';
		playerInputRef.focus();
	}
	function focus(element: HTMLInputElement) {
		element.focus();
	}
</script>

<div>
	<label class="gap-1">
		<b class="px-2">Añadir Jugador:</b>
		{#if errorMessage}
			<p class="text-lg text-center font-bold text-error-600 py-1">
				{errorMessage}
			</p>
		{/if}
		<form class="flex text-xl pt-2" on:submit|preventDefault={addPlayer}>
			<input
				class="w-full p-2 rounded-l-xl font-semibold"
				type="text"
				placeholder="Nombre del Jugador"
				maxlength={maxNameLength}
				required
				use:focus
				bind:this={playerInputRef}
				bind:value={newPlayerName}
			/>
			<button
				class="rounded-r-xl bg-secondary-600 py-2 px-3 transition
				active:bg-secondary-400 active:scale-100"
				type="submit"
			>
				<Icon icon="typcn:plus" />
			</button>
		</form>
	</label>
</div>
