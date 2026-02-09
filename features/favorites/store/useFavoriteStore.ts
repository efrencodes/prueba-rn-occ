import { DetailJob } from '@/features/jobs/type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface FavoriteState {
	favorites: DetailJob[]
	hasHydrated: boolean
	setFavorite: (favorite: DetailJob) => void
	resetFavorite: () => void
	setHasHydrated: (state: boolean) => void
}

const useFavoriteStore = create<FavoriteState>()(
	persist(
		(set, get) => ({
			favorites: [],
			hasHydrated: false,
			setFavorite: (favorite: DetailJob) =>
				set((state) => {
					const isExists = state.favorites.some(
						(f) => f.id === favorite.id,
					)
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
			setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
		}),
		{
			name: 'favorites-storage',
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
		},
	),
)

export default useFavoriteStore
