import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '63wccw3u',
    dataset: 'production',
  },
  studioHost: 'streetbarlab',
  deployment: {
    appId: 'g7jnj2yvf7cwej2zrf1gfeaq',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
