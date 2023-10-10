<script lang="ts">
	import { nextQuestionDelayInSeconds, triviaMatch } from '$lib/stores/trivia';
	import { fly } from 'svelte/transition';

	export let question: TriviaQuestion;
	export let refreshQuestions: () => void;


	let selectedAnswer = '';
	let questionWasAnswered = false;

	function submitAnswer(answer: string) {
		selectedAnswer = answer;
		if (answer == question.correctAnswer) {
			$triviaMatch.players[0].score += 1;
		} else {
			$triviaMatch.players[1].score += 1;
		}
		questionWasAnswered = true;
		setTimeout(() => {
			nextQuestion();
		}, $nextQuestionDelayInSeconds * 1000);
	}
	function nextQuestion() {
		questionWasAnswered = false;
		if ($triviaMatch.currentQuestionIndex == $triviaMatch.questions.length - 1) {
			refreshQuestions();
		} else {
			$triviaMatch.currentQuestionIndex += 1;
		}
		localStorage.setItem('triviaMatch', JSON.stringify($triviaMatch));
	}
</script>

<div class="grid overflow-hidden">
	{#key question.question.text}
		<div
			class="col-start-1 row-start-1"
			out:fly={{ x: '-100vw', opacity: 50 }}
			in:fly={{ x: '100vw', opacity: 50 }}
		>
			<div class="flex flex-col sm:flex-row gap-16 sm:h-full sm:py-5">
				<h1
					class="text-4xl min-h-[4em] w-full
					sm:flex sm:items-center sm:pb-5"
				>
					{question.question.text}
				</h1>
				<div class="flex flex-col gap-4 w-full sm:m-auto">
					{#each question.options as option}
						<button
							class="rounded-2xl variant-filled font-semibold text-2xl p-3 disabled:opacity-70"
							class:selected-answer={option == selectedAnswer}
							class:correct-answer={option == question.correctAnswer && questionWasAnswered}
							on:click={() => {
								submitAnswer(option);
							}}
							disabled={questionWasAnswered === true}
						>
							{option}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/key}
</div>

<style lang="postcss">
	.correct-answer {
		@apply variant-filled-success disabled:!opacity-90;
	}
	.selected-answer {
		@apply bg-white disabled:!opacity-90;
	}
</style>
