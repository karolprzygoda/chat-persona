import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

export type PersonaKey = {
  personaName: string;
  modelName: string;
  userId: string;
};

export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: Pinecone;

  public constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new Pinecone();
  }

  public init() {
    this.vectorDBClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.vectorDBClient.Index(process.env.PINECONE_INDEX!);
  }

  public async vectorSearch(
    recentChatHistory: string,
    personaFileName: string,
  ) {
    const pineconeClient = <Pinecone>this.vectorDBClient;
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY }),
      { pineconeIndex },
    );

    return await vectorStore
      .similaritySearch(recentChatHistory, 3, { __filename: personaFileName })
      .catch((err) => {
        console.log(err);
      });
  }

  public static async getInstance(): Promise<MemoryManager> {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
      MemoryManager.instance.init();
    }

    return MemoryManager.instance;
  }

  private generateRedisPersonaKey(personaKey: PersonaKey): string {
    return `${personaKey.personaName}-${personaKey.modelName}-${personaKey.userId}`;
  }

  public async writeToHistory(text: string, personaKey: PersonaKey) {
    if (!personaKey || typeof personaKey.userId === "undefined") {
      console.log("Persona key set incorrectly");
      return "";
    }

    const key = this.generateRedisPersonaKey(personaKey);
    return await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });
  }

  public async readLatestHistory(personaKey: PersonaKey): Promise<string> {
    if (!personaKey || typeof personaKey.userId === "undefined") {
      console.log("Persona key set incorrectly");
      return "";
    }

    const key = this.generateRedisPersonaKey(personaKey);

    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();

    return result.reverse().join("\n");
  }

  public async seedChatHistory(
    seedContent: string,
    delimiter: string = "\n",
    personaKey: PersonaKey,
  ) {
    const key = this.generateRedisPersonaKey(personaKey);
    if (await this.history.exists(key)) {
      console.log("User already has chat history");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;

    for (const line of content) {
      await this.history.zadd(key, { score: counter, member: line });
      counter++;
    }
  }
}
