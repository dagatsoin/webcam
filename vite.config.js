import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
    plugins: [
      basicSsl()
    ],
    build: {
      outDir: './gh-pages',
      emptyOutDir: true, // also necessary
    }
  }