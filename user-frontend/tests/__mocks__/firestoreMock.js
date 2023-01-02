// import mockData from './dataMock.js'
/* eslint-disable no-unused-vars */
import store from "./storeMock.js";
import isEqual from "lodash/isEqual";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import mitt from "mitt";
console.log("firestore mock called");
const emitter = mitt();

let eventStack = {};

const getEvent = function (paths) {
  let event = eventStack[paths[0]];
  if (event) {
    for (let i = 1; i < paths.length; i++) {
      if (event[paths[i]]) {
        event = event[paths[i]];
      } else {
        return null;
      }
    }
    return event;
  } else {
    return null;
  }
};

const setEvent = function (paths, func) {
  if (!eventStack[paths[0]]) {
    eventStack[paths[0]] = {};
  }
  let event = eventStack[paths[0]];
  for (let i = 1; i < paths.length - 1; i++) {
    if (!event[paths[i]]) {
      event[paths[i]] = {};
    }
    event = event[paths[i]];
  }
  if (isEmpty(event[paths[paths.length - 1]])) {
    event[paths[paths.length - 1]] = [func];
  } else {
    event[paths[paths.length - 1]].push(func);
  }
};

const deleteEvent = function (paths) {
  let data = eventStack[paths[0]];
  for (let i = 1; i < paths.length - 1; i++) {
    if (data[paths[i]]) {
      data = data[paths[i]];
    } else {
      return;
    }
  }
  delete data[paths[paths.length - 1]];
};

emitter.on("*", async (...args) => {
  const type = args.shift();
  const myArg = args[0];
  const paths = myArg.shift();
  const event = getEvent(paths);
  if (!isNil(event) && event.length > 0) {
    const docObject = await myArg[0];
    event.forEach((eventFunc) => {
      if (typeof eventFunc === "function") {
        eventFunc(docObject);
      }
    });
  }
});

class FieldOperator {
  constructor(value) {
    this.value = value;
  }
  operateField() {}
}
class Incrementor extends FieldOperator {
  constructor(value) {
    super(value);
  }
  operateField(paths, field) {
    const currentValue = store.getState([...paths, field]);
    if (currentValue) {
      return this.value + currentValue;
    } else {
      return this.value;
    }
  }
}
class ArrayUnioner extends FieldOperator {
  constructor(value) {
    super(value);
  }
  operateField(paths, field) {
    const currentValue = store.getState([...paths, field]);
    if (currentValue) {
      return [...new Set([...currentValue, this.value])];
    } else {
      return this.value;
    }
  }
}
class ArrayRemover extends FieldOperator {
  constructor(value) {
    super(value);
  }
  operateField(paths, field) {
    const currentValue = store.getState([...paths, field]);
    if (currentValue) {
      return currentValue.filter((v) => !isEqual(v, this.value));
    } else {
      return this.value;
    }
  }
}

class QueryOperator {
  runQuery() {
    return true;
  }
}

class WhereOperator extends QueryOperator {
  constructor(field, operator, value) {
    super();
    this.operator = operator;
    this.value = value;
    this.field = field;
  }

  runQuery(data) {
    return true;
  }
}

class Query {
  constructor(ref, queries) {
    this.ref = ref;
    this.queries = queries;
  }
}

const arrayToPathedProxy = (arr) =>
  new Proxy(arr, {
    get(target, name) {
      if (name === "path") {
        return target.join("/");
      }
      return target[name];
    },
  });

export const getDoc = jest.fn((ref) => {
  const data = store.getState(ref);
  const refObj = arrayToPathedProxy([...ref]);
  if (data) {
    return Promise.resolve({
      exists() {
        return true;
      },
      id: ref[ref.length - 1],
      data() {
        return data;
      },
      get(field) {
        return data[field];
      },
      ref: refObj,
    });
  } else {
    return Promise.resolve({
      exists() {
        return false;
      },
      id: null,
    });
  }
});

export const arrayRemove = jest.fn((v) => new ArrayRemover(v));
export const arrayUnion = jest.fn((v) => new ArrayUnioner(v));
export const increment = jest.fn((v) => new Incrementor(v));

