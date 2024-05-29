import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import {
    Avatar,
    Box,
    Button, Card,
    Container,
    Flex,
    Heading,
    Section,
    Separator,
    Text
} from '@radix-ui/themes';
import "./globals.css";
import {router} from "next/client";
export default async function Home() {
  const {userId} = auth();
  let href = userId ? '/journal' : '/new-user';

  const startMood = () => {}

  return (
      <div className="h-screen bg-hero-pattern">

          <Section>
              <Container>
                  <Box className="absolute top-8 right-8">
                      <UserButton/>
                  </Box>
                  <Flex direction="column" gap="6">
                      <Box mt="20vh" width="50%">
                          <Heading size="9" weight="light" mb="4">
                              Track your mood though out your life.
                          </Heading>
                          <Text size="5" weight="light">
                              Fully encrypted
                              journal with history chart and AI summaries for your
                              well being.
                          </Text>
                      </Box>
                      <Box>
                          <Button asChild id="get-started" size="3">
                              <Link href={href}>Get Started!</Link>
                          </Button>
                      </Box>
                  </Flex>

              </Container>
          </Section>
          <Section>
              <Container>
                  <Box>
                  <Flex gap="6">
                      <Card>
                          <Flex gap="3" align="center">
                              <Box>
                                  <Text as="div" size="4" weight="bold">
                                      AI Summaries
                                  </Text>
                                  <Text as="div" size="2" color="gray">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi beatae esse minus nisi obcaecati provident, quia quis repellat ut velit vero voluptatem!
                                  </Text>
                              </Box>
                          </Flex>
                      </Card>
                      <Card>
                          <Flex gap="3" align="center">
                              <Box>
                                  <Text as="div" size="4" weight="bold">
                                      AI Summaries
                                  </Text>
                                  <Text as="div" size="2" color="gray">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dignissimos est eveniet in maiores quas quod rerum, sapiente. Consectetur impedit odio qui repudiandae?
                                  </Text>
                              </Box>
                          </Flex>
                      </Card>
                  </Flex>
              </Box>
              </Container>
          </Section>
      </div>
  );
}
