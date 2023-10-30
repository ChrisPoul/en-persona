<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import { rounds, currentRoundIndex } from '$lib/stores/match';
	import AddPlayer from './AddPlayer.svelte';

	let noPlayers = $rounds[$currentRoundIndex].players.length == 0;

	$: if ($rounds[$currentRoundIndex].players.length > 0) {
		noPlayers = false;
	}

	function removePlayer(playerIndex: number) {
		$rounds[$currentRoundIndex].players.splice(playerIndex, 1);
		$rounds = $rounds;
	}
</script>

<div class="p-2 sm:px-3 pt-0">
	<AddPlayer />
	<div class="flex flex-col gap-2 pt-2">
		<b class="pl-2">Jugadores</b>
		<div class="flex flex-col gap-2 min-h-[4.5em] sm:min-h-[2em]">
			{#if noPlayers}
				<p class="text-base font-semibold m-auto">Aún no has añadido ningún jugador</p>
			{/if}
			{#each $rounds[$currentRoundIndex].players as player, playerIndex (player.name)}
				<div
					class="flex justify-between bg-primary-100 p-2 rounded-2xl text-secondary-500"
					in:fly={{ duration: 400, y: '-100vh', opacity: 100, easing: sineOut }}
					out:fly={{ duration: 200, x: '100vw', opacity: 100, easing: sineOut }}
					on:outroend={() => {
						noPlayers = $rounds[$currentRoundIndex].players.length == 0;
					}}
				>
					<div class="flex items-center">
						<button
							class="btn-icon variant-ghost-secondary h-6 w-6"
							on:click={() => {
								removePlayer(playerIndex);
							}}
						>
							<Icon class="text-2xl" icon="typcn:delete" />
						</button>
						<span class="font-semibold text-2xl w-28">{player.name}</span>
					</div>
					<div class="text-xl font-semibold flex gap-1 items-center">
						<button
							class="btn variant-filled-error p-3"
							on:click={() => {
								player.score = player.score - 1;
							}}
						>
							<Icon icon="typcn:minus" />
						</button>
						<input
							class="p-1 w-11 text-center rounded-lg border-2 border-secondary-300"
							type="number"
							bind:value={player.score}
						/>
						<button
							class="btn variant-filled-success p-3"
							on:click={() => {
								player.score = player.score + 1;
							}}
						>
							<Icon icon="typcn:plus" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
