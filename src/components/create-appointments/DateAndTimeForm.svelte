<script lang="ts">
	import { it } from '../../utils/datepicker-it';

	export let onSubmit: () => void;
	export let start_date: string;
	export let end_date: string;
	export let start_time: string;
	export let end_time: string;
	export let acceptLastDay = false;
	let eventType: 'continuous' | 'once' = 'once';
	import SveltyPicker from 'svelty-picker';

	export let isValid = false;

	const handleChange = (e: Event) => {
		const target = e.target as HTMLButtonElement;
		const id = target.id;

		eventType = id as 'continuous' | 'once';
	};

	$: {
		if (eventType === 'once') {
			isValid = !!start_date && !!start_time && !!end_time;
		} else {
			isValid = !!start_date && !!end_date && !!start_time && !!end_time;
		}
	}
</script>

<form class="grid grid-cols-1  gap-6 " id="1-part" on:submit|preventDefault={onSubmit}>
	<div class="tabs h-4 gap-4">
		<button
			id="once"
			class="tab h-4 p-0 text-xs"
			class:tab-active={eventType === 'once'}
			class:text-primary={eventType === 'once'}
			class:font-semibold={eventType === 'once'}
			on:click|preventDefault={handleChange}>Evento singolo</button
		>
		<button
			id="continuous"
			class="tab h-4 p-0 text-xs"
			class:tab-active={eventType === 'continuous'}
			class:text-primary={eventType === 'continuous'}
			class:font-semibold={eventType === 'continuous'}
			on:click|preventDefault={handleChange}>Evento continuato</button
		>
	</div>
	<div class:columns-2={eventType === 'continuous'}>
		<SveltyPicker
			inputClasses="input-bordered input h-10 w-full"
			format="dd/mm/yyyy"
			placeholder="gg/mm/aaaa"
			bind:value={start_date}
			inputId="start_date"
			name="start date"
			i18n={it}
		/>

		{#if eventType === 'continuous'}
			<div>
				<SveltyPicker
					inputClasses="input-bordered input h-10 w-full"
					format="dd/mm/yyyy"
					placeholder="gg/mm/aaaa"
					bind:value={end_date}
					inputId="end_date"
					name="end date"
					i18n={it}
				/>
			</div>
		{/if}
	</div>

	<div class="columns-2">
		<SveltyPicker
			inputClasses="input-bordered input h-10 w-full"
			format="hh:mm"
			placeholder="--:--"
			bind:value={start_time}
			inputId="start_time"
			name="start time"
			mode="time"
			i18n={it}
		/>
		<div>
			<SveltyPicker
				inputClasses="input-bordered input h-10 w-full"
				format="hh:mm"
				placeholder="--:--"
				bind:value={end_time}
				inputId="end_time"
				name="end time"
				mode="time"
				i18n={it}
			/>
		</div>
	</div>

	<label class=" label w-full cursor-pointer justify-start gap-6  ">
		<input
			type="checkbox"
			class="toggle-secondary toggle toggle-sm"
			bind:checked={acceptLastDay}
			id="forwardable"
		/><span class="label-text text-xs">Consenti di accettare fino al giorno prima</span>
	</label>
</form>
