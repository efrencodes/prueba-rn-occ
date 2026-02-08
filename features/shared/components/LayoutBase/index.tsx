import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LayoutBaseProps {
	children: React.ReactNode
}

export default function LayoutBase({ children }: LayoutBaseProps) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>{children}</ScrollView>
		</SafeAreaView>
	)
}
