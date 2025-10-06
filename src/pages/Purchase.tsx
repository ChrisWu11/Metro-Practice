// @ts-nocheck
import React from "react";
import Card from "../components/Card";
import { FaQrcode, FaTicketAlt } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import ticket from "../assets/ticket.png";
import { useAlert } from "../components/Alert";


const Row: React.FC<
  React.PropsWithChildren<{ trailing?: React.ReactNode }>
> = ({ children, trailing, classLabel }) => (
  <div
    className={`${classLabel} flex justify-between bg-[#F2F3F8] rounded-xl shadow-card px-2 mb-4 `}
  >
    <div>
      <div className="text-3xl font-light">{children}</div>
    </div>
    {trailing && <div className="text-4xl">{trailing}</div>}
  </div>
);

const Purchase: React.FC = () => {
  const { showAlert } = useAlert();
  return (
    <main className="pt-3 pb-40 px-4" onClick={() => showAlert()}>
      <div className="max-w-3xl mx-auto">
        <Row classLabel={"py-3.5"}>Metro</Row>
        <Row classLabel={"py-3.5"}>NX+Metro</Row>
        <Row classLabel={"py-3.5"}>nbus+Metro</Row>
        <Row trailing={<MdOutlineQrCodeScanner size={80} />} classLabel={"py-2"}>
          <div>
            <div className="text-3xl">Scan QR Code</div>
            <div className="text-base text-black">
              Scan a QR Code for a ticket
            </div>
          </div>
        </Row>
        <Row trailing={<img src={ticket} alt="Ticket" className="w-20 h-20" />} classLabel={"py-2"}>
          <div>
            <div className="text-3xl">Quick Buy</div>
            <div className="text-base text-black">
              Purchase your last ticket again
            </div>
          </div>
        </Row>
      </div>
    </main>
  );
};

export default Purchase;
