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
  return firebaseApp.database().ref(`/users/${user.uid}`).once('value').then(snapshot => snapshot.val());
}

export function getAccessToken(user) {
  return firebaseApp.database().ref(`/users/${user.uid}/accessToken`).once('value').then(snapshot => snapshot.val());
}

export function createUserRecord(user, accessToken) {
  return getUserRecord(user).then((userRecord) => {
    return firebaseApp.database().ref(`/users/${user.uid}`).update({
      accessToken
    });
  });
}

export function deleteBoard(user, id) {
  const database = firebaseApp.database();
  return database.ref(`/boards/${id}`).remove().then(() => {
    return database.ref(`users/${user.uid}/boards`).once('value');
  }).then(snapshot => {
    let boards = snapshot.val();
    if (!boards) {
      boards = [];
    }

    boards = boards.filter(board => board !== id);
    return database.ref(`/users/${user.uid}/boards`).set(boards);
  });
}

export function getBoard(id) {
  return firebaseApp.database().ref(`/boards/${id}`).once('value').then(snapshot => snapshot.val());
}

export function saveBoard(id, name, repos) {
  const database = firebaseApp.database();
  
  return database.ref(`/boards/${id}`).update({
    name,
    repos
  });
}

export function addBoard(name, repos, user) {
  const database = firebaseApp.database();
  const key = database.ref().child('boards').push().key;
  return database.ref(`/boards/${key}`).set({
    id: key,
    name,
    repos,
    owner: user.uid
  }).then(() => {
    const userBoardsRef = database.ref(`/users/${user.uid}/boards`);
    return userBoardsRef.once('value');
  }).then((snapshot) => {
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
  return database.ref(`/users/${user.uid}/boards`).once('value').then((snapshot) => {
    const boardIds = snapshot.val() || [];
    const boards = [];

    return Promise.map(boardIds, boardId => database.ref(`/boards/${boardId}`).once('value')).then((snapshots) => {
      snapshots.forEach(boardSnapshot => boards.push(boardSnapshot.val()));

      return boards;
    });
  });
}

export default firebaseApp;
