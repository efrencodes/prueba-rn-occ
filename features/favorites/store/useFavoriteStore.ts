import { DetailJob } from '@/features/jobs/type'
import { create } from 'zustand'

export interface CardState {
	favorites: DetailJob[]
	setFavorite: (favorite: DetailJob) => void
	resetFavorite: () => void
}

const useFavoriteStore = create<CardState>((set, get) => ({
	favorites: [],
	setFavorite: (favorite: DetailJob) =>
		set((state) => {
			const isExists = state.favorites.some((f) => f.id === favorite.id)
			if (isExists)
				return {
					favorites: state.favorites.filter(
						(f) => f.id !== favorite.id,
					),
				}
			return {
				favorites: [...state.favorites, favorite],
			}
		}),
	resetFavorite: () => set({ favorites: [] }),
}))

export default useFavoriteStore
