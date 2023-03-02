export type FriendRequests = {
	received: FriendData[];
	sent: FriendData[];
};

export type FriendData = { id: number; name: string; surname: string };
