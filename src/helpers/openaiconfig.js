import { Configuration, OpenAIApi } from 'openai'

var config

function configureOpenAPI() {
  function initializeConfiguration(params = {}) {
    const configuration = new Configuration({
      organization: import.meta.env.VITE_OPENAPI_ORG_ID,
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      ...params
    })
    const openai = new OpenAIApi(configuration)
    return openai
  }

  return {
    get(params = {}) {
      if (config === undefined) {
        config = new initializeConfiguration(params)
      }
      return config
    }
  }
}

export default configureOpenAPI()
