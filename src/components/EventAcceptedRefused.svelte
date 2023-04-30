<script lang="ts">
	import { Icons } from '../enums';
	import type { InvitedAppointment } from '../models';
	import EditInvitationModal from './EditInvitationModal.svelte';
	import Icon from './Icon.svelte';

	export let appointment: InvitedAppointment;
	export let index: number;

	$: accepted = appointment.invitationStatus === 'accepted';
</script>

<div
	class="flex w-full flex-col gap-4 font-bold"
	class:text-error={!accepted}
	class:text-success={accepted}
>
	<div
		class="text-re w-full rounded-b-xl p-5 text-center"
		class:bg-red-50={!accepted}
		class:bg-green-50={accepted}
	>
		{#if accepted}
			<Icon icon={Icons.ACCEPTED} size="13" />
			Evento accettato
		{:else}
			<Icon icon={Icons.DENIED} size="13" />
			Evento rifiutato
		{/if}
	</div>
	<label
		for={'edit-invitation-modal' + index}
		class="link-secondary link text-center text-sm font-bold"
	>
		Modifica partecipazione
	</label>
</div>

<EditInvitationModal
	id={'edit-invitation-modal' + index}
	{accepted}
	appointmentId={appointment.appointment.id}
/>
