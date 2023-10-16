#!/usr/bin/env node

import * as amqp from 'amqplib';
import { faker } from '@faker-js/faker';

const generateDocs = async (numDocuments = 5, numProperties = 40) => {
    const documents = [];
    const randomMapping = [];

    Array.from({ length: numProperties }).map(() => randomMapping.push(faker.database.column()));

    Array.from({ length: numDocuments }).map(() => {
        const document = {};
        randomMapping.map(x => document[x] = faker.lorem.words());
        documents.push(document);
    });

    return documents;
}

(async (totalDocs = 100000) => {
    const EXCHANGE_NAME = 'to_logstash_exchange';
    const EXCHANGE_TYPE = 'direct';
    const EXCHANGE_ROUTING_KEY = 'routing_key';

    const messages = (await generateDocs(totalDocs)).map(x => JSON.stringify(x));

    try {
        const connection = await amqp.default.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, EXCHANGE_ROUTING_KEY);
        console.log('START')
        await Promise.all(messages.map(message => {
            const sent = channel.publish(EXCHANGE_NAME, EXCHANGE_ROUTING_KEY, Buffer.from(message));
            //sent ? console.log(" [x] Sent %s", message) : console.error("Unable to send");
        }));
        await channel.close();
        await connection.close();
    } catch (err) {
        console.error(err)
    }
    console.log('STOP')
})();
