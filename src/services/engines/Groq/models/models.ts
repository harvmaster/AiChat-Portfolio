export const MODELS = {
  'gemma-7b': {
    model: 'Gemma-7b',
    external_name: 'gemma-7b-lt'
  },
  'llama3-8b': {
    model: 'llama3-8b',
    external_name: 'llama3-8b-8192'
  },
  'llama3-70b': {
    model: 'Llama3-70b',
    external_name: 'llama3-70b-8192'
  },
  'mixtral-8x7b': {
    model: 'Mixtral-8x7b',
    external_name: 'mixtral-8x7b-32768'
  },
} as const

export default MODELS;