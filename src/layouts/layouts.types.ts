enum layoutType {
	default = 'default',
}

const layoutMapComponents: Record<layoutType, string> = {
	default: 'AppLayoutDefault.vue',
};

export {
	layoutType,
	layoutMapComponents,
}
