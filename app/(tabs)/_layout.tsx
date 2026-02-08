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
					title: 'Inicio',
					headerTitleAlign: 'left',
					animation: 'fade',
				}}
			/>
			<Tabs.Screen
				name="favorite"
				options={{
					headerTitleAllowFontScaling: false,
					tabBarAllowFontScaling: false,
					title: 'Favoritos',
					headerTitleAlign: 'left',
					animation: 'fade',
				}}
			/>
		</Tabs>
	)
}
