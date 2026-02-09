import useFavoriteStore from '@/features/favorites/store/useFavoriteStore'
import JobsCard from '@/features/jobs/components/JobsCard'
import { DetailJob } from '@/features/jobs/type'
import EmptyState from '@/features/shared/components/EmptyState'
import LayoutBase from '@/features/shared/components/LayoutBase'

export default function FavoriteScreen() {
	const { favorites, setFavorite } = useFavoriteStore()

	const onHandleFavorite = (job: DetailJob) => {
		const isFavorite = job.isFavorite
		const newJob = { ...job, isFavorite: !isFavorite }
		setFavorite(newJob)
	}

	return (
		<LayoutBase>
			{Array.isArray(favorites) &&
				favorites.length > 0 &&
				favorites.map((job) => (
					<JobsCard
						key={job.id}
						job={job}
						isFavorite={job.isFavorite}
						onToggleFavorite={() => onHandleFavorite(job)}
					/>
				))}

			{Array.isArray(favorites) && favorites.length === 0 && (
				<EmptyState
					icon="search-outline"
					title="No jobs found"
					message="Try adjusting your filters"
				/>
			)}
		</LayoutBase>
	)
}
