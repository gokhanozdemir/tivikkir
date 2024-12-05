import React, { useState } from 'react'
import PageLayout from '../PageLayout'
import Twit from './Twit'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// https://kiwitter-node-77f5acb427c1.herokuapp.com/twits
function Home() {

	// Queries
	const { data: twits, isLoading, error, isError } = useQuery({
		queryKey: ['mainPageTwits'], queryFn: () => {
			return axios.get('https://kiwitter-node-77f5acb427c1.herokuapp.com/twits')
		}
	})

	return (
		<PageLayout>

			{/* yeni twit atmak */}

			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!isError && !isLoading && twits.data.data?.map((item) =>
				<Twit key={item.id} item={item} />
			)}
		</PageLayout>
	)
}

export default Home