function printReport(pages) {
    console.log('Report is starting..')

    const sorted = sortPages(pages)

    for (const item of sorted) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}

function sortPages(pages) {
    const keyvalArray = Object.entries(pages)

    return keyvalArray.sort((a,b) => b[1] - a[1])
}

export { printReport }