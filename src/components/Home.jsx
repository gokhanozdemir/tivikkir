import React from 'react'
import PageLayout from '../PageLayout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// https://kiwitter-node-77f5acb427c1.herokuapp.com/twits
function Home() {

	// Queries
	const { data, isLoading, error } = useQuery({
		queryKey: ['mainPageTwits'], queryFn: () => {
			return axios.get('https://kiwitter-node-77f5acb427c1.herokuapp.com/twits')
		}
	})


	return (
		<PageLayout>

			{/* yeni twit atmak */}

			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{data.data && JSON.stringify(data.data)}
			{/* twit listesi */}
		</PageLayout>
	)
}

export default Home