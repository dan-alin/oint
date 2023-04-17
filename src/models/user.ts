export type CreateUserRequest = {
	name: string;
	surname: string;
	password: string;
	email: string;
	phone: string;
	birthdate: string;
	nickname: string;
};

export type User = CreateUserRequest & {
	id: number;
	image: string;
};
