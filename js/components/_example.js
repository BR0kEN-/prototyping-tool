function Example(name) {
  this.name = name;
}

Example.prototype = {
  constructor: Example
};
