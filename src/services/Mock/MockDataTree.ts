//mock使用拓展生成树状结构数据

import Mock, { Random } from "mockjs";

/** 假装需要使用到函数的返回值
 * 
 * @param params 无限制参数，第一个参数作为父节点的Id给到子节点的parentId，后面每个参数为每层节点的子节点个数
 * @returns [treeobject, clearId] 返回值为处理好了的字符串，在Mock格式中使用和清除id的方法，请求完数据后调用让id清空
 */
export const creatTreeNode = (...params) => {
    let id = 0;
    Random.extend({
      treenode: function (...args) {
        id += 1;
        const _id = args?.shift();
        const data = args?.shift();
        args?.unshift(id);
        const _data = data ? "children|" + `${data}` : "children";
        const value = data ? [`@TREENODE(${args})`] : null;
        var treenodes = Mock.mock({
          ["value"]: "@natural(1,10)",
          Id: id,
          parentId: _id,
          [_data]: value,
        });
        return this.pick(treenodes);
      },
    });
    const clearId = () => id = 0
    return [`@TREENODE(${params})`, clearId] as const
  };

  