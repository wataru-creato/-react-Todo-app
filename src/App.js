import { useEffect, useState } from "react";
import './main.css';


//メイン
function App() {

  // const [active, setActive] = useState();

  const handleActive=(id,NewStatus)=>{
    setListArray((p)=>p.map((task)=>
    task.id===id ?{...task, status:task.status == NewStatus ? "" : NewStatus
    }:task));
  };

  //入力している情報をいれるもの
  const [form,setListForm]=useState({
    day:"",
    start_time:"",
    end_time:"",
    text:"",
    done:false
  });

  //最終保存，最終的に内容が保存される配列
  const [ListArray,setListArray]=useState(()=>{

  const save=localStorage.getItem("ListArray");
  return save ? JSON.parse(save):[];

});

useEffect(()=>{
      localStorage.setItem("ListArray",JSON.stringify(ListArray));
    },[ListArray]);
   


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
    setListForm({text:"",day:"",start_time:"",end_time:"",done:false});

  };
  
  
  

  //✔ボタンが押されたときの内容
  const handleDelet=(id)=>{
    if(window.confirm("本当に削除しますか？")){
      //idが一致しないのだけを残す→選択されたタスクを消す
      setListArray(ListArray.filter((t)=> t.id !== id));
      }
    }

  //完了リスト用のstats(完了済みを保存する場所)
  const [doneList,setDoneList]=useState(()=>{

    const save=localStorage.getItem("doneList");
    return save ? JSON.parse(save):[];
  });

  useEffect(()=>{
      localStorage.setItem("doneList",JSON.stringify(doneList));
    },[doneList]);
   
  
  
  //完了リストに追加する
  const handleDone=(id)=>{

    if(window.confirm("完了リストに追加しますか？")){

    //選択したタスクを見つける
    const doneItem=ListArray.find((t)=>t.id===id);
    if(!doneItem)return;

    //完了リスト用の保存先に，選択したタスクを追加（done状態をtrueにして保存する）
    setDoneList((s)=>[...s,{...doneItem,done:true}]);

    //選択したものだけをタスクから除外する
    setListArray((s)=>s.filter((t)=>t.id!==id));

    }
    };

  
    const doneListDelet=()=>{
      if(setDoneList.length===0)return;
      if(window.confirm("完了タスクを削除しますか？")){
          setDoneList([]);
      }
    }

    const resetbutton=()=>{
      if(window.confirm("本当にすべて消してもよろしいですか？")){
        setListArray([]);
        setDoneList([]);
      }
    }
  
    //子
   return(
      <div>
        <b><h1 className="menue_bar text-[30px]">Todoリスト（react版）</h1></b>
        <div className="flex justify-center">
        <div className="bg-gray-200 border-2 border-[#333] px-3 py-2 rounded-lg m-1 flex justify-center items-center w-fit">
      年月日：<input type="date" name="day" placeholder="日付を入力してください" onChange={handleChange} value={form.day} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
      開始時間：<input type="time" name="start_time" placeholder="開始時間を入力してください" onChange={handleChange} value={form.start_time} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
      終了時間：<input type="time" name="end_time" placeholder="終了時間を入力してください" onChange={handleChange} value={form.end_time} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
      予定内容：<input type="text" name="text" placeholder="予定を入力してください" onChange={handleChange} value={form.text} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAdd_text}>追加</button>
      <button onClick={resetbutton} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >リセット</button>
      </div>
        </div>
          <div>
            
          </div>
          <h1 className="bg-sky-200 border-2 border-[#333] px-3 py-2 rounded-lg m-1 w-fit">タスク一覧</h1>
          <ul>
            {ListArray.map((i)=>(  
            <li key={i.id} className="mb-2"> 
            <div className={`block p-4 rounded mb-2 ${

              i.status==="important" 
              ? "bg-yellow-200" 
              : i.status==="not-start" 
              ? "bg-red-200"
              :i.status==="progress"
              ? "bg-blue-200"
              :"bg-white"
              }`}>
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <button onClick={()=>handleDone(i.id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex justify-center items-center">✔</span></button>
              {/*ここのクラス名で左右の設定を行う */}
              <div className="">
              <span class="items-text">日付：{i.day}</span><span>開始時間：{i.start_time}</span>終了時刻：{i.end_time}<span>タスク：{i.text}</span>
              </div>
              </div>
              <div className="flex space-x-2 ml-auto">
              <button onClick={()=>handleActive(i.id,"important")} className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-yellow-200 dark:hover:bg-yellow-200 dark:focus:ring-yellow-200">☆</button>
              <button onClick={()=>handleActive(i.id,"not-start")} className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">未着手</button>
              <button onClick={()=>handleActive(i.id,"progress")} className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">進行中</button>
              </div>
              </div>
            </div>
              </li>
            ))}
            <span className="flex items-center space-x-4"><h1 className="bg-green-200 border-2 border-[#333] px-3 py-2 rounded-lg m-1 w-fit">完了リスト</h1><button onClick={doneListDelet} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center">完了リスト削除</button></span>
            {doneList.filter((t)=>t.done).map((i)=>(
              <div className="flex items-center space-x-4">
                <span>日付：{i.day}</span><span>開始時間：{i.start_time}</span>終了時刻：{i.end_time}<span>タスク：{i.text}</span></div>
            ))}
             
          </ul>
      </div>  
   );
  
 }
export default App;
