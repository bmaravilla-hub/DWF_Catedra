import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './BotonRetroceder.css';

const BotonRetroceder = () => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-retroceder" onClick={() => navigate(-1)}>
      <FaArrowLeft className="me-2" />
      Volver
    </button>
  );
};

export default BotonRetroceder;
