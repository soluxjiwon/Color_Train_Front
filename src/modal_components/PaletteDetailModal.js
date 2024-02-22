import axios from 'axios';
import React, {useState, useEffect} from 'react';
import SearchSaveButton from '../modal_components/SearchSaveButton';
import SearchPaletteCheckButton from '../modal_components/SearchPaletteCheckButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from 'react-modal';
import '../style_components/PaletteDetailModal.css';


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
        width: "1200px",
        height: "535px",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
        padding:"10px"
      },
};


function PaletteDetailModal({ paletteId, onClose }) {

    const [paletteInf, setPaletteInf] = useState(null);
    const [recommendPalettes, setRecommendPalettes] = useState(null);
    const [loginInfo, setLoginInfo] = useState({isLoggedIn: false, userId: null});
    const [selectedPalette, setSelectedPalette] = useState(null);

    const getPaletteInf=async()=>{
        if(paletteId){
            axios
             .get(`https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/${paletteId}`
                , { withCredentials: true })
             .then((response)=>{
                setPaletteInf(response.data.palette)
             })
             .catch((error)=>{
                console.log(error);
             });
        }
    };
    const getRecommedPalettes=async()=>{
        if(paletteId){
            try{
                //mod 랜덤 적용
                const modOptions = ['color','style', 'theme'];
                const mod = modOptions[Math.floor(Math.random() * modOptions.length)];

                const response = await axios.post(`https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/recom/${paletteId}`,
                    {mod : mod, withCredentials: true });
                console.log(mod);
                setRecommendPalettes(response.data.result);
                console.log(response.data.result);
            } catch(error){
                console.log(error);
            }
        }
    };
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/users/auth', { withCredentials: true });
            const userData = response.data;
            setLoginInfo({
                isLoggedIn: userData.isAuth,
                userId: userData._id,
            });
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };
    useEffect(()=>{
        if(paletteId){
            getPaletteInf();
            getRecommedPalettes();
            checkLoginStatus(); 
        }
    },[paletteId]);
    
    const handlePaletteClick=(palette)=>{
        setSelectedPalette(palette);
        console.log(palette._id)
    }

    const handleCloseDetailModal=()=>{
        setSelectedPalette(null);
    }

    

    //태그 한글로 출력
    const tagsTranslate=(tag)=>{
        const translateToKorean = {
            cute:'귀여운', retro: '레트로', funcky:'펑키한', energetic: '활동적인', vivacious:'발랄한', 
            tropical: '트로피컬', vintage: '빈티지', luxury: '고급스러운',calm: '정적인', natural: '자연적인',
            soft: '부드러운', neutral: '중성적인', happy: '행복한', warm: '따뜻한', cold: '차가운',
            bold: '쨍한', bright: '밝은', dark: '어두운', pastel: '파스텔', primary: '원색의', 
            romantic:'로맨틱한', funky: '펑키한', 
    
            spring:'봄', summer: '여름', autumn: '가을', winter: '겨울', christmas: '크리스마스',
            halloween: '할로윈', 

            mono:'단일색', complementary:'반대색', similar:'유사색', achromatic:'흑백',

            redgreen:'적록색맹', blueyellow:'청황색맹',

            red:'빨강', orange:'주황', yellow: '노랑', green:'초록', blue: '파랑', indigo: '남색',
            purple: '보라', pink: '분홍', brown: '갈색', 


        }
        return translateToKorean[tag];
    }

    return(
        <Modal
            className="PaletteDetailModal"
            isOpen={!!paletteId}
            onRequestClose={onClose}
            style={modalStyle}
        >
        
            <button className="closebutton" onClick={onClose} >X</button>
  
            {paletteInf && (
                <div className="PaletteDetail-container">
                    <div className="Detail-Palette">
                        <div className="Detail-Palette-Colors">
                            {paletteInf.colors.map((color,colorIndex)=>(
                                <div
                                    key={colorIndex}
                                    style={{backgroundColor: color}}
                                    className="Detail-Palette-Color">
                                </div>
                            ))}
                        </div>
                        <div className="Detail-Palette-codes">
                            {paletteInf.colors.map((color,colorIndex)=>(
                                <div
                                    key={colorIndex}
                                    className="Detail-Palette-Code">
                                        <CopyToClipboard text={color}  onCopy={() => alert("색상 코드가 복사되었습니다.")}>
                                            <text className="ColorCodeText">
                                                {color}
                                            </text>
                                        </CopyToClipboard>
                                </div>
                            ))}
                        </div>
                        <div className="Detail-Palette-Tags">
                            {paletteInf.tags.map((tag,tagIndex)=>
                                <div key={tagIndex} className="Detail-Palette-Tag">
                                    {tagsTranslate(tag)}
                                    {tagIndex < paletteInf.tags.length - 1 && ', '}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="save-check-close-bt">
                        <div className="detailsavebt">
                            <SearchSaveButton paletteId={paletteId}  isLoggedIn={loginInfo.isLoggedIn} userId={loginInfo.userId}/>
                        </div>
                        <div className="check-bt">
                            <SearchPaletteCheckButton hexColors={paletteInf.colors} />
                        </div>
                    </div>
                  

                    <div className="Recommendation-list">
                        {recommendPalettes&&recommendPalettes.map((palette,index)=>(
                            <div  key={index} className="Recommended-Palette" onClick={()=>handlePaletteClick(palette)}>
                                {palette.colors.map((color,colorIndex)=>
                                    <div
                                        key={colorIndex}
                                        style={{backgroundColor:color}}
                                        className="Recommended-Palette-Color">
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            )}
            {selectedPalette && (
                <PaletteDetailModal
                    paletteId={selectedPalette._id}
                    onClose={handleCloseDetailModal}
                />
            )}
        
        </Modal>
    );
}


export default PaletteDetailModal;