import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'REPLACE_WITH_YOUR_SANITY_PROJECT_ID',
    dataset: 'production',
  },
})
