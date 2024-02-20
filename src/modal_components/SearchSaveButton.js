//생성한 팔레트의 저장과 검색한 팔레트의 저장이 달라 SearchSaveButton 따로 구성

import React, { useEffect, useState } from 'react';
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
        width: "33%",
        height: "40%",
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


function SearchSaveButton({paletteId, isLoggedIn, userId}){
    const [isSaved, setIsSaved] = useState(false); // 체크가 되었는지 확인하는 state
    const [modalOpen, setModalOpen]=useState(false); //로그인 여부 묻는 모달창 open
    
    //로그인 여부를 확인해서 로그인이 되어있지 않으면 하트를 채우지 않고 로그인여부를 묻는 모달로 연결
    //로그인이 되어있으면 태그 선택 모달로 연결

    useEffect(() => {
        // 팔레트가 저장되어 있는지 확인하는 API 호출
        const checkSavedPalette = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/palettes/isSaved/${userId}/${paletteId}`, { withCredentials: true });
            const isPaletteSaved = response.data.isSaved;
            setIsSaved(isPaletteSaved);
          } catch (error) {
            console.error('Error checking saved palette:', error);
          }
        };
    
        if (isLoggedIn) {
          // 로그인 상태일 때만 확인
          checkSavedPalette();
        }
      }, [paletteId, isLoggedIn]);

    //저장버튼 클릭 이벤트
    const ButtonClick = async ()=>{
        if(isLoggedIn){
            setIsSaved(true); 
            try{
                const response =  await axios.post(`http://localhost:5000/api/palettes/${paletteId}`,
                {

                }, { withCredentials: true });
                console.log('API Response:', response.data);
                if (response.data.success) {
                    console.log('Palette saved successfully!');
                } else {
                    console.error('Failed to save palette:', response.data.err);
                }
            } catch (error){
                console.error('Error saving palette', error);
            }
        } else{
            setModalOpen(true);
        }
    };

;

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
          <div className="loginPopUpMessage">
            <div className="loginPopUpMessage-part">
              <div>로그인이 필요합니다.</div>
              <div>로그인하시겠습니까?</div>
            </div>
            <div className="loginPopUpMessage-buttons">
                <button className="loginPopUpMessage-button" onClick={handleYesBt}>예</button>
                <button className="loginPopUpMessage-button" onClick={closeModal}>아니요</button>
            </div>
          </div>

        </Modal>
      </div>
    );
}
export default SearchSaveButton;
