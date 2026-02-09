export type JobType =
	| 'full_time'
	| 'contract'
	| 'part_time'
	| 'freelance'
	| 'internship'

export interface DetailJob {
	id: number
	url: string
	title: string
	company_name: string
	company_logo: string
	company_logo_url?: string
	category: string
	job_type?: JobType
	publication_date: string
	candidate_required_location: string
	salary?: string
	description: string
	isFavorite: boolean
}

export interface RemoteJobsApiResponse {
	jobs: DetailJob[]
}
