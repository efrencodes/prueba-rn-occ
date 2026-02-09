import Colors from '@/constants/Colors'
import { DetailJob } from '@/features/jobs/type'
import { formatDate } from '@/features/jobs/utils/date'
import { Ionicons } from '@expo/vector-icons'
import {
	Image,
	Linking,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import RenderHTML from 'react-native-render-html'

interface JobDetailProps {
	job: DetailJob
	isFavorite: boolean
	onToggleFavorite: (job: DetailJob) => void
}

export default function JobDetail({
	job,
	isFavorite,
	onToggleFavorite,
}: JobDetailProps) {
	const { width } = useWindowDimensions()

	const handleApply = async () => {
		try {
			const supported = await Linking.canOpenURL(job.url)
			if (supported) {
				await Linking.openURL(job.url)
			} else {
				console.warn(`Cannot open URL: ${job.url}`)
			}
		} catch (error) {
			console.error('Error opening URL:', error)
		}
	}

	const handleShare = async () => {
		try {
			const message = `Check out this job: ${job.title} at ${job.company_name}`
			const result = await Share.share(
				{
					message: `${message}\n\n${job.url}`,
					url: job.url, // iOS only - shows preview
					title: job.title, // Android only
				},
				{
					// iOS only - dialog title
					dialogTitle: 'Share Job',
				},
			)

			// Handle result (optional)
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// Shared via specific activity (iOS)
					console.log('Shared with:', result.activityType)
				} else {
					// Shared (Android)
					console.log('Job shared successfully')
				}
			} else if (result.action === Share.dismissedAction) {
				// User dismissed share sheet
				console.log('Share dismissed')
			}
		} catch (error) {
			console.error('Error sharing:', error)
		}
	}

	const htmlStyles = {
		body: {
			color: '#333',
			fontSize: 15,
			lineHeight: 24,
		},
		h1: { fontSize: 24, fontWeight: '700', marginVertical: 12 },
		h2: { fontSize: 20, fontWeight: '600', marginVertical: 10 },
		h3: { fontSize: 18, fontWeight: '600', marginVertical: 8 },
		p: { marginVertical: 8 },
		ul: { marginVertical: 8 },
		li: { marginVertical: 4 },
		a: { color: Colors.light.tint, textDecorationLine: 'underline' },
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Pressable
						onPress={() => onToggleFavorite(job)}
						style={({ pressed }) => [
							styles.favoriteButton,
							pressed && styles.favoriteButtonPressed,
						]}
						accessibilityRole="button"
						accessibilityLabel={
							isFavorite
								? 'Remove from favorites'
								: 'Add to favorites'
						}
					>
						<Ionicons
							name={isFavorite ? 'heart' : 'heart-outline'}
							size={24}
							color={isFavorite ? Colors.light.tint : '#1a1a1a'}
						/>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.favoriteButton,
							pressed && styles.favoriteButtonPressed,
						]}
						onPress={handleShare}
						accessibilityRole="button"
						accessibilityLabel="Share job"
					>
						<Ionicons
							name="share-social"
							size={20}
							color={Colors.light.tint}
						/>
					</Pressable>
				</View>

				<View style={styles.heroSection}>
					{job.company_logo ? (
						<Image
							source={{ uri: job.company_logo }}
							style={styles.companyLogo}
							resizeMode="contain"
						/>
					) : (
						<View style={styles.logoPlaceholder}>
							<Ionicons
								name="briefcase"
								size={40}
								color={Colors.light.tabIconDefault}
							/>
						</View>
					)}

					<Text style={styles.jobTitle}>{job.title}</Text>
					<Text style={styles.companyName}>{job.company_name}</Text>
				</View>

				<View style={styles.metadataContainer}>
					<View style={styles.metadataItem}>
						<View style={styles.metadataIcon}>
							<Ionicons
								name="location"
								size={20}
								color={Colors.light.tint}
							/>
						</View>
						<View style={styles.metadataContent}>
							<Text style={styles.metadataLabel}>Location</Text>
							<Text style={styles.metadataValue}>
								{job.candidate_required_location ||
									'Not specified'}
							</Text>
						</View>
					</View>

					<View style={styles.metadataItem}>
						<View style={styles.metadataIcon}>
							<Ionicons
								name="folder"
								size={20}
								color={Colors.light.tint}
							/>
						</View>
						<View style={styles.metadataContent}>
							<Text style={styles.metadataLabel}>Category</Text>
							<Text style={styles.metadataValue}>
								{job.category}
							</Text>
						</View>
					</View>

					{job.job_type && (
						<View style={styles.metadataItem}>
							<View style={styles.metadataIcon}>
								<Ionicons
									name="time"
									size={20}
									color={Colors.light.tint}
								/>
							</View>
							<View style={styles.metadataContent}>
								<Text style={styles.metadataLabel}>
									Job Type
								</Text>
								<Text style={styles.metadataValue}>
									{job.job_type.replace('_', ' ')}
								</Text>
							</View>
						</View>
					)}

					{job.salary && (
						<View style={styles.metadataItem}>
							<View style={styles.metadataIcon}>
								<Ionicons
									name="cash"
									size={20}
									color={Colors.light.tint}
								/>
							</View>
							<View style={styles.metadataContent}>
								<Text style={styles.metadataLabel}>Salary</Text>
								<Text style={styles.metadataValue}>
									{job.salary}
								</Text>
							</View>
						</View>
					)}

					<View style={styles.metadataItem}>
						<View style={styles.metadataIcon}>
							<Ionicons
								name="calendar"
								size={20}
								color={Colors.light.tint}
							/>
						</View>
						<View style={styles.metadataContent}>
							<Text style={styles.metadataLabel}>Posted</Text>
							<Text style={styles.metadataValue}>
								{formatDate(job.publication_date)}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.descriptionContainer}>
					<Text style={styles.sectionTitle}>Job Description</Text>

					<RenderHTML
						contentWidth={width - 32}
						source={{ html: job.description }}
						// @ts-ignore
						tagsStyles={htmlStyles}
						defaultTextProps={{
							selectable: true,
						}}
					/>
				</View>
				<View style={{ height: 100 }} />
			</ScrollView>

			<View style={styles.actionContainer}>
				<Pressable
					style={({ pressed }) => [
						styles.primaryButton,
						pressed && styles.buttonPressed,
					]}
					onPress={handleApply}
					accessibilityRole="button"
				>
					<Text style={styles.primaryButtonText}>Apply Now</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 20,
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	backButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backButtonPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
	favoriteButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
	},
	favoriteButtonPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
	heroSection: {
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 24,
	},
	companyLogo: {
		width: 80,
		height: 80,
		borderRadius: 16,
		backgroundColor: '#f5f5f5',
		marginBottom: 16,
	},
	logoPlaceholder: {
		width: 80,
		height: 80,
		borderRadius: 16,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	jobTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: '#1a1a1a',
		textAlign: 'center',
		marginBottom: 8,
		lineHeight: 32,
	},
	companyName: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.light.tint,
		textAlign: 'center',
	},
	metadataContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		gap: 16,
	},
	metadataItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	metadataIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.light.tint + '15',
		justifyContent: 'center',
		alignItems: 'center',
	},
	metadataContent: {
		flex: 1,
		justifyContent: 'center',
	},
	metadataLabel: {
		fontSize: 12,
		color: '#666',
		marginBottom: 2,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	metadataValue: {
		fontSize: 16,
		color: '#1a1a1a',
		fontWeight: '500',
		textTransform: 'capitalize',
	},
	descriptionContainer: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#1a1a1a',
		marginBottom: 16,
	},
	actionContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingBottom: Platform.OS === 'ios' ? 24 : 12,
		backgroundColor: '#fff',
		gap: 12,
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 8,
	},
	primaryButton: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		backgroundColor: Colors.light.tint,
		paddingVertical: 14,
		borderRadius: 12,
	},
	primaryButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},

	buttonPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
})
