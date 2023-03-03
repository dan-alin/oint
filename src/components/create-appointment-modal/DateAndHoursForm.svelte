<script lang="ts">
	import InputText from '../InputText.svelte';

	export let onSubmit: (
		start_date: string,
		end_date: string,
		start_time: string,
		end_time: string
	) => void;
	export let start_date: string;
	export let end_date: string;
	export let start_time: string;
	export let end_time: string;

	const handleFormSubmit = (e: Event) => {
		e.preventDefault();
		onSubmit(start_date, end_date, start_time, end_time);
	};
</script>

<form
	class="grid grid-cols-1 gap-6 grid-rows-3 "
	id="2-part"
	on:submit|preventDefault={handleFormSubmit}
>
	<div class="columns-2   gap-6">
		<InputText
			type="date"
			label="Dal"
			id="start_date"
			name="start_date"
			placeholder="Insert the starting date"
			required
			bind:value={start_date}
		/>
		<InputText
			type="date"
			label="Al"
			id="end_date"
			name="end date"
			placeholder="Insert the ending date"
			bind:value={end_date}
		/>
	</div>

	<div class="columns-2   gap-6">
		<InputText
			type="time"
			label="Ora inizio"
			id="start_time"
			name="start time"
			placeholder="Insert the starting time"
			required
			bind:value={start_time}
		/>
		<InputText
			type="time"
			label="Ora fine"
			id="end_time"
			name="end time"
			required
			placeholder="Insert the ending time"
			bind:value={end_time}
		/>
	</div>
	<div class="col-span-1" />
</form>
