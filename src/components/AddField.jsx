import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ input, setInput, check, setCheck, handelAddTask }) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={check}
        onChange={() => setCheck((p) => !p)}
      />
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button>
        <AddIcon onClick={handelAddTask} />
      </Button>
    </div>
  );
};
