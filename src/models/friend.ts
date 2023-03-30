export type Friend = {
	isFriend: boolean;
	isPending: boolean;
	user: FriendUser;
};

export type FriendData = {
	friendRequestId: number;
	user: FriendUser;
};

export type FriendUser = {
	id: number;
	name: string;
	surname: string;
	nickname: string;
	image: string;
};
