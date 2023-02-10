export type Friend = {
	isFriend: boolean;
	isPending: boolean;
	user: {
		id: number;
		name: string;
		surname: string;
	};
};
