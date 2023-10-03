<script lang="ts">
	import { fly } from 'svelte/transition';

	export let movie: Movie;
</script>

<img
	class="sm:object-contain h-full w-full absolute"
	src={movie.poster_path}
	alt={movie.title}
	in:fly={{ duration: 300, delay: 150, x: '100vw', opacity: 1 }}
	out:fly={{ duration: 300, x: '-100vw', opacity: 1 }}
/>
