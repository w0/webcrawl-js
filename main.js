import {argv} from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (process.argv.length != 3) {
        throw new Error("You must specify one argument")
    }
    const baseURL = process.argv[2]
    console.log(`Crawler Start: ${baseURL}`)
    printReport(await crawlPage(baseURL))
}

main()