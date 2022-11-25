const lockMap = new Map();

export default function (namespace = null) {
  if (!lockMap.has(namespace)) {
    lockMap.set(namespace, new WeakMap());
  }
  const innerLock = lockMap.get(namespace);
  return (func) => {
    if (!innerLock.has(func)) {
      innerLock.set(func, true);
    }

    if (innerLock.get(func)) {
      innerLock.set(func, false);
      func();
      // innerLock.set(func, true);
    } else {
      innerLock.set(func, true);
    }
  };
}
