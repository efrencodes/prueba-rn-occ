import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
	return (
		<Tabs initialRouteName="home">
			<Tabs.Screen
				name="home"
				options={{
					headerTitleAllowFontScaling: false,
					tabBarAllowFontScaling: false,
					title: 'Home',
					headerTitleAlign: 'left',
					animation: 'fade',
					tabBarIcon: ({ color }) => (
						<Ionicons name="home" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favorite"
				options={{
					headerTitleAllowFontScaling: false,
					tabBarAllowFontScaling: false,
					title: 'Favorites',
					headerTitleAlign: 'left',
					animation: 'fade',
					tabBarIcon: ({ color }) => (
						<Ionicons name="heart" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
