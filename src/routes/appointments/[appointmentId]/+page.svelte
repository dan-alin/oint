<script lang="ts">
	import AddInveteesModal from '../../../components/AddInveteesModal.svelte';
	import AppointmentLocationItem from '../../../components/appointment-detail/AppointmentLocationItem.svelte';
	import type { Appointment, FriendData } from '../../../models';
	import { apiCall } from '../../../utils/api-call';
	import { getDate, getTime } from '../../../utils/time';

	export let data: { appointment: Appointment; friends: FriendData[] };
	let { appointment, friends } = data;

	const startDate = getDate(appointment.start_date);
	const endDate = getDate(appointment.end_date);

	const startTime = getTime(appointment.start_date);
	const endTime = getTime(appointment.end_date);

	const addInvitee = async (inviteeId: number) => {
		const response: any = await apiCall(
			'/api/add-invitee',
			'post',
			'Invito mandato',
			JSON.stringify({
				appointmentId: appointment.id,
				inviteeId
			}),
			sessionStorage.getItem('jwt_token') || ''
		);
	};
</script>

<!-- <pre>{JSON.stringify(appointment, null, 2)}</pre> -->

<div class="h-96 w-full bg-base-300  ">
	<img
		class="object-cover h-full w-full"
		src={appointment.image ? appointment.image : '/wp.jpg'}
		alt="event"
	/>
</div>
<div class="p-2">
	<h2 class="text-2xl font-bold">
		{appointment.title}
	</h2>
	<div class="text-xs">{appointment.description}</div>
	<!-- start date -->
	<div class="flex items-center ">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.9764 18.2269H7.75711C7.10094 18.2269 6.5667 17.6856 6.5667 17.0208V12.1098H17.1668V17.0208C17.1668 17.6856 16.6325 18.2269 15.9764 18.2269ZM15.8172 5.39379C15.809 4.82217 15.3522 4.35944 14.787 4.35944C14.2207 4.35944 13.7629 4.82217 13.7557 5.39379H9.97778C9.97055 4.82217 9.51277 4.35944 8.9465 4.35944C8.38126 4.35944 7.92452 4.82217 7.91625 5.39379H7.75711C5.96115 5.39379 4.5 6.87413 4.5 8.69367V17.0208C4.5 18.8404 5.96115 20.3207 7.75711 20.3207H15.9764C17.7723 20.3207 19.2335 18.8404 19.2335 17.0208V8.69367C19.2335 6.87413 17.7723 5.39379 15.9764 5.39379H15.8172Z"
				fill="black"
			/>
			<mask
				id="mask0_0_1664"
				style="mask-type:luminance"
				maskUnits="userSpaceOnUse"
				x="4"
				y="4"
				width="16"
				height="17"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.9764 18.2269H7.75711C7.10094 18.2269 6.5667 17.6856 6.5667 17.0208V12.1098H17.1668V17.0208C17.1668 17.6856 16.6325 18.2269 15.9764 18.2269ZM15.8172 5.39379C15.809 4.82217 15.3522 4.35944 14.787 4.35944C14.2207 4.35944 13.7629 4.82217 13.7557 5.39379H9.97778C9.97055 4.82217 9.51277 4.35944 8.9465 4.35944C8.38126 4.35944 7.92452 4.82217 7.91625 5.39379H7.75711C5.96115 5.39379 4.5 6.87413 4.5 8.69367V17.0208C4.5 18.8404 5.96115 20.3207 7.75711 20.3207H15.9764C17.7723 20.3207 19.2335 18.8404 19.2335 17.0208V8.69367C19.2335 6.87413 17.7723 5.39379 15.9764 5.39379H15.8172Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_0_1664)">
				<rect x="-58.854" y="-58.3806" width="141.441" height="141.441" fill="#373A42" />
			</g>
		</svg>{startDate}
	</div>
	<!-- end date -->
	<div class="flex items-center">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.9764 18.2269H7.75711C7.10094 18.2269 6.5667 17.6856 6.5667 17.0208V12.1098H17.1668V17.0208C17.1668 17.6856 16.6325 18.2269 15.9764 18.2269ZM15.8172 5.39379C15.809 4.82217 15.3522 4.35944 14.787 4.35944C14.2207 4.35944 13.7629 4.82217 13.7557 5.39379H9.97778C9.97055 4.82217 9.51277 4.35944 8.9465 4.35944C8.38126 4.35944 7.92452 4.82217 7.91625 5.39379H7.75711C5.96115 5.39379 4.5 6.87413 4.5 8.69367V17.0208C4.5 18.8404 5.96115 20.3207 7.75711 20.3207H15.9764C17.7723 20.3207 19.2335 18.8404 19.2335 17.0208V8.69367C19.2335 6.87413 17.7723 5.39379 15.9764 5.39379H15.8172Z"
				fill="black"
			/>
			<mask
				id="mask0_0_1664"
				style="mask-type:luminance"
				maskUnits="userSpaceOnUse"
				x="4"
				y="4"
				width="16"
				height="17"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M15.9764 18.2269H7.75711C7.10094 18.2269 6.5667 17.6856 6.5667 17.0208V12.1098H17.1668V17.0208C17.1668 17.6856 16.6325 18.2269 15.9764 18.2269ZM15.8172 5.39379C15.809 4.82217 15.3522 4.35944 14.787 4.35944C14.2207 4.35944 13.7629 4.82217 13.7557 5.39379H9.97778C9.97055 4.82217 9.51277 4.35944 8.9465 4.35944C8.38126 4.35944 7.92452 4.82217 7.91625 5.39379H7.75711C5.96115 5.39379 4.5 6.87413 4.5 8.69367V17.0208C4.5 18.8404 5.96115 20.3207 7.75711 20.3207H15.9764C17.7723 20.3207 19.2335 18.8404 19.2335 17.0208V8.69367C19.2335 6.87413 17.7723 5.39379 15.9764 5.39379H15.8172Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_0_1664)">
				<rect x="-58.854" y="-58.3806" width="141.441" height="141.441" fill="#373A42" />
			</g>
		</svg>{endDate}
	</div>
	<!-- start time -->
	<div>
		{startTime}
	</div>
	<!-- end time -->
	<div>
		{endTime}
	</div>
	<ul class="flex flex-col gap-2">
		{#each appointment.invitations as invitation}
			<li>{invitation.invitee.name} {invitation.invitee.surname}: {invitation.status}</li>
		{/each}
	</ul>
	<!-- locations -->
	<div>
		{#if appointment.locations}
			<ul>
				{#each appointment.locations as loc}
					<AppointmentLocationItem location={loc} appointmentId={appointment.id} />
				{/each}
			</ul>
		{/if}
	</div>

	<!-- modal -->
	<div class="flex  justify-center items-center h-16 w-screen sticky top-24 bg-base-100  z-40">
		<!-- add check if i'm the creator to add other people -->
		{#if appointment.can_be_forwarded}
			<label for="add-invitees-modal" class="btn btn-primary ">aggiungi invitati</label>
		{/if}
	</div>

	<!-- toggle close modal from card when invitees gets added-->
	<input type="checkbox" id="add-invitees-modal" class="modal-toggle" />

	<AddInveteesModal {friends} action={addInvitee} />
</div>
