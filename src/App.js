import { useState } from "react";
import './main.css';


//メイン
function App() {

  //入力している情報をいれるもの
  const [form,setListForm]=useState({
    day:"",
    start_time:"",
    end_time:"",
    text:""
  });

  //最終保存，最終的に内容が保存される配列
  const [ListArray,setListArray]=useState([]);

  //テキストを選択した際に処理される内容
  const handleChange=(c)=>{
    const {name,value}=c.target;
    setListForm({...form,[name]:value});
  };

  //タスクを追加する
  const handleAdd_text=()=>{
    if(form.text.trim()=="")return;

    //タスクにどんなものを追加するのかを細かく定義する
    const newItem={
      id:Date.now(),
      day:form.day,
      start_time:form.start_time,
      end_time:form.end_time,
      text:form.text,
      done:false
    }
    //入力した内容を保存する配列に追加する
    setListArray([...ListArray,newItem]);
    //入力後リセットする
    setListForm({text:"",day:"",start_time:"",end_time:""});

  };

  //✔ボタンが押されたときの内容
  const handleDelet=(id)=>{
    if(window.confirm("本当に削除しますか？")){
      //idが一致しないのだけを残す→選択されたタスクを消す
      setListArray(ListArray.filter((t)=> t.id !== id));
      }
    }
  
    //子
   return(
      <div>
        <h1 class="menue_bar">Todoリスト（react版）</h1>
        <div>
      <input type="date" name="day" placeholder="日付を入力してください" onChange={handleChange} value={form.day}></input>
      <input type="time" name="start_time" placeholder="開始時間を入力してください" onChange={handleChange} value={form.start_time}></input>
      <input type="time" name="end_time" placeholder="終了時間を入力してください" onChange={handleChange} value={form.end_time}></input>
      <input type="text" name="text" placeholder="予定を入力してください" onChange={handleChange} value={form.text}></input>
      <button onClick={handleAdd_text}>追加</button>
        </div>
          <div>
            
          </div>
          <ul>
            {ListArray.map((i,index)=>(  
            <li key={index}>
              <button onClick={()=>handleDelet(i.id)}>✔</button>
              日付：{i.day}　　開始時間：{i.start_time}　　終了時刻：{i.end_time}　　タスク：{i.text}
            </li>
            ))}
          </ul>
      </div>  
   );
  }

export default App;

// function App() {
//   return (
//     <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4">
//         Tailwind動作テスト
//       </h1>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//         ボタン
//       </button>
//       <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//   追加
// </button>

//     </div>
//   );
// }

// export default App;
