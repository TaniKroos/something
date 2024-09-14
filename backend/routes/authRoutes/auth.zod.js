const { model } = require('mongoose')
const zod = require('zod')
 

const sinup = zod.object({
    username: zod.string(),
    email : zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const sinin = zod.object({
    email : zod.string(),
    password: zod.string(),
})


const update = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
module.exports = {
    sinin,
    sinup,
    update
}