var Mock = require('mockjs')

var data2 = Mock.mock("https://www.mendian.com",{
        "status": {
            "code": 0,
            "msg": "成功",
            "failureInfo": null,
            "notifyDTOs": null,
            "failed": false,
            "success": true
        },
        "data": {
            "page": {
                "currentPage": 1,
                "perPage": 20,
                "total": 20
            },
            "records|20": [
                {
                    "orgName": "@cname()",
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
            "sum": {
                "orgName": null,
                "totalAmt": "22",
                "receiptAmt": "3",
                "purchaseAmt": "366015.00",
                "totalPercent": null,
                "receiptPercent": null,
                "avgPercent": null,
                "avgPrePercent": null,
                "distributionCenterId": null,
                "distributionCenterName": null
            }
        }
    }
)
var data3 = Mock.mock("https://www.jigou.com",{
        "status": {
            "code": 0,
            "msg": "成功",
            "failureInfo": null,
            "notifyDTOs": null,
            "failed": false,
            "success": true
        },
        "data": {
            "page": {
                "currentPage": 1,
                "perPage": 20,
                "total": 100
            },
            "records|20": [
                {
                "orgId": 443593910,
                "orgName": "@name()",
                "totalAmt|0-1000.2": 1,
                "receiptAmt|0-1000.2": 1,
                "distributionPurchaseSellItems|1-4": [
                    {
                        "distributionCenterId": 443593819,
                        "distributionCenterName": "@name()",
                        "purchaseAmt|1000.2": 1,
                        "totalPercent|0.2": 1,
                        "receiptPercent|0.2": 1,
                    }
                ]
            }
            ],
            "sum": {
                "orgName": null,
                "totalAmt": "22",
                "receiptAmt": "3",
                "purchaseAmt": "366015.00",
                "totalPercent": null,
                "receiptPercent": null,
                "avgPercent": null,
                "avgPrePercent": null,
                "distributionCenterId": null,
                "distributionCenterName": null
            }
        }
    }
)
var data4 = Mock.mock("https://www.jiameng.com",{
        "status": {
            "code": 0,
            "msg": "成功",
            "failureInfo": null,
            "notifyDTOs": null,
            "failed": false,
            "success": true
        },
        "data": {
            "page": {
                "currentPage": 1,
                "perPage": 20,
                "total": 100
            },
            "records|20": [
                {
                    "orgName|4-10": 1,
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
            "sum": {
                "orgName": null,
                "totalAmt": "22",
                "receiptAmt": "3",
                "purchaseAmt": "366015.00",
                "totalPercent": null,
                "receiptPercent": null,
                "avgPercent": null,
                "avgPrePercent": null,
                "distributionCenterId": null,
                "distributionCenterName": null
            }
        }
    }
)
// 输出结果
console.log(JSON.stringify(data2))
// export const Ajax = (url)=>{
//    return new Promise((resolve,reject)=>{
//         var request = new XMLHttpRequest();
//         request.open("GET", url, true);
//         request.send();
//         request.onreadystatechange = function () {
//     if (request.readyState === 4 && request.status === 200) {
//         resolve(JSON.parse(request.responseText))
//     }
// }
//     })
// }
// Ajax.Get =(params)=> {
//     switch (params){
//     case 1 :
//         return  Ajax('https://www.mendian.com')
//     case 2 : 
//         return  Ajax('https://www.jigou.com')
//     case 3 : 
//         return  Ajax('https://www.jiameng.com')
//     }
// }