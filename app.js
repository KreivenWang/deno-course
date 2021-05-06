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
