<script lang="ts">
	import GameTitle from './GameTitle.svelte';
	import Rounds from './Rounds.svelte';
	import Timer from './Timer.svelte';
</script>

<div class=" overflow-hidden text-3xl px-3 pb-14 pt-9 sm:pt-6">
	<GameTitle />
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 sm:pt-6">
		<div class="flex flex-col gap-5 w-full sm:order-last">
			<Rounds />
		</div>
		<div class="card flex flex-col gap-2 px-3 pt-4 pb-6 w-full h-min">
			<Timer/>
		</div>
	</div>
</div>
