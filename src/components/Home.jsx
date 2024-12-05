import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout'
import Twit from './Twit'
import AddTwit from './AddTwit'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


function Home() {

	// Queries Bütün twitleri çek
	const { data: twits, isLoading, error, isError } = useQuery({
		queryKey: ['mainPageTwits'], queryFn: () => {
			return axios.get('https://kiwitter-node-77f5acb427c1.herokuapp.com/twits')
		}
	})


	return (
		<PageLayout>

			{/* yeni twit atmak */}

			<AddTwit />

			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!isError && !isLoading && twits.data.data?.map((item) =>
				<Twit key={item.id} item={item} />
			)}
		</PageLayout>
	)
}

export default Home