const fs = require('fs')
const http = require('http')
const firebase = require('@firebase/rules-unit-testing')

const FIRESTORE_EMULATOR_HOST = 'localhost:8080'


const PROJECT_ID = 'twitter-fight'
//COVERAGE_URL がレポート生成のURL
//テスト実行後にここアクセスしたらテストレポートが出力される（らしい）
//テストレポートってのは、この行はテストされましたよ！ってレポート
const COVERAGE_URL = `http://${FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`
//getAuthedFirestore は、アプリで使うfirebase ってオブジェクトそれを作る関数
//引数にauth情報を与えれば、その認証が済んでるfirebaseを返却してくれる
function getAuthedFirestore(auth) {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore()
}
//JSでfirestore.rules を読み込んで、firebaseエミュレーターに渡してる
beforeAll(async () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8')
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules })
})
//これでエミュレーターの終了？かな？
afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()))
  // Write the coverage report to a file
  const coverageFile = 'firestore-coverage.html'
  const fstream = fs.createWriteStream(coverageFile)
  await new Promise((resolve, reject) => {
    http.get(COVERAGE_URL, (res) => {
      res.pipe(fstream, { end: true })

      res.on('end', resolve)
      res.on('error', reject)
    })
  })

  console.log(`View firestore rule coverage information at ${coverageFile}\n`)
})

describe('最初のテスト', () => {
  // データクリア
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID })
  })
  describe('sutefuri', () => {
    test('SET - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      // セット出来ること
      await firebase.assertSucceeds(
        sutefuriRef.set({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('SET - Not Authed', async () => {
      const db = getAuthedFirestore({uid: "bob"})
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      // セット出来ないこと
      await firebase.assertFails(
        sutefuriRef.set({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('UPDATE - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      await sutefuriRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // 更新出来ること
      await firebase.assertSucceeds(
        sutefuriRef.update({
          owner: 'alice',
          updateAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('UPDATE - Not Authed', async () => {
      const _db = getAuthedFirestore({ uid: 'alice' })
      const _sutefuriRef = _db.collection('sutefuri').doc('alice')
      await _sutefuriRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      const db = getAuthedFirestore({ uid: 'bob' })
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      // 更新出来ないこと
      await firebase.assertFails(
        sutefuriRef.update({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('DELETE - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      await sutefuriRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // 削除出来ること
      await firebase.assertSucceeds(sutefuriRef.delete())
    })

    test('DELETE - Not Authed', async () => {
      const _db = getAuthedFirestore({ uid: 'alice' })
      const _sutefuriRef = _db.collection('sutefuri').doc('alice')
      await _sutefuriRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      const db = getAuthedFirestore({ uid: 'bob' })
      const sutefuriRef = db.collection('sutefuri').doc('alice')
      // 削除出来ないこと
      await firebase.assertFails(sutefuriRef.delete())
    })

    // test('GET - Authed', async () => {
    //   const db = getAuthedFirestore({ uid: 'alice' })
    //   const sutefuriRef = db.collection('sutefuri').doc('alice')
    //   // 1件取得出来ること
    //   await firebase.assertSucceeds(sutefuriRef.get())
    // })

    // test('GET - Not Authed', async () => {
    //   const db = getAuthedFirestore(null)
    //   const sutefuriRef = db.collection('sutefuri').doc('alice')
    //   // 1件取得出来ること
    //   await firebase.assertSucceeds(sutefuriRef.get())
    // })

    // test('LIST - Authed', async () => {
    //   const db = getAuthedFirestore({ uid: 'alice' })
    //   const sutefuriRef = db.collection('sutefuri')
    //   // 全件取得出来ること
    //   await firebase.assertSucceeds(sutefuriRef.get())
    // })

    // test('LIST - Not Authed', async () => {
    //   const db = getAuthedFirestore(null)
    //   const sutefuriRef = db.collection('sutefuri')
    //   // 全件取得出来ること
    //   await firebase.assertSucceeds(sutefuriRef.get())
    // })
  })
  describe('titles', () => {
    test('NoSet', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const titlesRef = db.collection('titles').doc('alice')
      // セット出来きないこと
      await firebase.assertFails(
        titlesRef.set({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })
  })

  describe('users', () => {
    test('SET - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const usersRef = db.collection('users').doc('alice')
      // 自分のドキュメントにセット出来ること
      await firebase.assertSucceeds(
        usersRef.set({
          name: 'alice',
          photoURL: 'URL',
        })
      )
    })

    test('SET - Not Authed', async () => {
      const db = getAuthedFirestore({uid: 'bob'})
      const usersRef = db.collection('users').doc('alice')
      // 自分以外のドキュメントにセット出来ないこと
      await firebase.assertFails(
        usersRef.set({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('UPDATE - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const usersRef = db.collection('users').doc('alice')
      await usersRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // 更新出来ること
      await firebase.assertSucceeds(
        usersRef.update({
          owner: 'alice',
          updateAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('UPDATE - Not Authed', async () => {
      const _db = getAuthedFirestore({ uid: 'alice' })
      const _usersRef = _db.collection('users').doc('alice')
      await _usersRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      const db = getAuthedFirestore({ uid: 'bob' })
      const usersRef = db.collection('users').doc('alice')
      // 更新出来ないこと
      await firebase.assertFails(
        usersRef.update({
          owner: 'alice',
          createAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      )
    })

    test('DELETE - Authed', async () => {
      const db = getAuthedFirestore({ uid: 'alice' })
      const usersRef = db.collection('users').doc('alice')
      await usersRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      // 削除出来ること
      await firebase.assertSucceeds(usersRef.delete())
    })

    test('DELETE - Not Authed', async () => {
      const _db = getAuthedFirestore({ uid: 'alice' })
      const _usersRef = _db.collection('users').doc('alice')
      await _usersRef.set({
        owner: 'alice',
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      const db = getAuthedFirestore({ uid: 'bob' })
      const usersRef = db.collection('users').doc('alice')
      // 削除出来ないこと
      await firebase.assertFails(usersRef.delete())
    })

    // test('GET - Authed', async () => {
    //   const db = getAuthedFirestore({ uid: 'alice' })
    //   const usersRef = db.collection('users').doc('alice')
    //   // 1件取得出来ること
    //   await firebase.assertSucceeds(usersRef.get())
    // })

    // test('GET - Not Authed', async () => {
    //   const db = getAuthedFirestore(null)
    //   const usersRef = db.collection('users').doc('alice')
    //   // 1件取得出来ること
    //   await firebase.assertSucceeds(usersRef.get())
    // })

    // test('LIST - Authed', async () => {
    //   const db = getAuthedFirestore({ uid: 'alice' })
    //   const usersRef = db.collection('users')
    //   // 全件取得出来ること
    //   await firebase.assertSucceeds(usersRef.get())
    // })

    // test('LIST - Not Authed', async () => {
    //   const db = getAuthedFirestore(null)
    //   const usersRef = db.collection('users')
    //   // 全件取得出来ること
    //   await firebase.assertSucceeds(usersRef.get())
    // })
  })

})