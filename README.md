# Stitching React
A React example project for [Stitching React](https://www.npmjs.com/package/stitching-react) module.

## Content

  - [Documentation](https://www.npmjs.com/package/stitching-react-example#documentation)
  - [Support](https://www.npmjs.com/package/stitching-react-example#support)
  - [Installation](https://www.npmjs.com/package/stitching-react-example#installation)
  - [Overview](https://www.npmjs.com/package/stitching-react-example#overview)
  - [Setting up MongoDB Stitch app](https://www.npmjs.com/package/stitching-react-example#setting-up-mongodb-stitch-app)
    - [Setting up Email/Password authentication](https://www.npmjs.com/package/stitching-react-example#setting-up-emailpassword-authentication)
    - [Creating optional metadata collection](https://www.npmjs.com/package/stitching-react-example#creating-optional-metadata-collection)
        - [Top-Level Document](https://www.npmjs.com/package/stitching-react-example#top-level-document)
  - [Usage](https://www.npmjs.com/package/stitching-react-example#usage)

## Documentation

- [StitchingJS.com](http://stitchingjs.com/)
- [StitchingJS.com/react](http://stitchingjs.com/react)
- [StitchingJS.com/react-example](http://stitchingjs.com/react-example)
- [MongoDB Stitch Documentation](https://docs.mongodb.com/stitch/)

## Support

  - [Bug Reports](https://github.com/waterkhair/stitching-react-example/issues/)
  - [MongoDB Support](https://docs.mongodb.org/manual/support/)

## Installation

```sh
$ npm install stitching-react-example
```

## Overview

This is an example project for `Stitching React`, a react module that makes easier the usage of [Stitching](https://www.npmjs.com/package/stitching-react#documentation), a module running on top of `MongoDB Stitch`.

## Setting up MongoDB Stitch app

Before using Stitching, you need to setup a `MongoDB Stitch` app. To get started, you can visit [Getting Started](https://docs.mongodb.com/stitch/getting-started/) page and follow the instructions. After you finish setting up a `MongoDB Stitch` app, you can use your APP ID to handle `Authentication`.

### Setting up Email/Password authentication

Before registering an user, you need to enable email/password authentication in `MongoDB Stitch` (Authentication -> Providers -> Email/Password):

* Email Confirm URL: The URL included on the confirmation email. You will need to setup Stitching to receive a Token/Token ID pair in order to confirm an email.
* Password Reset URL: The URL included on the password reset email. You will need to setup Stitching to receive a Token/Token ID pair in order to reset a password.
* Reset Password Email Subject: Subject for the reset password email.
* Email Confirmation Subject: Subject for the confirmation email.

### Creating optional metadata collection

Inside MongoDB Stitch, go to your Atlas Cluster and create a new collection:

* Database: The database where your metadata collection will belong (I.E. example).
* Collection: The metadata collection name used to store our user metadata (I.E. metadata).

After you created your collection, you need to set the next `Field Rules`:

#### Top-Level Document

READ (Only the owner of a document can read it)
```json
{
  "owner_id": "%%user.id"
}
```
WRITE (Anyone can create a new document, but only the owner of a document can write to it)
```json
{
  "%or": [
    {
      "%%prevRoot.owner_id": "%%user.id"
    },
    {
      "%%prevRoot": {
        "%exists": false
      }
    }
  ]
}
```

#### owner_id

VALID
```json
"%%user.id"
```

**Note:** Email/Password authentication doesn't handle metadata out of the box. This means that after login to your MongoDB Stitch app, you don't have other information regarding the email. We need a collection to save user name, date of birth, address, etc. This is optional and we can skip this step.

## Usage

After installing `Stitching React Example` and setting up `Stitching`, go to `/node_modules/stitching-react-example` folder, modify `init_stitching.js` with the right values:

```js
// Modules
import StitchingReact from "stitching-react";

StitchingReact.connect(
    "example-XXXXX", // Use your APP ID
    "https://stitch.mongodb.com", // Use your endpoint
    "mongodb-atlas", // Use your cluster
    "example", // Use your DB name
    "metadata" // Use the collection name that you want to use for metadata
);
```

After you update `init_stitching.js`, run start task:

```js
cd ./node_modules/stitching-react-example
npm run start
```
