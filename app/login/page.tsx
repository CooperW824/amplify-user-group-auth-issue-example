"use client";


import { Authenticator } from "@aws-amplify/ui-react";
import * as Auth from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsexports from "@/amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsexports);

export default function Page() {
	return (
		<div>
			<Authenticator >
				<button onClick={() => Auth.signOut()}>Sign Out</button>
			</Authenticator>
		</div>
	);
}