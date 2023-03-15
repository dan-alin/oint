<!-- TODO page layout-->
<script>
	let countdown = 60;

	const interval = setInterval(() => {
		countdown = countdown - 1;
		if (countdown === 0) {
			clearInterval(interval);
		}
	}, 1000);
</script>

<div class="flex w-full flex-col items-center justify-center gap-6">
	<a href="/login">
		<button class="btn-primary btn w-40">login</button>
	</a>
	<a href="/sign-up">
		<button class="btn-primary btn w-40">sign up</button>
	</a>
	<a href="/search-friends">
		<button class="btn-primary btn w-40">add friends</button>
	</a>
	<a href="/friend-requests">
		<button class="btn-primary btn w-40">friendd request</button>
	</a>

	<a href="/appointments">
		<button class="btn-primary btn w-40">appointments</button>
	</a>
	<!-- <div class="radial-progress bg-secondary" style={`--value:${countdown};`}>
		<span class="countdown font-mono ">
			<span class="text-white transition" style={`--value:${countdown};`} />
		</span>
	</div> -->
</div>
