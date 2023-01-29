<script lang="ts">
	export let event: any;
</script>

<div class="card w-96 bg-base-300 shadow-xl ">
	<div class="card-body">
		<h2 class="card-title">{event.title}</h2>
		<p>{event.location}</p>
		<p>{event.date}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">View</button>
		</div>
	</div>
</div>
