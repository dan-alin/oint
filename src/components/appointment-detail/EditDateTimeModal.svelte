<script lang="ts">
	import type { Appointment } from '../../models';
	import { apiCall } from '../../utils/api-call';
	import DateAndTimeForm from '../create-appointments/DateAndTimeForm.svelte';
	import BaseBottomModal from './BaseBottomModal.svelte';

	export let id: string;
	export let open = false;
	export let appointment: Appointment;

	let isValid = false;

	const startDate = new Date(appointment.start_date);
	const endDate = new Date(appointment.end_date);
	const startDay = startDate.toLocaleDateString('it-IT', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	const endDay = endDate.toLocaleDateString('it-IT', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	const startTime = startDate.toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
	const endTime = endDate.toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});

	let eventType: 'once' | 'continuous' = startDay === endDay ? 'once' : 'continuous';

	const dateTimeData = {
		start_date: startDay,
		start_time: startTime,
		end_date: eventType === 'once' ? '' : endDay,
		end_time: endTime
	};
	let acceptLastDay = false;

	const saveDateTime = async () => {
		if (!isValid) return;
		if (
			dateTimeData.start_date === startDay &&
			dateTimeData.start_time === startTime &&
			dateTimeData.end_date === (eventType === 'once' ? '' : endDay) &&
			dateTimeData.end_time === endTime
		) {
			open = false;
			return;
		}
		// TODO: implement edit-appointment-date-time api
		appointment = await apiCall<Appointment>(
			'/api/edit-appointment-date-time',
			'post',
			'Data e ora modificati con successo',
			JSON.stringify({ appointmentId: appointment.id, ...dateTimeData }),
			sessionStorage.getItem('jwt_token') || ''
		);
		open = false;
	};
</script>

<BaseBottomModal
	{id}
	bind:open
	title="Cambia data e ora"
	subTitle="...così nessuno può arrivare in ritardo!"
	btnLabel="Salva"
	btnDisabled={!isValid}
	on:click={saveDateTime}
>
	<div class="mt-16">
		<DateAndTimeForm
			bind:start_date={dateTimeData.start_date}
			bind:start_time={dateTimeData.start_time}
			bind:end_date={dateTimeData.end_date}
			bind:end_time={dateTimeData.end_time}
			bind:acceptLastDay
			bind:isValid
			bind:eventType
			on:submit={saveDateTime}
		/>
	</div>
</BaseBottomModal>
