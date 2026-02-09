import { DetailJob } from '@/features/jobs/type'
import { addIsFavorite } from '@/features/jobs/utils/transformData'
import { create } from 'zustand'

export interface CardState {
	jobs: DetailJob[]
	setJob: (jobs: DetailJob[]) => void
	resetJob: () => void
}

const useJobStore = create<CardState>((set, get) => ({
	jobs: [],
	setJob: (jobs: DetailJob[]) =>
		set((_) => {
			return { jobs: addIsFavorite(jobs) }
		}),
	resetJob: () => set({ jobs: [] }),
}))

export default useJobStore
