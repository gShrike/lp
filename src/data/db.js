import { v4 as uuid } from 'uuid'

window.firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
})

const fb = window.firebase.database()

class DB {

  getLessons() {

  }

  // Returning in normalized format
  // [
  //  { id: `...`, lesson: LP }
  // ]
  getLessonPlans() {
    return fb.ref(`lessonPlans`).once('value').then(snapshot => {
      const snapVals = snapshot.val()
      const values = []
      for (const id in snapVals) {
        values.push(
          formatLessonPlan(id, snapVals[id])
        )
      }
      return values
    })
  }

  getLessonPlan(id) {
    return fb.ref(`lessonPlans/${id}`).once('value').then(snapshot => {
      const value = snapshot.val()

      if (!value) {
        return null
      }

      return formatLessonPlan(id, value)
    })
  }

  createLessonPlan(lp, skipSave = false) {
    const lesson = createLessonPlanWithId(lp)
    if (!lesson) {
      return null
    }

    const lessonPlan = {
      lesson,
      attendance: [],
      submissions: []
    }

    if (skipSave) {
      return lessonPlan
    }

    fb.ref(`lessonPlans`).push().set(lessonPlan)
  }

  submitAnswersToLessonPlan(answers, lpId) {
    if (!lpId) {
      return window.firebase.Promise.reject(`Lesson Plan ID missing`)
    }

    const promises = answers.map(answer => {
      return fb.ref(`lessonPlans/${lpId}/submissions`).push().set(answer)
    })

    if (promises.length) {
      return window.firebase.Promise.all(promises)
    }

    // If no answers were submitted we resolve immediately
    return window.firebase.Promise.resolve()
  }

  onLessonPlanAnswerSubmission(lp, callback) {
    fb.ref(`lessonPlans/${lp.id}/submissions`).on('value', snapshot => {
      const submissionSnapshot = snapshot.val()
      const submissions = submissionSnapshot !== null ? Object.values(snapshot.val()) : []

      callback(submissions)
    })
  }


}

/**
 * Helpers
 */

// Creates a new object with
// - an `id` property added
// - `submissions` converted to an array
function formatLessonPlan(id, snapshotVal) {
  return {
    id,
    ...snapshotVal,
    submissions: Object.values(snapshotVal.submissions || {}),
  }
}

// Create a new lesson plan with ids in place
function createLessonPlanWithId(lp) {
  if (!lp) {
    return null
  }

  return {
    id: uuid(),
    ...lp,
    objectives: lp.objectives.map(objective => {
      objective.id = uuid()
      objective.cfus = objective.cfus.map(cfu => {
        cfu.id = uuid()
        return cfu
      })
      return objective
    })

  }
}

export default new DB()
