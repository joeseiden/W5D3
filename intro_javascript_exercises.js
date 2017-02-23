// Remove duplicates

Array.prototype.my_uniq = function() {
  let newArray = [];
  for(let i = 0; i < this.length; i++) {
    if (newArray.includes(this[i]) === false)
      newArray.push(this[i]);
  }
  return newArray;
};

let a = [1,2,3,3,4];

console.log(a.my_uniq());

// Two sum

Array.prototype.two_sum = function() {
  let results = [];
  for(let i = 0; i < this.length - 1; i++) {
    for(let j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0)
        results.push([i, j]);
    }
  }
  return results;
};

console.log([-1, 0, 2, -2, 1].two_sum());

// Transpose

Array.prototype.my_transpose = function() {
  let results = [[]];
  for(let i = 0; i < this[0].length; i++) {
    results[i] = [];
    for(let j = 0; j < this.length; j++){
      results[i][j] = this[j][i];
    }
  }

  return results;
};

let rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]];

console.log(rows.my_transpose());

// Each

Array.prototype.myEach = function(callback) {
  for(let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

// Map

Array.prototype.myMap = function(callback) {
  let results = [];
  this.myEach((el) => results.push(callback(el)));
  return results;
};

function square(num) {
  return num * num;
}

console.log([1,2,3,4].myMap(square));

// Inject

Array.prototype.myInject = function(callback, accumulator = false) {
  let i = 0;
  let acc = accumulator;

  if(acc === false) {
    acc = this[0];
    i++;
  }

  this.slice(i,this.length).myEach((el) => {acc = callback(acc, el);});

  return acc;
};

let nums = [1,2,3,4,5];
console.log(nums.myInject((acc, e) => acc + e));

// Bubblesort

Array.prototype.bubbleSort = function() {
  let j = this.length -1;
  let unsorted = true;

  while(unsorted && j > 0) {
    unsorted = false;
    for(let i = 0; i < j; i++) {
      if(this[i] > this[i+1]) {
        let tmp = this[i];
        this[i] = this[i+1];
        this[i+1] = tmp;
        unsorted = true;
      }
    }
    j -= 1;
  }

  return this;
};

console.log([5,2,7,8,43,'7',1].bubbleSort());

// substrings

String.prototype.substrings = function() {
  let result = [];

  for(let i = 0; i < this.length; i++) {
    for(let j = i; j < this.length; j++) {
      result.push(this.slice(i, j + 1));
    }
  }
  return result;
};

console.log("cat".substrings());

// ~~~RECURSION~~~ //

// range
function range(start, end) {
  if(end < start){
    return [];
  }
  let result = range(start + 1, end);
  result.unshift(start);
  return result;
}

console.log(range(1, 10));

// sum

function sum(array) {
  if(array.length === 0){
    return 0;
  }

  let result = sum(array.slice(1)) + array[0];
  return result;
}

console.log(sum([1,2,3,4,5]));

// exponentiation
let half = (num) => Math.floor(num / 2);
let sq = (num) => num * num;


function exp(base, power){
  if(power === 0){
    return 1;
  }

  let newPower = sq(exp(base, half(power)));
  if(power % 2 === 0){
    return newPower;
  } else {
    return base * newPower;
  }
}

console.log(exp(2,5));

// fibonacci

function fibonacci(n) {
  if(n < 0) return null;
  if(n === 2) return [1,1];
  if(n === 1) return [1];

  let fibArr = fibonacci(n-1);
  fibArr.push(fibArr[n-2] + fibArr[n-3]);
  return fibArr;
}
console.log(fibonacci(20));

// binary search

function bsearch(array, target) {
   if(array.length === 0) return null;

   let middleIndex = Math.floor(array.length / 2);
   let middle = array[middleIndex];

   if(middle > target) {
     return bsearch(array.slice(0, middleIndex), target);
   } else if (middle === target) {
     return middleIndex;
   } else {
     let searchResult = bsearch(array.slice(middleIndex + 1), target);
     return (searchResult !== null ? middleIndex + searchResult + 1 : null);
   }
}

console.log(bsearch([1,2,3,4,5,6,7,8,9,10], 10));

// make change

function makeChange(num, coinsArr){
  if(num <= 0) return [];

  let bestArray = null;
  for(let i = 0; i < coinsArr.length; i++) {
    let coin = coinsArr[i];
    if(coin > num) continue;
    let testArray = [coin].concat(makeChange(num - coin, coinsArr.slice(i)));
    if(bestArray === null || testArray.length < bestArray.length) {
      bestArray = testArray;
    }
  }
  return bestArray;
}

console.log(makeChange(14,[10,7,1]));

// merge sort

function mergeSort(array) {
  if(array.length <= 1) return array;

  let mid = Math.floor(array.length / 2);

  return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
}

function merge(leftArray, rightArray) {
  let mergedArray = [];
  while(leftArray.length > 0 && rightArray.length > 0) {
    if(leftArray[0] > rightArray[0]) {
      mergedArray.push(rightArray.shift());
    } else {
      mergedArray.push(leftArray.shift());
    }
  }
  mergedArray = mergedArray.concat(leftArray);
  mergedArray = mergedArray.concat(rightArray);
  return mergedArray;
}

console.log(mergeSort([6,3,7,9,3,2,5,8,3,4,8,2,45,78,1,4,7,45,2]));

// subsets

function subsets(array) {
  if(array.length === 0) return [[]];

  let smallSubsets = subsets(array.slice(0,-1));
  return smallSubsets.concat(
    smallSubsets.map((sub) => sub.concat(array[array.length - 1])));
}

Array.prototype.proto_subsets = function() {
  if(this.length === 0) return [[]];

  let smallSubsets = subsets(this.slice(0,-1));
  return smallSubsets.concat(
    smallSubsets.map((sub) => sub.concat(this[this.length - 1])));
};

console.log(subsets([1,2,3]));
console.log([1,2,3].proto_subsets());

// cat class

function Cat(name, owner){
    this.name = name;
    this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return `${this.owner} loves ${this.name}!`;
};

Cat.prototype.cuteStatement = function() {
  return `Everyone loves ${this.name}!`;
};

let garfield = new Cat("Garfield", "Jon");
let akash = new Cat("Akash", "Joe");
let kelly = new Cat("Kelly", "Presidio pod");

console.log(garfield.cuteStatement());
console.log(akash.cuteStatement());
console.log(kelly.cuteStatement());

Cat.prototype.meow = function() {
  return `${this.name} says woof`;
};

kelly.meow = function () {
  return `${this.name} says "Why am I always a cat in people's programs?"`;
};

console.log(garfield.meow());
console.log(akash.meow());
console.log(kelly.meow());
