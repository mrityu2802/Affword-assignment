import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useTaskstore } from "../store/useTaskStore";
import { Loader2 } from "lucide-react";

const TaskModal = ({ data, modalRef }) => {
  const { isCreatingTask, updateTask } = useTaskstore();
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    status: "",
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setFormData({
        task: data.task,
        description: data.description,
        status: data.status,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(data._id, formData);
    modalRef.current.close();
  };

  return (
    <Modal modalRef={modalRef} title={"Update Task"}>
      {
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Task Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full pl-2`}
              placeholder="Name"
              value={formData.task}
              onChange={(e) =>
                setFormData({ ...formData, task: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>

            <textarea
              className={`textarea textarea-bordered w-full pl-2`}
              placeholder="Description....."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Status</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value={"pending"}>Pending</option>
              <option value={"completed"}>Completed</option>
              <option value={"done"}>Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isCreatingTask || !formData.task}
          >
            {isCreatingTask ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      }
    </Modal>
  );
};

export default TaskModal;
