import OpenAI from 'openai'
import instrumentOpenAI from './instrumentation.js'

const openai = new OpenAI({apiKey: 'foo'})
instrumentOpenAI(openai)

