export type LocationRequest = {
	name: string;
	address: string;
};

export type Location = LocationRequest & {
	id: number;
	votes_count: number;
	votes: string[];
	i_voted_this_location: boolean;
};
