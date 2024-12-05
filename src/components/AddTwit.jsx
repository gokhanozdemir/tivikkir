// ES7 react eklentisi ile rfce
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { useForm } from 'react-hook-form';

function AddTwit() {

	const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: "all" });

	// Mutations add twit
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: (newTwit) => {
			console.log(`Bearer ${JSON.parse(localStorage.getItem("tivikkir-user")).token}`)
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


	return (
		<div className="bg-white rounded-xl shadow-xl p-7 pb-6 pr-6">
			<p className="text-xl">Ne düşünüyorsun?</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea className="w-full h-24 rounded-lg border border-gray-300 block mt-2 mb-3 p-4"
					{...register("twitContent", { required: true, minLength: { value: 3, message: "Hey! Mesajın 3 karakter olmalı" } })} />

				{errors.twitContent && <p className="text-red-600">{errors.twitContent.message}</p>}

				<button type="submit" className="h-10 px-5 rounded-lg bg-primary text-white disabled:opacity-70 disabled:cursor-not-allowed"
				>Twit At</button>
			</form>
		</div>
	)
}

export default AddTwit