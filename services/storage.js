
/* ==========================================
   English Buddy Pro v2.1
   Storage Service
========================================== */

class StorageService {

    constructor() {

        console.log("Storage Service Initialized");

    }

    save(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    load(key, defaultValue = null) {

        try {

            const data = localStorage.getItem(key);

            if (data === null) {

                return defaultValue;

            }

            return JSON.parse(data);

        }

        catch (error) {

            console.error(error);

            return defaultValue;

        }

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clear() {

        localStorage.clear();

    }

    exists(key) {

        return localStorage.getItem(key) !== null;

    }

    increment(key, amount = 1) {

        let value = this.load(key, 0);

        value += amount;

        this.save(key, value);

        return value;

    }

    append(key, item) {

        let list = this.load(key, []);

        list.push(item);

        this.save(key, list);

        return list;

    }

}

const Storage = new StorageService();
