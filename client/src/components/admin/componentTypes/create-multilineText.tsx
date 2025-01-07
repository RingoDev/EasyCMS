import React, { useState } from "react";
import { ComponentTypes, MultilineText } from "../../../types/types";
import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const CreateMultilineText: React.FC<{
  name: string;
  addChild: (child: MultilineText) => void;
}> = (props) => {
  const [lines, setLines] = useState<number>(4);

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="my-input">Lines</InputLabel>
        <FilledInput
          value={lines}
          onChange={() => setLines}
          type={"number"}
          id="my-input"
        />
      </FormControl>
      <Button
        onClick={() =>
          props.addChild({
            type: ComponentTypes.MultilineText,
            name: props.name,
            lines,
          })
        }
      >
        Submit
      </Button>
    </>
  );
};

export default CreateMultilineText;
