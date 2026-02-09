import { Platform, SafeAreaView, ScrollView } from 'react-native'

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
