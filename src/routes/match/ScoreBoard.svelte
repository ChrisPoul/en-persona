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
	<div class="flex flex-col pt-2 gap-2 min-h-[4em] text-slate-700">
		{#if noPlayers}
			<p class="text-base text-slate-200 m-auto">Aún no has añadido ningún jugador</p>
		{/if}
		{#each $match.players as player, playerIndex (player.name)}
			<div
				class="flex justify-between bg-white p-2 rounded-2xl"
				transition:fly={{ duration: 150, x: '100vw', opacity: 100, easing: sineOut }}
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
						class="rounded-xl bg-red-500 p-2 transition active:bg-red-700"
						on:click={() => {
							player.score = player.score - 1;
						}}
					>
						<Icon icon="typcn:minus" />
					</button>
					<input
						class="p-1 w-11 text-center rounded-lg outline-slate-400 border-2 border-slate-300"
						type="number"
						bind:value={player.score}
					/>
					<button
						class="rounded-xl bg-green-500 p-2 h-auto transition active:bg-green-700"
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
