import Promise from 'bluebird';

import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
});

export function getUserRecord(user) {
  return firebaseApp.database().ref(`/users/${user.uid}`).once('value').then(snapshot => {
    return snapshot.val(); 
  });
}

export function createUserRecord(user) {
  return getUserRecord(user).then(userRecord => {
    if (userRecord === null) {
      return firebaseApp.database().ref(`/users/${user.uid}`).set({
        boards: []
      }); 
    }

    return userRecord;
  });
}

export function saveBoard(name, repos, user) {
  const database = firebaseApp.database();
  const key = database.ref().child('boards').push().key;
  return database.ref(`/boards/${key}`).set({
    name,
    repos,
    owner: user.uid
  }).then(() => {
    const userBoardsRef = database.ref(`/users/${user.uid}/boards`);
    return userBoardsRef.once('value');
  }).then(snapshot => {
    let boards = snapshot.val();
    if (!boards) {
      boards = [];
    } 

    boards.push(key);
    return database.ref(`/users/${user.uid}/boards`).set(boards);
  });
}

export function getBoards(user) {
  const database = firebaseApp.database();
  return database.ref(`/users/${user.uid}/boards`).once('value').then(snapshot => {
    const boardIds = snapshot.val() || [];
    const boards = [];

    return Promise.map(boardIds, boardId => database.ref(`/boards/${boardId}`).once('value')).then(snapshots => {
      snapshots.forEach(snapshot => {
        boards.push(snapshot.val());
      });

      return boards;
    });
  });
}

export default firebaseApp;
