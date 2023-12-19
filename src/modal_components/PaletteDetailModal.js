import axios from 'axios';
import React, {useState, useEffect} from 'react';
import SearchSaveButton from '../modal_components/SearchSaveButton';
import SearchPaletteCheckButton from '../modal_components/SearchPaletteCheckButton';
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


function PaletteDetailModal({ paletteId, onClose }){

    const [paletteInf, setPaletteInf]=useState(null);

    useEffect(()=>{
        const getPaletteInf = async ()=>{
            try{
                const response = await axios.get(`http://localhost:5000/api/palettes/${paletteId}`);
                setPaletteInf(response.data.palette)
            } catch(error){
                console.log(error);
            }
        };

        const getPaletteRecommedations = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/palette/recent', { withCredentials: true });
                console.log(response.data.recommendedPalettes)
            } catch (error){
                console.log(error);
            }
        };

        if(paletteId){
            getPaletteInf();
            getPaletteRecommedations();
        };
    },[paletteId]);


    return(
        <Modal
            isOpen={!!paletteId}
            onRequestClose={onClose}
            style={modalStyle}
        >
            {paletteInf && (
                <div className="PaletteDetail-container">
                    <div className="Detail-Palette">
                        <div className="Detail-Palette-Colors">
                            {paletteInf.colors.map((color,colorIndex)=>(
                                <div
                                    key={colorIndex}
                                    style={{backgroundColor: color}}
                                    className="Detail-Palette-Color"></div>
                            ))}
                        </div>
                    </div>
                    <div className="SaveButton-Part">
                        <SearchSaveButton paletteId={paletteId}/>
                    </div>
                    <div className="close-check-button">
                        <button onClick={onClose}>Close</button>
                        <SearchPaletteCheckButton hexColors={paletteInf.colors} />
                    </div>
                
               
                </div>
            )}
        
        </Modal>
    );

}
export default PaletteDetailModal;