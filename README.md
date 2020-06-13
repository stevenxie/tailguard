# tailguard

_A rule engine for curating your Twitter followers._

> `tailguard` is still under development! Check back for updates :)

<p align="center">
  <img src="./docs/screenshot.png" width="540">
</p>

## Usage

Pull the repo:

```bash
git clone git@github.com:stevexie/tailguard && \
cd tailguard
```

Set environment variables:

```bash
cat <<EOF > ./server/.env.local
TWITTER_TOKEN=...
TWITTER_SECRET=...
TWITTER_CONSUMER_KEY=...
TWITTER_CONSUMER_SECRET=...
EOF
```

Install dependencies, and start:

```bash
npm install && \
npm start
```

## TODO:

- [ ] Make the UI actually pleasant.
- [ ] Show outcomes of recent invocations / errors on the UI.
- [ ] Implement "sign in with Twitter".
- [ ] Use "Authorization" header for authentication.
- [ ] Make rule lambdas take in third parameter which an object filled with
      utility functions:

  ```javascript
  module.exports = function (follower, twitter, { isFollowed /*, ... */ }) {
    return isFollowed(follower);
  };
  ```
