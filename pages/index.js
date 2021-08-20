/** @format */

import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from "firebase";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Login from "../components/Login";
import Recents from "../components/Recents";
import { database } from "../firebase";

export default function Home() {
  const [session, loading] = useSession();
  if (loading) return <Loading />;
  if (!session) return <Login />;
  const [showModal, setShowModal] = useState(false);
  const [Documents, setDocuments] = useState([]);
  const [docName, setDocName] = useState("");
  useEffect(() => {
    database
      .collection("Documents")
      .doc(session?.user.email)
      .collection("UserDocs")
      .onSnapshot((snapshot) =>
        setDocuments(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, []);

  const createDoc = () => {
    if (docName.length > 0) {
      database
        .collection("Documents")
        .doc(session.user.email)
        .collection("UserDocs")
        .add({
          name: session.user.name,
          fileName: docName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setDocName("");
      setShowModal(false);
    } else return;
  };

  return (
    <div>
      <Head>
        <title>Google-Docs-clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header img={session.user.image} />

      <div>
        {Documents.map((doc) => (
          <Recents
            key={doc.id}
            id={doc.id}
            docName={doc.data.fileName}
            personName={doc.data.name}
            dated={doc.data.timestamp}
          />
        ))}
      </div>
      <img
        className="absolute bottom-6 right-6 h-20 w-20 border border-gray-400 rounded-full hover:cursor-pointer hover:border-blue-500"
        src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
        alt=""
        onClick={(e) => {
          setShowModal(true);
        }}
      />
      <Modal
        size="sm"
        active={showModal}
        toggler={() => {
          setShowModal(false);
          setDocName("");
        }}>
        <ModalBody>
          <Input
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            type="text"
            color="teal"
            size="regular"
            outline={true}
            placeholder="Document Name"
            onKeyDown={(e) => {
              e.key === "Enter" && createDoc();
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => {
              setDocName("");
              setShowModal(false);
            }}
            ripple="dark">
            Close
          </Button>
          <Button
            color="teal"
            onClick={() => {
              createDoc();
            }}
            ripple="light">
            Create document
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      ses: session,
    },
  };
}
