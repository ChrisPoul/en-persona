<script lang="ts">
	import { match } from '$lib/stores/match';
</script>

<div>
	<b class="px-2">Comentarios:</b>
	<textarea
		class="w-full h-20 rounded-xl text-justify text-xl font-semibold py-1 px-2 mt-1"
		placeholder="Escribe algun comentario o algo que haya sucecido durante el juego..."
		bind:value={$match.comments}
	/>
</div>
