import Colors from '@/constants/Colors'
import useJobStore from '@/features/jobs/store/useJobStore'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface CategoryFilterProps {
	selectedCategory: string | null
	onSelectCategory: (slug: string | null) => void
}

export default function CategoryFilter({
	selectedCategory,
	onSelectCategory,
}: CategoryFilterProps) {
	const { categories } = useJobStore()

	const handlePress = (slug: string) => {
		if (selectedCategory === slug) onSelectCategory(null)
		else onSelectCategory(slug)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="apps" size={16} color="#666" />
				<Text style={styles.headerText}>Category</Text>

				{selectedCategory && (
					<Pressable
						onPress={() => onSelectCategory(null)}
						style={({ pressed }) => [
							styles.clearButton,
							pressed && { opacity: 0.5 },
						]}
						hitSlop={8}
					>
						<Text style={styles.clearButtonText}>Clear</Text>
					</Pressable>
				)}
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{categories.map((category) => {
					const isSelected = selectedCategory === category.slug

					return (
						<Pressable
							key={category.id}
							onPress={() => handlePress(category.slug)}
							style={({ pressed }) => [
								styles.chip,
								isSelected && styles.chipSelected,
								pressed && styles.chipPressed,
							]}
							accessibilityRole="button"
							accessibilityLabel={`Filter by ${category.name}`}
							accessibilityState={{ selected: isSelected }}
						>
							<Text
								style={[
									styles.chipText,
									isSelected && styles.chipTextSelected,
								]}
								numberOfLines={1}
							>
								{category.name}
							</Text>

							{isSelected && (
								<Ionicons
									name="checkmark-circle"
									size={16}
									color="#fff"
								/>
							)}
						</Pressable>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 16,
		marginBottom: 12,
	},
	headerText: {
		flex: 1,
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	clearButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	clearButtonText: {
		fontSize: 13,
		fontWeight: '600',
		color: Colors.light.tint,
	},
	scrollContent: {
		gap: 8,
	},
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		borderWidth: 1.5,
		borderColor: '#e0e0e0',
		maxWidth: 200,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	chipSelected: {
		backgroundColor: Colors.light.tint,
		borderColor: Colors.light.tint,
	},
	chipPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.97 }],
	},
	chipText: {
		fontSize: 13,
		fontWeight: '600',
		color: '#666',
		flexShrink: 1,
	},
	chipTextSelected: {
		color: '#fff',
	},
})
