"use client";
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
import { UserDetailContext } from "../_context/UserDetailContext";
import { AddTransaction } from "@/functions/AddTransaction";

function AddCoins() {
  const [selectedPackage, setSelectedPackage] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const notify = (message: string) => toast.success(message);
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const errorNotify = (message: string) => toast.error(message);

  const coinPackages = [
    {
      name: "Bronze Package",
      coins: 1,
      price: 15,
      advantages: ["Basic Access", "No Expiry"],
    },
    {
      name: "Silver Package",
      coins: 5,
      price: 70,
      advantages: ["Extended Access", "Bonus 1 coin"],
    },
    {
      name: "Gold Package",
      coins: 10,
      price: 130,
      advantages: ["Priority Access", "Bonus 2 coins"],
    },
    {
      name: "Platinum Package",
      coins: 20,
      price: 250,
      advantages: ["Premium Access", "Bonus 5 coins", "Free Support"],
    },
  ];

  const handlePhoneNumberChange = (value: string) => {
    if (value.length !== 9) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setPhoneNumber("254" + value);
    }
  };

  const HandleSubmit = async () => {
    
    console.log(phoneNumber, "calling mpesa api", userDetails.credits);
    try {
      const result = await fetch("/api/daraja-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          amount: coinPackages[selectedPackage].price,
        }),
      });
      const data = await result.json();
      if (data.success) {
        notify(data.ResponseDescription);
        AddTransaction(coinPackages[selectedPackage].price);
        
      } else {
        console.log(data, "from data");
        errorNotify("An error occurred. Try again later");
      }
    } catch (error) {
      errorNotify("An error occurred. Try again later");
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ToastContainer />
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Lipa na M-Pesa
              </ModalHeader>
              <ModalBody>
                <div className="text-2xl flex items-center space-x-2 text-default-400 pointer-events-none flex-shrink-0">
                  <p>+254</p>
                  <Input
                    autoFocus
                    color="primary"
                    type="text"
                    inputMode="numeric"
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    endContent={<FaPhoneAlt />}
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    variant="flat"
                  />
                </div>
                <div className="font-bold text-lg text-gray-700">
                  <p>Amount: KES {coinPackages[selectedPackage].price}</p>
                  <p>{coinPackages[selectedPackage].name}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isValid}
                  size="lg"
                  onPress={onClose}
                  onClick={HandleSubmit}
                >
                  Pay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <h2 className="text-primary font-extrabold lg:text-4xl text-2xl text-center">
        PURCHASE MORE COINS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4 px-4 md:px-20 lg:px-40">
        {coinPackages.map((coinPackage, index) => (
          <div
            onClick={() => setSelectedPackage(index)}
            key={index}
            className={`flex flex-col justify-between items-center p-5 border rounded-lg text-white cursor-pointer shadow-lg transition-all hover:scale-105 my-5
                        ${
                          selectedPackage == index ? "bg-black" : "bg-primary"
                        }`}
          >
            <div>
              <h3 className="text-xl font-bold">{coinPackage.name}</h3>
              <p className="text-lg">{coinPackage.coins} coins</p>
              <p className="text-lg">Price: KES {coinPackage.price}</p>
              <ul className="mt-3 text-sm list-disc pl-5">
                {coinPackage.advantages.map((advantage, i) => (
                  <li key={i}>{advantage}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={onOpen}
              className="mt-4 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-700"
            >
              Buy Subscription
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCoins;
