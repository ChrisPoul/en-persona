<script lang="ts">
	import Icon from '@iconify/svelte';
	import { match } from '$lib/stores/match';

	let editing = false;
	let gameTitle = $match.gameTitle;
	$: gameTitle = gameTitle.toUpperCase();
	let errorMessage: string | null = null;

	function focus(element:HTMLInputElement) {
		element.focus()
	}
</script>

<div class="px-4 sm:mx-16">
	{#if editing}
		<form
			class="flex my-2"
			on:submit|preventDefault={() => {
				if (gameTitle.length < 3) {
					errorMessage = 'El nombre debe tener mas de 3 caracteres';
					return;
				}
				editing = false;
				errorMessage = null
				$match.gameTitle = gameTitle;
			}}
		>
			<input
				class="w-full p-2 rounded-l-xl text-center font-semibold"
				type="text"
				placeholder="Nombre del Juego"
				required
				use:focus
				bind:value={gameTitle}
			/>
			<button
				class="rounded-r-xl bg-blue-500 py-2 px-3 transition active:bg-cyan-500 active:scale-100"
				type="submit"
			>
				<Icon icon="iconamoon:check-bold" />
			</button>
		</form>
		{#if errorMessage}
			<p class="text-lg text-center text-red-700">
				{errorMessage}
			</p>
		{/if}
	{:else}
		<h1 class="flex w-full text-4xl justify-center align-top">
			{$match.gameTitle}
			<button
				class="text-2xl h-full p-1"
				on:click={() => {
					editing = true;
				}}
			>
				<Icon icon="material-symbols:edit" />
			</button>
		</h1>
	{/if}
</div>
