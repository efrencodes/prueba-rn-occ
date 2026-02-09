import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ErrorStateProps {
	error: string
	onRetry?: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons
					name="alert-circle-outline"
					size={64}
					color={Colors.light.tabIconDefault}
				/>
			</View>

			<Text style={styles.message}>{error}</Text>

			{onRetry && (
				<Pressable
					style={({ pressed }) => [
						styles.retryButton,
						pressed && styles.retryButtonPressed,
					]}
					onPress={onRetry}
					accessibilityRole="button"
				>
					<Ionicons name="refresh" size={20} color="#fff" />
					<Text style={styles.retryText}>Try Again</Text>
				</Pressable>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
		paddingVertical: 60,
	},
	iconContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#fee',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	message: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 8,
		textAlign: 'center',
	},
	retryButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: Colors.light.tint,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	retryButtonPressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
	retryText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
})
