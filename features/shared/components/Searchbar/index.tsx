import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'

interface SearchBarProps {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
	debounceMs?: number
}

export default function SearchBar({
	value,
	onChangeText,
	placeholder = 'Search jobs...',
	debounceMs = 300,
}: SearchBarProps) {
	const [localValue, setLocalValue] = useState(value)
	const debounceTimer = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		setLocalValue(value)
	}, [value])

	const handleChangeText = (text: string) => {
		setLocalValue(text)

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}

		// @ts-ignorer
		debounceTimer.current = setTimeout(() => {
			onChangeText(text)
		}, debounceMs)
	}

	const handleClear = () => {
		setLocalValue('')
		onChangeText('')

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}
	}

	useEffect(() => {
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current)
			}
		}
	}, [])

	return (
		<View style={styles.container}>
			<Ionicons
				name="search"
				size={20}
				color={Colors.light.tabIconDefault}
				style={styles.searchIcon}
			/>

			<TextInput
				style={styles.input}
				value={localValue}
				onChangeText={handleChangeText}
				placeholder={placeholder}
				placeholderTextColor={Colors.light.tabIconDefault}
				autoCapitalize="none"
				autoCorrect={false}
				returnKeyType="search"
				clearButtonMode="never"
			/>

			{localValue.length > 0 && (
				<Pressable
					onPress={handleClear}
					style={({ pressed }) => [
						styles.clearButton,
						pressed && styles.clearButtonPressed,
					]}
					hitSlop={8}
					accessibilityRole="button"
					accessibilityLabel="Clear search"
				>
					<Ionicons
						name="close-circle"
						size={20}
						color={Colors.light.tabIconDefault}
					/>
				</Pressable>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 48,
		gap: 8,
	},
	searchIcon: {
		marginLeft: 4,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: '#1a1a1a',
		paddingVertical: 0,
	},
	clearButton: {
		padding: 4,
	},
	clearButtonPressed: {
		opacity: 0.5,
	},
})
