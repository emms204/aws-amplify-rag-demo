export function request(ctx) {
  const { input } = ctx.args;
  console.log(`Querying knowledge base with input: ${input}`);
  return {
    // IMPORTANT: Replace [knowledge base ID] with your actual Bedrock Knowledge Base ID.
    resourcePath: '/knowledgebases/[WAWVDMQWLL]/retrieve',
    method: 'POST',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        retrievalQuery: {
          text: input,
        },
      }),
    },
  };
}

export function response(ctx) {
  console.log('Received response from knowledge base.');
  console.log(ctx.result.body);
  return JSON.stringify(ctx.result.body);
} 