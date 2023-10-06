<script lang="ts">
	import GameTitle from './GameTitle.svelte';
	import AddPlayerButton from './AddPlayer.svelte';
	import CommentSection from './CommentSection.svelte';
	import { FileButton } from '@skeletonlabs/skeleton';
	import Rounds from './Rounds.svelte';
</script>

<div class="overflow-hidden text-3xl px-3 pb-20 pt-12 sm:pt-10">
	<GameTitle />
	<div class="flex flex-col sm:flex-row gap-6 pt-2 sm:pt-6">
		<div class="flex flex-col gap-5 w-full">
			<Rounds />
		</div>
		<div class="flex flex-col gap-3 w-full">
			<AddPlayerButton />
			<CommentSection />
			<div class="flex justify-center">
				<FileButton name="files" button="btn variant-filled text-xl">Subir Foto</FileButton>
			</div>
		</div>
	</div>
</div>
