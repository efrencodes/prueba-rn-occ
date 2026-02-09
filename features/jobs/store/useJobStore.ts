import { Category, DetailJob } from '@/features/jobs/type'
import { addIsFavorite } from '@/features/jobs/utils/transformData'
import { create } from 'zustand'

export interface CardState {
	jobs: DetailJob[]
	categories: Category[]
	setCategories: (categories: Category[]) => void
	setJob: (jobs: DetailJob[]) => void
	toggleFavorite: (jobId: number) => void
	resetJob: () => void
}

const useJobStore = create<CardState>((set, get) => ({
	jobs: [],
	categories: [],
	setCategories: (categories: Category[]) => set({ categories: categories }),
	setJob: (jobs: DetailJob[]) =>
		set((_) => {
			return { jobs: addIsFavorite(jobs) }
		}),
	toggleFavorite: (jobId: number) =>
		set((state) => ({
			jobs: state.jobs.map((job) =>
				job.id === jobId
					? { ...job, isFavorite: !job.isFavorite }
					: job,
			),
		})),
	resetJob: () => set({ jobs: [] }),
}))

export default useJobStore
