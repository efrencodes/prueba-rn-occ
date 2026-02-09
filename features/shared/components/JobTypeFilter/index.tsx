import { JobType } from '@/features/jobs/type'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

interface JobTypeFilterProps {
	selectedType: JobType | null
	onSelectType: (type: JobType | null) => void
}

export default function JobTypeFilter({
	selectedType,
	onSelectType,
}: JobTypeFilterProps) {
	const jobTypes: Array<{
		value: JobType
		label: string
		icon: keyof typeof Ionicons.glyphMap
		color: string
	}> = [
		{
			value: 'full_time',
			label: 'Full Time',
			icon: 'briefcase',
			color: '#2563eb',
		},
		{
			value: 'part_time',
			label: 'Part Time',
			icon: 'time',
			color: '#7c3aed',
		},
		{
			value: 'contract',
			label: 'Contract',
			icon: 'document-text',
			color: '#ea580c',
		},
		{
			value: 'freelance',
			label: 'Freelance',
			icon: 'laptop',
			color: '#059669',
		},
	]

	const handlePress = (type: JobType) => {
		if (selectedType === type) onSelectType(null)
		else onSelectType(type)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="filter" size={16} color="#666" />
				<Text style={styles.headerText}>Job Type</Text>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{jobTypes.map((jobType) => {
					const isSelected = selectedType === jobType.value

					return (
						<Pressable
							key={jobType.value}
							onPress={() => handlePress(jobType.value)}
							style={({ pressed }) => [
								styles.chip,
								isSelected && {
									backgroundColor: jobType.color,
									borderColor: jobType.color,
								},
								pressed && styles.chipPressed,
							]}
							accessibilityRole="button"
							accessibilityLabel={`Filter by ${jobType.label}`}
							accessibilityState={{ selected: isSelected }}
						>
							<Ionicons
								name={jobType.icon}
								size={18}
								color={isSelected ? '#fff' : '#666'}
							/>

							<Text
								style={[
									styles.chipText,
									isSelected && styles.chipTextSelected,
								]}
							>
								{jobType.label}
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
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	scrollContent: {
		paddingHorizontal: 16,
		gap: 8,
	},
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		borderWidth: 1.5,
		borderColor: '#e0e0e0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	chipPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.97 }],
	},
	chipText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
	},
	chipTextSelected: {
		color: '#fff',
	},
})
