/*
*
*
test interface
*
*
*/
interface LabelledValue {
    size: number;
    label: string;
    [propName : string] : any;
}

let printLabel = (labelledObj: LabelledValue) => {
console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object",coloe:2};
printLabel(myObj);
let ji:string;
ji = '3';
console.log(ji);