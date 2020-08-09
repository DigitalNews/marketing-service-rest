/** @format */

import { firestore } from './database';

const user = {
	/** Returns an array of users */
	getCalzado() {
		return firestore.collection('prueba');
	}
	/** Returns a user by its id */
};

export default user;
