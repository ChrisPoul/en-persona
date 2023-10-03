<script lang="ts">
	import { triviaMatch } from '$lib/stores/trivia';
	import { fly } from 'svelte/transition';

	export let question: TriviaQuestion;
	export let refreshQuestions: () => void;

	let selectedAnswer = '';
	$: questionWasAnswered = $triviaMatch.questionWasAnswered;

	function submitAnswer(answer: string) {
		selectedAnswer = answer;
		if (answer == question.correctAnswer) {
			$triviaMatch.players[0].score += 1;
		} else {
			$triviaMatch.players[1].score += 1;
		}
		$triviaMatch.questionWasAnswered = true;
		setTimeout(() => {
			nextQuestion();
		}, $triviaMatch.nextQuestionDelayInSeconds * 1000);
	}
	function nextQuestion() {
		$triviaMatch.questionWasAnswered = false;
		if ($triviaMatch.currentQuestionIndex == $triviaMatch.questions.length - 1) {
			refreshQuestions();
		} else {
			$triviaMatch.currentQuestionIndex += 1;
		}
		localStorage.setItem('triviaMatch', JSON.stringify($triviaMatch));
	}
</script>

<div class="grid">
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
							class="bg-slate-100 text-slate-700 font-semibold text-2xl p-3 rounded-2xl"
							class:uselected-answer={option != selectedAnswer &&
								option != question.correctAnswer &&
								questionWasAnswered}
							class:correct-answer={option == question.correctAnswer && questionWasAnswered}
							class:selected-answer={option == selectedAnswer}
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
		@apply bg-green-400 border-2 border-green-300;
	}
	.selected-answer {
		@apply border-2 border-indigo-700;
	}
	.uselected-answer {
		@apply opacity-70;
	}
</style>
