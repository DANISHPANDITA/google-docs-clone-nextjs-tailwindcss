/** @format */
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { database } from "../firebase";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
function TextEditor() {
  const [session] = useSession();
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [data] = useDocumentOnce(
    database
      .collection("Documents")
      .doc(session?.user.email)
      .collection("UserDocs")
      .doc(router.query.id)
  );
  useEffect(() => {
    if (data?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(data?.data()?.editorState))
      );
    }
  }, [data]);
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    database
      .collection("Documents")
      .doc(session?.user.email)
      .collection("UserDocs")
      .doc(router.query.id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        { merge: true }
      );
  };

  return (
    <div className="w-4/5 mx-auto mt-6">
      <Editor
        editorState={editorState}
        toolbarClassName="top-0 sticky z-50 py-2"
        editorClassName="bg-white p-10 h-full shadow-md focus-within:shadow-xl"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default TextEditor;
