import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import { db, FBCollection } from "../../lib/firebase";
import { Link } from "react-router-dom";
import { AUTH } from "../../context/hooks";

interface Props extends ProjectProps {
  index?: number;
}

const ProjectItem = (project: Props) => {
  const { user } = AUTH.use();
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => setIsEditing((prev) => !prev);

  const onDelete = async () => {
    const ref = db.collection(FBCollection.PROJECTS);
    if (confirm(`${project.name}을/를 삭제하시겠습니까?`)) {
      try {
        await ref.doc(project?.id).delete();
        alert("삭제되었습니다.");
      } catch (error: any) {
        return alert(error.message);
      }
    }
  };

  const onCopyLink = async () => {
    try {
      const url = `${import.meta.env.VITE_WEB_URL}/project/${project?.id}`;
      await navigator.clipboard.writeText(url);
      alert("요구사항 링크가 복사되었습니다.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="border flex border-border rounded items-center hover:shadow-md">
      {project?.index ? (
        <Link className="flex-1 h-15 flex items-center pl-2.5" to={project.id!}>
          {project.index}. {project.name}
        </Link>
      ) : (
        <p className="flex-1 pl-2">{project.name}</p>
      )}
      <div className="flex gap-x-2.5 p-2.5">
        {project.isSharable && (
          <button
            onClick={onCopyLink}
            className="button cancel hover:bg-theme hover:text-white"
          >
            공유
          </button>
        )}
        {user?.uid === project.uid && (
          <>
            <button
              onClick={editHandler}
              className="button cancel hover:bg-theme hover:text-white"
            >
              수정
            </button>
            <button
              className="button cancel hover:bg-red-500 hover:text-white"
              onClick={onDelete}
            >
              삭제
            </button>
          </>
        )}
      </div>
      {isEditing && <ProjectForm payload={project} onCancel={editHandler} />}
    </div>
  );
};

export default ProjectItem;
