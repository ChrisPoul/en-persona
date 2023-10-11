<script lang="ts">
	import { getTeenQuestion } from '$lib/services/teenGames';
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import TeenQuestionComponent from './TeenQuestion.svelte';
	import SettingsMenu from './SettingsMenu.svelte';
	import { currentGame, currentRating, teenQuestion } from '$lib/stores/teenGames';

	let loaded = false;

	onMount(async () => {
		$teenQuestion = await getTeenQuestion($currentGame, $currentRating);
		loaded = true;
	});
</script>

<div class="flex flex-col h-screen w-full pb-10 px-2 sm:pb-2">
	{#if loaded}
		<TeenQuestionComponent />
	{:else}
		<div class="m-auto">
			<Circle2 size="10" unit="em" />
		</div>
	{/if}
	<SettingsMenu/>
</div>
