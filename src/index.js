function sayHiTo(name) {
  return `Hi, ${name}`;
}

function ignoreWarning(name) {
  return name;
}

const message = sayHiTo('Bruno');

ignoreWarning(message);
