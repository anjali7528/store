import {
  child,
  equalTo,
  get,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  update,
} from 'firebase/database';
import {ShopData} from '../pages/Data';
import {arrayUnion} from 'firebase/firestore';

export function addsData() {
  const db = getDatabase();
  set(ref(db, 'stores/' + 'data'), [...ShopData]);
  console.log('done');
}

export function readData() {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const starCountRef = ref(db, 'stores/');

    onValue(
      starCountRef,
      snapshot => {
        if (snapshot.exists()) {
          // Resolve with the data
          resolve(snapshot.val().data);
        } else {
          // Handle the case when data doesn't exist
          reject('No data found');
        }
      },
      error => {
        // Handle any errors that occur during the read operation
        reject(error.message);
      },
    );
  });
}

export async function updateData(name, url) {
  const db = getDatabase();
  const dataRef = ref(db, '/stores/data');
  const dataQuery = query(dataRef, orderByChild('name'), equalTo(name));
  const fetchData = async () => {
    try {
      const snapshot = await get(dataQuery);
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const currentImageArray = childSnapshot.val().image || [];
          const objectRef = child(dataRef, String(key));
          update(objectRef, {image: [...currentImageArray, url]});
        });
      } else {
        console.log('No matching data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}

export function readCategory(cat, value) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const starCountRef = ref(db, 'stores/');
      onValue(
        starCountRef,
        snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val().data;
            if (data ) {
                if(cat === 'Category')
                 resolve(data.filter((item) =>  item?.category === value))
                else if(cat === 'Type')
                resolve(data.filter((item) =>  item?.type === value))
                else if (cat === 'Location')
                 resolve(data.filter((item) => item?.address.includes(value)))
            } else {
              reject(`No data found for category: ${category}`);
            }
          } else {
            reject('No data found');
          }
        },
        error => {
          reject(error.message);
        },
      );
    });
  }
  