export default {

  uri: `git-and-github`,

  name: `Git & Github`,

  objectives: [
    {
      name: `Describe Git, Github, and related terms`,
      materials: `http://slides.com/chadwithuhc/git-and-github#/`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What is Git?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A Source Control system` },
              { name: `The act of grabbing something` },
              { name: `A configuration file` },
              { name: `Latin for "tracking"` }
            ]
          }
        },
        {
          title: `Why do we need Git?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Git allows us to track changes over time` },
              { name: `Git is our default code editor` },
              { name: `Git will check our code for errors` },
              { name: `Git is an essential programming language` }
            ]
          }
        },
        {
          title: `How do we use Git?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Through the command-line` },
              { name: `Through a web application` },
              { name: `Through a database` },
              { name: `Through our text editor` }
            ]
          }
        },
        {
          title: `What is Github?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Hosting for Git repositories` },
              { name: `The creator of Git` },
              { name: `A type of database` },
              { name: `A food delivery service` }
            ]
          }
        },
        {
          title: `Why do we need Github?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Github allows us to collaborate on code with other developers` },
              { name: `Github is our online code editor` },
              { name: `Github is converting our code for the web` },
              { name: `Github is where we buy snippets of code` }
            ]
          }
        },
        {
          title: `How do we use Github?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Through the website or command-line (remote)` },
              { name: `Through our mobile device` },
              { name: `Through email` },
              { name: `Through our text editor` }
            ]
          }
        },
        {
          title: `What is Source Control?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A system for us to store and track changes to files` },
              { name: `A system for us to limit access to files in our application` },
              { name: `A system to buy code` },
              { name: `A system to check the quality of our code` }
            ]
          }
        },
        {
          title: `What is a Repository?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A storage space for all our source code` },
              { name: `A USB thumb drive` },
              { name: `A tool to check the quality of our code` },
              { name: `A database for a bank` }
            ]
          }
        },
      ]
    },


    {
      name: `Fork and clone Github repos`,
      materials: `http://slides.com/chadwithuhc/git-and-github#/5`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What is a Fork?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A copy of another repo on Github` },
              { name: `A local copy of a git repo` },
              { name: `A new branch on a repo` },
              { name: `A backup of a local repo` }
            ]
          }
        },
        {
          title: `What is a Clone?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A local copy of a git repo` },
              { name: `A copy of another repo on Github` },
              { name: `A new branch on a repo` },
              { name: `A backup of a local repo` }
            ]
          }
        },
        {
          title: `What command will Clone a repo?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git clone REPO_URL</code>` },
              { name: `<code>git-clone REPO_URL</code>` },
              { name: `<code>git pull REPO_URL</code>` },
              { name: `<code>pull REPO_URL</code>` }
            ]
          }
        }
      ]
    },


    {
      name: `Stage and commit files to git repos`,
      materials: `http://slides.com/chadwithuhc/git-and-github#/6`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What does it mean to Stage a file?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Mark changes as "included" for commit` },
              { name: `Push the files up to the server` },
              { name: `Prevent others from changing a file while we work on it` },
              { name: `Create a copy of the file in case we want to rollback` }
            ]
          }
        },
        {
          title: `What command will Stage all files?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git add -A</code>` },
              { name: `<code>git stage -A</code>` },
              { name: `<code>git set -A</code>` },
              { name: `<code>stage -A</code>` }
            ]
          }
        },
        {
          title: `What does it mean to Commit?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Save all staged changes to the repos history` },
              { name: `Lock all staged files for future edits` },
              { name: `Send changes up to the server` },
              { name: `Create a request to review submitted changes` }
            ]
          }
        },
        {
          title: `What command will Commit with a message, "Updated HTML"?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git commit -m "Updated HTML"</code>` },
              { name: `<code>git commit "Updated HTML"</code>` },
              { name: `<code>git commit Updated HTML</code>` },
              { name: `<code>commit -m "Updated HTML"</code>` }
            ]
          }
        },
        {
          title: `What command can we use to see what is currently Staged?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git status</code>` },
              { name: `<code>git staged</code>` },
              { name: `<code>git commit --list</code>` },
              { name: `<code>git changes</code>` }
            ]
          }
        }
      ]
    },


    {
      name: `Push files to a Github remote`,
      materials: `http://slides.com/chadwithuhc/git-and-github#/7`,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `What is a Remote?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `A URL to a hosted git repo` },
              { name: `A controller for our git repo` },
              { name: `A link to somebody elses local git repo` },
              { name: `The path to the repo on your computer` }
            ]
          }
        },
        {
          title: `What command can we use to see our Remote connections?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git remote -v</code>` },
              { name: `<code>git remote status</code>` },
              { name: `<code>git remote --list</code>` },
              { name: `<code>list-remotes</code>` }
            ]
          }
        },
        {
          title: `What does it mean to Push?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Send our local changes to a remote repo` },
              { name: `Merge our changes in with somebody elses` },
              { name: `Add commits to the end of our repo` },
              { name: `Replace our old commits with the new ones` }
            ]
          }
        },
        {
          title: `What command can we use to Push to our origin branch?`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `<code>git push origin master</code>` },
              { name: `<code>git push origin</code>` },
              { name: `<code>git send</code>` },
              { name: `<code>git send --origin</code>` }
            ]
          }
        }
      ]
    },


    {
      name: `Compare Git and Github`,
      materials: ``,
      cfus: [
        { type: `Timer`, config: { time: `0:30`, onEnd: `disableSubmission` } },
        {
          title: `When I make a commit, I am committing to ...`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Git` },
              { name: `Github` },
              { name: `Git & Github` }
            ]
          }
        },
        {
          title: `When I fork a repository, I am forking with ...`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Github` },
              { name: `Git` },
              { name: `Git & Github` }
            ]
          }
        },
        {
          title: `When I push a branch, I am pushing to ...`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Github` },
              { name: `Git` },
              { name: `Git & Github` }
            ]
          }
        },
        {
          title: `When I clone a repo, I am using ...`,
          type: `MultipleChoice`,
          config: {
            type: `single`, options: [
              { name: `Git & Github` },
              { name: `Git` },
              { name: `Github` }
            ]
          }
        }
      ]
    },

  ]

}
