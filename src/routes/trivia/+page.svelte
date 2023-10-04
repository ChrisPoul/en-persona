<script lang="ts">
	import { getTriviaQuestions } from '$lib/services/trivia';
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import GameScore from './GameScore.svelte';
	import OverlayMenu from '$lib/components/OverlayMenu.svelte';
	import TriviaQuestionComponent from './TriviaQuestion.svelte';
	import { triviaMatch } from '$lib/stores/trivia';

	$: currentQuestion = $triviaMatch.questions[$triviaMatch.currentQuestionIndex];
	let loadingState: 'loaded' | 'loading' | 'error' = 'loading';

	onMount(async () => {
		const cachedMatch = localStorage.getItem('triviaMatch');
		if (cachedMatch) {
			const match: TriviaMatch = JSON.parse(cachedMatch);
			$triviaMatch = match;
			loadingState = 'loaded';
		} else {
			refreshQuestions();
		}
		if ($triviaMatch.nextQuestionDelayInSeconds === undefined) {
			$triviaMatch.nextQuestionDelayInSeconds = 2;
		}
	});

	async function refreshQuestions() {
		loadingState = 'loading';
		try {
			$triviaMatch.questions = await getTriviaQuestions();
			$triviaMatch.currentQuestionIndex = 0;
			loadingState = 'loaded';
		} catch (error) {
			loadingState = 'error';
		}
	}

	function restartMatch() {
		localStorage.removeItem('triviaMatch');
		$triviaMatch.players = [
			{ name: 'Tú', score: 0 },
			{ name: 'Ignorancia', score: 0 }
		];
		refreshQuestions();
	}
</script>

{#if loadingState == 'loaded'}
	<div class="flex pt-28 pb-10 px-4 text-xl sm:pt-12 sm:pb-4 overflow-hidden h-screen">
		<GameScore />
		<OverlayMenu title="Ajustes">
			<div class="flex flex-col m-auto w-40">
				<button class="px-6 py-4 rounded-2xl bg-green-500 font-bold mb-0" on:click={restartMatch}>
					Reiniciar
				</button>
			</div>
		</OverlayMenu>
		<TriviaQuestionComponent question={currentQuestion} {refreshQuestions} />
	</div>
{:else if loadingState == 'loading'}
	<div class="h-screen flex">
		<div class="m-auto">
			<Circle2 size="10" unit="em" />
		</div>
	</div>
{:else if loadingState == 'error'}
	some error
{/if}
