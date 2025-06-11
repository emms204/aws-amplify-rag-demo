import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// The new schema defines a "chat" resource, which is a conversational AI model.
const schema = a.schema({
  knowledgeBase: a
    .query()
    .arguments({ input: a.string() })
    .handler(
      a.handler.custom({
        dataSource: 'KnowledgeBaseDataSource',
        entry: './resolvers/kbResolver.js',
      })
    )
    .returns(a.string())
    .authorization((allow) => allow.authenticated()),

  chat: a
    .conversation({
      aiModel: a.ai.model('Claude 3.5 Sonnet'),
      systemPrompt: `You are a helpful assistant.`,
      tools: [
        a.ai.dataTool({
          name: 'searchDocumentation',
          description:
            'Performs a similarity search over the documentation for the user.',
          query: a.ref('knowledgeBase'),
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
  
  chatHaiku: a
    .conversation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: `You are a helpful assistant.`,
      tools: [
        a.ai.dataTool({
          name: 'searchDocumentation',
          description:
            'Performs a similarity search over the documentation for the user.',
          query: a.ref('knowledgeBase'),
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
