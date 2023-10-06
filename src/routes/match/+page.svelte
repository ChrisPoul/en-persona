<script lang="ts">
	import GameTitle from './GameTitle.svelte';
	import ScoreBoard from './Players.svelte';
	import AddPlayerButton from './AddPlayer.svelte';
	import CommentSection from './CommentSection.svelte';
	import { FileButton } from '@skeletonlabs/skeleton';
</script>

<div class="overflow-hidden text-3xl px-3 pb-20 pt-12 sm:pt-10">
	<GameTitle />
	<div class="flex flex-col sm:flex-row gap-10 pt-6 sm:pt-3">
		<div class="flex flex-col gap-5 w-full">
			<ScoreBoard />
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
