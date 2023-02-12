<div class="drawer drawer-end custom-height ">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content md:p-10 pb-20">
		<slot />
	</div>
	<div class="drawer-side ">
		<label for="my-drawer" class="drawer-overlay" />
		<div class="menu bg-base-100 flex flex-col justify-between">
			<ul class="menu p-4 w-80  text-base-content">
				<li><a href="/appointments">Appointments</a></li>
				<li><a href="/search-friends">Search friends</a></li>
				<li><a href="/friend-requests">Friend requests</a></li>
			</ul>
			<ul class="menu p-4 w-80  text-base-content">
				<li><a href="/login">Login</a></li>
				<li><a href="/sign-up">Signup</a></li>
				<li><a href="/">Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<style>
	/* custom height calculated based on header size */
	.custom-height {
		height: calc(100vh - 128px);
	}

	::-webkit-scrollbar {
		width: 0px;
		background: transparent; /* make scrollbar transparent */
	}
</style>
