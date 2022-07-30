import './Glass.css'
import { useState,useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import { useMediaQuery } from 'react-responsive'
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Modal from "react-bootstrap/Modal";
import {Card,Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { saveRepeated,saveJso,handledataforlineChart,handledataforlineChartSevenDay,handlepieChart} from './redux/reducer'


function Glass() {
  const style = {
 
    // Adding media query..
    '@media (max-width: 8250px)': {
     flexDirection:"column"
    },
  };
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const isTabletOrMobile1 = useMediaQuery({ query: '(max-width: 600px)' })
  const [gender, setGender] = useState('')
  const [iscome,setIsCome]=useState(null);
  const [wor,setWor] = useState([])
  const[load,setLoad]=useState(false)
  const ppp = useSelector((state)=>state.slice_for_torob.Jso)
  const [jso,setJso] = useState(null)
  const upd = useSelector((state)=>state.slice_for_torob.update)
  const[help,setHelp]=useState([])
  const [show,setShow]=useState(false);
  const dispatch=useDispatch();
  const [text,setText]=useState('');
  const[query,setQuery]=useState('')
  const [tul,setlen]=useState(3)
  const [showload,setshowload]=useState(null)
  const handleclick = (txt)=>{
    setText(txt);
    setShow(true)
  }
  let y=0;
  const loadmorefunction = ()=>{
    let po=[]
    const meghdar = tul+3
    const jadid = Object. keys(ppp.data.Time). length>meghdar?meghdar:Object. keys(ppp.data.Time). length
    setshowload(Object. keys(ppp.data.Time). length>tul)
    setlen(meghdar)
    for(let i =0;i<jadid;i++){
        po.push(i)
    }
    setHelp(po);
  }
  useEffect(() => {
    if(ppp!==null){
    let po=[]
    const for_show = Object. keys(ppp.data.Time). length>tul?tul:Object. keys(ppp.data.Time). length
    setshowload(Object. keys(ppp.data.Time). length>tul)
    for(let i =0;i<for_show;i++){
        po.push(i)
    }
    setHelp(po);
  }
    setJso(ppp)
    console.log(ppp)
    console.log("khar")
  }, [jso,show,upd]);
  const handleSubmit = (e) => {
    e.preventDefault()
    setlen(3)
    setLoad(true)
    setshowload(null)

      console.log(query)
      fetch(`https://demo-server-twitter.herokuapp.com/prediction?num=${gender}&query=${query}`,{
          method:"GET",
          
          headers:{
              
              "Content-type" : "application/json;charset=UTF-8"
          }
      }).then(response=>response.json()).then(json=>{

        if(json.detail===undefined){
        console.log(json)
        const msg = "complete fetch"
        alert(msg)
        setIsCome(true)
        let sd = []
        Object.entries(json.count).forEach(([key, value]) => {
          sd.push({
            'text':key,
            'value':value
          })
        });
        console.log("this is ")
        let po=[]
        const for_show = Object. keys(json.data.Time). length>tul?tul:Object. keys(json.data.Time). length
        setshowload(Object. keys(json.data.Time). length>tul)
        for(let i =0;i<for_show;i++){
            po.push(i)
        }
        setHelp(po);
        console.log( Object. keys(json.data.Time). length)
        setWor(sd);
        dispatch(saveRepeated(sd));
        setJso(json);
        dispatch(saveJso(json));
        dispatch(handledataforlineChart())
        dispatch(handledataforlineChartSevenDay())
        dispatch(handlepieChart())
        reset()
        setLoad(false)
      }else{
        alert(`Error: ${json.detail}`)
        setLoad(false)
      }
    }
      )
      .catch((error) =>doubleHandle(error))
  }

  const reset = () => {
    setGender('')
    setQuery('')
    y=0;
    
  }
  const doubleHandle=(error)=>{
    setLoad(false)
    alert(`Error: ${error.message}`)
  }
  const resizeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    backgroundColor: "purple",
    
  };

  return (
    
    <>
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",columnGap:"20px",alignItems:"center",width:"100%"}}>
    <div className="glass">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h4 style={{color:" rgba(117, 163, 232, 0.5)"}}>Tweeter Data</h4>
        <div className="glass__form__group">
          <input
           
            id="gender"
            className="glass__form__input"
            placeholder="number of Tweets"
            required
            autoFocus
            min="1"
            max="1000"
            title="number must less than 1000"
            type="number"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="glass__form__group">
          <input
            id="query"
            className="glass__form__input"
            placeholder="#query"
            required
            autoFocus
            title="number must less than 200"
            value={query}
            type="string"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="glass__form__group">
          {
            load?
            <button type="submit" className="glass__form__btn" style={{width:"fit-content"}}>
            wait for response...
          </button>
            :
            <button type="submit" className="glass__form__btn">
            Submit
          </button>
          }
          
        </div>
      </form>
    </div>




{
  jso!==null||ppp!=null?
    <div className='glass' style={{marginTop:"40px",display:"flex",flexDirection:"column",marginBottom:"20px"}}>
    {
      jso!==null||ppp!=null?
      help.map((product) => (
        <>
        {
          isTabletOrMobile?
          <div className="holderTweets" style={{flexDirection:"column",rowGap:"20px"}}>
          <div className='imageName' >
             <div className='imageProf'>
  
              </div>
              <p style={{padding:"15px",color:"white"}}>{jso?jso.data.User[product]:ppp.data.User[product]}</p>
  
          </div>
          <button onClick={()=>handleclick(jso?jso.data.Tweet[product]:ppp.data.Tweet[product])} type="submit" style={{width:"100px",height:"40px",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              see tweet
          </button>
          <button type="submit" style={{width:"100px",height:"40px",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              {jso?jso.data.analysis[product]:ppp.data.analysis[product]}
          </button>
          
          <button type="submit" style={{width:"fit-content",height:"fit-content",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              {jso?jso.data.Time[product]:ppp.data.Time[product]}
          </button>
          
  
        </div>
          :
          <div className="holderTweets" style={style}>
          <div className='imageName' >
             <div className='imageProf'>
  
              </div>
              <p style={{padding:"15px",color:"white"}}>{jso?jso.data.User[product]:ppp.data.User[product]}</p>
  
          </div>
          <button onClick={()=>handleclick(jso?jso.data.Tweet[product]:ppp.data.Tweet[product])} type="submit" style={{width:"100px",height:"40px",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              see tweet
          </button>
          <button type="submit" style={{width:"100px",height:"40px",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              {jso?jso.data.analysis[product]:ppp.data.analysis[product]}
          </button>
          
          <button type="submit" style={{width:"fit-content",height:"fit-content",backgroundColor:"purple",color:"white",borderRadius:"20%"}}>
              {jso?jso.data.Time[product]:ppp.data.Time[product]}
          </button>
          
  
        </div>
          
        }
        </>
       
      
      ))
      :
      null
        
    
    }
    
      


    </div>
    :null
}
{
  showload?
  
  
    isTabletOrMobile1?
    
    <button onClick={()=>loadmorefunction()}style={{width:"90px"}} className='loadMore'>
      load more
    </button>
    :
    <button onClick={()=>loadmorefunction()} className='loadMore'>
      load more
    </button>
  
    
  :
  null
}

    
    
    </div>
    
    
  <Modal show={show} onHide={()=>setShow(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Tweet Text</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{heigth:"600px"}}>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
  </>
  
  )
}

export default Glass
