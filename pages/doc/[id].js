/** @format */

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { Avatar } from "@material-ui/core";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";
import { database } from "../../firebase";
function Doc() {
  const [session, loading] = useSession();
  if (loading) return <Loading />;
  if (!session) return <Login />;
  const [DocData, setDocData] = useState({});
  const router = useRouter();
  const logoURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BJvwmM31sH8VLt-99CPszkm9u9_itH1U2w&usqp=CAU";
  const id = router.query.id;
  useEffect(() => {
    database
      .collection("Documents")
      .doc(session?.user.email)
      .collection("UserDocs")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDocData(doc.data());
        } else {
          router.replace("/");
        }
      })
      .catch((error) => {
        router.replace("/");
        alert("Error getting document:", error);
      });
  }, []);

  return (
    <div className="h-screen">
      <Head>
        <title>Google docs clone</title>
      </Head>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <div className="flex flex-row items-center">
          <img
            onClick={() => {
              router.push("/");
            }}
            src={logoURL}
            alt="logo"
            className="h-10 w-10  bg-transparent hover:cursor-pointer"
          />
          <div className="flex flex-col">
            <p className="font-serif font-bold text-base ml-8">
              {DocData.name}
            </p>
            <div className="mt-1 flex flex-row items-center text-sm text-gray-500 font-bold ml-8 space-x-3">
              <p className="hover:cursor-pointer hover:text-blue-400">File</p>
              <p className="hover:cursor-pointer hover:text-blue-400">View</p>
              <p className="hover:cursor-pointer hover:text-blue-400">Edit</p>
              <p className="hover:cursor-pointer hover:text-blue-400">Insert</p>
              <p className="hover:cursor-pointer hover:text-blue-400">Tools</p>
              <p className="hover:cursor-pointer hover:text-blue-400">Format</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light">
            <Icon name="groupadd" size="sm" />
            Share
          </Button>
          <Avatar src={session?.user?.image} alt="" />
        </div>
      </div>
      <TextEditor />
    </div>
  );
}

export default Doc;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
