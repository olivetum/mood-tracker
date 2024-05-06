import {OpenAI, OpenAIEmbeddings} from "@langchain/openai";
import { BaseLanguageModelInput } from "langchain/base_language";
import { StructuredOutputParser } from "langchain/output_parsers"
import z from 'zod'
import {PromptTemplate} from "@langchain/core/prompts";
import { Document } from "langchain/document"
import {loadQARefineChain} from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore: z
            .number()
            .describe('Sentiment of the text on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
        mood: z
            .string()
            .describe('the mood of the person who wrote the journal entry. if entry is gibberish or empty reply \'no mood\''),
        subject: z
            .string()
            .describe('the subject of the journal entry. if entry is gibberish or empty reply \'Write your entry\''),
        negative: z
            .boolean()
            .describe(
                'is the journal entry negative? (i.e. does it contain negative emotions?).'
            ),
        summary: z
            .string()
            .describe('quick summary of the entire entry. if entry is gibberish or empty reply \'Write your entry\''),
        color: z
            .string()
            .describe(
                'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness. The happiest color is pink.'
            ),
    })
)


const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template: 'Analyze the following journal entry. Follow the instructions and format your response to math the format instruction, no matter what! ' +
            '\n {format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    });

    const input = await prompt.format({
        entry: content,
    });

    console.log(input)
    return input;
}
export const analyze = async (content: BaseLanguageModelInput) => {
    const input = await getPrompt(content)
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'});
    const result = await model.invoke(input);

    try {
        return parser.parse(result);
    } catch (e) {
        console.log(e);
    }
}

export const qa = async (question: string, entries: any[]) => {
    const docs = entries.map(
        (entry) =>
            new Document({
                pageContent: entry.content,
                metadata: { source: entry.id, date: entry.createdAt },
            })
    )
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })

    return res.output_text;
}