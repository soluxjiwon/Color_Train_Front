import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import{HeartOutlined, HeartFilled} from '@ant-design/icons';


/*overlay는 모달 창 바깥 부분
content는 모달 창부분*/
const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
      },
      content: {
        width: "360px",
        height: "180px",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
      },
};


function SaveButton(hexColors){
    const [isSaved, setIsSaved] = useState(false); // 체크가 되었는지 확인하는 state
    const [modalOpen, setModalOpen]=useState(false); //로그인 여부 묻는 모달창 open
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    //로그인 여부를 확인해서 로그인이 되어있지 않으면 하트를 채우지 않고 로그인여부를 묻는 모달로 연결
    //로그인이 되어있으면 태그 선택 모달로 연결

    const ButtonClick = async ()=>{
        console.log('Save button clicked');
        console.log('Hex Colors:',hexColors.hexColors);
        const logIn = await checkLoginStatus();
        
        if(logIn){
            setIsSaved(true); 
            try{
                const response =  await axios.post('http://localhost:5000/api/palettes/save',
                {
                    title: 'Palette Title',
                    colors: hexColors.hexColors,
                    tags: ['tag1', 'tag2'],
                }, { withCredentials: true });
                console.log('API Response:', response.data);
                console.log('Saved color codes:',hexColors.hexColors);
            } catch (error){
                console.error('Error saving palette', error);
            }
        } else{
            setModalOpen(true);
        }
    };

    //로그인 여부 확인
    const checkLoginStatus= async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/users/auth', { withCredentials: true });
            const isUserLoggedIn = response.data.isAuth;
            setIsLoggedIn(isUserLoggedIn);
            return isUserLoggedIn;
            
          } catch (error) {
            console.error('Error checking login status:', error);
          }
    };

    const closeModal=()=>{
        setModalOpen(false);
    }

    const handleYesBt=()=>{
        window.location.href = '/login';
    }

    return (
      <div className="save-button">
       {isSaved ?(
         <HeartFilled
         style={{ color: 'red', fontSize: '30px' }}
         onClick={ButtonClick}
       />) : (
       <HeartOutlined
           style={{ fontSize: '30px' }}
           onClick={ButtonClick}/>
       )}

        <Modal
            isOpen={modalOpen}
            onRequestClose={()=>setModalOpen(false)}
            style={modalStyle}
            artaHideApp={false}
            contentLabel="Pop up Message"
            shouldCloseOnOverlayClick={false}
        >
            <div>
                로그인이 필요합니다. 로그인하시겠습니까?
            </div>
            <button onClick={handleYesBt}>예</button>
            <button onClick={closeModal}>아니요</button>

        </Modal>
      </div>
    );
}
export default SaveButton;
