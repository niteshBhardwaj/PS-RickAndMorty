const common = {}
common.FacetToObj = (data) => {
  let mutateObj = {}
  if(!data) return mutateObj;
  let newDataObj = data[0];
  let objKeys = Object.keys(newDataObj);
  objKeys.forEach((key) => {
    let data = newDataObj[key];
    if(data.length === 1) {      
      data = data[0];
      let keys = Object.keys(data);
      // console.log(data, data[key], key)
      if(keys.length === 1 && keys[0] === key) {
        data = data[key];
      }
    }
    mutateObj[key] = data;
  })
  
  return mutateObj;
}

common.dateStart = (date) => {
    date = new Date(date)
    date = date.getTime()? date : new Date();
    date.setMinutes(0)
    date.setHours(0)
    date.setSeconds(0)
    return date;
}

common.dateEnd = (date) => {
    date = new Date(date)  
    date = date.getTime()? date : new Date();
    date.setMinutes(59)
    date.setHours(23)
    date.setSeconds(59)
    return date;
}

common.random = (num) => {
    if(!num) return 0;
    return Math.floor(Math.random() * num);
} 

common.waterfall = (queue, finalCb, data, opts = {async: true}) => {
  
  let len = queue.length;
  let start = 0;
  let cb = (err, result) => {
    start++;
    if(err) {
      return finalCb(err);
    }
    return next(result, cb);
  }
  let next = (data, cb) => {
    if(start < len) {
      if(opts.async) {  
          return setTimeout(() => {
              return queue[start](data, cb);
          })
      } else {
        return queue[start](data, cb);
     }
    } else {
      return finalCb(null, data);
    }
  }
  return next(data, cb);
}

common.series = (arr, nextCb, finalCb, obts = {async: true}) => {
  let start = 0;
  let numberType = typeof arr === 'number';
  let len = !numberType? arr.length : arr;
  let dataList = [];
  let cb = (err, result) => {
      start++;
      if(err) {
        return finalCb(err);
      }
      dataList.push(result);
      if(start < len) {
        return nextCb(numberType? start+1: arr[start], cb);
      } else {
         return finalCb(null, dataList);
      }
  }
  return nextCb(numberType? start+1: arr[start], cb);
 }

common.arrayToObjByKey = (list=[], key, attachItem=false) => {
  let obj= {};
  
  if(!key) throw "in arrayToObjByKey function key not defined";

  list.reduce((obj, item) => {
    obj[item[key]] = attachItem? item: true
    return obj;
  }, obj);

  return obj;
}

module.exports = common;
