import { randomUUID } from 'node:crypto'
import 'dotenv/config'

import type { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { prisma } from '@/lib/prisma'

function generateDataBaseUrl(schema:string){
    if(!process.env.DATABASE_URL){
        throw new Error()
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    console.log(url);

    return url.toString()
}
export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        console.log('SETUP on. . .')
       const schema = randomUUID()

       const url = generateDataBaseUrl(schema)

       process.env.DATABASE_URL = url;

       execSync('npx run migrate deploy')

        return {
            async teardown() {
            //    await prisma.$executeRawUnsafe(`
            //     DROP SCHEMA IF EXISTS "${schema}" CASCADE
            //     `)

            //     await prisma.$disconnect()
            }
        };
    },
}
