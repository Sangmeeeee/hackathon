import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {
// const [positionX, setpositionX] = useState(0)
// const [positionY, setpositionY] = useState(0)
// useEffect(() =>  {
//   window.addEventListener('keypress', (e) => {
//     switch(e.code){
//       case 'KeyD' : 
//         document.getElementsByClassName('myChar')[0].src = 'img/right.png'
//         document.getElementsByClassName('myChar')[0].style.right += 10
//         break;
//       case 'KeyA' :
//         document.getElementsByClassName('myChar')[0].src = 'img/left.png'
//         document.gectElementsByClassName('myChar')[0].style.left += 10
//         break;
//       case 'KeyW' :
//         document.getElementsByClassName('myChar')[0].src = 'img/up.png'
//         document.getElementsByClassName('myChar')[0].style.top += 10
//         break;
//       case 'KeyS' :
//         document.getElementsByClassName('myChar')[0].src = 'img/down.png'
//         document.getElementsByClassName('myChar')[0].style.bottom += 10
//         break;
//     }
//   })
// })

  return (
    <div className="App">
      <img className='myChar' src='img/down.png' width='100' height='100' style={{position:'absolute'}} />
    </div>
  );
}

export default App;
