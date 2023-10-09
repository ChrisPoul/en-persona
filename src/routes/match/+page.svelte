<script lang="ts">
	import GameTitle from './GameTitle.svelte';
	import CommentSection from './CommentSection.svelte';
	import { FileButton } from '@skeletonlabs/skeleton';
	import Rounds from './Rounds.svelte';
</script>

<div class=" overflow-hidden text-3xl px-3 pb-14 pt-9 sm:pt-6">
	<GameTitle />
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 sm:pt-6">
		<div class="flex flex-col gap-5 w-full sm:order-last">
			<Rounds />
		</div>
		<div class="card px-2 py-4 w-full">
			<CommentSection />
			<div class="flex justify-center pt-5">
				<FileButton name="files" button="btn variant-filled text-xl">Subir Foto</FileButton>
			</div>
		</div>
	</div>
</div>
