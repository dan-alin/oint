export type Place = {
	place_id: number;
	address: Address;
	display_name: string;
	icon: string;
	type: string;
};

type Address = {
	amenity: string;
	city: string;
	country: string;
	country_code: string;
	county: string;
	house_number: string;
	postcode: string;
	quarter: string;
	road: string;
	state: string;
	suburb: string;
};
