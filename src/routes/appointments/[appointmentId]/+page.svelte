<script lang="ts">
	import { goto } from '$app/navigation';
	import { noop } from 'svelte/internal';
	import Icon from '../../../components/Icon.svelte';
	import ModalSuccess from '../../../components/ModalSuccess.svelte';
	import AppointmentDetailSection from '../../../components/appointment-detail/AppointmentDetailSection.svelte';
	import FriendsBadge from '../../../components/appointment-detail/FriendsBadge.svelte';
	import InviteesModal from '../../../components/appointment-detail/InviteesModal.svelte';
	import { Icons, Routes } from '../../../enums';
	import type { Appointment, FriendData, AppointmentDetailSectionData } from '../../../models';
	import { invitationService } from '../../../services/invitation.service';
	import { invitedAppointmentsStore } from '../../../stores/apointments';
	import { userStore } from '../../../stores/user';
	import { apiCall } from '../../../utils/api-call';
	import { getDate, getTime } from '../../../utils/time';

	export let data: { appointment: Appointment; friends: FriendData[] };
	let { appointment, friends } = data;

	const friendUsers = friends.map((f) => f.user);
	$: invitees = appointment.invitations?.map((i) => i.invitee);
	const startDate = getDate(appointment.start_date as Date);
	const startTime = getTime(appointment.start_date as Date);
	$: loggedUserInvitation = $invitedAppointmentsStore?.find(
		(inv) => inv.appointment.id === appointment.id
	);
	$: invitationPending = loggedUserInvitation?.invitationStatus === 'pending';
	$: loggedUserIsOwner = $userStore.id === appointment.creator_id;
	const locationSelectionDeadline = appointment.location_selection_deadline;
	let checked = appointment.can_be_forwarded;
	let openModal = false;
	let modalViewType: 'owner' | 'inviteeRead' | 'inviteeEdit' = 'owner';
	let votingAllowed = appointment.location_selection_type === 'multi';
	if (
		appointment.location_selection_type === 'multi' &&
		new Date(locationSelectionDeadline as string).getTime() > new Date().getTime()
	) {
		votingAllowed = true;
	}

	const calcLocationBtnData = (): [string, () => void] => {
		if (appointment.location_selection_type === 'multi') {
			return votingAllowed
				? ['Vota!!!!', () => goto(`${Routes.APPOINTMENTS}/${appointment.id}${Routes.POLL}`)]
				: ['Apri con Maps', noop];
		} else {
			return loggedUserIsOwner ? ['Cambia locassscion', noop] : ['Apri con Maps', noop];
		}
	};

	let locationSectionData: AppointmentDetailSectionData;
	$: {
		const [btnLabel, callback] = calcLocationBtnData();
		loggedUserIsOwner;
		locationSectionData = {
			icon: Icons.LOCATION_FULL,
			firstRow: votingAllowed ? 'Mettiamola ai sondaggi' : appointment.locations[0].name,
			secondRow: votingAllowed
				? 'Hai la possibilità di scegliere!'
				: appointment.locations[0].address,
			btnLabel,
			callback
		};
	}

	const acceptAppointment = async () => {
		appointment.id &&
			invitationService.acceptAppointment(
				appointment.id,
				sessionStorage.getItem('jwt_token') || ''
			);
	};

	const declineAppointment = async () => {
		appointment.id &&
			invitationService.declineAppointment(
				appointment.id,
				sessionStorage.getItem('jwt_token') || ''
			);
	};

	const triggerOpenModal = (viewType: 'owner' | 'inviteeRead' | 'inviteeEdit') => {
		modalViewType = viewType;
		openModal = true;
	};

	const toggleForwardable = async (changeEvent: Event) => {
		if (changeEvent.target) {
			const target = changeEvent.target as HTMLInputElement;
			await apiCall(
				'/api/update-appointment',
				'put',
				'Evento aggiornato',
				JSON.stringify({
					...appointment,
					can_be_forwarded: target.checked
				}),
				sessionStorage.getItem('jwt_token') || ''
			);
		}
	};

	const deleteAppointment = async () => {
		const response: any = await apiCall(
			'/api/delete-appointment',
			'delete',
			'Evento eliminato',
			JSON.stringify({
				appointmentId: appointment.id
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
		goto(Routes.APPOINTMENTS);
	};

	const updateAppointment = (updatedAppointment: Appointment) => {
		appointment = updatedAppointment;
	};
</script>

{#if $userStore}
	<div class="relative h-52 w-full bg-base-300">
		<h1 class="absolute top-10 z-50 w-full p-6">
			<a href={Routes.APPOINTMENTS}>
				<Icon icon={Icons.ARROW} color="white" />
			</a>
			<p class="text-xl font-normal text-white">Dettaglio</p>
			<div class="flex w-full justify-between">
				<span class="text-2xl font-bold text-white">{appointment.title}</span>
				<Icon icon={Icons.SHARE} color="white" />
			</div>
		</h1>
		<img
			class="h-full w-full object-cover brightness-40"
			src={appointment.image ? appointment.image : '/wp.jpg'}
			alt="event"
		/>
		<div class="absolute bottom-0 w-full translate-y-1/2 ">
			<FriendsBadge friends={invitees} />
		</div>
		<button
			on:click={() => triggerOpenModal(loggedUserIsOwner ? 'owner' : 'inviteeRead')}
			class="link-secondary mx-auto mt-8 block cursor-pointer text-center text-sm font-bold underline"
		>
			{loggedUserIsOwner ? 'Modifica partecipanti' : 'Vedi tutti i partecipanti'}
		</button>
	</div>

	<div class="mt-16 p-6 text-sm">
		<h4 class="font-bold">Dimmi dove e quando:</h4>
		<!-- Data e ora -->
		<AppointmentDetailSection
			data={{
				icon: Icons.DATE,
				firstRow: startDate,
				secondRow: 'Ora ' + startTime,
				btnLabel: loggedUserIsOwner ? 'Cambia data e ora' : 'Aggiungi al calendario'
			}}
		/>
		<!-- Location -->
		<AppointmentDetailSection data={locationSectionData} />

		<!-- Owner -->
		<AppointmentDetailSection
			data={{
				icon: Icons.PROFILE_FULL,
				firstRow: `${appointment.creator.name} ${appointment.creator.surname} ${
					loggedUserIsOwner ? ' (tu)' : ''
				}`,
				secondRow: 'Owner evento'
			}}
		/>

		<!-- Descrizione -->
		<div class="mt-10">
			<h4 class="font-bold">Descrizione:</h4>
			<p>{appointment.description}</p>
		</div>

		<!-- Evento pubblico toggle -->

		<div class="mt-10 flex items-center">
			<input
				id="public-toggle"
				type="checkbox"
				class="toggle-secondary toggle toggle-sm"
				bind:checked
				on:change={toggleForwardable}
				disabled={!loggedUserIsOwner}
			/>
			<label for="public-toggle" class="ml-4 font-bold" class:text-disabled={!checked}>
				Evento pubblico
			</label>
			{#if checked && !loggedUserIsOwner}
				<button
					on:click={() => triggerOpenModal('inviteeEdit')}
					class="link-secondary link ml-auto font-bold"
				>
					Estendi
				</button>
			{/if}
		</div>

		<!-- Actions -->
		<div class="absolute left-0 bottom-10 w-full px-6">
			{#if loggedUserIsOwner}
				<label for="delete-appointment-modal" class="btn-outline btn-primary btn w-full">
					Elimina evento
				</label>
			{:else if invitationPending}
				<div class="flex gap-1">
					<button class="btn-outline btn-primary btn flex-1" on:click={declineAppointment}>
						Rifiuta
					</button>
					<button class="btn-primary btn flex-1" on:click={acceptAppointment}>Partecipa</button>
				</div>
			{:else}
				<div class="flex w-full flex-col gap-4">
					<button
						class="btn-outline btn pointer-events-none w-full gap-1 {loggedUserInvitation?.invitationStatus ===
						'accepted'
							? 'btn-success bg-green-50'
							: 'btn-error bg-red-50'}"
					>
						<Icon
							icon={loggedUserInvitation?.invitationStatus === 'accepted'
								? Icons.ACCEPTED
								: Icons.DENIED}
							size="13"
						/>
						{loggedUserInvitation?.invitationStatus === 'accepted'
							? 'Evento accettato'
							: 'Evento rifiutato'}
					</button>
					<button
						class="link-secondary link font-bold"
						on:click={() => {
							invitationPending = true;
						}}
					>
						Modifica partecipazione
					</button>
				</div>
			{/if}
		</div>

		<!-- Modals -->
		<InviteesModal
			bind:open={openModal}
			viewType={modalViewType}
			friends={friendUsers}
			appointmentId={appointment.id}
			{invitees}
			creatorId={appointment.creator.id}
			{updateAppointment}
		/>

		<ModalSuccess
			id="delete-appointment-modal"
			title="Sei sicuro di voler eliminare questo evento?"
			subTitle="Ricordati che non c'è modo di tornare indietro... è un po’ come quando tagli i capelli troppo corti e poi ti penti immediatamente"
			confirmBtnLabel="Conferma"
			cancelBtnLabel="Annulla"
			onConfirm={deleteAppointment}
		/>
	</div>
{/if}
