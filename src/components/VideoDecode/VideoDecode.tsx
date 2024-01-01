import { BarcodeScanner } from "dynamsoft-javascript-barcode";
import React from "react";
import "./VideoDecode.css";

interface isState {
  showScanNumber: boolean;
}

interface VideoDecodeProps {
  setScanNumber: (number: number) => void;
}

class VideoDecode extends React.Component<any, isState, VideoDecodeProps> {
  state = {
    showScanNumber: false,
  };

  pScanner: Promise<BarcodeScanner> | null = null;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  async componentDidMount() {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      if (scanner.isContextDestroyed()) return;
      await scanner.setUIElement(this.elRef.current!);
      if (scanner.isContextDestroyed()) return;
      scanner.onFrameRead = (results) => {
        for (let result of results) {
          console.log(result.barcodeText);
        }
      };
      scanner.onUniqueRead = (txt, result) => {
        this.props.setScanNumber(txt);
      };
      await scanner.open();
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
  async componentWillUnmount() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log("BarcodeScanner Component Unmount");
    }
  }
  render() {
    return (
      <div ref={this.elRef} className="component-barcode-scanner">
        <div className="dce-video-container"></div>
      </div>
    );
  }
}

export default VideoDecode;
