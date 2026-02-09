import Colors from '@/constants/Colors'

export const htmlStyles = {
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
