import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TypographySVG from '../svg_components/TypographySVG.js';
import PatternSVG from '../svg_components/PatternSVG.js';
import '../rgblind/rgblind.js';
import '../rgblind/rgblind.css';
import '../style_components/CheckButton.css';
import { checkColors } from '../color-checker.js';



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
        width: "90%",
        height: "90%",
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


function CreatePaletteCheckButton({hexColors}){
    const [modalOpen, setModalOpen] = useState(false); //로그인 여부 묻는 모달창 open
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [randomColors, setRandomColors]=useState([...hexColors]);
    const ref = useRef(null);


    //로그인 여부를 확인해서 로그인이 되어있지 않으면 하트를 채우지 않고 로그인여부를 묻는 모달로 연결
    //로그인이 되어있으면 태그 선택 모달로 연결
    
    const openModal=()=>{
        setModalOpen(true);
        changePaletteToImage();
        setRandomColors(hexColors.slice(0, 5));
    };

    const closeModal=()=>{
        setModalOpen(false);
        setRandomColors([]);
    }

    //색상 랜덤 적용
    const shuffleColors = (colors) => {
      return colors.slice().sort(() => Math.random() - 0.5);
    };

    const handleRadomColorBt=()=>{
      const newRandomColors=shuffleColors([...hexColors]);
      setRandomColors(newRandomColors);
    }

    //팔레트 이미지화 API 연결
    const changePaletteToImage=()=>{
      axios
        .post('http://localhost:5000/api/palettes/checkPalette',{palette:hexColors})
        .then((response)=>{
          setImgUrl(response.data.imgUrl);
        })
        .catch((error)=>{
          console.error('Error: ',error);
        });
    };

    //고대비 점검 칸 선택하는 팔레트 생성
    const handleToggleClasslistRef = (ref) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.classList.contains("big-border")) {
        ref.current.classList.add("big-border");
      } else {
        ref.current.classList.remove("big-border");
        ref.current = null;
      }
    };
    useEffect(() => {
      const handleOutsideClick = (event) => {
        handleToggleClasslistRef(ref);
        setSelectedBoxIndex(null); 
      };
      const element = document.getElementById("wrapper");
      if (element) {
        element.addEventListener("click", handleOutsideClick);
        return () => {
          element.removeEventListener("click", handleOutsideClick);
        };
      }
    }, []);

  
  
    return (
      <div className="modalcheckList">
        <button onClick={openModal}>점검</button>
        
        <Modal
            isOpen={modalOpen}
            onRequestClose={()=>setModalOpen(false)}
            style={modalStyle}
            artaHideApp={false}
            contentLabel="check"
            shouldCloseOnOverlayClick={false}
        >
          {/*모달창 닫기 버튼*/}
          <button onClick={closeModal}>X</button>  

          <div className="modal-check">
            {/*생성한 컬러 팔레트 받아오기*/}
            <div className="checkButton-palette-container">
            {hexColors.map((color, index)=>(
              <div
                className="checkButton-palette-color"
                key={index}
                style={{ backgroundColor: color }}
              ></div>
              ))}
            </div>
            <Tabs>
              <TabList>
                <Tab>색상 적용 예시</Tab>
                <Tab>색각이상자가 보는 팔레트</Tab>
                <Tab>고대비 점검</Tab>
              </TabList>

              <TabPanel>
                {/*색상 적용 예시*/}
                <div className="color-example">
                  <div>
                    <TypographySVG  hexColors={randomColors} />
                    <PatternSVG hexColors={randomColors}  />
                  </div>
                  <div>
                    <button onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*색각이상자가 보는 컬러팔레트-이미지화해서 필터 적용*/}
                <div className="rgblind">
                  <div className="modal-checklist-name">색각이상자가 보는 컬러팔레트</div>
                  <div>
                    적록색맹
                    {imgUrl && <img src={imgUrl} className="protanopia" alt="적록색맹" />}
                  </div>
                  <div>
                    청황색맹
                    {imgUrl && <img src={imgUrl}  className="tritanopia" alt="청황색맹" />}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*고대비 점검-칸 하나씩 선택하는 팔레트 생성 후 고대비 점검 수식 적용*/}
                <div className="color-contrast">
                  <div className="contrast-palette-container">
                    {hexColors.map((hexColor, index)=>(
                      <div
                        className={'contrast-palette-color'}
                        onClick={(event) => {
                          handleToggleClasslistRef(ref);
                          event.stopPropagation();
                          ref.current = event.target;
                            setSelectedBoxIndex(index);
                          handleToggleClasslistRef(ref);

                          if (selectedBoxIndex != null){
                            const selectedForeground = hexColors[selectedBoxIndex];
                            const contrastRatios = hexColors
                              .filter((_, i) => i !== selectedBoxIndex)
                              .map((background) => {
                                // contrast 값 받을 변수
                                let contrastValue;
                                checkColors(selectedForeground, background, (result) => {
                                  contrastValue = result.contrast;
                                  //console.log('Contrast Ratios:', result);  -> 각 결과 배열 확인 가능(foreground, background)
                                });
                                return contrastValue;
                              });
                            
                            console.log('Contrast Ratios:', contrastRatios);
                          }
                        }}
                        style={{ backgroundColor: hexColor }}
                      ></div>
                    ))}
                  </div>    
                </div>
              </TabPanel>
            </Tabs>
          </div>      
        </Modal>
      </div>
    );
}
export default CreatePaletteCheckButton;