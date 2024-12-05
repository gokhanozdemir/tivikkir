import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout'
import Twit from './Twit'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { useForm } from 'react-hook-form';



// https://kiwitter-node-77f5acb427c1.herokuapp.com/twits
function Home() {
	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: "onChange" });
	const onSubmit = data => {
		console.log(data);

		/* FIXME: author_id'yi context'dene oku */
		const transformData = {
			"author_id": 170,
			"content": data.twitContent
		}
		console.log("transformed", transformData)
		mutate(transformData)
	};
	console.log(errors);

	// Queries
	const { data: twits, isLoading, error, isError } = useQuery({
		queryKey: ['mainPageTwits'], queryFn: () => {
			return axios.get('https://kiwitter-node-77f5acb427c1.herokuapp.com/twits')
		}
	})

	const queryClient = useQueryClient();

	// Mutations
	const { mutate } = useMutation({
		mutationFn: (newTwit) => {
			return axios.post('https://kiwitter-node-77f5acb427c1.herokuapp.com/twits', newTwit, {
				headers: {
					// FIXME token'ı context'ten çek
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("tivikkir-user")).token}`
				}
			})
		},
		onSuccess: () => {
			reset(); // reset form
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['mainPageTwits'] })
		},
	})

	return (
		<PageLayout>

			{/* yeni twit atmak */}
			<div className="bg-white rounded-xl shadow-xl p-7 pb-6 pr-6">
				<p className="text-xl">Ne düşünüyorsun?</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<textarea className="w-full h-24 rounded-lg border border-gray-300 block mt-2 mb-3 p-4"
						{...register("twitContent", { required: true, minLength: { value: 3, message: "Hey! Mesajın 3 karakter olmalı" } })} />

					{errors.twitContent && <p className="text-red-600">{errors.twitContent.message}</p>}

					<button type="submit" disabled={!isValid} className="h-10 px-5 rounded-lg bg-primary text-white disabled:opacity-70 disabled:cursor-not-allowed"
					>Twit At</button>
				</form>
			</div>



			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!isError && !isLoading && twits.data.data?.map((item) =>
				<Twit key={item.id} item={item} />
			)}
		</PageLayout>
	)
}

export default Home