<script lang="ts">
	import { Icons } from '../../enums';
	import type { Appointment, AppointmentForm } from '../../models';
	import { myAppointmentsStore } from '../../stores/apointments';
	import { userStore } from '../../stores/user';
	import { apiCall } from '../../utils/api-call';
	import fileToBase64 from '../../utils/to-base64';
	import CreateAppointmentModal from '../create-appointment-modal/CreateAppointmentModal.svelte';
	import Icon from '../Icon.svelte';
	import NavItem from './NavItem.svelte';
	let unique = {};

	const createAppointment = async (formData: AppointmentForm) => {
		let image = '';
		if (formData.image) {
			image = await fileToBase64(formData.image?.[0] as File);
		}

		const newAppointment: Appointment = {
			title: formData.title,
			description: formData.description,
			start_date: new Date(`${formData.start_date} ${formData.start_time}`).toISOString(),
			end_date: new Date(`${formData.end_date} ${formData.end_time}`).toISOString(),
			image,
			can_be_forwarded: formData.can_be_forwarded,
			locations: formData.locations,
			location_selection_type: formData.location_selection_type,
			creator: {
				...$userStore,
				id: $userStore?.id as number
			}
		};

		if (newAppointment.location_selection_type === 'multi') {
			if (formData.location_selection_deadline_date && formData.location_selection_deadline_time) {
				newAppointment.location_selection_deadline = new Date(
					`${formData.location_selection_deadline_date} ${formData.location_selection_deadline_time}`
				).toISOString();
			} else if (formData.location_selection_deadline_date) {
				newAppointment.location_selection_deadline = new Date(
					`${formData.location_selection_deadline_date}`
				).toISOString();
			}
		}

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
<div class="fixed bottom-0 z-50 flex h-28 flex-col justify-end">
	<div class="navbar z-50  h-[90px]  w-screen rounded-t-md bg-white px-6 py-0  shadow">
		<div class="navbar-start  justify-evenly text-xs">
			<NavItem
				path="/appointments"
				icon={Icons.HOME_OUTLINE}
				activeIcon={Icons.HOME_FULL}
				label="Home"
			/>

			<NavItem
				path="/profile"
				icon={Icons.PROFILE_OUTLINE}
				activeIcon={Icons.PROFILE_FULL}
				label="Profilo"
			/>
		</div>
		<div class="navbar-center">
			<!-- modal -->
			<label for="create-appointment-modal" class="ratio-h-w btn-primary btn-circle btn  mb-16 "
				><Icon icon={Icons.ADD} size="26" /></label
			>
		</div>
		<input type="checkbox" id="create-appointment-modal" class="modal-toggle" />

		<!-- restart the component after closing it to clean form and steps -->
		{#key unique}
			<CreateAppointmentModal action={createAppointment} closeAction={closeModal} />
		{/key}

		<div class="navbar-end justify-evenly text-xs">
			<NavItem
				path="/friends"
				icon={Icons.FRIENDS_OUTLINE}
				activeIcon={Icons.FRIENDS_FULL}
				label="Amici"
			/>

			<NavItem
				path="/notifications"
				icon={Icons.NOTIFICATION_OUTLINE}
				activeIcon={Icons.NOTIFICATION_FULL}
				label="Notifiche"
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
