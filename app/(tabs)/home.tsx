import useFavoriteStore from '@/features/favorites/store/useFavoriteStore'
import { jobsAPI } from '@/features/jobs/api/jobs'
import CategoryFilter from '@/features/jobs/components/CategoryFilter'
import JobsCard from '@/features/jobs/components/JobsCard'
import useJobStore from '@/features/jobs/store/useJobStore'
import { DetailJob, JobType } from '@/features/jobs/type'
import EmptyState from '@/features/shared/components/EmptyState'
import JobTypeFilter from '@/features/shared/components/JobTypeFilter'
import LayoutBase from '@/features/shared/components/LayoutBase'
import SearchBar from '@/features/shared/components/Searchbar'
import { useEffect, useState } from 'react'

export default function HomeScreen() {
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null)
	const [category, setCategory] = useState<string | null>(null)
	const [search, setSearch] = useState<string>('')
	const { setFavorite } = useFavoriteStore()
	const { jobs, setJob, setCategories } = useJobStore()

	const getJobList = async (searchTerm?: string) => {
		try {
			const responseJobs = await jobsAPI.getJobs(searchTerm)
			const responseCategories = await jobsAPI.getCategories()
			setJob(responseJobs.data.jobs)
			setCategories(responseCategories.data.jobs)
		} catch (error) {
			return
		}
	}

	useEffect(() => {
		getJobList(search)
	}, [search])

	const onHandleFavorite = (job: DetailJob) => {
		const isFavorite = job.isFavorite
		const newJob = { ...job, isFavorite: !isFavorite }
		setFavorite(newJob)
	}

	return (
		<LayoutBase>
			<SearchBar value={search} onChangeText={setSearch} />

			<CategoryFilter
				selectedCategory={category}
				onSelectCategory={setCategory}
			/>

			<JobTypeFilter
				selectedType={selectedJobType}
				onSelectType={setSelectedJobType}
			/>

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
