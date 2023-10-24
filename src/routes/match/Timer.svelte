<script lang="ts">
	import Icon from '@iconify/svelte';

	let seconds = 0;
	let timerRunning = false;
	$: formatedTime = new Date(seconds * 1000).toISOString().substring(14, 19);
	const ciclesPerSecond = 1;

	$: if (timerRunning) {
		setTimeout(() => {
			if (!timerRunning) return;
			seconds += 1 / ciclesPerSecond;
		}, 1000 / ciclesPerSecond);
	}

	function resetTimer() {
		timerRunning = false;
		seconds = 0;
	}
</script>

<div class="flex justify-between pl-1">
	<span class="flex items-center font-semibold">Timer: {formatedTime}</span>
	<div class="flex gap-2">
		<button class="btn-icon variant-ghost-error text-xl" on:click={resetTimer}>
			<Icon icon="iconamoon:restart-bold" />
		</button>
		<button
			class="btn-icon variant-ghost text-lg"
			on:click={() => {
				timerRunning = !timerRunning;
			}}
		>
			{#if timerRunning}
				<Icon icon="clarity:pause-solid" />
			{:else}
				<Icon icon="solar:play-bold" />
			{/if}
		</button>
	</div>
</div>
