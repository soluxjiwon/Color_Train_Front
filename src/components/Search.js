import React, { useState, useEffect } from 'react';
import SearchTagModal from '../modal_components/SearchTagModal';
import PaletteDetailModal from '../modal_components/PaletteDetailModal';
import '../style_components/Search.css';

function Search(){
    const [selectedTags, setSelectedTags]=useState([]);
    const [editModalOpen, setEditModalOpen] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPalette, setSelectedPalette] = useState(null);

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

    useEffect(() => {
        if (!editModalOpen) {
          setEditModalOpen(false);
        }
      }, [editModalOpen]);

    const handlePaletteClick=(palette)=>{
        setSelectedPalette(palette);
        console.log(palette._id)
    }
    const handleCloseDetailModal=()=>{
        setSelectedPalette(null);
    }

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
                        수정
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
                {searchResults.map((palette,index)=>(
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