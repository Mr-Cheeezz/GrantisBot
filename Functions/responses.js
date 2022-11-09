import * as ROBLOX_FUNCTIONS from "./roblox.js";
import * as TWITCH_FUNCTIONS from "./twitch.js";
import fs, { link } from 'fs'

const grantisId = 1777455895 // roblox id for getting game and playtime

const COOKIE = process.env.COOKIE;

const BOT_OAUTH = process.env.BOT_OAUTH; // bot oauth token for performing actions
const BOT_NAME = process.env.BOT_NAME; // bot username
const BOT_ID = process.env.BOT_ID; // bot uid

const CHANNEL_NAME = process.env.CHANNEL_NAME; // name of the channel for the bot to be in
const CHANNEL_ID = process.env.CHANNEL_ID; // channel uid

export const responses = {
    join (client, target, message = null) {
        const SETTINGS = JSON.parse(fs.readFileSync("./SETTINGS.json"))
        var currentMode = SETTINGS.currentMode

        if (currentMode == "!join.on") {
            client.say(CHANNEL_NAME, `!roblox @${target}`);
        } else if (currentMode == "!link.on") {
            client.say(CHANNEL_NAME, `[🤖]: @${target} type !link to get the link to join`);
        }
    },
    game: async (client, target, message = null) => {
    const game = await ROBLOX_FUNCTIONS.getPresence(grantisId).then((r)=>{return r.lastLocation})
    const locationId = await ROBLOX_FUNCTIONS.getPresence(grantisId).then((r)=>{return r.placeId})
    const onlineStatus = await ROBLOX_FUNCTIONS.getLastOnline(grantisId).then((r)=>{return r.diffTimeMinutes})
    const SETTINGS = JSON.parse(fs.readFileSync("./SETTINGS.json"))

    if (onlineStatus > 30) {
        return client.say(
            CHANNEL_NAME, `[🤖]: @${target}, Grantis is not playing anything right now.`);
    }
    if (game != 'Website') {
        return client.say(
            CHANNEL_NAME, `[🤖]: @${target}, Grantis is currenyly playing ${game}`);
    }
    return client.say(
        CHANNEL_NAME, `[🤖]: @${target}, Grantis is currently switching games.`);
    },
    servertype(client, target, message = null) {
        const SETTINGS = JSON.parse(fs.readFileSync("./SETTINGS.json"))
        var currentMode = SETTINGS.currentMode
        if (currentMode == "!link.on") {
          client.say(CHANNEL_NAME, `[🤖]: This is a private server type !link to get the link to join @${target}`);
        } else if (currentMode == "!1v1.on") {
          client.say(CHANNEL_NAME, `[🤖]: Grantis is currently 1v1ing viewers in his private server, type 1v1 in the chat to have a chance of being picked @${target}`);
        } else if (currentMode == "!join.on") {
          client.say(CHANNEL_NAME, `[🤖]: This is a public server type !roblox to join grantis @${target}`);
        }
    },
    song (client, target, message = null) {
        client.say(CHANNEL_NAME, `!song @${target}`);
    },
    add (client, target, message = null) {
        client.say(CHANNEL_NAME, `!add @${target}`);
    },
    "1v1" (client, target, message = null) {
        const SETTINGS = JSON.parse(fs.readFileSync("./SETTINGS.json"))
        var currentMode = SETTINGS.currentMode
        if (currentMode == "!1v1.on") {
          client.say(CHANNEL_NAME, `[🤖]: Hey, @${target} type 1v1 in the chat ONCE to have a chance to 1v1 grantis.`);
        } else {
          client.say(CHANNEL_NAME, `[🤖]: Grantis is not currently doing 1v1s @${target}`);
        }
    },
    user (client, target, message = null) {
        client.say(CHANNEL_NAME, `[🤖]: @${target} Grantis's username is "Grantis_ttv"`);
    },
    time (client, target, message = null) {
        client.say(CHANNEL_NAME, `!time @${target}`);
    },
    // vipinfo (client, target, message = null) {
    //     client.say(CHANNEL_NAME, `@${target} grantis randomly gvies out vip you never know. you might be next 👀`);
    // }, 
    discord (client, target, message = null) {
        client.say(CHANNEL_NAME, `!discord @${target} click here to join the discord`)
    }
}