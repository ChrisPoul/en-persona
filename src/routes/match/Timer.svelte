<script lang="ts">
	import Icon from '@iconify/svelte';

	let seconds = 0;
	let timerRunning = false;
	$: formatedTime = new Date(seconds * 1000).toISOString().substring(14, 19);

	$: if (timerRunning) {
		setTimeout(() => {
			seconds += 1;
		}, 1000);
	}
</script>

<div class="flex justify-between pl-1">
	<span class="flex items-center font-semibold">Timer: {formatedTime}</span>
	<div>
		<button
			class="btn-icon variant-ghost-error"
			disabled={!timerRunning}
			on:click={() => {
				timerRunning = false;
			}}
		>
			<Icon icon="ri:stop-fill" />
		</button>
		<button
			class="btn-icon variant-ghost"
			disabled={timerRunning}
			on:click={() => {
				timerRunning = true;
			}}
		>
			<Icon icon="solar:play-bold" />
		</button>
	</div>
</div>
