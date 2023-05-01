<script lang="ts">
	import { Icons } from '../../enums';
	import type { Appointment, LocationRequest } from '../../models';
	import { apiCall } from '../../utils/api-call';
	import InputText from '../InputText.svelte';
	import BaseBottomModal from './BaseBottomModal.svelte';

	export let id: string;
	export let open = false;
	export let appointment: Appointment;

	const initialName = appointment.locations[0].name;
	const initialAddress = appointment.locations[0].address;

	$: submitDisabled = locationData.address === '' || locationData.name === '';
	let locationData: LocationRequest & { id: number } = {
		id: appointment.locations[0].id,
		name: initialName,
		address: initialAddress
	};

	const saveLocation = async () => {
		if (
			locationData.address === '' ||
			locationData.name === '' ||
			(locationData.name === initialName && locationData.address === initialAddress)
		) {
			open = false;
			return;
		}
		// TODO: implement edit-appointment-location api
		appointment = await apiCall<Appointment>(
			'/api/edit-appointment-location',
			'post',
			'Location modificata con successo',
			JSON.stringify({ appointmentId: appointment.id, ...locationData }),
			sessionStorage.getItem('jwt_token') || ''
		);
		open = false;
	};
</script>

<BaseBottomModal
	{id}
	bind:open
	title="Cambia location"
	subTitle="Non sei ancora soddisfatto della tua scelta?"
	btnLabel="Salva"
	btnDisabled={submitDisabled}
	on:click={saveLocation}
>
	<div class="mt-16 flex flex-col gap-4">
		<InputText
			bind:value={locationData.name}
			name="location-name"
			id="location-name"
			type="text"
			placeholder="Nome location"
			required
			icon={Icons.LOCATION_OUTLINE}
		/>
		<InputText
			bind:value={locationData.address}
			name="location-address"
			id="location-address"
			type="text"
			placeholder="Indirizzo"
			required
		/>
	</div>
</BaseBottomModal>
