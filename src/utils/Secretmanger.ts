// import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
//
// const secret_name: string = "frontend";
//
// const client = new SecretsManagerClient({
// 	region: "me-central-1",
// });
//
// export const secrets = async () => {
// 	try {
// 		const response = await client.send(
// 			new GetSecretValueCommand({
// 				SecretId: secret_name,
// 				VersionStage: "AWSCURRENT",
// 			}),
// 		);
// 		return response.SecretString;
// 	} catch (error) {
// 		throw error;
// 	}
// };
