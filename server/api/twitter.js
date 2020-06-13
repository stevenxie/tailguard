// TODO: Implement log-in with Twitter.

// const Router = require("@koa/router");
// const OAuth = require("oauth-1.0a");

// const router = new Router();
// const crypto = require("crypto");
// const axios = require("axios").default;

// const {
//   TWITTER_CALLBACK_URL,
//   TWITTER_CONSUMER_KEY,
//   TWITTER_SECRET_KEY,
// } = process.env;

// if (!TWITTER_CALLBACK_URL) throw Error("Missing Twitter callback URL.");
// if (!TWITTER_CONSUMER_KEY) throw Error("Missing Twitter consumer key.");
// if (!TWITTER_SECRET_KEY) throw Error("Missing Twitter secret key.");

// const oauth = new OAuth({
//   consumer: {
//     key: TWITTER_CONSUMER_KEY,
//     secret: TWITTER_SECRET_KEY,
//   },
//   signature_method: "HMAC-SHA1",
//   hash_function: (base, key) =>
//     crypto.createHmac("sha1", key).update(base).digest("base64"),
// });

// const client = axios.create({
//   baseURL: "https://api.twitter.com",
// });

// const localCreds = {};

// router.post("/token", async (ctx, next) => {
//   console.log("server/twitter: requesting auth token...");

//   const headers = oauth.toHeader(
//     oauth.authorize({
//       url: "https://api.twitter.com/oauth/request_token",
//       method: "POST",
//       data: {
//         oauth_callback: TWITTER_CALLBACK,
//         oauth_consumer_key: TWITTER_CONSUMER_KEY,
//       },
//     })
//   );

//   console.log({ headers });

//   const { data } = await client.post("/oauth/request_token", undefined, {
//     headers: oauth.toHeader(
//       oauth.authorize({
//         url: "https://api.twitter.com/oauth/request_token",
//         method: "POST",
//         data: {
//           oauth_callback: TWITTER_CALLBACK,
//           oauth_consumer_key: TWITTER_CONSUMER_KEY,
//         },
//       })
//     ),
//   });

//   const {
//     oauth_token: token,
//     oauth_token_secret: secret,
//     oauth_callback_confirmed: confirmed,
//   } = data;
//   if (!confirmed) {
//     console.error(`server/twitter: callback not confirmed`);
//     throw Error("Callback unconfirmed.");
//   }

//   localCreds.token = token;
//   localCreds.secret = secret;
//   console.log(`server/twitter: got token (${token}) and secret (${secret})`);

//   ctx.body = { token };
// });

// router.get("/callback", (ctx, next) => {
//   ctx.body = { hello: "hi" };
// });

// module.exports = { router };
