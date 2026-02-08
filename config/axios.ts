import axios from 'axios'
import * as Device from 'expo-device'

export const API = axios.create({
	baseURL: process.env.EXPO_PUBLIC_URL_API_REMOTIVE,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'App-Version': 'v1.0.0',
		'Device-Name': Device.modelName ?? 'unknown',
		'Device-OS': `${Device.osName} ${Device.osVersion}`,
	},
})
