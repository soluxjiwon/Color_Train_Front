import axios from 'axios';
import React, { useState, useEffect} from 'react';
import SearchTagModal from '../modal_components/SearchTagModal';
import PaletteDetailModal from '../modal_components/PaletteDetailModal';
import '../style_components/Search.css';

function Search(){
    const [selectedTags, setSelectedTags]=useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPalette, setSelectedPalette] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    //선택한 태그 불러오기
    const handleTagsSelected=(tags)=>{
        setSelectedTags(tags);
    }

    const handleEditButton=()=>{
        setEditModalOpen(true);
    }

    
    const handleModalClose = () => {
        setEditModalOpen(false);
    }

    const  handleSearchResults = (results) =>{
        setSearchResults(results);
    }

    const handlePaletteClick=(palette)=>{
        setSelectedPalette(palette);
        console.log(palette._id)
    }
    const handleCloseDetailModal=()=>{
        setSelectedPalette(null);
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/auth', { withCredentials: true });
                const isUserLoggedIn = response.data.isAuth;
                setIsLoggedIn(isUserLoggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            getLatestPalette();
        } else {
            getAllPalette();
        }
    }, [isLoggedIn]);

    const getAllPalette = async () =>{
        try {
            const page = 1;
            const itemsNum = 20;
    
            const response = await axios.get(`https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/all?page=${page}`, { withCredentials: true });
            setSearchResults(response.data.result);
    
        } catch (error) {
            console.error('Error fetching all palettes:', error);
        }
    }

    const getLatestPalette = async () => {
        try {
            const page = 1;
            const itemsNum = 20;
    
            // mod 랜덤 적용
            const modOptions = ["color", "style", "theme"];
            const mod = modOptions[Math.floor(Math.random() * modOptions.length)];
            console.log(mod);
    
            const response = await axios.post(`https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/recent?page=${page}`, 
                { mod: mod }, { withCredentials: true });
            setSearchResults(response.data.result);

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
        <div className="searchtagsPalettes" >
            <div className="selectedTags-of-recommend">
                {selectedTags.map((tag, index) => (
                    <div key={index} className="selectedTag-of-recommend">
                    {tag}
                    </div>
                ))}
                <div className="edit-button-part">
                    <button className="edit-button" onClick={handleEditButton}>
                        검색
                    </button>
                </div>
            </div>
           
                <SearchTagModal
                    setOpenModal={editModalOpen}
                    putTagsSelected={handleTagsSelected}
                    setCloseModal={handleModalClose}
                    putSearchResults={handleSearchResults}
                />


            <div className="searchPalettes-list">
                {searchResults &&searchResults.map((palette,index)=>(
                    <div  key={index} className="searchPalette-container" onClick={()=>handlePaletteClick(palette)}>
                        <div className="searchPalette-colors">
                            {palette.colors.map((color,colorIndex)=>
                                <div
                                    key={colorIndex}
                                    style={{backgroundColor:color}}
                                    className="searchPalette-color">
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {selectedPalette && (
            <PaletteDetailModal
                paletteId={selectedPalette._id}
                onClose={handleCloseDetailModal}
            />
        )}
        </>
    )

}
export default Search;
