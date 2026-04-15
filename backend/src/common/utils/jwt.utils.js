import crypto from 'crypto'

const hash = async (token) => {
    const hashedToken = await crypto.createHash('sha256').update(token).digest('hex')
    return hashedToken
}

export {hash}