export const getFirestore = jest.fn();
export const where = jest.fn((field, operator, value) => {
  return new WhereOperator(field, operator, value);
});
export const limit = jest.fn();
export const orderBy = jest.fn();
export const startAfter = jest.fn();
export const doc = jest.fn((...args) => {
  args.shift();
  args._key = [...args];
  return args;
});
export const FieldPath = jest.fn();
export const endBefore = jest.fn();
export const collection = jest.fn((...args) => {
  args.shift();
  return args;
});
export const query = jest.fn((...args) => {
  const ref = args.shift();
  return new Query([...ref], args);
});
export const updateDoc = jest.fn((paths, value) => {
  Object.keys(value).forEach((key) => {
    if (value[key] instanceof FieldOperator) {
      value[key] = value[key].operateField(paths, key);
    }
  });
  store.setState(paths, value, true);
  emitter.emit("updateDoc", [paths, getDoc(paths)]);
});
export const getDocs = jest.fn((ref) => {
  let queries = null;
  if (ref instanceof Query) {
    queries = ref.queries;
    ref = ref.ref;
  }
  const data = store.getState(ref);
  if (data) {
    const docs = Object.keys(data).reduce((acc, key) => {
      const refObj = arrayToPathedProxy([...ref, key]);
      // if(!isNil(queries)){
      //     const queryIncluded = queries.map(v => v.runQuery(data[key])).reduce((acc, v) => acc && v, [])
      //     if(queryIncluded){
      //         acc.push({
      //             data(){
      //                 return data[key]
      //             },
      //             id: key,
      //             ref: [...ref, key]
      //         })
      //     }
      // }else{
      acc.push({
        data() {
          return data[key];
        },
        get(field) {
          return data[key][field];
        },
        id: key,
        ref: refObj,
      });
      // }
      return acc;
    }, []);
    return Promise.resolve({
      exists() {
        return true;
      },
      empty: false,
      docs,
    });
  } else {
    return Promise.resolve({
      exists() {
        return false;
      },
      empty: true,
    });
  }
});

export const onSnapshot = jest.fn((ref, func) => {
  let queries = null;
  if (ref instanceof Query) {
    queries = ref.queries;
    ref = ref.ref;
  }
  if (ref.length % 2 === 1) {
    ref.push("global");
  }
  setEvent(ref, func);
  return function () {
    deleteEvent(ref);
  };
});

export const addDoc = jest.fn((refs, data) => {
  const refsClone = [...refs];
  refsClone.push("global");
  const randId = (Math.random() + 1).toString(36).substring(7);
  refs.push(randId);
  store.setState(refs, data);
  emitter.emit("addDoc", [refsClone, getDoc(refs)]);
  return refs;
});
export const deleteDoc = jest.fn((paths) => {
  store.deleteState(paths);
});
export const setDoc = jest.fn((paths, value) => {
  Object.keys(value).forEach((key) => {
    if (value[key] instanceof FieldOperator) {
      value[key] = value[key].operateField(paths, key);
    }
  });
  store.setState(paths, value, false);
  emitter.emit("setDoc", [paths, getDoc(paths)]);
});

export const runTransaction = jest.fn((db, fn) => {
  const trans = {
    update: (...args) => {
      updateDoc(...args);
    },
    set: (...args) => {
      setDoc(...args);
    },
  };
  store.lock();
  const runFunc = () => {
    store.unlock();
    fn(trans);
  };
  return Promise.resolve(runFunc());
});
class BatchWriter {
  constructor() {
    this.updates = [];
    store.lock();
  }

  update(paths, value) {
    this.updates.push({ func: updateDoc, paths, value });
  }

  commit() {
    store.unlock();
    const results = this.updates.map((caller) => {
      return caller.func(caller.paths, caller.value);
    });
    return Promise.resolve(results);
  }
}

export const writeBatch = jest.fn(() => {
  return new BatchWriter();
});

export class DocumentSnapshot {
  constructor(db, stuff, ref) {
    this.db = db;
    this.ref = ref;
  }
}

export const collectionGroup = jest.fn((db, collection) => {
  return store.getIndex(collection);
});
