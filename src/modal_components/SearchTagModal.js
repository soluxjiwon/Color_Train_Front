import axios from 'axios';
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


function SearchTagModal({ setOpenModal, setCloseModal, putTagsSelected, putSearchResults}){
    const [isOpen, setIsOpen] = useState(true);
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
    const mood = [
       {display: "귀여운", value: "cute"},
       {display: "레트로", value: "retro"},
     ];
    const theme = [
        {display: "봄", value: "spring"},
       {display: "여름", value: "summer"},
        
     ];
    const color_harmony = [
        {display: "단일색", value: "mono"},
       {display: "보색", value: "complementary"},
       {display: "유사색", value: "similar"}
     ];
    const color_blindness = [
        {display: "적록색맹", value: "redgreen"},
       {display: "청황색맹", value: "blueyellow"},
     ];
    const etc = [
        {display: "빨강", value: "red"},
       {display: "주황", value: "orange"},
       {display: "초록", value: "green"}
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
    

    //검색버튼 : 서버 연결
    const handleSearch = async () => {
        try {
          const response = await
            axios.get('http://localhost:5000/api/palettes/search',
                  {params: { tags: valueTags.join(',') },});

            console.log('Tags sent to the API:', valueTags);
            console.log('API Response:', response.data);

            closeModal();
            putTagsSelected(selectedTags);
            setCloseModal();
            putSearchResults(response.data.result);
        } catch (error) {
          console.error('Error during search:', error);
        }
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
            <div className="searchButton-part">
                <button className="searchButton" onClick={handleSearch}>검색</button>
            </div>
        </div>

    
      </Modal>
    )
}

export default SearchTagModal;