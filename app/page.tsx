"use client";

import { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsexports from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";
import * as Auth from "@aws-amplify/auth";

Amplify.configure(awsexports);

const client = generateClient<Schema>();

type Todo = {
	content: string;
};

export default function Page() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [username, setUser] = useState<string | null>(null);


	async function getUsername() {
		try{
			const user = await Auth.getCurrentUser();
			setUser(user.username);
		}catch(e){
			console.error(e);
		}

	}

	async function listTodos() {
		const { data, errors } = await client.models.Todo.list({
			authMode: "identityPool",
		});

		if (errors || !data) {
			console.error(errors);
			return;
		}

		setTodos(data.map((todo) => ({ content: todo.content } as Todo)));
	}

	useEffect(() => {
		listTodos();
	}, []);

	return (
		<div>
			<h1>Todos</h1>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>{todo.content}</li>
				))}
			</ul>
		</div>
	);
}
