import books from "./books.js";

/**
 *
 * @param items
 * @param propName
 * @returns {*}
 *
 * Example:
 * const books =
 * [{title: 'a1'...},
 *  {title: 'a1'...},
 *  {title: 'b2'...}]
 *
 * groupBy(books, 'title') =>
 * {'a1': [{...}, {...}]
 *  'b2': [{...}]}
 */
export function groupBy(items, propName) {
  return items.reduce(function (acc, item) {
    const propValue = item[propName]; // 'a1'

    const existingGroup = /** Array */ acc[propValue]; // 1. undefined, 2. [{...}]
    if (!existingGroup) {
      acc[propValue] = [];
    }

    acc[propValue].push(item);
    return acc;
  }, {});
}

//   export function groupBy2(items, propName) {
//   return items.reduce(function (acc, item) {
//     const propValue = item[propName]; // 'a1'
//
//     const existingGroup = /** Array */ acc[propValue]; // 1. undefined, 2. [{...}]
//     acc[propValue] = existingGroup || [];
//     acc[propValue].push(item);
//     return acc;
//   }, {});
// }



export function fn(items, propName){
  return items.map(function (item) {
    return item[propName];
  })
}


export function sum(arr) {
  return arr.reduce(function (acc, currentValue) {
    return acc + currentValue;
  },0)
}
