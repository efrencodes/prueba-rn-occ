import { Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LayoutBaseProps {
	children: React.ReactNode
}

export default function LayoutBase({ children }: LayoutBaseProps) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={{ flex: 1, padding: Platform.OS === 'ios' ? 20 : 16 }}
			>
				{children}
			</ScrollView>
		</SafeAreaView>
	)
}
