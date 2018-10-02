module.exports = {
    devServer: {
        proxy: {
			'/api': {
				target: 'http://localhost:8080',
			}
		},
        port: 9000
    }
}