import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import MyPaletteCheckModal from '../modal_components/MyPaletteCheckModal';
import '../style_components/MyPalettes.css';

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


function MyPalettes(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [userPalettes, setUserPalettes] = useState([]);
    const [selectedPalette, setSelectedPalette] = useState(null);
    const [checkModalOpen, setCheckModalOpen] = useState(false);

    const checkLoginStatus= async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/users/auth', { withCredentials: true });
            const isUserLoggedIn = response.data.isAuth;
            setIsLoggedIn(isUserLoggedIn);

            if(isUserLoggedIn){
                const userId = response.data._id;
                const userDataResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {withCredentials: true });

                console.log(userDataResponse.data.user);
                console.log(userDataResponse.data.user.pids);
                setUserPalettes(userDataResponse.data.user.pids);
                console.log(userPalettes);
            } else {
                setModalOpen(true);
            }
          } catch (error) {
            console.error('Error checking login status:', error);
        }
      };
      useEffect(()=>{
        checkLoginStatus();
      }, []);

      const closeModal=()=>{
        setModalOpen(false);
        window.location.href = '/App';
    }

    const handleYesBt=()=>{
        window.location.href = '/login';
    }

    const handlePaletteClick = (palette) => {
        console.log('Palette clicked:', palette);
        setSelectedPalette(palette);
        setCheckModalOpen(true);
      };
    
      const closeCheckModal = () => {
        setCheckModalOpen(false);
      };
    

      return(
        <>
        {isLoggedIn ? (
            <div className="MyPalettes-list">
                {userPalettes.map((palette) => (
                    <div key={palette._id} className="MyPalettes-container">
                        <div className="MyPalettes-colors" onClick={()=>handlePaletteClick(palette)}>
                            {palette.colors.map((color, index) =>
                                <div
                                    key={index}
                                    className="MyPalettes-color"
                                    style={{ backgroundColor: color }}
                                ></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <Modal
                isOpen={modalOpen}
                onRequestClose={()=>setModalOpen(false)}
                style={modalStyle}
                artaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}>

                <div>
                    로그인이 필요합니다. 로그인하시겠습니까?
                </div>
                <button onClick={handleYesBt}>예</button>
                <button onClick={closeModal}>아니요</button>
            </Modal>
        )}
        {selectedPalette && (
            <MyPaletteCheckModal
                modalIsOpen={checkModalOpen}
                closeCheckModal={closeCheckModal}
                hexColors={selectedPalette.colors}
                initialColors={selectedPalette.colors}
            />
        )}
        </>
       
      )

}
export default MyPalettes;