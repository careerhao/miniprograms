/**
 * 将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力。注意输入数组是无序的。
 * 
 * Took 8 min
 * 
 * @param {Array} data data input
 * @param {Number} root traversal start position, default: 0
 * @param {Boolean} add if child node doesn't match any parentId, then change parentId to 0 (put to root), default: false
 *
 * @example
 * tree(data, 0, true) || tree(data)
 *
 * @returns {Array}
 */

const case1 = [
    {id:1, name: 'i1'},
    {id:2, name:'i2', parentId: 1},
    {id:4, name:'i4', parentId: 3},
    {id:3, name:'i3', parentId: 2},
    {id:8, name:'i8', parentId: 7},
];

const case2 =[
    {id:1, name: 'i1'},
    {id:2, name:'i2', parentId: 1},
    {id:6, name:'i6'},
    {id:4, name:'i4', parentId: 3},
    {id:3, name:'i3', parentId: 2},
    {id:8, name:'i8', parentId: 7},
];

const tree = (data, root = 0, add = false) => {
    let result = [];

    if(data && data.length > 0) {
        const ids = data.map(item => item.id);

        data.map(item => {
            // If there is no parent node id then just put node to the root
            if(item.parentId === undefined || item.parentId === null) {
                item.parentId = 0;
            }
            // If child node parentId cannot match any parent's id, then based on the switch do the operations
            if(!ids.includes(item.parentId) && add) {
                item.parentId = 0;
            }

            if(item.parentId === root) {
                item.children = tree(data, item.id);
                result.push(item);
            }
        })
    }
    return result;
}

console.log(tree(case1));
