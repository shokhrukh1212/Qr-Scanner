import "./BarcodeReader.css";
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import React from "react";
import VideoDecode from "../VideoDecode/VideoDecode";
import logoSvg from "../../assets/logo.svg";

interface myState {
  scanNumber: number;
}

class BarCodeReader extends React.Component<any, myState> {
  state = {
    scanNumber: 0,
  };

  async componentDidMount() {
    try {
      await BarcodeReader.loadWasm();
    } catch (ex: any) {
      if (ex.message.indexOf("network connection error")) {
        let customMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        console.log(customMsg);
        alert(customMsg);
      }
      throw ex;
    }
  }

  // setting scan number
  setScanNumber = (number: number) => {
    this.setState(() => ({
      scanNumber: number,
    }));
  };

  render() {
    return (
      <div className="helloWorld">
        <div className="container">
          <div className="logo-container">
            <img src={logoSvg} alt="logo" className="logo-image" />
            <h1 className="logo-title">No Thanks Scanner</h1>
          </div>
          <VideoDecode setScanNumber={this.setScanNumber}></VideoDecode>
          {this.state.scanNumber !== 0 && (
            <h2>
              The last read barcode is: <u>{this.state.scanNumber}</u>
            </h2>
          )}
        </div>
      </div>
    );
  }
}
export default BarCodeReader;
