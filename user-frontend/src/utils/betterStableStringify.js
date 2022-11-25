const betterStableStringify = function (data, opts) {
  if (!opts) opts = {};
  if (typeof opts === "function") opts = { cmp: opts };
  var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;

  var cmp =
    opts.cmp &&
    (function (f) {
      return function (node) {
        return function (a, b) {
          var aobj = { key: a, value: node[a] };
          var bobj = { key: b, value: node[b] };
          return f(aobj, bobj);
        };
      };
    })(opts.cmp);

  var seen = [];
  const stringify = function (node) {
    if (node && node.toJSON && typeof node.toJSON === "function") {
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node == "number") return isFinite(node) ? "" + node : "null";
    if (typeof node !== "object") return JSON.stringify(node);

    var i, out;
    if (Array.isArray(node)) {
      node = node.sort(function (a, b) {
        if (a === undefined && b === undefined) return 0;
        if (a === undefined) return 1;
        if (b === undefined) return -1;

        let [comparatorA, comparatorB] = (function (pa, pb) {
          let compA = pa;
          let compB = pb;
          if (typeof pa === "number") {
            compA = pa.toString();
          }
          if (typeof pb === "number") {
            compB = pb.toString();
          }
          if (typeof pa === "object") {
            compA = stringify(pa);
          }
          if (typeof pb === "object") {
            compB = stringify(pb);
          }
          return [compA, compB];
        })(a, b);

        if (comparatorA < comparatorB) {
          return -1;
        }

        if (comparatorA > comparatorB) {
          return 1;
        }

        return 0;
      });
      out = "[";
      for (i = 0; i < node.length; i++) {
        if (i) out += ",";
        out += stringify(node[i]) || "null";
      }
      return out + "]";
    }

    if (node === null) return "null";

    if (seen.indexOf(node) !== -1) {
      if (cycles) return JSON.stringify("__cycle__");
      throw new TypeError("Converting circular structure to JSON");
    }

    var seenIndex = seen.push(node) - 1;
    var keys = Object.keys(node).sort(cmp && cmp(node));
    out = "";
    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = stringify(node[key]);

      if (!value) continue;
      if (out) out += ",";
      out += JSON.stringify(key) + ":" + value;
    }
    seen.splice(seenIndex, 1);
    return "{" + out + "}";
  };

  return stringify(data);
};

//browser
export default betterStableStringify;
//browser end
