export function getFileType(attachment) {
    const { name, content } = attachment

    if (content.includes('application/pdf')) return 'pdf'
    if (content.includes('image/')) return 'img'
    if (content.includes('text/')) return 'txt'
    if (name.endsWith('.pdf')) return 'pdf'
    if (name.endsWith('.png')) return 'img'
    if (name.endsWith('.jpg')) return 'img'
    if (name.endsWith('.jpeg')) return 'img'
    if (name.endsWith('.gif')) return 'img'
    if (name.endsWith('.md')) return 'md'
    if (name.endsWith('.markdown')) return 'md'
    return 'N/A'
}
