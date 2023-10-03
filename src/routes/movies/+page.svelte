<script lang="ts">
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import { getMovies } from '../../lib/services/movies';
	import MovieImage from './MovieImage.svelte';
	import { movieMatch } from '$lib/stores/movies';

	let loadingState: 'loading' | 'loaded' | 'error' = 'loading';

	$: currentMovie = $movieMatch.movies[$movieMatch.currentMovieIndex];
	$: nextMovie = $movieMatch.movies[$movieMatch.nextMovieIndex];

	onMount(async () => {
		if ($movieMatch.movies.length == 0) {
			await refreshmovies();
		}
		loadingState = 'loaded';
	});

	async function refreshmovies() {
		loadingState = 'loading';
		try {
			$movieMatch.movies = await getMovies();
			loadingState = 'loaded';
		} catch (error) {
			loadingState = 'error';
		}
	}
	async function changeMovie() {
		let currentMovieIndex = $movieMatch.currentMovieIndex;
		let nextMovieIndex = $movieMatch.nextMovieIndex;
		if (currentMovieIndex == $movieMatch.movies.length - 2) {
			currentMovieIndex += 1;
			await refreshmovies();
			nextMovieIndex = 0;
		} else if (currentMovieIndex == $movieMatch.movies.length - 1) {
			currentMovieIndex = 0;
			nextMovieIndex = currentMovieIndex + 1;
		} else {
			currentMovieIndex += 1;
			nextMovieIndex = currentMovieIndex + 1;
		}
		$movieMatch.currentMovieIndex = currentMovieIndex;
		$movieMatch.nextMovieIndex = nextMovieIndex;
	}
</script>

<svelte:head>
	{#if nextMovie}
		{#key currentMovie}
			<link rel="preload" as="image" href={nextMovie.poster_path} />
		{/key}
	{/if}
</svelte:head>

<div
	class="flex flex-col text-center h-screen p-2 py-4 sm:p-4 overflow-hidden
	sm:flex-row"
>
	{#if loadingState == 'loaded'}
		<div class="relative h-full w-full">
			{#key currentMovie.poster_path}
				<MovieImage movie={currentMovie} />
			{/key}
		</div>
		<div class="flex flex-col w-full m-auto text-xl pt-4">
			<h1 class="font-semibold text-4xl m-0">{currentMovie.title}</h1>
			<span class="font-medium pt-1">{currentMovie.release_date}</span>
			<button
				class="bg-pink-600 rounded-2xl py-3 px-5 m-auto mb-2 mt-6
					transition active:bg-rose-600"
				on:click={changeMovie}
			>
				Otra Pelicula
			</button>
		</div>
	{:else if loadingState == 'loading'}
		<div class="m-auto">
			<Circle2 size="10" unit="em" />
		</div>
	{:else if loadingState == 'error'}
		error
	{/if}
</div>
