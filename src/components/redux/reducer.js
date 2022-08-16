//this is our reducer or event handler of state
//we have two action which can make change in store
//first is for theme
//second is for fetching last three search history and save them continuously in local storage with id s -> 0, 1, 2
import { integerPropType } from "@mui/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    repeated:[],
    Jso:null,
    update:false,
    holder1:null,
    data : null,
    data_seven_day : null,
    pieData:null,
    forTable:null,
    forTablev2:null,
    dataVertical:null,
    for_twitter_logo:""
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
            console.log("saved")
            console.log(state.Jso)
          },update_logo:(state,action)=>{
            if(action.payload===1){
              state.for_twitter_logo=""
            }else{
              state.for_twitter_logo='https://demo-server-twitter.herokuapp.com/image'
            }
          },changeupdate : (state)=>{
            state.update = !state.update
            state.holder1=state.Jso
          },handledataforlineChart:(state)=>{
            
            if(state.Jso!==null){
              console.log("line chart all getting data")
            console.log(state.Jso)
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
                backgroundColor: "rgba(75,192,192,0.8)",
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
                label: "",
                data: po1,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }]

            }

          },handledataforverticalChart:(state)=>{
            if(state.Jso!==null){
              let po=[]
              let po1= []
              let positive=[]
              let neutral=[]
            for(let i =Math.max(0, Object.keys(state.Jso.mile_negative.Time).length-6);i<Object.keys(state.Jso.mile_negative.Time).length;i++){
               po.push(state.Jso.mile_negative.Time[i])
               po1.push(state.Jso.mile_negative.count[i])
               positive.push(state.Jso.mile_positive.count[i])
               neutral.push(state.Jso.mile_neutral.count[i])
            }
            if(state.dataVertical===null){
              state.dataVertical={}
            }
            state.dataVertical['labels'] = po;
            state.dataVertical['datasets'] = [
              {
                label: "Negative",
                data: po1,
                fill: true,
                backgroundColor: "#ff0000",
                
              },
              {
                label: "Positive",
                data: positive,
                fill: true,
                backgroundColor: "#00FF00",
                
              },
              {
                label: "Neutral",
                data: neutral,
                fill: true,
                backgroundColor: "#FFFF00",
                
              }
            ]

            }

          },handleDataForTable:(state)=>{
            if(state.Jso!=null){
              let forApply=[]
              let forApplyv2=[]
              for(let i =0;i<Object.keys(state.Jso.data.Time).length;i++){
                let item={
                  "#":i,
                  Profile:<img className='twtimage1' src={`${state.Jso.data.img_url[i]}`}></img>,
                  Username:state.Jso.data.User[i],
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={state.Jso.data.tweet_url[i]} target="_blank" rel="noopener noreferrer">{state.Jso.data.Tweet[i]}</a>,
                  Date:<div style={{minWidth:"144px"}}>{state.Jso.data.Time[i].split("T")[0]+" "+state.Jso.data.Time[i].split("T")[1].split("+")[0]}</div>,
                  Polarity:state.Jso.data.polarity[i],
                  sentiment:state.Jso.data.analysis[i],
                }
                forApply.push(item)
                let itemv2={
                  "#":i,
                  Profile:<img className='twtimage1' src={`${state.Jso.data.img_url[i]}`}></img>,
                  Username:state.Jso.data.User[i],
                  Tweet:state.Jso.data.Tweet[i],
                  Tweet_Url:state.Jso.data.tweet_url[i],
                  Date:state.Jso.data.Time[i],
                  Polarity:state.Jso.data.polarity[i],
                  sentiment:state.Jso.data.analysis[i],
                }
                forApplyv2.push(itemv2)

              }
              let main={
                data:forApply,
                totalPages:Math.ceil(Object.keys(state.Jso.data.Time).length/10)+1
              }
              let mainv2={
                data:forApplyv2,
                totalPages:Math.ceil(Object.keys(state.Jso.data.Time).length/10)+1
              }
              console.log("main is here boy :")
              console.log(main)
              console.log("end")
              state.forTable = main
              state.forTablev2 = mainv2
            }
          },handlesortBaseDateSoudi:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return Date.parse(c.Date)-Date.parse(d.Date)})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          },handlesortBaseDateNozuli:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return Date.parse(d.Date)-Date.parse(c.Date)})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          },handlesortBasePolarityNozuli:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return d.Polarity-c.Polarity})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          },handlesortBasePolaritySoudi:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return c.Polarity-d.Polarity})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          },handlesortBaseTweetSoudi:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return c.Tweet.localeCompare(d.Tweet)})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          },
          handlesortBaseTweetNozuli:(state)=>{
            if(state.forTablev2!==null){
              let data = state.forTablev2.data
              data.sort((c,d)=>{return d.Tweet.localeCompare(c.Tweet)})
              state.forTablev2.data=data
              let jadid=[]
              for (let name of data) {
                let item={
                  "#":name['#'],
                  Profile:name.Profile,
                  Username:name.Username,
                  Tweet:<a style={{color:"white",textDecoration: "none"}}  href={name.Tweet_Url} target="_blank" rel="noopener noreferrer">{name.Tweet}</a>,
                  Date:<div style={{minWidth:"144px"}}>{name.Date.split("T")[0]+" "+name.Date.split("T")[1].split("+")[0]}</div>,
                  Polarity:name.Polarity,
                  sentiment:name.sentiment,
                }
              jadid.push(item)
              }
              state.forTable.data=jadid
            }
          }
          ,handlepieChart:(state)=>{
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
                  'rgba(0,255,0)',
                  'rgba(255, 0, 0)',
                  'rgba(255,255,0)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  
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
  
  export const {saveRepeated,saveJso,changeupdate,handledataforlineChart,update_logo,handledataforlineChartSevenDay,handledataforverticalChart,handlesortBasePolaritySoudi,handlesortBasePolarityNozuli,handlepieChart,handlesortBaseDateNozuli,handleDataForTable,handlesortBaseDateSoudi,handlesortBaseTweetSoudi,handlesortBaseTweetNozuli} = torob_Slice.actions;
  
  export default torob_Slice.reducer;
  