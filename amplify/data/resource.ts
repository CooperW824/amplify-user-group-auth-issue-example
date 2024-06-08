import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Todo: a
		.model({
			content: a.string(),
		})
		.authorization((allow) => [
			allow.group("admin").to(["create", "update", "read", "delete"]),
			// These two lines should allow everyone to read the data
			// regardless of whether they are authenticated or not
			// however, if the user is authenticated, and is a part of the admin user group I get a GraphQLError
			// saying that the user is not authorized to perform this action
			// I would expect this admin user to be able to read the data using the identityPool auth mode
			// because the user is authenticated, but it seems like the user group is causing an issue
			// if a user is not apart of a user group, the data is returned as expected
			allow.authenticated("identityPool").to(["read"]),
			allow.guest().to(["read"]),
		]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "iam",
	},
});
