let activeEffect;
const subs = new Map();
const recursionLock = new WeakMap();
function getSubscribersForProperty(target, key) {
  if (!subs.has(target)) {
    const locMap = new Map();
    locMap.set(key, new Set());
    subs.set(target, locMap);
  } else {
    if (!subs.get(target).has(key)) {
      subs.get(target).set(key, new Set());
    }
  }
  return subs.get(target).get(key);
}

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key);
    effects.add(activeEffect);
    recursionLock.set(activeEffect, true);
  }
}

function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key);
  effects.forEach((effect) => {
    const lock = recursionLock.get(effect);
    if (lock) {
      recursionLock.set(effect, false);
      const eff = effect();
      recursionLock.set(effect, true);
      return eff;
    } else {
      recursionLock.set(effect, true);
    }
  });
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
    },
  });
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(refObject, "value");
    },
  };
  return refObject;
}

function watchEffect(update) {
  const effect = () => {
    activeEffect = effect;
    update();
    activeEffect = null;
  };
  effect();
}

function watch(source, cb) {
  activeEffect = cb;
  track(source, "value");
  activeEffect = null;
}

export { ref, reactive, watchEffect, watch };
