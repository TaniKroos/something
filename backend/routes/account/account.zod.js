const zod = require('zod');


const gett = zod.object({
    userId: zod.string(),
})

const ts = zod.object({
    amount: zod.number(),
    to: zod.string(),
})

module.exports = {
    gett,
    ts,
}