/** @format */

import Button from "@material-tailwind/react/Button";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { AssignmentRounded, DeleteRounded } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { database } from "../firebase";
function Recents({ id, docName, personName, dated }) {
  const [session] = useSession();
  const router = useRouter();
  const [showModel, setShowModel] = useState(false);
  const deleteRecent = () => {
    database
      .collection("Documents")
      .doc(session?.user.email)
      .collection("UserDocs")
      .doc(id)
      .delete()
      .then(() => {
        alert("Successfully deleted");
      });
    setShowModel(false);
  };
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="mt-6 w-3/5 mx-auto flex flex-row items-center justify-between text-gray-600 px-4 py-0.5 transition duration-300 hover:cursor-pointer hover:bg-blue-100 rounded-3xl border-b border-gray-300 sm:w-4/5 xs:w-4/5 sm:flex-col xs:flex-col">
      <div className="flex flex-row items-center space-x-8 ">
        <AssignmentRounded className="text-blue-500" />
        <p className="font-semibold w-36 truncate">{docName}</p>
      </div>
      <div className="flex flex-row items-center space-x-20 xs:mt-4 sm:mt-4">
        <p>{personName}</p>
        <p>{new Date(dated?.toDate()).toDateString()}</p>
      </div>
      <Button
        color="gray"
        buttonType="outline"
        iconOnly={true}
        rounded={true}
        ripple="dark"
        className="!border-0"
        onClick={(e) => {
          e.stopPropagation();
          setShowModel(true);
        }}>
        <DeleteRounded />
      </Button>
      <Modal
        size="sm"
        active={showModel}
        toggler={(e) => {
          setShowModel(false);
          e.stopPropagation();
        }}>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={() => {
              setShowModel(false);
            }}
            ripple="dark">
            Close
          </Button>
          <Button color="teal" onClick={deleteRecent} ripple="light">
            Delete Document
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Recents;
