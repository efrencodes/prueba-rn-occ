import useFavoriteStore from '@/features/favorites/store/useFavoriteStore'
import { jobsAPI } from '@/features/jobs/api/jobs'
import CategoryFilter from '@/features/jobs/components/CategoryFilter'
import JobsCard from '@/features/jobs/components/JobsCard'
import useJobStore from '@/features/jobs/store/useJobStore'
import { DetailJob, JobType } from '@/features/jobs/type'
import EmptyState from '@/features/shared/components/EmptyState'
import JobTypeFilter from '@/features/shared/components/JobTypeFilter'
import SearchBar from '@/features/shared/components/Searchbar'
import { useEffect, useMemo, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Platform,
	RefreshControl,
	SafeAreaView,
	View,
} from 'react-native'

export default function HomeScreen() {
	const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null)
	const [category, setCategory] = useState<string | null>(null)
	const [search, setSearch] = useState<string>('')
	const [refreshing, setRefreshing] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const { setFavorite } = useFavoriteStore()
	const { jobs, categories, setJob, setCategories, toggleFavorite } =
		useJobStore()

	const filteredJobs = useMemo(() => {
		let result = jobs

		if (search.trim()) {
			const searchLower = search.toLowerCase().trim()
			result = result.filter(
				(job) =>
					job.title.toLowerCase().includes(searchLower) ||
					job.company_name.toLowerCase().includes(searchLower),
			)
		}

		if (category) {
			const selectedCategoryName = categories.find(
				(c) => c.slug === category,
			)?.name
			if (selectedCategoryName) {
				result = result.filter(
					(job) => job.category === selectedCategoryName,
				)
			}
		}

		if (selectedJobType) {
			result = result.filter((job) => job.job_type === selectedJobType)
		}

		return result
	}, [jobs, search, category, categories, selectedJobType])

	const getJobList = async () => {
		try {
			setLoading(true)
			const responseJobs = await jobsAPI.getJobs()
			const responseCategories = await jobsAPI.getCategories()
			setJob(responseJobs.data.jobs)
			setCategories(responseCategories.data.jobs)
		} catch (error) {
			return
		} finally {
			setLoading(false)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await getJobList()
		setRefreshing(false)
	}

	useEffect(() => {
		getJobList()
	}, [])

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

	if (loading && jobs.length === 0) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator size="large" />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FlatList
				data={filteredJobs}
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
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={{
					padding: Platform.OS === 'ios' ? 20 : 16,
				}}
			/>
		</SafeAreaView>
	)
}
