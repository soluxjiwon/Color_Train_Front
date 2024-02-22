import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import{HeartOutlined, HeartFilled} from '@ant-design/icons';
import SaveTagModal from '../modal_components/SaveTagModal';


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


function SaveButton(hexColors){
    const [isSaved, setIsSaved] = useState(false); // 체크가 되었는지 확인하는 state
    const [modalOpen, setModalOpen]=useState(false); //로그인 여부 묻는 모달창 open
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [saveTagModalOpen, setSaveTagModalOpen] = useState(false);
    
    //로그인 여부를 확인해서 로그인이 되어있지 않으면 하트를 채우지 않고 로그인여부를 묻는 모달로 연결
    //로그인이 되어있으면 태그 선택 모달로 연결

     //저장버튼 이벤트 : 로그인 여부 확인, 태그 선택 모달 열기
     const ButtonClick = async () => {
        console.log('Save button clicked');
        console.log('Hex Colors:', hexColors.hexColors);
        const logIn = await checkLoginStatus();
  
        if (logIn) {
           setSaveTagModalOpen(true);
           setIsSaved(true);
        } else {
           setModalOpen(true);
        }
     };
     
    const selectTagsAndSave = async (selectedTags) => {
        try {
           const response = await axios.post(
              'https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/save',
              {
                 title: 'Palette Title',
                 colors: hexColors.hexColors,
                 tags: selectedTags,
              },
              { withCredentials: true }
           );
           console.log('API Response:', response.data);
           console.log('Saved color codes:', hexColors.hexColors);
        } catch (error) {
           console.error('Error saving palette', error);
        }
     };
  

    //로그인 여부 확인
    const checkLoginStatus= async ()=>{
        try {
            const response = await axios.get('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/users/auth', { withCredentials: true });
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
        <SaveTagModal
            setOpenModal={saveTagModalOpen}
            setCloseModal={() => setSaveTagModalOpen(false)}
            saveTagsToApi={selectTagsAndSave}
        />
    
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
export default SaveButton;
