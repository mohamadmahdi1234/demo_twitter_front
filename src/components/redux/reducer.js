//this is our reducer or event handler of state
//we have two action which can make change in store
//first is for theme
//second is for fetching last three search history and save them continuously in local storage with id s -> 0, 1, 2
import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    repeated:[],
    Jso:null,
    update:false,
    holder1:null,
    data : null,
    data_seven_day : null,
    pieData:null
};
export const torob_Slice = createSlice({
    name: "slice_for_torob",
    initialState,
    reducers: {
        saveRepeated: (state,action) => {
            console.log("action is")
            console.log(action)
            state.repeated = action.payload
          },saveJso:(state,action)=>{
            state.Jso = action.payload
          },changeupdate : (state)=>{
            state.update = !state.update
            state.holder1=state.Jso
          },handledataforlineChart:(state)=>{
            if(state.Jso!==null){
              let po=[]
              let po1= []
            for(let i =0;i<Object.keys(state.Jso.control.Time).length;i++){
               po.push(state.Jso.control.Time[i])
               po1.push(state.Jso.control.polarity[i])
            }
            if(state.data===null){
              state.data={}
            }
            state.data['labels'] = po;
            state.data['datasets'] = [
              {
                label: "Tweets sentiment polarity online",
                data: po1,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }]

            }

          },handledataforlineChartSevenDay:(state)=>{
            if(state.Jso!==null){
              let po=[]
              let po1= []
            for(let i =0;i<Object.keys(state.Jso.seven.Time).length;i++){
               po.push(state.Jso.seven.Time[i])
               po1.push(state.Jso.seven.polarity[i])
            }
            if(state.data_seven_day===null){
              state.data_seven_day={}
            }
            state.data_seven_day['labels'] = po;
            state.data_seven_day['datasets'] = [
              {
                label: "Tweets sentiment polarity maximum seven days ago",
                data: po1,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }]

            }

          },handlepieChart:(state)=>{
            if(state.Jso!==null){
              
            if(state.pieData===null){
              state.pieData={}
            }
            state.pieData['labels'] = ['positive','negative','neutral'];
            state.pieData['datasets'] = [
              {
                label: "overal tweet sentiment polarity",
                data: [parseInt(state.Jso.positive_count),parseInt(state.Jso.negative_count),parseInt(state.Jso.neutral_count)],
                
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              }]

            }
          }
    },
  });
  
  export const {saveRepeated,saveJso,changeupdate,handledataforlineChart,handledataforlineChartSevenDay,handlepieChart} = torob_Slice.actions;
  
  export default torob_Slice.reducer;
  