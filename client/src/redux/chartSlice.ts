import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInformation } from "./dataSlice";



export interface IDictionary{
    [key: string]:number
}
export interface IDataFormat{
    id: string;
    name:string;
    message:IDictionary;
}
interface IChartRoot{
    chart: IChart
}
interface IChart{
    value:IDataFormat[]
}
const init:IChart = {
    value: []
}
const b:any = null;
const alphabet: string = "abcdefghijklmnopqrstuvwxyz"
const dataX:Array<string>=[
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];
  const dataY:Array<number> =
  [
    4, 0, 2, 0, 9, 0, 1, 4,
    5, 0, 0, 4, 0, 4, 4, 0,
    0, 0, 5, 4, 1, 0, 1, 0,
    1, 0
  ]
  const calc=(sentence:string) =>{
    const alphabet:Array<string> = Array.from('abcdefghijklmnopqrstuvwxyz');
     let text:Array<string> = Array.from(sentence.replace(" ",""));
     let res: IDictionary ={}
     alphabet.map((item:string) =>res[item] = 0)
     text.map((item:string)=>{
         if(alphabet.includes(item)){
             res[item]+=1
         }
     })

    return res;
};
const mapMerge =(map:IDictionary,map1:IDictionary)=>{
    for(let t in map){
       map[t] += map1[t];
    }
    return map;
}
const chartSlice = createSlice({
    name: 'chart',
    initialState: init,
    reducers:{
        addChart: (state:IChart, action: PayloadAction<IInformation>) =>{
            
            let p:IInformation = action.payload;
            let c:IDataFormat = {id:p.id,name:p.user,message:calc(p.message)}
            
            let ind =state.value.findIndex(item=> item.id ===p.id)
            if(ind>-1){
                state.value[ind].message = mapMerge(state.value[ind].message,c.message)
            }
            else{
                
                state.value.push(c);
            }
            
        },
        setChart: (state:IChart, action: PayloadAction<IInformation[]>) =>{
            //state.value = action.payload
        },
        testChart: (state:IChart)=>{

        }
    },
});

export default chartSlice.reducer;
export const {addChart, setChart} = chartSlice.actions;
export const selectChart = (state:IChartRoot) => state.chart.value;