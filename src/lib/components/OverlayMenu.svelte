<script lang="ts">
	import Icon from '@iconify/svelte';

	export let title: string;
	export let onClose = () => {};
	export let onOpen = () => {};

	let menuIsOpened = false;

	function closeMenu() {
		menuIsOpened = false;
	}
</script>

{#if menuIsOpened}
	<button
		class="fixed flex top-0 left-0 z-20 h-screen w-full bg-black bg-opacity-50"
		on:click={closeMenu}
	/>
	<div
		class="flex flex-col card bg-gradient-to-tl variant-gradient-secondary-primary opacity-95
		z-30 pt-7 p-5 w-80 sm:w-96 m-auto min-h-[15em] text-center
		-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2"
	>
		<h1 class="text-4xl pb-3">{title}</h1>
		<div class="flex flex-col m-auto w-56 gap-2 menu">
			<slot />
			<button
				on:click={() => {
					menuIsOpened = false;
					onClose();
				}}
				>Continuar
			</button>
		</div>
	</div>
{:else}
	<button
		class="fixed top-0 right-0 z-10 rounded-xl bg-gray-700 bg-opacity-60
	p-3 m-1 transition active:bg-cyan-500"
		on:click={() => {
			menuIsOpened = true;
			onOpen();
		}}
	>
		<Icon icon="carbon:settings" />
	</button>
{/if}

<style lang="postcss">
	:global(.menu button) {
		@apply px-6 py-4 rounded-2xl bg-green-500 font-bold;
	}
</style>
