export default {

  uri: `flexbox-basics`,

  name: `Flexbox Basics`,

  objectives: [
    {
      name: `Describe flexbox to a 5yr old`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What is the <code>display</code> value for flexbox?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>display: flex</code>` },
              { name: `<code>display: none</code>` },
              { name: `<code>display: flexed</code>` },
              { name: `<code>display: flexbox</code>` }
            ]
          }
        },
        {
          title: `We can display flexbox as inline or block:`,
          type: `MultipleChoice`,
          config: {
            type: `single`, shuffle: false, options: [
              { name: `True` },
              { name: `False` }
            ]
          }
        }
      ]
    },

  ]

}
