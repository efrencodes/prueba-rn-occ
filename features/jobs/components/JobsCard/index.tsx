import Colors from '@/constants/Colors'
import { DetailJob } from '@/features/jobs/type'
import { formatDate } from '@/features/jobs/utils/date'
import { ROUTES_APP } from '@/features/shared/utils/constants'
import { Ionicons } from '@expo/vector-icons'
import { RelativePathString, router } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface JobsCardProps {
	job: DetailJob
	isFavorite?: boolean
	onToggleFavorite?: (job: DetailJob) => void
}

export default function JobsCard({
	job,
	isFavorite = false,
	onToggleFavorite,
}: JobsCardProps) {
	const handlePress = () => {
		router.push({
			pathname: ROUTES_APP.DETAIL_JOB as RelativePathString,
			params: { id: String(job.id), name: job.title },
		})
	}

	const handleFavoritePress = (e: any) => {
		e.stopPropagation()
		onToggleFavorite?.(job)
	}

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => [
				styles.card,
				pressed && styles.cardPressed,
			]}
			accessibilityRole="button"
		>
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					{job.company_logo ? (
						<Image
							source={{ uri: job.company_logo }}
							style={styles.logo}
							resizeMode="contain"
						/>
					) : (
						<View style={styles.logoPlaceholder}>
							<Ionicons
								name="briefcase-outline"
								size={24}
								color={Colors.light.tabIconDefault}
							/>
						</View>
					)}
				</View>

				<View style={styles.content}>
					<View style={styles.header}>
						<Text
							style={styles.title}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							{job.title}
						</Text>

						{onToggleFavorite && (
							<Pressable
								onPress={handleFavoritePress}
								hitSlop={8}
								accessibilityRole="button"
							>
								<Ionicons
									name={
										isFavorite ? 'heart' : 'heart-outline'
									}
									size={24}
									color={
										isFavorite
											? Colors.light.tint
											: Colors.light.tabIconDefault
									}
								/>
							</Pressable>
						)}
					</View>

					<Text style={styles.company} numberOfLines={1}>
						{job.company_name}
					</Text>

					<View style={styles.metaRow}>
						<View style={styles.metaItem}>
							<Ionicons
								name="location-outline"
								size={14}
								color={Colors.light.tabIconDefault}
							/>
							<Text style={styles.metaText} numberOfLines={1}>
								{job.candidate_required_location ||
									'Not specified'}
							</Text>
						</View>

						<View style={styles.metaItem}>
							<Ionicons
								name="calendar-outline"
								size={14}
								color={Colors.light.tabIconDefault}
							/>
							<Text style={styles.metaText}>
								{formatDate(job.publication_date)}
							</Text>
						</View>
					</View>

					<View style={styles.tagsRow}>
						<View style={styles.tag}>
							<Text style={styles.tagText}>{job.category}</Text>
						</View>

						{job.job_type && (
							<View style={[styles.tag, styles.tagSecondary]}>
								<Text style={styles.tagText}>
									{job.job_type.replace('_', ' ')}
								</Text>
							</View>
						)}

						{job.salary && (
							<View style={[styles.tag, styles.tagSalary]}>
								<Text style={styles.tagText} numberOfLines={1}>
									{job.salary}
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
	container: {
		flexDirection: 'row',
		padding: 16,
	},
	logoContainer: {
		marginRight: 12,
	},
	logo: {
		width: 56,
		height: 56,
		borderRadius: 8,
		backgroundColor: '#f5f5f5',
	},
	logoPlaceholder: {
		width: 56,
		height: 56,
		borderRadius: 8,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		gap: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
		marginRight: 8,
		lineHeight: 22,
	},
	company: {
		fontSize: 14,
		color: '#666',
		fontWeight: '500',
	},
	metaRow: {
		flexDirection: 'row',
		gap: 16,
	},
	metaItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		flex: 1,
	},
	metaText: {
		fontSize: 12,
		color: '#666',
		flex: 1,
	},
	tagsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 6,
	},
	tag: {
		backgroundColor: Colors.light.tint + '15',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	tagSecondary: {
		backgroundColor: '#f0f0f0',
	},
	tagSalary: {
		backgroundColor: '#e8f5e9',
	},
	tagText: {
		fontSize: 11,
		fontWeight: '600',
		color: '#333',
		textTransform: 'capitalize',
	},
})
