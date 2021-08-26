/**
 * 根据输入的数组中每项的 before/after/first/last 规则，输出一个新排好序的数组或者链表。要求，多解的情况可以只求一解，如果无解要求程序能检测出来。注意输入数组是无序的。
 * 
 * Took 27 min
 */

const data = [
    {id: 1},
    {id: 2, before: 1},
    {id: 3, after: 1},
    {id: 5, first: true},
    {id: 6, last: true},
    {id: 7, after: 8},
    {id: 8},
    {id: 9},
];

const data1 = [
    {id: 1},
    {id: 2, before: 10},
    {id: 3, after: 20},
    {id: 5},
    {id: 6},
    {id: 7, after: 30},
    {id: 8},
    {id: 9},
];

/**
 * @param {Object} data Original data
 * @param {Object} currentItem current item
 *
 * @returns {Object}
 */
const beforeItem = (data, currentItem) => {
    return data.find(item => item.id === currentItem.before)
}

const afterItem = (data, currentItem) => {
    return data.find(item => item.id === currentItem.after)
}

/**
 * @param {Object} data Original data
 * @param {Object} currentItem current item
 *
 * @returns {Number}
 * 
 * Get current item position in original data
 */
const getPos = (data, currentItem) => {
    return data.indexOf(currentItem);
}


/**
 * @param {Object} data Original data
 *
 * @returns {Array} Return sorted array, just sort others if there is no first/last
 */
const sort = data => {
    let result = [];
    const first = data.find(item => item.first);
    const last = data.find(item => item.last);
    // Pull first and last out and traversal others
    const clean = data.filter(item => item.before || item.after);

    clean.forEach(item => {
        // Check item exists or not based on 'before'
        if(item.before && beforeItem(data, item)) {
            // Check beforeItem exists in result or not
            if(getPos(result, beforeItem(data, item)) === -1) {
                // If not push beforeItem then calculate current position, put current item into result and position should be beforeItem - 1 
                result.push(beforeItem(data, item));
                result.splice((getPos(result, beforeItem(data, item)) - 1), 0, item);
            } else {
                // If result contains beforeItem, then just push currentItem directly
                result.splice((getPos(result, beforeItem(data, item)) - 1), 0, item);
            }
        }
        // // Check item exists or not based on 'after'
        if(item.after && afterItem(data, item)) {
            // Check afterItem exists in result or not
            if(getPos(result, afterItem(data, item)) === -1) {
                // If not push afterItem then calculate current position, put current item into result and position should be beforeItem + 1
                result.push(afterItem(data, item));
                result.splice(getPos(result, afterItem(data,item)) + 1, 0, item);
            } else {
                // If result contains afterItem, then just push currentItem directly
                result.splice(getPos(result, afterItem(data,item)) + 1, 0, item);
            }
        }
    })
    // Last step, put the first/last into result
    if(first) result.splice(0,0,first);
    if(last) result.splice(result.length, 0,last);
    // If there is no result, return [] and warning.
    if(result.length === 0 || undefined) {
        console.warn("无解");

        return [];
    }

    return result;
}

console.log(sort(data1));