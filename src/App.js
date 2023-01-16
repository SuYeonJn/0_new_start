import { useState } from "react";

function Header(props){
  return(
    <h1 onClick ={(e)=>{
      e.preventDefault();
      props.onChangemode();
    }}>Mobility</h1>
  )
}

function List(props){
  const boxes =[]
  for(let i =0; i<props.topics.length; i++){
    const t = props.topics[i]
    boxes.push(
    <p onClick = {(event) => {
      event.preventDefault();
      props.onChangemode(t.id);
      // id = t.id 한 다음, event.target.id를 parameter로 보내도 됨
    }}><a href={'/'+t.id}>{t.id} {t.start} - {t.arrival}</a></p>
    )
  }
  return(
    <div>
        {boxes}
    </div>
  )
}

function Greeting(props){
  return( 
  <div>{props.article}</div>
  )
}
function Container(props){
  return(
    <div>
      <div>{props.start} --- {props.arrival}</div>
      <div>{props.gender}</div>
    </div>
  )
}


function Create(props){
  return(
    <div onClick={(e)=>{
      e.preventDefault();
      props.onChangemode();
    }}>{props.title}</div>
  )
}

function CreateForm(props){
  return(
    <article>
      <h2>방 만들기</h2>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const start= e.target.start_input.value;
        const arrival= e.target.arrival_input.value;
        const gender = e.target.gender_input.value;
        props.onCreate(start, arrival, gender);
      }}>
        <input type="text" name="start_input" placeholder="출발지"></input>
        <input type="text" name="arrival_input" placeholder="도착지"></input>
        <br></br>
        <div>성별</div>
        <input type='radio' name='gender_input' value='여성' />여성
        <input type='radio' name='gender_input' value='남성' />남성
        <input type='radio' name='gender_input' value='혼성' />혼성
        <p><input type="submit" value="방 만들기"/></p>
      </form>
    </article>
  )
}


function App() {
  const [topics, setTopics] = useState([
    {id:1, start:"서울대입구역", arrival:"서울대 301동", gender:"여성"},
    {id:2, start:"사당역", arrival:"서울대 학생회관", gender:"남성"},
    {id:3, start:"서울대 농생대", arrival:"서울대입구역", gender:"혼성"}
  ]);
  const [mode, setMode] = useState('welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] =useState(4);
  let content = null;
  if(mode === "welcome"){
    content= 
    <div>
      <Greeting title="0" article = "안녕하세요. Mobility입니다"></Greeting>
      <br></br>
      <Create title="방 만들기"onChangemode={()=>{
        setMode("create")
      }}></Create>
    </div>
  } else if(mode ==="read"){
    let start, arrival, gender = null;
    for(let i =0; i<topics.length; i++){
      if(topics[i].id === id){
        start= topics[i].start;
        arrival = topics[i].arrival;
        gender = topics[i].gender;
      }
    }
    content= 
    <div>
      <Container start={start} arrival = {arrival} gender={gender}></Container>
      <br></br>
      <Create title="방 만들기"onChangemode={()=>{
        setMode("create")
      }}></Create>
    </div>
  } else if(mode ==="create"){
    content = <CreateForm onCreate={(start, arrival, gender)=>{
      //topics 배열에 새로운 객체 만들어주기, 범객체일 때는 [...value] 
      const NewTopics = [...topics]
      NewTopics.push({id: nextId, start: start, arrival:arrival, gender:gender})
      setTopics(NewTopics);
      //읽기 모드 전환
      setId(nextId);
      setMode("read")
      //다음 입력을 위해 id + 1 해주기
      setNextId(nextId+1);
    }}></CreateForm>
  }

  return (
    <div className="App">
      <Header onChangemode ={()=>{
        setMode("welcome");
      }}></Header>
      <List topics={topics} onChangemode = {(_id) => {
        setMode("read");
        setId(_id)
      }}></List>
      {content}
      <br></br>
      
    </div>
  );
}

export default App;
