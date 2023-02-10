export type FriendRequests = {
	received: FriendData[];
	sent: FriendData[];
};

type FriendData = { id: number; name: string; surname: string };
