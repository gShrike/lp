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
      const vals = snapshot.val()
      const values = []
      for (const id in vals) {
        values.push({
          id,
          ...vals[id]
        })
      }
      return values
    })
  }

  getLessonPlan() {

  }

  createLessonPlan(lp) {
    fb.ref(`lessonPlans`).push().set({
      lesson: lp,
      attendance: [],
      submissions: []
    })
  }


}

export default new DB()
