
import { useState, useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode";
import { qrCodeChecking, qrCodeFirstValidateScan } from "../../api/place";

const qrCodeScanner = ()=>{
  const [scanResult, setScanResult] = useState(null)
  const [report, setReport] = useState("")

  const checkConformity = () => {
    console.log("checkConformity")
    removeOneVideo()
    if (scanResult) {
      qrCodeChecking(scanResult)
        .then((res) => {
          if (res.result.length === 0) {
            setReport("Cette place n'existe pas en base de donnée");
          } else {
            let flash = document.getElementById("flash")
            switch (res.result[0].status) {
              case "sold":
                flash.classList.add("green")
                setReport("ENTREE VALIDE");
                setTimeout(() => {
                  flash.classList.remove("green")
                }, 700);
                qrCodeFirstValidateScan(scanResult)
                break;
              case "SCANNED":
                flash.classList.add("yellow")
                setReport("DEJA FLASHE");
                setTimeout(() => {
                  flash.classList.remove("yellow")
                }, 700);
                break;
              case "available":
                flash.classList.add("red")
                setReport("CETTE PLACE N'A PAS ETE ACQUITEE");
                setTimeout(() => {
                  flash.classList.add("remove")
                }, 700);
                break;
              default:
                setReport("Statut inconnu");
            }
            setTimeout(function() {
              console.log("********VEUILLEZ PATIENTEZ AVANT UNE NOUVELLE TENTATIVE*******");
              setScanResult(null)
            }, 3000);
            console.log("=> NOUVEAU SCAN POSSIBLE <=")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5
    })

    scanner.render(success, error);

    function success(result) {
      setScanResult(result);
    }
    function error() {
      console.warn(err);
    }
    removeOneVideo()
  }, []);
  //////TOUTE CETTE PARTIE LA EST UNE GROSSE BIDOUILLE POUR PALIER A UN DEFAUT DE LA LIBRAIRIE.
  // EN PRODUCTION LE TIMEOUT DEVRA PEUT ETRE ETE ALLONGE. SANS LE TIMEOUT LA WEBCAM APPARAIT 2
  // FOIS SI LE NAVIGATEUR A DEJA DONNE L'ACCES A LA WEBCAM
  const removeOneVideo = () => {
    console.log("removeOneVideo")
    setTimeout(() => {
      const videos = document.querySelectorAll('video');
      if (videos.length > 1) {
        const lastVideo = videos[videos.length - 1];
        lastVideo.parentNode.removeChild(lastVideo);
      }

      const buttons = document.querySelectorAll('#html5-qrcode-button-camera-stop');
      if (buttons.length > 1) {
        const lastButton = buttons[buttons.length - 1];
        lastButton.parentNode.removeChild(lastButton);
      }
    }, 700);
  };


  useEffect(() => {
    checkConformity()
  }, [scanResult])



    return (
      <div className="QRCODEAREA">
        <div id="flash"></div>
        <h1>Lecteur de QR-Code</h1>
        <div className="reportContainer">
          <h2>{report}</h2>
        </div>

        {scanResult ? (
          <div>
            <p>Code: {scanResult}</p>
          </div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
      )
}


export default qrCodeScanner;
