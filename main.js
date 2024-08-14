import {argv} from 'node:process'

function main() {
    if (process.argv.length != 3) {
        throw new Error("You must specify one argument")
    }
    const baseURL = process.argv[2]
    console.log(`Crawler Start: ${baseURL}`)
}

main()