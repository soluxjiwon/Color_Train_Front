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
    };

    const handleYesBt=()=>{
        window.location.href = '/login';
    };

    const handlePaletteClick = (palette) => {
        console.log('Palette clicked:', palette);
        setSelectedPalette(palette);
        setCheckModalOpen(true);
    };
    
    const closeCheckModal = () => {
        setCheckModalOpen(false);
    };

    //태그 한글로 출력
    const tagsTranslate=(tag)=>{
        const translateToKorean = {
            cute:'귀여운', retro: '레트로', funcky:'펑키한', energetic: '활동적인', vivacious:'발랄한', 
            tropical: '트로피컬', vintage: '빈티지', luxury: '고급스러운',calm: '정적인', natural: '자연적인',
            soft: '부드러운', neutral: '중성적인', happy: '행복한', warm: '따뜻한', cold: '차가운',
            bold: '쨍한', bright: '밝은', dark: '어두운', pastel: '파스텔', primary: '원색의',
            
            spring:'봄', summer: '여름', autumn: '가을', winter: '겨울', christmas: '크리스마스',
            halloween: '할로윈', 

            mono:'단일색', complementary:'보색', similar:'유사색', achromatic:'무채색',

            redgreeb:'적록색맹', blueyellow:'청황색맹',

            red:'빨강', orange:'주황', yellow: '노랑', green:'초록', blue: '파랑', indigo: '남색',
            purple: '보라', pink: '분홍',

        }
        return translateToKorean[tag];
    }
    

      return(
        <>
        <div className="MyPalette-explain">
            태그란에 마우스를 올리면 태그 전체를 볼 수 있습니다. 팔레트를 선택하면 점검창이 열립니다.
        </div>
        {isLoggedIn ? (
            <div className="MyPalettes">
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
                            <div className="MyPalettes-tags">
                                {palette.tags.slice(0, 4).map((tag, index,array) => (
                                    <span key={index} className="MyPalettes-tag">
                                        {tagsTranslate(tag)}
                                        {index !== array.length - 1 }
                                    </span>
                                ))}
                                

                                <div className="MyPalettes-Full-tags">
                                    {palette.tags.map((tag, index) => (
                                        <span key={index} className="MyPalettes-Full-tag">
                                            {tagsTranslate(tag)}
                                            {index < palette.tags.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        ) : (
            <Modal
                isOpen={modalOpen}
                onRequestClose={()=>setModalOpen(false)}
                style={modalStyle}
                artaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}>

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