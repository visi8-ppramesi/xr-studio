export default function (onResolve = () => {}, onReject = () => {}) {
  let resolve, reject;
  const promise = new Promise((myResolve, myReject) => {
    resolve = (...args) => {
      if (typeof onResolve === "function") {
        onResolve(...args);
      }
      myResolve();
    };
    reject = (...args) => {
      if (typeof onReject === "function") {
        onReject(...args);
      }
      myReject();
    };
  });

  return Object.assign(promise, { resolve, reject });
}
