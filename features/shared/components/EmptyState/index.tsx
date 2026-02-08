import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

interface EmptyStateProps {
	icon: keyof typeof Ionicons.glyphMap
	title: string
	message: string
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons
					name={icon}
					size={64}
					color={Colors.light.tabIconDefault}
				/>
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.message}>{message}</Text>
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
		backgroundColor: Colors.light.tabIconDefault + '10',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 8,
		textAlign: 'center',
	},
	message: {
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
		lineHeight: 20,
	},
})
