import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function DetailJobScreen() {
	const { id } = useLocalSearchParams<{
		id: string
	}>()

	return <View>{id}</View>
}
