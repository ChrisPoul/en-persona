<script lang="ts">
	import { rounds, currentRoundIndex } from '$lib/stores/match';
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

	$: currentRound = $rounds[$currentRoundIndex];

	function addPlayer() {
		errorMessage = null;
		if (newPlayerName.length < minNameLength) {
			errorMessage = `El nombre tiene que tener mas de ${minNameLength} letras`;
			return;
		}
		if (currentRound.players.length == maxNumOfPlayers) {
			errorMessage = `No se pueden agregar mas de ${maxNumOfPlayers} jugadores`;
			return;
		}
		for (const player of currentRound.players) {
			if (newPlayerName == player.name) {
				errorMessage = `El nombre ${newPlayerName} ya está en uso`;
				return;
			}
		}
		const scoresTotal = currentRound.players.reduce((previousTotal, currentPlayer) => {
			return previousTotal + currentPlayer.score;
		}, 0);
		const totalPlayers = currentRound.players.length > 0 ? currentRound.players.length : 1;
		const avarageScore = Math.floor(scoresTotal / totalPlayers);
		let player: Player = {
			name: newPlayerName,
			score: avarageScore
		};
		currentRound.players.splice(0, 0, player);
		$rounds = $rounds;
		newPlayerName = '';
		playerInputRef.focus();
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
				bind:this={playerInputRef}
				bind:value={newPlayerName}
			/>
			<button class="btn variant-filled-secondary rounded-l-none bgpy-2 px-3" type="submit">
				<Icon icon="typcn:plus" />
			</button>
		</form>
	</label>
</div>
