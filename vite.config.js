export default {
    root: 'src/',
    publicDir: '../static/',
    server: {
        host: true,
        open: true,
        port: 3000
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [ ],
}
