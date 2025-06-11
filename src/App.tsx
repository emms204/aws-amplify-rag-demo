import {
  withAuthenticator,
  Flex,
  Heading,
  Text,
  View,
  ThemeProvider,
  Button,
  SelectField,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import { type Schema } from '../amplify/data/resource';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { ProgressIndicator } from './ProgressIndicator';
import { lightTheme, darkTheme } from './theme';
import { useState } from 'react';

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

interface Document {
  content: string;
  metadata?: {
    location?: string;
  };
}

function App() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [conversation, setConversation] = useState('chat');

  const [{ data: { messages }, isLoading: inProgress }, sendMessage] =
    useAIConversation(conversation as any);

  return (
    <ThemeProvider theme={colorMode === 'light' ? lightTheme : darkTheme} colorMode={colorMode}>
      <Flex direction="row" height="100vh" width="100vw">
        {/* Sidebar */}
        {isSidebarVisible && (
          <View
            width="300px"
            backgroundColor="var(--amplify-colors-background-secondary)"
            padding="1rem"
          >
            <Heading level={4}>Chat History</Heading>
            <Button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')} marginTop="1rem">
              Toggle Theme
            </Button>
            <SelectField
              label="Model"
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
              marginTop="1rem"
            >
              <option value="chat">Claude 3.5 Sonnet</option>
              <option value="chatHaiku">Claude 3 Haiku</option>
            </SelectField>
            {/* Static sidebar content for now */}
          </View>
        )}

        {/* Main Chat Window */}
        <ErrorBoundary>
          <Flex direction="column" flex="1" padding="1rem">
            <Flex direction="row" alignItems="center" justifyContent="center" position="relative">
              <Button
                onClick={() => setSidebarVisible(!isSidebarVisible)}
                position="absolute"
                left="1rem"
                top="50%"
                transform="translateY(-50%)"
                variation="link"
              >
                {isSidebarVisible ? 'Close' : 'Open'} Menu
              </Button>
              <Heading level={2} textAlign="center" marginBottom="1rem">
                RAG Chat App
              </Heading>
            </Flex>
            <Flex direction="column" flex="1" className="chat-messages">
              {messages?.map((message: any, index: any) => (
                <View
                  key={index}
                  className={`message ${message.role}`}
                  padding="1rem"
                  borderRadius="medium"
                  marginBottom="1rem"
                  alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                  backgroundColor={
                    message.role === 'user'
                      ? 'var(--amplify-colors-brand-primary-40)'
                      : 'var(--amplify-colors-background-secondary)'
                  }
                >
                  <Text>
                    {Array.isArray(message.content)
                      ? message.content[0].text
                      : message.content}
                  </Text>
                  {message.metadata && message.metadata.documents && (
                    <View marginTop="1rem">
                      <Heading level={6}>Sources:</Heading>
                      {message.metadata.documents.map(
                        (doc: Document, docIndex: number) => (
                          <View
                            key={docIndex}
                            padding="0.5rem"
                            border="1px solid"
                            borderColor="var(--amplify-colors-border-primary)"
                            borderRadius="small"
                            marginTop="0.5rem"
                          >
                            <Text
                              fontSize="small"
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {doc.content}
                            </Text>
                            {doc.metadata?.location && (
                              <Text
                                fontSize="x-small"
                                color="var(--amplify-colors-font-secondary)"
                              >
                                Source: {doc.metadata.location}
                              </Text>
                            )}
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {inProgress && (
                <Flex justifyContent="center" padding="1rem">
                  <ProgressIndicator style="braille_spinner" />
                </Flex>
              )}
            </Flex>

            {/* Chat Input */}
            <Flex
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const message = formData.get('message')?.toString() ?? '';
                sendMessage({ content: [{ text: message }] });
                e.currentTarget.reset();
              }}
            >
              <input
                type="text"
                name="message"
                placeholder="Ask a question..."
                className="chat-input"
                disabled={inProgress}
              />
              <button
                type="submit"
                className="send-button"
                disabled={inProgress}
              >
                Send
              </button>
            </Flex>
          </Flex>
        </ErrorBoundary>
      </Flex>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
