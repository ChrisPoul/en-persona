<script>
	import Icon from '@iconify/svelte';

	export let onClick = () => {};

	let menuOpened = false;
</script>

{#if menuOpened}
	<div class="fixed flex top-0 left-0 z-20 h-screen w-full bg-black bg-opacity-50 pb-14 sm:pb-0">
		<div
			class="flex flex-col bg-gradient-to-b to-emerald-100 from-slate-400 rounded-2xl
			pt-7 pb-5 w-80 sm:w-96 m-auto min-h-[15em] text-center"
		>
			<h2>Menu</h2>
			<slot />
			<button
				class="px-6 py-4 rounded-2xl bg-green-500 font-bold m-auto mb-0"
				on:click={() => {
					menuOpened = false;
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
			menuOpened = true;
			onClick();
		}}
	>
		<Icon icon="carbon:settings" />
	</button>
{/if}
