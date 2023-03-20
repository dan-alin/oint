export type Friend = {
	isFriend: boolean;
	isPending: boolean;
	user: FriendData;
};

export type FriendData = {
	id: number;
	name: string;
	surname: string;
	image?: string;
};
