'use strict';

var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';



//给予一个className ，如果有对应的正则直接读，没有则cache一个并且返回
//这个函数生成的是一个 “正则表达式！！！！”
function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}


function addClass (el, className) {
  var current = el.className;

  //如果为空则直接加，要不然久+=
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}



function rmClass (el, className) {
  //这个类替换方法写的巧啊，加空格然后去空格
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};