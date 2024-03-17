import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../style_components/SearchTagModal.css';

Modal.setAppElement('#root');

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
        height: "530px",
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


function SaveTagModal({setOpenModal, setCloseModal, saveTagsToApi}){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [valueTags,setValueTags]=useState([]);

        
    useEffect(()=>{
        setIsOpen(setOpenModal);
    }, [setOpenModal]);

    const closeModal = () => {
        setIsOpen(false);
        setCloseModal();
    };
    
    //태그 구성
    //태그 구성
    const mood = [
        {display: "귀여운", value: "cute"}, {display: "레트로", value: "retro"},
        {display: "펑키한", value: "funky"}, {display: "활동적인", value: "energetic"},
        {display: "발랄한", value: "vivacious"}, {display: "트로피컬", value: "tropical"},
        {display: "빈티지", value: "vintage"}, {display: "고급스러운", value: "luxury"},
        {display: "정적인", value: "calm"}, {display: "자연적인", value: "natural"},
        {display: "부드러운", value: "soft"}, {display: "중성적인", value: "neutral"},
        {display: "행복한", value: "happy"}, {display: "따뜻한", value: "warm"},
        {display: "차가운", value: "cold"}, {display: "쨍한", value: "bold"},
        {display: "밝은", value: "bright"}, {display: "어두운", value: "dark"},
        {display: "파스텔", value: "pastel"}, {display: "원색", value: "primary"},
        {display: "로맨틱한", value: "romantic"}, 
      ];
     const theme = [
         {display: "봄", value: "spring"}, {display: "여름", value: "summer"},
         {display: "가을", value: "autumn"}, {display: "겨울", value: "winter"},
         {display: "크리스마스", value: "christmas"}, {display: "할로윈", value: "halloween"},
         {display: "", value: ""}, {display: "", value: ""},
         {display: "", value: ""}, {display: "", value: ""},
         
      ];
     const color_harmony = [
         {display: "단색", value: "mono"}, {display: "반대색", value: "complementary"},
         {display: "유사색", value: "similar"}, {display: "흑백", value: "achromatic"}
      ];
     const color_blindness = [
         {display: "적록색맹", value: "redgreen"}, {display: "청황색맹", value: "blueyellow"},
      ];
     const etc = [
         {display: "빨강", value: "red"}, {display: "주황", value: "orange"},
         {display: "노랑", value: "yellow"}, {display: "초록", value: "green"},
         {display: "파랑", value: "blue"}, {display: "남색", value: "indigo"},
         {display: "보라", value: "purple"}, {display: "분홍", value: "pink"},
         {display: "갈색", value: "brown"}
      ];
     //태그 선택 이벤트
     const handleTagClick = (tag) => {
        const index = selectedTags.indexOf(tag.display);
        if (index === -1) {
            setSelectedTags([...selectedTags, tag.display]);
        } else {
            const updatedTags = [...selectedTags];
            updatedTags.splice(index, 1);
            setSelectedTags(updatedTags);
        }
        const indexValue=valueTags.indexOf(tag.value);
        if(indexValue===-1){
            setValueTags([...valueTags, tag.value]);
        } else {
            const updatedValueTags=[...valueTags];
            updatedValueTags.splice(indexValue,1);
            setValueTags(updatedValueTags);
        }
    };
    const handleReset = () =>{
        setSelectedTags([]);
        setValueTags([]);
    }
    
    //저장버튼 : 태그를 savebutton으로 보내기
    const handleSave = () => {
        saveTagsToApi(valueTags);
        setCloseModal();;
      };
    
    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Search Tag Modal"
      >
        <div className="searchTag-container">
            <div className="tags-part">
                <div className="saveSearchtag-explain">
                    저장할 팔레트에 알맞는 태그를 선택해주세요.
                </div>
                <Tabs>
                    <TabList>
                        <Tab>분위기</Tab>
                        <Tab>테마</Tab>
                        <Tab>색상이론</Tab>
                        <Tab>접근성</Tab>
                        <Tab>기타</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid-container">
                            {mood.map((tag, index) => (
                                <label key={index}>
                                    <div className="tagButton-part">
                                        <input
                                            type="button"
                                            value={tag.display}
                                            name={`tag_${index}`}
                                            className={`tagButton ${selectedTags.includes(tag.display) ? 'selected' : ''}`}
                                            onClick={() =>handleTagClick(tag)}
                                        />
                                    </div>
                                </label>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid-container">
                            {theme.map((tag, index) => (
                                <label key={index}>
                                <div className="tagButton-part">
                                    <input
                                        type="button"
                                        value={tag.display}
                                        name={`tag_${index}`}
                                        className={`tagButton ${selectedTags.includes(tag.display) ? 'selected' : ''}`}
                                        onClick={() =>handleTagClick(tag)}
                                    />
                                </div>
                            </label>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid-container">
                            {color_harmony.map((tag, index) => (
                                <label key={index}>
                                <div className="tagButton-part">
                                    <input
                                        type="button"
                                        value={tag.display}
                                        name={`tag_${index}`}
                                        className={`tagButton ${selectedTags.includes(tag.display) ? 'selected' : ''}`}
                                        onClick={() =>handleTagClick(tag)}
                                    />
                                </div>
                            </label>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid-container">
                            {color_blindness.map((tag, index) => (
                                <label key={index}>
                                <div className="tagButton-part">
                                    <input
                                        type="button"
                                        value={tag.display}
                                        name={`tag_${index}`}
                                        className={`tagButton ${selectedTags.includes(tag.display) ? 'selected' : ''}`}
                                        onClick={() =>handleTagClick(tag)}
                                    />
                                </div>
                            </label>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid-container">
                            {etc.map((tag, index) => (
                                <label key={index}>
                                <div className="tagButton-part">
                                    <input
                                        type="button"
                                        value={tag.display}
                                        name={`tag_${index}`}
                                        className={`tagButton ${selectedTags.includes(tag.display) ? 'selected' : ''}`}
                                        onClick={() =>handleTagClick(tag)}
                                    />
                                </div>
                            </label>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="tags-selectedTags-divider"></div>
            <div className="selectedTags-part">
                {selectedTags.map((tag, index) => (
                    <div key={index} className="selectedTag">
                        {tag}
                    </div>
                ))}
            </div>
            <div className="SaveButton-part">
                <button className="SaveButton" onClick={handleSave}>저장</button>
                <button className="resetButton" onClick={handleReset}>태그 초기화</button>
            </div>
        </div>

    
      </Modal>
    )
}

export default SaveTagModal;