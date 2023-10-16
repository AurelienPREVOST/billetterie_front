
import React from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from "qrcode.react";

const EmailPlaces = () => {
  const { code } = useParams();
  console.log(code)

    useEffect(() => {
    const canvas = document.querySelector("#emailPlaces canvas");
    console.log(canvas)
    if (canvas) {
      canvas.style.removeProperty('width');
      canvas.style.removeProperty('height');
    }
  }, []);


  return (
    <div id="emailPlaces">
      <h1>Veuillez faire flasher ce QRCode à l'entrée de votre évènement</h1>
      <h3>ajustant la luminosité de votre smartphone au maximum</h3>
      <QRCode value={code} id="QrCodeReadyFromEmailChecking"/>
    </div>
  );
};

export default EmailPlaces;
