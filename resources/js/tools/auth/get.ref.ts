export const getRefFromUrl = (url: string) => {
    if(url.length && url.includes('ref') && !url.includes('&')) {
        return url.split('?')[1].split("=")[1]
    }
    return null
}