const Category = require("../database/models/categories");

function setCount(start, count, length) {
  start = cleanNumber(start) || 0;
  count = cleanNumber(count) || 20;

  if (count > 20) {
    count = 20;
  }

  if (count < 1) {
    count = 1;
  }

  if (start + count > length - 1) {
    count = length - 1 - start;
  }

  return parseInt(count);
}

function setStart(start, length) {
  if (start > length - 1) {
    start = length;
  }

  if (start < 0) {
    start = 0;
  }

  return parseInt(start);
}

function cleanNumber(param) {
  try {
    return parseInt(param);
  } catch {
    return undefined;
  }
}

function getCategories(param) {
  // TODO
}

module.exports = {
  setCount,
  setStart,
};
