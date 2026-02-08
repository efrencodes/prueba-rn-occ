import { API } from '@/config/axios'

export const jobsAPI = {
	getJobs: async () => {
		try {
			const response = await API.get('/remote-jobs')
			return response
		} catch (error) {
			console.error('Error::getJobs => ', error)
			throw error
		}
	},
	getCategories: async () => {
		try {
			const response = await API.get('/remote-jobs/categories')
			return response
		} catch (error) {
			console.error('Error::getCategories => ', error)
			throw error
		}
	},
}
