const host = 'http://18.166.72.167'
export async function fetcher(path, initOpts) {
    const res = await fetch(`${host}${path}`, {
        ...initOpts,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            ...initOpts?.headers,
        },
    })
    return res.json()
}
