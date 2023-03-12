import { Button, Dialog, Typography } from "@mui/material";

import styles from "./property-styles.module.css";

interface DeletePropertyModalProps {
  propertyForDeletion: string | null;
  setPropertyForDeletion: (id: string | null) => void;
  deleteProperty: (id: string) => Promise<void>;
}

const DeletePropertyModal = (props: DeletePropertyModalProps) => {
  const { propertyForDeletion, setPropertyForDeletion, deleteProperty } = props;

  return (
    <Dialog
      open={!!propertyForDeletion}
      onClose={() => setPropertyForDeletion(null)}
      style={{ padding: "20px" }}
    >
      <div className={styles.deleteModal}>
        <Typography>Are you sure you want to delete this</Typography>
        <div className={styles.buttonGroup}>
          <Button
            className="rounded-full text-white bg-cyan-600  hover:bg-cyan-500"
            onClick={() => {
              if (propertyForDeletion) deleteProperty(propertyForDeletion);
            }}
          >
            Yes
          </Button>
          <Button
            className="rounded-full text-white bg-red-600 hover:bg-red-500"
            onClick={() => setPropertyForDeletion(null)}
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletePropertyModal;
