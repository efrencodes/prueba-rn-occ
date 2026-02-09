import useFavoriteStore from '@/features/favorites/store/useFavoriteStore'
import { jobsAPI } from '@/features/jobs/api/jobs'
import CategoryFilter from '@/features/jobs/components/CategoryFilter'
import JobsCard from '@/features/jobs/components/JobsCard'
import useJobStore from '@/features/jobs/store/useJobStore'
import { DetailJob, JobType } from '@/features/jobs/type'
import EmptyState from '@/features/shared/components/EmptyState'
import JobTypeFilter from '@/features/shared/components/JobTypeFilter'
import SearchBar from '@/features/shared/components/Searchbar'
import { useEffect, useState } from 'react'
import { FlatList, Platform, RefreshControl, SafeAreaView, View } from 'react-native'

export default function HomeScreen() {
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null)
	const [category, setCategory] = useState<string | null>(null)
	const [search, setSearch] = useState<string>('')
	const [refreshing, setRefreshing] = useState<boolean>(false)
	const { setFavorite } = useFavoriteStore()
	const { jobs, setJob, setCategories, toggleFavorite } = useJobStore()

	const getJobList = async (searchTerm?: string) => {
		try {
			const responseJobs = await jobsAPI.getJobs()
			const responseCategories = await jobsAPI.getCategories()
			setJob(responseJobs.data.jobs)
			setCategories(responseCategories.data.jobs)
		} catch (error) {
			return
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await getJobList()
		setRefreshing(false)
	}

	useEffect(() => {
		getJobList(search)
	}, [search])

	const onHandleFavorite = (job: DetailJob) => {
		const newJob = { ...job, isFavorite: !job.isFavorite }
		setFavorite(newJob)
		toggleFavorite(job.id)
	}

	const ListHeader = () => (
		<View>
			<SearchBar value={search} onChangeText={setSearch} />
			<CategoryFilter
				selectedCategory={category}
				onSelectCategory={setCategory}
			/>
			<JobTypeFilter
				selectedType={selectedJobType}
				onSelectType={setSelectedJobType}
			/>
		</View>
	)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				data={jobs}
				renderItem={({ item }) => (
					<JobsCard
						job={item}
						isFavorite={item.isFavorite}
						onToggleFavorite={() => onHandleFavorite(item)}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				ListHeaderComponent={ListHeader}
				ListEmptyComponent={
					<EmptyState
						icon="search-outline"
						title="No jobs found"
						message="Try adjusting your filters"
					/>
				}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				contentContainerStyle={{
					padding: Platform.OS === 'ios' ? 20 : 16,
				}}
			/>
		</SafeAreaView>
	)
}
