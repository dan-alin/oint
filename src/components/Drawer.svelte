<script lang="ts">
	import LinkSideMenu from './LinkSideMenu.svelte';

	const closeSideMenu = () => document.getElementById('my-drawer')?.click();
</script>

<div class="drawer drawer-end">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content grid">
		<slot />
	</div>
	<div class="drawer-side ">
		<label for="my-drawer" class="drawer-overlay " />
		<div class="menu flex flex-col justify-between bg-base-100">
			<ul class="menu w-80 p-4  text-base-content">
				<LinkSideMenu label="Appointments" href="/appointments" action={closeSideMenu} />
				<LinkSideMenu label="Friend List" href="/friends-list" action={closeSideMenu} />
				<LinkSideMenu label="Search friends" href="/search-friends" action={closeSideMenu} />
				<LinkSideMenu label="Friend requests" href="/friend-requests" action={closeSideMenu} />
			</ul>
			<ul class="menu w-80 p-4  text-base-content">
				<LinkSideMenu label="Login" href="/login" action={closeSideMenu} />
				<LinkSideMenu label="Signup" href="/sign-up" action={closeSideMenu} />
				<LinkSideMenu label="Logout" href="/" action={closeSideMenu} />
			</ul>
		</div>
	</div>
</div>
