import useFavoriteStore from '@/features/favorites/store/useFavoriteStore'
import { jobsAPI } from '@/features/jobs/api/jobs'
import JobsCard from '@/features/jobs/components/JobsCard'
import useJobStore from '@/features/jobs/store/useJobStore'
import { DetailJob } from '@/features/jobs/type'
import EmptyState from '@/features/shared/components/EmptyState'
import LayoutBase from '@/features/shared/components/LayoutBase'
import { useEffect } from 'react'

export default function HomeScreen() {
	const { setFavorite } = useFavoriteStore()
	const { jobs, setJob } = useJobStore()

	const getJobList = async () => {
		try {
			const response = await jobsAPI.getJobs()
			setJob(response.data.jobs)
		} catch (error) {
			return
		}
	}

	useEffect(() => {
		getJobList()
	}, [])

	const onHandleFavorite = (job: DetailJob) => {
		const isFavorite = job.isFavorite
		const newJob = { ...job, isFavorite: !isFavorite }
		setFavorite(newJob)
	}

	return (
		<LayoutBase>
			{Array.isArray(jobs) &&
				jobs.length > 0 &&
				jobs.map((job) => (
					<JobsCard
						key={job.id}
						job={job}
						isFavorite={job.isFavorite}
						onToggleFavorite={() => onHandleFavorite(job)}
					/>
				))}

			{Array.isArray(jobs) && jobs.length === 0 && (
				<EmptyState
					icon="search-outline"
					title="No jobs found"
					message="Try adjusting your filters"
				/>
			)}
		</LayoutBase>
	)
}
