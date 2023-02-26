<script lang="ts">
	import { goto } from '$app/navigation';
	import AppointmentCard from '../../components/AppointmentCard.svelte';
	import Card from '../../components/Card.svelte';
	import type { Appointment } from '../../models';
	import type { Invitation } from '../../models/invitation';
	import { apiCall } from '../../utils/api-call';
	import { getDate, getTime } from '../../utils/time';

	export let data: { invitationList: Appointment[] };
	let { invitationList } = data;

	const rejectInvitation = async (appointmentId: number) => {
		try {
			const response: Invitation = await apiCall(
				'/api/reject-invitation',
				'post',
				'',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || '',
				false
			);

			// pendingInvitations = pendingInvitations.filter((invitation) => invitation.id !== response.id);
		} catch (error) {
			console.log(error);
		}
	};

	const acceptInvitation = async (appointmentId: number) => {
		try {
			const response: Invitation = await apiCall(
				'/api/accept-invitation',
				'post',
				'',
				JSON.stringify({
					appointmentId
				}),
				sessionStorage.getItem('jwt_token') || '',
				false
			);

			// pendingInvitations = pendingInvitations.filter((invitation) => invitation.id !== response.id);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="p-2 md:p-10 flex flex-col gap-6">
	{#each invitationList as invitation}
		<Card>
			<div class="p-2 flex justify-between">
				<div>
					<p class="font-bold">{invitation.title}</p>
					<p class="text-xs">{getDate(invitation.start_date)}</p>
					<p class="text-xs">{getTime(invitation.start_date)}</p>
				</div>
				<div class="flex gap-6">
					<button
						class="btn btn-xs btn-accent h-12"
						on:click={() => acceptInvitation(invitation.id)}>accept</button
					>
					<button
						class="btn btn-xs btn-error  h-12"
						on:click={() => rejectInvitation(invitation.id)}>reject</button
					>
				</div>
			</div>
		</Card>
	{/each}
</div>
