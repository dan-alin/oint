<script lang="ts">
	import type { Appointment } from '../models';

	export let appointment: Appointment;
	export let action: (appointmentId: number) => void;

	const startDate = new Date(appointment.start_date).toLocaleDateString('it-IT', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const endDate = new Date(appointment.end_date).toLocaleDateString('it-IT', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const startTime = new Date(appointment.start_date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});

	const endTime = new Date(appointment.end_date).toLocaleTimeString('it-IT', {
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="card w-80 bg-base-300 shadow-xl mx-auto h-64 image-full">
	<button
		class="btn btn-sm btn-circle absolute right-2 top-2 z-50"
		on:click={() => action(appointment.id)}
	>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.7935 12.1091L18.1096 7.536C18.6177 7.0279 18.6177 6.20322 18.1096 5.69382C17.6002 5.18572 16.7755 5.18572 16.2675 5.69382L11.9513 10.267L7.73347 5.69382C7.22538 5.18572 6.40071 5.18572 5.89132 5.69382C5.38193 6.20322 5.38193 7.0279 5.89132 7.536L10.1092 12.1091L5.89132 16.4631C5.38193 16.9712 5.38193 17.7959 5.89132 18.3053C6.14536 18.5594 6.47888 18.687 6.81239 18.687C7.14591 18.687 7.47942 18.5594 7.73347 18.3053L11.9513 13.9513L16.2675 18.3053C16.5215 18.5594 16.855 18.687 17.1885 18.687C17.522 18.687 17.8543 18.5594 18.1096 18.3053C18.6177 17.7959 18.6177 16.9712 18.1096 16.4631L13.7935 12.1091Z"
				fill="black"
			/>
			<mask
				id="mask0_0_1735"
				style="mask-type:luminance"
				maskUnits="userSpaceOnUse"
				x="5"
				y="5"
				width="14"
				height="14"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M13.7935 12.1091L18.1096 7.536C18.6177 7.0279 18.6177 6.20322 18.1096 5.69382C17.6002 5.18572 16.7755 5.18572 16.2675 5.69382L11.9513 10.267L7.73347 5.69382C7.22538 5.18572 6.40071 5.18572 5.89132 5.69382C5.38193 6.20322 5.38193 7.0279 5.89132 7.536L10.1092 12.1091L5.89132 16.4631C5.38193 16.9712 5.38193 17.7959 5.89132 18.3053C6.14536 18.5594 6.47888 18.687 6.81239 18.687C7.14591 18.687 7.47942 18.5594 7.73347 18.3053L11.9513 13.9513L16.2675 18.3053C16.5215 18.5594 16.855 18.687 17.1885 18.687C17.522 18.687 17.8543 18.5594 18.1096 18.3053C18.6177 17.7959 18.6177 16.9712 18.1096 16.4631L13.7935 12.1091Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_0_1735)">
				<rect x="-34.3745" y="-35.1458" width="96" height="96" fill="#373A42" />
			</g>
		</svg>
	</button>

	{#if appointment.image}
		<figure><img src={appointment.image} alt="card" /></figure>
	{/if}

	<div class="card-body justify-end">
		<h2 class="card-title font-bold">{appointment.title.toUpperCase()}</h2>
		<!-- to view in the detail page -->
		<!-- <p class="text-xs text-ellipsis">{appointment.description}</p> -->
		<div>
			<p class="text-xs flex items-center gap-2">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
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
				</svg>
				{startDate}
				{'\u2022'}
				{startTime} - {#if endTime}
					{endTime}
				{/if}
			</p>
		</div>
	</div>
</div>
