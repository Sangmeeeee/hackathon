import React from 'react'
import './MainDiv.css'

const MainDiv = () => {
    setTimeout(() => {
        document.getElementsByClassName('MainLogo')[0].style.visibility = 'visible'
        document.getElementsByClassName('MainText')[0].style.visibility = 'visible'
    },1001)

    return(
        <div className='MainDiv'>
            <p>
                <img className='MainLogo' src='/img/mainlogo.png'></img>
            </p>
            <div className='MainText'>
            <p>
                <h2>{`환영합니다! ${window.sessionStorage.getItem('ID')}님!`}</h2>
            </p>
            <p>
                <h2>COVID-19로 인해 답답하게 집에서만 혼자 코딩중이신가요?</h2>
            </p>
            <p>
                <h2>KNUniverse를 통해 안전하고 재미있게!</h2>
            </p>
            <p>
                <h2>첨성인, 캠퍼스, 스마트한 학교생활을 즐기고 싶으신가요?</h2>
            </p>
            <p>
                <h2>KNUniverse를 통해 답답한 집에서 벗어나 친구들을 온라인에서 만나보세요!</h2>
            </p>
            </div>
        </div>
    )
}

export default MainDiv