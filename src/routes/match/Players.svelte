<script lang="ts">
	import Icon from '@iconify/svelte';
	import { match } from '$lib/stores/match';
	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';

	let noPlayers = $match.players.length == 0;
	$: if ($match.players.length > 0) {
		noPlayers = false;
	}

	function removePlayer(playerIndex: number) {
		$match.players.splice(playerIndex, 1);
		$match = $match;
	}
</script>

<div>
	<b class="mx-2">Jugadores:</b>
	<div class="flex flex-col pt-2 gap-2 min-h-[4.5em]">
		{#if noPlayers}
		<div class="flex w-full h-28 rounded-2xl bg-primary-100">
			<p class="text-base text-secondary-400 font-semibold m-auto">Aún no has añadido ningún jugador</p>
		</div>
		{/if}
		{#each $match.players as player, playerIndex (player.name)}
			<div
				class="flex justify-between bg-primary-100 p-2 rounded-2xl text-secondary-500"
				transition:fly={{ duration: 200, x: '100vw', opacity: 100, easing: sineOut }}
				on:outroend={() => {
					noPlayers = $match.players.length == 0;
				}}
			>
				<div class="flex items-center">
					<button
						on:click={() => {
							removePlayer(playerIndex);
						}}
					>
						<Icon class="text-3xl" icon="typcn:delete" />
					</button>
					<span class="font-semibold text-2xl">{player.name}</span>
				</div>
				<div class="text-xl font-semibold flex gap-1 items-center">
					<button
						class="rounded-xl bg-error-500 p-2 transition active:bg-error-700"
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
						class="rounded-xl bg-success-500 p-2 h-auto transition active:bg-success-700"
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
