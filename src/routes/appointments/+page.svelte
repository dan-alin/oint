<script lang="ts">
	import { json } from '@sveltejs/kit';
	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import type { Appointment } from '../../models';

	// export let data: { appointments: any };

	let appointments: Appointment[] = [
		{
			id: 0,
			creator_id: 0,
			address: 'via prenestina',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'appuntamento con il team',
			title: 'Team'
		},
		{
			id: 1,
			creator_id: 1,
			address: 'via casilina',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'cena con i colleghi',
			title: 'Cena'
		},
		{
			id: 2,
			creator_id: 2,
			address: 'Monte livata',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'gita in montagna',
			title: 'Gita'
		},
		{
			id: 3,
			creator_id: 3,
			address: 'via santa maria',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'partita di calcetto ',
			title: 'Calcetto'
		},
		{
			id: 1,
			creator_id: 1,
			address: 'via casilina',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'cena con i colleghi',
			title: 'Cena'
		},
		{
			id: 2,
			creator_id: 2,
			address: 'Monte livata',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'gita in montagna',
			title: 'Gita'
		},
		{
			id: 3,
			creator_id: 3,
			address: 'via santa maria',
			can_be_forwarded: true,
			start_date: new Date(),
			end_date: new Date(),
			description: 'partita di calcetto ',
			title: 'Calcetto'
		}
	];
</script>

<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
	{#each appointments as appointment}
		<AppointmentCard event={appointment} handleClick={() => console.log('clicked')} />
	{/each}
</div>
