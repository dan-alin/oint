<script lang="ts">
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';
	import CreateAppointmentModal from '../create-appointment-modal/CreateAppointmentModal.svelte';
	import { page } from '$app/stores';
	import type { Appointment, AppointmentForm } from '../../models';
	import Icon from '../Icon.svelte';
	import { Icons } from '../../enums';
	import { myAppointmentsStore } from '../../stores/apointments';
	import NavItem from './NavItem.svelte';
	let unique = {};

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		const newAppointment = {
			title: formData.title,
			description: formData.description,
			start_date: new Date(`${formData.start_date} ${formData.start_time}`).toISOString(),
			end_date: new Date(`${formData.end_date} ${formData.end_time}`).toISOString(),
			image,
			can_be_forwarded: formData.can_be_forwarded,
			locations: formData.locations,
			location_selection_type: formData.location_selection_type
		};

		const response: Appointment = await apiCall(
			'/api/create-appointment',
			'post',
			'',
			JSON.stringify(newAppointment),

			sessionStorage.getItem('jwt_token') || '',
			false
		);
		myAppointmentsStore.update((appointments) => [...appointments, response]);
		closeModal();
	};

	const closeModal = () => {
		const modal = document.getElementById('create-appointment-modal');
		modal?.click();
		restart();
	};

	// function to restart the component by setting a new unique key
	const restart = () => {
		unique = {};
	};
</script>

<!-- toggle close modal from card when appointment is created -->
<div class="h-28 fixed bottom-0 flex flex-col justify-end z-50">
	<div class="navbar bg-white  w-screen  px-6 py-0 h-[90px] rounded-t-md z-50  shadow">
		<div class="navbar-start  text-xs justify-evenly">
			<NavItem path="/login" icon={Icons.HOME_OUTLINE} activeIcon={Icons.HOME_FULL} label="Home" />

			<NavItem
				path="/appointments"
				icon={Icons.CALENDAR_OUTLINE}
				activeIcon={Icons.CALENDAR_FULL}
				label="Eventi"
			/>
		</div>
		<div class="navbar-center">
			<!-- modal -->
			<label for="create-appointment-modal" class="btn btn-primary btn-circle ratio-h-w  mb-16 "
				>+</label
			>
		</div>
		<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

		<!-- restart the component after closing it to clean form and steps -->
		{#key unique}
			<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
		{/key}

		<div class="navbar-end text-xs justify-evenly">
			<NavItem
				path="/friends-list"
				icon={Icons.PROFILE_OUTLINE}
				activeIcon={Icons.PROFILE_FULL}
				label="Profilo"
			/>
			<NavItem
				path="/search-friends"
				icon={Icons.FRIENDS_OUTLINE}
				activeIcon={Icons.FRIENDS_FULL}
				label="Amici"
			/>
		</div>
	</div>
</div>

<style>
	.shadow {
		box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.25);
	}

	.ratio-h-w {
		width: 70px;
		height: 70px;
	}
</style>
