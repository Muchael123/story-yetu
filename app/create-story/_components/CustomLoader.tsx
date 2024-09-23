import React, { useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import Image from 'next/image';

function CustomLoader({isLoading}: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        onOpen();
        }, []);
    return (
      <div>
        {isLoading && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="flex justify-center items-center flex-col">
                    <Image
                      src="/loader.gif"
                      alt="loading"
                      width={300}
                      height={200}
                      className="w-[200px] h-[200px]"
                    />
                    <h1 className="text-center font-extralight text-primary text-2xl">
                      Please wait. Lemme think...
                    </h1>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>
    );
}

export default CustomLoader