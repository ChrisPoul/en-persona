<script lang="ts">
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';
	import { getTeenQuestion } from '$lib/services/teenGames';
	import { currentGame, currentRating, teenQuestion } from '$lib/stores/teenGames';

	async function changeRating() {
		$teenQuestion = await getTeenQuestion($currentGame, $currentRating);
	}
</script>

<OverlayMenu title="Ajustes">
	<select
		class="select variant-ghost-primary font-semibold [&>option]:font-semibold mb-4"
		bind:value={$currentRating}
		on:change={changeRating}
	>
		<option value="pg" selected>Todo Publico</option>
		<option value="pg13">+13</option>
		<option value="r">+18</option>
	</select>
</OverlayMenu>
