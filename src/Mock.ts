import Mock, { Random } from "mockjs";

//mock使用拓展生成树状结构数据
/** 假装需要使用到函数的返回值
 * 
 * @param params 无限制参数，第一个参数作为父节点的Id给到子节点的parentId，后面每个参数为每层节点的子节点个数
 * @returns [treeobject, clearId] 返回值为处理好了的字符串，在Mock格式中使用和清除id的方法，请求完数据后调用让id清空
 */
const creatTreeNode = (...params) => {
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
 const [mockTree, clearId] = creatTreeNode(0,2,2,1)

var data2 = Mock.mock("https://www.mendian.com", {
  status: {
    code: 0,
    msg: "成功",
    failureInfo: null,
    notifyDTOs: null,
    failed: false,
    success: true,
  },
  data: {
    //mock对象，给定的对象中选择一定数量的属性
    "page|2": {
      currentPage: 1,
      perPage: 20,
      total: 20,
    },
    //mock数组
    "records|20": [
      {
        orgName: "@cname()",
        "totalAmt|0-1000.2": 1,
        "receiptAmt|0-1000.2": 1,
        "purchaseAmt|1000.2": 1,
        "totalPercent|0.2": 1,
        "receiptPercent|0.2": 1,
        "avgPercent|0.2": 1,
        "avgPrePercent|0.2": 1,
        "distributionCenterId|0.2": 1,
        "distributionCenterName|0.2": 1,
      },
    ],
    // "Array2|3":[""],
    "top": {
        'value': 0,
        "id": 0,
        "parentsId": null,
        "children|2":[mockTree]
    },
  },
});
// 输出结果
// console.log(JSON.stringify(data2))
export const Ajax = (url) => {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText));
        clearId()
      }
    };
  });
};
Ajax.Get = (params) => {
  switch (params) {
    case 1:
      return Ajax("https://www.mendian.com");
    case 2:
      return Ajax("https://www.jigou.com");
    case 3:
      return Ajax("https://www.jiameng.com");
  }
};
