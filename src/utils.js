export const request = (url, method = "GET", payload) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open(method, url);
    req.onload = (event) => {
      let res = event.target.response;
      try {
        resolve(JSON.parse(res));
      } catch (e) {
        resolve(res);
      }
    };
    req.onerror = reject;
    if (method === "POST" || method === "DELETE") {
      if (payload) {
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        req.send(JSON.stringify(payload));
      }
    } else {
      req.send();
    }
  });
};
