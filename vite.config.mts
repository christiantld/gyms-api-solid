import { defineConfig, configDefaults } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        'prisma/vitest-environment-prisma/**.ts',
        'src/use-cases/factories',
        'src/repositories/prisma',
        'src/env',
        'src/types',
        'src/**.ts',
      ],
    },
  },
})
