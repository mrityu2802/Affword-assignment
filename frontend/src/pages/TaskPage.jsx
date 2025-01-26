import { useEffect, useState, useRef } from "react";
import { useTaskstore } from "../store/useTaskStore.js";
import { Loader2, Plus } from "lucide-react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../components/Column.jsx";
import Loader from "../components/Loader.jsx";
import Modal from "../components/Modal.jsx";

const initialData = {
  task: "",
  description: "",
  status: "pending",
};
const TaskPage = () => {
  const {
    taskList,
    getTask,
    isFetchingTask,
    createTask,
    isCreatingTask,
    updateTask,
  } = useTaskstore();
  const [columns, setColumns] = useState({});
  const [formData, setFormData] = useState(initialData);
  const modalRef = useRef(null);


  useEffect(() => {
    getTask();
  }, [getTask]);

  
  useEffect(() => {
    if (taskList.length) {
      const initialColumns = {
        pending: { id: "pending", name: "Pending", list: [] },
        completed: { id: "completed", name: "Completed", list: [] },
        done: { id: "done", name: "Done", list: [] },
      };

      // Distribute tasks into their respective columns based on status
      taskList.forEach((task) => {
        if (initialColumns[task.status]) {
          initialColumns[task.status].list.push(task);
        }
      });

      setColumns(initialColumns);
    }
  }, [taskList]);

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return; // Invalid drop location

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // No movement
    }

    const startCol = columns[source.droppableId];
    const endCol = columns[destination.droppableId];

    if (startCol === endCol) {
      const updatedList = Array.from(startCol.list);
      const [movedTask] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [startCol.id]: { ...startCol, list: updatedList },
      });

      // Call updateTask API for reordering within the same column
      try {
        await updateTask(movedTask.id, {
          status: startCol.id,
          index: destination.index,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Move task between columns
      const startList = Array.from(startCol.list);
      const [movedTask] = startList.splice(source.index, 1);

      const endList = Array.from(endCol.list);
      endList.splice(destination.index, 0, movedTask);

      // Update task's status
      movedTask.status = endCol.id;

      setColumns({
        ...columns,
        [startCol.id]: { ...startCol, list: startList },
        [endCol.id]: { ...endCol, list: endList },
      });

      // Call updateTask API for moving between columns
      try {
        await updateTask(movedTask._id, {
          status: endCol.id,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleModalState = () => {
    setFormData(initialData);
    modalRef.current?.showModal();
  };

  if (isFetchingTask) {
    return <Loader />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData);
    setFormData(initialData);
    modalRef.current.close();
  };

  return (
    <div className="h-screen flex flex-col p-6 sm:p-12 gap-4 overflow-auto">
      <div className="mt-12 sm:mt-8 px-4 py-2 border-base-300 shadow-lg rounded-lg flex justify-between items-center">
        <span className="font-semibold text-base-content">Tasks</span>
        <div className="flex items-center gap-2">
          <button onClick={handleModalState} className="btn btn-ghost">
            <Plus className="size-5" />
          </button>
        </div>
      </div>
      <div className="h-full">
        {taskList.length ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-2 rounded-lg h-full">
              {Object.values(columns).map((col) => (
                <Column col={col} key={col.id} />
              ))}
            </div>
          </DragDropContext>
        ) : (
          <span>No tasks available</span>
        )}
      </div>
      <Modal modalRef={modalRef} title={"Create New Task"}>
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
                "Submit"
              )}
            </button>
          </form>
        }
      </Modal>
    </div>
  );
};

export default TaskPage;
