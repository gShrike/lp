export default {

  id: `create-react-app-intro`,

  name: `Create React App Intro`,

  objectives: [
    {
      name: `Install <code>create-react-app</code> through CLI`,
      cfus: [
        { type: `Timer`, config: { time: `5:00` } },
        {
          title: `How do we install <code>create-react-app</code> globally?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>$ npm install --g create-react-app</code>` },
              { name: `<code>$ npm install -g create-react-app</code>` },
              { name: `<code>$ npm install -g create-react-app-cli</code>` },
            ]
          }
        },
        {
          title: `How do we check if <code>create-react-app</code> is already installed?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>$ create-react-app?</code>` },
              { name: `<code>$ which create-react-app</code>` },
              { name: `<code>$ loc create-react-app</code>` },
            ]
          }
        }
      ]
    },
    {
      name: `Create a new app using <code>create-react-app</code> through CLI`,
      cfus: [
        { type: `Timer`, config: { time: `5:00` } },
        {
          title: `How do we create a new app with <code>create-react-app</code>?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>$ create react-app appName</code>` },
              { name: `<code>$ create-react-app --project appName</code>` },
              { name: `<code>$ create-react-app appName</code>` },
            ]
          }
        },
        {
          title: `Where will <code>create-react-app</code> create the new app?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `In the <code>~/projects</code> folder` },
              { name: `In the current directory with <code>appName</code> folder` }
            ]
          }
        }
      ]
    },
    {
      name: `Describe the structure of a <code>create-react-app</code> application`
    },
    {
      name: `Add a new component to our app`
    },
  ]

}
