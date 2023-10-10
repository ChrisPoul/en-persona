<script lang="ts">
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';
	import { nextQuestionDelayInSeconds } from '$lib/stores/trivia';

	export let restartMatch: () => void;

	function decreseTime() {
		if ($nextQuestionDelayInSeconds <= 1) return;
		$nextQuestionDelayInSeconds -= 1;
	}
	function increaseTime() {
		if ($nextQuestionDelayInSeconds >= 60) return;
		$nextQuestionDelayInSeconds += 1;
	}
</script>

<OverlayMenu title="Ajustes">
	<button on:click={restartMatch}> Reiniciar </button>
	<div>
		<button class="btn-icon variant-filled-error h-10 w-6" on:click={decreseTime}>-</button>
		<span>{$nextQuestionDelayInSeconds}</span>
		<button class="btn-icon variant-filled-success h-10 w-6" on:click={increaseTime}>+</button>
	</div>
</OverlayMenu>
