import { DetailJob } from '@/features/jobs/type'

export const addIsFavorite = (arr: DetailJob[], defaultValue = false) => {
	return arr.map((item) => ({
		...item,
		isFavorite: defaultValue,
	}))
}
