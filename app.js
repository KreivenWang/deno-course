const myOwnIterable = {
  values: [1, 5, 10],
  index: 0,
  [Symbol.iterator]() {
    return this[Symbol.getIterator](this);
  },
  [Symbol.getIterator](self) {
    return {
      next() {
        if (self.index === self.values.length)
          return { value: null, done: true };

        const result = {
          value: self.values[self.index],
          done: false,
        };
        self.index++;
        return result;
      },
    };
  },
};

for (const iterator of myOwnIterable) {
  console.log(iterator);
}

const myOwnAsyncIterable = {
  urls: [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
  ],
  index: 0,
  [Symbol.asyncIterator]() {
    return this[Symbol.getAsyncIterator](this);
  },
  [Symbol.getAsyncIterator](self) {
    return {
      async next() {
        if (self.index === self.urls.length) return { value: null, done: true };

        const response = await fetch(self.urls[self.index]);
        const exractedData = await response.json();
        const result = {
          value: exractedData,
          done: false,
        };
        self.index++;
        return result;
      },
    };
  },
};

async function asyncLoop() {
  for await (const iterator of myOwnAsyncIterable) {
    console.log(iterator);
  }
}

asyncLoop();
