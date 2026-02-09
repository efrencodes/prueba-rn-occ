import JobDetail from '@/features/jobs/components/JobDetail'
import useJobStore from '@/features/jobs/store/useJobStore'
import ErrorState from '@/features/shared/components/ErrorState'
import LayoutBase from '@/features/shared/components/LayoutBase'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'

export default function DetailJobScreen() {
	const { jobs } = useJobStore()
	const router = useRouter()
	const params = useLocalSearchParams<{ id: string }>()
	const jobId = Number(params.id)

	const job = jobs.find((j) => j.id === jobId)

	if (!job) {
		return (
			<ErrorState error="Job not found" onRetry={() => router.back()} />
		)
	}

	return (
		<LayoutBase>
			<JobDetail
				job={job}
				isFavorite={job.isFavorite}
				onToggleFavorite={() => {}}
			/>
		</LayoutBase>
	)
}
