<script>
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const version = '0.0.2';

	onMount(() => {
		const storedVersion = localStorage.getItem('version');
		if (storedVersion != version) {
			localStorage.clear();
			localStorage.setItem('version', version);
		}
	});
</script>

<Modal />
<main class="min-h-screen h-full bg-gradient-to-b from-surface-800 to-secondary-700 overscroll-none">
	<a
		class="fixed top-0 left-0 z-10 rounded-xl bg-gray-700 bg-opacity-60
		p-3 m-1 transition active:bg-primary-600"
		href="/"
	>
		<Icon icon="ion:caret-back-outline" />
	</a>
	<slot />
</main>
