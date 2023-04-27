<script lang="ts">
	import { Icons } from '../../enums';
	import Icon from '../Icon.svelte';
	import NavItem from './NavItem.svelte';
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
			<a href="/create-appointments" class="ratio-h-w btn-primary btn-circle btn  mb-16 "
				><Icon icon={Icons.ADD} size="26" /></a
			>
		</div>

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
