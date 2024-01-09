import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, getDocs, Firestore, getDoc, addDoc, deleteDoc, doc, collection } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { query, where } from "firebase/firestore";


const firebaseConfig = {
    apiKey: ,
    authDomain: ,
    projectId: ,
    storageBucket: ,
    messagingSenderId: ,
    appId: ,
    measurementId: 
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app)


export async function getJobs(db: Firestore) {
    let coll = collection(db, 'jobs')
    let docs = await getDocs(coll)
    const jobList = docs.docs.map(doc => doc.data());
    return jobList;
}

export async function getJob(db: Firestore, jobId: string) {
    let coll = collection(db, 'jobs')
    let docs = await getDocs(coll)
    const jobList = docs.docs.map(doc => doc.data());
    let job = jobList.find(job => (job.jobId == jobId))
    return job;
}

export async function addJob(db: Firestore, data: any) {
    let coll = collection(db, 'jobs')
    await addDoc(coll, data)

    return 200
}

export async function getAppliers(db: Firestore) {
    let coll = collection(db, 'appliedUsers')
    let docs = await getDocs(coll)
    const jobList = docs.docs.map(doc => doc.data());
    return jobList;
}

export async function getAppliersOwner(db: Firestore, userId: string) {
    let coll = collection(db, 'appliedUsers')
    let docs = await getDocs(coll)
    const jobList = docs.docs.map(doc => doc.data());
    let appliers = jobList.filter(applier => (applier.employer == userId))
    return appliers;
}

export async function getApplier(db: Firestore, jobId: string, userId: string, guildId: string) {
    let coll = collection(db, 'appliedUsers')
    let docs = await getDocs(coll)
    const list = docs.docs.map(doc => doc.data());
    let job = list.filter(job => (job.jobId == jobId && job.userId == userId && job.guildId == guildId))
    return job;
}

export async function addApplier(db: Firestore, data: any) {
    let coll = collection(db, 'appliedUsers')
    await addDoc(coll, data)

    return 200
}

export async function getChats(db: Firestore) {
    let coll = collection(db, 'chats')
    let docs = await getDocs(coll)
    const jobList = docs.docs.map(doc => doc.data());
    return jobList;
}

export async function getChat(db: Firestore, userId: string) {
    let coll = collection(db, 'chats')
    let docs = await getDocs(coll)
    const list = docs.docs.map(doc => doc.data());
    let job = list.find(job => (job.userId == userId))
    return job;
}

export async function addChat(db: Firestore, data: any) {
    let coll = collection(db, 'chats')
    await addDoc(coll, data)

    return 200
}

export async function deleteChat(db: Firestore, id: string) {
    let coll = collection(db, 'chats')

    let docs = await getDocs(coll)
    let refId = ''

    for(var i = 0; i < docs.docs.length; i++) {
        let entity = docs.docs[i]

        let entityData = entity.data()

        if(entityData.userId == id) {
            refId = entity.id
        }
    }

    if(refId == '') return

    let docRef = doc(db, 'chats', refId)

    await deleteDoc(docRef)

    return
}

export async function deleteApplier(db: Firestore, id: string, jobId: string) {
    let coll = collection(db, 'appliedUsers')

    let docs = await getDocs(coll)
    let refId = ''

    for(var i = 0; i < docs.docs.length; i++) {
        let entity = docs.docs[i]

        let entityData = entity.data()

        if(entityData.userId == id && entityData.jobId == jobId) {
            refId = entity.id
        }
    }

    if(refId == '') return

    let docRef = doc(db, 'appliedUsers', refId)

    await deleteDoc(docRef)

    return
}

export default db
