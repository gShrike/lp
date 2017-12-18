export default {

  uri: `auth-strategies`,

  name: `Auth Strategies`,

  objectives: [
    {
      name: `Diagram the flow of an Auth Login implementation`,
      cfus: [
        { type: `Timer`, config: { time: `2:00`, onEnd: `disableSubmission` } },
        {
          title: `Drag and drop the following Login Flow items in order`,
          type: `Orderable`,
          config: {
            options: [
              { name: `Gather the user info on client` },
              { name: `Check the database for existing user and password match` },
              { name: `Create the session on server` },
              { name: `Store session information in the client` }
            ]
          }
        },
        {
          title: `Which step varies based on Session implementation (JWT, session, etc.)?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Create the session on server` },
              { name: `Gather the user info on client` },
              { name: `Check the database for existing user and password match` },
              { name: `Store session information in the client` }
            ]
          }
        }
      ]
    },

    {
      name: `Diagram the flow of an Auth Verification implementation`,
      cfus: [
        { type: `Timer`, config: { time: `2:00`, onEnd: `disableSubmission` } },
        {
          title: `Drag and drop the following Auth Verification Flow items in order`,
          type: `Orderable`,
          config: {
            options: [
              { name: `Send the session info with request to server` },
              { name: `Check the session validity` },
              { name: `Gather requested data` },
              { name: `Send response to client with data` }
            ]
          }
        },
        {
          title: `Which step varies based on Session implementation (JWT, session, etc.)?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Check the session validity` },
              { name: `Send the session info with request to server` },
              { name: `Gather requested data` },
              { name: `Send response to client with data` }
            ]
          }
        },
        {
          title: `We need to verify the session on each request. Which of the following is NOT the reason why?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `The session could have out of date information` },
              { name: `The session could have expired` },
              { name: `The session could not belong to current logged in user` },
              { name: `The session could be tampered with` }
            ]
          }
        }
      ]
    },

  ]

}
