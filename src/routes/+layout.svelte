<script>
	import Icon from '@iconify/svelte';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<main class="min-h-screen">
	<a
		class="fixed top-0 left-0 z-10 rounded-xl bg-gray-700 bg-opacity-60 p-3 m-1 transition active:bg-cyan-500"
		href="/"
	>
		<Icon icon="ion:caret-back-outline" />
	</a>
	<slot />
</main>