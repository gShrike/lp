export default {

  uri: `jwt-json-web-tokens`,

  name: `JSON Web Tokens (JWT)`,

  objectives: [
    {
      name: `Describe JWTs like a developer`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What are the three parts of a JSON Web Token?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>header.payload.signature</code>` },
              { name: `<code>headers.userInfo.key</code>` },
              { name: `<code>alg.type.payload</code>` },
              { name: `<code>j.w.t</code>` }
            ]
          }
        },
        {
          title: `What makes JWTs secure?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `The <code>signature</code> which is signed by a secret` },
              { name: `The <code>header</code> is <code>base64UrlEncode</code>d` },
              { name: `The <code>payload</code> is <code>base64UrlEncode</code>d` },
              { name: `The <code>algorithm</code> used` }
            ]
          }
        },
        {
          title: `What does <em>signing</em> the JWT mean?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Encrypt the data to prevent hijacking` },
              { name: `???` },
              { name: `???` },
              { name: `???` }
            ]
          }
        },
        {
          title: `Why do we need to verify a JWT?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `It could have been modified client-side` },
              { name: `The data can transmit incorrectly sometimes` },
              { name: `???` },
              { name: `???` }
            ]
          }
        },
      ]
    },

    {
      name: `Implement JWTs in NodeJS`,
      cfus: [
        { type: `Timer`, config: { time: `2:00`, onEnd: `disableSubmission` } },
        {
          title: `How can we send the JWT with a request?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Using the <code>Authorization: Bearer</code> header` },
              { name: `As a parameter on the URL query string` },
              { name: `The JWT is stored on the server and does not need to be sent` },
              { name: `???` }
            ]
          }
        }
      ]
    },

  ]

}
